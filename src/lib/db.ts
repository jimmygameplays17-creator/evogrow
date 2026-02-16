import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type User = { id: string; email: string; passwordHash: string; createdAt: string };
export type Balance = { id: string; userId: string; credits: number; updatedAt: string };
export type Round = {
  id: string;
  status: "NEXT" | "CLOSED";
  createdAt: string;
  closesAt: string;
  entryCost: number;
  maxPlayers: number;
  prize: number;
  house: number;
  seedHash: string | null;
  seed: string | null;
  winnerUserId: string | null;
  winningEntryId: string | null;
};
export type RoundEntry = { id: string; roundId: string; userId: string; createdAt: string; isWinner: boolean };
export type Session = { id: string; userId: string; tokenHash: string; expiresAt: string; createdAt: string };

type DbSchema = {
  users: User[];
  balances: Balance[];
  rounds: Round[];
  round_entries: RoundEntry[];
  sessions: Session[];
};

const dbPath = path.join(process.cwd(), ".data", "flashrounds.json");

async function ensureDbFile() {
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  try {
    await fs.access(dbPath);
  } catch {
    await fs.writeFile(
      dbPath,
      JSON.stringify({ users: [], balances: [], rounds: [], round_entries: [], sessions: [] } satisfies DbSchema, null, 2)
    );
  }
}

export async function withDb<T>(run: (db: DbSchema) => T | Promise<T>) {
  await ensureDbFile();
  const raw = await fs.readFile(dbPath, "utf8");
  const db = JSON.parse(raw) as DbSchema;
  const output = await run(db);
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
  return output;
}

export function uid() {
  return randomUUID();
}
