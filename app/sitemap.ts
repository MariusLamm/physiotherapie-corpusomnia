import type { MetadataRoute } from "next";
import { locales } from "@/i18n";

const BASE_URL = "https://physiotherapie-corpusomnia.ch";

const pages = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/agb", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/datenschutz", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/impressum", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const alternateLanguages: Record<string, string> = {};
      for (const loc of locales) {
        alternateLanguages[loc] = `${BASE_URL}/${loc}${page.path}`;
      }

      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: alternateLanguages,
        },
      });
    }
  }

  return entries;
}
