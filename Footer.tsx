import Link from "next/link";
import { routes, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="text-sm font-semibold">{site.name}</div>
          <p className="mt-2 text-sm text-slate-600">{site.tagline}</p>
          <p className="mt-3 text-xs text-slate-500">Contact: {site.supportEmail}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="font-semibold text-slate-900">Product</div>
            <Link href={routes.receiptMaker} className="block text-slate-600 hover:text-slate-900">
              Receipt maker
            </Link>
            <Link href={routes.templates} className="block text-slate-600 hover:text-slate-900">
              Templates
            </Link>
            <Link href={routes.pricing} className="block text-slate-600 hover:text-slate-900">
              Pricing
            </Link>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-slate-900">Company</div>
            <Link href="/legal/privacy" className="block text-slate-600 hover:text-slate-900">
              Privacy
            </Link>
            <Link href="/legal/terms" className="block text-slate-600 hover:text-slate-900">
              Terms
            </Link>
            <Link href="/security" className="block text-slate-600 hover:text-slate-900">
              Security
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="text-sm font-semibold">Ready in 5 seconds</div>
          <p className="mt-1 text-sm text-slate-600">
            Guest mode lets you create receipts instantly. Sign up only when you want to save history.
          </p>
          <div className="mt-4 flex gap-2">
            <Link href={routes.receiptMaker} className="btn-secondary">
              Start free
            </Link>
            <Link href={routes.pricing} className="btn-ghost">
              See pricing
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-6">
        <div className="container-page flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/ads" className="hover:text-slate-700">
              Ads
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-700">
              Sitemap
            </Link>
            <Link href="/robots.txt" className="hover:text-slate-700">
              Robots
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

