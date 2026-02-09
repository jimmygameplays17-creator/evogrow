import Image from "next/image";
import { notFound } from "next/navigation";
import { DonationFlow } from "@/components/DonationFlow";
import { Badge } from "@/components/Badge";
import { ProgressBar } from "@/components/ProgressBar";
import { ShareButton } from "@/components/ShareButton";
import { Leaderboard } from "@/components/Leaderboard";
import { computeProjectMetrics, getProjectById, getTopBuildersByProject } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

interface ProjectDetailPageProps {
  params: { id: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectById(params.id);
  if (!project) return notFound();

  const metrics = computeProjectMetrics(project);
  const isOfficial = project.type === "official";
  const topBuilders = getTopBuildersByProject(project.id, 5);

  return (
    <main className="mx-auto max-w-6xl px-6 pb-28 pt-10">
      <section
        className={[
          "overflow-hidden rounded-3xl shadow-card",
          isOfficial ? "border border-blue-100 bg-blue-50/40" : "bg-white"
        ].join(" ")}
      >
        <div className="relative h-64 w-full">
          <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
        </div>
        <div className="space-y-4 px-6 py-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-steel">
            <span className="font-semibold uppercase">{project.zone}</span>
            {isOfficial && <Badge orgType={project.orgType} />}
            <span>Organiza: {project.organizer}</span>
            {project.status !== "Approved" && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {project.status}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-semibold text-ink">{project.title}</h1>
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <ProgressBar value={metrics.progress} />
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-steel">
              <span>{formatCurrency(metrics.totalRaised)} recaudado</span>
              <span>Meta {formatCurrency(project.goal)}</span>
              <span>{metrics.daysRemaining} días restantes</span>
            </div>
          </div>
          <p className="text-sm text-steel">{project.description}</p>
          {!isOfficial && (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
              Campaña creada por un usuario. Verifica antes de donar.
            </p>
          )}
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-semibold text-ink">Materiales / piezas</h2>
            <p className="text-sm text-steel">
              Financiamiento por pieza estilo LEGO. Cada aporte se refleja en el avance del BOM.
            </p>
            <div className="mt-6">
              <DonationFlow project={project} />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">Actualizaciones</h2>
            <div className="mt-4 space-y-4">
              {project.updates.map((update) => (
                <div key={update.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="relative h-40 w-full">
                    <Image src={update.image} alt={update.title} fill className="object-cover" />
                  </div>
                  <div className="space-y-2 px-4 py-4">
                    <div className="flex items-center justify-between text-xs text-steel">
                      <span>{formatDate(update.date)}</span>
                      <span>Update</span>
                    </div>
                    <h3 className="text-base font-semibold text-ink">{update.title}</h3>
                    <p className="text-sm text-steel">{update.description}</p>
                  </div>
                </div>
              ))}
              {project.updates.length === 0 && (
                <p className="text-sm text-steel">No hay actualizaciones aún.</p>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-ink">Donadores</h3>
            <ul className="mt-4 space-y-3 text-sm text-steel">
              {project.donations.map((donation) => (
                <li key={donation.id} className="flex items-center justify-between">
                  <span>{donation.donorName}</span>
                  <span className="font-semibold text-ink">{formatCurrency(donation.amount)}</span>
                </li>
              ))}
              {project.donations.length === 0 && <li>No hay donaciones todavía.</li>}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-ink">Top Builders del proyecto</h3>
            <div className="mt-4">
              <Leaderboard entries={topBuilders} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-ink">Compartir proyecto</h3>
            <p className="mt-2 text-sm text-steel">Comparte el link para sumar builders.</p>
            <ShareButton />
          </div>
        </aside>
      </section>
    </main>
  );
}
