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
    const { dog_id, lat, lng, timestamp } = req.body;

    if (!dog_id || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert location data
    const { data, error } = await supabase
      .from("locations")
      .insert({
        dog_id,
        latitude: lat,
        longitude: lng,
        timestamp: timestamp || new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // Check if dog is outside boundary
    const { data: boundaries, error: boundaryError } = await supabase
      .from("boundaries")
      .select("boundary_geojson")
      .eq("dog_id", dog_id);

    if (boundaryError) {
      console.error("Error fetching boundaries:", boundaryError);
    } else if (boundaries && boundaries.length > 0) {
      // Check if point is inside any boundary
      const point = { lat, lng };
      let isInsideAnyBoundary = false;

      for (const boundary of boundaries) {
        if (isPointInPolygon(point, boundary.boundary_geojson)) {
          isInsideAnyBoundary = true;
          break;
        }
      }

      if (!isInsideAnyBoundary) {
        // Create notification
        await supabase.from("notifications").insert({
          dog_id,
          message: `Your dog has left the designated boundary area.`,
        });
      }
    }

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Error updating location:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Simple point in polygon check (for GeoJSON polygon)
function isPointInPolygon(
  point: { lat: number; lng: number },
  geojson: any
): boolean {
  if (!geojson || geojson.type !== "Polygon") return false;

  const coordinates = geojson.coordinates[0]; // First ring (outer boundary)
  const x = point.lng;
  const y = point.lat;

  let inside = false;
  for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
    const xi = coordinates[i][0];
    const yi = coordinates[i][1];
    const xj = coordinates[j][0];
    const yj = coordinates[j][1];

    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }

  return inside;
}
