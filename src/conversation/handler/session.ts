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

export interface Session extends Schema.Session { }
export class Session implements Schema.Session {
  /**
   * Alias of conv.session.languageCode
   *
   * Language of the current conversation session. Follows IETF BCP-47 language
   * code http://www.rfc-editor.org/rfc/bcp/bcp47.txt.
   * This could be different from user locale if the action uses multi-language
   * features. For example, when handler_response.expected.language is set, it
   * changes the conversation language for all following turns, which will be
   * reflected in this field.
   */
  get language() {
    return this.languageCode
  }

  /** @hidden */
  constructor(input: Schema.Session = {}) {
    Object.assign(this, input)
    const { id = '', params = {}, typeOverrides = [] } = input
    this.id = id
    this.params = params
    this.typeOverrides = typeOverrides
  }
}
