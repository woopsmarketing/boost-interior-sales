import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { ASSETS, CHAT_WINDOW, cropStyles } from "@/lib/assets";
import { DEMO_COMPANY, DEMO_LABEL, DEMO_PROMPT, DEMO_URL, LIVE_ID, SITE_NAME } from "@/lib/site";

/**
 * 실제 데모 — send the owner to the live demo site to try it as a customer. The demo opens on the
 * homepage of a made-up company, so this says what will open, where the chat button is and what
 * to type before the click.
 */
export function LiveDemo() {
  const shot = ASSETS.chatWidget;
  const { box, img } = cropStyles(shot, CHAT_WINDOW);
  return (
    <Section id={LIVE_ID} aria-labelledby="live-title" pt="pt-36 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,400px)] items-center gap-24 narrow:grid-cols-1 narrow:gap-12">
        <div data-reveal>
          <SceneHeader
            eyebrow="실제 데모"
            titleId="live-title"
            titleClassName="mobile:text-[28px]"
            title="직접 고객이 되어 사용해보세요."
            sub={`가상 인테리어 업체 ‘${DEMO_COMPANY}’ 홈페이지에 ${SITE_NAME}가 연결되어 있습니다. 화면 오른쪽 아래 상담 버튼을 누르고 이렇게 말해보세요.`}
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
        {/* The same chat window the hero and the steps show: left out below 1100px, where it would only add length. */}
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
    </Section>
  );
}
