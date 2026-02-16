"use client";

import { useState } from "react";

export function ShareWinButton({ roundId }: { roundId: string }) {
  const [copied, setCopied] = useState(false);

  async function onShare() {
    const text = `¡Gané la ronda ${roundId} en FlashRounds!`;
    if (navigator.share) {
      await navigator.share({ text });
      return;
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }

  return (
    <button type="button" onClick={onShare} className="rounded bg-emerald-600 px-4 py-2 text-white">
      {copied ? "Copiado" : "Compartir"}
    </button>
  );
}
