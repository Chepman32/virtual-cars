const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const stripe = require('stripe')('sk_test_51OslC72LvNyg7BqILAn7JelKzm19RuHftQw68VNtKAwybM66gaLHCylS4LpXY8nnsLYKmRYPkDm1ECsr0HA0gYWk00EOHGjELe');

const endpointSecret = 'whsec_LKcJkzpsHhg97HIh2OE9sMLNUTXOo0QH'; // Replace with your Stripe webhook secret

const app = express();

app.use(bodyParser.json({
  verify: function (req, res, buf) {
    req.rawBody = buf.toString();
  }
}));

app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      console.log('Payment checkout session was successful!');
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
});

// For local development
// app.listen(4242, () => console.log('Running on port 4242'));

// For AWS Lambda
const server = awsServerlessExpressMiddleware.createServer(app);
exports.handler = (event, context) => awsServerlessExpressMiddleware.proxy(server, event, context);