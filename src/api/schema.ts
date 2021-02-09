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

// DO NOT MANUALLY EDIT: this file contains types generated from protobuf messages

/* tslint:disable:no-any max-line-length auto generated from protobufs */

/**
 * Represents a request sent to a developer's fulfillment by Google.
 */
export interface HandlerRequest {
  /**
   * Optional. Information of current context of the request. Includes but isn't limited to
   * active media session info or canvas info.
   */
  context?: Context
  /**
   * Required. Info on the device the user is using to interact with the Action.
   */
  device?: Device
  /**
   * Required. Information to fulfillment on how to handle the request. For example a request
   * intending to get a fact might have a handler with a name of "getFact".
   */
  handler?: Handler
  /**
   * Optional. Information related to the HomeGraph structure that the target device belongs
   * to. See https://developers.google.com/actions/smarthome/concepts/homegraph.
   */
  home?: Home
  /**
   * Required. Represents the last matched intent.
   */
  intent?: Intent
  /**
   * Optional. Info on the current and next scene when the function was called. Will be filled
   * when the fulfillment call is made within the scope of a scene.
   */
  scene?: Scene
  /**
   * Required. Holds session data like the session id and session parameters.
   */
  session?: Session
  /**
   * Required. User who initiated the conversation.
   */
  user?: User
}

/**
 * Optional. Information of current context of the request. Includes but isn't limited to
 * active media session info or canvas info.
 *
 * Contains context information when user makes query. Such context includes but not limited
 * to info about active media session, state of canvas web app, etc.
 */
export interface Context {
  /**
   * Contains context information about current canvas.
   */
  canvas?: CanvasContext
  /**
   * Contains context information about current active media session.
   */
  media?: MediaContext
}

/**
 * Contains context information about current canvas.
 */
export interface CanvasContext {
  /**
   * Optional. State set by 3P Interactive Canvas app. This is only set for request, not for
   * response. For example, if this is a recipe app, the state can be a value of struct : {
   * "current_page" : 5, "last_page" : 3, } The size limit is 50KB.
   */
  state?: any
}

/**
 * Contains context information about current active media session.
 */
export interface MediaContext {
  /**
   * Media progress of current active media file.
   */
  progress?: string
}

/**
 * Required. Info on the device the user is using to interact with the Action.
 *
 * Represents the device the user is using to make a request to the Action.
 *
 * Optional. Use to move between Assistant devices the user has access to.
 */
export interface Device {
  /**
   * Required. the capabilities of the device making a request to the Action.
   */
  capabilities?: Capability[]
}

export enum Capability {
  InteractiveCanvas = 'INTERACTIVE_CANVAS',
  LongFormAudio = 'LONG_FORM_AUDIO',
  RichResponse = 'RICH_RESPONSE',
  Speech = 'SPEECH',
  Unspecified = 'UNSPECIFIED',
  WebLink = 'WEB_LINK',
}

/**
 * Required. Information to fulfillment on how to handle the request. For example a request
 * intending to get a fact might have a handler with a name of "getFact".
 *
 * Represents a fulfillment handler that maps event information from Actions on Google to
 * fulfillment. Use the handler name to determine what code you should run in fulfillment.
 * For instance, a handler might be used to get information on a user's order information
 * with a handler name like "OrderLookup" while another might get product information from a
 * database, with a handler name like "GetProductInfo".
 */
export interface Handler {
  /**
   * Optional. The name of the handler.
   */
  name?: string
}

/**
 * Optional. Information related to the HomeGraph structure that the target device belongs
 * to. See https://developers.google.com/actions/smarthome/concepts/homegraph.
 *
 * Represents the HomeGraph structure that the user's target device belongs to.
 *
 * Optional. Used to specify parameters related to the HomeGraph structure that the target
 * device belongs to. See https://developers.google.com/actions/smarthome/concepts/homegraph.
 */
export interface Home {
  /**
   * Optional. List of parameters associated with the HomeGraph structure the target device
   * belongs to.
   */
  params?: { [key: string]: any }
}

/**
 * Required. Represents the last matched intent.
 *
 * Represents an intent.
 */
export interface Intent {
  /**
   * Required. The name of the last matched intent.
   */
  name?: string
  /**
   * Required. Represents parameters identified as part of intent matching. This is a map of
   * the name of the identified parameter to the value of the parameter identified from user
   * input. All parameters defined in the matched intent that are identified will be surfaced
   * here.
   */
  params?: { [key: string]: IntentParameterValue }
  /**
   * Optional. Typed or spoken input from the end user that matched this intent. This will be
   * populated when an intent is matched, based on the user input.
   */
  query?: string
}

export interface IntentParameterValue {
  /**
   * Required. Original text value extracted from user utterance.
   */
  original?: string
  /**
   * Required. Structured value for parameter extracted from user utterance.
   * This will only be populated if the parameter is defined in the matched
   * intent and the value of the parameter could be identified during intent
   * matching.
   */
  resolved?: any
}

/**
 * Optional. Info on the current and next scene when the function was called. Will be filled
 * when the fulfillment call is made within the scope of a scene.
 *
 * Represent a scene. Scenes can call fulfillment, add prompts, and collect slot values from
 * the user. Scenes are triggered by events or intents and can trigger events and match
 * intents to transition to other scenes.
 *
 * Optional. Represents the current and next scene. If `Scene.next` is set the runtime will
 * immediately transition to the specified scene.
 */
export interface Scene {
  /**
   * Required. Name of the current scene.
   */
  name?: string
  /**
   * Optional. Information on the scene to be executed next.
   */
  next?: NextScene
  /**
   * Required. The current status of slot filling. This field is read-only.
   */
  slotFillingStatus?: SlotFillingStatus
  /**
   * The slots associated with the current scene. Handler responses cannot return slots which
   * were not sent in the request.
   */
  slots?: { [key: string]: Slot }
}

export interface Slot {
  /**
   * The mode of the slot (required or optional). Settable by developer.
   */
  mode?: SlotMode
  /**
   * Optional. This prompt is sent to the user when needed to fill a required
   * slot. This prompt overrides the existing prompt defined in the console.
   * This field is not included in the webhook request.
   */
  prompt?: Prompt
  /**
   * The status of the slot.
   */
  status?: SlotStatus
  /**
   * Indicates if the slot value was collected on the last turn.
   * This field is read-only.
   */
  updated?: boolean
  /**
   * The value of the slot. Changing this value in the response, will
   * modify the value in slot filling.
   */
  value?: any
}

export enum SlotMode {
  ModeUnspecified = 'MODE_UNSPECIFIED',
  Optional = 'OPTIONAL',
  Required = 'REQUIRED',
}

export enum SlotStatus {
  SlotUnspecified = 'SLOT_UNSPECIFIED',
  Empty = 'EMPTY',
  Invalid = 'INVALID',
  Filled = 'FILLED',
}

/**
 * Optional. Information on the scene to be executed next.
 *
 * Represents the scene to be executed next.
 */
export interface NextScene {
  /**
   * Name of the scene to be executed next.
   */
  name?: string
}

/**
 * Required. The current status of slot filling. This field is read-only.
 */
export enum SlotFillingStatus {
  Collecting = 'COLLECTING',
  Final = 'FINAL',
  Initialized = 'INITIALIZED',
  Unspecified = 'UNSPECIFIED',
}

/**
 * Required. Holds session data like the session id and session parameters.
 *
 * Contains information on the current conversation session
 *
 * Optional. Describes data for the current session, session parameters can be created,
 * updated, or removed by the fulfillment.
 */
export interface Session {
  /**
   * Required. Globally unique ID of the current conversation session. This field is read-only.
   */
  id?: string
  /**
   * Language of the current conversation session. Follows IETF BCP-47 language code
   * http://www.rfc-editor.org/rfc/bcp/bcp47.txt. This could be different from user locale if
   * the action uses multi-language features. For example, when
   * handler_response.expected.language_code is set, it changes the conversation language for
   * all following turns, which will be reflected in this field.
   */
  languageCode?: string
  /**
   * Required. List of all parameters collected from forms and intents during the session. Key
   * is the parameter name. Parameters defined here will be merged with parameters already
   * defined in the session. Parameters with a null value will be removed from the session.
   */
  params?: { [key: string]: any }
  /**
   * Optional. Types scoped to the session. Session type defines can supplement or replace
   * existing types. Type names must be unique.
   */
  typeOverrides?: TypeOverride[]
}

/**
 * Represents an override for a type.
 */
export interface TypeOverride {
  /**
   * Required. How this type should be merged with other type values.
   */
  mode?: Mode
  /**
   * Required. Name of the type to supplement or override.
   */
  name?:    string
  synonym?: SynonymType
}

/**
 * Required. How this type should be merged with other type values.
 */
export enum Mode {
  TypeMerge = 'TYPE_MERGE',
  TypeReplace = 'TYPE_REPLACE',
  TypeUnspecified = 'TYPE_UNSPECIFIED',
}

/**
 * Represents a type with synonyms.
 */
export interface SynonymType {
  /**
   * Required. List of entries for the synonym type.
   */
  entries?: Entry[]
}

/**
 * Represents a entry for a synonym type.
 */
export interface Entry {
  /**
   * Optional. The item display's information.
   */
  display?: EntryDisplay
  /**
   * Required. Name of the entry (e.g. "bicycle"). The entry in this field must be included in
   * repeated synonyms field to be recogonized as a valid type value.
   */
  name?: string
  /**
   * Required. List of synonyms for the entry (e.g. "bike", "cycle").
   */
  synonyms?: string[]
}

