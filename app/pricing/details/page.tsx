import type { ResolvingMetadata } from "next";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { MotionController } from "@/components/motion/MotionController";
import { Partner } from "@/components/landing/Partner";
import { PricingCta, PricingFaq } from "@/components/pricing/PricingClosing";
import { DetailsHero, TwoPrices } from "@/components/pricing/PricingIntro";
import { PlanSection } from "@/components/pricing/PlanSection";
import { SetupSection } from "@/components/pricing/SetupSection";
import { pageMetadata } from "@/lib/page-metadata";
import { PRICING_DETAILS_DESCRIPTION, PRICING_DETAILS_PATH, PRICING_DETAILS_TITLE } from "@/lib/site";

export function generateMetadata(_props: PageProps<"/pricing/details">, parent: ResolvingMetadata) {
  return pageMetadata(parent, {
    path: PRICING_DETAILS_PATH,
    title: PRICING_DETAILS_TITLE,
    description: PRICING_DETAILS_DESCRIPTION,
  });
}

/**
 * 상세 가격 — the page read right before deciding, for the exact scope: every price in one summary
 * with the jumps into the page, what each of the four setups includes, what each monthly plan
 * carries, and the questions about price and scope. The choice itself is made on /pricing.
 */
export default function PricingDetailsPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-pill bg-ink text-[14px] font-semibold text-white no-underline focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:px-4 focus:py-2.5 focus:text-white"
      >
        본문으로 건너뛰기
      </a>
      <SiteHeader page="pricing-details" />
      <main id="main">
        <DetailsHero />
        <TwoPrices />
        <SetupSection />
        <PlanSection />
        <PricingFaq />
        <Partner />
        <PricingCta back />
      </main>
      <SiteFooter note={null} />
      <MotionController />
    </>
  );
}
