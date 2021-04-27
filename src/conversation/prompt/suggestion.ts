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

/**
 * Suggestions provide users on display-capable devices with suggestion chips
 * when Assistant displays the prompt. Use suggestion chips to hint at user
 * responses to continue or pivot the conversation. When tapped, a suggestion
 * chip returns the displayed text to the conversation verbatim, as if the user
 * had typed it.
 *
 * You may have a maximum of 8 suggestions in a single prompt, each with a
 * maximum length of 25 plaintext characters.
 *
 * @see {@link https://developers.google.com/assistant/conversational/prompts#suggestions | Developer Documentation}
 */
export class Suggestion {
  /**
   * Overall title of the card.
   * Optional.
   */
  title: string

  /** @hidden */
  constructor(input: Schema.Suggestion = {} ) {
    const {
      title = '',
    } = input
    this.title = title
  }
}
