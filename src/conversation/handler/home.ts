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

export interface Home extends Schema.Home { }
export class Home implements Schema.Home {
  /**
   * List of parameters associated with the HomeGraph structure
   * the target device belongs to.
   *
   * https://developers.google.com/assistant/conversational/storage-home
   *
   * @example
   * ```javascript
   *
   * app.handle('handler name', conv => {
   *   conv.home.params.param1 = 'hello'
   * })
   * ```
   *
   * @public
   */
  params: JsonObject

  /** @hidden */
  constructor(input: Schema.Home = {}) {
    Object.assign(this, input)

    if (!this.params) {
      this.params = {}
    }
  }
}
