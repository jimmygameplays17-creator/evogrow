import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { ProgressBar } from "@/components/ProgressBar";
import { CommentsSection } from "@/components/CommentsSection";
import { ShareActions } from "@/components/ShareActions";
import { ReportButton } from "@/components/ReportButton";
import { Leaderboard } from "@/components/Leaderboard";
import { CreatorBadge } from "@/components/CreatorBadge";
import { TagPills } from "@/components/TagPills";
import { RecentDonationsPanel } from "@/components/RecentDonationsPanel";
import { computeProjectMetrics, getProjectSharePath, getTopBuildersByProject } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Money } from "@/components/Money";
import { Project } from "@/lib/types";

export function ProjectDetailView({ project }: { project: Project }) {
  const metrics = computeProjectMetrics(project);
  const isOfficial = project.type === "official";
  const isCreator = project.type === "creator";
  const topBuilders = getTopBuildersByProject(project.id, 5);
  const sharePath = getProjectSharePath(project);

  return (
    <main className="mx-auto max-w-[1280px] px-6 pb-28 pt-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-10">
          <section
            className={[
              "overflow-hidden rounded-3xl shadow-card",
              isCreator
                ? "border border-crypto/30 bg-crypto/10"
                : isOfficial
                  ? "border border-money/30 bg-money/5"
                  : "border border-white/10 bg-card"
            ].join(" ")}
          >
            <div className="relative h-64 w-full">
              <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
              {project.isLive && (
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-red-400/50 bg-red-500/90 px-3 py-1 text-xs font-semibold text-white">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> LIVE
                </div>
              )}
            </div>
            <div className="space-y-4 px-6 py-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            {isCreator ? <CreatorBadge /> : isOfficial ? <Badge orgType={project.orgType} /> : null}
            <span>Organiza: {project.organizer}</span>
            {project.fundingStatus !== "Approved" && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                {project.fundingStatus}
              </span>
            )}
            {project.status === "completed" && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">Finalizado</span>
            )}
          </div>
          <h1 className="text-3xl font-semibold text-white">{project.title}</h1>
          <TagPills tags={project.tags} />
          {project.isLive && <p className="text-xs font-semibold uppercase tracking-wide text-red-300">en vivo ahora</p>}
          <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <ProgressBar value={metrics.progress} />
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
              <span className="text-money">
                <Money amount={metrics.fundedAmountTotal ?? metrics.totalRaised} /> recaudado total
              </span>
              <span>{metrics.daysRemaining} días restantes</span>
            </div>
          </div>

          <div className="grid gap-2 rounded-2xl border border-white/10 bg-slate-900/40 p-4 text-xs text-slate-300 sm:grid-cols-3">
            <p>
              Creator pledge (confirmed): <span className="font-semibold text-money"><Money amount={metrics.creatorPledgeAmount ?? 0} /></span>
            </p>
            <p>
              Community raised: <span className="font-semibold text-money"><Money amount={metrics.fundedAmountPublic ?? 0} /></span>
            </p>
            <p>
              Remaining: <span className="font-semibold text-money"><Money amount={metrics.remainingAmount ?? 0} /></span>
            </p>
          </div>
              <p className="text-sm text-slate-300">{project.description}</p>

              {project.pinnedInLive && (
                <p className="inline-flex items-center rounded-full border border-yellow-400/40 bg-yellow-300/10 px-3 py-1 text-xs font-semibold text-yellow-200">
                  📌 Mencionado en live
                </p>
              )}

              {project.isLive && project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400"
                >
                  Ver live {project.livePlatform ? `· ${project.livePlatform}` : ""}
                </a>
              )}

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                <h3 className="text-sm font-semibold text-white">Comparte tu Fundra</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Comparte tu link de Fundra en tu chat o stream para que te aporten en segundos. Ej: “Mi Fundra es
                  fundra.com{sharePath}”.
                </p>
                <div className="mt-3">
                  <ShareActions title={project.title} sharePath={sharePath} />
                </div>
              </div>

              {isCreator && (
                <div className="rounded-2xl border border-crypto/40 bg-crypto/10 px-4 py-3 text-xs text-crypto">
                  <p className="font-semibold">Creator Verified: {project.creatorName}</p>
                  {project.creatorFollowers && <p>{project.creatorFollowers.toLocaleString("es-MX")} seguidores</p>}
                  {project.creatorVideoLink && (
                    <a href={project.creatorVideoLink} className="underline">
                      Ver video
                    </a>
                  )}
                </div>
              )}
              {!isOfficial && !isCreator && (
                <p className="rounded-2xl border border-ember/40 bg-ember/10 px-4 py-3 text-xs text-ember">
                  Campaña creada por un usuario. Verifica antes de donar.
                </p>
              )}
            </div>
          </section>

          <div>
            <h2 className="text-xl font-semibold text-white">Actualizaciones</h2>
            <div className="mt-4 space-y-4">
              {project.updates.map((update) => (
                <div key={update.id} className="overflow-hidden rounded-2xl border border-white/10 bg-card">
                  <div className="relative h-40 w-full">
                    <Image src={update.image} alt={update.title} fill className="object-cover" />
                  </div>
                  <div className="space-y-2 px-4 py-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{formatDate(update.date)}</span>
                      <span>Update</span>
                    </div>
                    <h3 className="text-base font-semibold text-white">{update.title}</h3>
                    <p className="text-sm text-slate-400">{update.description}</p>
                  </div>
                </div>
              ))}
              {project.updates.length === 0 && <p className="text-sm text-slate-400">No hay actualizaciones aún.</p>}
            </div>
          </div>

          <CommentsSection projectId={project.id} comments={project.comments} />
          <div className="rounded-3xl border border-white/10 bg-card p-5 shadow-card">
            <h3 className="text-base font-semibold text-white">Top Builders del proyecto</h3>
            <div className="mt-4">
              <Leaderboard entries={topBuilders} />
            </div>
          </div>

          {project.ownerHandle && (
            <div className="rounded-3xl border border-white/10 bg-card p-5 shadow-card">
              <h3 className="text-base font-semibold text-white">Fundra link del creador</h3>
              <p className="mt-2 text-sm text-slate-400">Comparte tu perfil y recibe aportes desde chat, stream o familia.</p>
              <Link href={`/u/${project.ownerHandle}`} className="mt-4 inline-flex rounded-full border border-white/10 px-3 py-2 text-xs text-slate-200 hover:border-accent hover:text-accent">
                fundra.com/u/{project.ownerHandle}
              </Link>
            </div>
          )}

          <div className="rounded-3xl border border-white/10 bg-card p-5 shadow-card">
            <h3 className="text-base font-semibold text-white">Reportar proyecto</h3>
            <p className="mt-2 text-sm text-slate-400">Ayúdanos a mantener la comunidad segura.</p>
            <div className="mt-4">
              <ReportButton projectId={project.id} />
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <RecentDonationsPanel projectId={project.id} initialDonations={project.donations} />
        </div>
      </div>
    </main>
  );
}
