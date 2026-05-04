import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { plan } = req.body;

  const prices = {
    "3day": "prod_USC1IxaHSDLdeE",
    "lifetime": "prod_USC37zTvYNcqSs"
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price: prices[plan],
      quantity: 1
    }],
    mode: "payment",
    success_url: "https://your-site.vercel.app/success",
    cancel_url: "https://your-site.vercel.app/cancel"
  });

  res.json({ url: session.url });
}
