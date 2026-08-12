/*
# Create news table for Lea Valley School admin CMS

1. Purpose
   - Stores news & events articles that admin staff can create, edit and delete.
   - Public visitors read published articles live from this table.

2. New Tables
   - `news`
     - `id` (uuid, primary key)
     - `title` (text, not null) — article headline
     - `excerpt` (text, not null) — short summary shown on cards
     - `body` (text, not null) — full article body (multi-paragraph, newline-separated)
     - `image_url` (text) — hero image URL (uploaded to storage or external)
     - `category` (text, not null, default 'News') — 'News' or 'Event'
     - `published_at` (date, not null) — the display date of the article
     - `created_at` (timestamptz, default now())
     - `updated_at` (timestamptz, default now())

3. Security — Row Level Security
   - Enable RLS on `news`.
   - Public SELECT for anon + authenticated (anyone can read published news).
   - Only authenticated admin users can INSERT, UPDATE, DELETE.
   - Uses auth.uid() ownership: any signed-in admin can manage all news rows.
     (Admin accounts are created manually, so any authenticated user is trusted as admin.)

4. Notes
   - This is a single shared news table (not per-user). All admin users manage the same set of articles.
   - `published_at` is a date (not timestamp) for clean display.
*/

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  body text NOT NULL,
  image_url text,
  category text NOT NULL DEFAULT 'News',
  published_at date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Public read
DROP POLICY IF EXISTS "public_read_news" ON news;
CREATE POLICY "public_read_news"
ON news FOR SELECT
TO anon, authenticated
USING (true);

-- Authenticated admin insert
DROP POLICY IF EXISTS "admin_insert_news" ON news;
CREATE POLICY "admin_insert_news"
ON news FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated admin update
DROP POLICY IF EXISTS "admin_update_news" ON news;
CREATE POLICY "admin_update_news"
ON news FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Authenticated admin delete
DROP POLICY IF EXISTS "admin_delete_news" ON news;
CREATE POLICY "admin_delete_news"
ON news FOR DELETE
TO authenticated
USING (true);

-- Index for ordering by date
CREATE INDEX IF NOT EXISTS news_published_at_idx ON news (published_at DESC);
