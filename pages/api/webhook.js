import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const sig = req.headers["stripe-signature"];

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const rawBody = Buffer.concat(chunks);

  const event = stripe.webhooks.constructEvent(
    rawBody,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const key = Math.random().toString(36).substring(2, 12).toUpperCase();

    const plan = session.amount_total === 200 ? "3day" : "lifetime";

    let expires = null;
    if (plan === "3day") {
      expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    }

    await supabase.from("keys2").insert([
      { key, plan, expires }
    ]);
  }

  res.json({ received: true });
}
