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
        className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink"
      >
        Reportar
      </button>
      {message && <p className="mt-2 text-xs text-emerald-600">{message}</p>}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-ink">Reportar proyecto</h3>
            <p className="mt-2 text-sm text-steel">Cuéntanos qué te preocupa (opcional).</p>
            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
              rows={3}
              placeholder="Motivo"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)} className="rounded-full px-4 py-2 text-sm text-steel">
                Cancelar
              </button>
              <button
                onClick={submitReport}
                className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
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
