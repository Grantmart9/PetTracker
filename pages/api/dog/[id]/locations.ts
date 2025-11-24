import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid dog ID" });
    }

    // Verify user owns this dog
    const { data: dog, error: dogError } = await supabase
      .from("dogs")
      .select("user_id")
      .eq("id", id)
      .single();

    if (dogError || !dog) {
      return res.status(404).json({ error: "Dog not found" });
    }

    // Get locations (assuming auth is handled by RLS)
    const { data: locations, error: locationsError } = await supabase
      .from("locations")
      .select("*")
      .eq("dog_id", id)
      .order("timestamp", { ascending: false })
      .limit(100); // Limit to recent locations

    if (locationsError) throw locationsError;

    res.status(200).json({ locations: locations || [] });
  } catch (error: any) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
