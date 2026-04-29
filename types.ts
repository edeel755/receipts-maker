export type PaymentMethod = "cash" | "card" | "bank_transfer" | "mobile_money" | "other";

export type ReceiptItemDraft = {
  id: string;
  name: string;
  qty: number;
  price: number;
};

export type ReceiptDraft = {
  template: "minimal" | "modern" | "thermal";
  currency: "USD" | "EUR" | "GBP" | "PKR" | "INR" | "AED";
  receiptNo: string;
  issueDate: string; // ISO yyyy-mm-dd
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  paymentMethod: PaymentMethod;
  taxRate: number; // percentage, e.g. 5
  items: ReceiptItemDraft[];
  logoDataUrl?: string;
  discount: number; // absolute
};

