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

import * as Schema from '../../api/schema'
import { JsonObject } from '../../common'
import { AuthHeaderProcessor } from '../../auth'

/**
 * Encapsulates data for the conversation's user.
 *
 * @example
 * ```javascript
 * const app = conversation()
 *
 * app.handle('My_Handler', conv => {
 *  console.log(conv.user.locale);
 *  if (conv.user.params.myParam === myValue) {
 *    // param processing
 *  }
 * })
 * ```
 * @public
 */
export interface User extends Schema.User { }
export class User implements Schema.User {

  /**
   * Primary locale setting of the user making the request. Follows IETF BCP-47
   * language code http://www.rfc-editor.org/rfc/bcp/bcp47.txt However, the
   * script subtag is not included.
   */
  locale: string

  /**
   * List of all parameters associated with the current user.
   */
  params: JsonObject

  /**
   * Constructor.
   *
   * @param input The [[Schema.User]] object wrapped by the new instance.
   * @hidden
   */
  constructor(input: Schema.User = {}) {
    Object.assign(this, input)
    const { locale = '', params = {} } = input
    this.locale = locale
    this.params = params
  }

  /**
   * Extracts credentials from an authorization header, saving the values in {@link User.params}.
   * If a client ID is passed, validates and decode the authHeader as a GSI token.
   * If not, extract the token value from the header (if the header contains a bearer token).
   *
   * @param authHeader The header to process.
   * @param processor An instance of {@link AuthHeaderProcessor}
   * @param clientId The client ID to use to validate a GSI token.
   * @returns The updated {@link User} object.
   *
   * @hidden
   */
  async processAuthHeader(authHeader: string, processor: AuthHeaderProcessor, clientId?: string ):
      Promise<User> {
    if (clientId) {
      this.params.tokenPayload = await processor.decodeGSIToken(authHeader, clientId)
      return this
    } else {
      this.params.bearerToken = processor.extractAccessToken(authHeader)
      return this
    }
  }

}
