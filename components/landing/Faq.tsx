import Link from "next/link";
import { FaqList } from "@/components/ui/FaqList";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { HOME_FAQ } from "@/lib/home";
import { PRICING_DETAILS_PATH, PRICING_FAQ_ID } from "@/lib/site";

/** 자주 묻는 질문 — the five asked first. The questions about price and scope are on /pricing/details. */
export function Faq() {
  return (
    <Section id="faq" aria-labelledby="faq-title" pt="pt-36 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <div className="grid grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start gap-14 narrow:grid-cols-1 narrow:gap-9 mobile:gap-6">
        <div data-reveal>
          <SceneHeader
            size="md"
            eyebrow="자주 묻는 질문"
            titleId="faq-title"
            title={`도입 전에 확인할 ${HOME_FAQ.length}가지.`}
          />
          <p className="mt-5 mb-0 mobile:mt-4">
            <Link
              href={`${PRICING_DETAILS_PATH}#${PRICING_FAQ_ID}`}
              className="group inline-flex min-h-11 items-center gap-1.5 text-[15px] leading-[1.4] font-semibold text-link no-underline"
            >
              <span className="underline-offset-4 group-hover:underline">가격 · 포함 범위 질문 더 보기</span>
              <span aria-hidden="true" className="transition-transform duration-160 ease-out group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </p>
        </div>
        <div data-reveal>
          <FaqList items={HOME_FAQ} />
        </div>
      </div>
    </Section>
  );
}
