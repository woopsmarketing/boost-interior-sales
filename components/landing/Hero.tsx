import Image from "next/image";
import Link from "next/link";
import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { ASSETS } from "@/lib/assets";
import { ENTRY_PRICE } from "@/lib/home";
import { DEMO_LABEL, DEMO_PROMPT, DEMO_SCREEN_NOTE, DEMO_URL, DEMO_VIDEO_ID, PRICING_PATH, VIDEOS } from "@/lib/site";
import { HeroShowcase } from "./HeroShowcase";

/** Phone capture's device body inside the 380 × 788 image, and its corner radius (capture px). */
const PHONE = { x: 2, y: 2, w: 375, h: 784, r: 52 };
/** Rows of the phone shown below 1024px: its top, down to the recommended case. */
const PHONE_SHOWN = 430;

/**
 * Who it is for, what it does and what comes of it, in the title. One filled button: the demo.
 * ≥1024px: copy | real product showcase (cycling states).
 * Below: copy and buttons first, then the top of one real phone capture, static.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="mx-auto max-w-[1440px] px-20 pt-[132px] pb-16 split:grid split:grid-cols-[minmax(0,54fr)_minmax(0,46fr)] split:items-center split:gap-12 split:pt-[104px] split:pb-12 mobile:px-5 mobile:pt-[92px] mobile:pb-2"
    >
      <div>
        <SceneHeader
          as="h1"
          size="xl"
          titleId="hero-title"
          eyebrow="인테리어 · 리모델링 업체를 위한 24시간 AI 상담"
          className="max-w-[860px]"
          titleClassName="text-[clamp(34px,4.6vw,46px)] split:text-[clamp(32px,3.3vw,48px)] mobile:text-[clamp(27px,8.2vw,34px)] leading-[1.24]"
          subClassName="text-[19px] split:narrow:text-[17px] mobile:text-[16.5px]"
          title={
            <>
              홈페이지 방문자를 <Br on="phone" />
              24시간 상담하고, <Br on="ends" />
              우리 시공사례로 답하고, <Br on="ends" />
              견적 문의까지 받습니다.
            </>
          }
          sub={
            <>
              고객이 원하는 지역 · 평수 · 공사 범위를 말하면 비슷한 시공사례와 사진을 보여주며 상담합니다. <Br />
              기존 홈페이지에도 그대로 연결할 수 있습니다.
            </>
          }
        />

        <div className="mt-8 flex flex-wrap items-center gap-3 mobile:mt-6">
          <ButtonLink href={DEMO_URL} external size="lg" arrow className="max-[480px]:w-full">
            {DEMO_LABEL}
          </ButtonLink>
          <ButtonLink href={`#${DEMO_VIDEO_ID}`} size="lg" variant="secondary" className="max-[480px]:flex-1 max-[480px]:px-4">
            <span aria-hidden="true" className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-accent" />
            {VIDEOS.master.seconds}초 영상으로 보기
          </ButtonLink>
          <Link
            href={PRICING_PATH}
            className="group inline-flex h-14 items-center gap-1.5 px-2 text-[16px] leading-none font-semibold text-link no-underline"
          >
            <span className="underline-offset-4 group-hover:underline">가격 보기</span>
            <span aria-hidden="true" className="transition-transform duration-160 ease-out group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        <p className="mt-5 mb-0 text-[15px] leading-[1.6] text-muted mobile:mt-4 mobile:text-[14px]">
          데모에서 이렇게 물어보세요: <span className="font-semibold text-ink">“{DEMO_PROMPT}”</span>
        </p>

        <p className="mt-4 mb-0 flex flex-wrap items-center gap-x-2.5 gap-y-1 border-t border-line-strong pt-4 text-[15px] leading-[1.5] font-semibold text-ink mobile:text-[14px]">
          {ENTRY_PRICE.map((part, i) => (
            <span key={part} className="flex items-center gap-2.5 whitespace-nowrap">
              <span className={i === ENTRY_PRICE.length - 1 ? "font-medium text-muted" : ""}>{part}</span>
              {/* The dot trails its item, so a wrapped line never starts with one. */}
              {i < ENTRY_PRICE.length - 1 && (
                <span aria-hidden="true" className="text-faint">
                  ·
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      <div className="hidden split:block">
        <HeroShowcase />
      </div>

      {/* Tablet / mobile: the top of one real phone capture, static, after the copy and the buttons. */}
      <div className="mt-10 flex flex-col items-center gap-2.5 split:hidden mobile:mt-7">
        <div
          className="relative w-[min(330px,86vw)] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_72%,transparent)]"
          style={{
            aspectRatio: `${PHONE.w} / ${PHONE_SHOWN}`,
            borderRadius: `${(PHONE.r / PHONE.w) * 100}% / ${(PHONE.r / PHONE_SHOWN) * 100}% ${(PHONE.r / PHONE_SHOWN) * 100}% 0 0`,
          }}
        >
          <Image
            src={ASSETS.phoneChat.src}
            width={ASSETS.phoneChat.width}
            height={ASSETS.phoneChat.height}
            alt={ASSETS.phoneChat.alt}
            sizes="(max-width: 384px) 86vw, 330px"
            quality={85}
            className="absolute block h-auto max-w-none"
            style={{
              width: `${(ASSETS.phoneChat.width / PHONE.w) * 100}%`,
              left: `${(-PHONE.x / PHONE.w) * 100}%`,
              top: `${(-PHONE.y / PHONE_SHOWN) * 100}%`,
            }}
          />
        </div>
        <p className="m-0 text-[12px] leading-[1.5] text-muted">{DEMO_SCREEN_NOTE}</p>
      </div>
    </section>
  );
}
