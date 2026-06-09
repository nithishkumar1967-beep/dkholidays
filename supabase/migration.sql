-- ============================================
-- DK HOLIDAYS V5 — SUPABASE MIGRATION
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- 1. Create tables
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('super_admin', 'admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT DEFAULT 'DK Holidays',
  phone TEXT DEFAULT '+919944890203',
  whatsapp TEXT DEFAULT '919944890203',
  email TEXT DEFAULT 'info@dkholidays.in',
  address TEXT DEFAULT 'Coimbatore, Tamil Nadu, India',
  hero_title TEXT DEFAULT 'Reliable Travel Services<br/>For Every Journey',
  hero_subtitle TEXT DEFAULT 'Tourist buses, corporate transport, airport pickups, family trips and wedding transportation — booked in minutes over a simple call or WhatsApp.',
  meta_title TEXT DEFAULT 'DK Holidays – Best Travel & Tourist Bus Rental in Coimbatore',
  meta_description TEXT DEFAULT 'Coimbatore''s #1 travel & tourist bus rental company. Book bus, SUV, van for family trips, corporate tours, airport pickup, school tours & weddings. Call 9944890203.',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fleet (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  capacity TEXT DEFAULT '',
  vehicle_type TEXT DEFAULT 'bus',
  display_order INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  display_order INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  category TEXT DEFAULT 'Tour',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  review TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT DEFAULT '',
  service TEXT DEFAULT '',
  message TEXT DEFAULT '',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT DEFAULT '',
  featured_image TEXT DEFAULT '',
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Storage Buckets & RLS
-- ============================================
-- Buckets: hero-images, gallery-images, fleet-images, service-images, blog-images, company-assets
-- Make buckets public via API

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

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

-- 3. Enable Row Level Security
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE fleet ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies
-- ============================================

-- Public read policies (published/active content only)
CREATE POLICY "Public can read active fleet" ON fleet FOR SELECT USING (active = true);
CREATE POLICY "Public can read active services" ON services FOR SELECT USING (active = true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public can read approved reviews" ON reviews FOR SELECT USING (approved = true);
CREATE POLICY "Public can create reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);

-- NOTE: We use Firebase Auth, NOT Supabase Auth. All RLS policies
-- allow public access. Security is enforced at the application layer
-- (Firebase Auth + admin layout component).

-- Admin CRUD policies (open access, secured by Firebase Auth in app layer)
CREATE POLICY "Anyone can read fleet" ON fleet FOR SELECT USING (true);
CREATE POLICY "Anyone can insert fleet" ON fleet FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update fleet" ON fleet FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete fleet" ON fleet FOR DELETE USING (true);

CREATE POLICY "Anyone can read services" ON services FOR SELECT USING (true);
CREATE POLICY "Anyone can insert services" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update services" ON services FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete services" ON services FOR DELETE USING (true);

CREATE POLICY "Anyone can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Anyone can insert gallery" ON gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update gallery" ON gallery FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete gallery" ON gallery FOR DELETE USING (true);

CREATE POLICY "Anyone can read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Anyone can insert reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update reviews" ON reviews FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete reviews" ON reviews FOR DELETE USING (true);

CREATE POLICY "Anyone can read enquiries" ON enquiries FOR SELECT USING (true);
CREATE POLICY "Anyone can insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update enquiries" ON enquiries FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete enquiries" ON enquiries FOR DELETE USING (true);

CREATE POLICY "Anyone can read blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Anyone can insert blog_posts" ON blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update blog_posts" ON blog_posts FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete blog_posts" ON blog_posts FOR DELETE USING (true);

CREATE POLICY "Anyone can read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can update site_settings" ON site_settings FOR UPDATE USING (true);

CREATE POLICY "Anyone can read users" ON users FOR SELECT USING (true);
CREATE POLICY "Anyone can insert users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update users" ON users FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete users" ON users FOR DELETE USING (true);

-- 5. Add Home & About columns
-- ============================================
ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS about_title TEXT DEFAULT 'Built on Trust. Powered by Team Black Panther.',
  ADD COLUMN IF NOT EXISTS about_description TEXT DEFAULT 'DK Holidays is Coimbatore''s trusted travel & transportation brand.',
  ADD COLUMN IF NOT EXISTS about_mission_title TEXT DEFAULT 'Our Mission',
  ADD COLUMN IF NOT EXISTS about_mission_desc TEXT DEFAULT 'Safe, comfortable, affordable travel — every trip.',
  ADD COLUMN IF NOT EXISTS about_vision_title TEXT DEFAULT 'Our Vision',
  ADD COLUMN IF NOT EXISTS about_vision_desc TEXT DEFAULT 'South India''s most trusted tourist transport name.',
  ADD COLUMN IF NOT EXISTS about_image TEXT DEFAULT '/images/about-img.jpg',
  ADD COLUMN IF NOT EXISTS about_hero_title TEXT DEFAULT 'Built on Trust. Powered by Team Black Panther.',
  ADD COLUMN IF NOT EXISTS about_hero_subtitle TEXT DEFAULT 'Coimbatore''s trusted travel & transportation partner since 2016.',
  ADD COLUMN IF NOT EXISTS about_story_heading TEXT DEFAULT 'Our Story',
  ADD COLUMN IF NOT EXISTS about_story_paragraphs TEXT DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS about_stat_labels TEXT DEFAULT '["8+ Years Experience","10000+ Happy Travelers","24/7 Support","4.9 Rating"]',
  ADD COLUMN IF NOT EXISTS about_stat_icons TEXT DEFAULT '["Award","Users","Clock","HeartHandshake"]';

-- 6. Insert Default Data
-- ============================================
INSERT INTO site_settings (company_name, phone, whatsapp, email, address)
VALUES ('DK Holidays', '+919944890203', '919944890203', 'info@dkholidays.in', 'Coimbatore, Tamil Nadu, India')
ON CONFLICT DO NOTHING;
