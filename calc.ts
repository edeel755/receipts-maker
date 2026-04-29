import type { ReceiptDraft } from "@/lib/receipt/types";

function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function calcSubtotal(items: ReceiptDraft["items"]) {
  return round2(
    items.reduce((sum, i) => {
      const qty = Number.isFinite(i.qty) ? i.qty : 0;
      const price = Number.isFinite(i.price) ? i.price : 0;
      return sum + qty * price;
    }, 0)
  );
}

export function calcTaxAmount(subtotal: number, taxRatePct: number) {
  const r = Number.isFinite(taxRatePct) ? taxRatePct : 0;
  return round2((subtotal * r) / 100);
}

export function calcTotals(draft: ReceiptDraft) {
  const subtotal = calcSubtotal(draft.items);
  const tax = calcTaxAmount(subtotal, draft.taxRate);
  const discount = round2(Math.max(0, Number.isFinite(draft.discount) ? draft.discount : 0));
  const total = round2(Math.max(0, subtotal + tax - discount));
  return { subtotal, tax, discount, total };
}

