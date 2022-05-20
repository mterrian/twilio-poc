const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const client = require('twilio')(
  process.env.TWILIO_ACOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      mediaUrl: ['https://aurometalsaurus-mallard-6953.twil.io/assets/2019-dodge-journey-gallery-6.jpg.image.2880%20(2).jpg'],
      body: req.body.body
    })
    .then(() => {
      console.log(res)
      res.send(JSON.stringify({success: true}));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({success: false}))
    })
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
