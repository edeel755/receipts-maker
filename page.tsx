import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, softwareAppJsonLd } from "@/components/SeoJsonLd";
import { buildMetadata } from "@/lib/seo";
import { programmaticTemplatePages } from "@/lib/templates";
import { routes, site } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

function getPage(slug: string) {
  return programmaticTemplatePages.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return buildMetadata({ title: "Template", description: "Receipt template.", path: routes.templates, noIndex: true });

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/templates/${page.slug}`
  });
}

export default async function TemplateSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  const pageUrl = new URL(`/templates/${page.slug}`, site.url).toString();

  return (
    <div className="container-page py-12">
      <JsonLd
        data={[
          softwareAppJsonLd({ name: site.name, url: site.url, description: site.tagline }),
          breadcrumbJsonLd([
            { name: "Home", url: site.url },
            { name: "Templates", url: new URL(routes.templates, site.url).toString() },
            { name: page.shortTitle, url: pageUrl }
          ]),
          faqJsonLd(page.faqs)
        ]}
      />

      <header className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight">{page.title}</h1>
        <p className="mt-3 text-slate-700">{page.description}</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link href={routes.receiptMaker} className="btn-secondary">
            Create this receipt
          </Link>
          <Link href={routes.templates} className="btn-ghost">
            All templates
          </Link>
        </div>
      </header>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <article className="card p-6">
          <h2 className="text-lg font-bold">What to include</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Business name + logo</li>
            <li>Date, receipt number, customer name</li>
            <li>Item list with quantity and price</li>
            <li>Tax, total, payment method</li>
            <li>Notes (policies, thank you message)</li>
          </ul>
        </article>
        <article className="card p-6">
          <h2 className="text-lg font-bold">Common use cases</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {page.useCases.map((u) => (
              <span key={u} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                {u}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Need to save customers or reuse items? Sign up after creating your first receipt.
          </p>
        </article>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-black tracking-tight">FAQ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {page.faqs.map((f) => (
            <div key={f.q} className="card p-5">
              <h3 className="text-sm font-bold">{f.q}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

