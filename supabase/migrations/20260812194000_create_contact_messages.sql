CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'New',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_create_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "admin_read_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "admin_update_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "admin_delete_contact_messages" ON contact_messages;
CREATE POLICY "public_create_contact_messages" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin_read_contact_messages" ON contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin_update_contact_messages" ON contact_messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_delete_contact_messages" ON contact_messages FOR DELETE TO authenticated USING (true);
