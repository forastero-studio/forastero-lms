import { headers } from "next/headers";
import { Webhook } from "svix";
import { createUser, updateUser, deleteUser } from "@/lib/db";

interface ClerkUserEvent {
  type: "user.created" | "user.updated" | "user.deleted";
  data: {
    id: string;
    email_addresses: { email_address: string }[];
    first_name: string | null;
    last_name: string | null;
  };
}

export async function POST(req: Request) {
  const headersList = await headers();
  const svixId = headersList.get("svix-id");
  const svixTimestamp = headersList.get("svix-timestamp");
  const svixSignature = headersList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const body = await req.text();
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let evt: ClerkUserEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkUserEvent;
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  const { id, email_addresses, first_name, last_name } = evt.data;
  const email = email_addresses[0]?.email_address ?? "";
  const name = [first_name, last_name].filter(Boolean).join(" ") || email;

  switch (evt.type) {
    case "user.created":
      await createUser(id, email, name);
      break;
    case "user.updated":
      await updateUser(id, email, name);
      break;
    case "user.deleted":
      await deleteUser(id);
      break;
  }

  return new Response("OK", { status: 200 });
}
