import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { PARTNER_BENEFITS, PARTNER_TERMS } from "@/lib/partner";
import { KAKAO_OPEN_CHAT_URL, PARTNER_ID, SITE_NAME } from "@/lib/site";

/**
 * Founding Partner — sits right under the hero: once the product is understood, "adopting now
 * comes with more". The only future-facing block on the page; see lib/partner.ts for what is fixed.
 */
export function Partner() {
  return (
    <Section id={PARTNER_ID} aria-labelledby="partner-title" pt="pt-16 mobile:pt-12" pb="pb-10 mobile:pb-2">
      <div data-reveal className="rounded-2xl bg-inverse px-14 py-16 text-white narrow:px-10 mobile:rounded-xl mobile:px-5 mobile:py-10">
        <div className="mx-auto max-w-[820px] text-center mobile:mx-0 mobile:text-left">
          <p className="m-0 text-[15px] leading-[1.4] font-bold text-blue-300">Founding Partner · 초기 파트너 혜택</p>
          <h2
            id="partner-title"
            className="mt-3 mb-0 text-[44px] leading-[1.2] font-bold tracking-[-0.035em] text-balance narrow:text-[36px] mobile:text-[27px]"
          >
            지금 도입하는 업체는 <br className="mobile:hidden" />
            초기 파트너 혜택을 먼저 받습니다.
          </h2>
          <p className="mt-4 mb-0 text-[19px] leading-[1.6] text-pretty text-gray-300 mobile:text-[16px]">
            {SITE_NAME} 초기 도입 업체는 앞으로 추가되는 기능과 인테리어 플랫폼에서 먼저 혜택을 받는 파트너입니다.
          </p>
        </div>

        <ul className="mt-12 mb-0 grid list-none grid-cols-3 gap-4 p-0 narrow:grid-cols-2 mobile:mt-8 mobile:grid-cols-1 mobile:gap-3">
          {PARTNER_BENEFITS.map((benefit) => (
            <li
              key={benefit.title}
              className="rounded-xl border border-white/12 bg-white/6 p-7 mobile:flex mobile:gap-4 mobile:p-5"
            >
              <span className="grid size-11 flex-none place-items-center rounded-md bg-white/10 text-blue-300 mobile:size-10">
                <Icon name={benefit.icon} />
              </span>
              <div className="mt-5 mobile:mt-0">
                <p className="m-0 font-mono text-[12px] leading-none font-medium tracking-[0.02em] text-gray-400">
                  {benefit.tag}
                </p>
                <h3 className="mt-2 mb-0 text-[20px] leading-[1.35] font-bold tracking-[-0.02em] text-balance mobile:text-[17px]">
                  {benefit.title}
                </h3>
                <p className="mt-2 mb-0 text-[15px] leading-[1.6] text-pretty text-gray-300 mobile:text-[14px]">
                  {benefit.text}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex items-center justify-between gap-8 narrow:flex-col narrow:items-start narrow:gap-6 mobile:mt-7">
          <p className="m-0 max-w-[720px] text-[13px] leading-[1.6] text-gray-400">{PARTNER_TERMS}</p>
          <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" arrow className="flex-none max-[480px]:w-full">
            초기 파트너로 도입 상담받기
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
