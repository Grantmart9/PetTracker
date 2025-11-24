import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { dog_id, message } = req.body;

    if (!dog_id || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert notification
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        dog_id,
        message,
      })
      .select()
      .single();

    if (error) throw error;

    // TODO: Implement push notifications and email
    // For now, just store in database

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
