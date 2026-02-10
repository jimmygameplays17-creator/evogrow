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
                ? "border-money/60 bg-money/10"
                : isTop
                  ? "border-crypto/60 bg-crypto/10"
                  : "border-white/10 bg-card"
            )}
          >
            <div className="flex items-center gap-3">
              <span className={classNames("text-xs font-semibold", isTop ? "text-crypto" : "text-slate-400")}>
                #{index + 1}
              </span>
              <div>
                <p className="font-semibold text-slate-100">{entry.donorName}</p>
                <p className="text-xs text-slate-400">
                  <span className="text-money">
                    <Money amount={entry.total} />
                  </span>{" "}
                  donado
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isHighlighted && (
                <span className="rounded-full bg-money/20 px-2 py-1 text-[10px] font-semibold text-money">
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
        <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-slate-400">
          Aún no hay builders registrados.
        </div>
      )}
    </div>
  );
}
