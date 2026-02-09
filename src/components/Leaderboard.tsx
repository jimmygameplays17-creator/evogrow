"use client";

import classNames from "classnames";
import { formatCurrency } from "@/lib/utils";

interface LeaderboardEntry {
  donorId: string;
  donorName: string;
  total: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  highlightTop?: boolean;
}

export function Leaderboard({ entries, highlightTop = true }: LeaderboardProps) {
  return (
    <div className="space-y-3">
      {entries.map((entry, index) => {
        const isTop = highlightTop && index === 0;
        return (
          <div
            key={entry.donorId}
            className={classNames(
              "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm",
              isTop ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"
            )}
          >
            <div className="flex items-center gap-3">
              <span className={classNames("text-xs font-semibold", isTop ? "text-amber-700" : "text-steel")}>
                #{index + 1}
              </span>
              <div>
                <p className="font-semibold text-ink">{entry.donorName}</p>
                <p className="text-xs text-steel">{formatCurrency(entry.total)} donado</p>
              </div>
            </div>
            {isTop && <span className="text-lg">👑</span>}
          </div>
        );
      })}
      {entries.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-steel">
          Aún no hay builders registrados.
        </div>
      )}
    </div>
  );
}
