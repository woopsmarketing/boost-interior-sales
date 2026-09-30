import { Br } from "@/components/ui/Br";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { ASSETS } from "@/lib/assets";
import { DEMO_VIDEO_ID, VIDEOS } from "@/lib/site";
import { DemoVideoPlayer } from "./DemoVideoPlayer";

/** 데모 영상 — the real 86-second walkthrough (master-sales.mp4). */
export function DemoVideo() {
  return (
    <Section id={DEMO_VIDEO_ID} aria-labelledby="demo-video-title" pb="pb-30 mobile:pb-22">
      <div data-reveal>
        <SceneHeader
          eyebrow="데모 영상 · 1분 26초"
          titleId="demo-video-title"
          title={
            <>
              말보다 빠르게, <Br />
              실제 작동 모습을 확인해보세요.
            </>
          }
          sub={
            <>
              고객이 말을 시작하고, 사례를 보고, <Br />
              견적 문의를 남기기까지 실제 흐름입니다.
            </>
          }
        />
      </div>
      <div data-reveal className="mt-16 mobile:mt-8">
        <DemoVideoPlayer
          src={VIDEOS.master.src}
          duration={VIDEOS.master.duration}
          poster={ASSETS.sceneConversation}
          caption="대화 → 사례 추천 → 사진 → 견적 문의"
        />
      </div>
    </Section>
  );
}