/**
 * Optional. The item display's information.
 */
export interface EntryDisplay {
  /**
   * Optional. Body text of the card.
   */
  description?: string
  /**
   * Optional. Footer text for the browsing collection item, displayed below the description.
   * Single line of text, truncated with an ellipsis.
   */
  footer?: string
  /**
   * Optional. The image to display.
   */
  image?: Image
  /**
   * URL of document associated with browsing carousel item. Required for browsing carousel.
   */
  openUrl?: OpenURL
  /**
   * Required. Title of the item. When tapped, this text will be posted back to the
   * conversation verbatim as if the user had typed it. Each title must be unique among the
   * set of collection items.
   */
  title?: string
}

/**
 * Optional. The image to display.
 *
 * An image displayed in the card.
 *
 * A hero image for the card. The height is fixed to 192dp. Optional.
 *
 * Image for the collection item.
 *
 * An image.
 *
 * A small image icon displayed on the right from the title. It's resized to 36x36 dp.
 *
 * A large image, such as the cover of the album, etc.
 *
 * Image associated with the table. Optional.
 */
export interface Image {
  /**
   * A text description of the image to be used for accessibility, e.g. screen readers.
   * Required.
   */
  alt?: string
  /**
   * The height of the image in pixels. Optional.
   */
  height?: number
  /**
   * The source url of the image. Images can be JPG, PNG and GIF (animated and non-animated).
   * For example,`https://www.agentx.com/logo.png`. Required.
   */
  url?: string
  /**
   * The width of the image in pixels. Optional.
   */
  width?: number
}

/**
 * URL of document associated with browsing carousel item. Required for browsing carousel.
 *
 * What happens when a user opens the link
 *
 * Required. URI to open if the item selected.
 */
export interface OpenURL {
  /**
   * Indicates a hint for the url type.
   */
  hint?: Hint
  /**
   * The url field which could be any of: - http/https urls for opening an App-linked App or a
   * webpage
   */
  url?: string
}

/**
 * Indicates a hint for the url type.
 */
export enum Hint {
  Amp = 'AMP',
  LinkUnspecified = 'LINK_UNSPECIFIED',
}

/**
 * Required. User who initiated the conversation.
 *
 * Represents the user making a request to the Action.
 *
 * Optional. Use to specify user parameters to send back.
 */
export interface User {
  /**
   * Whether the user account is linked to the app.
   */
  accountLinkingStatus?: AccountLinkingStatus
  /**
   * The engagement of the current user including any subscriptions to intents.
   */
  engagement?: Engagement
  /**
   * The timestamp of the last interaction with this user. This field will be omitted if the
   * user has not interacted with the agent before.
   */
  lastSeenTime?: string
  /**
   * Primary locale setting of the user making the request. Follows IETF BCP-47 language code
   * http://www.rfc-editor.org/rfc/bcp/bcp47.txt However, the script subtag is not included.
   */
  locale?: string
  /**
   * User's entitlements related to the Android package associated with the current action.
   */
  packageEntitlements?: PackageEntitlements[]
  /**
   * Optional. List of all parameters associated with the current user.
   */
  params?: { [key: string]: any }
  /**
   * Indicates the verification status of the user.
   */
  verificationStatus?: VerificationStatus
}

/**
 * Whether the user account is linked to the app.
 */
export enum AccountLinkingStatus {
  AccountLinkingStatusUnspecified = 'ACCOUNT_LINKING_STATUS_UNSPECIFIED',
  Linked = 'LINKED',
  NotLinked = 'NOT_LINKED',
}

/**
 * The engagement of the current user including any subscriptions to intents.
 *
 * Provides additional read-only information about what engagement mechanisms the current
 * user has registered for. For example, it can be useful to know what intents the user is
 * already subscribed to in order to avoid asking them to subscribe to the same intent
 * again. i.e. This information can be used to conditionally route to a scene to set up
 * DailyUpdates or PushNotifications only if the user has not subscribed already.
 */
export interface Engagement {
  /**
   * Contains a list of intents which the user has enabled daily update for.
   */
  dailyUpdateIntents?: IntentSubscription[]
  /**
   * Contains a list of intents which the user has enabled push notification for.
   */
  pushNotificationIntents?: IntentSubscription[]
}

/**
 * Describes an existing IntentSubscription.
 */
export interface IntentSubscription {
  /**
   * A short description of the subscription. It is used as the notification's label and when
   * Assistant is requesting permission from the user.
   */
  contentTitle?: string
  /**
   * Name of the intent which is subscribed to.
   */
  intent?: string
}

/**
 * A List of user's entitlements related to a package name.
 */
export interface PackageEntitlements {
  /**
   * The user's entitlements for the given package.
   */
  entitlements?: Entitlement[]
  /**
   * The Android package name specified in the action package.
   */
  packageName?: string
}

/**
 * Defines a user's digital entitlement.
 */
export interface Entitlement {
  /**
   * Only present for in-app purchase and in-app subs.
   */
  inAppDetails?: SignedData
  /**
   * Product sku. Package name for paid app, suffix of Finsky docid for in-app purchase and
   * in-app subscription. Match getSku() in Play InApp Billing API.
   */
  sku?: string
  /**
   * The type of SKU.
   */
  skuType?: SkuType
}

/**
 * Only present for in-app purchase and in-app subs.
 */
export interface SignedData {
  /**
   * Matches IN_APP_DATA_SIGNATURE from getPurchases() method in Play InApp Billing API.
   */
  inAppDataSignature?: string
  /**
   * Contains all inapp purchase data in JSON format. See details in table 6 of
   * https://developer.android.com/google/play/billing/billing_reference.html.
   */
  inAppPurchaseData?: { [key: string]: any }
}

/**
 * The type of SKU.
 */
export enum SkuType {
  App = 'APP',
  InApp = 'IN_APP',
  SkuTypeUnspecified = 'SKU_TYPE_UNSPECIFIED',
  Subscription = 'SUBSCRIPTION',
}

/**
 * Indicates the verification status of the user.
 */
export enum VerificationStatus {
  Guest = 'GUEST',
  UserVerificationStatusUnspecified = 'USER_VERIFICATION_STATUS_UNSPECIFIED',
  Verified = 'VERIFIED',
}

/**
 * Represents a response sent from a developer's fulfillment to Actions on Google.
 */
export interface HandlerResponse {
  /**
   * Optional. Use to move between Assistant devices the user has access to.
   */
  device?: Device
  /**
   * Optional. Describes the expectations for the next dialog turn.
   */
  expected?: Expected
  /**
   * Optional. Used to specify parameters related to the HomeGraph structure that the target
   * device belongs to. See https://developers.google.com/actions/smarthome/concepts/homegraph.
   */
  home?: Home
  /**
   * Optional. Represents the prompts to be sent to the user, these prompts will be appended
   * to previously added messages unless explicitly overwritten.
   */
  prompt?: Prompt
  /**
   * Optional. Represents the current and next scene. If `Scene.next` is set the runtime will
   * immediately transition to the specified scene.
   */
  scene?: Scene
  /**
   * Optional. Describes data for the current session, session parameters can be created,
   * updated, or removed by the fulfillment.
   */
  session?: Session
  /**
   * Optional. Use to specify user parameters to send back.
   */
  user?: User
}

/**
 * Optional. Describes the expectations for the next dialog turn.
 *
 * Describes the expectations for the next dialog turn.
 */
export interface Expected {
  /**
   * Expected language (in BCP-47 format) of user's next input.
   * For a list of supported languages, see
   * https://developers.google.com/assistant/console/languages-locales
   */
  languageCode?: string
  /**
   * List of phrases the Action expects from the user's utterance for speech biasing. Up to
   * 1000 phrases are allowed. Note: This field has the same meaning as
   * ExpectedInput.speech_biasing_hints in the v2 API.
   */
  speech?: string[]
}

/**
 * Optional. Represents the prompts to be sent to the user, these prompts will be appended
 * to previously added messages unless explicitly overwritten.
 *
 * Represent a response to a user.
 */
export interface Prompt {
  /**
   * Optional. Represents a Interactive Canvas response to be sent to the user.
   */
  canvas?: Canvas
  /**
   * Optional. A content like a card, list or media to display to the user.
   */
  content?: Content
  /**
   * Optional. The first voice and text-only response.
   */
  firstSimple?: Simple
  /**
   * Optional. The last voice and text-only response.
   */
  lastSimple?: Simple
  /**
   * Optional. An additional suggestion chip that can link out to the associated app or site.
   * The chip will be rendered with the title "Open ". Max 20 chars.
   */
  link?: Link
  /**
   * Optional Action responds with an OrderUpdate after receiving the order during the
   * transactions flow. On receipt of this, Google records this update to the order, and if
   * successful, displays a receipt card along with the TTS sent on display devices.
   */
  orderUpdate?: OrderUpdate
  /**
   * Optional. Mode for how this messages should be merged with previously defined messages.
   * "true" clears all previously defined messages (first and last simple, content,
   * suggestions link and canvas) and adds messages defined in this prompt. "false" adds
   * messages defined in this prompt to messages defined in previous responses. Leaving this
   * field to "false" also enables appending to some fields inside Simple prompts, the
   * Suggestions prompt, and the Canvas prompt (part of the Content prompt). The Content and
   * Link messages are always overwritten if defined in the prompt. Default value is "false".
   */
  override?: boolean
  /**
   * Optional. Suggestions to be displayed to the user which will always appear at the end of
   * the response. If the "override" field in the containing prompt is "false", the titles
   * defined in this field will be added to titles defined in any previously defined
   * suggestions prompts and duplicate values will be removed.
   */
  suggestions?: Suggestion[]
}

