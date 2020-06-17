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
import {
  conversation,
  ConversationV3,
  Simple,
  Suggestion,
  Card,
  Image,
  Link,
  Canvas,
} from '../..'
import * as Schema from '../../api/schema'
import { clone } from '../../common'

const HANDLE_NAME = 'function name'
const CURRENT_SCENE = 'current page'
// const NEXT_SCENE = 'next page'
const SESSION_ID = '5485438717547546495'
// const PARAM_NAME = 'parameter-name'
// const PARAM_VALUE = 'parameter value'
const LOCALE = 'en-US'
const CAPABILITIES = ['SPEECH', 'RICH_RESPONSE']

function buildRequest(): Schema.HandlerRequest {
  const handlerRequest = {
    handler: {
      name: HANDLE_NAME,
    },
    scene: {
      name: CURRENT_SCENE,
    },
    session: {
      id: SESSION_ID,
    },
    user:{
      locale: LOCALE,
    },
    device: {
      capabilities: CAPABILITIES,
    },
  } as Schema.HandlerRequest
  return handlerRequest
}

function requestBuilder(handlerName: string, slots: Record<string, Schema.Slot>) {
  return {
    handler: {
      name: handlerName,
    },
    intent: {
      name: 'actions.intent.MAIN',
      params: {},
      query: '',
    },
    scene: {
      name: 'start',
      slots,
    },
    session: {
      id: '7250447207398852357',
      params: {},
    },
    user: {
      locale: 'en-US',
      params: {},
    },
    device: {
      capabilities: [
        'SPEECH',
        'RICH_RESPONSE',
        'WEB_LINK',
        'LONG_FORM_AUDIO',
      ],
    },
  }
}

test('handler is invoked', (t) => {
  const app = conversation()
  let invoked = false

  const handler = (conv: ConversationV3) => {
    invoked = true
    t.log(JSON.stringify(conv))
    return conv.add('hello')
  }
  app.handle(HANDLE_NAME, handler)
  const promise = app.handler(buildRequest(), {})
  return promise.then((result) => {
    t.log(JSON.stringify(result.body))
    t.true(invoked)
    t.is(result.status, 200)
    t.deepEqual(result.body, {
      session: {
        id: SESSION_ID,
        params: {},
      },
      prompt: {
        override: false,
        firstSimple: {
          speech: 'hello',
          text: '',
        },
      },
    })
  })
})

test('app gets simple prompt string when using app.handler', async t => {
  const handlerName = 'handlerName'
  const response = 'abcdefg1234567'
  const app = conversation()
  // const session = 'abcdefghijk'
  app.handle(handlerName, conv => conv.add(response))
  const res = await app.handler(
    requestBuilder(handlerName, {}) as Schema.HandlerRequest, {})
  t.is(res.status, 200)
  t.log(JSON.stringify(clone(res.body)))
  t.deepEqual(clone(res.body), {
    session: {
      id: '7250447207398852357',
      params: {},
    },
    prompt: {
      override: false,
      firstSimple: {
        speech: response,
        text: '',
      },
    },
  })
})

test('handle, scene, intent & name passed to conv', async t => {
  const handlerName = 'handlerName'
  const webhookRequest = requestBuilder(handlerName, {})
  const app = conversation()
  app.handle(handlerName, conv => {
    t.is(conv.handler.name, handlerName)
    t.is(conv.intent.name, webhookRequest.intent.name)
    t.is(conv.scene.name, webhookRequest.scene.name)
  })
  await app.handler(webhookRequest as Schema.HandlerRequest, {})
})

