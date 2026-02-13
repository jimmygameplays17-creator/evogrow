"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Donation } from "@/lib/types";
import { Money } from "@/components/Money";

interface RecentDonationsPanelProps {
  projectId: string;
  initialDonations: Donation[];
}

interface LocalDonationRow {
  id: string;
  donorName: string;
  amount: number;
  createdAt: string;
}

const STORAGE_PREFIX = "fundra:project-donations:";
const MAX_RENDERED_ROWS = 15;
const MAX_STORED_ROWS = 60;

const fallbackNames = [
  "Juan",
  "María",
  "Anónimo",
  "Fer",
  "Lupita",
  "Luis",
  "Cami",
  "Gabo",
  "Sofi",
  "Pablo",
  "Ana"
];

const fallbackAmounts = [25, 45, 60, 80, 120, 150, 250, 300, 450].map((amount) => amount * 100);

const toLocalRow = (donation: Donation): LocalDonationRow => ({
  id: donation.id,
  donorName: donation.donorName || "Anónimo",
  amount: donation.amount,
  createdAt: donation.createdAt
});

const getStorageKey = (projectId: string) => `${STORAGE_PREFIX}${projectId}`;

const seededRows = (rows: LocalDonationRow[]) => {
  const now = Date.now();
  const count = 8 + Math.floor(Math.random() * 5);
  const generated = Array.from({ length: count }, (_, index) => ({
    id: `seed-${now}-${index}`,
    donorName: fallbackNames[Math.floor(Math.random() * fallbackNames.length)],
    amount: fallbackAmounts[Math.floor(Math.random() * fallbackAmounts.length)],
    createdAt: new Date(now - (index + 1) * (Math.floor(Math.random() * 42) + 2) * 60_000).toISOString()
  }));

  return [...rows, ...generated]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, MAX_STORED_ROWS);
};

const formatRelative = (createdAt: string) => {
  const deltaMs = Date.now() - new Date(createdAt).getTime();
  const minutes = Math.max(1, Math.floor(deltaMs / 60_000));
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  if (hours < 48) return "ayer";
  const days = Math.floor(hours / 24);
  return `${days}d`;
};

export function RecentDonationsPanel({ projectId, initialDonations }: RecentDonationsPanelProps) {
  const [rows, setRows] = useState<LocalDonationRow[]>([]);
  const [donorName, setDonorName] = useState("Anónimo");
  const [amount, setAmount] = useState("120");

  useEffect(() => {
    const storageKey = getStorageKey(projectId);
    const persisted = window.localStorage.getItem(storageKey);

    if (persisted) {
      const parsed = JSON.parse(persisted) as LocalDonationRow[];
      setRows(parsed);
      return;
    }

    const baseRows = initialDonations
      .filter((donation) => donation.status === "Confirmed")
      .map(toLocalRow)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const initialRows = baseRows.length > 0 ? baseRows : seededRows([]);
    window.localStorage.setItem(storageKey, JSON.stringify(initialRows));
    setRows(initialRows);
  }, [initialDonations, projectId]);

  const visibleRows = useMemo(() => rows.slice(0, MAX_RENDERED_ROWS), [rows]);

  const handleDonate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedAmount = Number(amount);
    if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) return;

    const newRow: LocalDonationRow = {
      id: `local-${projectId}-${Date.now()}`,
      donorName: donorName.trim() || "Anónimo",
      amount: Math.round(normalizedAmount * 100),
      createdAt: new Date().toISOString()
    };

    const updated = [newRow, ...rows].slice(0, MAX_STORED_ROWS);
    setRows(updated);
    window.localStorage.setItem(getStorageKey(projectId), JSON.stringify(updated));
    setAmount("120");
  };

  return (
    <aside className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-card backdrop-blur-md">
      <h3 className="text-sm font-semibold text-white">Últimos aportes</h3>

      <form onSubmit={handleDonate} className="mt-3 grid grid-cols-[1fr_auto] gap-2">
        <input
          value={donorName}
          onChange={(event) => setDonorName(event.target.value)}
          placeholder="Donador"
          className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-xs text-slate-200 outline-none placeholder:text-slate-500 focus:border-money/50"
        />
        <div className="flex items-center gap-2">
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            inputMode="decimal"
            placeholder="120"
            className="w-20 rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-xs text-slate-200 outline-none placeholder:text-slate-500 focus:border-money/50"
          />
          <button
            type="submit"
            className="rounded-xl border border-money/30 bg-money/20 px-3 py-2 text-xs font-semibold text-money transition hover:bg-money/30"
          >
            Dona
          </button>
        </div>
      </form>

      <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-slate-950/40">
        <div className="grid grid-cols-[1.2fr_auto_auto] gap-3 border-b border-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          <span>Donador</span>
          <span className="text-right">Monto</span>
          <span className="text-right">Hace</span>
        </div>

        {visibleRows.length === 0 ? (
          <p className="px-3 py-4 text-xs text-slate-400">Aún no hay aportes. Sé el primero.</p>
        ) : (
          <ul className="max-h-[420px] overflow-auto">
            {visibleRows.map((row) => (
              <li
                key={row.id}
                className="grid grid-cols-[1.2fr_auto_auto] items-center gap-3 border-b border-white/5 px-3 py-2 text-xs text-slate-200 last:border-b-0"
              >
                <span className="truncate">{row.donorName}</span>
                <span className="text-right font-semibold text-money">
                  <Money amount={row.amount} />
                </span>
                <span className="text-right text-slate-400">{formatRelative(row.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
