import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const envPath = join(__dirname, "..", ".env.local");
const envRaw = readFileSync(envPath, "utf-8");

const getEnv = (key) => {
  const match = envRaw.match(new RegExp(`^${key}=(.+)$`, "m"));
  return match ? match[1].trim() : null;
};

const supabaseUrl = getEnv("NEXT_PUBLIC_SUPABASE_URL");
const serviceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing SUPABASE env vars in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

// 1. Create Storage Buckets
console.log("=== Creating Storage Buckets ===");
const buckets = [
  "hero-images",
  "gallery-images",
  "fleet-images",
  "service-images",
  "blog-images",
  "company-assets",
];

for (const name of buckets) {
  const { error } = await supabase.storage.createBucket(name, {
    public: true,
  });
  if (error) {
    console.log(`  ${name}: ${error.message}`);
  } else {
    console.log(`  ${name}: created`);
  }
}

// 2. Ensure admin user exists
console.log("\n=== Ensuring Admin User ===");
const { error: upsertError } = await supabase.from("users").upsert(
  {
    id: "jw1u6rfHvjPZxw8g1ZcnlOPhXxx1",
    email: "admin1@gmail.com",
    role: "super_admin",
  },
  { onConflict: "id" }
);

if (upsertError) {
  console.log("User upsert error:", upsertError.message);
} else {
  console.log("Admin user confirmed in DB");
}

// 3. Output SQL for RLS fix
console.log("\n=== SQL to run in Supabase SQL Editor ===");
console.log("Copy and paste this SQL into your Supabase SQL Editor and run it:");
console.log("");

const fixSql = `-- ============================================
-- DK HOLIDAYS V5 — RLS POLICY FIX
-- Replace admin auth.role() policies with public
-- access policies (security via Firebase Auth app layer)
-- ============================================

-- Drop old admin-only policies
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

-- Replace with public-access policies (security via Firebase Auth in app layer)
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
CREATE POLICY "Anyone can delete users" ON users FOR DELETE USING (true);`;

console.log(fixSql);

// Write the SQL to a file
const sqlPath = join(__dirname, "..", "supabase", "fix-rls.sql");
writeFileSync(sqlPath, fixSql, "utf-8");
console.log(`\nSQL also written to ${sqlPath}`);

console.log("\nDone! Run the SQL above in your Supabase SQL Editor.");
