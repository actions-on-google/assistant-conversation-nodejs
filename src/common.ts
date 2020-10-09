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

import * as https from 'https'
import { getLogger } from './logger'

/** @hidden */
export const deprecate = (feature: string, alternative: string) =>
  getLogger().info(`${feature} is *DEPRECATED*: ${alternative}`)

/** @public */
export interface JsonObject {
  [key: string]: JsonValue
}

/** @public */
// tslint:disable-next-line:no-any JSON value can be anything
export type JsonValue = any

/** @hidden */
export const values = <T>(o: { [key: string]: T }) => Object.keys(o).map(k => o[k])

/** @hidden */
export const clone = <T>(o: T): T => JSON.parse(JSON.stringify(o))

/** @hidden */
// tslint:disable-next-line:no-any root can be anything
export const stringify = (root: any, ...exclude: string[]) => {
  const excluded = new Set(exclude)
  const filtered = Object.keys(root).reduce((o, k) => {
    if (excluded.has(k)) {
      o[k] = '[Excluded]'
      return o
    }
    const value = root[k]
    try {
      JSON.stringify(value)
      o[k] = value
      return o
    } catch (e) {
      const { message = '' } = e
      o[k] = message.includes('Converting circular structure to JSON') ?
        '[Circular]' : `[Stringify Error] ${e}`
      return o
    }
  }, {} as typeof root)
  return JSON.stringify(filtered, null, 2)
}

/** @hidden */
export type ProtoAny<TType, TSpec> = { '@type': TType } & TSpec

/** @hidden */
export const toArray = <T>(a: T | T[]) => Array.isArray(a) ? a : [a]

/** @hidden */
export interface ApiClientObjectMap<TValue> {
  [key: string]: TValue
}

// Bind this to https to ensure its not implementation dependent
/** @hidden */
export const request: typeof https.request = https.request.bind(https)

/** @hidden */
export const isJsonEqual = (o1: JsonObject, o2: JsonObject): boolean => {
  const so1 = sortJsonObject(o1)
  const so2 = sortJsonObject(o2)
  return stringify(so1) === stringify(so2)
}

/** @hidden */
export const sortJsonObject = (unsortedJson: JsonObject): JsonObject => {
  if (typeof unsortedJson !== 'object' || unsortedJson === null) {
    return unsortedJson
  }
  // Get a list of keys from the unsorted object
  const keys: string[] = []
  Object.keys(unsortedJson).forEach(key=> {
    keys.push(key)
  })
  keys.sort()

  // Add the keys to the sorted object in order
  const sortedJson: JsonObject = {} as JsonObject
  for (const key of keys) {
    // tslint:disable-next-line:no-any JSON value can be anything
    let value: any = unsortedJson[key]
    if(typeof value === 'object') {
      value = sortJsonObject(value)
    }
    sortedJson[key] = value
  }
  return sortedJson
}
