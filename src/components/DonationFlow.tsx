"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { BomItem, Project } from "@/lib/types";
import { computeBomMetrics, getCurrentUserId } from "@/lib/data";
import { convertFromMXN, convertToMXN, demoRates, formatCurrency } from "@/lib/currency";
import { useCurrency } from "@/components/CurrencyProvider";
import { ProgressBar } from "@/components/ProgressBar";
import { Money } from "@/components/Money";

interface DonationFlowProps {
  project: Project;
}

type Mode = "unit" | "percentage" | "amount";

type PaymentMethod = "card" | "paypal" | "oxxo" | "spei" | "solana";

type SolanaCurrency = "SOL" | "USDC";

export function DonationFlow({ project }: DonationFlowProps) {
  const router = useRouter();
  const { currency, setCurrency, rates } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState<string>(project.bom[0]?.id ?? "");
  const [mode, setMode] = useState<Mode>("amount");
  const [quantity, setQuantity] = useState(1);
  const [percent, setPercent] = useState(10);
  const [amount, setAmount] = useState(100);
  const [donorName, setDonorName] = useState("Anónimo");
  const [donorId] = useState(getCurrentUserId());
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [solanaCurrency, setSolanaCurrency] = useState<SolanaCurrency>("SOL");
  const [solanaPayUrl, setSolanaPayUrl] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const selectedItem = useMemo(
    () => project.bom.find((item) => item.id === selectedItemId) ?? project.bom[0],
    [project.bom, selectedItemId]
  );

  const baseAmountMXN = useMemo(() => {
    if (!selectedItem) return convertToMXN(amount, currency, rates);

    if (mode === "unit" && selectedItem.unitPrice) {
      return quantity * selectedItem.unitPrice;
    }

    if (mode === "percentage" && selectedItem.totalPrice) {
      return Math.round((selectedItem.totalPrice * percent) / 100);
    }

    return convertToMXN(amount, currency, rates);
  }, [amount, currency, mode, percent, quantity, rates, selectedItem]);

  const displayAmount = convertFromMXN(baseAmountMXN, currency, rates);

  const openFlow = (item?: BomItem, nextMode?: Mode) => {
    if (item) {
      setSelectedItemId(item.id);
      if (nextMode) setMode(nextMode);
    }
    if (nextMode === "unit") {
      setQuantity(1);
    }
    setStep(1);
    setSuccessMessage(null);
    setInfoMessage(null);
    setSolanaPayUrl(null);
    setReference(null);
    setQrDataUrl(null);
    setIsOpen(true);
  };

  const handleFiatPayment = async () => {
    setInfoMessage(null);
    const response = await fetch("/api/pay/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: project.id,
        itemId: selectedItem?.id,
        amountFiat: baseAmountMXN,
        displayCurrency: currency,
        method: paymentMethod,
        donorId,
        donorName
      })
    });

    if (response.ok) {
      setSuccessMessage("Pago simulado confirmado. ¡Gracias por tu aporte!");
      setStep(4);
      router.refresh();
    }
  };

  const handleSolanaCreate = async () => {
    const response = await fetch("/api/pay/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: project.id,
        itemId: selectedItem?.id,
        amountFiat: baseAmountMXN,
        displayCurrency: currency,
        method: "solana",
        solanaCurrency,
        donorId,
        donorName
      })
    });

    if (!response.ok) return;
    const data = await response.json();
    setSolanaPayUrl(data.solanaPayUrl);
    setReference(data.reference);
    const qr = await QRCode.toDataURL(data.solanaPayUrl);
    setQrDataUrl(qr);
  };

  const checkSolanaStatus = async () => {
    if (!reference) return;
    const response = await fetch(`/api/pay/status?reference=${reference}`);
    if (!response.ok) return;
    const data = await response.json();
    if (data.status === "confirmed") {
      setSuccessMessage("Pago confirmado en Solana. ¡Gracias por tu aporte!");
      setStep(4);
      router.refresh();
    } else {
      setInfoMessage("Pago aún pendiente. Intenta nuevamente en unos segundos.");
    }
  };

  useEffect(() => {
    if (step === 3 && paymentMethod === "solana" && !solanaPayUrl) {
      handleSolanaCreate();
    }
  }, [paymentMethod, solanaPayUrl, step]);

  const badgeLabel = selectedItem?.type === "unit" ? "Builder Nivel 1" : "Builder Nivel 2";
  const isClosed = project.fundingStatus !== "Approved" || project.status === "completed";
  const statusLabel = project.status === "completed" ? "Finalizado" : project.fundingStatus;

  return (
    <>
      {isClosed && (
        <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Este proyecto está en estado {statusLabel}. Las donaciones están pausadas.
        </div>
      )}
      <div className="space-y-4">
        {project.bom.map((item) => {
          const metrics = computeBomMetrics(item);
          const totalLabel =
            item.type === "unit" && item.qty
              ? `${metrics.fundedUnits}/${item.qty}`
              : `${Math.round(metrics.fundedPercent)}%`;

          return (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-base font-semibold text-ink">{item.name}</h4>
                  <p className="text-xs text-steel">
                    {item.type === "unit" && item.unitPrice
                      ? `${item.qty} unidades · ${formatCurrency(convertFromMXN(item.unitPrice, currency, rates), currency)} c/u`
                      : item.totalPrice
                        ? `${formatCurrency(convertFromMXN(item.totalPrice, currency, rates), currency)} total`
                        : "Monto libre"}
                    {item.neededByWeek ? ` · semana ${item.neededByWeek}` : ""}
                  </p>
                </div>
                <span className="text-xs font-semibold text-steel">{totalLabel}</span>
              </div>
              <div className="mt-3 space-y-2">
                <ProgressBar value={metrics.fundedPercent} />
                <div className="flex flex-wrap gap-2">
                  {item.type === "unit" && (
                    <button
                      onClick={() => openFlow(item, "unit")}
                      disabled={isClosed}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-ink disabled:opacity-40"
                    >
                      Financiar 1 unidad
                    </button>
                  )}
                  {item.type !== "unit" && (
                    <button
                      onClick={() => openFlow(item, "percentage")}
                      disabled={isClosed}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-ink disabled:opacity-40"
                    >
                      Aportar porcentaje
                    </button>
                  )}
                  <button
                    onClick={() => openFlow(item, "amount")}
                    disabled={isClosed}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-ink disabled:opacity-40"
                  >
                    Aportar monto libre
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 p-4 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-ink">¿Listo para construir?</p>
            <p className="text-xs text-steel">Financia una pieza o dona un monto libre.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => openFlow()}
              disabled={isClosed}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink disabled:opacity-40"
            >
              Donar
            </button>
            <button
              onClick={() => openFlow(selectedItem, "unit")}
              disabled={isClosed}
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
            >
              Financiar una pieza
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-ink">Donación (DEMO)</h3>
              <button onClick={() => setIsOpen(false)} className="text-sm text-steel">
                Cerrar
              </button>
            </div>

            {step === 1 && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-steel">Moneda de visualización</label>
                  <select
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm"
                    value={currency}
                    onChange={(event) => setCurrency(event.target.value as typeof currency)}
                  >
                    <option value="MXN">MXN</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                  <p className="mt-2 text-xs text-steel">
                    Tipo de cambio demo: 1 USD ≈ {(1 / demoRates.USD).toFixed(2)} MXN · 1 EUR ≈ {(1 / demoRates.EUR).toFixed(2)} MXN
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-steel">Pieza / material</label>
                  <select
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm"
                    value={selectedItemId}
                    onChange={(event) => setSelectedItemId(event.target.value)}
                  >
                    {project.bom.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedItem?.type === "unit" && (
                  <div>
                    <label className="text-xs font-semibold uppercase text-steel">Cantidad</label>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(event) => setQuantity(Number(event.target.value))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
                    />
                  </div>
                )}

                {selectedItem?.type !== "unit" && mode === "percentage" && (
                  <div>
                    <label className="text-xs font-semibold uppercase text-steel">Porcentaje</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={percent}
                      onChange={(event) => setPercent(Number(event.target.value))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
                    />
                  </div>
                )}

                {mode === "amount" && (
                  <div>
                    <label className="text-xs font-semibold uppercase text-steel">Monto libre ({currency})</label>
                    <input
                      type="number"
                      min={1}
                      value={amount}
                      onChange={(event) => setAmount(Number(event.target.value))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
                    />
                  </div>
                )}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm">
                  <p className="text-steel">
                    Total estimado: <span className="font-semibold text-ink">{formatCurrency(displayAmount, currency)}</span>
                  </p>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                >
                  Continuar
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-steel">Método de pago</label>
                  <div className="mt-2 grid gap-2">
                    {(["card", "paypal", "oxxo", "spei", "solana"] as PaymentMethod[]).map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`rounded-2xl border px-4 py-2 text-sm font-semibold ${
                          paymentMethod === method ? "border-ink text-ink" : "border-slate-200 text-steel"
                        }`}
                      >
                        {method === "card" && "Tarjeta"}
                        {method === "paypal" && "PayPal"}
                        {method === "oxxo" && "Oxxo"}
                        {method === "spei" && "SPEI"}
                        {method === "solana" && "Solana (Crypto)"}
                      </button>
                    ))}
                  </div>
                </div>

                {paymentMethod === "solana" && (
                  <div>
                    <label className="text-xs font-semibold uppercase text-steel">Moneda crypto</label>
                    <div className="mt-2 flex gap-2">
                      {(["SOL", "USDC"] as SolanaCurrency[]).map((crypto) => (
                        <button
                          key={crypto}
                          onClick={() => setSolanaCurrency(crypto)}
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                            solanaCurrency === crypto ? "border-ink text-ink" : "border-slate-200 text-steel"
                          }`}
                        >
                          {crypto}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold uppercase text-steel">Nombre / Empresa</label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(event) => setDonorName(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
                  />
                </div>

                <button
                  onClick={() => setStep(3)}
                  className="w-full rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                >
                  Continuar
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink"
                >
                  Volver
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
                  <p className="font-semibold text-ink">Resumen</p>
                  <p className="mt-2 text-steel">Pieza: {selectedItem?.name}</p>
                  <p className="text-steel">
                    Aporte: {formatCurrency(displayAmount, currency)} (≈ <Money amount={baseAmountMXN} />)
                  </p>
                  <p className="text-steel">Método: {paymentMethod === "solana" ? "Solana" : paymentMethod}</p>
                </div>

                {paymentMethod !== "solana" && (
                  <div className="space-y-3">
                    <p className="text-sm text-steel">Demo: integración de pago en camino.</p>
                    <button
                      onClick={handleFiatPayment}
                      className="w-full rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                    >
                      Simular pago
                    </button>
                  </div>
                )}

                {paymentMethod === "solana" && (
                  <div className="space-y-3">
                    <p className="text-sm text-steel">
                      Demo Solana Pay en devnet. Escanea el QR o abre el link en tu wallet.
                    </p>
                    {qrDataUrl && (
                      <img src={qrDataUrl} alt="Solana Pay QR" className="mx-auto h-40 w-40" />
                    )}
                    {solanaPayUrl && (
                      <div className="space-y-2">
                        <a
                          href={solanaPayUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink"
                        >
                          Abrir en wallet
                        </a>
                        <button
                          onClick={() => navigator.clipboard.writeText(solanaPayUrl)}
                          className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink"
                        >
                          Copiar link
                        </button>
                      </div>
                    )}
                    <button
                      onClick={checkSolanaStatus}
                      className="w-full rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                    >
                      Verificar pago
                    </button>
                    {infoMessage && <p className="text-xs text-amber-600">{infoMessage}</p>}
                  </div>
                )}

                <button
                  onClick={() => setStep(2)}
                  className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink"
                >
                  Volver
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="mt-6 space-y-3 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
                  🧱
                </div>
                <h4 className="text-lg font-semibold text-ink">{successMessage}</h4>
                <p className="text-sm text-steel">Medalla obtenida: {badgeLabel}</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-2 w-full rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
