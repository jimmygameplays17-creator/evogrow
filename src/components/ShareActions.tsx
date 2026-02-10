"use client";

import { useState } from "react";

interface ShareActionsProps {
  title: string;
  sharePath?: string;
}

export function ShareActions({ title, sharePath }: ShareActionsProps) {
  const [message, setMessage] = useState("");

  const buildUrl = () => {
    if (typeof window === "undefined") return "";
    if (sharePath) return `${window.location.origin}${sharePath}`;
    return window.location.href;
  };

  const copyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(buildUrl());
      setMessage("Link copiado");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const whatsappLink =
    typeof window !== "undefined"
      ? `https://wa.me/?text=${encodeURIComponent(`${title} ${buildUrl()}`)}`
      : "https://wa.me/";

  const telegramLink =
    typeof window !== "undefined"
      ? `https://t.me/share/url?url=${encodeURIComponent(buildUrl())}&text=${encodeURIComponent(title)}`
      : "https://t.me/";

  return (
    <div className="space-y-3">
      {sharePath && (
        <div className="rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-xs text-slate-300">
          {`fundra.com${sharePath}`}
        </div>
      )}
      <button
        onClick={copyLink}
        className="w-full rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-accent hover:text-accent active:scale-95"
      >
        Copiar link
      </button>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full bg-money px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-accent hover:shadow-[0_0_12px_rgba(0,255,163,0.35)] active:scale-95"
      >
        WhatsApp
      </a>
      <a
        href={telegramLink}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-accent hover:text-accent"
      >
        Telegram
      </a>
      {message && <p className="text-xs text-money">{message}</p>}
    </div>
  );
}
