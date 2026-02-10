"use client";

import { useState } from "react";

export function ReportButton({ projectId }: { projectId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const submitReport = async () => {
    await fetch(`/api/projects/${projectId}/reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason })
    });
    setMessage("Gracias, revisaremos este proyecto");
    setIsOpen(false);
    setReason("");
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-accent hover:text-accent active:scale-95"
      >
        Reportar
      </button>
      {message && <p className="mt-2 text-xs text-money">{message}</p>}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-card p-6 shadow-card">
            <h3 className="text-lg font-semibold text-white">Reportar proyecto</h3>
            <p className="mt-2 text-sm text-slate-400">Cuéntanos qué te preocupa (opcional).</p>
            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500"
              rows={3}
              placeholder="Motivo"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full px-4 py-2 text-sm text-slate-400 transition hover:text-accent"
              >
                Cancelar
              </button>
              <button
                onClick={submitReport}
                className="rounded-full bg-money px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-accent hover:shadow-[0_0_12px_rgba(0,255,163,0.35)] active:scale-95"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
