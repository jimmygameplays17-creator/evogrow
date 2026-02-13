"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const navItems = [
  { href: "/", label: "Explorar" },
  { href: "/new", label: "New" },
  { href: "/how-it-works", label: "Cómo funciona" },
  { href: "/officials", label: "Oficial" },
  { href: "/community", label: "Comunidad" },
  { href: "/creators", label: "Creadores" },
  { href: "/completed", label: "Finalizados" },
  { href: "/builders", label: "Top Builders" }
];

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-nowrap items-center gap-x-4 overflow-hidden whitespace-nowrap text-sm text-slate-200">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={classNames("shrink-0 whitespace-nowrap transition hover:text-accent", isActive && "text-white font-semibold")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
