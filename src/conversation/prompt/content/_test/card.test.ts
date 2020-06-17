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
import { Card } from '../card'
import { Image } from '../image'
import * as common from '../../../../common'

test('card does not include a button by default', t => {
  const card = new Card({
    title: 'title',
    image: new Image({
      url: 'url',
      alt: 'alt',
    }),
  })
  t.deepEqual(common.clone(card), {
    image: {
     url: 'url',
     height: 0,
     alt: 'alt',
     width: 0,
    },
    title: 'title',
  })
})
