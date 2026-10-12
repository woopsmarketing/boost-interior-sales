import Image from "next/image";
import { MediaNote } from "@/components/media/MediaNote";
import { ButtonLink } from "@/components/ui/Button";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { ASSETS, CHAT_WINDOW, cropStyles } from "@/lib/assets";
import { SCREENS_NOTE } from "@/lib/home";
import { DEMO_COMPANY, DEMO_LABEL, DEMO_PROMPT, DEMO_URL, DEMO_VIDEO_ID, LIVE_ID, SITE_NAME, VIDEOS } from "@/lib/site";
import { DemoVideoPlayer } from "./DemoVideoPlayer";

/**
 * 실제 데모 — send the owner to the live demo site to try it as a customer. The demo opens on the
 * homepage of a made-up company, so this says what will open, where the chat button is and what
 * to type before the click.
 * Under it, for a reader who would rather watch: every screen of a consultation in one 86s film. It
 * is a cut of real screens, scene by scene — its form is never sent and the request in the admin is
 * a test one — and is described as that, never as one take. It plays on a press.
 * Outbound emails link to `#demo-video`, so the anchor stays. `#why` and `#problem` were sections of
 * earlier landings (why this, checked by trying it): links to them land here.
 */
export function LiveDemo() {
  const shot = ASSETS.chatWidget;
  const { box, img } = cropStyles(shot, CHAT_WINDOW);
  return (
    <Section id={LIVE_ID} aria-labelledby="live-title" pt="pt-36 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <span id="why" aria-hidden="true" className="block scroll-mt-4" />
      <span id="problem" aria-hidden="true" className="block scroll-mt-4" />
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,400px)] items-center gap-24 narrow:grid-cols-1 narrow:gap-12">
        <div data-reveal>
          <SceneHeader
            eyebrow="실제 데모"
            titleId="live-title"
            titleClassName="mobile:text-[28px]"
            title="직접 고객이 되어 사용해보세요."
            sub={`가상 인테리어 업체 ‘${DEMO_COMPANY}’의 홈페이지입니다. ${SITE_NAME}로 게시한 시공사례가 실려 있고, AI 상담이 연결되어 있습니다. 화면 오른쪽 아래 상담 버튼을 누르고 이렇게 말해보세요.`}
            subClassName="mobile:text-[16px]"
          />
          <p className="mt-8 mb-0 rounded-xl bg-white px-8 py-[26px] text-[26px] leading-[1.45] font-semibold tracking-[-0.02em] text-ink shadow-md mobile:mt-6 mobile:px-[22px] mobile:py-5 mobile:text-[19px]">
            “{DEMO_PROMPT}”
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 mobile:mt-6">
            <ButtonLink href={DEMO_URL} external size="lg" arrow className="max-[480px]:w-full">
              {DEMO_LABEL}
            </ButtonLink>
            <p className="m-0 text-[14px] leading-[1.5] text-muted">가입 없이 새 창에서 바로 열립니다.</p>
          </div>
        </div>
        {/* The chat window the demo opens: left out below 1100px, where it would only add length. */}
        <div data-reveal className="narrow:hidden">
          <div
            className="relative mx-auto w-full max-w-[400px] overflow-hidden shadow-float [transform:perspective(1800px)_rotateY(-4deg)]"
            style={box}
          >
            <Image
              src={shot.src}
              width={shot.width}
              height={shot.height}
              alt={shot.alt}
              sizes="400px"
              quality={85}
              className="absolute block h-auto"
              style={img}
            />
          </div>
        </div>
      </div>

      <div
        id={DEMO_VIDEO_ID}
        aria-labelledby="demo-video-title"
        role="region"
        className="mt-20 grid scroll-mt-24 grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start gap-x-14 gap-y-7 border-t border-line-strong pt-14 narrow:grid-cols-1 mobile:mt-12 mobile:pt-9"
      >
        <div data-reveal>
          <p className="m-0 text-[15px] leading-[1.4] font-bold text-accent">실제 제품 화면 · {VIDEOS.master.seconds}초</p>
          <h3
            id="demo-video-title"
            className="mt-3 mb-0 text-[clamp(24px,2.4vw,32px)] leading-[1.3] font-bold tracking-[-0.03em] text-balance text-ink mobile:text-[22px]"
          >
            상담부터 관리 화면까지, 장면별로 보기.
          </h3>
          <p className="mt-3 mb-0 text-[16px] leading-[1.65] text-pretty text-muted mobile:text-[15px]">
            상담, 시공사례 추천, 사진 확인, 견적 문의 양식, 관리 화면을 실제 제품 화면으로 이어 붙인 영상입니다. 양식은 촬영에서 전송하지
            않았고, 관리 화면의 문의는 따로 남긴 테스트 문의입니다.
          </p>
          <MediaNote className="mt-3">{SCREENS_NOTE}</MediaNote>
        </div>
        <div data-reveal>
          <DemoVideoPlayer
            src={VIDEOS.master.src}
            duration={VIDEOS.master.duration}
            poster={ASSETS.sceneConversation}
            chapters={VIDEOS.master.chapters}
          />
        </div>
      </div>
    </Section>
  );
}
