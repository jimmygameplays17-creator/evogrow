import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/server-auth";
import { ensureCurrentRound } from "@/lib/rounds";
import { rateLimit } from "@/lib/rate-limit";
import { uid, withDb } from "@/lib/db";

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (!rateLimit(`${ip}:${user.id}`)) {
    return NextResponse.json({ error: "Rate limit excedido" }, { status: 429 });
  }

  const round = await ensureCurrentRound();

  const result = await withDb((db) => {
    const targetRound = db.rounds.find((item) => item.id === round.id);
    if (!targetRound || targetRound.status !== "NEXT") return { error: "Ronda cerrada" };

    const entries = db.round_entries.filter((item) => item.roundId === round.id);
    if (entries.length >= targetRound.maxPlayers) return { error: "Ronda llena" };
    if (entries.some((item) => item.userId === user.id)) return { error: "Solo una entrada por usuario" };

    const balance = db.balances.find((item) => item.userId === user.id);
    if (!balance || balance.credits < targetRound.entryCost) return { error: "Créditos insuficientes" };

    db.round_entries.push({ id: uid(), roundId: round.id, userId: user.id, createdAt: new Date().toISOString(), isWinner: false });
    balance.credits -= targetRound.entryCost;
    balance.updatedAt = new Date().toISOString();
    return { ok: true };
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
