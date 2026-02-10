"use client";

import { AuthModal } from "@/components/AuthModal";

export default function LoginPage() {
  return (
    <main className="min-h-[60vh] px-6 py-10">
      <AuthModal forceOpen />
    </main>
  );
}
