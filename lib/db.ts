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

export async function hasAccess(
  clerkId: string,
  productSlug: string
): Promise<boolean> {
  const user = await getUserByClerkId(clerkId);
  if (!user) return false;

  if (productSlug === "pack") {
    const { data: packPurchase } = await supabaseAdmin
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_slug", "pack")
      .eq("status", "active")
      .maybeSingle();
    if (packPurchase) return true;

    const [{ data: cadPurchase }, { data: bootcampPurchase }] =
      await Promise.all([
        supabaseAdmin
          .from("purchases")
          .select("id")
          .eq("user_id", user.id)
          .eq("product_slug", "cad-management")
          .eq("status", "active")
          .maybeSingle(),
        supabaseAdmin
          .from("purchases")
          .select("id")
          .eq("user_id", user.id)
          .eq("product_slug", "bootcamp")
          .eq("status", "active")
          .maybeSingle(),
      ]);
    return !!(cadPurchase && bootcampPurchase);
  }

  const { data } = await supabaseAdmin
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_slug", productSlug)
    .eq("status", "active")
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
