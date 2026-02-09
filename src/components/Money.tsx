"use client";

import { convertFromMXN, formatCurrency } from "@/lib/currency";
import { useCurrency } from "@/components/CurrencyProvider";

export function Money({ amount }: { amount: number }) {
  const { currency, rates } = useCurrency();
  const converted = convertFromMXN(amount, currency, rates);
  return <span>{formatCurrency(converted, currency)}</span>;
}
