import { supabaseAdmin } from "./supabase";

export interface User {
  id: string;
  clerk_id: string;
  email: string;
  name: string;
}

export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  const { data } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("clerk_id", clerkId)
    .single();
  return data;
}

export async function createUser(
  clerkId: string,
  email: string,
  name: string
): Promise<User> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .insert({ clerk_id: clerkId, email, name })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateUser(
  clerkId: string,
  email: string,
  name: string
): Promise<void> {
  await supabaseAdmin
    .from("users")
    .update({ email, name })
    .eq("clerk_id", clerkId);
}

export async function deleteUser(clerkId: string): Promise<void> {
  await supabaseAdmin.from("users").delete().eq("clerk_id", clerkId);
}

// Qué slugs en purchases otorgan acceso a cada producto
const ACCESS_GRANTS: Record<string, string[]> = {
  "taller-documentacion": [
    "taller-documentacion",
    "pack-cad-management",
    "pack-completo",
    "cad-management", // backward compat
    "pack",           // backward compat
    "taller",         // backward compat (old webhook slug)
  ],
  "workshop-cotizacion": [
    "workshop-cotizacion",
    "pack-cad-management",
    "pack-completo",
    "workshop",       // backward compat (old webhook slug)
  ],
  "bootcamp": [
    "bootcamp",
    "pack-completo",
    "pack", // backward compat
  ],
  "pack-cad-management": ["pack-cad-management", "pack-completo"],
  "pack-completo": ["pack-completo"],
  // Legacy slug — acceso equivalente al taller original
  "cad-management": [
    "cad-management",
    "pack",
    "taller-documentacion",
    "pack-cad-management",
    "pack-completo",
    "taller",         // backward compat
  ],
};

export async function hasAccess(
  clerkId: string,
  productSlug: string
): Promise<boolean> {
  const user = await getUserByClerkId(clerkId);
  if (!user) return false;

  const slugsToCheck = ACCESS_GRANTS[productSlug] ?? [productSlug];

  const { data } = await supabaseAdmin
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .in("product_slug", slugsToCheck)
    .eq("status", "active")
    .limit(1)
    .maybeSingle();

  return !!data;
}

export async function getProgress(
  clerkId: string,
  productSlug: string
): Promise<string[]> {
  const user = await getUserByClerkId(clerkId);
  if (!user) return [];

  const { data } = await supabaseAdmin
    .from("progress")
    .select("module_slug")
    .eq("user_id", user.id)
    .eq("product_slug", productSlug);

  return data?.map((r) => r.module_slug) ?? [];
}

export interface Purchase {
  product_slug: string;
  status: string;
  created_at: string;
}

export async function getPurchases(clerkId: string): Promise<Purchase[]> {
  const user = await getUserByClerkId(clerkId);
  if (!user) return [];

  const { data } = await supabaseAdmin
    .from("purchases")
    .select("product_slug, status, created_at")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("created_at", { ascending: true });

  return data ?? [];
}

export async function markCompleted(
  clerkId: string,
  productSlug: string,
  moduleSlug: string
): Promise<void> {
  const user = await getUserByClerkId(clerkId);
  if (!user) return;

  await supabaseAdmin
    .from("progress")
    .upsert({ user_id: user.id, product_slug: productSlug, module_slug: moduleSlug });
}
