import { Br } from "@/components/ui/Br";
import { Section } from "@/components/ui/Section";

const PATHS = [
  {
    key: "A",
    label: "이미 홈페이지가 있다면",
    text: (
      <>
        기존 디자인은 그대로 두고 <Br />
        BoostChat만 연결합니다.
      </>
    ),
  },
  {
    key: "B",
    label: "홈페이지도 새로 필요하다면",
    text: (
      <>
        홈페이지 제작 + BoostChat을 <Br />
        함께 구축할 수 있습니다.
      </>
    ),
  },
];

/** 설치 방식 — follows the install scene: existing site + BoostChat, or new site + BoostChat. */
export function InstallPaths() {
  return (
    <Section id="install-paths" aria-label="설치 방식" pt="pt-10">
      <div data-reveal className="grid grid-cols-2 border-t border-line-strong mobile:grid-cols-1">
        {PATHS.map((path, i) => (
          <div
            key={path.key}
            className={`pt-11 pr-12 pb-2 mobile:px-0 mobile:py-7 ${
              i ? "border-l border-line-strong pl-12 mobile:border-t mobile:border-l-0" : "pl-0"
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
            <p className="mt-[18px] mb-0 text-[30px] leading-[1.35] font-bold tracking-[-0.025em] text-ink mobile:text-[22px]">
              {path.text}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
