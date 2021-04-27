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
 * A collection scrolls horizontally and allows users to select one item by
 * touch or voice input. Compared to lists, collections have large tiles and
 * allow for richer content. The tiles that make up a collection are similar
 * to the basic card with image. When users select an item from a collection,
 * Assistant generates a user query (chat bubble) containing the title of the
 * item.
 *
 * Collections are good when various options are presented to the user, but a
 * direct comparison is not required among them (versus lists). In general,
 * prefer lists to collections because lists are easier to visually scan and
 * to interact with by voice.
 *
 * Collections must contain a minimum of 2 and a maximum of 10 tiles. On
 * display-capable devices, users can swipe left or right to scroll through
 * cards in a collection before selecting an item.
 *
 * @example
 * ```javascript
 * const ASSISTANT_LOGO_IMAGE = new Image({
 *   url: 'https://developers.google.com/assistant/assistant_96.png',
 *   alt: 'Google Assistant logo'
 * });
 *
 * app.handle('Collection', conv => {
 *   conv.add("This is a collection.");
 *
 *   // Override type based on slot 'prompt_option'
 *   conv.session.typeOverrides = [{
 *     name: 'prompt_option',
 *     mode: 'TYPE_REPLACE',
 *     synonym: {
 *       entries: [
 *         {
 *           name: 'ITEM_1',
 *           synonyms: ['Item 1', 'First item'],
 *           display: {
 *              title: 'Item #1',
 *              description: 'Description of Item #1',
 *              image: ASSISTANT_LOGO_IMAGE,
 *                 }
 *         },
 *         {
 *           name: 'ITEM_2',
 *           synonyms: ['Item 2', 'Second item'],
 *           display: {
 *              title: 'Item #2',
 *              description: 'Description of Item #2',
 *              image: ASSISTANT_LOGO_IMAGE,
 *                 }
 *         },
 *         {
 *           name: 'ITEM_3',
 *           synonyms: ['Item 3', 'Third item'],
 *           display: {
 *              title: 'Item #3',
 *              description: 'Description of Item #3',
 *              image: ASSISTANT_LOGO_IMAGE,
 *                 }
 *         },
 *         {
 *           name: 'ITEM_4',
 *           synonyms: ['Item 4', 'Fourth item'],
 *           display: {
 *              title: 'Item #4',
 *              description: 'Description of Item #4',
 *              image: ASSISTANT_LOGO_IMAGE,
 *                 }
 *         },
 *         ]
 *     }
 *   }];
 *
 *   // Define prompt content using keys
 *   conv.add(new Collection({
 *     title: 'Collection Title',
 *     subtitle: 'Collection subtitle',
 *     items: [
 *       {
 *         key: 'ITEM_1'
 *       },
 *       {
 *         key: 'ITEM_2'
 *       },
 *       {
 *         key: 'ITEM_3'
 *       },
 *       {
 *         key: 'ITEM_4'
 *       }
 *     ],
 *   }));
 * });
 * ```
 *
 * @see {@link https://developers.google.com/assistant/conversational/prompts-selection#collection | Developer Documentation}
 */
export class Collection implements Schema.Collection {
  /**
   * How the image backgrounds of collection items will be filled. Optional.
   */
  imageFill: Schema.ImageFill
  /**
   * min: 2 max: 10
   */
  items: Schema.CollectionItem[]
  /**
   * Subtitle of the collection.
   * Optional.
   */
  subtitle: string
  /**
   * Overall title of the collection.
   * Optional.
   */
  title: string
  /** @hidden */
  constructor(input: Schema.Collection = {}) {
    const {
      imageFill = Schema.ImageFill.Unspecified,
      items = [],
      subtitle = '',
      title = '',
    } = input
    this.imageFill = imageFill
    this.items = items
    this.subtitle = subtitle
    this.title = title
  }

}
