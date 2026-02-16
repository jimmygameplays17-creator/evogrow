"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function EnterButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onEnter() {
    setLoading(true);
    setMessage(null);
    const res = await fetch("/api/rounds/enter", { method: "POST" });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "No se pudo entrar");
      setLoading(false);
      return;
    }

    setMessage("Entrada registrada");
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={onEnter}
        disabled={loading}
        className="rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 disabled:opacity-70"
      >
        {loading ? "Entrando..." : "Entrar por 1 crédito"}
      </button>
      {message ? <p className="text-sm text-slate-300">{message}</p> : null}
    </div>
  );
}
