-- Seed data for development
-- IMPORTANT: This seed data requires actual user IDs from Supabase Auth
-- Replace 'your-user-id-here' with real user IDs from your Supabase auth.users table

-- To get user IDs:
-- 1. Sign up users through your app or Supabase dashboard
-- 2. Query: SELECT id, email FROM auth.users;
-- 3. Replace the placeholder IDs below

-- Example seed data (REPLACE 'your-user-id-here' with actual user IDs):
/*
-- Sample dogs (replace 'your-user-id-here' with actual auth user IDs)
INSERT INTO dogs (user_id, name, breed, collar_id, photo_url) VALUES
('your-user-id-here', 'Buddy', 'Golden Retriever', 'COLL001', 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400'),
('your-user-id-here', 'Max', 'German Shepherd', 'COLL002', 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400');

-- Sample locations (use the dog IDs generated above)
-- INSERT INTO locations (dog_id, latitude, longitude) VALUES
-- ('generated-dog-id-1', 40.7128, -74.0060),
-- ('generated-dog-id-1', 40.7130, -74.0062);

-- Sample boundaries (use actual user and dog IDs)
-- INSERT INTO boundaries (user_id, dog_id, boundary_geojson) VALUES
-- ('your-user-id-here', 'generated-dog-id-1',
--  '{"type": "Polygon", "coordinates": [[[-74.0065, 40.7125], [-74.0055, 40.7125], [-74.0055, 40.7135], [-74.0065, 40.7135], [-74.0065, 40.7125]]]}');

-- Sample notifications (use actual dog IDs)
-- INSERT INTO notifications (dog_id, message) VALUES
-- ('generated-dog-id-1', 'Buddy has left the designated boundary area.');
*/

-- Note: Uncomment and modify the above queries after creating users through your app
-- The app will automatically create dogs, boundaries, and notifications as users interact with it