import { NextRequest, NextResponse } from "next/server";
import { markCompleted } from "@/lib/db";

// Llamado por el agente forastero-bim cuando valida un IFC en verde o amarillo.
// Marca la semana como completada → desbloquea la siguiente en el dashboard.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, week, validationColor } = body;

  if (!userId || typeof week !== "number" || !validationColor) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Solo verde y amarillo desbloquean la siguiente semana
  if (!["green", "yellow"].includes(validationColor)) {
    return NextResponse.json({ success: false, reason: "red validation does not unlock" });
  }

  const slug = `semana-${week}`;
  await markCompleted(userId, "bootcamp", slug);

  return NextResponse.json({ success: true, unlockedSlug: slug });
}
