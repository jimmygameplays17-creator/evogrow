"use client";

export function ShareButton() {
  return (
    <button
      className="mt-4 w-full rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-accent hover:text-accent"
      onClick={() => {
        if (typeof window !== "undefined") {
          navigator.clipboard.writeText(window.location.href);
        }
      }}
    >
      Copiar link
    </button>
  );
}
