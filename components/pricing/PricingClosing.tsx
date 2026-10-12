import { BackToPricing } from "@/components/pricing/PricingIntro";
import { ButtonLink } from "@/components/ui/Button";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { PRICING_FAQ } from "@/lib/pricing-page";
import { DEMO_LABEL, DEMO_URL, KAKAO_NOTE, KAKAO_OPEN_CHAT_URL, KAKAO_RECOMMEND_LABEL, PRICING_FAQ_ID } from "@/lib/site";

/** FAQ — every question about price and conditions. The landing and the feature pages keep their own and link here for these. */
export function PricingFaq() {
  return (
    <Section id={PRICING_FAQ_ID} aria-labelledby="faq-title" pt="pt-32 mobile:pt-20" pb="pb-0" className="scroll-mt-8">
      <div className="grid grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start gap-14 narrow:grid-cols-1 narrow:gap-9 mobile:gap-7">
        <div data-reveal>
          <SceneHeader size="md" eyebrow="자주 묻는 질문" titleId="faq-title" title="결정하기 전에 확인할 것들." />
        </div>
        <div data-reveal>
          <FaqList items={PRICING_FAQ} />
        </div>
      </div>
      <FaqJsonLd items={PRICING_FAQ} />
    </Section>
  );
}

/**
 * Final step — which product fits is confirmed in the KakaoTalk chat; nothing is collected or paid
 * on this page. `back` (the details page) adds the way back to the summary.
 */
export function PricingCta({ back = false }: { back?: boolean }) {
  return (
    <Section id="contact" aria-labelledby="pricing-cta-title" pt="pt-32 mobile:pt-20" pb="pb-30 mobile:pb-16">
      <div
        data-reveal
        className="flex items-center justify-between gap-10 rounded-2xl border border-blue-200 bg-white px-12 py-11 shadow-window narrow:flex-col narrow:items-start narrow:gap-7 mobile:rounded-xl mobile:p-6"
      >
        <div>
          <h2
            id="pricing-cta-title"
            className="m-0 text-[30px] leading-[1.3] font-bold tracking-[-0.03em] text-balance text-ink mobile:text-[22px]"
          >
            우리 업체에는 어떤 상품이 맞을까요?
          </h2>
          <p className="mt-3 mb-0 text-[17px] leading-[1.6] text-pretty text-muted mobile:text-[16px]">
            업체명과 홈페이지 주소(있다면)만 보내주세요. 현재 상황을 확인한 뒤 맞는 구독과 홈페이지 제작 방식을 안내드립니다.
          </p>
        </div>
        <div className="flex-none max-[480px]:w-full">
          <div className="flex flex-wrap gap-3 max-[480px]:grid">
            <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" arrow>
              {KAKAO_RECOMMEND_LABEL}
            </ButtonLink>
            <ButtonLink href={DEMO_URL} external size="lg" variant="secondary">
              {DEMO_LABEL}
            </ButtonLink>
          </div>
          <p className="mt-3 mb-0 text-[13px] leading-[1.6] text-muted">{KAKAO_NOTE}</p>
        </div>
      </div>
      {back && (
        <p data-reveal className="mt-6 mb-0">
          <BackToPricing />
        </p>
      )}
    </Section>
  );
}
