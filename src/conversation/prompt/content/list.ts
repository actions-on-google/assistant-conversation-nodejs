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
 * A list presents users with a vertical list of multiple items and allows them
 * to select one by touch or voice input. When a user selects an item from the
 * list, Assistant generates a user query (chat bubble) containing the title of
 * the list item.
 *
 * Lists are good for when it's important to disambiguate options, or when the
 * user needs to choose between options that need to be scanned in their
 * entirety. For example, which "Peter" do you need to speak to, Peter Jons or
 * Peter Hans?
 *
 * Lists must contain a minimum of 2 and a maximum of 30 list items. The number
 * of elements initially displayed depends on the user's device, and common
 * starting number is 10 items.
 *
 * @example
 * ```javascript
 * const ASSISTANT_LOGO_IMAGE = new Image({
 *   url: 'https://developers.google.com/assistant/assistant_96.png',
 *   alt: 'Google Assistant logo'
 * });
 *
 * app.handle('List', conv => {
 *   conv.add('This is a list.');
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
 *   conv.add(new List({
 *     title: 'List title',
 *     subtitle: 'List subtitle',
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
 * @see {@link https://developers.google.com/assistant/conversational/prompts-selection#list | Developer Documentation}
 */
export class List implements Schema.List {
  /**
   * min: 2 max: 30
   */
  items: Schema.ListItem[]
  /**
   * Subtitle of the list.
   * Optional.
   */
  subtitle: string
  /**
   * Overall title of the list.
   * Optional.
   */
  title: string
  /** @hidden */
  constructor(input: Schema.List = {}) {
    const {
      items = [],
      subtitle = '',
      title = '',
    } = input
    this.items = items
    this.subtitle = subtitle
    this.title = title
  }

}
