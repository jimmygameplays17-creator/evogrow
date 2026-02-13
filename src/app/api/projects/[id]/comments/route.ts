import { NextRequest, NextResponse } from "next/server";
import { addComment, getProjectById } from "@/lib/data";

interface RouteParams {
  params: { id: string };
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const payload = await request.json();
  const project = getProjectById(params.id);
  if (!project) {
    return NextResponse.json({ error: "NotFound" }, { status: 404 });
  }

  const comment = addComment(params.id, payload.name, payload.text);
  return NextResponse.json({ comment });
}
