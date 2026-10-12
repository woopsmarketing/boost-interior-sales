import { AllInOne } from "@/components/landing/AllInOne";
import { BlogDraft } from "@/components/landing/BlogDraft";
import { CaseBuilder } from "@/components/landing/CaseBuilder";
import { Consult } from "@/components/landing/Consult";
import { Contact } from "@/components/landing/Contact";
import { Faq } from "@/components/landing/Faq";
import { Hero } from "@/components/landing/Hero";
import { LiveDemo } from "@/components/landing/LiveDemo";
import { Outputs } from "@/components/landing/Outputs";
import { Partner } from "@/components/landing/Partner";
import { Pricing } from "@/components/landing/Pricing";
import { Reels } from "@/components/landing/Reels";
import { Website } from "@/components/landing/Website";
import { PageShell } from "@/components/layout/PageShell";

/**
 * Landing V3 — what a 시공사진 becomes and what happens to a visitor's question, product by product:
 * the claim, the four things on offer at a glance, AI 마케팅 (how, the reels it makes, the posts),
 * AI 상담, the homepage build, why the two subscriptions go together, try it, what it costs, the
 * questions, the early-partner benefits and the way to ask.
 * Each product gets one short block and a link to its own page; the films under the hero are 5–10s
 * clips that play by themselves, one at a time.
 * Every anchor the landing has carried so far is still on it: `#value` (Outputs), `#how`
 * (CaseBuilder), `#reels`, `#blog`, `#consult` `#talk` `#recommend` `#inquiry` `#owner` (Consult),
 * `#install` (Website), `#live` `#demo-video` `#why` `#problem` (LiveDemo), `#pricing`, `#faq`, `#partner`, `#contact`.
 * `#why` and `#problem` were sections of earlier landings; both now land on 실제 데모, where a visitor
 * checks the product for themselves.
 */
export default function Home() {
  return (
    <PageShell page="home">
      <Hero />
      <Outputs />
      <CaseBuilder />
      <Reels />
      <BlogDraft />
      <Consult />
      <Website />
      <AllInOne />
      <LiveDemo />
      <Pricing />
      <Faq />
      <Partner detail />
      <Contact />
    </PageShell>
  );
}
