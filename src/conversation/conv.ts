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

/**
 * Options used when constructing app object.
 *
 * @example
 * ```javascript
 * const {conversation} = require('@assistant/conversation');
 *
 * const app = conversation({verification: 'nodejs-cloud-test-project-1234'});
 * ```
 *
 * @public
 */
export interface ConversationV3Options {
  /** @public */
  body?: Schema.HandlerRequest
  /** @public */
  headers?: Headers
  /**
   * Represents the client ID given in the Actions Console to use for
   * authorizing users when performing Google Sign-In.
   *
   * @see {@link https://developers.google.com/assistant/identity/gsi-concept-guide | Google Sign-In documentation}
   * @public
   */
  clientId?: string
  /**
   * When set to true, requests and responses will be automatically logged using `logger`.
   * @public
   */
  debug?: boolean
  /**
   * Represents an object with methods for each logging level. By default the
   * logger binds to `console` methods.
   * @see {@link debugLogger | Default logger implementation}
   * @public
   */
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
   * @see {@link https://developers.google.com/assistant/conversational/reference/rest/v1/verify-requests | Verify Requests documentation}
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

/**
 * Represents details of action to verify requests are coming from Google.
 * @see {@link https://developers.google.com/assistant/conversational/reference/rest/v1/verify-requests | Verify Requests documentation}
 * @public
 */
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

/**
 * Represents a turn of the conversation. This is provided as `conv` in an
 * intent handler.
 * @public
 */
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

  /**
   * Represents the last matched intent.
   * @public
   */
  intent: Schema.Intent

  /**
   * Info on the current and next scene when the function was called. Will be filled
   * when the fulfillment call is made within the scope of a scene.
   *
   * Represent a scene. Scenes can call fulfillment, add prompts, and collect slot values from
   * the user. Scenes are triggered by events or intents and can trigger events and match
   * intents to transition to other scenes.
   *
   * Represents the current and next scene. If `Scene.next` is set the runtime will
   * immediately transition to the specified scene.
   * @public
   */
  scene: Schema.Scene

  /**
   * Holds session data like the session id and session parameters.
   *
   * Contains information on the current conversation session
   *
   * Describes data for the current session, session parameters can be created,
   * updated, or removed by the fulfillment.
   *
   * @example
   * ```javascript
   * // Assign color to session storage
   * app.handle('storeColor', conv => {
   *   let color = 'red';
   *   conv.session.params.exampleColor = color;
   * });
   *
   * // Retrieve color from session storage
   * app.handle('getStoredColor', conv => {
   *   let color = conv.session.params.exampleColor;
   * });
   * ```
   *
   * @see {@link https://developers.google.com/assistant/conversational/storage-session | Session Storage documentation}
   * @public
   */
  session: Schema.Session

  /**
   * Represents the user making a request to the Action.
   *
   * @example
   * ```javascript
   * // Assign color to user storage
   * app.handle('storeColor', conv => {
   *   let color = 'red';
   *   conv.user.params.exampleColor = color;
   * });
   *
   * // Retrieve color from user storage
   * app.handle('getStoredColor', conv => {
   *   let color = conv.user.params.exampleColor;
   * });
   * ```
   * @see {@link https://developers.google.com/assistant/conversational/storage-user | User Storage documentation}
   * @public
   */
  user: User

  /**
   * Represents the device the user is using to make a request to the Action.
   * @see {@link https://developers.google.com/assistant/conversational/permissions | Permissions documentation}
   * @public
   */
  device: Schema.Device

  /**
   * Represents the HomeGraph structure that the user's target device belongs
   * to.
   *
   * @example
   * ```javascript
   * // Assign color to home storage
   * app.handle('storeColor', conv => {
   *   let color = 'red';
   *   conv.home.params.exampleColor = color;
   * });
   *
   * // Retrieve color from home storage
   * app.handle('getStoredColor', conv => {
   *   let color = conv.home.params.exampleColor;
   * });
   * ```
   * @see {@link https://developers.google.com/assistant/conversational/storage-home | Home Storage documentation}
   * @public
   */
  home: Home

  /**
   * Describes the expectations for the next dialog turn.
   * @public
   */
  expected: Expected

  /**
   * Contains context information when user makes query. Such context includes but not limited
   * to info about active media session, state of canvas web app, etc.
   * @public
   */
  context: Schema.Context

  /**
   * Represents the prompts to be sent to the user, these prompts will be appended
   * to previously added messages unless explicitly overwritten.
   * @public
   */
  prompt: Prompt

  /** @public */
  overwrite = true

  /** @public */
  digested = false

  /**
   * Represents a request sent to a developer's fulfillment by Google.
   * @public
   */
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

  /**
   * Initializes conversational application.
   * @param options A set of options that apply to the application.
   * @public
   */
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

  /**
   * Manually sets response JSON.
   * @public
   */
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

  /**
   * Returns generated JSON response.
   *
   * Note this method sets the `digested` field to `true` and can only be
   * called once.
   * @public
   */
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

  /**
   * Returns manually set JSON response or generates a response.
   *
   * If the response has to be generated, it sets the `digested` field to
   * `true`.
   * @public
   */
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
