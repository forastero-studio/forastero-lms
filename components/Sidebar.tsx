"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState } from "react";

type SidebarProps = {
  hasTaller?: boolean;
  hasWorkshop?: boolean;
  hasBootcamp?: boolean;
};

export default function Sidebar({
  hasTaller = false,
  hasWorkshop = false,
  hasBootcamp = false,
}: SidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();

  const hasCadPack = hasTaller && hasWorkshop && !hasBootcamp;
  const hasPackCompleto = hasTaller && hasWorkshop && hasBootcamp;
  const hasTallerOnly = hasTaller && !hasWorkshop;
  const hasWorkshopOnly = hasWorkshop && !hasTaller;
  const showBootcampItem = hasBootcamp && !hasPackCompleto;

  const cadPackActive =
    hasCadPack && pathname.startsWith("/cad-management");
  const packCompletoActive =
    hasPackCompleto &&
    (pathname.startsWith("/cad-management") || pathname.startsWith("/bootcamp"));

  const [cadPackOpen, setCadPackOpen] = useState(cadPackActive);
  const [packCompletoOpen, setPackCompletoOpen] = useState(packCompletoActive);

  const displayName =
    user?.firstName ||
    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "Estudiante";

  function isActive(href: string): boolean {
    if (href === "/dashboard") return pathname === "/dashboard";
    if (href === "/bootcamp/guia") return pathname === "/bootcamp/guia";
    return pathname === href || pathname.startsWith(href + "/");
  }

  function NavLink({ href, label }: { href: string; label: string }) {
    const active = isActive(href);
    return (
      <Link
        href={href}
        className={`block py-2 text-sm transition-colors ${
          active
            ? "border-l-2 border-rust pl-[10px] pr-3 font-medium text-ink"
            : "px-3 font-light text-stone hover:text-ink"
        }`}
      >
        {label}
      </Link>
    );
  }

  function SubNavLink({ href, label }: { href: string; label: string }) {
    const active = isActive(href);
    return (
      <Link
        href={href}
        className={`block py-1.5 text-xs transition-colors ${
          active
            ? "border-l-2 border-rust pl-[26px] pr-3 font-medium text-ink"
            : "pl-7 pr-3 font-light text-stone hover:text-ink"
        }`}
      >
        {label}
      </Link>
    );
  }

  function PackItem({
    label,
    isOpen,
    onToggle,
    children,
  }: {
    label: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }) {
    return (
      <div>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-light text-stone hover:text-ink transition-colors"
        >
          {label}
          <span className="font-mono text-[9px] ml-2 shrink-0">
            {isOpen ? "▾" : "▸"}
          </span>
        </button>
        {isOpen && <div className="mb-1">{children}</div>}
      </div>
    );
  }

  return (
    <aside className="w-56 shrink-0 border-r border-line bg-paper min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-line">
        <p className="font-display font-light text-base text-ink tracking-[0.05em]">
          forastero
        </p>
        <p className="font-mono text-[9px] tracking-widest uppercase text-stone mt-0.5">
          lms
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-0.5">
        <NavLink href="/bootcamp/guia" label="Cómo empezar" />
        <NavLink href="/dashboard" label="Dashboard" />

        {hasTallerOnly && (
          <NavLink href="/cad-management" label="Taller de Documentación" />
        )}
        {hasWorkshopOnly && (
          <NavLink
            href="/cad-management/workshop-cotizacion"
            label="Workshop Cotización"
          />
        )}
        {hasCadPack && (
          <PackItem
            label="Pack CAD Management"
            isOpen={cadPackOpen}
            onToggle={() => setCadPackOpen((o) => !o)}
          >
            <SubNavLink href="/cad-management" label="Taller de Documentación" />
            <SubNavLink
              href="/cad-management/workshop-cotizacion"
              label="Workshop Cotización"
            />
          </PackItem>
        )}
        {hasPackCompleto && (
          <PackItem
            label="Pack Completo"
            isOpen={packCompletoOpen}
            onToggle={() => setPackCompletoOpen((o) => !o)}
          >
            <SubNavLink href="/cad-management" label="Taller de Documentación" />
            <SubNavLink
              href="/cad-management/workshop-cotizacion"
              label="Workshop Cotización"
            />
            <SubNavLink href="/bootcamp/dashboard" label="Bootcamp CAD→BIM" />
          </PackItem>
        )}
        {showBootcampItem && (
          <NavLink href="/bootcamp/dashboard" label="Bootcamp CAD→BIM" />
        )}
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
