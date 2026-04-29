import type { ReceiptDraft } from "@/lib/receipt/types";

const symbols: Record<ReceiptDraft["currency"], string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  PKR: "₨",
  INR: "₹",
  AED: "د.إ"
};

export function formatMoney(amount: number, currency: ReceiptDraft["currency"]) {
  const symbol = symbols[currency] ?? "";
  const n = Number.isFinite(amount) ? amount : 0;
  return `${symbol}${n.toFixed(2)}`;
}

