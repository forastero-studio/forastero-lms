import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { hasAccess, getPurchases } from "@/lib/db";

export const metadata: Metadata = {
  title: "forastero.lms",
};
import { getTallerModules, getWorkshopModules, getBootcampWeeks } from "@/lib/content";
import Sidebar from "@/components/Sidebar";
import AgentDrawer from "@/components/AgentDrawer";
import WelcomeToast from "@/components/WelcomeToast";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  let sidebarProps = {
    purchaseSlugs: [] as string[],
    hasTaller: false,
    hasWorkshop: false,
    hasBootcamp: false,
    tallerModules: [] as { slug: string; title: string }[],
    workshopModules: [] as { slug: string; title: string }[],
    bootcampWeeks: [] as { slug: string; title: string; semana?: number }[],
  };

  if (userId) {
    const [purchases, hasTaller, hasWorkshop, hasBootcamp] = await Promise.all([
      getPurchases(userId),
      hasAccess(userId, "cad-management"),
      hasAccess(userId, "workshop-cotizacion"),
      hasAccess(userId, "bootcamp"),
    ]);

    sidebarProps = {
      purchaseSlugs: purchases.map((p) => p.product_slug),
      hasTaller,
      hasWorkshop,
      hasBootcamp,
      tallerModules: hasTaller
        ? getTallerModules().map((m) => ({ slug: m.slug, title: m.title }))
        : [],
      workshopModules: hasWorkshop
        ? getWorkshopModules().map((m) => ({ slug: m.slug, title: m.title }))
        : [],
      bootcampWeeks: hasBootcamp
        ? getBootcampWeeks()
            .filter((w) => (w.semana ?? 0) >= 1)
            .map((w) => ({ slug: w.slug, title: w.title, semana: w.semana }))
        : [],
    };
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar {...sidebarProps} />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <AgentDrawer />
      <WelcomeToast />
    </div>
  );
}
