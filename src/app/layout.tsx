import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import classNames from "classnames";
import { HeaderNav } from "@/components/HeaderNav";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import { AuthGate } from "@/components/AuthGate";
import { NotificationBell } from "@/components/NotificationBell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Civitas | Crowdfunding local",
  description: "Financia piezas reales para obras comunitarias con transparencia de costos."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={classNames(inter.className, "min-h-screen")}> 
        <div className="bg-slate-950/80 backdrop-blur border-b border-white/10 sticky top-0 z-50">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-semibold text-white">
              Civitas
            </Link>
            <div className="flex items-center gap-4">
              <HeaderNav />
              <NotificationBell />
            </div>
          </div>
        </div>
        <CurrencyProvider>
          <AuthGate>{children}</AuthGate>
        </CurrencyProvider>
      </body>
    </html>
  );
}
