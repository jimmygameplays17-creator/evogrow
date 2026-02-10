import { OrgType } from "@/lib/types";
import classNames from "classnames";

const colorMap: Record<OrgType, string> = {
  Community: "bg-white/10 text-slate-200",
  Business: "bg-money/15 text-money",
  Government: "bg-money/15 text-money"
};

export function Badge({ orgType, label }: { orgType: OrgType; label?: string }) {
  return (
    <span className={classNames("rounded-full px-3 py-1 text-xs font-semibold", colorMap[orgType])}>
      {label ?? "Verified"}
    </span>
  );
}
