import Link from "next/link";
import { routes, site } from "@/lib/site";

const nav = [
  { href: routes.features, label: "Features" },
  { href: routes.templates, label: "Templates" },
  { href: routes.pricing, label: "Pricing" },
  { href: routes.blog, label: "Blog" }
];

export function Nav() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href={routes.home} className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-xl bg-brand-600 text-sm font-black text-white">
            RM
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">{site.name}</div>
            <div className="text-xs text-slate-500">Receipt generator + mini-CRM</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((i) => (
            <Link key={i.href} href={i.href} className="text-sm font-medium text-slate-700 hover:text-slate-900">
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href={routes.receiptMaker} className="btn-primary">
            Create receipt
          </Link>
          <Link href={routes.signin} className="btn-ghost hidden sm:inline-flex">
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}

