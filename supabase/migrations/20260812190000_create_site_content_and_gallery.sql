/*
  Content management foundation for the Lea Valley public website.
  Authenticated staff manage these records; visitors can read published content.
*/

CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL UNIQUE,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  alt_text text NOT NULL,
  category text NOT NULL DEFAULT 'Community',
  image_url text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_site_content" ON site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin_manage_site_content" ON site_content FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "public_read_gallery" ON gallery_items FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "admin_read_all_gallery" ON gallery_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin_manage_gallery" ON gallery_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS gallery_items_display_order_idx ON gallery_items (display_order, created_at DESC);

INSERT INTO storage.buckets (id, name, public)
VALUES ('site_media', 'site_media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public_read_site_media" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'site_media');
CREATE POLICY "admin_manage_site_media" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'site_media') WITH CHECK (bucket_id = 'site_media');
