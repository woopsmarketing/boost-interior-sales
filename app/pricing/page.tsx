import type { ResolvingMetadata } from "next";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { MotionController } from "@/components/motion/MotionController";
import { Partner } from "@/components/landing/Partner";
import { PricingCta } from "@/components/pricing/PricingClosing";
import {
  Assurances,
  Decision,
  DetailsLink,
  PlanAdditions,
  PlanSummary,
  SetupSummary,
  SummaryHero,
} from "@/components/pricing/PricingSummary";
import { pageMetadata } from "@/lib/page-metadata";
import { PRICING_DESCRIPTION, PRICING_PATH, PRICING_TITLE } from "@/lib/site";

export function generateMetadata(_props: PageProps<"/pricing">, parent: ResolvingMetadata) {
  return pageMetadata(parent, { path: PRICING_PATH, title: PRICING_TITLE, description: PRICING_DESCRIPTION });
}

/**
 * 가격 — the page a choice is made on: the cheapest way in, which option answers which situation,
 * one card per setup option and plan, what holds whichever is picked, and what the higher plans add.
 * The full scope behind each price is on /pricing/details.
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
        <SummaryHero />
        <Decision />
        <SetupSummary />
        <PlanSummary />
        <Assurances />
        <PlanAdditions />
        <DetailsLink />
        <Partner />
        <PricingCta />
      </main>
      <SiteFooter note={null} />
      <MotionController />
    </>
  );
}
