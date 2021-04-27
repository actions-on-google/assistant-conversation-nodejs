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

export interface Media extends Schema.Media { }

/**
 * Media responses let your Actions play audio content with a playback duration
 * longer than the 240-second limit of SSML. Media responses work on both
 * audio-only devices and devices that can display visual content. On a
 * display, media responses are accompanied by a visual component with media
 * controls and (optionally) a still image.
 *
 * When defining a media response, use a candidate with both the
 * `RICH_RESPONSE` and `LONG_FORM_AUDIO` surface capabilities so that Google
 * Assistant only returns the rich response on supported devices. You can only
 * use one rich response per content object in a prompt.
 *
 * Audio for playback must be in a correctly formatted MP3 file. MP3 files must
 * be hosted on a web server and be publicly available through an HTTPS URL.
 * Live streaming is only supported for the MP3 format.
 *
 * @example
 * ```javascript
 * app.handle('media', (conv) => {
 *   conv.add('This is a media response');
 *   conv.add(new Media({
 *     mediaObjects: [
 *       {
 *         name: 'Media name',
 *         description: 'Media description',
 *         url: 'https://storage.googleapis.com/automotive-media/Jazz_In_Paris.mp3',
 *         image: {
 *           large: JAZZ_IN_PARIS_IMAGE,
 *         }
 *       }
 *     ],
 *     mediaType: 'AUDIO',
 *     optionalMediaControls: ['PAUSED', 'STOPPED'],
 *     startOffset: '2.12345s'
 *   }));
 * });
 * ```
 * @see {@link https://developers.google.com/assistant/conversational/prompts-media | Developer Documentation}
 */
export class Media implements Schema.Media {
  /** @hidden */
  constructor(input: Schema.Media = {}) {
    Object.assign(this, input)
  }
}
