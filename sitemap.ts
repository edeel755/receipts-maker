import type { MetadataRoute } from "next";
import { routes, site } from "@/lib/site";

const staticRoutes = [
  routes.home,
  routes.receiptMaker,
  routes.receiptGenerator,
  routes.templates,
  routes.features,
  routes.pricing,
  routes.blog,
  "/legal/privacy",
  "/legal/terms",
  "/legal/disclaimer",
  "/legal/cookies",
  "/legal/acceptable-use"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7
  }));
}

