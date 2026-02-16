import Link from "next/link";
import { getSessionUser } from "@/lib/server-auth";
import { ensureCurrentRound, getRecentWinners } from "@/lib/rounds";
import { Countdown } from "@/components/Countdown";
import { EnterButton } from "@/components/EnterButton";

export default async function HomePage() {
  const [user, round, recentWinners] = await Promise.all([
    getSessionUser(),
    ensureCurrentRound(),
    getRecentWinners(8)
  ]);

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm text-slate-400">Próxima ronda</p>
        <Countdown closesAt={round.closesAt} />
        <p className="mt-3 text-slate-300">
          Cupo: {round._count.entries}/{round.maxPlayers} · Premio: {round.prize} · Casa: {round.house}
        </p>
        <div className="mt-4 flex items-center gap-4">
          {user ? <EnterButton /> : <Link href="/login" className="text-indigo-300">Inicia sesión para entrar</Link>}
          <Link href={`/rounds/${round.id}`} className="text-sm underline">
            Ver detalle de ronda
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Ganadores recientes</h2>
        <ul className="space-y-2">
          {recentWinners.length === 0 ? <li className="text-slate-400">Aún no hay ganadores.</li> : null}
          {recentWinners.map((winner) => (
            <li key={winner.id} className="rounded border border-slate-800 bg-slate-900 px-4 py-2 text-sm">
              <span className="font-medium">{winner.winner?.email}</span> ganó {winner.prize} créditos · ronda {winner.id}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
