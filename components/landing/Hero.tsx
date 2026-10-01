import Image from "next/image";
import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { ASSETS, PHONE_FADE } from "@/lib/assets";
import { DEMO_URL, DEMO_VIDEO_ID, KAKAO_OPEN_CHAT_URL, SITE_NAME, VIDEOS } from "@/lib/site";
import { HeroShowcase } from "./HeroShowcase";

/** Phone capture's device body inside the 380 × 788 image, and its corner radius (capture px). */
const PHONE = { x: 2, y: 2, w: 375, h: 784, r: 52 };

/**
 * ≥1024px: copy | real product showcase (cycling states).
 * Below: copy, then one static phone capture — no layered composition, no rotation.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="mx-auto max-w-[1440px] px-20 pt-[148px] pb-20 split:grid split:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] split:items-center split:gap-12 split:pt-[108px] split:pb-16 mobile:px-5 mobile:pt-[104px] mobile:pb-6"
    >
      <div>
        <SceneHeader
          as="h1"
          size="xl"
          titleId="hero-title"
          eyebrow={`${SITE_NAME} · 인테리어 · 리모델링 업체를 위한 AI 상담`}
          className="max-w-[980px]"
          titleClassName="split:text-[clamp(40px,4.1vw,60px)] mobile:text-[clamp(30px,9.2vw,40px)]"
          subClassName="split:narrow:text-[18px]"
          title={
            <>
              홈페이지까지 찾아온 <Br on="phone" />
              고객, <Br on="wide" />
              견적 문의까지 <Br on="phone" />
              자연스럽게
              <br />
              이어지고 있나요?
            </>
          }
          sub={
            <>
              고객이 원하는 공사를 말하면 관련 시공사례를 찾아주고, <Br />
              사진을 보며 상담한 뒤 견적 문의까지 연결합니다.
            </>
          }
        />

        <div className="mt-9 flex flex-wrap gap-3 max-[480px]:grid">
          <ButtonLink href={DEMO_URL} external size="lg" arrow>
            실제 데모 체험하기
          </ButtonLink>
          <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" variant="secondary">
            카카오톡 1:1 도입 상담
          </ButtonLink>
        </div>

        <p className="mt-5 mb-0">
          <a
            href={`#${DEMO_VIDEO_ID}`}
            className="group inline-flex items-center gap-2 text-[15px] leading-[1.4] font-semibold text-link no-underline"
          >
            <span aria-hidden="true" className="grid size-6 place-items-center rounded-pill bg-accent-soft">
              <span className="ml-0.5 h-0 w-0 border-y-[4.5px] border-l-[7px] border-y-transparent border-l-accent" />
            </span>
            <span className="underline-offset-4 group-hover:underline">
              {VIDEOS.master.seconds}초 실제 작동 영상 보기
            </span>
            <span aria-hidden="true" className="transition-transform duration-160 ease-out group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </p>
        <p className="mt-3 mb-0 flex items-center gap-2 text-[14px] leading-[1.4] font-medium text-muted">
          <span aria-hidden="true" className="size-1.5 flex-none rounded-pill bg-accent" />
          기존 인테리어 홈페이지에도 설치할 수 있습니다.
        </p>
      </div>

      <div className="hidden split:block">
        <HeroShowcase />
      </div>

      {/* Tablet / mobile: one real phone capture, static. */}
      <div className="mt-14 flex justify-center split:hidden mobile:mt-10">
        <div
          className={`relative aspect-[375/784] w-[min(300px,72vw)] overflow-hidden shadow-device ${PHONE_FADE}`}
          style={{ borderRadius: `${(PHONE.r / PHONE.w) * 100}% / ${(PHONE.r / PHONE.h) * 100}%` }}
        >
          <Image
            src={ASSETS.phoneChat.src}
            width={ASSETS.phoneChat.width}
            height={ASSETS.phoneChat.height}
            alt={ASSETS.phoneChat.alt}
            sizes="(max-width: 420px) 72vw, 300px"
            quality={85}
            className="absolute block h-auto max-w-none"
            style={{
              width: `${(ASSETS.phoneChat.width / PHONE.w) * 100}%`,
              left: `${(-PHONE.x / PHONE.w) * 100}%`,
              top: `${(-PHONE.y / PHONE.h) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
