import { cookies } from "next/headers";
import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { uid, withDb } from "@/lib/db";

const SESSION_COOKIE = "flashrounds_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, passwordHash: string) {
  const [salt, storedHash] = passwordHash.split(":");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return safeEqual(hash, storedHash);
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export async function createSession(userId: string) {
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = sha256(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

  await withDb((db) => {
    db.sessions.push({ id: uid(), userId, tokenHash, expiresAt, createdAt: new Date().toISOString() });
  });

  cookies().set(SESSION_COOKIE, rawToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt)
  });
}

export async function destroySession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return;
  const tokenHash = sha256(token);
  await withDb((db) => {
    db.sessions = db.sessions.filter((session) => session.tokenHash !== tokenHash);
  });
  cookies().delete(SESSION_COOKIE);
}

export async function getSessionUser() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const tokenHash = sha256(token);
  return withDb((db) => {
    const session = db.sessions.find((item) => item.tokenHash === tokenHash);
    if (!session || new Date(session.expiresAt) < new Date()) return null;
    const user = db.users.find((item) => item.id === session.userId);
    if (!user) return null;
    const balance = db.balances.find((item) => item.userId === user.id) ?? null;
    return { ...user, balance };
  });
}

export function safeEqual(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) {
    return false;
  }
  return timingSafeEqual(aBuffer, bBuffer);
}
