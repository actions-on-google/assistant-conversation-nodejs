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
 * Information of current context of the request. Includes but isn't limited
 * to active media session info or canvas info.
 *
 * Contains context information when user makes query. Such context includes but
 * not limited to info about active media session, state of canvas web app, etc.
 */
export interface Context extends Schema.Context { }
export class Context implements Schema.Context {
  constructor(input: Schema.Context = {}) {
    Object.assign(this, input)
  }
}
