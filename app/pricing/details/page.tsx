import type { ResolvingMetadata } from "next";
import { Partner } from "@/components/landing/Partner";
import { PageShell } from "@/components/layout/PageShell";
import { PricingCta, PricingFaq } from "@/components/pricing/PricingClosing";
import { DetailsHero } from "@/components/pricing/PricingIntro";
import { ProductComparison } from "@/components/pricing/ProductComparison";
import { SetupSection } from "@/components/pricing/SetupSection";
import { SubscriptionDetails } from "@/components/pricing/SubscriptionDetails";
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
 * 상세 요금 — the page read right before deciding, for the exact conditions: the four products
 * against the same questions, each subscription in full with the trial policy, what connecting
 * AI 상담 consists of, the four homepage builds compared and one by one, and the questions about
 * price and conditions. The choice itself is made on /pricing.
 */
export default function PricingDetailsPage() {
  return (
    <PageShell page={PRICING_DETAILS_PATH} footerNote={null}>
      <DetailsHero />
      <ProductComparison />
      <SubscriptionDetails />
      <SetupSection />
      <PricingFaq />
      <Partner />
      <PricingCta back />
    </PageShell>
  );
}
