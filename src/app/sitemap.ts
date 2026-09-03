import type { MetadataRoute } from "next";
import { getAllInsightSlugs } from "@/lib/insights";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cloudwalker.it";

  const staticPages = [
    "/",
    "/services/",
    "/products/",
    "/insights/",
    "/about/",
    "/contact/",
    "/privacy/",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const insightPages = getAllInsightSlugs().map((slug) => ({
    url: `${base}/insights/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...insightPages];
}
