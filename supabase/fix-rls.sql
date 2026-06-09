-- ============================================
-- DK HOLIDAYS V5 — COMPREHENSIVE ALL-IN-ONE
-- Run this entire block in Supabase SQL Editor
-- ============================================

-- 1. Fix Table RLS (Firebase Auth, not Supabase Auth)
DROP POLICY IF EXISTS "Admins can read all fleet" ON fleet;
DROP POLICY IF EXISTS "Admins can insert fleet" ON fleet;
DROP POLICY IF EXISTS "Admins can update fleet" ON fleet;
DROP POLICY IF EXISTS "Admins can delete fleet" ON fleet;
DROP POLICY IF EXISTS "Admins can read all services" ON services;
DROP POLICY IF EXISTS "Admins can insert services" ON services;
DROP POLICY IF EXISTS "Admins can update services" ON services;
DROP POLICY IF EXISTS "Admins can delete services" ON services;
DROP POLICY IF EXISTS "Admins can read all gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can insert gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can update gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can delete gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can read all reviews" ON reviews;
DROP POLICY IF EXISTS "Admins can approve reviews" ON reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON reviews;
DROP POLICY IF EXISTS "Admins can read all enquiries" ON enquiries;
DROP POLICY IF EXISTS "Admins can update enquiries" ON enquiries;
DROP POLICY IF EXISTS "Admins can delete enquiries" ON enquiries;
DROP POLICY IF EXISTS "Admins can read all blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can delete blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can read site_settings" ON site_settings;
DROP POLICY IF EXISTS "Admins can update site_settings" ON site_settings;
DROP POLICY IF EXISTS "Super admins can read users" ON users;
DROP POLICY IF EXISTS "Super admins can insert users" ON users;
DROP POLICY IF EXISTS "Super admins can update users" ON users;
DROP POLICY IF EXISTS "Super admins can delete users" ON users;

DROP POLICY IF EXISTS "Anyone can read fleet" ON fleet;
DROP POLICY IF EXISTS "Anyone can insert fleet" ON fleet;
DROP POLICY IF EXISTS "Anyone can update fleet" ON fleet;
DROP POLICY IF EXISTS "Anyone can delete fleet" ON fleet;
DROP POLICY IF EXISTS "Anyone can read services" ON services;
DROP POLICY IF EXISTS "Anyone can insert services" ON services;
DROP POLICY IF EXISTS "Anyone can update services" ON services;
DROP POLICY IF EXISTS "Anyone can delete services" ON services;
DROP POLICY IF EXISTS "Anyone can read gallery" ON gallery;
DROP POLICY IF EXISTS "Anyone can insert gallery" ON gallery;
DROP POLICY IF EXISTS "Anyone can update gallery" ON gallery;
DROP POLICY IF EXISTS "Anyone can delete gallery" ON gallery;
DROP POLICY IF EXISTS "Anyone can read reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can insert reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can update reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can delete reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can read enquiries" ON enquiries;
DROP POLICY IF EXISTS "Anyone can insert enquiries" ON enquiries;
DROP POLICY IF EXISTS "Anyone can update enquiries" ON enquiries;
DROP POLICY IF EXISTS "Anyone can delete enquiries" ON enquiries;
DROP POLICY IF EXISTS "Anyone can read blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can insert blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can update blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can delete blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can read site_settings" ON site_settings;
DROP POLICY IF EXISTS "Anyone can insert site_settings" ON site_settings;
DROP POLICY IF EXISTS "Anyone can update site_settings" ON site_settings;
DROP POLICY IF EXISTS "Anyone can read users" ON users;
DROP POLICY IF EXISTS "Anyone can insert users" ON users;
DROP POLICY IF EXISTS "Anyone can update users" ON users;
DROP POLICY IF EXISTS "Anyone can delete users" ON users;

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
CREATE POLICY "Anyone can insert site_settings" ON site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update site_settings" ON site_settings FOR UPDATE USING (true);
CREATE POLICY "Anyone can read users" ON users FOR SELECT USING (true);
CREATE POLICY "Anyone can insert users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update users" ON users FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete users" ON users FOR DELETE USING (true);

