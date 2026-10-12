import type { MetadataRoute } from "next";
import { NAV_FEATURES, PRICING_DETAILS_PATH, PRICING_PATH, SITE_URL } from "@/lib/site";

/** Every page of the site: the landing, the three feature pages and the two pricing pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    ...NAV_FEATURES.map((feature) => ({ url: `${SITE_URL}${feature.path}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: `${SITE_URL}${PRICING_PATH}`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}${PRICING_DETAILS_PATH}`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