/**
 * Optional. Represents a Interactive Canvas response to be sent to the user.
 *
 * Represents an Interactive Canvas response to be sent to the user. This can be used in
 * conjunction with the "first_simple" field in the containing prompt to speak to the user
 * in addition to displaying a interactive canvas response. The maximum size of the response
 * is 50k bytes.
 *
 * A response to be used for interactive canvas experience.
 */
export interface Canvas {
  /**
   * Optional. JSON data to be passed through to the immersive experience web page as an
   * event. If the "override" field in the containing prompt is "false" data values defined in
   * this Canvas prompt will be added after data values defined in previous Canvas prompts.
   */
  data?: any[]
  /**
   * Optional. Default value: false.
   */
  suppressMic?: boolean
  /**
   * URL of the interactive canvas web app to load. If not set, the url from current active
   * canvas will be reused.
   */
  url?: string
}

/**
 * Optional. A content like a card, list or media to display to the user.
 */
export interface Content {
  /**
   * A basic card.
   */
  card?: Card
  /**
   * A card presenting a collection of options to select from.
   */
  collection?: Collection
  /**
   * A card presenting a collection of web pages to open.
   */
  collectionBrowse?: CollectionBrowse
  /**
   * An image.
   */
  image?: Image
  /**
   * A card presenting a list of options to select from.
   */
  list?: List
  /**
   * Response indicating a set of media to be played.
   */
  media?: Media
  /**
   * Table card.
   */
  table?: Table
}

/**
 * A basic card.
 *
 * A basic card for displaying some information, e.g. an image and/or text.
 */
export interface Card {
  /**
   * Button. Optional.
   */
  button?: Link
  /**
   * A hero image for the card. The height is fixed to 192dp. Optional.
   */
  image?: Image
  /**
   * How the image background will be filled. Optional.
   */
  imageFill?: ImageFill
  /**
   * Optional.
   */
  subtitle?: string
  /**
   * Body text of the card. Supports a limited set of markdown syntax for formatting.
   * Required, unless image is present.
   */
  text?: string
  /**
   * Overall title of the card. Optional.
   */
  title?: string
}

/**
 * Button. Optional.
 *
 * Button.
 *
 * Optional. An additional suggestion chip that can link out to the associated app or site.
 * The chip will be rendered with the title "Open ". Max 20 chars.
 */
export interface Link {
  /**
   * Name of the link
   */
  name?: string
  /**
   * What happens when a user opens the link
   */
  open?: OpenURL
}

/**
 * How the image background will be filled. Optional.
 *
 * How the image backgrounds of collection items will be filled. Optional.
 *
 * Type of image display option.
 */
export enum ImageFill {
  Cropped = 'CROPPED',
  Gray = 'GRAY',
  Unspecified = 'UNSPECIFIED',
  White = 'WHITE',
}

/**
 * A card presenting a collection of options to select from.
 *
 * A card for presenting a collection of options to select from.
 */
export interface Collection {
  /**
   * How the image backgrounds of collection items will be filled. Optional.
   */
  imageFill?: ImageFill
  /**
   * min: 2 max: 10
   */
  items?: CollectionItem[]
  /**
   * Subtitle of the collection. Optional.
   */
  subtitle?: string
  /**
   * Title of the collection. Optional.
   */
  title?: string
}

/**
 * An item in the collection
 */
export interface CollectionItem {
  /**
   * Required. The NLU key that matches the entry key name in the associated Type.
   */
  key?: string
}

/**
 * A card presenting a collection of web pages to open.
 *
 * Presents a set of web documents as a collection of large-tile items. Items may be
 * selected to launch their associated web document in a web viewer.
 */
export interface CollectionBrowse {
  /**
   * Type of image display option.
   */
  imageFill?: ImageFill
  /**
   * Min: 2. Max: 10.
   */
  items?: CollectionBrowseItem[]
}

/**
 * Item in the collection.
 */
export interface CollectionBrowseItem {
  /**
   * Description of the collection item.
   */
  description?: string
  /**
   * Footer text for the collection item, displayed below the description. Single line of
   * text, truncated with an ellipsis.
   */
  footer?: string
  /**
   * Image for the collection item.
   */
  image?: Image
  /**
   * Required. URI to open if the item selected.
   */
  openUriAction?: OpenURL
  /**
   * Required. Title of the collection item.
   */
  title?: string
}

/**
 * A card presenting a list of options to select from.
 *
 * A card for presenting a list of options to select from.
 */
export interface List {
  /**
   * min: 2 max: 30
   */
  items?: ListItem[]
  /**
   * Subtitle of the list. Optional.
   */
  subtitle?: string
  /**
   * Title of the list. Optional.
   */
  title?: string
}

/**
 * An item in the list
 */
export interface ListItem {
  /**
   * Required. The NLU key that matches the entry key name in the associated Type.
   */
  key?: string
}

/**
 * Response indicating a set of media to be played.
 *
 * Represents one media object. Contains information about the media, such as name,
 * description, url, etc.
 */
export interface Media {
  /**
   * 0-based index of the first Media Object in media_objects to play. If unspecified, zero or
   * out-of-bounds, playback starts at the first media object in media_objects.
   */
  firstMediaObjectIndex?: number
  /**
   * List of Media Objects
   */
  mediaObjects?: MediaObject[]
  mediaType?:    MediaType
  /**
   * Optional media control types this media response session can support. If set, request
   * will be made to 3p when a certain media event happens. If not set, 3p must still handle
   * two default control type, FINISHED and FAILED.
   */
  optionalMediaControls?: OptionalMediaControl[]
  /**
   * Repeat mode for the list of Media Objects.
   */
  repeatMode?: RepeatMode
  /**
   * Start offset of the first media object.
   */
  startOffset?: string
}

/**
 * Represents a single media object
 */
export interface MediaObject {
  /**
   * Description of this media object.
   */
  description?: string
  /**
   * Image to show with the media card.
   */
  image?: MediaImage
  /**
   * Name of this media object.
   */
  name?: string
  /**
   * The url pointing to the media content.
   */
  url?: string
}

/**
 * Image to show with the media card.
 */
export interface MediaImage {
  /**
   * A small image icon displayed on the right from the title. It's resized to 36x36 dp.
   */
  icon?: Image
  /**
   * A large image, such as the cover of the album, etc.
   */
  large?: Image
}

export enum MediaType {
  Audio = 'AUDIO',
  MediaStatusACK = 'MEDIA_STATUS_ACK',
  MediaTypeUnspecified = 'MEDIA_TYPE_UNSPECIFIED',
}

export enum OptionalMediaControl {
  OptionalMediaControlsUnspecified = 'OPTIONAL_MEDIA_CONTROLS_UNSPECIFIED',
  Paused = 'PAUSED',
  Stopped = 'STOPPED',
}

/**
 * Repeat mode for the list of Media Objects.
 */
export enum RepeatMode {
  All = 'ALL',
  Off = 'OFF',
  RepeatModeUnspecified = 'REPEAT_MODE_UNSPECIFIED',
}

/**
 * Table card.
 *
 * A table card for displaying a table of text.
 */
export interface Table {
  /**
   * Button.
   */
  button?: Link
  /**
   * Headers and alignment of columns.
   */
  columns?: TableColumn[]
  /**
   * Image associated with the table. Optional.
   */
  image?: Image
  /**
   * Row data of the table. The first 3 rows are guaranteed to be shown but others might be
   * cut on certain surfaces. Please test with the simulator to see which rows will be shown
   * for a given surface. On surfaces that support the WEB_BROWSER capability, you can point
   * the user to a web page with more data.
   */
  rows?: TableRow[]
  /**
   * Subtitle for the table. Optional.
   */
  subtitle?: string
  /**
   * Overall title of the table. Optional but must be set if subtitle is set.
   */
  title?: string
}

export interface TableColumn {
  /**
   * Horizontal alignment of content w.r.t column. If unspecified, content will be aligned to
   * the leading edge.
   */
  align?: Align
  /**
   * Header text for the column.
   */
  header?: string
}

/**
 * Horizontal alignment of content w.r.t column. If unspecified, content will be aligned to
 * the leading edge.
 */
export enum Align {
  Center = 'CENTER',
  Leading = 'LEADING',
  Trailing = 'TRAILING',
  Unspecified = 'UNSPECIFIED',
}

/**
 * Describes a row in the table.
 */
export interface TableRow {
  /**
   * Cells in this row. The first 3 cells are guaranteed to be shown but others might be cut
   * on certain surfaces. Please test with the simulator to see which cells will be shown for
   * a given surface.
   */
  cells?: TableCell[]
  /**
   * Indicates whether there should be a divider after each row.
   */
  divider?: boolean
}

/**
 * Describes a cell in a row.
 */
export interface TableCell {
  /**
   * Text content of the cell.
   */
  text?: string
}

/**
 * Optional. The first voice and text-only response.
 *
 * Represents a simple prompt to be send to a user.
 *
 * Optional. The last voice and text-only response.
 */
export interface Simple {
  /**
   * Optional. Represents the speech to be spoken to the user. Can be SSML or text to speech.
   * If the "override" field in the containing prompt is "true", the speech defined in this
   * field replaces the previous Simple prompt's speech.
   */
  speech?: string
  /**
   * Optional text to display in the chat bubble. If not given, a display rendering of the
   * speech field above will be used. Limited to 640 chars. If the "override" field in the
   * containing prompt is "true", the text defined in this field replaces to the previous
   * Simple prompt's text.
   */
  text?: string
}

