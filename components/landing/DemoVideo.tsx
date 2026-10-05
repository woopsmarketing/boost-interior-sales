import { Br } from "@/components/ui/Br";
import { Check } from "@/components/ui/CheckList";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { ASSETS } from "@/lib/assets";
import { DEMO_VIDEO_ID, VIDEOS } from "@/lib/site";
import { DemoVideoPlayer } from "./DemoVideoPlayer";

/** What the video settles before anything else is read. Each is stated in full further down the page. */
const FACTS = ["기존 홈페이지에도 연결 가능", "공개된 기존 시공사례 정리", "가격 전부 공개 · VAT 포함"];

/**
 * 실제 작동 영상 — proof before explanation: the real 86-second walkthrough (master-sales.mp4),
 * third on the page. It never plays on its own.
 */
export function DemoVideo() {
  return (
    <Section id={DEMO_VIDEO_ID} aria-labelledby="demo-video-title" pt="pt-32 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <div data-reveal>
        <SceneHeader
          eyebrow="실제 작동 영상 · 1분 26초"
          titleId="demo-video-title"
          titleClassName="mobile:text-[28px]"
          title={
            <>
              말보다 빠르게, <Br />
              실제 작동 모습을 확인해보세요.
            </>
          }
          sub="상담이 시작되어 관리 화면에 문의가 들어오기까지, 실제 제품이 작동하는 모습을 그대로 녹화했습니다."
          subClassName="mobile:text-[16px]"
        />
      </div>
      <div data-reveal className="mt-12 mobile:mt-7">
        <DemoVideoPlayer
          src={VIDEOS.master.src}
          duration={VIDEOS.master.duration}
          poster={ASSETS.sceneConversation}
          chapters={VIDEOS.master.chapters}
        />
      </div>
      <ul
        data-reveal
        className="mt-8 mb-0 flex list-none flex-wrap gap-x-9 gap-y-2.5 border-t border-line-strong p-0 pt-6 mobile:mt-5 mobile:gap-x-5 mobile:gap-y-1.5 mobile:pt-4"
      >
        {FACTS.map((fact) => (
          <li key={fact} className="flex gap-2.5 text-[17px] leading-[1.5] font-semibold text-ink mobile:gap-2 mobile:text-[14.5px]">
            <Check className="mt-[6px] size-4 text-accent mobile:mt-1 mobile:size-3.5" />
            {fact}
          </li>
        ))}
      </ul>
    </Section>
  );
}
