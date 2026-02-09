import { getCurrentUserId, getProfileSummary } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function ProfilePage() {
  const userId = getCurrentUserId();
  const { totalDonated, projectsDonated } = getProfileSummary(userId);
  const hasBuilderBadge = totalDonated >= 1000;

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <section className="rounded-3xl bg-white p-8 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-ink">Perfil</h1>
            <p className="text-sm text-steel">Usuario: Tú</p>
          </div>
          {hasBuilderBadge && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Builder
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase text-steel">Total donado</p>
            <p className="mt-2 text-lg font-semibold text-ink">{formatCurrency(totalDonated)}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase text-steel">Proyectos apoyados</p>
            <p className="mt-2 text-lg font-semibold text-ink">{projectsDonated.length}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-ink">Proyectos a los que donaste</h2>
          <ul className="mt-3 space-y-3 text-sm text-steel">
            {projectsDonated.map((project) => (
              <li key={project.id} className="flex items-center justify-between">
                <span>{project.title}</span>
                <span className="text-xs font-semibold text-ink">{project.zone}</span>
              </li>
            ))}
            {projectsDonated.length === 0 && <li>Aún no has donado a ningún proyecto.</li>}
          </ul>
        </div>
      </section>
    </main>
  );
}