/**
 * Optional Action responds with an OrderUpdate after receiving the order during the
 * transactions flow. On receipt of this, Google records this update to the order, and if
 * successful, displays a receipt card along with the TTS sent on display devices.
 *
 * Update to an order.
 */
export interface OrderUpdate {
  order?: Order
  /**
   * Reason for the change/update.
   */
  reason?: string
  /**
   * Deprecated: Use OrderUpdate.update_mask instead. If type = SNAPSHOT, OrderUpdate.order
   * should be the entire order. If type = ORDER_STATUS, this is the order level status
   * change. Only order.last_update_time and this vertical status are picked up. Note:
   * type.ORDER_STATUS only supports PurcahaseOrderExtension status updates and there is no
   * plan to extend this support. Instead, we recommend using update_mask as it is more
   * generic, extensible and can be used for all verticals.
   */
  type?: OrderUpdateType
  /**
   * Note: There are following consideration/recommendations for following special fields: 1.
   * order.last_update_time will always be updated as part of the update request. 2.
   * order.create_time, order.google_order_id and order.merchant_order_id will be ignored if
   * provided as part of the update_mask.
   */
  updateMask?: string
  /**
   * If specified, displays a notification to the user with the specified title and text.
   * Specifying a notification is a suggestion to notify and is not guaranteed to result in a
   * notification.
   */
  userNotification?: UserNotification
}

/**
 * Order entity. Note: 1. All strings at all levels must be less than 1000 chars unless
 * otherwise specified. 2. All repeated fields at all levels must be less than 50 in count
 * unless otherwise specified. 3. All timestamps at all levels, if specified, must be valid
 * timestamps.
 */
export interface Order {
  /**
   * Info about the buyer.
   */
  buyerInfo?: UserInfo
  /**
   * Required: Order contents which is a group of line items.
   */
  contents?: Contents
  /**
   * Required: Date and time the order was created.
   */
  createTime?: string
  /**
   * Disclosures associated with this order.
   */
  disclosures?: Disclosure[]
  /**
   * Follow up actions at order level.
   */
  followUpActions?: Action[]
  /**
   * Google assigned order id.
   */
  googleOrderId?: string
  /**
   * Image associated with the order.
   */
  image?: V2UIElementsImage
  /**
   * Date and time the order was last updated. Required for OrderUpdate.
   */
  lastUpdateTime?: string
  /**
   * Required: Merchant assigned internal order id. This id must be unique, and is required
   * for subsequent order update operations. This id may be set to the provided
   * google_order_id, or any other unique value. Note that the id presented to users is the
   * user_visible_order_id, which may be a different, more user-friendly value. Max allowed
   * length is 128 chars.
   */
  merchantOrderId?: string
  /**
   * Notes attached to an order.
   */
  note?: string
  /**
   * Payment related data for the order.
   */
  paymentData?: PaymentData
  /**
   * Price, discounts, taxes and so on.
   */
  priceAttributes?: PriceAttribute[]
  /**
   * All promotions that are associated with this order.
   */
  promotions?: Promotion[]
  /**
   * Purchase order
   */
  purchase?: PurchasePurchaseOrderExtension
  /**
   * A link to the terms of service that apply to order/proposed order.
   */
  termsOfServiceUrl?: string
  /**
   * Ticket order
   */
  ticket?: TicketTicketOrderExtension
  /**
   * Merchant that facilitated the checkout. This could be different from a line item level
   * provider. Example: Expedia Order with line item from ANA.
   */
  transactionMerchant?: Merchant
  /**
   * The user facing id referencing to current order. This id should be consistent with the id
   * displayed for this order in other contexts, including websites, apps and email.
   */
  userVisibleOrderId?: string
  /**
   * Deprecated: Use OrderExtensions status instead. User visible label for the state of this
   * order.
   */
  userVisibleStateLabel?: string
  /**
   * Deprecated: Use verticals instead. These properties will apply to all line items, unless
   * overridden in some line item. This vertical must match the line item level vertical type.
   * Possible values: google.actions.orders.v3.verticals.purchase.PurchaseOrderExtension
   * google.actions.orders.v3.verticals.ticket.TicketOrderExtension
   */
  vertical?: { [key: string]: any }
}

/**
 * Info about the buyer.
 *
 * Information about user. This is used to represent information of the user associated with
 * an order.
 *
 * User contact for this fulfillment.
 */
export interface UserInfo {
  /**
   * Display name of the user, might be different from first or last name.
   */
  displayName?: string
  /**
   * User email, Eg: janedoe@gmail.com.
   */
  email?: string
  /**
   * First name of the user.
   */
  firstName?: string
  /**
   * Last name of the user.
   */
  lastName?: string
  /**
   * Phone numbers of the user.
   */
  phoneNumbers?: PhoneNumber[]
}

/**
 * Standard phone number representation.
 */
export interface PhoneNumber {
  /**
   * Phone number in E.164 format, as defined in International Telecommunication Union (ITU)
   * Recommendation E.164. wiki link: https://en.wikipedia.org/wiki/E.164
   */
  e164PhoneNumber?: string
  /**
   * Extension is not standardized in ITU recommendations, except for being defined as a
   * series of numbers with a maximum length of 40 digits. It is defined as a string here to
   * accommodate for the possible use of a leading zero in the extension (organizations have
   * complete freedom to do so, as there is no standard defined). Other than digits, some
   * other dialling characters such as "," (indicating a wait) may be stored here. For
   * example, in xxx-xxx-xxxx ext. 123, "123" is the extension.
   */
  extension?: string
  /**
   * The carrier selection code that is preferred when calling this phone number domestically.
   * This also includes codes that need to be dialed in some countries when calling from
   * landlines to mobiles or vice versa. For example, in Columbia, a "3" needs to be dialed
   * before the phone number itself when calling from a mobile phone to a domestic landline
   * phone and vice versa. https://en.wikipedia.org/wiki/Telephone_numbers_in_Colombia
   * https://en.wikipedia.org/wiki/Brazilian_Carrier_Selection_Code Note this is the
   * "preferred" code, which means other codes may work as well.
   */
  preferredDomesticCarrierCode?: string
}

/**
 * Required: Order contents which is a group of line items.
 *
 * Wrapper for line items.
 */
export interface Contents {
  /**
   * List of order line items. At least 1 line_item is required and at-most 50 is allowed. All
   * line items must belong to same vertical.
   */
  lineItems?: LineItem[]
}

/**
 * One line item contains one vertical. An order or cart can have multiple line items of
 * same vertical. Sub-line items/add-ons etc should be defined in vertical protos depending
 * on their use cases. Note: 1. All strings at all levels must be less than 1000 chars
 * unless otherwise specified. 2. All repeated fields at all levels must be less than 50 in
 * count unless otherwise specified. 3. All timestamps at all levels, if specified, must be
 * valid timestamps.
 */
export interface LineItem {
  /**
   * Line item description.
   */
  description?: string
  /**
   * Disclosures associated with this line item.
   */
  disclosures?: Disclosure[]
  /**
   * Follow up actions at line item.
   */
  followUpActions?: Action[]
  /**
   * Required: Merchant assigned identifier for line item. Used for identifying existing line
   * item in applying partial updates. Max allowed length is 64 chars.
   */
  id?: string
  /**
   * Small image associated with this item, if any.
   */
  image?: V2UIElementsImage
  /**
   * Name of line item as displayed on the receipt. Max allowed length is 100 chars.
   */
  name?: string
  /**
   * Additional notes applicable to this particular line item, for example cancellation policy.
   */
  notes?: string[]
  /**
   * Line item level price and adjustments.
   */
  priceAttributes?: PriceAttribute[]
  /**
   * The provider of the particular line item, if different from the overall order. Example:
   * Expedia Order with line item provider ANA.
   */
  provider?: Merchant
  /**
   * Purchase orders like goods, food etc.
   */
  purchase?: PurchasePurchaseItemExtension
  /**
   * Line item level customers, this could be different from Order level buyer. Example: User
   * X made restaurant reservation under name of user Y.
   */
  recipients?: UserInfo[]
  /**
   * Reservation orders like restaurant, haircut etc.
   */
  reservation?: ReservationReservationItemExtension
  /**
   * Deprecated. Use vertical level status instead. For example, for purchases, use
   * PurchaseOrderExtension.status. User visible label for the state of this line item.
   */
  userVisibleStateLabel?: string
  /**
   * Deprecated: Use verticals instead. Required: Semantic Contents of line item based on its
   * type/vertical. Every vertical should include its own fulfillment details. Must be either
   * one of the following values:
   * google.actions.orders.v3.verticals.purchase.PurchaseItemExtension
   * google.actions.orders.v3.verticals.reservation.ReservationItemExtension
   * google.actions.orders.v3.verticals.ticket.TicketItemExtension
   */
  vertical?: { [key: string]: any }
}

/**
 * A product, service or policy disclosure that may be presented to the user.
 */
export interface Disclosure {
  /**
   * Content of the disclosure. Weblinks are allowed.
   */
  disclosureText?: DisclosureText
  /**
   * Presentation options for the disclosure.
   */
  presentationOptions?: DisclosurePresentationOptions
  /**
   * Title of the disclosure. Example: "Safety information".
   */
  title?: string
}

/**
 * Content of the disclosure. Weblinks are allowed.
 *
 * Represents a plain text with web links.
 */
