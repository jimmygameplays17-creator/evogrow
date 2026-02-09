import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Civitas | Crowdfunding local",
  description: "Financia piezas reales para obras comunitarias con transparencia de costos."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={classNames(inter.className, "min-h-screen")}> 
        <div className="bg-white/80 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-semibold text-ink">
              Civitas
            </Link>
            <nav className="flex items-center gap-4 text-sm text-steel">
              <Link href="/" className="hover:text-ink">
                Explorar
              </Link>
              <Link href="/create" className="hover:text-ink">
                Proponer
              </Link>
              <Link href="/admin" className="hover:text-ink">
                Admin
              </Link>
            </nav>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
