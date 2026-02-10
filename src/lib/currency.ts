export type DisplayCurrency = "MXN" | "USD" | "EUR";

export const demoRates: Record<DisplayCurrency, number> = {
  MXN: 1,
  USD: 1 / 17,
  EUR: 1 / 18.5
};

export const convertFromMXN = (amount: number, currency: DisplayCurrency, rates = demoRates) =>
  amount * rates[currency];

export const convertToMXN = (amount: number, currency: DisplayCurrency, rates = demoRates) =>
  amount / rates[currency];

export const formatCurrency = (value: number, currency: DisplayCurrency) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
