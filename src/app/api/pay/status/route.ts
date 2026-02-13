import { NextRequest, NextResponse } from "next/server";
import { confirmPayment, getPaymentStatus } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "MissingReference" }, { status: 400 });
  }

  const payment = getPaymentStatus(reference);
  if (!payment) {
    return NextResponse.json({ error: "NotFound" }, { status: 404 });
  }

  const createdAt = new Date(payment.createdAt).getTime();
  const elapsed = Date.now() - createdAt;

  if (elapsed > 6000 && payment.status === "pending") {
    confirmPayment(reference);
    return NextResponse.json({ status: "confirmed" });
  }

  return NextResponse.json({ status: payment.status });
}
