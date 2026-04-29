import Image from "next/image";
import type { ReceiptDraft } from "@/lib/receipt/types";
import { calcTotals } from "@/lib/receipt/calc";
import { formatMoney } from "@/components/receipt/money";
import clsx from "clsx";

type Props = {
  draft: ReceiptDraft;
};

export function ReceiptPreview({ draft }: Props) {
  const totals = calcTotals(draft);
  const isThermal = draft.template === "thermal";

  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-soft",
        isThermal && "font-mono"
      )}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-lg font-black leading-tight">{draft.businessName || "Your business"}</div>
            {(draft.businessAddress || draft.businessPhone) && (
              <div className="mt-1 text-xs text-slate-600">
                {draft.businessAddress && <div className="truncate">{draft.businessAddress}</div>}
                {draft.businessPhone && <div className="truncate">{draft.businessPhone}</div>}
              </div>
            )}
          </div>

          {draft.logoDataUrl && (
            <div className="shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <Image
                src={draft.logoDataUrl}
                alt="Business logo"
                width={56}
                height={56}
                className="size-14 object-contain"
              />
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-slate-700">
          <div>
            <div className="font-semibold text-slate-500">Receipt</div>
            <div className="mt-1">
              <span className="font-semibold">No:</span> {draft.receiptNo || "—"}
            </div>
            <div>
              <span className="font-semibold">Date:</span> {draft.issueDate || "—"}
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-slate-500">Bill to</div>
            <div className="mt-1 truncate font-semibold">{draft.customerName || "Walk-in customer"}</div>
            {draft.customerPhone && <div className="truncate">{draft.customerPhone}</div>}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className={clsx("bg-slate-50 text-xs text-slate-600", draft.template === "modern" && "bg-brand-50")}>
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Item</th>
                <th className="px-3 py-2 text-right font-semibold">Qty</th>
                <th className="px-3 py-2 text-right font-semibold">Price</th>
                <th className="px-3 py-2 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {draft.items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-sm text-slate-500">
                    Add items to see the receipt preview.
                  </td>
                </tr>
              ) : (
                draft.items.map((i) => (
                  <tr key={i.id} className="border-t border-slate-200">
                    <td className="px-3 py-2">
                      <div className="font-semibold text-slate-900">{i.name || "Item"}</div>
                    </td>
                    <td className="px-3 py-2 text-right text-slate-700">{Number.isFinite(i.qty) ? i.qty : 0}</td>
                    <td className="px-3 py-2 text-right text-slate-700">
                      {formatMoney(i.price || 0, draft.currency)}
                    </td>
                    <td className="px-3 py-2 text-right font-semibold text-slate-900">
                      {formatMoney((i.qty || 0) * (i.price || 0), draft.currency)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-2 text-sm">
          <div className="flex items-center justify-between text-slate-700">
            <div>Subtotal</div>
            <div className="font-semibold">{formatMoney(totals.subtotal, draft.currency)}</div>
          </div>
          <div className="flex items-center justify-between text-slate-700">
            <div>Tax ({draft.taxRate || 0}%)</div>
            <div className="font-semibold">{formatMoney(totals.tax, draft.currency)}</div>
          </div>
          {totals.discount > 0 && (
            <div className="flex items-center justify-between text-slate-700">
              <div>Discount</div>
              <div className="font-semibold">- {formatMoney(totals.discount, draft.currency)}</div>
            </div>
          )}
          <div
            className={clsx(
              "mt-2 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2",
              draft.template === "modern" && "border-brand-200 bg-brand-50"
            )}
          >
            <div className="text-sm font-black">Total</div>
            <div className="text-base font-black">{formatMoney(totals.total, draft.currency)}</div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
          <div className="flex items-center justify-between gap-3">
            <div className="font-semibold text-slate-500">Payment method</div>
            <div className="font-semibold">
              {draft.paymentMethod === "bank_transfer"
                ? "Bank transfer"
                : draft.paymentMethod === "mobile_money"
                  ? "Mobile money"
                  : draft.paymentMethod === "card"
                    ? "Card"
                    : draft.paymentMethod === "cash"
                      ? "Cash"
                      : "Other"}
            </div>
          </div>
          {draft.notes && <div className="mt-2 whitespace-pre-wrap text-slate-600">{draft.notes}</div>}
        </div>

        <div className="mt-6 text-center text-[11px] text-slate-500">
          Generated with <span className="font-semibold">Receipt Maker</span>
        </div>
      </div>
    </div>
  );
}

