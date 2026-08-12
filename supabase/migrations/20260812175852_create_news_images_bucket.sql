/*
# Create news_images storage bucket

1. Purpose
   - A public storage bucket for news article hero images uploaded by admin staff.

2. Storage
   - Bucket `news_images` (public = true) so images can be displayed on the public site.

3. Security
   - Public read for anon + authenticated (images must be viewable by all visitors).
   - Only authenticated users can upload (INSERT) and update/delete objects.
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('news_images', 'news_images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read
DROP POLICY IF EXISTS "public_read_news_images" ON storage.objects;
CREATE POLICY "public_read_news_images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'news_images');

-- Authenticated upload
DROP POLICY IF EXISTS "admin_insert_news_images" ON storage.objects;
CREATE POLICY "admin_insert_news_images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'news_images');

-- Authenticated update
DROP POLICY IF EXISTS "admin_update_news_images" ON storage.objects;
CREATE POLICY "admin_update_news_images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'news_images') WITH CHECK (bucket_id = 'news_images');

-- Authenticated delete
DROP POLICY IF EXISTS "admin_delete_news_images" ON storage.objects;
CREATE POLICY "admin_delete_news_images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'news_images');
