-- ============================================
-- DK HOLIDAYS — SEED DATA
-- ============================================
-- Optional: Insert sample data for testing
-- ============================================

-- Insert default site settings
INSERT INTO site_settings (company_name, phone, whatsapp, email, address, hero_title, hero_subtitle, meta_title, meta_description)
VALUES (
  'DK Holidays',
  '+919944890203',
  '919944890203',
  'info@dkholidays.in',
  'Coimbatore, Tamil Nadu, India',
  'Reliable Travel Services<br/>For Every Journey',
  'Tourist buses, corporate transport, airport pickups, family trips and wedding transportation — booked in minutes over a simple call or WhatsApp.',
  'DK Holidays – Best Travel & Tourist Bus Rental in Coimbatore',
  'Coimbatore''s #1 travel & tourist bus rental company. Book bus, SUV, van for family trips, corporate tours, airport pickup, school tours & weddings. Call 9944890203.'
)
ON CONFLICT DO NOTHING;

-- Insert sample fleet
INSERT INTO fleet (title, description, capacity, vehicle_type, display_order, active) VALUES
('AC Tourist Bus', 'Full AC, Reclining Seats, GPS Tracked', '40-52 Seats', 'bus', 1, true),
('Mini Bus', 'AC Available, Luggage Space, GPS Tracked', '20-30 Seats', 'minibus', 2, true),
('SUV / Innova', 'Premium AC, Leather Seats, Airport Transfers', '6-8 Seats', 'suv', 3, true);

-- Insert sample services
INSERT INTO services (title, description, display_order, active) VALUES
('Tourist Bus Rental', 'Comfortable AC buses for sightseeing & long-distance group trips across South India.', 1, true),
('Corporate Transport', 'Daily staff transport & corporate event mobility solutions, on-time every time.', 2, true),
('Airport Pickup', 'On-time, professional airport drop-offs and pickups at Coimbatore Airport, 24/7.', 3, true),
('Family Trips', 'Hassle-free family vacations across South India with comfortable, safe vehicles.', 4, true),
('School Tours', 'Safe, supervised transportation for school excursions with trained, verified drivers.', 5, true),
('Wedding Transportation', 'Premium fleet for wedding parties and guest transfers — arrive in style.', 6, true);

-- Insert sample reviews
INSERT INTO reviews (customer_name, rating, review, approved) VALUES
('Ramesh K.', 5, 'Best bus rental in Coimbatore! DK Holidays arranged our family trip to Ooty perfectly. Clean bus, professional driver, on time. Highly recommend!', true),
('Priya S.', 5, 'Used DK Holidays for our company outing. Excellent service, very punctual and the bus was spotless.', true),
('Arun M.', 5, 'Airport pickup was seamless. Driver was waiting with my name board, helped with luggage.', true);
