import { auth } from "@clerk/nextjs/server";
import { hasAccess } from "@/lib/db";
import Sidebar from "@/components/Sidebar";
import AgentDrawer from "@/components/AgentDrawer";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  let hasTaller = false;
  let hasWorkshop = false;
  let hasBootcamp = false;

  if (userId) {
    [hasTaller, hasWorkshop, hasBootcamp] = await Promise.all([
      hasAccess(userId, "cad-management"),
      hasAccess(userId, "workshop-cotizacion"),
      hasAccess(userId, "bootcamp"),
    ]);
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar hasTaller={hasTaller} hasWorkshop={hasWorkshop} hasBootcamp={hasBootcamp} />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <AgentDrawer />
    </div>
  );
}
