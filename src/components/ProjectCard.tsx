import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";
import { computeProjectMetrics } from "@/lib/data";
import { Money } from "@/components/Money";
import { ProgressBar } from "@/components/ProgressBar";
import { Badge } from "@/components/Badge";

export function ProjectCard({ project }: { project: Project }) {
  const metrics = computeProjectMetrics(project);
  const isOfficial = project.type === "official";
  const isCreator = project.type === "creator";
  const username = project.creatorHandle ?? `@${(project.ownerHandle ?? project.organizer).toLowerCase().replace(/\s+/g, "")}`;
  const creatorPledgeLabel =
    project.creatorPledgeType === "percent"
      ? `Creador: ${project.creatorPledgeValue ?? 0}%`
      : `Creador: ${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(project.creatorPledgeAmount ?? 0)}`;
  const communityLabel = `Comunidad: ${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(project.fundedAmountPublic ?? metrics.totalRaised)}`;

  return (
    <div
      className={[
        "flex h-[120px] w-full flex-row overflow-hidden rounded-xl border border-white/10 bg-white/5 p-2 transition duration-300 hover:-translate-y-[1px] hover:bg-white/10 hover:shadow-lg"
      ].join(" ")}
    >
      <div className="relative h-full w-[92px] shrink-0 overflow-hidden rounded-lg">
        <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
        {project.isLive && (
          <div className="absolute left-1.5 top-1.5 z-10 inline-flex items-center gap-1 rounded-full border border-red-400/60 bg-red-500/90 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white shadow-lg">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> LIVE
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 px-2 py-0.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white">{project.title}</h3>
            <p className="truncate text-[10px] text-slate-400">{username}</p>
          </div>
          <div className="flex items-center gap-1">
            {project.status === "completed" && (
              <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold text-slate-200">
                Finalizado
              </span>
            )}
            {!isCreator && isOfficial ? <Badge orgType={project.orgType} /> : null}
          </div>
        </div>

        <p className="text-[10px] text-slate-400 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 text-[9px]">
          <span className="rounded-full border border-money/30 bg-money/10 px-2 py-0.5 text-money">{creatorPledgeLabel}</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-slate-300">{communityLabel}</span>
        </div>

        <ProgressBar value={metrics.progress} />

        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="min-w-0 space-y-0.5 text-[10px] text-slate-400">
            <p className="truncate text-money">Recaudado <Money amount={metrics.fundedAmountTotal ?? metrics.totalRaised} /></p>
            <p className="truncate">{metrics.daysRemaining} días restantes</p>
          </div>

          <Link
            href={`/p/${project.slug ?? project.id}`}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-money px-2.5 py-1 text-[10px] font-semibold text-slate-900 transition hover:bg-accent hover:shadow-[0_0_12px_rgba(0,255,163,0.35)] active:scale-95"
          >
            Ver proyecto
          </Link>
        </div>
      </div>
    </div>
  );
}
