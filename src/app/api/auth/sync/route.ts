import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");
    if (!uid) {
      return NextResponse.json({ error: "Missing uid" }, { status: 400 });
    }
    const supabaseAdmin = getAdmin();
    const { data } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", uid)
      .single();
    if (!data) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    return NextResponse.json({ user: data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { uid, email } = await request.json();
    if (!uid || !email) {
      return NextResponse.json({ error: "Missing uid or email" }, { status: 400 });
    }

    const supabaseAdmin = getAdmin();
    const { data: existingUsers } = await supabaseAdmin
      .from("users")
      .select("id")
      .limit(1);

    const role = existingUsers?.length ? "admin" : "super_admin";

    const { error } = await supabaseAdmin.from("users").insert([
      { id: uid, email, role },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, role });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
