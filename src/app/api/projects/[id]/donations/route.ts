import { NextRequest, NextResponse } from "next/server";
import { addDonation, getProjectById } from "@/lib/data";

interface RouteParams {
  params: { id: string };
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const payload = await request.json();
  const project = getProjectById(params.id);
  if (!project) {
    return NextResponse.json({ error: "NotFound" }, { status: 404 });
  }

  const donationResult = addDonation(params.id, {
    itemId: payload.itemId,
    amount: payload.amount,
    donorId: payload.donorId ?? "anonymous",
    donorName: payload.donorName ?? "Anónimo"
  });

  if (!donationResult || ("error" in donationResult && donationResult.error === "ProjectClosed")) {
    return NextResponse.json({ error: "ProjectClosed" }, { status: 400 });
  }

  return NextResponse.json({ donation: donationResult });
}
