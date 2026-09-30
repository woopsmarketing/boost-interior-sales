import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { ASSETS } from "@/lib/assets";
import { DEMO_URL } from "@/lib/site";

/** 실제 데모 — send the owner to the live demo site to try it as a customer. */
export function LiveDemo() {
  const shot = ASSETS.chatWidget;
  return (
    <Section id="live" aria-labelledby="live-title">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,440px)] items-center gap-24 narrow:grid-cols-1 narrow:gap-14 mobile:gap-9">
        <div data-reveal>
          <SceneHeader
            eyebrow="실제 데모"
            titleId="live-title"
            title="직접 고객이 되어 사용해보세요."
            sub="실제 인테리어 데모 홈페이지에서 이렇게 말해보세요."
          />
          <p className="mt-10 mb-0 rounded-xl bg-white px-8 py-[26px] text-[26px] leading-[1.45] font-semibold tracking-[-0.02em] text-ink shadow-md mobile:mt-7 mobile:px-[22px] mobile:py-5 mobile:text-[19px]">
            “32평인데 주방과 욕실을 리모델링하고 싶어요”
          </p>
          <div className="mt-8">
            <ButtonLink href={DEMO_URL} external size="lg" arrow>
              실제 데모 체험하기
            </ButtonLink>
          </div>
        </div>
        <div data-reveal>
          <Image
            src={shot.src}
            width={shot.width}
            height={shot.height}
            alt={shot.alt}
            sizes="440px"
            quality={85}
            className="mx-auto block h-auto w-full max-w-[440px] [filter:drop-shadow(0_30px_50px_rgba(16,24,40,.14))] [transform:perspective(1800px)_rotateY(-4deg)] narrow:[transform:none]"
          />
        </div>
      </div>
    </Section>
  );
}
