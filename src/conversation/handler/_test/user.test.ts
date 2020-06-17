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
import * as sinon from 'sinon'

import { User } from '../'
import { AuthHeaderProcessor } from '../../../auth'

test('It should write the payload of a decoded GSI token in params.tokenPayload', async (t)=> {
  const authHeader = 'authHeader'
  const clientId = 'clientId'
  const tokenPayload = {key: 'value'}
  const authHeaderProcessor = new AuthHeaderProcessor()
  const decodeGSITokenStub = sinon.stub(authHeaderProcessor, 'decodeGSIToken')
  decodeGSITokenStub.withArgs(authHeader, clientId)
    .returns(tokenPayload)
  let user = new User()
  user = await user.processAuthHeader(authHeader, authHeaderProcessor, clientId)
  t.is(user.params.tokenPayload, tokenPayload)
})

test('It should write the extracted value of a bearer token params.bearerToken', async (t)=> {
  const token = 'token'
  const authHeader = `Bearer ${token}`
  let user = new User()
  const processor = new AuthHeaderProcessor()
  user = await user.processAuthHeader(authHeader, processor)
  t.is(user.params.bearerToken, token)
})
