import { AutoFilm } from "@/components/media/AutoFilm";
import { CLIP_FRAME, CLIP_PORTRAIT_SLOT, COLUMN_SLOT } from "@/components/media/frames";
import { MediaNote } from "@/components/media/MediaNote";
import { ButtonLink } from "@/components/ui/Button";
import { Check } from "@/components/ui/CheckList";
import { MoreLink } from "@/components/ui/MoreLink";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { BUILD_FROM, WEBSITE_POINTS } from "@/lib/home";
import { short } from "@/lib/media";
import { VAT_SHORT, WEBSITE_OPERATION } from "@/lib/pricing";
import { DEMO_LABEL, DEMO_URL, FEATURES, WEBSITE_ID } from "@/lib/site";

/**
 * AI 스마트 홈페이지 — the service an owner adds when there is no homepage yet: what a homepage made here
 * has (each line is on the demo homepage, one button away), what it costs once, and that keeping it
 * open carries no monthly fee. `#install` was the earlier landing's "how it gets onto a homepage"
 * block; the build is what answers that now, so the anchor lands here.
 */
export function Website() {
  const gallery = short("CLIP-05");
  return (
    <Section id={WEBSITE_ID} aria-labelledby="website-title" pt="pt-36 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <span id="install" aria-hidden="true" className="block scroll-mt-4" />
      <span id="install-prep" aria-hidden="true" className="block scroll-mt-4" />
      <div data-reveal>
        <SceneHeader
          eyebrow={`${FEATURES.website.label} · 선택 서비스`}
          titleId="website-title"
          titleClassName="mobile:text-[28px]"
          title={
            <>
              홈페이지가 필요하면, <br />
              시공사례 중심으로 만들어 드립니다.
            </>
          }
          sub="홈페이지는 저희가 제작하고, AI 상담과 AI 마케팅은 필요할 때 월 구독으로 더합니다. 한 번 제작하는 서비스이며, 이미 홈페이지가 있다면 그대로 두고 AI 상담만 연결할 수 있습니다."
          subClassName="mobile:text-[16px]"
        />
      </div>

      <div className="mt-12 grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-center gap-x-16 gap-y-9 narrow:grid-cols-1 mobile:mt-7 mobile:gap-y-7">
        <div data-reveal>
          <AutoFilm
            film={gallery}
            label="데모 홈페이지의 시공사례 목록에 게시된 시공사례가 실린 화면"
            name="홈페이지 시공사례 영상"
            sizes={COLUMN_SLOT}
            portraitSizes={CLIP_PORTRAIT_SLOT}
            className={`${CLIP_FRAME} shadow-float`}
          />
          <MediaNote className="mt-3 phone:text-center">{gallery.note}</MediaNote>
        </div>
        <div data-reveal>
          <ul className="m-0 grid list-none gap-3 p-0">
            {WEBSITE_POINTS.map((point) => (
              <li key={point} className="flex gap-3 text-[18px] leading-[1.5] font-semibold tracking-[-0.01em] text-ink mobile:text-[16.5px]">
                <Check className="mt-[7px] size-4 text-accent mobile:mt-[5px]" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-7 rounded-xl bg-white p-6 shadow-md mobile:mt-6 mobile:p-5">
            <p className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[28px] leading-none font-bold tracking-[-0.035em] whitespace-nowrap text-ink">{BUILD_FROM}</span>
              <span className="text-[13px] leading-none font-medium text-muted">1회 · {VAT_SHORT}</span>
            </p>
            <p className="mt-3 mb-0 text-[16px] leading-[1.5] font-bold text-accent">{WEBSITE_OPERATION.label}</p>
            <p className="mt-1 mb-0 text-[14px] leading-[1.6] text-pretty text-muted">{WEBSITE_OPERATION.separate}</p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <ButtonLink href={DEMO_URL} external variant="dark" arrow className="max-[480px]:w-full">
              {DEMO_LABEL}
            </ButtonLink>
            <MoreLink href={FEATURES.website.path}>{FEATURES.website.label} 자세히 알아보기</MoreLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
