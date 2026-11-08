import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

// Home plus every page in the main nav. Add extra routes (project detail
// pages, blog posts) here as they are built.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...siteConfig.nav.map((item) => ({
      url: absoluteUrl(item.href),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
