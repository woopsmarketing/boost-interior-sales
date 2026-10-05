import { Contact } from "@/components/landing/Contact";
import { DemoVideo } from "@/components/landing/DemoVideo";
import { Faq } from "@/components/landing/Faq";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LiveDemo } from "@/components/landing/LiveDemo";
import { Onboarding } from "@/components/landing/Onboarding";
import { OwnerResult } from "@/components/landing/OwnerResult";
import { Partner } from "@/components/landing/Partner";
import { Pricing } from "@/components/landing/Pricing";
import { Problem } from "@/components/landing/Problem";
import { QuickValue } from "@/components/landing/QuickValue";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Why } from "@/components/landing/Why";
import { MotionController } from "@/components/motion/MotionController";

/**
 * Landing V3 — in the order an owner decides: what it is, that it really works, why it is needed,
 * how it works, what arrives on the owner's side, try it, what it takes to start, what it costs,
 * and only then the questions, who is behind it, the early-partner benefits and the way to ask.
 */
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-pill bg-ink text-[14px] font-semibold text-white no-underline focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:px-4 focus:py-2.5 focus:text-white"
      >
        본문으로 건너뛰기
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <QuickValue />
        <DemoVideo />
        <Problem />
        <HowItWorks />
        <OwnerResult />
        <LiveDemo />
        <Onboarding />
        <Pricing />
        <Faq />
        <Why />
        <Partner detail />
        <Contact />
      </main>
      <SiteFooter />
      <MotionController />
    </>
  );
}
