import jsPDF from "jspdf";
import type { ReceiptDraft } from "@/lib/receipt/types";
import { calcTotals } from "@/lib/receipt/calc";

function fmtMoney(n: number, currency: ReceiptDraft["currency"]) {
  const symbols: Record<ReceiptDraft["currency"], string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    PKR: "₨",
    INR: "₹",
    AED: "د.إ"
  };
  return `${symbols[currency] ?? ""}${n.toFixed(2)}`;
}

export async function downloadReceiptPdf(draft: ReceiptDraft) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 40;
  let y = margin;

  const totals = calcTotals(draft);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(draft.businessName || "Receipt", margin, y);
  y += 18;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  if (draft.businessAddress) {
    doc.text(draft.businessAddress, margin, y);
    y += 12;
  }
  if (draft.businessPhone) {
    doc.text(draft.businessPhone, margin, y);
    y += 12;
  }

  y += 10;
  doc.setDrawColor(230);
  doc.line(margin, y, 555, y);
  y += 18;

  doc.setFont("helvetica", "bold");
  doc.text("Receipt No:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(draft.receiptNo || "—", margin + 70, y);

  doc.setFont("helvetica", "bold");
  doc.text("Date:", 370, y);
  doc.setFont("helvetica", "normal");
  doc.text(draft.issueDate || "—", 410, y);
  y += 16;

  doc.setFont("helvetica", "bold");
  doc.text("Customer:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(draft.customerName || "Walk-in customer", margin + 70, y);
  y += 18;

  // Table header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Item", margin, y);
  doc.text("Qty", 340, y, { align: "right" });
  doc.text("Price", 445, y, { align: "right" });
  doc.text("Total", 555, y, { align: "right" });
  y += 10;
  doc.setLineWidth(1);
  doc.line(margin, y, 555, y);
  y += 14;

  doc.setFont("helvetica", "normal");
  for (const item of draft.items) {
    const name = item.name || "Item";
    const qty = Number.isFinite(item.qty) ? item.qty : 0;
    const price = Number.isFinite(item.price) ? item.price : 0;
    const lineTotal = qty * price;

    const lines = doc.splitTextToSize(name, 290);
    doc.text(lines, margin, y);
    doc.text(String(qty), 340, y, { align: "right" });
    doc.text(fmtMoney(price, draft.currency), 445, y, { align: "right" });
    doc.text(fmtMoney(lineTotal, draft.currency), 555, y, { align: "right" });

    y += Math.max(14, lines.length * 12);
    if (y > 760) {
      doc.addPage();
      y = margin;
    }
  }

  y += 10;
  doc.setDrawColor(230);
  doc.line(margin, y, 555, y);
  y += 18;

  doc.setFont("helvetica", "normal");
  doc.text("Subtotal", 445, y, { align: "right" });
  doc.setFont("helvetica", "bold");
  doc.text(fmtMoney(totals.subtotal, draft.currency), 555, y, { align: "right" });
  y += 14;

  doc.setFont("helvetica", "normal");
  doc.text(`Tax (${draft.taxRate || 0}%)`, 445, y, { align: "right" });
  doc.setFont("helvetica", "bold");
  doc.text(fmtMoney(totals.tax, draft.currency), 555, y, { align: "right" });
  y += 14;

  if (totals.discount > 0) {
    doc.setFont("helvetica", "normal");
    doc.text("Discount", 445, y, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.text(`- ${fmtMoney(totals.discount, draft.currency)}`, 555, y, { align: "right" });
    y += 14;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Total", 445, y, { align: "right" });
  doc.text(fmtMoney(totals.total, draft.currency), 555, y, { align: "right" });

  y += 22;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Payment: ${draft.paymentMethod.replaceAll("_", " ")}`, margin, y);
  y += 14;
  if (draft.notes) {
    const noteLines = doc.splitTextToSize(draft.notes, 515);
    doc.text(noteLines, margin, y);
  }

  const filename = `receipt-${draft.receiptNo || "draft"}.pdf`;
  doc.save(filename);
}

