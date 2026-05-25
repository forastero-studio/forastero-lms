import Sidebar from "@/components/Sidebar";
import AgentDrawer from "@/components/AgentDrawer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <AgentDrawer />
    </div>
  );
}
