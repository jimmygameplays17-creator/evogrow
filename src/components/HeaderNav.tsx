"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { getUser, logout, AuthUser } from "@/lib/auth";

const navItems = [
  { href: "/", label: "Explorar" },
  { href: "/new", label: "New" },
  { href: "/how-it-works", label: "Cómo funciona" },
  { href: "/officials", label: "Oficial" },
  { href: "/community", label: "Comunidad" },
  { href: "/creators", label: "Creadores" },
  { href: "/create", label: "Proponer" },
  { href: "/admin", label: "Admin" },
  { href: "/completed", label: "Finalizados" },
  { href: "/builders", label: "Top Builders" }
];

export function HeaderNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.refresh();
  };

  return (
    <nav className="flex min-w-max items-center gap-5 whitespace-nowrap text-sm text-slate-200">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={classNames("transition hover:text-accent", isActive && "text-white font-semibold")}
          >
            {item.label}
          </Link>
        );
      })}
      {user && (
        <>
          <Link
            href="/profile"
            className={classNames("transition hover:text-accent", pathname === "/profile" && "text-white font-semibold")}
          >
            Perfil
          </Link>
          <button onClick={handleLogout} className="transition hover:text-accent">
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