test('complex response: simple, card and suggestions', async t => {
  const handlerName = 'handlerName'
  const app = conversation()
  const prefix = 'Sure, here\'s a history fact.'
  const fact = 'Google has more than 70 offices in more than 40 countries.'
  const imageUrl = 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/' +
    'Search_GSA.2e16d0ba.fill-300x300.png'
  app.handle(handlerName, conv => {
    conv.add(new Simple({
      speech: prefix + ' ' + fact,
      text: prefix,
    }))
    conv.add(new Card({
       title: fact,
       image: new Image({
         url: imageUrl,
         alt: 'Google app logo',
       }),
       button: new Link({
         name: 'Learn more',
         open: {
           url: 'https://www.google.com/about/',
         },
       }),
    }))
    conv.add(new Suggestion({ title: 'Yes'}))
    conv.add(new Suggestion({ title: 'No'}))
    conv.add(new Suggestion({ title: 'Headquarters'}))
    conv.add(new Suggestion({ title: 'History'}))
    conv.add(new Suggestion({ title: 'Quit'}))
  })
  const res = await app.handler(
    requestBuilder(handlerName, {}) as Schema.HandlerRequest, {})
  t.is(res.status, 200)
  t.log(JSON.stringify(clone(res.body)))
  t.deepEqual(clone(res.body).prompt, {
    override: false,
    content: {
      card: {
        button: {
          name: 'Learn more',
          open: {
            url: 'https://www.google.com/about/',
          },
        },
        image: {
          alt: 'Google app logo',
          height: 0,
          url: imageUrl,
          width: 0,
        },
        title: 'Google has more than 70 offices in more than 40 countries.',
      },
    },
    firstSimple: {
      speech: prefix + ' ' + fact,
      text: prefix,
    },
    suggestions: [
      {
        title: 'Yes',
      },
      {
        title: 'No',
      },
      {
        title: 'Headquarters',
      },
      {
        title: 'History',
      },
      {
        title: 'Quit',
      },
    ],
  })
})

test('slot filling information passed to conv', async t => {
  const numberSlot: Schema.Slot = {
    mode: Schema.SlotMode.Required,
    status: Schema.SlotStatus.SlotUnspecified,
    updated: false,
    value: '342',
  }
  const dateSlot: Schema.Slot ={
    mode: Schema.SlotMode.Required,
    status: Schema.SlotStatus.SlotUnspecified,
    value: {
      nanos: 0,
      day: 3,
      seconds: 0,
      month: 10,
      minutes: 0,
      hours: 15,
      year: 2019,
    },
    updated: true,
  }
  const dateSlotName = 'futureDate'
  const numberSlotName = 'number'
  const slotsReq: Record<string, Schema.Slot> = {}
  slotsReq[dateSlotName] = dateSlot
  slotsReq[numberSlotName] = numberSlot

  const handlerName = 'handlerName'
  const webhookRequest = requestBuilder(handlerName, slotsReq)
  const app = conversation()
  app.handle(handlerName, conv => {
    const convNumberSlot = conv.scene.slots![numberSlotName] as Schema.Slot
    t.is(convNumberSlot.mode, numberSlot.mode)
    t.is(convNumberSlot.status, numberSlot.status)
    t.is(convNumberSlot.updated, numberSlot.updated)
    t.is(convNumberSlot.value, numberSlot.value)

    const convDateSlot = conv.scene.slots![dateSlotName] as Schema.Slot
    t.is(convDateSlot.mode, dateSlot.mode)
    t.is(convDateSlot.status, dateSlot.status)
    t.is(convDateSlot.value, dateSlot.value)
    t.is(convDateSlot.updated, dateSlot.updated)
  })
  await app.handler(webhookRequest as Schema.HandlerRequest, {})
})

test('conv.append appends response', async t => {
  const handlerName = 'handlerName'
  const response = 'abcdefg1234567'
  const app = conversation()
  // const session = 'abcdefghijk'
  app.handle(handlerName, conv => {
    conv.append(response)
    conv.append(response)
  })
  const res = await app.handler(
    requestBuilder(handlerName, {}) as Schema.HandlerRequest, {})
  t.is(res.status, 200)
  t.log(JSON.stringify(clone(res.body)))
  t.deepEqual(clone(res.body), {
    session: {
      id: '7250447207398852357',
      params: {},
    },
    prompt: {
      override: false,
      firstSimple: {
        speech: response + response,
        text: '',
      },
    },
  })
})

test('Canvas response sent', async t => {
  const handlerName = 'handlerName'
  const app = conversation()
  // const session = 'abcdefghijk'
  app.handle(handlerName, conv => {
    conv.add(new Canvas({
      url: 'https://studio-eap.firebaseapp.com',
      data: [{
        sample: 'data payload',
        command: 'TINT',
        tint: 'GREEN',
      }],
      suppressMic: true,
    }))
  })
  const res = await app.handler(
    requestBuilder(handlerName, {}) as Schema.HandlerRequest, {})
  t.is(res.status, 200)
  t.log(JSON.stringify(clone(res.body)))
  t.deepEqual(clone(res.body), {
    session: {
      id: '7250447207398852357',
      params: {},
    },
    prompt: {
      override: false,
      canvas: {
        url: 'https://studio-eap.firebaseapp.com',
        data: [{
          sample: 'data payload',
          command: 'TINT',
          tint: 'GREEN',
        }],
        suppressMic: true,
      },
    },
  })
})

