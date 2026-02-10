import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";
import { computeProjectMetrics } from "@/lib/data";
import { Money } from "@/components/Money";
import { ProgressBar } from "@/components/ProgressBar";
import { Badge } from "@/components/Badge";
import { CreatorBadge } from "@/components/CreatorBadge";
import { TagPills } from "@/components/TagPills";

export function ProjectCard({ project }: { project: Project }) {
  const metrics = computeProjectMetrics(project);
  const isOfficial = project.type === "official";
  const isCreator = project.type === "creator";
  const displayTags = [
    ...(isOfficial ? ["Oficial", "Verified"] : []),
    ...(project.tags ?? []),
    ...(project.status === "active" ? ["Live"] : [])
  ];

  return (
    <div
      className={[
        "h-full min-h-[240px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-[2px] hover:bg-white/10 hover:shadow-lg"
      ].join(" ")}
    >
      <div className="flex h-full flex-col gap-4 p-4 md:flex-row">
        <div className="relative h-[180px] w-full overflow-hidden rounded-2xl md:w-[180px] md:shrink-0">
          <Image src={project.coverImage} alt={project.title} fill className="h-full w-full object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-white">{project.title}</h3>
              <p className="truncate text-xs text-slate-400">{project.zone} · {project.organizer}</p>
            </div>
            <div className="flex items-center gap-2">
              {project.status === "completed" && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                  Finalizado
                </span>
              )}
              {isCreator ? <CreatorBadge /> : isOfficial ? <Badge orgType={project.orgType} /> : null}
            </div>
          </div>
          <TagPills tags={displayTags} />
          <div className="space-y-2">
            <ProgressBar value={metrics.progress} />
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span className="truncate text-money">
                <Money amount={metrics.totalRaised} /> recaudado
              </span>
              <span className="text-slate-300">{Math.round(metrics.progress)}%</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="truncate text-money">
                Meta <Money amount={project.goal} />
              </span>
              <span>{metrics.daysRemaining} días</span>
            </div>
          </div>
          <Link
            href={`/projects/${project.id}`}
            className="mt-auto inline-flex items-center justify-center rounded-full bg-money px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-accent hover:shadow-[0_0_12px_rgba(0,255,163,0.35)] active:scale-95"
          >
            Ver proyecto
          </Link>
        </div>
      </div>
    </div>
  );
}
