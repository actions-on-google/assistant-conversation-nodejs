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

import * as Schema from '../../../api/schema'

/**
 * Image cards are designed to be a simpler alternative to a basic card that
 * also contains an image. Use an image card when you want to present an image,
 * and have no need for supporting text or interactive components.
 *
 * @example
 * ```javascript
 * app.handle('Image', conv => {
 *   conv.add("This is an image prompt!");
 *   conv.add(new Image({
 *       url: 'https://developers.google.com/assistant/assistant_96.png',
 *       alt: 'Google Assistant logo'
 *   }));
 * });
 * ```
 *
 * @see {@link https://developers.google.com/assistant/conversational/prompts-rich#image-cards | Developer Documentation}
 */
export class Image implements Schema.Image {
  /**
   * A text description of the image to be used for accessibility, e.g. screen
   * readers.
   * Required.
   */
  alt: string
  /**
   * The height of the image in pixels.
   * Optional.
   */
  height: number
  /**
   * The source url of the image. Images can be JPG, PNG and GIF (animated and
   * non-animated). For example,`https://www.agentx.com/logo.png`. Required.
   */
  url: string
  /**
   * The width of the image in pixels.
   * Optional.
   */
  width: number

  /** @hidden */
  constructor(input: Schema.Image = {}) {
    const {
      alt = '',
      height = 0,
      url = '',
      width = 0,
    } = input
    this.alt = alt
    this.height = height
    this.url = url
    this.width = width
  }
}
