CREATE TABLE IF NOT EXISTS admissions_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name text NOT NULL,
  child_name text,
  email text NOT NULL,
  phone text,
  stage text,
  start_term text,
  message text,
  status text NOT NULL DEFAULT 'New',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admissions_enquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_create_admissions_enquiry" ON admissions_enquiries;
DROP POLICY IF EXISTS "admin_read_admissions_enquiries" ON admissions_enquiries;
DROP POLICY IF EXISTS "admin_update_admissions_enquiries" ON admissions_enquiries;
DROP POLICY IF EXISTS "admin_delete_admissions_enquiries" ON admissions_enquiries;
CREATE POLICY "public_create_admissions_enquiry" ON admissions_enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin_read_admissions_enquiries" ON admissions_enquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin_update_admissions_enquiries" ON admissions_enquiries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_delete_admissions_enquiries" ON admissions_enquiries FOR DELETE TO authenticated USING (true);
CREATE INDEX IF NOT EXISTS admissions_enquiries_created_at_idx ON admissions_enquiries (created_at DESC);
