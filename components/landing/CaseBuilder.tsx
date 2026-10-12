import { AutoFilm } from "@/components/media/AutoFilm";
import { CLIP_FRAME, CLIP_PORTRAIT_SLOT, COLUMN_SLOT } from "@/components/media/frames";
import { MediaNote } from "@/components/media/MediaNote";
import { AvailabilityList, MonthlyPrice } from "@/components/pricing/ProductParts";
import { Br } from "@/components/ui/Br";
import { MoreLink } from "@/components/ui/MoreLink";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { MARKETING_STEPS } from "@/lib/home";
import { short } from "@/lib/media";
import { subscription, VAT_SHORT } from "@/lib/pricing";
import { FEATURES, HOW_ID } from "@/lib/site";

/**
 * AI 마케팅 — the first product, in three steps and one short clip: photos and a memo go in, a
 * 시공사례 comes out, and from it the video and the posts. Where it can be used today is said next
 * to its price, in the price list's own words; how each result is made is on the product's page.
 */
export function CaseBuilder() {
  const draft = short("CLIP-01");
  const product = subscription("marketing");
  return (
    <Section id={HOW_ID} aria-labelledby="how-title" pt="pt-36 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <div data-reveal>
        <SceneHeader
          eyebrow={product.name}
          titleId="how-title"
          titleClassName="mobile:text-[28px]"
          title={
            <>
              사진과 메모만 올리면, <Br />
              홍보 콘텐츠가 됩니다.
            </>
          }
          sub="글을 다듬고 영상을 편집하는 일은 AI가 합니다. 대표님은 확인하고, 내려받아 올리면 됩니다."
          subClassName="mobile:text-[16px]"
        />
      </div>

      <div className="mt-12 grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-center gap-x-16 gap-y-9 narrow:grid-cols-1 mobile:mt-7 mobile:gap-y-7">
        <div data-reveal>
          <AutoFilm
            film={draft}
            label="시공사진과 메모가 AI 시공사례 초안으로 정리되는 제품 화면"
            name="시공사례 초안 영상"
            sizes={COLUMN_SLOT}
            portraitSizes={CLIP_PORTRAIT_SLOT}
            className={`${CLIP_FRAME} shadow-float`}
          />
          <MediaNote className="mt-3 phone:text-center">{draft.note}</MediaNote>
        </div>
        <div data-reveal>
          <ol className="m-0 grid list-none gap-0 p-0">
            {MARKETING_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-5 border-t border-line-strong py-5 first:border-t-0 first:pt-0 mobile:gap-4 mobile:py-4">
                <span aria-hidden="true" className="mt-[3px] font-mono text-[13px] leading-[1.6] font-medium text-accent">
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
            <MoreLink href={FEATURES.marketing.path} className="mt-3">
              {product.name} 자세히 알아보기
            </MoreLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
