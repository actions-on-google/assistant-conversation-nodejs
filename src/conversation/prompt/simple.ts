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
 * Simple responses take the form of a chat bubble visually and use
 * text-to-speech (TTS) or Speech Synthesis Markup Language (SSML) for sound.
 * By using short simple responses in conversation, you can keep users engaged
 * with a clear visual and audio interface that can be paired with other
 * conversational elements.
 *
 * @example
 * ```javascript
 * app.handle('Simple', conv => {
 *   conv.add(new Simple({
 *     speech: 'This is the first simple response.',
 *     text: 'This is the 1st simple response.'
 *   }));
 *   conv.add(new Simple({
 *     speech: 'This is the last simple response.',
 *     text: 'This is the last simple response.'
 *   }));
 * });
 * ```
 *
 * @see {@link https://developers.google.com/assistant/conversational/prompts-simple | Developer Documentation}
 * @see {@link https://developers.google.com/assistant/conversational/ssml | SSML Documentation}
 */
export class Simple {
  speech: string
  text: string

  /** @hidden */
  constructor(input: Schema.Simple | string ) {
    if (typeof input === 'string') {
      this.speech = input
      return
    }
    const { speech = '', text = '' } = input
    this.speech = speech
    this.text = text
  }
}