test('app instance contains health check handler', async t => {
  const handlerName = 'actions.handler.HEALTH_CHECK'
  const app = conversation()
  const res = await app.handler(
    requestBuilder(handlerName, {}) as Schema.HandlerRequest, {})
  t.is(res.status, 200)
  t.log(JSON.stringify(clone(res.body)))
  t.deepEqual(clone(res.body), {})
})

test('TypeOverride#mode gets converted to typeOverrideMode for now', (t) => {
  const app = conversation()
  let invoked = false

  const handler = (conv: ConversationV3) => {
    invoked = true
    t.log(JSON.stringify(conv))
    conv.session.typeOverrides!.push({
      name: 'override',
      synonym: {
        entries: [{
          name: 'test',
          synonyms: ['testing'],
        }],
      },
      mode: 'TYPE_MERGE' as Schema.Mode,
    })
    return conv.add('hello')
  }
  app.handle(HANDLE_NAME, handler)
  const promise = app.handler(buildRequest(), {})
  return promise.then((result) => {
    t.log(JSON.stringify(result.body))
    t.true(invoked)
    t.is(result.status, 200)
    t.deepEqual(result.body, {
      session: {
        id: SESSION_ID,
        params: {},
        typeOverrides: [
          {
            name: 'override',
            synonym: {
              entries: [{
                name: 'test',
                synonyms: ['testing'],
              }],
            },
            typeOverrideMode: 'TYPE_MERGE',
          },
        ],
      },
      prompt: {
        override: false,
        firstSimple: {
          speech: 'hello',
          text: '',
        },
      },
    })
  })
})

test('expected languageCode can be set', (t) => {
  const app = conversation()
  let invoked = false

  const handler = (conv: ConversationV3) => {
    invoked = true
    conv.add('hello')
    conv.expected.languageCode = 'en-US'
  }
  app.handle(HANDLE_NAME, handler)
  const promise = app.handler(buildRequest(), {})
  return promise.then((result) => {
    t.log(JSON.stringify(result.body))
    t.true(invoked)
    t.is(result.status, 200)
    t.deepEqual(result.body, {
      session: {
        id: '5485438717547546495',
        params: {},
      },
      prompt: {
        override: false,
        firstSimple: {
          speech: 'hello',
          text: '',
        },
      },
      expected: {
        languageCode: 'en-US',
      },
    })
  })
})

test('expected speech can be set', (t) => {
  const app = conversation()
  let invoked = false

  const handler = (conv: ConversationV3) => {
    invoked = true
    conv.add('hello')
    conv.expected.speech = ['first', 'second']
  }
  app.handle(HANDLE_NAME, handler)
  const promise = app.handler(buildRequest(), {})
  return promise.then((result) => {
    t.log(JSON.stringify(result.body))
    t.true(invoked)
    t.is(result.status, 200)
    t.deepEqual(result.body, {
      session: {
        id: '5485438717547546495',
        params: {},
      },
      prompt: {
        override: false,
        firstSimple: {
          speech: 'hello',
          text: '',
        },
      },
      expected: {
        speech: ['first', 'second'],
      },
    })
  })
})

test('expected languageCode and speech can be set', (t) => {
  const app = conversation()
  let invoked = false

  const handler = (conv: ConversationV3) => {
    invoked = true
    conv.add('hello')
    conv.expected.languageCode = 'en-US'
    conv.expected.speech = ['first', 'second']
  }
  app.handle(HANDLE_NAME, handler)
  const promise = app.handler(buildRequest(), {})
  return promise.then((result) => {
    t.log(JSON.stringify(result.body))
    t.true(invoked)
    t.is(result.status, 200)
    t.deepEqual(result.body, {
      session: {
        id: '5485438717547546495',
        params: {},
      },
      prompt: {
        override: false,
        firstSimple: {
          speech: 'hello',
          text: '',
        },
      },
      expected: {
        languageCode: 'en-US',
        speech: ['first', 'second'],
      },
    })
  })
})

