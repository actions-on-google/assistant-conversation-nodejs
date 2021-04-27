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
 * Similar to a collection, collection browse is a rich response that allows
 * users to scroll through option cards. Collection browse is designed
 * specifically for web content and opens the selected tile in a web browser
 * (or an AMP browser if all tiles are AMP-enabled).
 *
 * Collection browse responses contain a minimum of 2 and a maximum of 10
 * tiles. On display-capable devices, users can swipe up or down to scroll
 * through cards before selecting an item.
 *
 * @example
 * ```javascript
 * app.handle('collectionBrowse', (conv) => {
 *   conv.add('This is a collection browse.');
 *   conv.add(new CollectionBrowse({
 *     'imageFill': 'WHITE',
 *     'items':
 *       [
 *         {
 *           'title': 'Item #1',
 *           'description': 'Description of Item #1',
 *           'footer': 'Footer of Item #1',
 *           'image': {
 *             'url': 'https://developers.google.com/assistant/assistant_96.png'
 *           },
 *           'openUriAction': {
 *             'url': 'https://www.example.com'
 *           }
 *         },
 *         {
 *           'title': 'Item #2',
 *           'description': 'Description of Item #2',
 *           'footer': 'Footer of Item #2',
 *           'image': {
 *             'url': 'https://developers.google.com/assistant/assistant_96.png'
 *           },
 *           'openUriAction': {
 *             'url': 'https://www.example.com'
 *           }
 *         }
 *       ]
 *   }));
 * });
 * ```
 *
 * @see {@link https://developers.google.com/assistant/conversational/prompts-selection#colection_browse | Developer Documentation}
 */
export class CollectionBrowse implements Schema.CollectionBrowse {
  /**
   * How the image backgrounds of collection items will be filled. Optional.
   */
  imageFill: Schema.ImageFill
  /**
   * min: 2 max: 10
   */
  items: Schema.CollectionBrowseItem[]
  /** @hidden */
  constructor(input: Schema.CollectionBrowse = {}) {
    const {
      imageFill = Schema.ImageFill.Unspecified,
      items = [],
    } = input
    this.imageFill = imageFill
    this.items = items
  }

}
