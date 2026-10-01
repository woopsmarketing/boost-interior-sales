import { Section } from "@/components/ui/Section";
import { PRICING_ID, SITE_NAME } from "@/lib/site";

/** Same letters and order as SETUP_OPTIONS in lib/pricing.ts. */
const PATHS = [
  {
    key: "A",
    label: "이미 홈페이지가 있다면",
    text: `기존 디자인은 그대로 두고 ${SITE_NAME}만 연결합니다.`,
  },
  {
    key: "B",
    label: "홈페이지를 손봐야 한다면",
    text: "상담과 문의로 이어지는 동선까지 함께 개선합니다.",
  },
  {
    key: "C",
    label: "홈페이지도 새로 필요하다면",
    text: `홈페이지 제작과 ${SITE_NAME}를 함께 구축합니다.`,
  },
];

/** 구축 방식 — follows the install scene: connect to the existing site, improve it, or build a new one. */
export function InstallPaths() {
  return (
    <Section id="install-paths" aria-label="구축 방식" pt="pt-10">
      <div data-reveal className="grid grid-cols-3 border-t border-line-strong mobile:grid-cols-1">
        {PATHS.map((path, i) => (
          <div
            key={path.key}
            className={`pt-11 pb-2 mobile:px-0 mobile:py-7 ${
              i ? "border-l border-line-strong px-10 narrow:px-6 mobile:border-t mobile:border-l-0" : "pr-10 narrow:pr-6"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`grid size-7 flex-none place-items-center rounded-pill text-[13px] leading-none font-bold text-white ${
                  i ? "bg-gray-900" : "bg-accent"
                }`}
              >
                {path.key}
              </span>
              <h3 className="m-0 text-[15px] leading-[1.4] font-bold text-muted">{path.label}</h3>
            </div>
            <p className="mt-[18px] mb-0 text-[clamp(20px,2vw,26px)] leading-[1.4] font-bold tracking-[-0.025em] text-balance text-ink mobile:text-[22px]">
              {path.text}
            </p>
          </div>
        ))}
      </div>
      <p data-reveal className="mt-9 mb-0 mobile:mt-2">
        <a
          href={`#${PRICING_ID}`}
          className="group inline-flex items-center gap-1.5 text-[15px] leading-[1.4] font-semibold text-link no-underline"
        >
          <span className="underline-offset-4 group-hover:underline">구축 방식별 비용 보기</span>
          <span aria-hidden="true" className="transition-transform duration-160 ease-out group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </p>
    </Section>
  );
}
