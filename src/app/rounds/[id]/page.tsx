import { notFound } from "next/navigation";
import { withDb } from "@/lib/db";

export default async function RoundDetailPage({ params }: { params: { id: string } }) {
  const round = await withDb((db) => {
    const found = db.rounds.find((item) => item.id === params.id);
    if (!found) return null;
    const entries = db.round_entries.filter((entry) => entry.roundId === found.id);
    const winnerEmail = found.winnerUserId ? db.users.find((user) => user.id === found.winnerUserId)?.email : null;
    return { ...found, entries, winner: winnerEmail ? { email: winnerEmail } : null };
  });

  if (!round) notFound();

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Ronda {round.id}</h1>
      <p>Estado: {round.status}</p>
      <p>
        Entradas: {round.entries.length}/{round.maxPlayers} · Costo: {round.entryCost}
      </p>
      <div className="rounded border border-slate-800 bg-slate-900 p-4 text-sm">
        <h2 className="mb-2 font-semibold">Proof / transparencia</h2>
        <p>seedHash: {round.seedHash ?? "pendiente"}</p>
        <p>seed: {round.seed ?? "se revela al cerrar"}</p>
        <p>winner: {round.winner?.email ?? "sin ganador"}</p>
      </div>
    </div>
  );
}
