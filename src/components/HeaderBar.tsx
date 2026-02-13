"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeaderNav } from "@/components/HeaderNav";
import { AuthModal } from "@/components/AuthModal";
import { SearchModal } from "@/components/SearchModal";
import { getUser, logout } from "@/lib/auth";

export function HeaderBar() {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const syncAuth = () => setIsAuthed(Boolean(getUser()));
    syncAuth();
    window.addEventListener("focus", syncAuth);
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("focus", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthed(false);
    router.refresh();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-4 overflow-hidden px-4 sm:px-6">
          <div className="shrink-0">
            <Link href="/" className="text-xl font-semibold tracking-tight text-white">
              Fundra
            </Link>
          </div>

          <div className="min-w-0 flex-1 overflow-hidden">
            <HeaderNav />
          </div>

          <div className="ml-2 flex shrink-0 items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex h-10 w-full min-w-[180px] max-w-[520px] shrink-0 items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 text-sm text-slate-400 transition hover:border-accent hover:text-slate-200"
              aria-label="Open search"
            >
              <span aria-hidden>🔍</span>
              <span className="truncate">Search projects…</span>
            </button>

            <Link
              href="/create"
              className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full bg-money px-4 text-sm font-semibold text-slate-900 transition hover:bg-accent active:scale-95"
            >
              Create
            </Link>
            {isAuthed ? (
              <button
                onClick={handleLogout}
                className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-slate-900 px-4 text-sm font-semibold text-slate-100 transition hover:border-accent hover:text-accent"
              >
                Log out
              </button>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-slate-900 px-4 text-sm font-semibold text-slate-100 transition hover:border-accent hover:text-accent"
              >
                Log in
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
