import type { Metadata, ResolvingMetadata } from "next";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { MotionController } from "@/components/motion/MotionController";
import { PartnerBand, PricingCta, PricingFaq } from "@/components/pricing/PricingClosing";
import { PricingHero, TwoPrices } from "@/components/pricing/PricingIntro";
import { PlanSection } from "@/components/pricing/PlanSection";
import { SetupSection } from "@/components/pricing/SetupSection";
import { PRICING_DESCRIPTION, PRICING_PATH, PRICING_TITLE, SITE_NAME } from "@/lib/site";

/**
 * Metadata merges shallowly: a page that sets `openGraph` / `twitter` replaces the layout's,
 * including the share image from app/opengraph-image.jpg. So both are restated here and the
 * parent's images are carried over.
 */
export async function generateMetadata(_props: PageProps<"/pricing">, parent: ResolvingMetadata): Promise<Metadata> {
  const { openGraph, twitter } = await parent;
  return {
    title: PRICING_TITLE,
    description: PRICING_DESCRIPTION,
    alternates: { canonical: PRICING_PATH },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: PRICING_PATH,
      siteName: SITE_NAME,
      title: PRICING_TITLE,
      description: PRICING_DESCRIPTION,
      images: openGraph?.images ?? [],
    },
    twitter: {
      card: "summary_large_image",
      title: PRICING_TITLE,
      description: PRICING_DESCRIPTION,
      images: twitter?.images ?? [],
    },
  };
}

/**
 * 가격 — the full scope behind every price: why there are two prices, what each of the four
 * setups includes, what each monthly plan carries, and the questions asked before deciding.
 */
export default function PricingPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-pill bg-ink text-[14px] font-semibold text-white no-underline focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:px-4 focus:py-2.5 focus:text-white"
      >
        본문으로 건너뛰기
      </a>
      <SiteHeader page="pricing" />
      <main id="main">
        <PricingHero />
        <TwoPrices />
        <SetupSection />
        <PlanSection />
        <PartnerBand />
        <PricingFaq />
        <PricingCta />
      </main>
      <SiteFooter note={null} />
      <MotionController />
    </>
  );
}
