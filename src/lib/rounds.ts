import { createHash, randomBytes } from "crypto";
import { uid, withDb } from "@/lib/db";

const ROUND_SECONDS = 10;

function createRoundSeed() {
  const seed = randomBytes(24).toString("hex");
  const seedHash = createHash("sha256").update(seed).digest("hex");
  return { seed, seedHash };
}

function winnerIndex(seed: string, roundId: string, totalEntries: number) {
  const digest = createHash("sha256").update(`${seed}:${roundId}`).digest("hex");
  const integer = Number.parseInt(digest.slice(0, 12), 16);
  return integer % totalEntries;
}

export async function ensureCurrentRound() {
  return withDb((db) => {
    const now = new Date();

    const expired = db.rounds.filter((round) => round.status === "NEXT" && new Date(round.closesAt) <= now);

    for (const round of expired) {
      const entries = db.round_entries.filter((entry) => entry.roundId === round.id).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      const { seed, seedHash } = createRoundSeed();

      round.status = "CLOSED";
      round.seed = seed;
      round.seedHash = seedHash;

      if (entries.length > 0) {
        const selected = entries[winnerIndex(seed, round.id, entries.length)];
        selected.isWinner = true;
        round.winnerUserId = selected.userId;
        round.winningEntryId = selected.id;
        const winnerBalance = db.balances.find((balance) => balance.userId === selected.userId);
        if (winnerBalance) winnerBalance.credits += round.prize;
      }
    }

    const current = db.rounds
      .filter((round) => round.status === "NEXT" && new Date(round.closesAt) > now)
      .sort((a, b) => a.closesAt.localeCompare(b.closesAt))[0];

    if (current) {
      return { ...current, _count: { entries: db.round_entries.filter((entry) => entry.roundId === current.id).length } };
    }

    const { seedHash } = createRoundSeed();
    const round = {
      id: uid(),
      status: "NEXT" as const,
      createdAt: now.toISOString(),
      closesAt: new Date(Date.now() + ROUND_SECONDS * 1000).toISOString(),
      entryCost: 1,
      maxPlayers: 100,
      prize: 80,
      house: 20,
      seedHash,
      seed: null,
      winnerUserId: null,
      winningEntryId: null
    };
    db.rounds.push(round);
    return { ...round, _count: { entries: 0 } };
  });
}

export async function getRecentWinners(limit = 10) {
  return withDb((db) => {
    const closed = db.rounds
      .filter((round) => round.status === "CLOSED" && round.winnerUserId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit);

    return closed.map((round) => ({
      ...round,
      winner: { email: db.users.find((user) => user.id === round.winnerUserId)?.email ?? "unknown" }
    }));
  });
}
