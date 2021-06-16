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

/**
 * Represents a response that starts or continues an Interactive Canvas
 * session.
 *
 * @example
 * ```javascript
 * app.handle('welcome', (conv) => {
 *   conv.add('Welcome! Do you want me to change color or pause spinning? ' +
 *     'You can also tell me to ask you later.');
 *   conv.add(new Canvas({
 *     url: `https://your-web-app.com`,
 *   }));
 * });
 * ```
 *
 * @see {@link https://developers.google.com/assistant/interactivecanvas/prompts#check_surface_capability | Developer Documentation}
 * to learn more about Interactive Canvas.
 */
export class Canvas implements Schema.Canvas {
  /**
   * Optional. JSON data to be passed through to the immersive experience
   * web page as an event.
   * If the \"override\" field in the containing prompt is \"false\" data values
   * defined in this Canvas prompt will be added after data values defined in
   * previous Canvas prompts.
   *
   * @example
   * ```javascript
   * app.handle('start_spin', (conv) => {
   *   conv.add(`Ok, I'm spinning. What else?`);
   *   conv.add(new Canvas({
   *     data: {
   *       command: 'SPIN',
   *       spin: true,
   *     },
   *   }));
   * });
   * ```
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
  /**
   * If `true` the canvas application occupies the full screen and won't
   * have a header at the top. A toast message will also be displayed on the
   * loading screen that includes the Action's display name, the developer's
   * name, and instructions for exiting the Action. Default value: `false`.
   */
  enableFullScreen?: boolean
  /**
   * If `true`, screen taps will not stop TTS for the entire canvas session.
   * Default value: `false`.
   */
  continueTtsDuringTouch?: boolean

  /** @hidden */
  constructor(input: Schema.Canvas = {}) {
    const {
      data = [],
      suppressMic = false,
      url = '',
      enableFullScreen = false,
      continueTtsDuringTouch = false,
    } = input
    this.data = data
    this.suppressMic = suppressMic
    this.url = url
    this.enableFullScreen = enableFullScreen
    this.continueTtsDuringTouch = continueTtsDuringTouch
  }
}
