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

export interface OrderUpdate extends Schema.OrderUpdate { }

/**
 * Represents an asynchronous order to physical orders.
 *
 * @see {@link https://developers.google.com/assistant/transactions/physical/dev-guide-physical-custom?hl=en | Physical Goods Transactions Documentation}
 */
export class OrderUpdate implements Schema.OrderUpdate {
  /** @hidden */
  constructor(input: Schema.OrderUpdate = {}) {
    Object.assign(this, input)
  }

}
