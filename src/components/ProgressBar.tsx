import classNames from "classnames";

export function ProgressBar({ value, tone = "pine" }: { value: number; tone?: "ocean" | "pine" | "ember" }) {
  return (
    <div className="h-2 w-full rounded-full bg-white/10">
      <div
        className={classNames("h-2 rounded-full transition-all duration-700", {
          "bg-accent": tone === "ocean",
          "bg-money": tone === "pine",
          "bg-ember": tone === "ember"
        })}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
