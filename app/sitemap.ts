import type { MetadataRoute } from "next";
import { PRICING_PATH, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}${PRICING_PATH}`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