export interface DisclosureText {
  /**
   * Text to display, containing placeholders like "{0}" and "{1}" for each textlink that
   * should be inserted. Example: "WARNING: This product can expose you to chemicals which are
   * known to the State of California to cause cancer. For more information go to {0}." This
   * disclosure text must not contain any promotional or ad-like content.
   */
  template?: string
  /**
   * Text links that should be substituted into the template. The first one will be
   * substituted for "{0}" in the template string, and the second one for "{1}", etc.
   */
  textLinks?: TextLink[]
}

/**
 * A text link that should be substituted into the template.
 */
export interface TextLink {
  /**
   * Text that should be displayed to users.
   */
  displayText?: string
  /**
   * URL to which users should be directed when the link is activated.
   */
  url?: string
}

/**
 * Presentation options for the disclosure.
 *
 * Options for the presentation of a disclosure.
 */
export interface DisclosurePresentationOptions {
  /**
   * Whether the content of the disclosure should be initially expanded. By default, it is
   * initially collapsed.
   */
  initiallyExpanded?: boolean
  /**
   * Presentation requirement of the disclosure.
   */
  presentationRequirement?: PresentationRequirement
}

/**
 * Presentation requirement of the disclosure.
 */
export enum PresentationRequirement {
  RequirementOptional = 'REQUIREMENT_OPTIONAL',
  RequirementRequired = 'REQUIREMENT_REQUIRED',
  RequirementUnspecified = 'REQUIREMENT_UNSPECIFIED',
}

/**
 * A follow-up action associated with the order or line item.
 */
export interface Action {
  /**
   * Metadata associated with an action.
   */
  actionMetadata?: ActionMetadata
  /**
   * Action to take.
   */
  openUrlAction?: V2UIElementsOpenURLAction
  /**
   * Title or label of the action, displayed to the user. Max allowed length is 100 chars.
   */
  title?: string
  /**
   * Required: Type of action.
   */
  type?: FollowUpActionType
}

/**
 * Metadata associated with an action.
 *
 * Related Metadata per action.
 */
export interface ActionMetadata {
  /**
   * Time when this action will expire.
   */
  expireTime?: string
}

/**
 * Action to take.
 *
 * Opens the given url.
 */
export interface V2UIElementsOpenURLAction {
  /**
   * Information about the Android App if the URL is expected to be fulfilled by an Android
   * App.
   */
  androidApp?: V2DevicesAndroidApp
  /**
   * The url field which could be any of: - http/https urls for opening an App-linked App or a
   * webpage
   */
  url?: string
  /**
   * Indicates a hint for the url type.
   */
  urlTypeHint?: URLTypeHint
}

/**
 * Information about the Android App if the URL is expected to be fulfilled by an Android
 * App.
 *
 * Specification of the Android App for fulfillment restrictions
 */
export interface V2DevicesAndroidApp {
  /**
   * Package name Package name must be specified when specifing Android Fulfillment.
   */
  packageName?: string
  /**
   * When multiple filters are specified, any filter match will trigger the app.
   */
  versions?: V2DevicesVersionFilter[]
}

/**
 * VersionFilter should be included if specific version/s of the App are required.
 */
export interface V2DevicesVersionFilter {
  /**
   * Max version code, inclusive. The range considered is [min_version:max_version]. A null
   * range implies any version. Examples: To specify a single version use:
   * [target_version:target_version]. To specify any version leave min_version and max_version
   * unspecified. To specify all versions until max_version, leave min_version unspecified. To
   * specify all versions from min_version, leave max_version unspecified.
   */
  maxVersion?: number
  /**
   * Min version code or 0, inclusive.
   */
  minVersion?: number
}

/**
 * Indicates a hint for the url type.
 */
export enum URLTypeHint {
  AmpContent = 'AMP_CONTENT',
  URLTypeHintUnspecified = 'URL_TYPE_HINT_UNSPECIFIED',
}

/**
 * Required: Type of action.
 */
export enum FollowUpActionType {
  Call = 'CALL',
  Cancel = 'CANCEL',
  CustomerService = 'CUSTOMER_SERVICE',
  Direction = 'DIRECTION',
  Email = 'EMAIL',
  Exchange = 'EXCHANGE',
  FixIssue = 'FIX_ISSUE',
  Modify = 'MODIFY',
  Reorder = 'REORDER',
  Return = 'RETURN',
  Review = 'REVIEW',
  TypeUnspecified = 'TYPE_UNSPECIFIED',
  ViewDetails = 'VIEW_DETAILS',
}

/**
 * Small image associated with this item, if any.
 *
 * An image displayed in the card.
 *
 * The image associated with the merchant.
 *
 * URL to a photo of the vehicle. The photo will be displayed at approximately 256x256px.
 * Must be a jpg or png. Optional.
 *
 * Performer's images.
 *
 * Image associated with the order.
 *
 * Character's images.
 */
export interface V2UIElementsImage {
  /**
   * A text description of the image to be used for accessibility, e.g. screen readers.
   * Required.
   */
  accessibilityText?: string
  /**
   * The height of the image in pixels. Optional.
   */
  height?: number
  /**
   * The source url of the image. Images can be JPG, PNG and GIF (animated and non-animated).
   * For example,`https://www.agentx.com/logo.png`. Required.
   */
  url?: string
  /**
   * The width of the image in pixels. Optional.
   */
  width?: number
}

/**
 * Price attribute of an order or a line item.
 *
 * Cost of this option.
 *
 * Relevant in case of PRICE_CHANGED / INCORRECT_PRICE error type.
 */
export interface PriceAttribute {
  /**
   * Monetary amount.
   */
  amount?: Money
  /**
   * The percentage spec, to 1/1000th of a percent. Eg: 8.750% is represented as 8750,
   * negative percentages represent percentage discounts. Deprecating this field. Can consider
   * adding back when a solid usecase is required.
   */
  amountMillipercentage?: number
  /**
   * Optional: Id of the lineitem to which this price corresponds.
   */
  id?: string
  /**
   * Required: User displayed string of the price attribute. This is sent and localized by
   * merchant.
   */
  name?: string
  /**
   * Required: State of the price: Estimate vs Actual.
   */
  state?: State
  /**
   * Whether the price is tax included.
   */
  taxIncluded?: boolean
  /**
   * Required: Type of money attribute.
   */
  type?: PriceAttributeType
}

/**
 * Monetary amount.
 *
 * Represents an amount of money with its currency type.
 */
export interface Money {
  /**
   * Amount in micros. For example, this field should be set as 1990000 for $1.99.
   */
  amountInMicros?: string
  /**
   * The 3-letter currency code defined in ISO 4217.
   */
  currencyCode?: string
}

/**
 * Required: State of the price: Estimate vs Actual.
 */
export enum State {
  Actual = 'ACTUAL',
  Estimate = 'ESTIMATE',
  StateUnspecified = 'STATE_UNSPECIFIED',
}

/**
 * Required: Type of money attribute.
 */
export enum PriceAttributeType {
  Delivery = 'DELIVERY',
  Discount = 'DISCOUNT',
  Fee = 'FEE',
  Gratuity = 'GRATUITY',
  Regular = 'REGULAR',
  Subtotal = 'SUBTOTAL',
  Tax = 'TAX',
  Total = 'TOTAL',
  TypeUnspecified = 'TYPE_UNSPECIFIED',
}

/**
 * The provider of the particular line item, if different from the overall order. Example:
 * Expedia Order with line item provider ANA.
 *
 * Merchant for the cart/order/line item.
 *
 * Merchant that facilitated the checkout. This could be different from a line item level
 * provider. Example: Expedia Order with line item from ANA.
 */
export interface Merchant {
  /**
   * Merchant's address.
   */
  address?: V2Location
  /**
   * Optional ID assigned to merchant if any.
   */
  id?: string
  /**
   * The image associated with the merchant.
   */
  image?: V2UIElementsImage
  /**
   * The name of the merchant like "Panera Bread".
   */
  name?: string
  /**
   * Merchant's phone numbers.
   */
  phoneNumbers?: PhoneNumber[]
}

/**
 * Merchant's address.
 *
 * Container that represents a location.
 *
 * Pickup or delivery location.
 *
 * Location of the service/event.
 *
 * The location where the event is happening, or an organization is located.
 */
export interface V2Location {
  /**
   * City. Requires the DEVICE_PRECISE_LOCATION or DEVICE_COARSE_LOCATION permission.
   */
  city?: string
  /**
   * Geo coordinates. Requires the DEVICE_PRECISE_LOCATION permission.
   */
  coordinates?: LatLng
  /**
   * Display address, e.g., "1600 Amphitheatre Pkwy, Mountain View, CA 94043". Requires the
   * DEVICE_PRECISE_LOCATION permission.
   */
  formattedAddress?: string
  /**
   * Name of the place.
   */
  name?: string
  /**
   * Notes about the location.
   */
  notes?: string
  /**
   * Phone number of the location, e.g. contact number of business location or phone number
   * for delivery location.
   */
  phoneNumber?: string
  /**
   * place_id is used with Places API to fetch details of a place. See
   * https://developers.google.com/places/web-service/place-id
   */
  placeId?: string
  /**
   * Postal address. Requires the DEVICE_PRECISE_LOCATION or DEVICE_COARSE_LOCATION permission.
   */
  postalAddress?: PostalAddress
  /**
   * Zip code. Requires the DEVICE_PRECISE_LOCATION or DEVICE_COARSE_LOCATION permission.
   */
  zipCode?: string
}

/**
 * Geo coordinates. Requires the DEVICE_PRECISE_LOCATION permission.
 *
 * An object representing a latitude/longitude pair. This is expressed as a pair of doubles
 * representing degrees latitude and degrees longitude. Unless specified otherwise, this
 * must conform to the WGS84 standard. Values must be within normalized ranges.
 */
