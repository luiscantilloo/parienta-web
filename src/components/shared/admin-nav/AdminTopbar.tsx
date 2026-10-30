"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AdminNav, isAdminNavCompact } from "@/components/shared/admin-nav/AdminNav";
import { UserMenu } from "@/components/shared/user-menu/UserMenu";

type Props = {
  active: string;
  onOpenAgent: () => void;
  screenCode?: string;
  agentOpen?: boolean;
};

export function AdminTopbar({ active, onOpenAgent, screenCode, agentOpen = false }: Props) {
  const headerRef = useRef<HTMLElement>(null);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      setBarWidth(w);
    });
    ro.observe(el);
    setBarWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const forceCompact = agentOpen && barWidth > 0 && barWidth < 1280;
  const compact = isAdminNavCompact(barWidth, forceCompact);

  return (
    <header
      ref={headerRef}
      className="nara-topbar gap-2 px-3 sm:gap-3 sm:px-5 md:px-6"
    >
      <div className="flex h-full min-w-0 items-stretch gap-2 sm:gap-3 md:gap-4">
        {!compact ? (
          <Link href="/inicio" className="flex shrink-0 items-center">
            <img
              src="/parienta/logo/parienta-horizontal-principal.svg"
              alt="Parienta"
              className="block h-7 w-auto sm:h-[34px]"
            />
          </Link>
        ) : null}
        <AdminNav active={active} barWidth={barWidth} forceCompact={forceCompact} />
      </div>
      <div className="flex shrink-0 items-center gap-2.5 sm:gap-3.5">
        {screenCode ? (
          <span className="hidden rounded-md border border-[#C0DFC8] bg-[#FDF2B3]/50 px-1.5 py-0.5 font-mono text-[11px] text-[#5A5A52] xl:inline">
            {screenCode}
          </span>
        ) : null}
        <button
          type="button"
          onClick={onOpenAgent}
          aria-label="Abrir Aurelia"
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-[#C0DFC8] bg-[#FBFAF3] px-2.5 font-texto text-sm font-medium text-[#27683A] transition hover:bg-[#C0DFC8]/70 sm:h-11 sm:px-3.5 sm:text-[15px]"
        >
          <img
            src="/parienta/aurelia/aurelia-base.svg"
            alt=""
            className="block h-7 w-7 sm:-ml-1.5 sm:h-8 sm:w-8"
          />
          <span className="hidden flex-col items-start leading-none sm:flex">
            <span>Aurelia</span>
            <span className="mt-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[#5A5A52]">
              asistente
            </span>
          </span>
        </button>
        <UserMenu notifKey="admin" />
      </div>
    </header>
  );
}
