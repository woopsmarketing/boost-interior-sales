import { AutoFilm } from "@/components/media/AutoFilm";
import { CLIP_FRAME, CLIP_PORTRAIT_SLOT, COLUMN_SLOT } from "@/components/media/frames";
import { MediaNote } from "@/components/media/MediaNote";
import { AvailabilityList, MonthlyPrice } from "@/components/pricing/ProductParts";
import { ButtonLink } from "@/components/ui/Button";
import { MoreLink } from "@/components/ui/MoreLink";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { HOW_STEPS } from "@/lib/home";
import { short } from "@/lib/media";
import { subscription, VAT_SHORT } from "@/lib/pricing";
import { CONSULT_ID, DEMO_LABEL, DEMO_URL, FEATURES } from "@/lib/site";

/**
 * AI 상담 · 견적 문의 — the second product, in four steps and one short clip: three steps the
 * visitor takes, one on the owner's side. The clip stops at the answer (the form in that shoot was
 * never sent), and nothing here says the owner is alerted: the request waits in the admin until it
 * is opened. The admin's own screen and the conditions of an existing homepage are on the product's page.
 */
export function Consult() {
  const answer = short("CLIP-04");
  const product = subscription("consultation");
  return (
    <Section id={CONSULT_ID} aria-labelledby="consult-title" pt="pt-36 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <div data-reveal>
        <SceneHeader
          eyebrow={`${product.name} · 견적 문의`}
          titleId="consult-title"
          titleClassName="mobile:text-[28px]"
          title={
            <>
              퇴근해도, <br />
              홈페이지 상담은 계속됩니다.
            </>
          }
          sub="방문자가 원하는 공사를 말하면 AI 상담이 우리 업체 정보로 답하고, 견적 문의는 정리해서 받아 둡니다."
          subClassName="mobile:text-[16px]"
        />
      </div>

      <div className="mt-12 grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-center gap-x-16 gap-y-9 narrow:grid-cols-1 mobile:mt-7 mobile:gap-y-7">
        <div data-reveal>
          <AutoFilm
            film={answer}
            label="방문자의 질문에 AI 상담이 비슷한 시공사례를 카드로 추천하는 상담창"
            name="AI 상담 영상"
            sizes={COLUMN_SLOT}
            portraitSizes={CLIP_PORTRAIT_SLOT}
            className={`${CLIP_FRAME} shadow-float`}
          />
          <MediaNote className="mt-3 phone:text-center">{answer.note}</MediaNote>
        </div>
        <div data-reveal>
          <ol className="m-0 grid list-none gap-0 p-0">
            {HOW_STEPS.map((step, i) => (
              <li
                key={step.id}
                id={step.id}
                className="flex scroll-mt-24 gap-5 border-t border-line-strong py-5 first:border-t-0 first:pt-0 mobile:gap-4 mobile:py-4"
              >
                <span aria-hidden="true" className="mt-[3px] font-mono text-[13px] leading-[1.6] font-medium whitespace-nowrap text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="m-0 text-[19px] leading-[1.45] font-bold tracking-[-0.02em] text-ink mobile:text-[17px]">{step.title}</h3>
                  <p className="mt-1.5 mb-0 text-[16px] leading-[1.65] text-pretty text-body mobile:text-[15px]">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-2 border-t border-line-strong pt-6 mobile:pt-5">
            <p className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <MonthlyPrice item={product} className="text-[28px]" />
              <span className="text-[13px] leading-none font-medium text-muted">{VAT_SHORT}</span>
            </p>
            <AvailabilityList items={product.availability} className="mt-4" />
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 max-[480px]:grid">
              <ButtonLink href={DEMO_URL} external variant="secondary" arrow>
                {DEMO_LABEL}
              </ButtonLink>
              <MoreLink href={FEATURES.consultation.path}>{product.name} 자세히 알아보기</MoreLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
