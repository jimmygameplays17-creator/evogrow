"use client";

export function ShareButton() {
  return (
    <button
      className="mt-4 w-full rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink"
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