test('expected language is aliased to languageCode', (t) => {
  const app = conversation()
  let invoked = false

  const handler = (conv: ConversationV3) => {
    invoked = true
    conv.add('hello')
    conv.expected.language = 'en-US'
  }
  app.handle(HANDLE_NAME, handler)
  const promise = app.handler(buildRequest(), {})
  return promise.then((result) => {
    t.log(JSON.stringify(result.body))
    t.true(invoked)
    t.is(result.status, 200)
    t.deepEqual(result.body, {
      session: {
        id: '5485438717547546495',
        params: {},
      },
      prompt: {
        override: false,
        firstSimple: {
          speech: 'hello',
          text: '',
        },
      },
      expected: {
        languageCode: 'en-US',
      },
    })
  })
})

test('setting home params without original works', async (t) => {
  const app = conversation()
  let invoked = false

  const handler = (conv: ConversationV3) => {
    invoked = true
    conv.add('hello')
    conv.home.params.test = 'hello'
  }
  app.handle(HANDLE_NAME, handler)
  const result = await app.handler({
    handler: {
      name: HANDLE_NAME,
    },
    scene: {
      name: CURRENT_SCENE,
    },
    session: {
      id: SESSION_ID,
    },
    user:{
      locale: LOCALE,
    },
    device: {
      capabilities: CAPABILITIES,
    },
  }, {})
  t.log(JSON.stringify(result.body))
  t.true(invoked)
  t.is(result.status, 200)
  t.deepEqual(result.body, {
    session: {
      id: '5485438717547546495',
      params: {},
    },
    home: {
      params: {
        test: 'hello',
      },
    },
    prompt: {
      override: false,
      firstSimple: {
        speech: 'hello',
        text: '',
      },
    },
  })
})

test('setting home params with original works', async (t) => {
  const app = conversation()
  let invoked = false

  const handler = (conv: ConversationV3) => {
    invoked = true
    conv.add('hello')
    conv.home.params.test = 'hello'
  }
  app.handle(HANDLE_NAME, handler)
  const result = await app.handler({
    handler: {
      name: HANDLE_NAME,
    },
    scene: {
      name: CURRENT_SCENE,
    },
    session: {
      id: SESSION_ID,
    },
    user:{
      locale: LOCALE,
    },
    home: {
      params: {
        test: 'hi',
      },
    },
    device: {
      capabilities: CAPABILITIES,
    },
  }, {})
  t.log(JSON.stringify(result.body))
  t.true(invoked)
  t.is(result.status, 200)
  t.deepEqual(result.body, {
    session: {
      id: '5485438717547546495',
      params: {},
    },
    home: {
      params: {
        test: 'hello',
      },
    },
    prompt: {
      override: false,
      firstSimple: {
        speech: 'hello',
        text: '',
      },
    },
  })
})

test('setting home params with different original param unchanged works', async (t) => {
  const app = conversation()
  let invoked = false

  const handler = (conv: ConversationV3) => {
    invoked = true
    conv.add('hello')
    conv.home.params.test = 'hello'
  }
  app.handle(HANDLE_NAME, handler)
  const result = await app.handler({
    handler: {
      name: HANDLE_NAME,
    },
    scene: {
      name: CURRENT_SCENE,
    },
    session: {
      id: SESSION_ID,
    },
    user:{
      locale: LOCALE,
    },
    home: {
      params: {
        test: 'hi',
        testing: 'hi',
      },
    },
    device: {
      capabilities: CAPABILITIES,
    },
  }, {})
  t.log(JSON.stringify(result.body))
  t.true(invoked)
  t.is(result.status, 200)
  t.deepEqual(result.body, {
    session: {
      id: '5485438717547546495',
      params: {},
    },
    home: {
      params: {
        test: 'hello',
        testing: 'hi',
      },
    },
    prompt: {
      override: false,
      firstSimple: {
        speech: 'hello',
        text: '',
      },
    },
  })
})

test('home params with no change outputs nothing', async (t) => {
  const app = conversation()
  let invoked = false

  const handler = (conv: ConversationV3) => {
    invoked = true
    conv.add('hello')
  }
  app.handle(HANDLE_NAME, handler)
  const result = await app.handler({
    handler: {
      name: HANDLE_NAME,
    },
    scene: {
      name: CURRENT_SCENE,
    },
    session: {
      id: SESSION_ID,
    },
    user:{
      locale: LOCALE,
    },
    home: {
      params: {
        test: 'hi',
        testing: 'hi',
      },
    },
    device: {
      capabilities: CAPABILITIES,
    },
  }, {})
  t.log(JSON.stringify(result.body))
  t.true(invoked)
  t.is(result.status, 200)
  t.deepEqual(result.body, {
    session: {
      id: '5485438717547546495',
      params: {},
    },
    prompt: {
      override: false,
      firstSimple: {
        speech: 'hello',
        text: '',
      },
    },
  })
})

