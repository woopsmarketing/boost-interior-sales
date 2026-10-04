import type { Metadata, ResolvingMetadata } from "next";
import { SITE_NAME } from "@/lib/site";

/**
 * Metadata for a page below the landing. Metadata merges shallowly: a page that sets `openGraph` /
 * `twitter` replaces the layout's, including the share image from app/opengraph-image.jpg. So both
 * are restated here and the parent's images are carried over.
 */
export async function pageMetadata(
  parent: ResolvingMetadata,
  { path, title, description }: { path: string; title: string; description: string },
): Promise<Metadata> {
  const { openGraph, twitter } = await parent;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      images: openGraph?.images ?? [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: twitter?.images ?? [],
    },
  };
}
