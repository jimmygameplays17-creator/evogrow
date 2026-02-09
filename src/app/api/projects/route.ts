import { NextRequest, NextResponse } from "next/server";
import { createProject, listProjects } from "@/lib/data";
import { OrgType, ProjectStatus, ProjectType } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as ProjectStatus | null;
  const zone = searchParams.get("zone");
  const orgType = searchParams.get("orgType") as OrgType | null;
  const type = searchParams.get("type") as ProjectType | null;

  const projects = listProjects(status ?? undefined, zone ?? undefined, orgType ?? undefined, type ?? undefined);

  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const project = createProject(payload);
  return NextResponse.json({ project });
}
