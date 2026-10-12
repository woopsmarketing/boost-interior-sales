import { AutoFilm } from "@/components/media/AutoFilm";
import { CLIP_FRAME, CLIP_PORTRAIT_SLOT } from "@/components/media/frames";
import { MediaNote } from "@/components/media/MediaNote";
import { ReelCard } from "@/components/media/ReelCard";
import { MoreLink } from "@/components/ui/MoreLink";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { REEL_SAMPLES, REEL_TAKE } from "@/lib/home";
import { sample, short } from "@/lib/media";
import { FEATURES, REELS_ID } from "@/lib/site";

const RING = "ring-1 ring-white/10";

/**
 * 릴스 · 쇼츠 결과물 — the page's dark band, and the proof that the product makes a finished video:
 * a short clip of the result screen, next to the two reels the product made from the demo 시공사례.
 * Those two play as they came out — no caption added, no re-encode — so the note about what they
 * show is the text under each, and they never leave the page for full screen. They play on a press:
 * each is a whole video, not a loop.
 */
export function Reels() {
  const result = short("CLIP-02");
  const reels = [
    { ...REEL_SAMPLES.showcase, reel: sample("SAMPLE-01") },
    { ...REEL_SAMPLES.beforeAfter, reel: sample("SAMPLE-02") },
  ];
  return (
    <Section
      id={REELS_ID}
      aria-labelledby="reels-title"
      pt="pt-28 mobile:pt-[76px]"
      pb="pb-28 mobile:pb-14"
      className="mt-36 bg-gray-950 mobile:mt-16"
    >
      <div data-reveal>
        <SceneHeader
          tone="dark"
          eyebrow="제품이 만든 릴스 · 쇼츠 영상"
          titleId="reels-title"
          titleClassName="mobile:text-[28px]"
          title={
            <>
              시공사진이
              <br />
              <span className="whitespace-nowrap">릴스 · 쇼츠</span> 영상이 됩니다.
            </>
          }
          sub="‘제품이 만든 영상’ 두 편은 제품이 데모 시공사례의 사진으로 만든 그대로입니다. 글자를 더하거나 다시 편집하지 않았습니다."
          subClassName="mobile:text-[16px]"
        />
      </div>

      {/* One row, one height: a 16:9 clip and two 9:16 reels. Tablets: the reels side by side under the clip.
          Phones: the clip's vertical cut, then the reels in a row to swipe, each wide enough to watch. */}
      <div
        data-reveal
        className="mt-12 grid grid-cols-[1.778fr_0.5625fr_0.5625fr] items-start gap-6 narrow:gap-4 mobile:mt-8 mobile:grid-cols-2 mobile:gap-x-3 mobile:gap-y-9"
      >
        <figure className="m-0 mobile:col-span-2">
          <AutoFilm
            film={result}
            label="사진 13장으로 만든 완공 쇼케이스 영상과 사진 6장으로 만든 Before → After 영상의 결과 화면"
            name="영상 결과 화면"
            sizes="(max-width: 820px) calc(100vw - 40px), (max-width: 1440px) calc((100vw - 208px) * 0.61), 760px"
            portraitSizes={CLIP_PORTRAIT_SLOT}
            className={`${CLIP_FRAME} ${RING}`}
          />
          <figcaption className="mt-4 phone:mx-auto phone:max-w-[280px]">
            <p className="m-0 text-[16px] leading-[1.4] font-bold text-white">사진 몇 장이 한 편의 영상으로</p>
            <MediaNote tone="dark" className="mt-1.5">
              {result.note}
            </MediaNote>
          </figcaption>
        </figure>

        <div className="contents phone:col-span-2 phone:-mx-5 phone:flex phone:snap-x phone:snap-mandatory phone:scroll-pl-5 phone:gap-3 phone:overflow-x-auto phone:px-5 phone:[scrollbar-width:none]">
          {reels.map(({ title, facts, reel }) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              title={title}
              facts={facts}
              sizes="(max-width: 640px) 240px, (max-width: 820px) min(260px, calc(50vw - 26px)), (max-width: 1440px) calc((100vw - 208px) * 0.2), 240px"
              className="mobile:mx-auto mobile:w-full mobile:max-w-[260px] phone:mx-0 phone:w-[240px] phone:flex-none phone:snap-start"
            />
          ))}
        </div>
      </div>

      <div data-reveal className="mt-12 flex flex-wrap items-center justify-between gap-x-10 gap-y-3 border-t border-white/10 pt-8 mobile:mt-9 mobile:pt-6">
        <p className="m-0 max-w-[820px] text-[17px] leading-[1.65] text-pretty text-gray-300 mobile:text-[15px]">{REEL_TAKE}</p>
        <MoreLink href={`${FEATURES.marketing.path}#reels`} tone="dark">
          영상이 만들어지는 과정 보기
        </MoreLink>
      </div>
    </Section>
  );
}
