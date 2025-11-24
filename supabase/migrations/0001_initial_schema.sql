-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Note: users table is not created here as Supabase auth.users already exists
-- Additional user profile data can be stored in a separate profiles table if needed

-- Create dogs table
CREATE TABLE dogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  breed TEXT,
  photo_url TEXT,
  collar_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create locations table
CREATE TABLE locations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  dog_id UUID REFERENCES dogs(id) ON DELETE CASCADE NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create boundaries table
CREATE TABLE boundaries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  dog_id UUID REFERENCES dogs(id) ON DELETE CASCADE NOT NULL,
  boundary_geojson JSONB NOT NULL
);

-- Create notifications table
CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  dog_id UUID REFERENCES dogs(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  triggered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  seen BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX idx_locations_dog_id ON locations(dog_id);
CREATE INDEX idx_locations_timestamp ON locations(timestamp);
CREATE INDEX idx_boundaries_dog_id ON boundaries(dog_id);
CREATE INDEX idx_notifications_dog_id ON notifications(dog_id);
CREATE INDEX idx_notifications_seen ON notifications(seen);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE boundaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see their own data
CREATE POLICY "Users can view own dogs" ON dogs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own dogs" ON dogs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own dogs" ON dogs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own dogs" ON dogs FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view locations of own dogs" ON locations FOR SELECT USING (
  auth.uid() IN (
    SELECT user_id FROM dogs WHERE id = locations.dog_id
  )
);
CREATE POLICY "Allow location inserts" ON locations FOR INSERT WITH CHECK (true); -- Allow device inserts

CREATE POLICY "Users can view own boundaries" ON boundaries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own boundaries" ON boundaries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own boundaries" ON boundaries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own boundaries" ON boundaries FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view notifications for own dogs" ON notifications FOR SELECT USING (
  auth.uid() IN (
    SELECT user_id FROM dogs WHERE id = notifications.dog_id
  )
);
CREATE POLICY "Allow notification inserts" ON notifications FOR INSERT WITH CHECK (true); -- Allow system inserts
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (
  auth.uid() IN (
    SELECT user_id FROM dogs WHERE id = notifications.dog_id
  )
);