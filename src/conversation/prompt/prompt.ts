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

import { Simple } from './simple'
import { Suggestion } from './suggestion'
import { Canvas } from './canvas'
import { Link } from './content/link'
import { Content } from './content/content'
import { Card } from './content/card'
import { Collection } from './content/collection'
import { CollectionBrowse } from './content/collectionBrowse'
import { Image } from './content/image'
import { List } from './content/list'
import { Media } from './content/media'
import { Table } from './content/table'
import { OrderUpdate } from './content/order'

export type PromptItem =
  string |
  Simple |
  Content |
  Card |
  Collection |
  CollectionBrowse |
  Canvas |
  Image |
  List |
  Media |
  Table |
  Link |
  Suggestion |
  Canvas |
  OrderUpdate

const addSimple = (prompt: Prompt, simple: Simple) => {
  if(prompt.firstSimple && prompt.lastSimple) {
    throw new Error('Error adding simple response: Two simple responses already defined')
  }
  if(prompt.firstSimple && !prompt.lastSimple){
    prompt.lastSimple = new Simple(simple)
  }
  if(!prompt.firstSimple && !prompt.lastSimple){
    prompt.firstSimple = new Simple(simple)
  }
  if(!prompt.firstSimple && prompt.lastSimple){
    prompt.firstSimple = new Simple(simple)
  }
}

const appendFirstSimple = (prompt: Prompt, speech: string) => {
  if(!prompt.firstSimple){
    prompt.firstSimple = new Simple(speech)
  } else {
    prompt.firstSimple.speech += speech
  }
}

const addSuggestion = (prompt: Prompt, suggestion: Suggestion) => {
  if (!prompt.suggestions) {
    prompt.suggestions = []
  }
  // Maximum of 8 suggestions
  // https://developers.google.com/assistant/conversational/prompts#suggestions
  if (prompt.suggestions.length >= 8) {
    throw new Error('Error adding suggestion: Max number of suggestion (8) already added.')
  } else {
    prompt.suggestions.push(suggestion)
  }
}

export class Prompt implements Schema.Prompt {
  content: Content | undefined
  firstSimple: Simple | undefined
  lastSimple: Simple | undefined
  link: Link | undefined
  suggestions: Suggestion[] | undefined
  canvas: Canvas | undefined
  orderUpdate: OrderUpdate | undefined
  override: boolean | undefined

  /** @hidden */
  constructor(input: Schema.Prompt = {}) {
    const {
      override = false,
      content = null,
      firstSimple = null,
      lastSimple = null,
      link = null,
      suggestions = null,
      canvas = null,
      orderUpdate = null,
    } = input
    this.override = override
    if (content) {
      this.content = new Content(content)
    }
    if (firstSimple) {
      this.firstSimple = new Simple(firstSimple)
    }
    if (lastSimple) {
      this.lastSimple = new Simple(lastSimple)
    }
    if (link) {
      this.link = new Link(link)
    }
    if (suggestions){
      for (const suggestion of suggestions) {
        addSuggestion(this, new Suggestion(suggestion))
      }
    }
    if (canvas){
      this.canvas = new Canvas(canvas)
    }
    if (orderUpdate) {
      this.orderUpdate = new OrderUpdate(orderUpdate)
    }
  }

  append(item: string) {
    if (typeof item === 'string') {
      appendFirstSimple(this, item)
    } else {
      throw new Error('append only supports strings')
    }
    return this
  }

  add(...items: PromptItem[]) {
    for (const item of items) {
      if (typeof item === 'string') {
        addSimple(this, new Simple(item))
        continue
      }
      if (item instanceof Content) {
        this.content = item
        continue
      }
      if (item instanceof Card) {
        if (!this.content) {
          this.content = new Content({})
        }
        this.content.card = item
        continue
      }
      if (item instanceof Collection) {
        if (!this.content) {
          this.content = new Content({})
        }
        this.content.collection = item
        continue
      }
      if (item instanceof CollectionBrowse) {
        if (!this.content) {
          this.content = new Content({})
        }
        this.content.collectionBrowse = item
        continue
      }
      if (item instanceof Canvas) {
        this.canvas = item
        continue
      }
      if (item instanceof Image) {
        if (!this.content) {
          this.content = new Content({})
        }
        this.content.image = item
        continue
      }
      if (item instanceof List) {
        if (!this.content) {
          this.content = new Content({})
        }
        this.content.list = item
        continue
      }
      if (item instanceof Media) {
        if (!this.content) {
          this.content = new Content({})
        }
        this.content.media = item
        continue
      }
      if (item instanceof Table) {
        if (!this.content) {
          this.content = new Content({})
        }
        this.content.table = item
        continue
      }
      if (item instanceof Simple) {
        addSimple(this, item)
        continue
      }
      if (item instanceof Link) {
        this.link = item
        continue
      }
      if (item instanceof OrderUpdate) {
        this.orderUpdate = item
        continue
      }
      if (item instanceof Suggestion) {
        addSuggestion(this, item)
        continue
      }
    }
    return this
  }
}
