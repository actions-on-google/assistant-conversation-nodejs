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

import { AuthHeaderProcessor } from '../auth'
import { OAuth2Client } from 'google-auth-library'
import { LoginTicket } from 'google-auth-library/build/src/auth/loginticket'

test('It should decode header as GSI token and return a JsonObject',
    async (t) => {
  const authHeader = 'authHeader'
  const clientId = 'clientId'
  const expectedPayload = {aud: 'aud', iat: 1, exp: 1, iss: 'iss', sub: 'sub'}
  const loginTicket = new LoginTicket('env', expectedPayload)
  const getPayloadStub = sinon.stub(loginTicket, 'getPayload')
  getPayloadStub.returns(expectedPayload)
  const oauthClient = new OAuth2Client(clientId)
  const verifyIdTokenStub = sinon.stub(oauthClient, 'verifyIdToken')
  verifyIdTokenStub.withArgs({idToken: authHeader, audience: clientId})
      .resolves(loginTicket)
  const authHeaderProcessor = new AuthHeaderProcessor()
  authHeaderProcessor.authClient = oauthClient
  const payload = await authHeaderProcessor.decodeGSIToken(authHeader, clientId)
  t.is(payload, expectedPayload)
})

test('It should throw if verifyIdToken does not return a LoginTicket', async (t) => {
  const authHeader = 'authHeader'
  const clientId = 'clientId'
  const oauthClient = new OAuth2Client()
  const resolvesTo = 'pluto'
  const verifyIdTokenStub = sinon.stub(oauthClient, 'verifyIdToken')
  verifyIdTokenStub.resolves(resolvesTo)
  const authHeaderProcessor = new AuthHeaderProcessor()
  authHeaderProcessor.authClient = oauthClient
  const error = await t.throwsAsync(authHeaderProcessor.decodeGSIToken(authHeader, clientId))
  t.regex(error.message, new RegExp(`${resolvesTo}`))
})

test('It should throw if GSI token verification fails', async (t) => {
  const authHeader = 'authHeader'
  const clientId = 'clientId'
  const oauthClient = new OAuth2Client()
  const err = new Error(`Error`)
  const verifyIdTokenStub = sinon.stub(oauthClient, 'verifyIdToken')
  verifyIdTokenStub.rejects(err)
  const authHeaderProcessor = new AuthHeaderProcessor()
  authHeaderProcessor.authClient = oauthClient
  const error = await t.throwsAsync(authHeaderProcessor.decodeGSIToken(authHeader, clientId))
  t.regex(error.message, new RegExp(`${err.message}`))
})

test('It should strip the token type from a bearer token and return the token value as a string',
    (t) => {
  const token = 'token'
  const authHeader = `Bearer ${token}`
  const authHeaderProcessor = new AuthHeaderProcessor()
  const extractedToken = authHeaderProcessor.extractAccessToken(authHeader)
  t.is(extractedToken, token)
})

test('It should return an empty string if extracting a token from an header that does not contain a bearer token',
    (t) => {
  const token = 'token'
  const authHeader = `Pluto ${token}`
  const authHeaderProcessor = new AuthHeaderProcessor()
  const extractedToken = authHeaderProcessor.extractAccessToken(authHeader)
  t.is(extractedToken, '')
})


