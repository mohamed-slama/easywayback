// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.

import Stripe from "stripe"
// Sign in to see your own test API key embedded in code samples.
const stripe = new Stripe (
  "sk_test_51Ksmc1JWUmtOcRLRr6cV8h6jVc62rMq6Q5ltNEHzDIzJrvJvvXj62OsQP3EZgnWrk6yhRPPrHgjaUEV7n1D9OcxW00YoxfiJ5j"
);

export const payement = async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.

 // const newreservation = new reservation(req.body);

  //var payement = await newreservation.findById(req.params.id);

  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2020-08-27" }
  );
  var amount_number = Math.round(req.params.amount*100) 
  const paymentIntent = await stripe.paymentIntents.create({
    amount:amount_number,
    currency: "eur",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      "pk_test_51Ksmc1JWUmtOcRLRVaOLubjq8zk7HRVKc9FRZgDVqoySWSzHMstsvS3EPrIe7maUikGgYtDwQCL5kVP9cXjIEugj00vmz3cajZ",
  });
};