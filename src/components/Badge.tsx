import { OrgType } from "@/lib/types";
import classNames from "classnames";

const colorMap: Record<OrgType, string> = {
  Community: "bg-slate-100 text-slate-700",
  Business: "bg-blue-50 text-blue-700",
  Government: "bg-emerald-50 text-emerald-700"
};

export function Badge({ orgType }: { orgType: OrgType }) {
  return (
    <span className={classNames("rounded-full px-3 py-1 text-xs font-semibold", colorMap[orgType])}>
      Verified
    </span>
  );
}
