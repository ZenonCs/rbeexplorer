import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { key } = req.body;

  const { data } = await supabase
    .from("keys2")
    .select("*")
    .eq("key", key)
    .single();

  if (!data) return res.json({ valid: false });

  if (data.expires && new Date(data.expires) < new Date()) {
    return res.json({ valid: false });
  }

  res.json({ valid: true });
}
