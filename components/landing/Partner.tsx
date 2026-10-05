import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { PARTNER_BENEFITS, PARTNER_TERMS } from "@/lib/partner";
import { PARTNER_ID, SITE_NAME } from "@/lib/site";

/**
 * 초기 파트너 혜택 — a short band near the end, after the product and its price: what adopting now
 * adds, and nothing that reads as available today. It carries no button of its own; the final
 * 문의 block follows it on every page.
 * `detail` (the landing) gives each benefit its one line and owns the `#partner` anchor; without it
 * (the pricing pages) the band lists the titles and links back to the landing's.
 */
export function Partner({ detail = false }: { detail?: boolean }) {
  return (
    <Section
      id={detail ? PARTNER_ID : "founding-partner"}
      aria-labelledby="partner-title"
      pt="pt-36 mobile:pt-16"
      pb="pb-0"
      className="scroll-mt-4"
    >
      <div data-reveal className="rounded-2xl bg-inverse px-12 py-12 text-white narrow:px-9 mobile:rounded-xl mobile:px-5 mobile:py-8">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-3">
          <div>
            <p className="m-0 text-[14px] leading-[1.4] font-bold text-blue-300">
              초기 파트너 혜택 <span className="ml-1 text-[13px] font-medium text-gray-400">Founding Partner</span>
            </p>
            <h2
              id="partner-title"
              className="mt-2.5 mb-0 text-[30px] leading-[1.3] font-bold tracking-[-0.03em] text-balance narrow:text-[26px] mobile:text-[22px]"
            >
              지금 도입하는 업체는 초기 파트너 혜택을 먼저 받습니다.
            </h2>
          </div>
          {detail && (
            <p className="m-0 max-w-[400px] text-[15px] leading-[1.6] text-pretty text-gray-300 mobile:text-[14px]">
              앞으로 추가되는 기능과 {SITE_NAME} 인테리어 플랫폼에서 먼저 받는 혜택입니다.
            </p>
          )}
        </div>

        <ul className="mt-8 mb-0 grid list-none grid-cols-3 gap-x-8 gap-y-5 border-t border-white/12 p-0 pt-8 narrow:grid-cols-2 mobile:mt-5 mobile:grid-cols-1 mobile:gap-y-3.5 mobile:pt-5">
          {PARTNER_BENEFITS.map((benefit) => (
            <li key={benefit.title} className={`flex gap-3 ${detail ? "items-start" : "items-center"}`}>
              <span className="grid size-9 flex-none place-items-center rounded-md bg-white/10 text-blue-300">
                <Icon name={benefit.icon} className="size-5" />
              </span>
              <div>
                <h3 className="m-0 text-[16px] leading-[1.4] font-semibold tracking-[-0.01em] mobile:text-[15px]">{benefit.title}</h3>
                {detail && <p className="mt-1 mb-0 text-[13.5px] leading-[1.55] text-pretty text-gray-400 mobile:mt-0.5 mobile:text-[13px]">{benefit.text}</p>}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 mobile:mt-6">
          <p className="m-0 max-w-[820px] text-[13px] leading-[1.6] text-gray-400">{PARTNER_TERMS}</p>
          {!detail && (
            <Link
              href={`/#${PARTNER_ID}`}
              className="group inline-flex min-h-11 items-center gap-1.5 text-[15px] leading-[1.4] font-semibold text-white no-underline hover:text-white"
            >
              <span className="underline-offset-4 group-hover:underline">초기 파트너 혜택 자세히 보기</span>
              <span aria-hidden="true" className="transition-transform duration-160 ease-out group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          )}
        </div>
      </div>
    </Section>
  );
}
