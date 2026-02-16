import { notFound } from "next/navigation";
import { getSessionUser } from "@/lib/server-auth";
import { withDb } from "@/lib/db";
import { ShareWinButton } from "@/components/ShareWinButton";

export default async function WinPage({ params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) notFound();

  const round = await withDb((db) => db.rounds.find((item) => item.id === params.id) ?? null);

  if (!round || round.winnerUserId !== user.id) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-lg rounded border border-emerald-700 bg-emerald-950 p-8 text-center">
      <h1 className="text-3xl font-bold">¡Ganaste!</h1>
      <p className="mt-3">Ganaste {round.prize} créditos en la ronda {round.id}.</p>
      <div className="mt-6 flex justify-center">
        <ShareWinButton roundId={round.id} />
      </div>
    </section>
  );
}
