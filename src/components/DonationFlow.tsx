"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BomItem, Project } from "@/lib/types";
import { computeBomMetrics, getCurrentUserId } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { ProgressBar } from "@/components/ProgressBar";

interface DonationFlowProps {
  project: Project;
}

type Mode = "unit" | "percentage" | "amount";

export function DonationFlow({ project }: DonationFlowProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState<string>(project.bom[0]?.id ?? "");
  const [mode, setMode] = useState<Mode>("amount");
  const [quantity, setQuantity] = useState(1);
  const [percent, setPercent] = useState(10);
  const [amount, setAmount] = useState(5000);
  const [donorName, setDonorName] = useState("Anónimo");
  const [donorId] = useState(getCurrentUserId());
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const selectedItem = useMemo(
    () => project.bom.find((item) => item.id === selectedItemId) ?? project.bom[0],
    [project.bom, selectedItemId]
  );

  const computedAmount = useMemo(() => {
    if (!selectedItem) return amount;

    if (mode === "unit" && selectedItem.unitPrice) {
      return quantity * selectedItem.unitPrice;
    }

    if (mode === "percentage" && selectedItem.totalPrice) {
      return Math.round((selectedItem.totalPrice * percent) / 100);
    }

    return amount;
  }, [amount, mode, percent, quantity, selectedItem]);

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
    setIsOpen(true);
  };

  const handleConfirm = async () => {
    const response = await fetch(`/api/projects/${project.id}/donations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: selectedItem?.id,
        amount: computedAmount,
        donorId,
        donorName
      })
    });

    if (response.ok) {
      setSuccessMessage(
        selectedItem?.type === "unit"
          ? `Financiaste ${quantity} ${selectedItem.name}`
          : selectedItem
            ? `Aportaste a ${selectedItem.name}`
            : "Gracias por tu aporte"
      );
      setStep(3);
      router.refresh();
    }
  };

  const badgeLabel = selectedItem?.type === "unit" ? "Builder Nivel 1" : "Builder Nivel 2";
  const isClosed = project.status !== "Approved";

  return (
    <>
      {isClosed && (
        <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Este proyecto está en estado {project.status}. Las donaciones están pausadas.
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
                      ? `${item.qty} unidades · ${formatCurrency(item.unitPrice)} c/u`
                      : item.totalPrice
                        ? `${formatCurrency(item.totalPrice)} total`
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
              <h3 className="text-lg font-semibold text-ink">Donación</h3>
              <button onClick={() => setIsOpen(false)} className="text-sm text-steel">
                Cerrar
              </button>
            </div>

            {step === 1 && (
              <div className="mt-4 space-y-4">
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
                    <label className="text-xs font-semibold uppercase text-steel">Monto libre</label>
                    <input
                      type="number"
                      min={100}
                      value={amount}
                      onChange={(event) => setAmount(Number(event.target.value))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
                    />
                  </div>
                )}

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
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
                  <p className="font-semibold text-ink">Resumen</p>
                  <p className="mt-2 text-steel">Pieza: {selectedItem?.name}</p>
                  <p className="text-steel">Aporte: {formatCurrency(computedAmount)}</p>
                </div>

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
                  onClick={handleConfirm}
                  className="w-full rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
                >
                  Confirmar donación
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
