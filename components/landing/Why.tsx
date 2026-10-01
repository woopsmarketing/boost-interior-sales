import { Br } from "@/components/ui/Br";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";

const BODY = "m-0 text-[19px] leading-[1.75] tracking-[-0.01em] text-pretty mobile:text-[17px]";

/** 만든 이유 — connecting ad/marketing visitors to an actual consultation. */
export function Why() {
  return (
    <Section id="why" aria-labelledby="why-title" pt="pt-30 mobile:pt-16">
      <div
        data-reveal
        className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-24 border-t border-line-strong pt-14 narrow:grid-cols-1 narrow:gap-8 mobile:gap-7 mobile:pt-8"
      >
        <SceneHeader
          eyebrow="만든 이유"
          size="md"
          titleId="why-title"
          title={
            <>
              광고로 방문자를 데려오는 것에서 <Br />
              끝나지 않도록 만들었습니다.
            </>
          }
        />
        <div className="grid max-w-[720px] gap-6 pt-[30px] narrow:pt-0">
          <p className={`${BODY} text-body`}>
            인테리어 업체는 블로그, 광고, SNS, 홈페이지를 통해 고객을 데려옵니다. 하지만 방문한 고객이 자기 조건에 맞는
            사례를 찾고, 궁금한 점을 해결하고, 실제 문의까지 남기는 과정은 별개입니다.
          </p>
          <p className={`${BODY} font-medium text-ink`}>
            BoostInterior는 새로운 홈페이지를 만드는 것보다 먼저, 이미 방문한 고객과 상담이 시작되는 지점을 개선하는 데서
            출발했습니다.
          </p>
        </div>
      </div>
    </Section>
  );
}
