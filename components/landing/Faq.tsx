import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { MoreLink } from "@/components/ui/MoreLink";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { HOME_FAQ } from "@/lib/home";
import { FAQ_ID, PRICING_DETAILS_PATH, PRICING_FAQ_ID } from "@/lib/site";

/**
 * 자주 묻는 질문 — the questions asked before a decision: how the products differ, what works without
 * a homepage, whether anything is posted for the owner. The questions about price and conditions
 * are on /pricing/details; each product's own are on its page.
 */
export function Faq() {
  return (
    <Section id={FAQ_ID} aria-labelledby="faq-title" pt="pt-36 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <div className="grid grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start gap-14 narrow:grid-cols-1 narrow:gap-9 mobile:gap-6">
        <div data-reveal>
          <SceneHeader size="md" eyebrow="자주 묻는 질문" titleId="faq-title" title={`시작 전에 확인할 ${HOME_FAQ.length}가지.`} />
          <MoreLink href={`${PRICING_DETAILS_PATH}#${PRICING_FAQ_ID}`} size="sm" className="mt-5 mobile:mt-4">
            요금 · 이용 조건 질문 더 보기
          </MoreLink>
        </div>
        <div data-reveal>
          <FaqList items={HOME_FAQ} />
        </div>
      </div>
      <FaqJsonLd items={HOME_FAQ} />
    </Section>
  );
}
