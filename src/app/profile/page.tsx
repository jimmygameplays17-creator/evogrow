import { getCurrentUserId, getMyRankGlobal, getProfileSummary } from "@/lib/data";
import { Money } from "@/components/Money";

export default function ProfilePage() {
  const userId = getCurrentUserId();
  const { totalDonated, projectsDonated } = getProfileSummary(userId);
  const myRank = getMyRankGlobal(userId);
  const hasBuilderBadge = totalDonated >= 1000;

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <section className="rounded-3xl border border-white/10 bg-card p-8 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Perfil</h1>
            <p className="text-sm text-slate-400">Usuario: Tú</p>
          </div>
          {hasBuilderBadge && (
            <span className="rounded-full bg-money/20 px-3 py-1 text-xs font-semibold text-money">
              Builder
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase text-slate-400">Tu ranking global</p>
            <p className="mt-2 text-lg font-semibold text-slate-100">#{myRank.rank ?? "-"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase text-slate-400">Total donado</p>
            <p className="mt-2 text-lg font-semibold text-money">
              <Money amount={myRank.total} />
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase text-slate-400">Proyectos apoyados</p>
            <p className="mt-2 text-lg font-semibold text-slate-100">{projectsDonated.length}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-white">Proyectos a los que donaste</h2>
          <ul className="mt-3 space-y-3 text-sm text-slate-400">
            {projectsDonated.map((project) => (
              <li key={project.id} className="flex items-center justify-between">
                <span>{project.title}</span>
                <span className="text-xs font-semibold text-slate-200">{project.zone}</span>
              </li>
            ))}
            {projectsDonated.length === 0 && <li>Aún no has donado a ningún proyecto.</li>}
          </ul>
        </div>
      </section>
    </main>
  );
}
