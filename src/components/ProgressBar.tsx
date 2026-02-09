import classNames from "classnames";

export function ProgressBar({ value, tone = "ocean" }: { value: number; tone?: "ocean" | "pine" | "ember" }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-200">
      <div
        className={classNames("h-2 rounded-full transition-all", {
          "bg-ocean": tone === "ocean",
          "bg-pine": tone === "pine",
          "bg-ember": tone === "ember"
        })}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
