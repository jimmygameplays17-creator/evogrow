import { NextRequest, NextResponse } from "next/server";
import { addReport, getProjectById } from "@/lib/data";

interface RouteParams {
  params: { id: string };
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const payload = await request.json();
  const project = getProjectById(params.id);
  if (!project) {
    return NextResponse.json({ error: "NotFound" }, { status: 404 });
  }

  const report = addReport(params.id, payload.reason);
  return NextResponse.json({ report });
}
