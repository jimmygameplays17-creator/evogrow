import Image from "next/image";
import { notFound } from "next/navigation";
import { DonationFlow } from "@/components/DonationFlow";
import { Badge } from "@/components/Badge";
import { ProgressBar } from "@/components/ProgressBar";
import { CommentsSection } from "@/components/CommentsSection";
import { ShareActions } from "@/components/ShareActions";
import { ReportButton } from "@/components/ReportButton";
import { Leaderboard } from "@/components/Leaderboard";
import { CreatorBadge } from "@/components/CreatorBadge";
import { TagPills } from "@/components/TagPills";
import { computeProjectMetrics, getProjectById, getTopBuildersByProject } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Money } from "@/components/Money";

interface ProjectDetailPageProps {
  params: { id: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectById(params.id);
  if (!project) return notFound();

  const metrics = computeProjectMetrics(project);
  const isOfficial = project.type === "official";
  const isCreator = project.type === "creator";
  const topBuilders = getTopBuildersByProject(project.id, 5);

  return (
    <main className="mx-auto max-w-6xl px-6 pb-28 pt-10">
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
        </div>
        <div className="space-y-4 px-6 py-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="font-semibold uppercase">{project.zone}</span>
            {isCreator ? <CreatorBadge /> : isOfficial ? <Badge orgType={project.orgType} /> : null}
            <span>Organiza: {project.organizer}</span>
            {project.fundingStatus !== "Approved" && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                {project.fundingStatus}
              </span>
            )}
            {project.status === "completed" && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                Finalizado
              </span>
            )}
          </div>
          <h1 className="text-3xl font-semibold text-white">{project.title}</h1>
          <TagPills tags={project.tags} />
          <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <ProgressBar value={metrics.progress} />
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
              <span className="text-money">
                <Money amount={metrics.totalRaised} /> recaudado
              </span>
              <span className="text-money">
                Meta <Money amount={project.goal} />
              </span>
              <span>{metrics.daysRemaining} días restantes</span>
            </div>
          </div>
          <p className="text-sm text-slate-300">{project.description}</p>
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

      <section className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-semibold text-white">Materiales / piezas</h2>
            <p className="text-sm text-slate-400">
              Financiamiento por pieza estilo LEGO. Cada aporte se refleja en el avance del BOM.
            </p>
            <div className="mt-6">
              <DonationFlow project={project} />
            </div>
          </div>

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
              {project.updates.length === 0 && (
                <p className="text-sm text-slate-400">No hay actualizaciones aún.</p>
              )}
            </div>
          </div>

          <CommentsSection projectId={project.id} comments={project.comments} />
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-card p-5 shadow-card">
            <h3 className="text-base font-semibold text-white">Donadores</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              {project.donations.map((donation) => (
                <li key={donation.id} className="flex items-center justify-between">
                  <span>{donation.donorName}</span>
                  <span className="font-semibold text-money">
                    <Money amount={donation.amount} />
                  </span>
                </li>
              ))}
              {project.donations.length === 0 && <li>No hay donaciones todavía.</li>}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-card p-5 shadow-card">
            <h3 className="text-base font-semibold text-white">Top Builders del proyecto</h3>
            <div className="mt-4">
              <Leaderboard entries={topBuilders} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-card p-5 shadow-card">
            <h3 className="text-base font-semibold text-white">Compartir proyecto</h3>
            <p className="mt-2 text-sm text-slate-400">Comparte el link para sumar builders.</p>
            <div className="mt-4">
              <ShareActions title={project.title} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-card p-5 shadow-card">
            <h3 className="text-base font-semibold text-white">Reportar proyecto</h3>
            <p className="mt-2 text-sm text-slate-400">Ayúdanos a mantener la comunidad segura.</p>
            <div className="mt-4">
              <ReportButton projectId={project.id} />
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
