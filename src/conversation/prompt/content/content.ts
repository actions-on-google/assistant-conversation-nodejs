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
import { Card } from './card'
import { Collection } from './collection'
import { CollectionBrowse } from './collectionBrowse'
import { Image } from './image'
import { List } from './list'
import { Media } from './media'
import { Table } from './table'

export type PromptContent =
  Card |
  Collection |
  CollectionBrowse |
  Image |
  List |
  Media |
  Table

export class Content {
  /**
   * A basic card.
   */
  card?: Schema.Card | undefined
  /**
   * A collection.
   */
  collection?: Schema.Collection | undefined
  /**
   * A card presenting a collection of web pages to open.
   */
  collectionBrowse?: Schema.CollectionBrowse | undefined
  /**
   * An image.
   */
  image?: Schema.Image | undefined
  /**
   * A list.
   */
  list?: Schema.List | undefined
  /**
   * Response indicating a set of media to be played.
   */
  media?: Schema.Media | undefined
  /**
   * Table card.
   */
  table?: Schema.Table | undefined

  constructor(input: Schema.Content = {}) {
    const {
      card = null,
      collection = null,
      collectionBrowse = null,
      image = null,
      list = null,
      media = null,
      table = null,
    } = input

    if (card) {
      this.card = card
    }
    if (collection) {
      this.collection = collection
    }
    if (collectionBrowse) {
      this.collectionBrowse = collectionBrowse
    }
    if (image) {
      this.image = image
    }
    if (list) {
      this.list = list
    }
    if (media) {
      this.media = media
    }
    if (table) {
      this.table = table
    }
  }
}