export interface LatLng {
  /**
   * The latitude in degrees. It must be in the range [-90.0, +90.0].
   */
  latitude?: number
  /**
   * The longitude in degrees. It must be in the range [-180.0, +180.0].
   */
  longitude?: number
}

/**
 * Postal address. Requires the DEVICE_PRECISE_LOCATION or DEVICE_COARSE_LOCATION
 * permission.
 *
 * Represents a postal address, e.g. for postal delivery or payments addresses. Given a
 * postal address, a postal service can deliver items to a premise, P.O. Box or similar. It
 * is not intended to model geographical locations (roads, towns, mountains). In typical
 * usage an address would be created via user input or from importing existing data,
 * depending on the type of process. Advice on address input / editing: - Use an i18n-ready
 * address widget such as https://github.com/google/libaddressinput) - Users should not be
 * presented with UI elements for input or editing of fields outside countries where that
 * field is used. For more guidance on how to use this schema, please see:
 * https://support.google.com/business/answer/6397478
 */
export interface PostalAddress {
  /**
   * Unstructured address lines describing the lower levels of an address. Because values in
   * address_lines do not have type information and may sometimes contain multiple values in a
   * single field (e.g. "Austin, TX"), it is important that the line order is clear. The order
   * of address lines should be "envelope order" for the country/region of the address. In
   * places where this can vary (e.g. Japan), address_language is used to make it explicit
   * (e.g. "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). This
   * way, the most specific line of an address can be selected based on the language. The
   * minimum permitted structural representation of an address consists of a region_code with
   * all remaining information placed in the address_lines. It would be possible to format
   * such an address very approximately without geocoding, but no semantic reasoning could be
   * made about any of the address components until it was at least partially resolved.
   * Creating an address only containing a region_code and address_lines, and then geocoding
   * is the recommended way to handle completely unstructured addresses (as opposed to
   * guessing which parts of the address should be localities or administrative areas).
   */
  addressLines?: string[]
  /**
   * Optional. Highest administrative subdivision which is used for postal addresses of a
   * country or region. For example, this can be a state, a province, an oblast, or a
   * prefecture. Specifically, for Spain this is the province and not the autonomous community
   * (e.g. "Barcelona" and not "Catalonia"). Many countries don't use an administrative area
   * in postal addresses. E.g. in Switzerland this should be left unpopulated.
   */
  administrativeArea?: string
  /**
   * Optional. BCP-47 language code of the contents of this address (if known). This is often
   * the UI language of the input form or is expected to match one of the languages used in
   * the address' country/region, or their transliterated equivalents. This can affect
   * formatting in certain countries, but is not critical to the correctness of the data and
   * will never affect any validation or other non-formatting related operations. If this
   * value is not known, it should be omitted (rather than specifying a possibly incorrect
   * default). Examples: "zh-Hant", "ja", "ja-Latn", "en".
   */
  languageCode?: string
  /**
   * Optional. Generally refers to the city/town portion of the address. Examples: US city, IT
   * comune, UK post town. In regions of the world where localities are not well defined or do
   * not fit into this structure well, leave locality empty and use address_lines.
   */
  locality?: string
  /**
   * Optional. The name of the organization at the address.
   */
  organization?: string
  /**
   * Optional. Postal code of the address. Not all countries use or require postal codes to be
   * present, but where they are used, they may trigger additional validation with other parts
   * of the address (e.g. state/zip validation in the U.S.A.).
   */
  postalCode?: string
  /**
   * Optional. The recipient at the address. This field may, under certain circumstances,
   * contain multiline information. For example, it might contain "care of" information.
   */
  recipients?: string[]
  /**
   * Required. CLDR region code of the country/region of the address. This is never inferred
   * and it is up to the user to ensure the value is correct. See http://cldr.unicode.org/ and
   * http://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for
   * details. Example: "CH" for Switzerland.
   */
  regionCode?: string
  /**
   * The schema revision of the `PostalAddress`. This must be set to 0, which is the latest
   * revision. All new revisions **must** be backward compatible with old revisions.
   */
  revision?: number
  /**
   * Optional. Additional, country-specific, sorting code. This is not used in most regions.
   * Where it is used, the value is either a string like "CEDEX", optionally followed by a
   * number (e.g. "CEDEX 7"), or just a number alone, representing the "sector code"
   * (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (e.g. Côte
   * d'Ivoire).
   */
  sortingCode?: string
  /**
   * Optional. Sublocality of the address. For example, this can be neighborhoods, boroughs,
   * districts.
   */
  sublocality?: string
}

/**
 * Purchase orders like goods, food etc.
 *
 * Line item contents of Purchase Vertical.
 */
export interface PurchasePurchaseItemExtension {
  /**
   * Any extra fields exchanged between merchant and google. Note: Use of this extension is
   * highly discouraged. Based on the use-case/circumstances, consider one of the following:
   * 1. Define fields in the PurchaseItemExtension if it could be used for other use-cases
   * (ie. generic capability/functionality). 2. Use vertical_extension if it is specific to a
   * custom, non-generic use-case/feature.
   */
  extension?: { [key: string]: any }
  /**
   * Fulfillment info for this line item. If unset, this line item inherits order level
   * fulfillment info.
   */
  fulfillmentInfo?: PurchasePurchaseFulfillmentInfo
  /**
   * Additional add-ons or sub-items.
   */
  itemOptions?: PurchaseItemOption[]
  /**
   * Details about the product.
   */
  productDetails?: PurchaseProductDetails
  /**
   * Product or offer id associated with this line item.
   */
  productId?: string
  /**
   * Quantity of the item.
   */
  quantity?: number
  /**
   * Returns info for this line item. If unset, this line item inherits order level returns
   * info.
   */
  returnsInfo?: PurchasePurchaseReturnsInfo
  /**
   * Required: Line item level status.
   */
  status?: PurchaseStatus
  /**
   * Required: Type of purchase.
   */
  type?: PurchaseType
  /**
   * Unit measure. Specifies the size of the item in chosen units. The size, together with the
   * active price is used to determine the unit price.
   */
  unitMeasure?: PurchaseMerchantUnitMeasure
  /**
   * Required: User visible label/string for the status. Max allowed length is 50 chars.
   */
  userVisibleStatusLabel?: string
}

/**
 * Fulfillment info for this line item. If unset, this line item inherits order level
 * fulfillment info.
 *
 * Fulfillment info associated with a purchase order or a particular line item.
 *
 * Fulfillment info for the order.
 */
export interface PurchasePurchaseFulfillmentInfo {
  /**
   * A window if a time-range is specified or ETA if single time specified. Expected delivery
   * or pickup time.
   */
  expectedFulfillmentTime?: Time
  /**
   * A window if a time-range is specified or ETA if single time specified. Expected time to
   * prepare the food. Single-time preferred.
   */
  expectedPreparationTime?: Time
  /**
   * Time at which this fulfillment option expires.
   */
  expireTime?: string
  /**
   * User contact for this fulfillment.
   */
  fulfillmentContact?: UserInfo
  /**
   * Required: The type of fulfillment.
   */
  fulfillmentType?: FulfillmentType
  /**
   * Unique identifier for this service option.
   */
  id?: string
  /**
   * Pickup or delivery location.
   */
  location?: V2Location
  /**
   * Additional information regarding how order would be picked. This field would only be
   * applicable when fulfillment type is PICKUP.
   */
  pickupInfo?: PurchasePickupInfo
  /**
   * Cost of this option.
   */
  price?: PriceAttribute
  /**
   * Name of the shipping method selected by the user.
   */
  shippingMethodName?: string
  /**
   * StoreCode of the location. Example: Walmart is the merchant and store_code is the walmart
   * store where fulfillment happened.
   * https://support.google.com/business/answer/3370250?ref_topic=4596653.
   */
  storeCode?: string
}

/**
 * A window if a time-range is specified or ETA if single time specified. Expected delivery
 * or pickup time.
 *
 * Time construct to represent time of an event to use when displaying an order to the
 * user.
 *
 * A window if a time-range is specified or ETA if single time specified. Expected time to
 * prepare the food. Single-time preferred.
 *
 * Time when the service/event is scheduled to occur. Can be a time range, a date, or an
 * exact date time.
 *
 * Time range that is acceptable to the user.
 *
 * Entry time, which might be different from the event start time. e.g. the event starts at
 * 9am, but entry time is 8:30am.
 *
 * End time.
 *
 * Start time.
 */
export interface Time {
  /**
   * Represents an order-event time like reservation time, delivery time and so on. Could be a
   * duration (start & end time), just the date, date time etc. Refer
   * https://en.wikipedia.org/wiki/ISO_8601 for all supported formats.
   */
  timeIso8601?: string
}

/**
 * Required: The type of fulfillment.
 */
export enum FulfillmentType {
  Delivery = 'DELIVERY',
  Pickup = 'PICKUP',
  TypeUnspecified = 'TYPE_UNSPECIFIED',
}

/**
 * Additional information regarding how order would be picked. This field would only be
 * applicable when fulfillment type is PICKUP.
 *
 * Details about how an order is picked up. It includes details such as pickup type and
 * additional metadata attached with each type, if any.
 */
export interface PurchasePickupInfo {
  /**
   * List of various methods supported by partner to support check-in.
   */
  checkInInfo?: CommonCheckInInfo[]
  /**
   * Details specific to the curbside information. If pickup_type is not "CURBSIDE", this
   * field would be ignored.
   */
  curbsideInfo?: PurchaseCurbsideInfo
  /**
   * Pick up method, such as INSTORE, CURBSIDE etc.
   */
  pickupType?: PickupType
}

