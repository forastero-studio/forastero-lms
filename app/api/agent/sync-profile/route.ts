import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getUserByClerkId } from "@/lib/db";

// Called by AgentDrawer when the agent sends forastero_ifc_validated.
// Persists the agent userProfile JSON to Supabase agent_profiles table.
// Fails silently if the table does not exist yet.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, profile } = body;

    if (!userId || !profile) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await getUserByClerkId(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await supabaseAdmin
      .from("agent_profiles")
      .upsert(
        {
          user_id: user.id,
          profile,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    return NextResponse.json({ success: true });
  } catch {
    // Fail silently — profile sync is non-blocking
    return NextResponse.json({ success: false });
  }
}
