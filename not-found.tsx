import Link from "next/link";
import { routes } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="container-page py-16">
      <div className="card mx-auto max-w-xl p-8 text-center">
        <div className="text-sm font-semibold text-slate-500">404</div>
        <h1 className="mt-2 text-2xl font-black tracking-tight">Page not found</h1>
        <p className="mt-2 text-sm text-slate-600">
          The page you’re looking for doesn’t exist. Try creating a receipt instead.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Link href={routes.receiptMaker} className="btn-primary">
            Create receipt
          </Link>
          <Link href={routes.home} className="btn-ghost">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

