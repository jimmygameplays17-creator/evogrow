"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { demoRates, DisplayCurrency } from "@/lib/currency";

interface CurrencyContextValue {
  currency: DisplayCurrency;
  setCurrency: (currency: DisplayCurrency) => void;
  rates: typeof demoRates;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<DisplayCurrency>("MXN");
  const value = useMemo(() => ({ currency, setCurrency, rates: demoRates }), [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
};