test('session with languageCode returns only languageCode', async (t) => {
  const app = conversation()
  let invoked = false

  const handler = (conv: ConversationV3) => {
    invoked = true
    conv.add('hello')
  }
  app.handle(HANDLE_NAME, handler)
  const result = await app.handler({
    handler: {
      name: HANDLE_NAME,
    },
    scene: {
      name: CURRENT_SCENE,
    },
    session: {
      id: SESSION_ID,
      languageCode: '',
    },
    user:{
      locale: LOCALE,
    },
    home: {
      params: {
        test: 'hi',
        testing: 'hi',
      },
    },
    device: {
      capabilities: CAPABILITIES,
    },
  }, {})
  t.log(JSON.stringify(result.body))
  t.true(invoked)
  t.is(result.status, 200)
  t.deepEqual(result.body, {
    session: {
      id: '5485438717547546495',
      params: {},
      languageCode: '',
    },
    prompt: {
      override: false,
      firstSimple: {
        speech: 'hello',
        text: '',
      },
    },
  })
})


test('multiple handler names work', async (t) => {
  const app = conversation()
  let invoked = false

  const names = ['name1', 'name2']

  const handler = (conv: ConversationV3) => {
    invoked = true
    conv.add('hello')
  }
  app.handle(names, handler)
  let result = await app.handler({
    handler: {
      name: names[0],
    },
    scene: {
      name: CURRENT_SCENE,
    },
    session: {
      id: SESSION_ID,
      languageCode: '',
    },
    user:{
      locale: LOCALE,
    },
    home: {
      params: {
        test: 'hi',
        testing: 'hi',
      },
    },
    device: {
      capabilities: CAPABILITIES,
    },
  }, {})
  t.log(JSON.stringify(result.body))
  t.true(invoked)
  t.is(result.status, 200)
  t.deepEqual(result.body, {
    session: {
      id: '5485438717547546495',
      params: {},
      languageCode: '',
    },
    prompt: {
      override: false,
      firstSimple: {
        speech: 'hello',
        text: '',
      },
    },
  })

  invoked = false
  result = await app.handler({
    handler: {
      name: names[1],
    },
    scene: {
      name: CURRENT_SCENE,
    },
    session: {
      id: SESSION_ID,
      languageCode: '',
    },
    user:{
      locale: LOCALE,
    },
    home: {
      params: {
        test: 'hi',
        testing: 'hi',
      },
    },
    device: {
      capabilities: CAPABILITIES,
    },
  }, {})
  t.log(JSON.stringify(result.body))
  t.true(invoked)
  t.is(result.status, 200)
  t.deepEqual(result.body, {
    session: {
      id: '5485438717547546495',
      params: {},
      languageCode: '',
    },
    prompt: {
      override: false,
      firstSimple: {
        speech: 'hello',
        text: '',
      },
    },
  })
})

test('media progress is parsed correctly', async (t) => {
  const app = conversation()
  let invoked = false
  let progress = ''

  const handler = (conv: ConversationV3) => {
    invoked = true
    progress = conv.context.media?.progress!
    conv.add('hello')
  }
  app.handle(HANDLE_NAME, handler)
  const result = await app.handler({
    handler: {
      name: HANDLE_NAME,
    },
    scene: {
      name: CURRENT_SCENE,
    },
    session: {
      id: SESSION_ID,
    },
    user:{
      locale: LOCALE,
    },
    context: {
      media: {
        progress: 'test progress',
      },
    },
    device: {
      capabilities: CAPABILITIES,
    },
  }, {})
  t.log(JSON.stringify(result.body))
  t.true(invoked)
  t.is(progress, 'test progress')
  t.is(result.status, 200)
  t.deepEqual(result.body, {
    session: {
      id: '5485438717547546495',
      params: {},
    },
    prompt: {
      override: false,
      firstSimple: {
        speech: 'hello',
        text: '',
      },
    },
  })
})
