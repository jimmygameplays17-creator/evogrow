"use client";

import classNames from "classnames";
import { Money } from "@/components/Money";

interface LeaderboardEntry {
  donorId: string;
  donorName: string;
  total: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  highlightTop?: boolean;
  highlightId?: string;
  showTopBadges?: boolean;
}

export function Leaderboard({
  entries,
  highlightTop = true,
  highlightId,
  showTopBadges = false
}: LeaderboardProps) {
  return (
    <div className="space-y-3">
      {entries.map((entry, index) => {
        const isTop = highlightTop && index === 0;
        const isHighlighted = highlightId === entry.donorId;
        const showBadge = showTopBadges && index < 3;
        const topIcon = index === 0 ? "👑" : index === 1 ? "🥈" : "🥉";
        return (
          <div
            key={entry.donorId}
            className={classNames(
              "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm",
              isHighlighted
                ? "border-emerald-200 bg-emerald-50"
                : isTop
                  ? "border-amber-200 bg-amber-50"
                  : "border-slate-200 bg-white"
            )}
          >
            <div className="flex items-center gap-3">
              <span className={classNames("text-xs font-semibold", isTop ? "text-amber-700" : "text-steel")}>
                #{index + 1}
              </span>
              <div>
                <p className="font-semibold text-ink">{entry.donorName}</p>
                <p className="text-xs text-steel">
                  <Money amount={entry.total} /> donado
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isHighlighted && (
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                  Tú
                </span>
              )}
              {showBadge && <span className="text-lg">{topIcon}</span>}
              {isTop && !showBadge && <span className="text-lg">👑</span>}
            </div>
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
