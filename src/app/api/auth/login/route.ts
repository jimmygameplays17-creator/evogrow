import { NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/server-auth";
import { withDb } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.toLowerCase().trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email.includes("@") || password.length < 6) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const user = await withDb((db) => db.users.find((item) => item.email === email));

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  await createSession(user.id);
  return NextResponse.json({ ok: true });
}
