import { NextRequest, NextResponse } from "next/server";
import { encodeURL } from "@solana/pay";
import { Keypair, PublicKey } from "@solana/web3.js";
import { addDonation, addPendingDonation, createPayment, getProjectById } from "@/lib/data";

const DEFAULT_RECIPIENT = "9v5H1tiT9YFxncmyvqhV4Bk1VNfsDZwexsLRASQ1v1wM";
const SOL_PRICE_MXN = 1800;
const USDC_PRICE_MXN = 17;

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const project = getProjectById(payload.projectId);
  if (!project) {
    return NextResponse.json({ error: "NotFound" }, { status: 404 });
  }

  const amountMXN = Number(payload.amountFiat);
  if (!amountMXN || amountMXN <= 0) {
    return NextResponse.json({ error: "InvalidAmount" }, { status: 400 });
  }

  const method = payload.method as string;

  if (method !== "solana") {
    const donation = addDonation(payload.projectId, {
      itemId: payload.itemId,
      amount: amountMXN,
      donorId: payload.donorId ?? "anonymous",
      donorName: payload.donorName ?? "Anónimo",
      paymentMethod: method
    });

    return NextResponse.json({ ok: true, donation });
  }

  const recipient = new PublicKey(process.env.SOLANA_RECIPIENT ?? DEFAULT_RECIPIENT);
  const reference = Keypair.generate().publicKey;
  const solanaCurrency = payload.solanaCurrency === "USDC" ? "USDC" : "SOL";
  const amountCrypto = solanaCurrency === "USDC" ? amountMXN / USDC_PRICE_MXN : amountMXN / SOL_PRICE_MXN;

  const url = encodeURL({
    recipient,
    amount: amountCrypto,
    reference,
    label: `Fundra · ${project.title}`,
    message: "Pago demo en Solana devnet"
  });

  const pendingDonation = addPendingDonation(payload.projectId, {
    itemId: payload.itemId,
    amount: amountMXN,
    donorId: payload.donorId ?? "anonymous",
    donorName: payload.donorName ?? "Anónimo",
    paymentMethod: `solana-${solanaCurrency}`,
    reference: reference.toBase58()
  });

  if (pendingDonation) {
    createPayment(reference.toBase58(), pendingDonation.id);
  }

  return NextResponse.json({ solanaPayUrl: url.toString(), reference: reference.toBase58() });
}
