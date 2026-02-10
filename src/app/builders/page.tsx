import Link from "next/link";
import { Leaderboard } from "@/components/Leaderboard";
import { getCurrentUserId, getMyRankGlobal, getTopBuildersGlobal } from "@/lib/data";
import { Money } from "@/components/Money";

export default function BuildersPage() {
  const leaderboard = getTopBuildersGlobal(100);
  const currentUserId = getCurrentUserId();
  const myRank = getMyRankGlobal(currentUserId);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <section className="rounded-3xl border border-white/10 bg-card p-8 shadow-card">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-white">Top Builders</h1>
          <p className="text-sm text-slate-400">Los que más han construido la comunidad este mes</p>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
          <p>
            Tu ranking: <span className="font-semibold text-slate-100">#{myRank.rank ?? "-"}</span> • Total:{" "}
            <span className="font-semibold text-money">
              <Money amount={myRank.total} />
            </span>
          </p>
        </div>

        <div className="mt-6">
          <Leaderboard entries={leaderboard} highlightId={currentUserId} showTopBadges />
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-base font-semibold text-white">Tu ranking</h2>
          {myRank.rank ? (
            <div className="mt-4 grid gap-3 text-sm text-slate-400 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-card p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">Tu posición</p>
                <p className="mt-2 text-lg font-semibold text-slate-100">#{myRank.rank}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">Total donado</p>
                <p className="mt-2 text-lg font-semibold text-money">
                  <Money amount={myRank.total} />
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-400">
              <p>Aún no has donado</p>
              <Link href="/" className="rounded-full bg-money px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-accent">
                Explorar proyectos
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
