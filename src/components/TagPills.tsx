"use client";

import classNames from "classnames";

const tagConfig: Record<string, { icon: string; className: string }> = {
  Oficial: { icon: "🏛", className: "border-money/40 bg-money/10 text-money" },
  Creador: { icon: "⭐", className: "border-crypto/40 bg-crypto/10 text-crypto" },
  Verified: { icon: "✓", className: "border-white/20 bg-white/5 text-slate-200" },
  Tendencia: { icon: "🔥", className: "border-ember/40 bg-ember/10 text-ember" },
  Nuevo: { icon: "🆕", className: "border-accent/40 bg-accent/10 text-accent" },
  "Últimos días": { icon: "⏳", className: "border-ember/40 bg-ember/10 text-ember" }
};

interface TagPillsProps {
  tags: string[];
  maxVisible?: number;
}

export function TagPills({ tags, maxVisible = 3 }: TagPillsProps) {
  if (!tags?.length) return null;
  const visible = tags.slice(0, maxVisible);
  const remaining = tags.length - visible.length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {visible.map((tag) => {
        const config = tagConfig[tag] ?? {
          icon: "•",
          className: "border-white/20 bg-white/5 text-slate-300"
        };
        return (
          <span
            key={tag}
            className={classNames(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
              config.className
            )}
          >
            <span className="text-xs">{config.icon}</span>
            {tag}
          </span>
        );
      })}
      {remaining > 0 && (
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-slate-300">
          +{remaining}
        </span>
      )}
    </div>
  );
}
