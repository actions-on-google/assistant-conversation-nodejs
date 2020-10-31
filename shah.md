
const {
  conversation,
  Image,
} = require('@assistant/conversation')
const app = conversation()

app.handle('<YOUR HANDLER NAME>', conv => {
  conv.add('Hi, how is it going?')
  conv.add(new Image({
    url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
    alt: 'A cat',
  }))
})
