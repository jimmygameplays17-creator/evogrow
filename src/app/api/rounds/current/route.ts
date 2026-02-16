import { NextResponse } from "next/server";
import { ensureCurrentRound, getRecentWinners } from "@/lib/rounds";

export async function GET() {
  const round = await ensureCurrentRound();
  const recent = await getRecentWinners(5);

  return NextResponse.json({
    round: {
      id: round.id,
      closesAt: round.closesAt,
      entryCost: round.entryCost,
      maxPlayers: round.maxPlayers,
      entries: round._count.entries,
      prize: round.prize,
      house: round.house
    },
    recent
  });
}
