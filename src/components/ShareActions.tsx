"use client";

import { useState } from "react";

interface ShareActionsProps {
  title: string;
}

export function ShareActions({ title }: ShareActionsProps) {
  const [message, setMessage] = useState("");

  const copyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setMessage("Link copiado");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const whatsappLink =
    typeof window !== "undefined"
      ? `https://wa.me/?text=${encodeURIComponent(`${title} ${window.location.href}`)}`
      : "https://wa.me/";

  return (
    <div className="space-y-3">
      <button
        onClick={copyLink}
        className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink"
      >
        Compartir
      </button>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
      >
        WhatsApp
      </a>
      {message && <p className="text-xs text-emerald-600">{message}</p>}
    </div>
  );
}
