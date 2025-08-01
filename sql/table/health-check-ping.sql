create table public.health_check_ping (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp default now()
);

ALTER TABLE health_check_ping ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON health_check_ping
FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON health_check_ping
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON health_check_ping
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON health_check_ping
FOR DELETE USING (auth.role() = 'authenticated');
