const AWS = require('aws-sdk'); // Optional, for future AWS interactions
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  try {
    // Parse the event body
    const data = JSON.parse(event.body);

    // Check for successful payment event
    if (data.type === 'payment_intent.succeeded') {
      const paymentIntent = data.data.object;

      // Extract payment details
      const amount = paymentIntent.amount / 100;  // Convert to dollars
      const customer = paymentIntent.customer;

      // Process successful payment logic
      console.log(`Payment successful! Amount: $${amount}, Customer: ${customer}`);

      // Leverage Amplify DataStore (if applicable):
      // ... (rest of the code remains the same)

      // **Potential additional Stripe interactions (if needed):**
      // - Capture payment (if not already captured):
      //   await stripe.paymentIntents.capture(paymentIntent.id);
      // - Handle other Stripe actions as required

      return {
        statusCode: 200,
        body: JSON.stringify('Payment processed successfully!')
      };
    } else {
      // Handle other event types (optional)
      console.log(`Received Stripe event: ${data.type}`);
      return {
        statusCode: 200,
        body: JSON.stringify('Received Stripe event.')
      };
    }
  } catch (error) {
    console.error('Error processing Stripe event:', error);
    return {
      statusCode: 500,
      body: JSON.stringify('An error occurred while processing the payment.')
    };
  }
};
