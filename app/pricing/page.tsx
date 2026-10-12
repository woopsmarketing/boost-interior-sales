import type { ResolvingMetadata } from "next";
import { Partner } from "@/components/landing/Partner";
import { PageShell } from "@/components/layout/PageShell";
import { PricingCta } from "@/components/pricing/PricingClosing";
import {
  Assurances,
  DetailsLink,
  PricingHero,
  SetupSummary,
  Situations,
  SubscriptionSummary,
  TrialSummary,
} from "@/components/pricing/PricingSummary";
import { pageMetadata } from "@/lib/page-metadata";
import { PRICING_DESCRIPTION, PRICING_PATH, PRICING_TITLE } from "@/lib/site";

export function generateMetadata(_props: PageProps<"/pricing">, parent: ResolvingMetadata) {
  return pageMetadata(parent, { path: PRICING_PATH, title: PRICING_TITLE, description: PRICING_DESCRIPTION });
}

/**
 * 요금 안내 — the page a choice is made on: the three monthly subscriptions right under the title,
 * which one answers which situation, the four one-time homepage builds, the trial policy (said as a
 * policy: nothing of it can be started here), and what holds whichever is picked.
 * The conditions behind each price are on /pricing/details.
 */
export default function PricingPage() {
  return (
    <PageShell page={PRICING_PATH} footerNote={null}>
      <PricingHero />
      <SubscriptionSummary />
      <Situations />
      <SetupSummary />
      <TrialSummary />
      <Assurances />
      <DetailsLink />
      <Partner />
      <PricingCta />
    </PageShell>
  );
}
