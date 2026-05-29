"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Wordmark from "@/components/ui/Wordmark";

type Module = { slug: string; title: string };
type Week = { slug: string; title: string; semana?: number };

type SidebarProps = {
  purchaseSlugs?: string[];
  hasTaller?: boolean;
  hasWorkshop?: boolean;
  hasBootcamp?: boolean;
  tallerModules?: Module[];
  workshopModules?: Module[];
  bootcampWeeks?: Week[];
};

const STORAGE_KEY = "forastero-sidebar-expanded";

function loadExpanded(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveExpanded(state: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export default function Sidebar({
  purchaseSlugs = [],
  hasTaller = false,
  hasWorkshop = false,
  hasBootcamp = false,
  tallerModules = [],
  workshopModules = [],
  bootcampWeeks = [],
}: SidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Load from localStorage on mount + auto-expand active section
  useEffect(() => {
    const saved = loadExpanded();

    const autoExpand: Record<string, boolean> = { ...saved };
    if (pathname.startsWith("/cad-management")) {
      const isWorkshop =
        pathname.includes("workshop-cotizacion") ||
        pathname.includes("workshop-computo");
      if (isWorkshop) {
        autoExpand["workshop"] = true;
      } else {
        autoExpand["taller"] = true;
      }
      autoExpand["pack-cad"] = true;
      autoExpand["pack-completo"] = true;
    }
    if (
      pathname.startsWith("/bootcamp") ||
      pathname.startsWith("/dashboard/guia-taller") ||
      pathname.startsWith("/dashboard/guia-workshop")
    ) {
      autoExpand["bootcamp"] = true;
      autoExpand["pack-completo"] = true;
    }

    setExpanded(autoExpand);
  }, [pathname]);

  const toggle = (key: string) => {
    setExpanded((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveExpanded(next);
      return next;
    });
  };

  const displayName =
    user?.firstName ||
    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "Estudiante";

  // Purchase-based pack detection
  const hasPackCompleto = purchaseSlugs.some((s) => s === "pack-completo");
  const hasCadPack =
    !hasPackCompleto &&
    purchaseSlugs.some((s) => s === "pack-cad-management" || s === "cad-management");
  const showTallerIndiv = hasTaller && !hasCadPack && !hasPackCompleto;
  const showWorkshopIndiv = hasWorkshop && !hasCadPack && !hasPackCompleto;
  const showBootcampIndiv = hasBootcamp && !hasPackCompleto;

  // Active link helpers
  function isExact(href: string) {
    return pathname === href;
  }
  function isUnder(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  // Styled link components
  function NavLink({
    href,
    label,
    depth = 0,
    onClick,
  }: {
    href: string;
    label: string;
    depth?: number;
    onClick?: () => void;
  }) {
    const active =
      href === "/dashboard" || href === "/dashboard/guia"
        ? isExact(href)
        : isUnder(href);

    const pl = depth === 0 ? "pl-3" : depth === 1 ? "pl-7" : "pl-11";
    const activePl =
      depth === 0 ? "pl-[10px]" : depth === 1 ? "pl-[26px]" : "pl-[42px]";
    const size = depth === 0 ? "text-sm" : "text-xs";

    return (
      <Link
        href={href}
        onClick={onClick}
        className={`block text-left py-1.5 ${size} transition-colors ${
          active
            ? `${activePl} pr-3 border-l-2 border-rust font-medium text-ink`
            : `${pl} font-light text-stone hover:text-ink`
        }`}
      >
        {label}
      </Link>
    );
  }

  function ToggleNode({
    nodeKey,
    label,
    depth = 0,
    children,
  }: {
    nodeKey: string;
    label: string;
    depth?: number;
    children: React.ReactNode;
  }) {
    const isOpen = !!expanded[nodeKey];
    const pl = depth === 0 ? "pl-3" : depth === 1 ? "pl-7" : "pl-11";
    const size = depth === 0 ? "text-sm" : "text-xs";

    return (
      <div>
        <button
          onClick={() => toggle(nodeKey)}
          className={`w-full text-left flex items-center justify-between ${pl} pr-2 py-1.5 ${size} font-light text-stone hover:text-ink transition-colors`}
        >
          {label}
          <span className="font-mono text-[8px] shrink-0 ml-1">
            {isOpen ? "▾" : "▸"}
          </span>
        </button>
        {isOpen && <div>{children}</div>}
      </div>
    );
  }

  function TallerItems({ depth }: { depth: number }) {
    return (
      <>
        <NavLink
          href="/dashboard/guia-taller"
          label="Cómo recorrer el Taller"
          depth={depth}
        />
        {tallerModules.map((m) => (
          <NavLink
            key={m.slug}
            href={`/cad-management/${m.slug}`}
            label={m.title}
            depth={depth}
          />
        ))}
      </>
    );
  }

  function WorkshopItems({ depth }: { depth: number }) {
    return (
      <>
        <NavLink
          href="/dashboard/guia-workshop"
          label="Cómo recorrer el Workshop"
          depth={depth}
        />
        {workshopModules.map((m) => (
          <NavLink
            key={m.slug}
            href={`/cad-management/${m.slug}`}
            label={m.title}
            depth={depth}
          />
        ))}
      </>
    );
  }

  function BootcampItems({ depth }: { depth: number }) {
    return (
      <>
        <NavLink
          href="/bootcamp/guia"
          label="Cómo recorrer el Bootcamp"
          depth={depth}
        />
        {bootcampWeeks.map((w) => (
          <NavLink
            key={w.slug}
            href={`/bootcamp/${w.slug}`}
            label={w.title}
            depth={depth}
          />
        ))}
        <NavLink
          href="/bootcamp/dashboard"
          label="Certificado"
          depth={depth}
        />
      </>
    );
  }

  return (
    <aside className="w-60 shrink-0 border-r border-line bg-paper min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-line">
        <Wordmark />
      </div>

      <nav className="flex-1 px-4 py-5 flex flex-col gap-0.5 overflow-y-auto">
        {/* Always-visible top items */}
        <button
          onClick={() =>
            window.dispatchEvent(new CustomEvent("forastero:show-tour"))
          }
          className="block w-full text-left pl-3 py-1.5 text-sm font-light text-stone hover:text-ink transition-colors"
        >
          Cómo usar la plataforma
        </button>
        <NavLink href="/dashboard" label="Dashboard" depth={0} />

        <div className="h-px bg-line my-2" />

        {/* Pack Completo */}
        {hasPackCompleto && (
          <ToggleNode nodeKey="pack-completo" label="Pack Completo" depth={0}>
            <ToggleNode nodeKey="taller" label="Taller de Documentación de Obras" depth={1}>
              <TallerItems depth={2} />
            </ToggleNode>
            <ToggleNode nodeKey="workshop" label="Workshop Cotización de Obras" depth={1}>
              <WorkshopItems depth={2} />
            </ToggleNode>
            <ToggleNode nodeKey="bootcamp" label="Bootcamp CAD → BIM" depth={1}>
              <BootcampItems depth={2} />
            </ToggleNode>
          </ToggleNode>
        )}

        {/* Pack CAD Management */}
        {hasCadPack && (
          <ToggleNode nodeKey="pack-cad" label="Pack CAD Management" depth={0}>
            <ToggleNode nodeKey="taller" label="Taller de Documentación de Obras" depth={1}>
              <TallerItems depth={2} />
            </ToggleNode>
            <ToggleNode nodeKey="workshop" label="Workshop Cotización de Obras" depth={1}>
              <WorkshopItems depth={2} />
            </ToggleNode>
          </ToggleNode>
        )}
        {hasCadPack && showBootcampIndiv && (
          <ToggleNode nodeKey="bootcamp" label="Bootcamp CAD → BIM" depth={0}>
            <BootcampItems depth={1} />
          </ToggleNode>
        )}

        {/* Individual items (no pack) */}
        {showTallerIndiv && (
          <ToggleNode nodeKey="taller" label="Taller de Documentación de Obras" depth={0}>
            <TallerItems depth={1} />
          </ToggleNode>
        )}
        {showWorkshopIndiv && (
          <ToggleNode nodeKey="workshop" label="Workshop Cotización de Obras" depth={0}>
            <WorkshopItems depth={1} />
          </ToggleNode>
        )}
        {showBootcampIndiv && !hasCadPack && (
          <ToggleNode nodeKey="bootcamp" label="Bootcamp CAD → BIM" depth={0}>
            <BootcampItems depth={1} />
          </ToggleNode>
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
