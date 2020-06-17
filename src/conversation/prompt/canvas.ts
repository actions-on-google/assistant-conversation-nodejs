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

export class Canvas implements Schema.Canvas {
  /**
   * Optional. JSON data to be passed through to the immersive experience
   * web page as an event.
   * If the \"override\" field in the containing prompt is \"false\" data values
   * defined in this Canvas prompt will be added after data values defined in
   * previous Canvas prompts.
   */
  data?: JsonObject[]
  /**
   * Optional. Default value: false.
   */
  suppressMic: boolean
  /**
   * Required. URL of the web view to load.
   */
  url: string

  /** @hidden */
  constructor(input: Schema.Canvas = {}) {
    const {
      data = [],
      suppressMic = false,
      url = '',
    } = input
    this.data = data
    this.suppressMic = suppressMic
    this.url = url
  }
}
