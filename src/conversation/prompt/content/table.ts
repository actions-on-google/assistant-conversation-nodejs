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

export class Table implements Schema.Table, Schema.Content {
  /**
   * Button.
   */
  button: Schema.Link
  /**
   * Headers and alignment of columns.
   */
  columns: Schema.TableColumn[]
  /**
   * Image associated with the table. Optional.
   */
  image: Schema.Image
  /**
   * Row data of the table. The first 3 rows are guaranteed to be shown but
   * others might be cut on certain surfaces. Please test with the simulator to
   * see which rows will be shown for a given surface. On surfaces that support
   * the WEB_BROWSER capability, you can point the user to
   * a web page with more data.
   */
  rows: Schema.TableRow[]
  /**
   * Subtitle for the table. Optional.
   */
  subtitle: string
  /**
   * Overall title of the table. Optional but must be set if subtitle is set.
   */
  title: string

  /** @hidden */
  constructor(input: Schema.Table = {}) {
    const {
      button = {},
      columns = [],
      image = {},
      rows = [],
      subtitle = '',
      title = '',
    } = input
  this.button = button
  this.columns = columns
  this.image = image
  this.rows = rows
  this.subtitle = subtitle
  this.title = title
  }
}
