/* Role-based access: only explicitly approved staff accounts may administer the website. */
CREATE TABLE IF NOT EXISTS admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_site_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()) $$;

DROP POLICY IF EXISTS "admin_insert_news" ON news;
DROP POLICY IF EXISTS "admin_update_news" ON news;
DROP POLICY IF EXISTS "admin_delete_news" ON news;
CREATE POLICY "admin_insert_news" ON news FOR INSERT TO authenticated WITH CHECK (public.is_site_admin());
CREATE POLICY "admin_update_news" ON news FOR UPDATE TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());
CREATE POLICY "admin_delete_news" ON news FOR DELETE TO authenticated USING (public.is_site_admin());

DROP POLICY IF EXISTS "admin_manage_site_content" ON site_content;
DROP POLICY IF EXISTS "admin_read_all_gallery" ON gallery_items;
DROP POLICY IF EXISTS "admin_manage_gallery" ON gallery_items;
CREATE POLICY "admin_manage_site_content" ON site_content FOR ALL TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());
CREATE POLICY "admin_read_all_gallery" ON gallery_items FOR SELECT TO authenticated USING (public.is_site_admin());
CREATE POLICY "admin_manage_gallery" ON gallery_items FOR ALL TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());

DROP POLICY IF EXISTS "admin_read_admissions_enquiries" ON admissions_enquiries;
DROP POLICY IF EXISTS "admin_update_admissions_enquiries" ON admissions_enquiries;
DROP POLICY IF EXISTS "admin_delete_admissions_enquiries" ON admissions_enquiries;
CREATE POLICY "admin_read_admissions_enquiries" ON admissions_enquiries FOR SELECT TO authenticated USING (public.is_site_admin());
CREATE POLICY "admin_update_admissions_enquiries" ON admissions_enquiries FOR UPDATE TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());
CREATE POLICY "admin_delete_admissions_enquiries" ON admissions_enquiries FOR DELETE TO authenticated USING (public.is_site_admin());

DROP POLICY IF EXISTS "admin_read_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "admin_update_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "admin_delete_contact_messages" ON contact_messages;
CREATE POLICY "admin_read_contact_messages" ON contact_messages FOR SELECT TO authenticated USING (public.is_site_admin());
CREATE POLICY "admin_update_contact_messages" ON contact_messages FOR UPDATE TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());
CREATE POLICY "admin_delete_contact_messages" ON contact_messages FOR DELETE TO authenticated USING (public.is_site_admin());

DROP POLICY IF EXISTS "admin_insert_news_images" ON storage.objects;
DROP POLICY IF EXISTS "admin_update_news_images" ON storage.objects;
DROP POLICY IF EXISTS "admin_delete_news_images" ON storage.objects;
DROP POLICY IF EXISTS "admin_manage_site_media" ON storage.objects;
CREATE POLICY "admin_manage_news_images" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'news_images' AND public.is_site_admin()) WITH CHECK (bucket_id = 'news_images' AND public.is_site_admin());
CREATE POLICY "admin_manage_site_media" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'site_media' AND public.is_site_admin()) WITH CHECK (bucket_id = 'site_media' AND public.is_site_admin());
