import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { PARTNER_BENEFITS, PARTNER_TERMS } from "@/lib/partner";
import { PRICING_FAQ } from "@/lib/pricing-page";
import { DEMO_URL, KAKAO_OPEN_CHAT_URL, PARTNER_ID, SITE_NAME } from "@/lib/site";

/** Founding Partner in short — the full block lives on the landing, right under the hero. */
export function PartnerBand() {
  return (
    <Section id="founding-partner" aria-labelledby="founding-partner-title" pt="pt-32 mobile:pt-20" pb="pb-0">
      <div data-reveal className="rounded-2xl bg-inverse px-14 py-14 text-white narrow:px-10 mobile:rounded-xl mobile:px-5 mobile:py-9">
        <p className="m-0 text-[15px] leading-[1.4] font-bold text-blue-300">Founding Partner · 초기 파트너 혜택</p>
        <h2
          id="founding-partner-title"
          className="mt-3 mb-0 max-w-[820px] text-[36px] leading-[1.25] font-bold tracking-[-0.035em] text-balance narrow:text-[30px] mobile:text-[24px]"
        >
          지금 도입하는 초기 파트너에게는 가격표에 없는 혜택이 더 있습니다.
        </h2>
        <ul className="mt-8 mb-0 grid list-none grid-cols-3 gap-x-6 gap-y-4 p-0 narrow:grid-cols-2 mobile:mt-6 mobile:grid-cols-1 mobile:gap-y-3">
          {PARTNER_BENEFITS.map((benefit) => (
            <li key={benefit.title} className="flex items-center gap-3 text-[16px] leading-[1.4] font-semibold mobile:text-[15px]">
              <span className="grid size-9 flex-none place-items-center rounded-md bg-white/10 text-blue-300">
                <Icon name={benefit.icon} className="size-5" />
              </span>
              {benefit.title}
            </li>
          ))}
        </ul>
        <p className="mt-8 mb-0 max-w-[820px] text-[13px] leading-[1.6] text-gray-400 mobile:mt-6">{PARTNER_TERMS}</p>
        <p className="mt-6 mb-0">
          <Link
            href={`/#${PARTNER_ID}`}
            className="group inline-flex items-center gap-1.5 text-[15px] leading-[1.4] font-semibold text-white no-underline hover:text-white"
          >
            <span className="underline-offset-4 group-hover:underline">초기 파트너 혜택 자세히 보기</span>
            <span aria-hidden="true" className="transition-transform duration-160 ease-out group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </p>
      </div>
    </Section>
  );
}

/** FAQ — native <details>, so every answer is in the HTML and it works without JavaScript. */
export function PricingFaq() {
  return (
    <Section id="faq" aria-labelledby="faq-title" pt="pt-32 mobile:pt-20" pb="pb-0" className="scroll-mt-8">
      <div className="grid grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start gap-14 narrow:grid-cols-1 narrow:gap-9 mobile:gap-7">
        <div data-reveal>
          <SceneHeader size="md" eyebrow="자주 묻는 질문" titleId="faq-title" title="결정하기 전에 가장 많이 묻는 것들." />
        </div>
        <div data-reveal className="grid gap-3">
          {PRICING_FAQ.map((item) => (
            <details key={item.q} className="group rounded-xl bg-white shadow-md">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 px-7 py-6 text-[18px] leading-[1.5] font-bold tracking-[-0.01em] text-ink mobile:px-5 mobile:py-5 mobile:text-[16px] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex-none text-[22px] leading-none font-medium text-muted transition-transform duration-160 ease-out group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="m-0 border-t border-line px-7 py-6 text-[16px] leading-[1.75] text-pretty text-body mobile:px-5 mobile:py-5 mobile:text-[15px]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** Final CTA — the fit is confirmed in the KakaoTalk 상담; nothing is collected or paid on this page. */
export function PricingCta() {
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
            우리 홈페이지에는 어떤 구축 방식이 맞을까요?
          </h2>
          <p className="mt-3 mb-0 text-[17px] leading-[1.6] text-pretty text-muted mobile:text-[16px]">
            업체명과 홈페이지 주소를 남겨주시면, 현재 홈페이지를 확인한 뒤 맞는 구축 방식과 {SITE_NAME} 운영 플랜을
            안내해드립니다.
          </p>
        </div>
        <div className="flex flex-none flex-wrap gap-3 max-[480px]:grid max-[480px]:w-full">
          <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" arrow>
            내 홈페이지 기준으로 추천받기
          </ButtonLink>
          <ButtonLink href={DEMO_URL} external size="lg" variant="secondary">
            실제 데모 보기
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
