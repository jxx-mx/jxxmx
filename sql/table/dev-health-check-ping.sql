-- 개발환경용 health_check_ping 테이블
create table public.dev_health_check_ping (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp default now(),
  user_id text default (auth.jwt() ->> 'sub')
);

ALTER TABLE dev_health_check_ping ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read health check data (for public health endpoint)
CREATE POLICY "dev_enable_read_access_for_all_users" ON dev_health_check_ping
FOR SELECT USING (true);

-- Only authenticated users (via Clerk JWT) can insert
CREATE POLICY "dev_enable_insert_for_authenticated_users_only" ON dev_health_check_ping
FOR INSERT WITH CHECK (
  auth.jwt() ->> 'aud' = 'authenticated' 
  AND auth.jwt() ->> 'sub' IS NOT NULL
);

-- Only authenticated users can update their own records
CREATE POLICY "dev_enable_update_for_authenticated_users_only" ON dev_health_check_ping
FOR UPDATE USING (
  auth.jwt() ->> 'aud' = 'authenticated' 
  AND user_id = (auth.jwt() ->> 'sub')
);

-- Only authenticated users can delete their own records  
CREATE POLICY "dev_enable_delete_for_authenticated_users_only" ON dev_health_check_ping
FOR DELETE USING (
  auth.jwt() ->> 'aud' = 'authenticated' 
  AND user_id = (auth.jwt() ->> 'sub')
);
