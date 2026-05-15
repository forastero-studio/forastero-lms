"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "CAD Management", href: "/cad-management/modulo-1" },
  { label: "Bootcamp CAD→BIM", href: "/bootcamp/semana-1" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-line bg-paper min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-line">
        <p className="font-sans font-medium text-sm text-ink">Forastero</p>
        <p className="font-mono text-[9px] tracking-widest uppercase text-stone mt-0.5">
          LMS
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 text-sm font-light transition-colors ${
                isActive
                  ? "text-ink bg-muted"
                  : "text-stone hover:text-ink hover:bg-muted/50"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-5 border-t border-line">
        <p className="font-mono text-[9px] tracking-wider uppercase text-stone">
          forastero.studio
        </p>
      </div>
    </aside>
  );
}
