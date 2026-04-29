import type { Metadata } from "next";
import { site } from "@/lib/site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  imagePath?: string;
  noIndex?: boolean;
};

export function buildMetadata(input: SeoInput): Metadata {
  const url = new URL(input.path ?? "/", site.url).toString();
  const images = input.imagePath
    ? [{ url: new URL(input.imagePath, site.url).toString(), width: 1200, height: 630 }]
    : undefined;

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    robots: input.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: input.title,
      description: input.description,
      images
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: images?.map((i) => i.url)
    }
  };
}

