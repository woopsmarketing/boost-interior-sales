import { ReelCard } from "@/components/media/ReelCard";
import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { REEL_SAMPLES, REEL_TAKE } from "@/lib/home";
import { sample } from "@/lib/media";
import { KAKAO_LABEL, KAKAO_OPEN_CHAT_URL } from "@/lib/site";

/**
 * 제품이 만든 영상 — the result before the explanation: the two reels the product made from the demo
 * 시공사례, as they came out. They play on a press and stay in the page; what their photos are is
 * the text under each.
 */
export function ReelSamples() {
  const reels = [
    { ...REEL_SAMPLES.showcase, reel: sample("SAMPLE-01") },
    { ...REEL_SAMPLES.beforeAfter, reel: sample("SAMPLE-02") },
  ];
  return (
    <Section id="samples" aria-labelledby="samples-title" pt="pt-24 mobile:pt-14" pb="pb-24 mobile:pb-14" className="mt-28 scroll-mt-0 bg-gray-950 mobile:mt-16">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-16 gap-y-9 narrow:grid-cols-1">
        <div data-reveal>
          <SceneHeader
            tone="dark"
            size="md"
            eyebrow="제품이 만든 릴스 · 쇼츠 영상"
            titleId="samples-title"
            title={
              <>
                설명보다 먼저, <Br />
                결과물을 확인하세요.
              </>
            }
            sub="두 편 모두 제품이 데모 시공사례의 사진으로 만든 그대로입니다. 글자를 더하거나 다시 편집하지 않았습니다."
            subSize="md"
            subClassName="mobile:text-[16px]"
          />
          <p className="mt-6 mb-0 max-w-[560px] border-t border-white/12 pt-6 text-[15.5px] leading-[1.65] text-pretty text-gray-300 mobile:mt-5 mobile:pt-5 mobile:text-[15px]">
            {REEL_TAKE}
          </p>
          <ButtonLink href={KAKAO_OPEN_CHAT_URL} external arrow className="mt-7 mobile:mt-6 max-[480px]:w-full">
            {KAKAO_LABEL}
          </ButtonLink>
        </div>
        <div
          data-reveal
          className="flex gap-5 phone:-mx-5 phone:snap-x phone:snap-mandatory phone:scroll-pl-5 phone:gap-3 phone:overflow-x-auto phone:px-5 phone:[scrollbar-width:none]"
        >
          {reels.map(({ title, facts, reel }) => (
            <ReelCard key={reel.id} reel={reel} title={title} facts={facts} sizes="250px" className="w-[250px] flex-none phone:w-[240px] phone:snap-start" />
          ))}
        </div>
      </div>
    </Section>
  );
}
