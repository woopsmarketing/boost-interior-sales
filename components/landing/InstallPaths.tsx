import { Section } from "@/components/ui/Section";
import { PRICING_ID, SITE_NAME } from "@/lib/site";

/** Same letters and order as SETUP_OPTIONS in lib/pricing.ts. */
const PATHS = [
  {
    key: "A",
    label: "이미 홈페이지가 있다면",
    text: `기존 디자인은 그대로 두고 ${SITE_NAME}를 구축합니다.`,
  },
  {
    key: "B",
    label: "새 홈페이지가 빨리 필요하다면",
    text: `새 홈페이지와 ${SITE_NAME}를 빠르게 시작합니다.`,
  },
  {
    key: "C",
    label: "지금 홈페이지를 고쳐 쓰고 싶다면",
    text: `디자인과 상담 동선을 맞춤 개선하고 ${SITE_NAME}를 함께 구축합니다.`,
  },
  {
    key: "D",
    label: "브랜드부터 새로 설계한다면",
    text: `맞춤 홈페이지와 ${SITE_NAME}를 함께 구축합니다.`,
  },
];

/** 구축 방식 — follows the install scene: connect to the existing site, or build / improve / design one. */
export function InstallPaths() {
  return (
    <Section id="install-paths" aria-label="구축 방식" pt="pt-10">
      <div data-reveal className="grid grid-cols-4 border-t border-line-strong narrow:grid-cols-2 mobile:grid-cols-1">
        {PATHS.map((path, i) => (
          <div
            key={path.key}
            className={[
              "border-line-strong pt-11 pb-2 narrow:pb-10 mobile:px-0 mobile:py-7",
              // 4 columns, then 2 × 2 at ≤1100px, then one column.
              i ? "border-l px-8 mobile:border-t mobile:border-l-0" : "pr-8",
              i % 2 ? "" : "narrow:border-l-0 narrow:pr-8 narrow:pl-0",
              i > 1 ? "narrow:border-t" : "",
            ].join(" ")}
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
            <p className="mt-[18px] mb-0 text-[clamp(19px,1.6vw,22px)] leading-[1.45] font-bold tracking-[-0.025em] text-balance text-ink narrow:text-[22px] mobile:text-[20px]">
              {path.text}
            </p>
          </div>
        ))}
      </div>
      <p data-reveal className="mt-9 mb-0 narrow:mt-7 mobile:mt-2">
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
