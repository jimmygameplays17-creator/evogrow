import { NextResponse } from "next/server";
import { updateProjectStatus } from "@/lib/data";

interface RouteParams {
  params: { id: string };
}

export async function POST(_: Request, { params }: RouteParams) {
  const project = updateProjectStatus(params.id, "Rejected");
  if (!project) {
    return NextResponse.json({ error: "NotFound" }, { status: 404 });
  }

  return NextResponse.json({ project });
}
