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

export class Device {
  /**
   * Gets information on the device that originated the user's query.
   *
   * @example
   * ```javascript
   * app.handle('handler name', conv => {
   *  const deviceCapabilities = conv.device.capabilities.join(', ')
   *  conv.add(`Device has the following capabilities: ${deviceCapabilities}`)
   * })
   * ```
   *
   * @public
   */
  capabilities: Schema.Capability[]
  /**
   * Optional. Timezone associated with the request used to resolve datetime values. If not
   * set, "UTC" is used.
   */
  timeZone?: Schema.TimeZone

  /**
   * Optional. The device location of the user. Note, this is only populated after location
   * permissions are granted by the end user. See the location message for more details on
   * which fields are set depending on coarse vs. fine grained permission.
   */
  currentLocation: Schema.Location

  /** @hidden */
  constructor(input: Schema.Device = {}) {
    const { capabilities = [], currentLocation = {}, timeZone = {} } = input
    this.capabilities = capabilities
    this.currentLocation = currentLocation
    this.timeZone = timeZone
  }

}
