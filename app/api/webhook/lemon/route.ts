import { NextRequest, NextResponse } from "next/server";

// Lemon Squeezy webhook — placeholder
// Docs: https://docs.lemonsqueezy.com/help/webhooks
export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const body = await req.json();

  // TODO: verify HMAC signature with LEMON_SQUEEZY_WEBHOOK_SECRET
  // TODO: handle events: order_created, subscription_created, etc.
  console.log("[lemon webhook]", body.meta?.event_name);

  return NextResponse.json({ received: true });
}