-- 2. Add new columns to site_settings
ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS hero_image TEXT DEFAULT '/images/hero-bg.jpg',
  ADD COLUMN IF NOT EXISTS hero_stats JSONB DEFAULT '[{"num":"10,000+","label":"Happy Travelers"},{"num":"50+","label":"Vehicles"},{"num":"8+","label":"Years Experience"},{"num":"24/7","label":"Support"}]',
  ADD COLUMN IF NOT EXISTS why_choose_us_heading TEXT DEFAULT 'Travel with People Who Care',
  ADD COLUMN IF NOT EXISTS why_choose_us_items JSONB DEFAULT '[{"icon":"ShieldCheck","title":"Professional Drivers","desc":"Trained, verified and courteous drivers on every trip. Background-checked for your safety."},{"icon":"Sparkles","title":"Clean Vehicles","desc":"Sanitised, well-maintained fleet — inside and out. Every vehicle checked before each trip."},{"icon":"Headphones","title":"24/7 Support","desc":"We pick up at any hour. Real people, real fast. Call or WhatsApp anytime."},{"icon":"MapPin","title":"GPS Tracked","desc":"All vehicles are GPS-tracked with complete route planning for maximum safety."}]',
  ADD COLUMN IF NOT EXISTS about_values JSONB DEFAULT '[{"icon":"ShieldCheck","title":"Safety First","desc":"Every vehicle undergoes rigorous safety checks before each trip. Your safety is our top priority."},{"icon":"Target","title":"Reliability","desc":"We value your time. Our fleet operates with military precision — on-time, every time."},{"icon":"Eye","title":"Transparency","desc":"No hidden charges. No surprises. What we quote is what you pay."},{"icon":"HeartHandshake","title":"Customer First","desc":"We treat every traveler like family. From booking to drop-off, we have got your back."}]',
  ADD COLUMN IF NOT EXISTS about_stats JSONB DEFAULT '[{"value":"8+","label":"Years Experience","icon":"Award"},{"value":"10,000+","label":"Happy Travelers","icon":"Users"},{"value":"24/7","label":"Support","icon":"Clock"},{"value":"4.9","label":"Rating","icon":"HeartHandshake"}]',
  ADD COLUMN IF NOT EXISTS fleet_hero_title TEXT DEFAULT 'The Right Vehicle<br/>for Every Trip',
  ADD COLUMN IF NOT EXISTS fleet_hero_subtitle TEXT DEFAULT 'Modern, well-maintained, and ready when you are — our fleet covers every occasion.',
  ADD COLUMN IF NOT EXISTS services_hero_title TEXT DEFAULT 'Travel Solutions for<br/>Every Occasion',
  ADD COLUMN IF NOT EXISTS services_hero_subtitle TEXT DEFAULT 'From corporate fleets to family vacations — we have got the right ride for every journey.',
  ADD COLUMN IF NOT EXISTS gallery_hero_title TEXT DEFAULT 'Moments from <span class="text-accent">the Road</span>',
  ADD COLUMN IF NOT EXISTS gallery_hero_subtitle TEXT DEFAULT 'Real trips, real smiles — a glimpse of the journeys we have made memorable.',
  ADD COLUMN IF NOT EXISTS gallery_categories JSONB DEFAULT '["All","Tour","Bus","Wedding","Corporate","School","Airport"]',
  ADD COLUMN IF NOT EXISTS contact_hero_title TEXT DEFAULT 'Get in Touch',
  ADD COLUMN IF NOT EXISTS contact_hero_subtitle TEXT DEFAULT 'We would love to hear from you.',
  ADD COLUMN IF NOT EXISTS packages_hero_title TEXT DEFAULT 'Curated Tour<br/>Packages',
  ADD COLUMN IF NOT EXISTS packages_hero_subtitle TEXT DEFAULT 'Handpicked travel experiences designed for every kind of traveler.',
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

-- 3. Add new columns to services
ALTER TABLE services
  ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT 'Bus',
  ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]';

-- 4. Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT DEFAULT '',
  duration TEXT DEFAULT '',
  price TEXT DEFAULT '',
  places TEXT DEFAULT '[]',
  image_url TEXT DEFAULT '',
  itinerary JSONB DEFAULT '[]',
  included TEXT DEFAULT '[]',
  not_included TEXT DEFAULT '[]',
  published BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can read published packages" ON packages;
DROP POLICY IF EXISTS "Anyone can read packages" ON packages;
DROP POLICY IF EXISTS "Anyone can insert packages" ON packages;
DROP POLICY IF EXISTS "Anyone can update packages" ON packages;
DROP POLICY IF EXISTS "Anyone can delete packages" ON packages;
CREATE POLICY "Anyone can read published packages" ON packages FOR SELECT USING (published = true);
CREATE POLICY "Anyone can read packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Anyone can insert packages" ON packages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update packages" ON packages FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete packages" ON packages FOR DELETE USING (true);

-- 5. Ensure site_settings has a row
INSERT INTO site_settings (company_name, phone, whatsapp, email, address)
SELECT 'DK Holidays', '+919944890203', '+919944890203', 'info@dkholidays.in', 'Coimbatore'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);
