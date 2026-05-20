import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const PRODUCT_IDS: Record<string, string> = {
  "1063937": "cad-management",
  "1063951": "bootcamp",
  "1063959": "pack",
};

const VARIANT_IDS: Record<string, string> = {
  "1667874": "cad-management",
  "1667893": "bootcamp",
  "1667903": "pack",
};

function resolveSlug(productId: unknown, variantId: unknown): string | null {
  return (
    PRODUCT_IDS[String(productId)] ??
    VARIANT_IDS[String(variantId)] ??
    null
  );
}

function verifySignature(rawBody: string, signature: string): boolean {
  const secret = process.env.LEMON_WEBHOOK_SECRET!;
  const digest = createHmac("sha256", secret).update(rawBody).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const rawBody = await req.text();

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(rawBody);
  const eventName: string = body.meta?.event_name;
  const data = body.data?.attributes;
  const orderId: string = body.data?.id;

  if (eventName === "order_created") {
    const email: string = data?.user_email ?? "";
    const productId = data?.first_order_item?.product_id;
    const variantId = data?.first_order_item?.variant_id;
    const productSlug = resolveSlug(productId, variantId);

    if (!productSlug) {
      console.warn("[lemon webhook] unknown product_id/variant_id:", { productId, variantId });
      return NextResponse.json({ received: true });
    }

    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    const { error } = await supabaseAdmin.from("purchases").insert({
      user_id: existingUser?.id ?? null,
      pending_email: existingUser ? null : email,
      product_slug: productSlug,
      lemon_order_id: orderId,
      status: "active",
    });

    if (error?.code === "23505") {
      // Duplicate lemon_order_id — evento ya procesado (reenvío de LS)
      return NextResponse.json({ received: true });
    }
    if (error) {
      console.error("[lemon webhook] insert error:", error);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
  } else if (eventName === "order_refunded") {
    await supabaseAdmin
      .from("purchases")
      .update({ status: "refunded" })
      .eq("lemon_order_id", orderId);
  }

  return NextResponse.json({ received: true });
}
