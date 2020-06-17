# Actions SDK Node.js Fulfillment Library

This fulfillment library exposes a developer friendly way to fulfill Actions SDK handlers for the Google Assistant.

* [Fulfillment Library GitHub repo](https://github.com/actions-on-google/assistant-conversation-nodejs)
* [Fulfillment Library reference docs](https://actions-on-google.github.io/assistant-conversation-nodejs/)
* [Actions on Google docs](https://developers.google.com/assistant)
* [Actions on Google samples](https://developers.google.com/assistant/actions/samples)

[![NPM Version](https://img.shields.io/npm/v/@assistant/conversation.svg)](https://www.npmjs.org/package/@assistant/conversation)
[![Build Status](https://travis-ci.org/actions-on-google/assistant-conversation-nodejs.svg?branch=master)](https://travis-ci.org/actions-on-google/assistant-conversation-nodejs)

## Setup Instructions

Make sure Node.js >=10.18.0 is installed.

Install the library with either `npm install @assistant/conversation` or `yarn add @assistant/conversation` if you use yarn.

### Example Usage
```javascript
// Import the appropriate service and chosen wrappers
const {
  conversation,
  Image,
} = require('@assistant/conversation')

// Create an app instance
const app = conversation()

// Register handlers for Actions SDK

app.handle('<YOUR HANDLER NAME>', conv => {
  conv.add('Hi, how is it going?')
  conv.add(new Image({
    url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
    alt: 'A cat',
  }))
})
```

### Frameworks

Export or run for your appropriate framework:

#### Firebase Functions
``` javascript
const functions = require('firebase-functions')

// ... app code here

exports.fulfillment = functions.https.onRequest(app)
```

#### Actions Console Inline Editor
```javascript
const functions = require('firebase-functions')

// ... app code here

// name has to be `ActionsOnGoogleFulfillment`
exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app)
```

#### Self Hosted Express Server
```javascript
const express = require('express')
const bodyParser = require('body-parser')

// ... app code here

const expressApp = express().use(bodyParser.json())

expressApp.post('/fulfillment', app)

expressApp.listen(3000)
```

#### AWS Lambda API Gateway HTTP proxy integration
```javascript
// ... app code here

exports.fulfillment = app
```

### Next Steps

Take a look at the docs and samples linked at the top to get to know the platform and supported functionalities.

## Library Development Instructions
This library uses `yarn` to run commands. Install yarn using instructions from https://yarnpkg.com/en/docs/install or with npm: `npm i -g yarn`.

Install the library dependencies with `yarn`. If you want to run any of the sample apps, follow the instructions in the sample README.

## Functionality

Public interfaces, classes, functions, objects, and properties are labeled with the JSDoc `@public` tag and exported at the top level. Everything that is not labeled `@public` and exported at the top level is considered internal and may be changed.

## References & Issues
+ Questions? Go to [StackOverflow](https://stackoverflow.com/questions/tagged/actions-on-google) or [Assistant Developer Community on Reddit](https://www.reddit.com/r/GoogleAssistantDev/).
+ For bugs, please report an issue on Github.
+ Actions on Google [Documentation](https://developers.google.com/assistant)
+ Actions on Google [Codelabs](https://codelabs.developers.google.com/?cat=Assistant).

## Make Contributions
Please read and follow the steps in the [CONTRIBUTING.md](CONTRIBUTING.md).

## License
See [LICENSE](LICENSE).
