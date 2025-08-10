-- health_check_ping 테이블
create table public.prod_health_check_ping (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp default now()
);

ALTER TABLE prod_health_check_ping ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read health check data (for public health endpoint)
CREATE POLICY "prod_enable_read_access_for_all_users" ON prod_health_check_ping
FOR SELECT USING (true);