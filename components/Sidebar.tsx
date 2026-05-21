"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, SignOutButton } from "@clerk/nextjs";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "CAD Management", href: "/cad-management" },
  { label: "Bootcamp CAD→BIM", href: "/bootcamp/semana-1" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const displayName =
    user?.firstName ||
    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "Estudiante";

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
        {user && (
          <p className="font-sans text-xs text-deep mb-3 truncate">
            {displayName}
          </p>
        )}
        <SignOutButton>
          <button className="font-mono text-[9px] tracking-wider uppercase text-stone hover:text-ink transition-colors cursor-pointer">
            Cerrar sesión
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
}
