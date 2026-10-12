import Link from "next/link";
import { Br } from "@/components/ui/Br";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { CONSULT_SETUP, VAT_NOTICE } from "@/lib/pricing";
import {
  COMPARISON_ID,
  CONSULT_SETUP_ID,
  PLANS_ID,
  PRICING_FAQ_ID,
  PRICING_PATH,
  SETUP_COMPARISON_ID,
  SITE_NAME,
  TRIAL_ID,
} from "@/lib/site";

/** The blocks of the page, in the order they come. */
const JUMPS = [
  { label: "상품 비교표", id: COMPARISON_ID },
  { label: "구독별 제공 기능", id: PLANS_ID },
  { label: "무료 체험 정책", id: TRIAL_ID },
  { label: CONSULT_SETUP, id: CONSULT_SETUP_ID },
  { label: "홈페이지 제작 방식 비교", id: SETUP_COMPARISON_ID },
  { label: "자주 묻는 질문", id: PRICING_FAQ_ID },
];

/** The way back to the page the choice is made on. Said at the top and again at the end. */
export function BackToPricing({ className = "" }: { className?: string }) {
  return (
    <Link
      href={PRICING_PATH}
      className={`group inline-flex min-h-11 items-center gap-1.5 text-[15px] leading-[1.4] font-semibold text-link no-underline ${className}`}
    >
      <span aria-hidden="true" className="transition-transform duration-160 ease-out group-hover:-translate-x-0.5">
        ←
      </span>
      <span className="underline-offset-4 group-hover:underline">요금 한눈에 보기로 돌아가기</span>
    </Link>
  );
}

/** /pricing/details hero — what this page is for, the way back to the summary, and the jumps into it. */
export function DetailsHero() {
  return (
    <Section id="top" aria-labelledby="page-title" pt="pt-[112px] mobile:pt-[84px]" pb="pb-0">
      <p className="mt-0 mb-4 mobile:mb-2">
        <BackToPricing />
      </p>
      <SceneHeader
        as="h1"
        titleId="page-title"
        eyebrow={`${SITE_NAME} 상세 요금`}
        className="max-w-[900px]"
        titleClassName="mobile:text-[30px]"
        subClassName="mobile:text-[16px]"
        title={
          <>
            상품마다 무엇이 포함되고, <Br />
            무엇이 필요한지 확인하세요.
          </>
        }
        sub="결정하기 전에 조건을 확인하는 페이지입니다. 지금 이용할 수 있는 것과 아직 출시 전인 것을 항목마다 구분해 적었습니다."
      />
      <nav aria-label="이 페이지의 내용" className="mt-7 mobile:mt-6">
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {JUMPS.map((jump) => (
            <li key={jump.id}>
              <a
                href={`#${jump.id}`}
                className="inline-flex min-h-11 items-center rounded-pill bg-white px-4 text-[14.5px] leading-none font-semibold whitespace-nowrap text-ink no-underline shadow-hairline hover:bg-gray-25 hover:text-ink"
              >
                {jump.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="mt-4 mb-0 text-[14px] leading-[1.6] text-muted">{VAT_NOTICE.all}</p>
    </Section>
  );
}
