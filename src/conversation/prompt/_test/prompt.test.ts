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

import test from 'ava'
import { Prompt, OrderUpdate, CollectionBrowse } from '..'
import * as common from '../../../common'
import * as Schema from '../../../api/schema'

test('orderUpdate is added to prompt', t => {
  const prompt = new Prompt()
  prompt.add(new OrderUpdate({ reason: 'test' }))
  t.deepEqual(common.clone(prompt) as Schema.Prompt, {
    override: false,
    orderUpdate: {
      reason: 'test',
    },
  })
})

test('collectionBrowse is added to prompt', t => {
  const prompt = new Prompt()
  const collectionBrowseParams = {
    imageFill: Schema.ImageFill.White,
    items:
      [
        {
          title: 'Item #1',
          description: 'Description of Item #1',
          footer: 'Footer of Item #1',
          image: {
            url: 'https://developers.google.com/assistant/assistant_96.png',
          },
          openUriAction: {
            url: 'https://www.example.com',
          },
        },
        {
          title: 'Item #2',
          description: 'Description of Item #2',
          footer: 'Footer of Item #2',
          image: {
            url: 'https://developers.google.com/assistant/assistant_96.png',
          },
          openUriAction: {
            url: 'https://www.example.com',
          },
        },
      ],
  }
  prompt.add(new CollectionBrowse(collectionBrowseParams))
  t.deepEqual(common.clone(prompt) as Schema.Prompt, {
    override: false,
    content: {
      collectionBrowse: collectionBrowseParams,
    },
  })
})
