import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";
import { computeProjectMetrics } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { ProgressBar } from "@/components/ProgressBar";
import { Badge } from "@/components/Badge";
import { CreatorBadge } from "@/components/CreatorBadge";

export function ProjectCard({ project }: { project: Project }) {
  const metrics = computeProjectMetrics(project);
  const isOfficial = project.type === "official";
  const isCreator = project.type === "creator";

  return (
    <div
      className={[
        "flex h-full flex-col overflow-hidden rounded-3xl shadow-card",
        isCreator ? "border border-amber-100 bg-amber-50/40" : isOfficial ? "border border-blue-100 bg-blue-50/40" : "bg-white"
      ].join(" ")}
    >
      <div className="relative h-44 w-full">
        <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-steel">{project.zone}</span>
          {isCreator ? <CreatorBadge /> : isOfficial ? <Badge orgType={project.orgType} /> : null}
        </div>
        <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
        <div className="space-y-2">
          <ProgressBar value={metrics.progress} />
          <div className="flex items-center justify-between text-sm text-steel">
            <span>{formatCurrency(metrics.totalRaised)} recaudado</span>
            <span>{Math.round(metrics.progress)}%</span>
          </div>
          <div className="flex items-center justify-between text-xs text-steel">
            <span>Meta {formatCurrency(project.goal)}</span>
            <span>{metrics.daysRemaining} días restantes</span>
          </div>
        </div>
        <Link
          href={`/projects/${project.id}`}
          className="mt-auto inline-flex items-center justify-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
        >
          Ver proyecto
        </Link>
      </div>
    </div>
  );
}
