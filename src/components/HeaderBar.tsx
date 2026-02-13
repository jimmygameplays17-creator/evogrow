"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeaderNav } from "@/components/HeaderNav";
import { AuthModal } from "@/components/AuthModal";
import { getUser, logout } from "@/lib/auth";

export function HeaderBar() {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
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
    <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="shrink-0">
          <Link href="/" className="text-xl font-semibold tracking-tight text-white">
            Fundra
          </Link>
        </div>

        <div className="order-3 w-full md:order-2 md:w-auto md:flex-1">
          <div className="overflow-hidden">
            <HeaderNav />
          </div>
        </div>

        <div className="order-2 flex shrink-0 items-center gap-2 md:order-3">
          <Link
            href="/create"
            className="inline-flex h-10 items-center justify-center rounded-full bg-money px-4 text-sm font-semibold text-slate-900 transition hover:bg-accent active:scale-95"
          >
            Create
          </Link>
          {isAuthed ? (
            <button
              onClick={handleLogout}
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-slate-900 px-4 text-sm font-semibold text-slate-100 transition hover:border-accent hover:text-accent"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-slate-900 px-4 text-sm font-semibold text-slate-100 transition hover:border-accent hover:text-accent"
            >
              Log in
            </button>
          )}
        </div>
      </div>
      <AuthModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
