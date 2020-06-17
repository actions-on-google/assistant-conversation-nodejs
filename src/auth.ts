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

import { JsonObject } from './common'
import { OAuth2Client, LoginTicket } from 'google-auth-library'


/**
 * This class provides methods to process the auth header to streamline access to auth credentials.
 *
 * @hidden
 */
export class AuthHeaderProcessor {
  /**
   * Used to verify and decode GSI tokens.
   */
  authClient: OAuth2Client

  /**
   * Used to extract the token value from headers that contain a bearer token.
   */
  static readonly bearerTypeTag = 'Bearer '

  constructor() {
    this.authClient = new OAuth2Client()
  }

  /**
   * Validates a GSI token using the provided client ID and returns the GSI token payload as
   * a json object.
   * @param gsiToken The GSI token to validate and decode.
   * @param clientId The Client ID to use for validation.
   * @returns The decoded token payload.
   */
  async decodeGSIToken(gsiToken: string, clientId: string): Promise<JsonObject> {
    const ticket = await this.authClient.verifyIdToken({
      idToken: gsiToken,
      audience: clientId,
    })
    if (ticket instanceof LoginTicket) {
      return ticket.getPayload() as JsonObject
    } else {
      // Return value from verifIdToken is not supported
      throw new Error(`Unsupported format after decoding GSI ticket, expected LoginTicket` +
                      `, found ${ticket}`)
    }
  }

  /**
   * Extracts the token value from a bearer token, stripping the type tag 'Bearer '.
   *
   * @param authHeader The auth header to parse.
   * @returns The value of the token, or a null string if authHeader doesn't contain a bearer token.
   */
  extractAccessToken(authHeader: string) {
    let token = ''
    if (authHeader.includes(AuthHeaderProcessor.bearerTypeTag)) {
      const headerParts = authHeader.split(AuthHeaderProcessor.bearerTypeTag)
      token = headerParts[1]
    }
    return token
  }

}
