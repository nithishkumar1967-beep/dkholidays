-- ============================================
-- DK HOLIDAYS V5 — MIGRATION V2
-- Add missing columns for editable content
-- ============================================

-- 1. New site_settings columns
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
  ADD COLUMN IF NOT EXISTS contact_hero_subtitle TEXT DEFAULT 'We would love to hear from you.';

-- 2. New services columns
ALTER TABLE services
  ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT 'Bus',
  ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]';
