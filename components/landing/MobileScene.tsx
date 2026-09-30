import Image from "next/image";
import { DepthStage } from "@/components/motion/DepthStage";
import { ProductLayer } from "@/components/motion/ProductLayer";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { ASSETS } from "@/lib/assets";
import { MOBILE_SCENE, stepLabel } from "@/lib/scenes";

const PHONE_SHADOW = "[filter:drop-shadow(0_30px_40px_rgba(16,24,40,.18))]";

/** 모바일 — two phone captures turning toward the viewer (pinned 190vh on desktop). */
export function MobileScene() {
  const { id } = MOBILE_SCENE;
  return (
    <section id={id} data-scene aria-labelledby={`${id}-title`} className="relative pinned:h-[190vh]">
      <div className="pinned:sticky pinned:top-0 pinned:h-screen pinned:overflow-hidden">
        <div className="mx-auto grid h-full max-w-[1440px] grid-cols-[minmax(0,.8fr)_minmax(0,1fr)] items-center gap-12 px-20 pt-16 unpinned:block unpinned:pt-30 mobile:px-5 mobile:pt-18">
          <div data-reveal="unpinned">
            <SceneHeader
              step={stepLabel(id)}
              titleId={`${id}-title`}
              titleClassName="mobile:text-[26px]"
              title={
                <>
                  모바일에서도
                  <br />
                  바로 상담합니다.
                </>
              }
              sub="휴대폰에서는 상담창과 사례 뷰어가 화면 전체로 열립니다."
            />
          </div>

          <div className="aspect-[860/830] h-[min(82vh,760px)] max-w-full justify-self-end unpinned:hidden">
            <DepthStage perspective={1400}>
              <ProductLayer
                asset={ASSETS.phoneChat}
                l={1.9}
                t={1.9}
                w={44.2}
                elevation="none"
                radius="none"
                frameWidth={790}
                imgClassName={PHONE_SHADOW}
                motion={{ y: [6, 0, 0.05, 0.5], ry: [10, 5, 0.05, 0.6], z: [-40, 0, 0.05, 0.5] }}
              />
              <ProductLayer
                asset={ASSETS.phoneViewer}
                l={52}
                t={1.9}
                w={44.2}
                elevation="none"
                radius="none"
                frameWidth={790}
                imgClassName={PHONE_SHADOW}
                motion={{
                  y: [14, 0, 0.15, 0.65],
                  ry: [-10, -5, 0.15, 0.7],
                  z: [-40, 30, 0.15, 0.65],
                  opacity: [0, 1, 0.1, 0.35],
                }}
              />
            </DepthStage>
          </div>

          <div data-reveal="unpinned" className="mt-12 hidden unpinned:block desktop-static:pr-12 mobile:mt-7">
            <Image
              src={ASSETS.sceneMobile.src}
              width={ASSETS.sceneMobile.width}
              height={ASSETS.sceneMobile.height}
              alt={ASSETS.sceneMobile.alt}
              sizes="(max-width: 820px) calc(100vw - 40px), 860px"
              quality={85}
              className="block h-auto w-full"
              style={{ maxWidth: ASSETS.sceneMobile.width }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
