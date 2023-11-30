import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const creatingCharges = async (req, res) => {
  const { tokenId, amount } = req.body;

  if ((!tokenId, !amount))
    return res.status(400).json({ error: "Missing required information" });
  stripe.charges.create(
    {
      source: tokenId,
      amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};

// export const paymentIntent = async (req, res) => {
// const { amount } = req.body;
// const paymentIntent = await stripe.paymentIntents.create({
//     amount,
//     currency: "usd",
// });
// res.send({
//     clientSecret: paymentIntent.client_secret,
// });
// };
