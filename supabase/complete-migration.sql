-- ============================================
-- DK HOLIDAYS V5 — COMPLETE DATABASE SETUP
-- Run this entire block in Supabase SQL Editor
-- Then create storage buckets manually (see bottom)
-- ============================================

-- 1. Create all tables
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
  hero_image TEXT DEFAULT '/images/hero-bg.jpg',
  hero_stats JSONB DEFAULT '[{"num":"10,000+","label":"Happy Travelers"},{"num":"50+","label":"Vehicles"},{"num":"8+","label":"Years Experience"},{"num":"24/7","label":"Support"}]',
  meta_title TEXT DEFAULT 'DK Holidays – Best Travel & Tourist Bus Rental in Coimbatore',
  meta_description TEXT DEFAULT 'Coimbatore''s #1 travel & tourist bus rental company. Book bus, SUV, van for family trips, corporate tours, airport pickup, school tours & weddings. Call 9944890203.',
  why_choose_us_heading TEXT DEFAULT 'Travel with People Who Care',
  why_choose_us_items JSONB DEFAULT '[{"icon":"ShieldCheck","title":"Professional Drivers","desc":"Trained, verified and courteous drivers on every trip. Background-checked for your safety."},{"icon":"Sparkles","title":"Clean Vehicles","desc":"Sanitised, well-maintained fleet — inside and out. Every vehicle checked before each trip."},{"icon":"Headphones","title":"24/7 Support","desc":"We pick up at any hour. Real people, real fast. Call or WhatsApp anytime."},{"icon":"MapPin","title":"GPS Tracked","desc":"All vehicles are GPS-tracked with complete route planning for maximum safety."}]',
  about_title TEXT DEFAULT 'Built on Trust. Powered by Team Black Panther.',
  about_description TEXT DEFAULT 'DK Holidays is Coimbatore''s trusted travel & transportation brand.',
  about_mission_title TEXT DEFAULT 'Our Mission',
  about_mission_desc TEXT DEFAULT 'Safe, comfortable, affordable travel — every trip.',
  about_vision_title TEXT DEFAULT 'Our Vision',
  about_vision_desc TEXT DEFAULT 'South India''s most trusted tourist transport name.',
  about_image TEXT DEFAULT '/images/about-img.jpg',
  about_hero_title TEXT DEFAULT 'Built on Trust. Powered by Team Black Panther.',
  about_hero_subtitle TEXT DEFAULT 'Coimbatore''s trusted travel & transportation partner since 2016.',
  about_story_heading TEXT DEFAULT 'Our Story',
  about_story_paragraphs TEXT DEFAULT '[]',
  about_stats JSONB DEFAULT '[{"value":"8+","label":"Years Experience","icon":"Award"},{"value":"10,000+","label":"Happy Travelers","icon":"Users"},{"value":"24/7","label":"Support","icon":"Clock"},{"value":"4.9","label":"Rating","icon":"HeartHandshake"}]',
  about_stat_labels TEXT DEFAULT '["8+ Years Experience","10000+ Happy Travelers","24/7 Support","4.9 Rating"]',
  about_stat_icons TEXT DEFAULT '["Award","Users","Clock","HeartHandshake"]',
  about_values JSONB DEFAULT '[{"icon":"ShieldCheck","title":"Safety First","desc":"Every vehicle undergoes rigorous safety checks before each trip. Your safety is our top priority."},{"icon":"Target","title":"Reliability","desc":"We value your time. Our fleet operates with military precision — on-time, every time."},{"icon":"Eye","title":"Transparency","desc":"No hidden charges. No surprises. What we quote is what you pay."},{"icon":"HeartHandshake","title":"Customer First","desc":"We treat every traveler like family. From booking to drop-off, we have got your back."}]',
  fleet_hero_title TEXT DEFAULT 'The Right Vehicle<br/>for Every Trip',
  fleet_hero_subtitle TEXT DEFAULT 'Modern, well-maintained, and ready when you are — our fleet covers every occasion.',
  services_hero_title TEXT DEFAULT 'Travel Solutions for<br/>Every Occasion',
  services_hero_subtitle TEXT DEFAULT 'From corporate fleets to family vacations — we have got the right ride for every journey.',
  gallery_hero_title TEXT DEFAULT 'Moments from <span class="text-accent">the Road</span>',
  gallery_hero_subtitle TEXT DEFAULT 'Real trips, real smiles — a glimpse of the journeys we have made memorable.',
  gallery_categories JSONB DEFAULT '["All","Tour","Bus","Wedding","Corporate","School","Airport"]',
  contact_hero_title TEXT DEFAULT 'Get in Touch',
  contact_hero_subtitle TEXT DEFAULT 'We would love to hear from you.',
  packages_hero_title TEXT DEFAULT 'Curated Tour<br/>Packages',
  packages_hero_subtitle TEXT DEFAULT 'Handpicked travel experiences designed for every kind of traveler.',
  favicon_url TEXT DEFAULT '',
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
  icon TEXT DEFAULT 'Bus',
  features JSONB DEFAULT '[]',
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

