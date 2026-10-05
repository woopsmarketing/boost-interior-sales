import { Br } from "@/components/ui/Br";
import { Icon } from "@/components/ui/Icon";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { WHY } from "@/lib/home";
import { OPERATOR, SITE_NAME } from "@/lib/site";

const BODY = "m-0 text-[18px] leading-[1.75] tracking-[-0.01em] text-pretty mobile:text-[16px]";

/**
 * 만든 이유 — why it exists, who runs it, and three things a first-time visitor can verify on this
 * page. No customer count, review or result: there is none to show yet, so the proof is the product.
 */
export function Why() {
  const [problem, answer] = WHY.body;
  return (
    <Section id="why" aria-labelledby="why-title" pt="pt-36 mobile:pt-16" pb="pb-0">
      <div
        data-reveal
        className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-x-24 gap-y-8 border-t border-line-strong pt-14 narrow:grid-cols-1 mobile:gap-y-6 mobile:pt-8"
      >
        <SceneHeader
          eyebrow="만든 이유"
          size="md"
          titleId="why-title"
          title={
            <>
              광고로 방문자를 데려오는 것에서 <Br />
              끝나지 않도록 만들었습니다.
            </>
          }
        />
        <div className="grid max-w-[720px] gap-5 pt-[30px] narrow:pt-0 mobile:gap-3.5">
          <p className={`${BODY} text-body`}>{problem}</p>
          <p className={`${BODY} font-medium text-ink`}>{answer}</p>
        </div>
      </div>

      <ul
        data-reveal
        className="mt-12 mb-0 grid list-none grid-cols-3 gap-5 p-0 narrow:grid-cols-1 mobile:mt-7 mobile:gap-0 mobile:rounded-xl mobile:bg-white mobile:px-5 mobile:shadow-md"
      >
        {WHY.checks.map((check) => (
          <li
            key={check.title}
            className="flex gap-4 rounded-xl bg-white p-6 shadow-md mobile:gap-3.5 mobile:rounded-none mobile:border-t mobile:border-line mobile:bg-transparent mobile:px-0 mobile:py-4 mobile:shadow-none mobile:first:border-t-0"
          >
            <span className="grid size-10 flex-none place-items-center rounded-md bg-accent-soft text-accent">
              <Icon name={check.icon} className="size-5" />
            </span>
            <div>
              <p className="m-0 text-[17px] leading-[1.4] font-bold tracking-[-0.01em] text-ink mobile:text-[16px]">{check.title}</p>
              <p className="mt-1.5 mb-0 text-[14px] leading-[1.6] text-pretty text-body">{check.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <p data-reveal className="mt-6 mb-0 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[15px] leading-[1.6] text-muted mobile:mt-5">
        <span className="font-bold text-ink">
          {SITE_NAME} <span className="font-medium text-muted">by {OPERATOR}</span>
        </span>
        <span>
          {SITE_NAME}는 {OPERATOR}가 만들고 운영합니다. 문의는 {OPERATOR} 카카오톡 1:1 오픈채팅에서 받습니다.
        </span>
      </p>
    </Section>
  );
}
