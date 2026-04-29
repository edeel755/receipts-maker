export type ReceiptTemplateSlug = (typeof receiptTemplates)[number]["slug"];

export const receiptTemplates = [
  {
    slug: "minimal",
    name: "Minimal",
    description: "Clean whitespace, simple lines, great for most businesses."
  },
  {
    slug: "modern",
    name: "Modern",
    description: "Bold totals, better hierarchy, premium look."
  },
  {
    slug: "thermal",
    name: "Thermal",
    description: "Compact mono vibe similar to POS receipts."
  }
] as const;

export type SeoTemplatePage = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  useCases: string[];
  faqs: Array<{ q: string; a: string }>;
};

export const programmaticTemplatePages: SeoTemplatePage[] = [
  {
    slug: "restaurant-receipt",
    shortTitle: "Restaurant receipt",
    title: "Restaurant Receipt Template (Free Receipt Maker)",
    description:
      "Create a restaurant receipt in seconds. Add menu items, quantity, tax, discounts, and payment method. Download as PDF or print.",
    useCases: ["Cafes", "Food trucks", "Dine-in", "Takeaway", "Delivery"],
    faqs: [
      { q: "Can I include tax and service charges?", a: "Yes. Add tax and optional notes for service charges or tips." },
      { q: "Can I add my restaurant logo?", a: "Yes. Upload a logo to brand the receipt." }
    ]
  },
  {
    slug: "taxi-receipt",
    shortTitle: "Taxi receipt",
    title: "Taxi Receipt Template (Printable + PDF)",
    description:
      "Generate a taxi receipt with date/time, fare items, tax, and payment method. Share it via link or WhatsApp.",
    useCases: ["Taxi drivers", "Ride services", "Business travel reimbursements"],
    faqs: [
      { q: "Can I include pickup/drop notes?", a: "Yes. Add custom notes on the receipt." },
      { q: "Does it work on mobile?", a: "Yes. Designed for fast one-hand use." }
    ]
  },
  {
    slug: "grocery-receipt",
    shortTitle: "Grocery receipt",
    title: "Grocery Receipt Template (Fast Receipt Generator)",
    description:
      "Create a grocery receipt quickly with multiple items and quantities. Print or export as PDF.",
    useCases: ["Small grocery stores", "Corner shops", "Market stalls"],
    faqs: [
      { q: "Can I add many line items quickly?", a: "Yes. Fast Mode is designed for under-5-second receipts." },
      { q: "Can I reuse common items?", a: "Yes (after signup). Save products for one-tap adding." }
    ]
  }
];

