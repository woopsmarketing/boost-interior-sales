import { DecisionHelper } from "@/components/pricing/DecisionHelper";
import { PortfolioSample } from "@/components/pricing/PortfolioSample";
import { Starter } from "@/components/pricing/Starter";
import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { ENTRY_HEADLINE } from "@/lib/home";
import { KAKAO_OPEN_CHAT_URL, KAKAO_RECOMMEND_LABEL, PRICING_ID, PRICING_PATH } from "@/lib/site";

/**
 * 가격 — the landing does not repeat the price list. It says how little it takes to start, lets the
 * owner find their own option by situation, and hands over to /pricing; the full scope is one page
 * further, from there.
 */
export function Pricing() {
  return (
    <Section id={PRICING_ID} aria-labelledby="pricing-title" pt="pt-36 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <div
        data-reveal
        className="grid items-center gap-x-14 gap-y-9 split:grid-cols-[minmax(0,1fr)_minmax(360px,440px)] mobile:gap-y-7"
      >
        <SceneHeader
          eyebrow="가격"
          titleId="pricing-title"
          titleClassName="mobile:text-[28px]"
          title={
            <>
              기존 홈페이지에 연결하면 <span className="text-accent">{ENTRY_HEADLINE.setup}</span>, <Br />
              운영은 <span className="text-accent">{ENTRY_HEADLINE.monthly}</span>부터.
            </>
          }
          sub="구축비는 처음 한 번, 운영 플랜은 매월입니다. 표시된 금액은 모두 부가세(VAT)가 포함된 최종 금액입니다."
          subClassName="mobile:text-[16px]"
        />
        <Starter vat={false} />
      </div>

      <div data-reveal className="mt-16 border-t border-line-strong pt-10 mobile:mt-8 mobile:pt-7">
        <h3 className="m-0 text-[28px] leading-[1.3] font-bold tracking-[-0.03em] text-ink mobile:text-[22px]">내 상황에 맞는 선택</h3>
        <DecisionHelper base={PRICING_PATH} className="mt-8 mobile:mt-5" />
      </div>

      <PortfolioSample className="mt-10" />

      <div
        data-reveal
        className="mt-10 flex items-center justify-between gap-10 rounded-xl border border-blue-200 bg-white px-10 py-8 shadow-window narrow:flex-col narrow:items-start narrow:gap-6 mobile:mt-8 mobile:p-6"
      >
        <p className="m-0 text-[22px] leading-[1.45] font-semibold tracking-[-0.02em] text-ink mobile:text-[18px]">
          잘 모르겠다면 홈페이지 주소만 보내주세요.
          <span className="mt-1 block text-[16px] leading-[1.6] font-normal tracking-normal text-muted mobile:text-[15px]">
            확인 후 맞는 구축 방식을 안내드립니다.
          </span>
        </p>
        <div className="flex flex-none flex-wrap gap-3 max-[480px]:grid max-[480px]:w-full">
          <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" arrow>
            {KAKAO_RECOMMEND_LABEL}
          </ButtonLink>
          <ButtonLink href={PRICING_PATH} size="lg" variant="secondary">
            가격 자세히 보기
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
