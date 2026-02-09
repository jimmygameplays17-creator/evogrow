"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const navItems = [
  { href: "/", label: "Explorar" },
  { href: "/officials", label: "Oficial" },
  { href: "/community", label: "Comunidad" },
  { href: "/creators", label: "Creadores" },
  { href: "/create", label: "Proponer" },
  { href: "/admin", label: "Admin" },
  { href: "/builders", label: "Top Builders" }
];

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4 text-sm text-steel">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={classNames("hover:text-ink", isActive && "text-ink font-semibold")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
