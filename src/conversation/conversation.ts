/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Schema from '../api/schema'
import { AppHandler, attach } from '../assistant'
import { ConversationV3, ExceptionHandler, ConversationV3Options, ConversationVerification } from './conv'
import * as common from '../common'
import { BuiltinFrameworkMetadata } from '../framework'
import { ServiceBaseApp } from '../assistant'
import { AuthHeaderProcessor } from '../auth'
import { setLogger, getLogger, debugLogger } from '../logger'
import { OAuth2Client } from 'google-auth-library'

/**
 * Throw an UnauthorizedError in an intent handler that requires an access token if the token is
 * invalid. This triggers an access token refresh request for the Action from the Assistant.
 *
 * @example
 * ```javascript
 * const app = conversation()
 *
 * app.handle('My_Handler_Name_That_Requires_An_Access_Token', conv => {
 *   // ...
 *
 *   // given a function to check if an access token is still valid
 *   const valid = isTokenValid(conv.user.params.bearerToken)
 *   if (!valid) {
 *     throw new UnauthorizedError()
 *   }
 * })
 *
 * ```
 *
 * @public
 */
export class UnauthorizedError extends Error { }

/** @public */
export interface ConversationV3Handler<
  TConversation extends ConversationV3 = ConversationV3> {
  /** @public */
  (
    conv: TConversation,
    // tslint:disable-next-line:no-any allow developer to return any just detect if is promise
  ): Promise<any> | any
}

/** @hidden */
export interface ConversationV3Handlers {
  [handler: string]: ConversationV3Handler | undefined
}

/** @hidden */
export interface ConversationV3AppHandlers<TConversation extends ConversationV3> {
  handles: ConversationV3Handlers
  catcher: ExceptionHandler<TConversation>
}

/** @public */
export interface ConversationV3Middleware<
  TConversationPlugin extends ConversationV3
  > {
  /** @public */
  (
    /** @public */
    conv: ConversationV3,

    /** @public */
    framework: BuiltinFrameworkMetadata,
  ): (ConversationV3 & TConversationPlugin) |
    void |
    Promise<ConversationV3 & TConversationPlugin> |
    Promise<void>
}

/** @public */
export interface ConversationV3App<TConversation extends ConversationV3> extends ServiceBaseApp {
  /**
   * Sets the Handler to be executed when the fulfillment is called
   * with a given handler name.
   *
   * @param name The handler name to match.
   *     When given an array, sets the Handler for any name in the array.
   * @param handler The Handler to be executed when the handler name is matched.
   * @public
   */
  handle(
    name: string | string[],
    handler: ConversationV3Handler<TConversation>,
  ): this

  /** @public */
  catch(catcher: ExceptionHandler<TConversation>): this

  /** @public */
  middleware<TConversationPlugin extends ConversationV3>(
    middleware: ConversationV3Middleware<TConversationPlugin>,
  ): this

  /** @hidden */
  _internal: {
    handlers: ConversationV3AppHandlers<TConversation>
    middlewares: ConversationV3Middleware<ConversationV3>[],
  }

  /** @public */
  verification?: ConversationVerification | string

  /** @hidden */
  _client?: OAuth2Client
}

/** @public */

export interface Conversation {
  /** @public */
  <ConversationApp extends ConversationV3 = ConversationV3>(options?: ConversationV3Options):
    AppHandler & ConversationV3App<ConversationApp>
}


/**
 * This is the function that creates the app instance which on new requests,
 * creates a way to interact with the conversation API directly from Assistant,
 * providing implementation for all the methods available in the API.
 *
 * @example
 * ```javascript
 *
 * const app = conversation()
 *
 * app.handler('handler name', conv => {
 *   conv.add('How are you?')
 * })
 * ```
 *
 * @public
 */
export const conversation: Conversation = <
  TConversation extends ConversationV3
>(options: ConversationV3Options = {}) => {
  if (options.debug && !options.logger) {
    // Use special logger where `debug` messages are now `info` level
    setLogger(debugLogger)
  } else {
    setLogger(options.logger)
  }
  const app = attach<ConversationV3App<TConversation>>({
    _internal: {
      handlers: {
        handles: {},
        catcher: (conv, e) => {
          throw e
        },
      },
      middlewares: [],
    },
    handle(
      this: ConversationV3App<TConversation>,
      names: string | string[],
      handler: ConversationV3Handler<TConversation>,
    ) {
      for (const name of common.toArray(names)) {
        this._internal.handlers.handles[name] = handler
      }
      return this
    },
    catch(this: ConversationV3App<TConversation>, catcher) {
      this._internal.handlers.catcher = catcher
      return this
    },
    middleware(
      this: ConversationV3App<TConversation>,
      middleware,
    ) {
      this._internal.middlewares.push(middleware)
      return this
    },
    verification: options.verification,
    _client: (options.verification || options.clientId) ?
      new OAuth2Client(options.clientId) : undefined,
    async handler(
      this: AppHandler & ConversationV3App<TConversation>,
      body: Schema.HandlerRequest,
      headers,
      metadata = {},
    ) {
      const { clientId, verification } = this
      if (verification) {
        const {
          project,
          status = 403,
          error = (e: string) => e,
        } = typeof verification === 'string' ? { project: verification } : verification
        const token = headers['google-assistant-signature'] as string
        try {
          await this._client!.verifyIdToken({
            idToken: token,
            audience: project,
          })
        } catch (e) {
          return {
            status,
            body: {
              error: typeof error === 'string' ? error :
                error(`ID token verification failed: ${e.stack || e.message || e}`),
            },
          }
        }
      }
      let conv = new ConversationV3({
        body,
        headers,
      })
      if (headers.authorization && typeof headers.authorization === 'string') {
        const authHeaderProcessor = new AuthHeaderProcessor()
        conv.user = await conv.user.processAuthHeader(headers.authorization, authHeaderProcessor,
            clientId)
      }
      for (const middleware of this._internal.middlewares) {
        const result = middleware(conv, metadata)
        conv = (result instanceof ConversationV3 ? result : ((await result) || conv)) as (
          ConversationV3
        )
      }
      getLogger().debug('ConversationV3', common.stringify(conv, 'request', 'headers', 'body'))
      const handlerName = conv.handler.name as string
      const handler = this._internal.handlers.handles[handlerName]
      if (typeof handler === 'undefined') {
        throw new Error(`Handler not found for handle name: ${handlerName}`)
      }
      try {
        try {
          await handler(conv)
        } catch (e) {
          await this._internal.handlers.catcher(conv as TConversation, e)
        }
      } catch (e) {
        if (e instanceof UnauthorizedError) {
          return {
            status: 401,
            headers: {},
            body: {},
          }
        }
        throw e
      }
      return {
        status: 200,
        headers: {},
        body: conv.serialize(),
      }
    },
  }, options)

  app.handle('actions.handler.HEALTH_CHECK', conv => {
    conv.json({})
  })

  return app
}
