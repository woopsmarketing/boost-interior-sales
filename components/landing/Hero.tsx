import type { ReactNode } from "react";
import { HeroFilm } from "@/components/media/HeroFilm";
import { MediaNote } from "@/components/media/MediaNote";
import { ButtonLink } from "@/components/ui/Button";
import { MoreLink } from "@/components/ui/MoreLink";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { ENTRY_PRICE } from "@/lib/home";
import { heroFilm } from "@/lib/media";
import { DEMO_LABEL, DEMO_URL, KAKAO_LABEL, KAKAO_OPEN_CHAT_URL, NAV_PRICING_LABEL, PRICING_PATH } from "@/lib/site";

/** One clause of the title: the title breaks between clauses, never inside one. */
function Clause({ children }: { children: ReactNode }) {
  return <span className="whitespace-nowrap">{children}</span>;
}

/**
 * What the product does, in the title: marketing content from a 시공사진, and a consultation that
 * ends in a request. The two ways on (try the demo, ask) are right under it, then the three monthly
 * prices, then the brand film — the page's first film, playing by itself.
 * The copy and the buttons come before the film at every width, so a phone shows them first.
 */
export function Hero() {
  const brand = heroFilm();
  return (
    <section id="top" aria-labelledby="hero-title" className="mx-auto max-w-[1440px] px-20 pt-[136px] narrow:px-10 mobile:px-5 mobile:pt-[96px]">
      <SceneHeader
        as="h1"
        size="xl"
        align="center"
        titleId="hero-title"
        eyebrow="인테리어 · 리모델링 업체를 위한 AI 마케팅 · AI 상담"
        className="min-[821px]:max-w-[1120px]"
        titleClassName="min-[821px]:text-[clamp(38px,4.6vw,66px)] max-[480px]:text-[clamp(30px,9vw,38px)]"
        subClassName="mx-auto max-w-[740px] mobile:text-[16.5px]"
        title={
          <>
            <Clause>시공사진 하나로</Clause> <Clause>마케팅 콘텐츠를,</Clause>
            <br />
            <Clause>AI 상담으로</Clause> <Clause>고객 문의까지.</Clause>
          </>
        }
        sub={
          <>
            시공사진을 올리면 <span className="whitespace-nowrap">릴스 · 쇼츠</span> 영상과 게시글, 블로그 초안이 만들어집니다. 홈페이지 방문자의 질문에는 AI
            상담이 답하고, 견적 문의를 받아 둡니다. 홈페이지가 필요하면 제작도 맡길 수 있습니다.
          </>
        }
      />

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3 mobile:mt-7">
        <ButtonLink href={DEMO_URL} external size="lg" arrow className="max-[480px]:w-full">
          {DEMO_LABEL}
        </ButtonLink>
        <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" variant="secondary" className="max-[480px]:flex-1">
          {KAKAO_LABEL}
        </ButtonLink>
        <MoreLink href={PRICING_PATH} className="h-14 px-2">
          {NAV_PRICING_LABEL}
        </MoreLink>
      </div>

      <p className="mt-5 mb-0 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[15px] leading-[1.5] font-semibold text-ink mobile:mt-4 mobile:text-[14px]">
        {ENTRY_PRICE.map((part, i) => (
          <span key={part} className="flex items-center gap-2.5 whitespace-nowrap">
            <span className={i === ENTRY_PRICE.length - 1 ? "font-medium text-muted" : ""}>{part}</span>
            {/* The dot trails its item, so a wrapped line never starts with one. */}
            {i < ENTRY_PRICE.length - 1 && (
              <span aria-hidden="true" className="text-faint max-[480px]:hidden">
                ·
              </span>
            )}
          </span>
        ))}
      </p>

      <div className="mx-auto mt-14 max-w-[1200px] mobile:mt-9">
        <HeroFilm
          film={brand}
          label="시공사례 한 건에서 홈페이지 시공사례와 릴스 · 쇼츠 영상, 블로그 초안, 인스타그램 본문이 만들어지는 BoostInterior 소개 영상"
          className="aspect-video rounded-2xl shadow-float mobile:rounded-xl phone:mx-auto phone:aspect-[9/16] phone:max-w-[320px]"
        />
        <MediaNote className="mt-3 text-center">{brand.note}</MediaNote>
      </div>
    </section>
  );
}
