import Link from "next/link";
import { Leaderboard } from "@/components/Leaderboard";
import { getCurrentUserId, getMyRankGlobal, getTopBuildersGlobal } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function BuildersPage() {
  const leaderboard = getTopBuildersGlobal(10);
  const currentUserId = getCurrentUserId();
  const myRank = getMyRankGlobal(currentUserId);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <section className="rounded-3xl bg-white p-8 shadow-card">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-ink">Top Builders</h1>
          <p className="text-sm text-steel">Los que más han construido la comunidad este mes</p>
        </div>

        <div className="mt-6">
          <Leaderboard entries={leaderboard} />
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-base font-semibold text-ink">Tu ranking</h2>
          {myRank.rank ? (
            <div className="mt-4 grid gap-3 text-sm text-steel sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase text-steel">Tu posición</p>
                <p className="mt-2 text-lg font-semibold text-ink">#{myRank.rank}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase text-steel">Total donado</p>
                <p className="mt-2 text-lg font-semibold text-ink">{formatCurrency(myRank.total)}</p>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-steel">
              <p>Aún no has donado</p>
              <Link href="/" className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white">
                Explorar proyectos
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
