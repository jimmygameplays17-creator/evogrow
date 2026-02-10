"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "fundra_notifications_read";

const notifications = [
  { id: "n1", message: "Juan donó $50 a Reparo mi bici", time: "hace 5 min" },
  { id: "n2", message: "Tu proyecto llegó al 30%", time: "hace 12 min" },
  { id: "n3", message: "Nuevo comentario en Inscripción de escuela", time: "hace 40 min" },
  { id: "n4", message: "Proyecto marcado como Tendencia", time: "hace 2 h" },
  { id: "n5", message: "Luna Torres compartió tu campaña", time: "hace 3 h" },
  { id: "n6", message: "Pago confirmado por Solana", time: "hace 4 h" },
  { id: "n7", message: "Nuevo builder se unió al proyecto", time: "hace 6 h" },
  { id: "n8", message: "Tu proyecto fue aprobado", time: "hace 1 día" }
];

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setIsRead(stored === "true");
  }, []);

  const markAllRead = () => {
    setIsRead(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  const unreadCount = isRead ? 0 : 3;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-accent hover:text-accent active:scale-95"
        aria-label="Notificaciones"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-ember px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-white/10 bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Notificaciones</p>
            <button
              onClick={markAllRead}
              className="text-xs font-semibold text-money transition hover:text-accent"
            >
              Marcar todas como leídas
            </button>
          </div>
          <div className="mt-3 space-y-3">
            {notifications.map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-xs text-slate-200">{item.message}</p>
                <p className="mt-1 text-[10px] text-slate-500">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
