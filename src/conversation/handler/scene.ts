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

export enum DefaultScenes {
  End = 'actions.page.END_CONVERSATION',
}

export class Scene {
  /**
   * Gets information about the current scene.
   *
   * @example
   * ```javascript
   *
   * app.handle('handler name', conv => {
   *  conv.add(`Next scene: ${conv.scene.next.name}`)
   * })
   * ```
   *
   * @public
   */
  /**
   * Optional. Name of the current scene.
   */
  name: string
  /**
   * Optional. Represents the slot filling on the current scene. Slots can be changed
   * to alter slot filling behavior and slot values can be validated and/or altered.
   */
  slots: Record<string, Schema.Slot>
  /**
   * Optional. Represents the scene to be run next. Can be changed or added
   * to immediately transition to the scene specified in this field.
   */
  next: Schema.NextScene
  /**
   * Required. The current status of slot filling. This field is read-only.
   */
  slotFillingStatus: Schema.SlotFillingStatus

  /** @hidden */
  constructor(input: Schema.Scene = {}) {
    Object.assign(this, input)
    const { name = '', slots = {}, next = {} } = input
    this.name = name
    this.slots = slots
    this.next = next
  }
}
