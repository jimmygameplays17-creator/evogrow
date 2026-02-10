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
        "flex h-full min-h-[250px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-[2px] hover:bg-white/10 hover:shadow-lg"
      ].join(" ")}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden p-4 pb-0">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
          {project.isLive && (
            <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-full border border-red-400/50 bg-red-500/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
              LIVE
            </div>
          )}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-white [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
              {project.title}
            </h3>
            <p className="mt-1 truncate text-xs text-slate-400">
              {isCreator && project.creatorName ? project.creatorName : project.organizer} · {project.zone}
            </p>
            {isCreator && project.creatorHandle && (
              <p className="truncate text-[11px] text-crypto/90">
                {project.creatorHandle} · {project.creatorPlatform ?? "creator"}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isCreator && project.creatorAvatarUrl && (
              <span className="relative h-8 w-8 overflow-hidden rounded-full border border-white/20">
                <Image src={project.creatorAvatarUrl} alt={project.creatorName ?? "Creator"} fill className="object-cover" />
              </span>
            )}
            {project.status === "completed" && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                Finalizado
              </span>
            )}
            {isCreator ? <CreatorBadge /> : isOfficial ? <Badge orgType={project.orgType} /> : null}
          </div>
        </div>

        <TagPills tags={displayTags} />

        <p className="text-xs text-slate-400 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
          {project.description}
        </p>

        {isCreator && (
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
            <span className="truncate rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              {project.isLive ? "en vivo" : "offline"} · {project.donationsLast24h} aportes
            </span>
            <span className="truncate rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-right">
              score {project.trendScore}
            </span>
          </div>
        )}

        <div className="space-y-2">
          <ProgressBar value={metrics.progress} />
          <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
            <span className="truncate text-money">
              <Money amount={metrics.totalRaised} /> recaudado
            </span>
            <span className="text-right text-slate-300">{Math.round(metrics.progress)}%</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
            <span className="truncate text-money">
              Meta <Money amount={project.goal} />
            </span>
            <span className="text-right">{metrics.daysRemaining} días</span>
          </div>
        </div>

        <Link
          href={`/p/${project.slug ?? project.id}`}
          className="mt-auto inline-flex items-center justify-center rounded-full bg-money px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-accent hover:shadow-[0_0_12px_rgba(0,255,163,0.35)] active:scale-95"
        >
          Ver proyecto
        </Link>
      </div>
    </div>
  );
}