-- 2. Enable Row Level Security on all tables
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE fleet ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies (open access — security is enforced by Firebase Auth in app layer)
-- ============================================

-- Fleet
CREATE POLICY "Anyone can read fleet" ON fleet FOR SELECT USING (true);
CREATE POLICY "Anyone can insert fleet" ON fleet FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update fleet" ON fleet FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete fleet" ON fleet FOR DELETE USING (true);

-- Services
CREATE POLICY "Anyone can read services" ON services FOR SELECT USING (true);
CREATE POLICY "Anyone can insert services" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update services" ON services FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete services" ON services FOR DELETE USING (true);

-- Gallery
CREATE POLICY "Anyone can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Anyone can insert gallery" ON gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update gallery" ON gallery FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete gallery" ON gallery FOR DELETE USING (true);

-- Reviews
CREATE POLICY "Anyone can read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Anyone can insert reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update reviews" ON reviews FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete reviews" ON reviews FOR DELETE USING (true);

-- Enquiries
CREATE POLICY "Anyone can read enquiries" ON enquiries FOR SELECT USING (true);
CREATE POLICY "Anyone can insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update enquiries" ON enquiries FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete enquiries" ON enquiries FOR DELETE USING (true);

-- Blog Posts
CREATE POLICY "Anyone can read blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Anyone can insert blog_posts" ON blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update blog_posts" ON blog_posts FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete blog_posts" ON blog_posts FOR DELETE USING (true);

-- Site Settings
CREATE POLICY "Anyone can read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can insert site_settings" ON site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update site_settings" ON site_settings FOR UPDATE USING (true);

-- Users
CREATE POLICY "Anyone can read users" ON users FOR SELECT USING (true);
CREATE POLICY "Anyone can insert users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update users" ON users FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete users" ON users FOR DELETE USING (true);

-- Packages
CREATE POLICY "Anyone can read packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Anyone can insert packages" ON packages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update packages" ON packages FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete packages" ON packages FOR DELETE USING (true);

-- 4. Insert default site_settings row
-- ============================================
INSERT INTO site_settings (company_name, phone, whatsapp, email, address)
VALUES ('DK Holidays', '+919944890203', '919944890203', 'info@dkholidays.in', 'Coimbatore, Tamil Nadu, India')
ON CONFLICT DO NOTHING;

-- 5. Add columns for existing databases (safe to re-run)
-- ============================================
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS favicon_url TEXT DEFAULT '';

-- ============================================
-- ✅ DONE — SQL PART COMPLETE
-- ============================================
-- NEXT: Create Storage Buckets in Supabase Dashboard
-- Go to Storage → New Bucket and create these PUBLIC buckets:
--   hero-images
--   gallery-images
--   fleet-images
--   service-images
--   blog-images
--   packages-images
--   company-assets
-- ============================================