/**
 * Metadata required by partner to support a checkin method.
 */
export interface CommonCheckInInfo {
  /**
   * Method used to send checkin instructions.
   */
  checkInType?: CheckInType
}

/**
 * Method used to send checkin instructions.
 */
export enum CheckInType {
  CheckInTypeUnspecified = 'CHECK_IN_TYPE_UNSPECIFIED',
  Email = 'EMAIL',
  SMS = 'SMS',
}

/**
 * Details specific to the curbside information. If pickup_type is not "CURBSIDE", this
 * field would be ignored.
 *
 * Details about how curbside order would be facilitated.
 */
export interface PurchaseCurbsideInfo {
  /**
   * Partners need additional information to facilitate curbside pickup orders. Depending upon
   * what fulfillment type is chosen, corresponding details would be collected from the user.
   */
  curbsideFulfillmentType?: CurbsideFulfillmentType
  /**
   * Vehicle details of the user placing the order.
   */
  userVehicle?: CommonVehicle
}

/**
 * Partners need additional information to facilitate curbside pickup orders. Depending upon
 * what fulfillment type is chosen, corresponding details would be collected from the user.
 */
export enum CurbsideFulfillmentType {
  Unspecified = 'UNSPECIFIED',
  VehicleDetail = 'VEHICLE_DETAIL',
}

/**
 * Vehicle details of the user placing the order.
 *
 * Details about a vehicle
 */
export interface CommonVehicle {
  /**
   * Vehicle color name, eg. black Optional.
   */
  colorName?: string
  /**
   * URL to a photo of the vehicle. The photo will be displayed at approximately 256x256px.
   * Must be a jpg or png. Optional.
   */
  image?: V2UIElementsImage
  /**
   * Vehicle license plate number (e.g. "1ABC234"). Required.
   */
  licensePlate?: string
  /**
   * Vehicle make (e.g. "Honda"). This is displayed to the user and must be localized.
   * Required.
   */
  make?: string
  /**
   * Vehicle model (e.g. "Grom"). This is displayed to the user and must be localized.
   * Required.
   */
  model?: string
}

/**
 * Pick up method, such as INSTORE, CURBSIDE etc.
 */
export enum PickupType {
  Curbside = 'CURBSIDE',
  Instore = 'INSTORE',
  Unspecified = 'UNSPECIFIED',
}

/**
 * Represents add-ons or sub-items.
 */
export interface PurchaseItemOption {
  /**
   * For options that are items, unique item id.
   */
  id?: string
  /**
   * Option name.
   */
  name?: string
  /**
   * Note related to the option.
   */
  note?: string
  /**
   * Option total price.
   */
  prices?: PriceAttribute[]
  /**
   * Product or offer id associated with this option.
   */
  productId?: string
  /**
   * For options that are items, quantity.
   */
  quantity?: number
  /**
   * To define other nested sub options.
   */
  subOptions?: PurchaseItemOption[]
}

/**
 * Details about the product.
 */
export interface PurchaseProductDetails {
  /**
   * Global Trade Item Number of the product. Useful if offerId is not present in Merchant
   * Center. Optional.
   */
  gtin?: string
  /**
   * Price look-up codes, commonly called PLU codes, PLU numbers, PLUs, produce codes, or
   * produce labels, are a system of numbers that uniquely identify bulk produce sold in
   * grocery stores and supermarkets.
   */
  plu?: string
  /**
   * Merchant-provided details about the product, e.g. { "allergen": "peanut" }. Useful if
   * offerId is not present in Merchant Center. Optional.
   */
  productAttributes?: { [key: string]: any }
  /**
   * Product or offer id associated with this line item.
   */
  productId?: string
  /**
   * Product category defined by the merchant. E.g. "Home > Grocery > Dairy & Eggs > Milk >
   * Whole Milk"
   */
  productType?: string
}

/**
 * Returns info for this line item. If unset, this line item inherits order level returns
 * info.
 *
 * Returns info associated with an order or a particular line item.
 *
 * Return info for the order.
 */
export interface PurchasePurchaseReturnsInfo {
  /**
   * Return is allowed within that many days.
   */
  daysToReturn?: number
  /**
   * If true, return is allowed.
   */
  isReturnable?: boolean
  /**
   * Link to the return policy.
   */
  policyUrl?: string
}

/**
 * Required: Line item level status.
 *
 * Required: Overall Status for the order.
 */
export enum PurchaseStatus {
  Cancelled = 'CANCELLED',
  ChangeRequested = 'CHANGE_REQUESTED',
  Confirmed = 'CONFIRMED',
  Created = 'CREATED',
  Delivered = 'DELIVERED',
  InPreparation = 'IN_PREPARATION',
  OutOfStock = 'OUT_OF_STOCK',
  PurchaseStatusUnspecified = 'PURCHASE_STATUS_UNSPECIFIED',
  ReadyForPickup = 'READY_FOR_PICKUP',
  Rejected = 'REJECTED',
  Returned = 'RETURNED',
  Shipped = 'SHIPPED',
}

/**
 * Required: Type of purchase.
 */
export enum PurchaseType {
  Food = 'FOOD',
  Grocery = 'GROCERY',
  MobileRecharge = 'MOBILE_RECHARGE',
  PurchaseTypeUnspecified = 'PURCHASE_TYPE_UNSPECIFIED',
  Retail = 'RETAIL',
}

/**
 * Unit measure. Specifies the size of the item in chosen units. The size, together with the
 * active price is used to determine the unit price.
 *
 * Merchant unit pricing measure.
 */
export interface PurchaseMerchantUnitMeasure {
  /**
   * Value: Example 1.2.
   */
  measure?: number
  /**
   * Unit: Example POUND, GRAM.
   */
  unit?: Unit
}

/**
 * Unit: Example POUND, GRAM.
 */
export enum Unit {
  Gram = 'GRAM',
  Kilogram = 'KILOGRAM',
  Milligram = 'MILLIGRAM',
  Ounce = 'OUNCE',
  Pound = 'POUND',
  UnitUnspecified = 'UNIT_UNSPECIFIED',
}

/**
 * Reservation orders like restaurant, haircut etc.
 *
 * Line item contents for reservation orders like restaurant, haircut etc.
 */
export interface ReservationReservationItemExtension {
  /**
   * Confirmation code for this reservation.
   */
  confirmationCode?: string
  /**
   * Location of the service/event.
   */
  location?: V2Location
  /**
   * The number of people.
   */
  partySize?: number
  /**
   * Time when the service/event is scheduled to occur. Can be a time range, a date, or an
   * exact date time.
   */
  reservationTime?: Time
  /**
   * Staff facilitators who will be servicing the reservation. Ex. The hairstylist.
   */
  staffFacilitators?: ReservationStaffFacilitator[]
  /**
   * Required: Reservation status.
   */
  status?: ReservationStatus
  /**
   * Type of reservation. May be unset if none of the type options is applicable.
   */
  type?: ReservationType
  /**
   * Time range that is acceptable to the user.
   */
  userAcceptableTimeRange?: Time
  /**
   * Required: User visible label/string for the status. Max allowed length is 50 chars.
   */
  userVisibleStatusLabel?: string
}

/**
 * Information about service person.
 */
export interface ReservationStaffFacilitator {
  /**
   * Performer's images.
   */
  image?: V2UIElementsImage
  /**
   * The staff facilitator's name. Ex. "John Smith"
   */
  name?: string
}

/**
 * Required: Reservation status.
 */
export enum ReservationStatus {
  Cancelled = 'CANCELLED',
  ChangeRequested = 'CHANGE_REQUESTED',
  Confirmed = 'CONFIRMED',
  Fulfilled = 'FULFILLED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  ReservationStatusUnspecified = 'RESERVATION_STATUS_UNSPECIFIED',
}

/**
 * Type of reservation. May be unset if none of the type options is applicable.
 */
export enum ReservationType {
  Hairdresser = 'HAIRDRESSER',
  ReservationTypeUnspecified = 'RESERVATION_TYPE_UNSPECIFIED',
  Restaurant = 'RESTAURANT',
}

/**
 * Payment related data for the order.
 *
 * Payment data related to an order.
 */
export interface PaymentData {
  /**
   * Payment information regarding the order that's useful for user facing interaction.
   */
  paymentInfo?: PaymentInfo
  /**
   * Payment result that's used by integrator for completing a transaction. This field will be
   * populated by Actions on Google if the checkout experience is managed by Actions-on-Google.
   */
  paymentResult?: PaymentResult
}

/**
 * Payment information regarding the order that's useful for user facing interaction.
 *
 * Payment information regarding the order being made. This proto captures information
 * that's useful for user facing interaction.
 */
export interface PaymentInfo {
  /**
   * The display info of the payment method used for the transaction.
   */
  paymentMethodDisplayInfo?: PaymentMethodDisplayInfo
  /**
   * Provenance of the payment method used for the transaction. User may have registered the
   * same payment method with both google and merchant.
   */
  paymentMethodProvenance?: PaymentMethodProvenance
}

/**
 * The display info of the payment method used for the transaction.
 *
 * Payment result used by integrator for completing a transaction.
 */
export interface PaymentMethodDisplayInfo {
  /**
   * User visible name of the payment method. For example, VISA **** 1234 Checking acct ****
   * 5678
   */
  paymentMethodDisplayName?: string
  /**
   * Payment method name to be spoken out to the user for voice-only assistant devices. For
   * example, "visa ending in one two three four", or "checking account ending in five six
   * seven eight". Note: This is the voice-optimized string to be used instead of the
   * payment_method_display_name for voice-only assistant devices. If this string is not set,
   * payment_method_display_name will instead be spoken out to the user.
   */
  paymentMethodVoiceName?: string
  /**
   * The type of the payment.
   */
  paymentType?: PaymentType
}

