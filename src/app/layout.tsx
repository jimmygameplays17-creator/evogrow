import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import { AuthGate } from "@/components/AuthGate";
import { HeaderBar } from "@/components/HeaderBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Civitas | Crowdfunding local",
  description: "Financia piezas reales para obras comunitarias con transparencia de costos."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={classNames(inter.className, "min-h-screen")}> 
        <HeaderBar />
        <CurrencyProvider>
          <AuthGate>{children}</AuthGate>
        </CurrencyProvider>
      </body>
    </html>
  );
}
