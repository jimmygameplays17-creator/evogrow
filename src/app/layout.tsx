import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { getSessionUser } from "@/lib/server-auth";

export const metadata: Metadata = {
  title: "FlashRounds MVP",
  description: "Rondas rápidas con créditos virtuales"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-semibold">
              FlashRounds
            </Link>
            <div className="flex items-center gap-3 text-sm">
              {user ? (
                <>
                  <span>{user.email}</span>
                  <span className="rounded bg-slate-800 px-2 py-1">{user.balance?.credits ?? 0} créditos</span>
                  <form action="/api/auth/logout" method="post">
                    <button className="rounded border border-slate-600 px-2 py-1">Salir</button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login">Login</Link>
                  <Link href="/register">Registro</Link>
                </>
              )}
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
