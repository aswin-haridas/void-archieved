-- Create search_history table in Supabase
-- Run this SQL in your Supabase dashboard SQL editor

CREATE TABLE IF NOT EXISTS search_history (
  id BIGSERIAL PRIMARY KEY,
  query TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_search_history_created_at ON search_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_search_history_query ON search_history(query);
CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON search_history(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to insert and read their own records
-- For now, we'll allow anonymous access since user authentication is not implemented
CREATE POLICY "Enable anonymous access for search history" ON search_history
  FOR ALL USING (true);

-- Optional: Add a policy for authenticated users to only see their own history
-- Uncomment when user authentication is implemented
-- CREATE POLICY "Users can view own search history" ON search_history
--   FOR SELECT USING (auth.uid() = user_id);

-- CREATE POLICY "Users can insert own search history" ON search_history
--   FOR INSERT WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "Users can delete own search history" ON search_history
--   FOR DELETE USING (auth.uid() = user_id);