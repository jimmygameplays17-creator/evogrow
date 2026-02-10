"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeaderNav } from "@/components/HeaderNav";
import { NotificationBell } from "@/components/NotificationBell";
import { SearchModal } from "@/components/SearchModal";

export function HeaderBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isCmdK) {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-slate-950/80 backdrop-blur border-b border-white/10 sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-semibold tracking-tight text-white">
            Fundra
          </Link>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="ml-3 inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-4 text-sm font-medium text-slate-200 transition hover:border-accent hover:shadow-[0_0_14px_rgba(0,240,255,0.2)] hover:text-accent active:scale-95"
          >
            <span>🔍</span>
            Search
          </button>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
          <div className="min-w-0 overflow-x-auto">
            <HeaderNav />
          </div>
          <NotificationBell />
        </div>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
