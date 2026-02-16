"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error ?? "Error de autenticación");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-20 max-w-md space-y-4 rounded bg-slate-900 p-6 text-white">
      <h1 className="text-2xl font-semibold">{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</h1>
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2"
      />
      <input
        type="password"
        required
        minLength={6}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2"
      />
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button className="w-full rounded bg-indigo-600 py-2 font-medium" disabled={loading}>
        {loading ? "Enviando..." : mode === "login" ? "Entrar" : "Registrarme"}
      </button>
    </form>
  );
}
