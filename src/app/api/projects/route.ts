import { NextRequest, NextResponse } from "next/server";
import { createProject, listProjects } from "@/lib/data";
import { CompletionStatus, FundingStatus, OrgType, ProjectType } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fundingStatus = (searchParams.get("fundingStatus") ??
    searchParams.get("status")) as FundingStatus | null;
  const zone = searchParams.get("zone");
  const orgType = searchParams.get("orgType") as OrgType | null;
  const type = searchParams.get("type") as ProjectType | null;
  const completionStatus = searchParams.get("completionStatus") as CompletionStatus | null;

  const projects = listProjects(
    fundingStatus ?? undefined,
    zone ?? undefined,
    orgType ?? undefined,
    type ?? undefined,
    completionStatus ?? undefined
  );

  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const project = createProject(payload);
  return NextResponse.json({ project });
}
