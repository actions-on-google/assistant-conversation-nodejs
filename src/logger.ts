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

import * as Debug from 'debug'
const name = 'assistant-conversation'

/**
 * Interface for logging functionality at different severity levels.
 * @public
 */
export interface ILogger {
  /** @public */
  // tslint:disable-next-line:no-any logger will handle any non-string object
  debug: (...values: any[]) => void
  /** @public */
  // tslint:disable-next-line:no-any logger will handle any non-string object
  info: (...values: any[]) => void
  /** @public */
  // tslint:disable-next-line:no-any logger will handle any non-string object
  log: (...values: any[]) => void
  /** @public */
  // tslint:disable-next-line:no-any logger will handle any non-string object
  warn: (...values: any[]) => void
  /** @public */
  // tslint:disable-next-line:no-any logger will handle any non-string object
  error: (...values: any[]) => void
}

// Use `Firebase Logger SDK` or `console` as default
const defaultLogger: ILogger = (() => {
  return {
    debug: Debug(`${name}:debug`),
    // tslint:disable-next-line:no-console Allow console binding
    info: console.info.bind(console) as typeof console.info,
    warn: Debug(`${name}:warn`),
    // tslint:disable-next-line:no-console Allow console binding
    log: console.log.bind(console) as typeof console.log,
    // tslint:disable-next-line:no-console Allow console binding
    error: console.error.bind(console) as typeof console.error,
  }
})()

// Same as default, but `debug` messages are now `info` level
export const debugLogger: ILogger = {
  // tslint:disable-next-line:no-console Allow console binding
  debug: console.info.bind(console) as typeof console.info,
  // tslint:disable-next-line:no-console Allow console binding
  info: console.info.bind(console) as typeof console.info,
  warn: Debug(`${name}:warn`),
  // tslint:disable-next-line:no-console Allow console binding
  log: console.log.bind(console) as typeof console.log,
  // tslint:disable-next-line:no-console Allow console binding
  error: console.error.bind(console) as typeof console.error,
}
let logger: ILogger = defaultLogger

export const setLogger = (newLogger: ILogger = defaultLogger) => {
  logger = newLogger
}

export const getLogger = () => {
  return logger
}
