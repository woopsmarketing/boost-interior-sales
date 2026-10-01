import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { Contact } from "@/components/landing/Contact";
import { DemoVideo } from "@/components/landing/DemoVideo";
import { Hero } from "@/components/landing/Hero";
import { InstallPaths } from "@/components/landing/InstallPaths";
import { LiveDemo } from "@/components/landing/LiveDemo";
import { MobileScene } from "@/components/landing/MobileScene";
import { Partner } from "@/components/landing/Partner";
import { Pricing } from "@/components/landing/Pricing";
import { Problem } from "@/components/landing/Problem";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { StoryRail } from "@/components/landing/StoryRail";
import { StoryScene } from "@/components/landing/StoryScene";
import { Why } from "@/components/landing/Why";
import { MotionController } from "@/components/motion/MotionController";
import { INSTALL_SCENE, STORY_SCENES } from "@/lib/scenes";

/** Section order follows ui_kits/sales-landing/index.html (Claude Design, approved), plus Pricing before Partner. */
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
      <StoryRail />
      <main id="main">
        <Hero />
        <Problem />
        {STORY_SCENES.map((scene) => (
          <StoryScene key={scene.id} scene={scene} />
        ))}
        <MobileScene />
        <DemoVideo />
        <BeforeAfter />
        <Why />
        <StoryScene scene={INSTALL_SCENE} />
        <InstallPaths />
        <LiveDemo />
        <Pricing />
        <Partner />
        <Contact />
      </main>
      <SiteFooter />
      <MotionController />
    </>
  );
}
