-- ============================================
-- 1. Fix Storage RLS — Allow public uploads
-- ============================================
-- Enable storage RLS if not already
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop any existing restrictive policies
DROP POLICY IF EXISTS "Public access to hero-images" ON storage.objects;
DROP POLICY IF EXISTS "Public access to gallery-images" ON storage.objects;
DROP POLICY IF EXISTS "Public access to fleet-images" ON storage.objects;
DROP POLICY IF EXISTS "Public access to service-images" ON storage.objects;
DROP POLICY IF EXISTS "Public access to blog-images" ON storage.objects;
DROP POLICY IF EXISTS "Public access to company-assets" ON storage.objects;

-- Allow full public access to each bucket
CREATE POLICY "Public access to hero-images" ON storage.objects
  FOR ALL USING (bucket_id = 'hero-images') WITH CHECK (bucket_id = 'hero-images');
CREATE POLICY "Public access to gallery-images" ON storage.objects
  FOR ALL USING (bucket_id = 'gallery-images') WITH CHECK (bucket_id = 'gallery-images');
CREATE POLICY "Public access to fleet-images" ON storage.objects
  FOR ALL USING (bucket_id = 'fleet-images') WITH CHECK (bucket_id = 'fleet-images');
CREATE POLICY "Public access to service-images" ON storage.objects
  FOR ALL USING (bucket_id = 'service-images') WITH CHECK (bucket_id = 'service-images');
CREATE POLICY "Public access to blog-images" ON storage.objects
  FOR ALL USING (bucket_id = 'blog-images') WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Public access to company-assets" ON storage.objects
  FOR ALL USING (bucket_id = 'company-assets') WITH CHECK (bucket_id = 'company-assets');

-- ============================================
-- 2. Add Home & About columns to site_settings
-- ============================================
ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS about_title TEXT DEFAULT 'Built on Trust. Powered by Team Black Panther.',
  ADD COLUMN IF NOT EXISTS about_description TEXT DEFAULT 'DK Holidays is Coimbatore''s trusted travel & transportation brand, founded by Mr. Dinesh Kumar. We''ve been moving families, companies, schools and wedding parties safely across South India — with a modern fleet, professional drivers, and a no-surprises booking experience.',
  ADD COLUMN IF NOT EXISTS about_mission_title TEXT DEFAULT 'Our Mission',
  ADD COLUMN IF NOT EXISTS about_mission_desc TEXT DEFAULT 'Safe, comfortable, affordable travel — every trip.',
  ADD COLUMN IF NOT EXISTS about_vision_title TEXT DEFAULT 'Our Vision',
  ADD COLUMN IF NOT EXISTS about_vision_desc TEXT DEFAULT 'South India''s most trusted tourist transport name.',
  ADD COLUMN IF NOT EXISTS about_image TEXT DEFAULT '/images/about-img.jpg',
  ADD COLUMN IF NOT EXISTS about_hero_title TEXT DEFAULT 'Built on Trust. Powered by Team Black Panther.',
  ADD COLUMN IF NOT EXISTS about_hero_subtitle TEXT DEFAULT 'Coimbatore''s trusted travel & transportation partner since 2016.',
  ADD COLUMN IF NOT EXISTS about_story_heading TEXT DEFAULT 'Our Story',
  ADD COLUMN IF NOT EXISTS about_story_paragraphs TEXT DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS about_stat_labels TEXT DEFAULT '["8+ Years Experience", "10000+ Happy Travelers", "24/7 Support", "4.9 Rating"]',
  ADD COLUMN IF NOT EXISTS about_stat_icons TEXT DEFAULT '["Award", "Users", "Clock", "HeartHandshake"]';
