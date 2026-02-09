import { NextResponse } from "next/server";
import { getTopBuildersGlobal } from "@/lib/data";

export async function GET() {
  const leaderboard = getTopBuildersGlobal(10);
  return NextResponse.json({ leaderboard });
}