/**
 * The type of the payment.
 */
export enum PaymentType {
  Bank = 'BANK',
  Cash = 'CASH',
  GiftCard = 'GIFT_CARD',
  LoyaltyProgram = 'LOYALTY_PROGRAM',
  PaymentCard = 'PAYMENT_CARD',
  PaymentTypeUnspecified = 'PAYMENT_TYPE_UNSPECIFIED',
  Wallet = 'WALLET',
}

/**
 * Provenance of the payment method used for the transaction. User may have registered the
 * same payment method with both google and merchant.
 */
export enum PaymentMethodProvenance {
  PaymentMethodProvenanceGoogle = 'PAYMENT_METHOD_PROVENANCE_GOOGLE',
  PaymentMethodProvenanceMerchant = 'PAYMENT_METHOD_PROVENANCE_MERCHANT',
  PaymentMethodProvenanceUnspecified = 'PAYMENT_METHOD_PROVENANCE_UNSPECIFIED',
}

/**
 * Payment result that's used by integrator for completing a transaction. This field will be
 * populated by Actions on Google if the checkout experience is managed by
 * Actions-on-Google.
 *
 * Payment result used by integrator for completing a transaction.
 */
export interface PaymentResult {
  /**
   * Google provided payment method data. If your payment processor is listed as Google
   * supported payment processor here: https://developers.google.com/pay/api/ Navigate to your
   * payment processor through the link to find out more details. Otherwise, refer to
   * following documentation for payload details.
   * https://developers.google.com/pay/api/payment-data-cryptography
   */
  googlePaymentData?: string
  /**
   * Merchant/Action provided payment method chosen by user.
   */
  merchantPaymentMethodId?: string
}

/**
 * Promotions/Offers that were added to the cart.
 */
export interface Promotion {
  /**
   * Required: Coupon code applied to this offer.
   */
  coupon?: string
}

/**
 * Purchase order
 *
 * Order extension for purchase vertical. These properties are applicable to all line items
 * inside order, unless overridden in a line item.
 */
export interface PurchasePurchaseOrderExtension {
  /**
   * Optional: Errors because of which this order was rejected.
   */
  errors?: PurchasePurchaseError[]
  /**
   * Any extra fields exchanged between merchant and google. Note: Use of this extension is
   * highly discouraged. Based on the use-case/circumstances, consider one of the following:
   * 1. Define fields in the PurchaseOrderExtension if it could be used for other use-cases
   * (ie. generic capability/functionality). 2. Use vertical_extension if it is specific to a
   * custom, non-generic use-case/feature.
   */
  extension?: { [key: string]: any }
  /**
   * Fulfillment info for the order.
   */
  fulfillmentInfo?: PurchasePurchaseFulfillmentInfo
  /**
   * Location of the purchase (in-store / online)
   */
  purchaseLocationType?: PurchaseLocationType
  /**
   * Return info for the order.
   */
  returnsInfo?: PurchasePurchaseReturnsInfo
  /**
   * Required: Overall Status for the order.
   */
  status?: PurchaseStatus
  /**
   * Required: Type of purchase.
   */
  type?: PurchaseType
  /**
   * User visible label/string for the status. Max allowed length is 50 chars.
   */
  userVisibleStatusLabel?: string
}

/**
 * Errors that a purchase order can be rejected for.
 */
export interface PurchasePurchaseError {
  /**
   * Available quantity now. Applicable in case of AVAILABILITY_CHANGED.
   */
  availableQuantity?: number
  /**
   * Additional error description.
   */
  description?: string
  /**
   * Entity Id that corresponds to the error. Example this can correspond to LineItemId /
   * ItemOptionId.
   */
  entityId?: string
  /**
   * Required: This represents the granular reason why an order gets rejected by the merchant.
   */
  type?: ErrorType
  /**
   * Relevant in case of PRICE_CHANGED / INCORRECT_PRICE error type.
   */
  updatedPrice?: PriceAttribute
}

/**
 * Required: This represents the granular reason why an order gets rejected by the merchant.
 */
export enum ErrorType {
  AccountLinkingFailed = 'ACCOUNT_LINKING_FAILED',
  AvailabilityChanged = 'AVAILABILITY_CHANGED',
  Closed = 'CLOSED',
  ErrorTypeUnspecified = 'ERROR_TYPE_UNSPECIFIED',
  FailedPrecondition = 'FAILED_PRECONDITION',
  IncorrectPrice = 'INCORRECT_PRICE',
  Ineligible = 'INELIGIBLE',
  Invalid = 'INVALID',
  MerchantUnreachable = 'MERCHANT_UNREACHABLE',
  NoCapacity = 'NO_CAPACITY',
  NoCourierAvailable = 'NO_COURIER_AVAILABLE',
  NotFound = 'NOT_FOUND',
  OutOfServiceArea = 'OUT_OF_SERVICE_AREA',
  PaymentDeclined = 'PAYMENT_DECLINED',
  PriceChanged = 'PRICE_CHANGED',
  PromoExpired = 'PROMO_EXPIRED',
  PromoNotApplicable = 'PROMO_NOT_APPLICABLE',
  PromoNotRecognized = 'PROMO_NOT_RECOGNIZED',
  PromoOrderIneligible = 'PROMO_ORDER_INELIGIBLE',
  PromoUserIneligible = 'PROMO_USER_INELIGIBLE',
  RequirementsNotMet = 'REQUIREMENTS_NOT_MET',
  TooLate = 'TOO_LATE',
  UnavailableSlot = 'UNAVAILABLE_SLOT',
}

/**
 * Location of the purchase (in-store / online)
 */
export enum PurchaseLocationType {
  InstorePurchase = 'INSTORE_PURCHASE',
  OnlinePurchase = 'ONLINE_PURCHASE',
  UnspecifiedLocation = 'UNSPECIFIED_LOCATION',
}

/**
 * Ticket order
 *
 * Order contents for ticket orders like movie, sports etc.
 */
export interface TicketTicketOrderExtension {
  /**
   * The event applied to all line item tickets.
   */
  ticketEvent?: TicketTicketEvent
}

/**
 * The event applied to all line item tickets.
 *
 * Represents a single event.
 */
export interface TicketTicketEvent {
  /**
   * Description of the event.
   */
  description?: string
  /**
   * Entry time, which might be different from the event start time. e.g. the event starts at
   * 9am, but entry time is 8:30am.
   */
  doorTime?: Time
  /**
   * End time.
   */
  endDate?: Time
  /**
   * The characters related to this event. It can be directors or actors of a movie event, or
   * performers of a concert, etc.
   */
  eventCharacters?: TicketEventCharacter[]
  /**
   * The location where the event is happening, or an organization is located.
   */
  location?: V2Location
  /**
   * Required: Name of the event. For example, if the event is a movie, this should be the
   * movie name.
   */
  name?: string
  /**
   * Start time.
   */
  startDate?: Time
  /**
   * Required: Type of the ticket event, e.g. movie, concert.
   */
  type?: TicketEventType
  /**
   * Url to the event info.
   */
  url?: string
}

/**
 * One event character, e.g. organizer, performer etc.
 */
export interface TicketEventCharacter {
  /**
   * Character's images.
   */
  image?: V2UIElementsImage
  /**
   * Name of the character.
   */
  name?: string
  /**
   * Type of the event character, e.g. actor or director.
   */
  type?: EventCharacterType
}

/**
 * Type of the event character, e.g. actor or director.
 */
export enum EventCharacterType {
  Actor = 'ACTOR',
  Director = 'DIRECTOR',
  Organizer = 'ORGANIZER',
  Performer = 'PERFORMER',
  TypeUnknown = 'TYPE_UNKNOWN',
}

/**
 * Required: Type of the ticket event, e.g. movie, concert.
 */
export enum TicketEventType {
  Concert = 'CONCERT',
  EventTypeUnknown = 'EVENT_TYPE_UNKNOWN',
  Movie = 'MOVIE',
  Sports = 'SPORTS',
}

/**
 * Deprecated: Use OrderUpdate.update_mask instead. If type = SNAPSHOT, OrderUpdate.order
 * should be the entire order. If type = ORDER_STATUS, this is the order level status
 * change. Only order.last_update_time and this vertical status are picked up. Note:
 * type.ORDER_STATUS only supports PurcahaseOrderExtension status updates and there is no
 * plan to extend this support. Instead, we recommend using update_mask as it is more
 * generic, extensible and can be used for all verticals.
 */
export enum OrderUpdateType {
  OrderStatus = 'ORDER_STATUS',
  Snapshot = 'SNAPSHOT',
  TypeUnspecified = 'TYPE_UNSPECIFIED',
}

/**
 * If specified, displays a notification to the user with the specified title and text.
 * Specifying a notification is a suggestion to notify and is not guaranteed to result in a
 * notification.
 *
 * Optional user notification to display as part of the Order update.
 */
export interface UserNotification {
  /**
   * The contents of the notification. Max allowed length is 100 chars.
   */
  text?: string
  /**
   * The title for the user notification. Max allowed length is 30 chars.
   */
  title?: string
}

export interface Suggestion {
  /**
   * Required. The text shown in the suggestion chip. When tapped, this text will be posted
   * back to the conversation verbatim as if the user had typed it. Each title must be unique
   * among the set of suggestion chips. Max 25 chars
   */
  title?: string
}
