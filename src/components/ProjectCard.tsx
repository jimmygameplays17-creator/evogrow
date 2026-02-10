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

  return (
    <div
      className={[
        "flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-card shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(0,255,163,0.35)]"
      ].join(" ")}
    >
      <div className="relative h-44 w-full">
        <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{project.zone}</span>
          <div className="flex items-center gap-2">
            {project.status === "completed" && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                Finalizado
              </span>
            )}
            {isCreator ? <CreatorBadge /> : isOfficial ? <Badge orgType={project.orgType} /> : null}
          </div>
        </div>
        <TagPills tags={project.tags} />
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <div className="space-y-2">
          <ProgressBar value={metrics.progress} />
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span className="text-money">
              <Money amount={metrics.totalRaised} /> recaudado
            </span>
            <span className="text-slate-300">{Math.round(metrics.progress)}%</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="text-money">
              Meta <Money amount={project.goal} />
            </span>
            <span className="text-slate-400">{metrics.daysRemaining} días restantes</span>
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
  );
}
