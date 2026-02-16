import { NextResponse } from "next/server";
import { createSession, hashPassword } from "@/lib/server-auth";
import { uid, withDb } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.toLowerCase().trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email.includes("@") || password.length < 6) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const found = await withDb((db) => db.users.find((item) => item.email === email));
  if (found) {
    return NextResponse.json({ error: "Email ya registrado" }, { status: 409 });
  }

  const userId = uid();
  const passwordHash = hashPassword(password);

  await withDb((db) => {
    db.users.push({ id: userId, email, passwordHash, createdAt: new Date().toISOString() });
    db.balances.push({ id: uid(), userId, credits: 100, updatedAt: new Date().toISOString() });
  });

  await createSession(userId);
  return NextResponse.json({ ok: true });
}
