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
