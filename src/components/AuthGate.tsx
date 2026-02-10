"use client";

import { ReactNode } from "react";
import { AuthModal } from "@/components/AuthModal";

export function AuthGate({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <AuthModal />
    </>
  );
}
