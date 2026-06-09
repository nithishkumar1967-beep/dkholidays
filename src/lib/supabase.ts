import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
  }
  return _client;
}

// Lazy proxy — createClient() not called until first property access.
// Avoids "supabaseUrl is required" errors during Vercel build.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const c = getClient();
    const v = c[prop as keyof SupabaseClient];
    return typeof v === "function" ? v.bind(c) : v;
  },
});
