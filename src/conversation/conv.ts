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
import { Headers } from '../framework'
import { Prompt, PromptItem } from './prompt'
import { JsonObject, clone, isJsonEqual } from '../common'
import { Handler, Intent, Scene, Session, User, Device, Home, Expected } from './handler'
import { Context } from './handler/context'
import { ILogger } from '../logger'

/** @hidden */
export interface ConversationV3Options {
  /** @public */
  body?: Schema.HandlerRequest
  /** @public */
  headers?: Headers
  /** @public */
  clientId?: string
  /** @public */
  debug?: boolean
  /** @public */
  logger?: ILogger
  /**
   * Validates whether request is from Google through signature verification.
   * Uses Google-Auth-Library to verify authorization token against given Google Cloud Project ID.
   * Auth token is given in request header with key, "authorization".
   *
   * HTTP Code 403 will be thrown by default on verification error.
   *
   * @example
   * ```javascript
   *
   * const app = conversation({ verification: 'nodejs-cloud-test-project-1234' })
   * ```
   *
   * @public
   */
  verification?: ConversationVerification | string
}

/** @hidden */
export interface ConversationOptions {
  /** @public */
  request?: Schema.HandlerRequest

  /** @public */
  headers?: Headers
}

/** @public */
export interface ConversationVerification {
  /**
   * Google Cloud Project ID for the Assistant app.
   * @public
   */
  project: string

  /**
   * Custom status code to return on verification error.
   * @public
   */
  status?: number

  /**
   * Custom error message as a string or a function that returns a string
   * given the original error message set by the library.
   *
   * The message will get sent back in the JSON top level `error` property.
   * @public
   */
  error?: string | ((error: string) => string)
}

/** @public */
export class ConversationV3 {
  /** @public */
  request: Schema.HandlerRequest

  /** @public */
  headers: Headers

  /**
   * Get the current handler information like handler name.
   *
   * @example
   * ```javascript
   *
   * app.handle('handler name', conv => {
   *   const handlerName = conv.handler.name
   * })
   * ```
   *
   * @public
   */
  handler: Schema.Handler

  /** @public */
  intent: Schema.Intent

  /** @public */
  scene: Schema.Scene

  /** @public */
  session: Schema.Session

  /** @public */
  user: User

  /** @public */
  device: Schema.Device

  /** @public */
  home: Home

  /** @public */
  expected: Expected

  /** @public */
  context: Schema.Context

  /** @public */
  prompt: Prompt

  /** @public */
  overwrite = true

  /** @public */
  digested = false

  /** @public */
  body: Schema.HandlerRequest

  /** @hidden */
  _internal: {
    raw?: JsonObject,
    promptSet: boolean,
    orig: {
      scene: Schema.Scene,
      session: Schema.Session,
      user: Schema.User,
      home: Schema.Home,
    },
  }

  /** @hidden */
  constructor(options: ConversationV3Options = {}) {
    const { headers = {}, body = {} } = options

    this.request = body
    this.headers = headers
    this.handler = new Handler(body.handler)
    this.intent = new Intent(body.intent)
    this.scene = new Scene(body.scene)
    this.session = new Session(body.session as Schema.Session)
    this.user = new User(body.user)
    this.device = new Device(body.device)
    this.home = new Home(body.home)
    this.expected = new Expected()
    this.context = new Context(body.context)
    this.prompt = new Prompt()

    // Create a instance of prompt to keep track of prompts to be sent.
    // Set request values to compare later to see what the developer changed
    this._internal = {
      promptSet: false,
      orig: {
        scene: clone(this.scene),
        session: clone(this.session),
        user: clone(this.user),
        home: clone(this.home),
      },
    }
  }

  /** @public */
  json<T = JsonObject>(json: T) {
    this._internal.raw = json
    return this
  }

  /**
   * Add prompt items to be sent back for fulfillment.
   *
   * Prompt items are limited to 2 simple responses.
   * More than 2 will result in an error in fulfillment.
   * The first simple added in order will be set to `firstSimple`.
   * The last simple added in order will be set to `lastSimple`.
   *
   * @example
   * ```javascript
   *
   * const app = conversation()
   *
   * app.handle('main', conv => {
   *   const ssml = '<speak>Hi! <break time="1"/> ' +
   *     'I can read out an ordinal like <say-as interpret-as="ordinal">123</say-as>. ' +
   *     'Say a number.</speak>'
   *   conv.add(ssml)
   * })
   * ```
   *
   * @param promptItems A response fragment for the library to construct a single complete response
   * @public
   */
  /** @public */
  add(...promptItems: PromptItem[]) {
    if (this.digested) {
      throw new Error('Response has already been sent. ' +
        'Is this being used in an async call that was not ' +
        'returned as a promise to the intent handler?')
    }
    this.prompt.add(...promptItems)
    this._internal.promptSet = true
    return this
  }

  /**
   * Append speech responses to be sent back for fulfillment.
   *
   * @example
   * ```javascript
   *
   * const app = conversation()
   *
   * app.handle('handler name', conv => {
   *   const ssml = '<speak>Hi! <break time="1"/> ' +
   *     'I can read out an ordinal like <say-as interpret-as="ordinal">123</say-as>. ' +
   *     'Say a number.</speak>'
   *   conv.append(ssml)
   * })
   * ```
   *
   * @param speech A speech string to be appended
   * @public
   */
  /** @public */
  append(speech: string) {
    if (this.digested) {
      throw new Error('Response has already been sent. ' +
        'Is this being used in an async call that was not ' +
        'returned as a promise to the intent handler?')
    }
    this.prompt.append(speech)
    this._internal.promptSet = true
    return this
  }

  /** @public */
  response(): Schema.HandlerResponse {
    if (this.digested) {
      throw new Error('Response has already been digested')
    }
    this.digested = true

    const session = new Session(this.session)

    if (session.typeOverrides!.length) {
      for (const override of session.typeOverrides!) {
        if (override.mode) {
          // Temporarily use typeOverrideMode property for mode until
          // typeOverrideMode is fully deleted and migrated out
          (override as JsonObject).typeOverrideMode = override.mode
          delete override.mode
        }
      }
    } else {
      delete session.typeOverrides
    }

    // Create response and include field that should be included in every response
    const response: Schema.HandlerResponse = {
      // Echo back session variables in response
      session,
    }

    // Add other attributes to response if they exist and are different form the request
    if (!this.overwrite) {
      this.prompt.override = false
    }
    response.prompt = new Prompt(this.prompt)
    if (this.scene && !isJsonEqual({...this.scene}, {...this._internal.orig.scene})) {
      response.scene = new Scene(this.scene)
    }
    if (this.user && !isJsonEqual({...this.user}, {...this._internal.orig.user})) {
      response.user = new User(this.user)
    }
    if (this.home && !isJsonEqual({...this.home}, {...this._internal.orig.home})) {
      (response as Schema.HandlerResponse).home = new Home(this.home)
    }
    if (this.expected.languageCode ||
      (this.expected.speech && this.expected.speech.length)) {
      response.expected = this.expected
      if (this.expected.speech && !this.expected.speech.length) {
        delete response.expected.speech
      }
    }
    return clone(response)
  }

  /** @public */
  serialize(): Schema.HandlerResponse {
    if (this._internal.raw) {
      return this._internal.raw
    }
    const handlerResponse: Schema.HandlerResponse = this.response()
    return handlerResponse
  }
}

export interface ExceptionHandler<TConversation extends ConversationV3> {
  /** @public */
  // tslint:disable-next-line:no-any allow to return any just detect if is promise
  (conv: TConversation, error: Error): Promise<any> | any
}
