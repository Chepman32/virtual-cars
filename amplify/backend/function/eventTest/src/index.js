exports.handler = async (event) => {
  // Parse the event data from Stripe
  const stripeEvent = JSON.parse(event.body);
  
  // Check if the event type is a successful payment
  if (stripeEvent.type === 'payment_intent.succeeded') {
      // Log success message to the console
      
      
    // Return a successful response to Stripe
    console.log("Success Success Success Success Success Success Success Success Success Success Success Success Success Success Success Success Success Success Success Success Success Success Success");
      return {
          statusCode: 200,
          body: JSON.stringify({ received: true })
      };
  }
  
  // Return a response indicating that the event was not handled
  return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Unhandled event type' })
  };
};
