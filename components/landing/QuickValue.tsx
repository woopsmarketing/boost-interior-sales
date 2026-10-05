import { Icon } from "@/components/ui/Icon";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { QUICK_VALUES } from "@/lib/home";

/**
 * 한눈에 — what one homepage gets, in four, right under the hero: it is more than a chat window.
 * All four are in every plan. The fourth comes in a different amount per plan, and its card says where it starts.
 */
export function QuickValue() {
  return (
    <Section id="value" aria-labelledby="value-title" pt="pt-16 mobile:pt-14" pb="pb-0">
      <div data-reveal>
        <SceneHeader size="md" eyebrow="한눈에 보기" titleId="value-title" title="홈페이지 하나에서, 여기까지." />
      </div>
      {/* Phones: one card of four rows instead of four cards. */}
      <ul
        data-reveal
        className="mt-8 mb-0 grid list-none grid-cols-4 gap-5 p-0 narrow:grid-cols-2 mobile:mt-5 mobile:grid-cols-1 mobile:gap-0 mobile:rounded-xl mobile:bg-white mobile:px-5 mobile:shadow-md"
      >
        {QUICK_VALUES.map((value) => (
          <li
            key={value.title}
            className={`rounded-xl bg-white p-7 shadow-md mobile:flex mobile:gap-3.5 mobile:rounded-none mobile:border-x-0 mobile:border-t mobile:border-b-0 mobile:border-line mobile:bg-transparent mobile:px-0 mobile:py-4 mobile:shadow-none mobile:first:border-t-0 ${
              value.plan ? "border border-blue-200" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-3 mobile:flex-none mobile:items-start">
              <span className="grid size-11 flex-none place-items-center rounded-md bg-accent-soft text-accent mobile:size-10">
                <Icon name={value.icon} className="size-[22px]" />
              </span>
              {value.plan && <PlanTag className="inline-flex mobile:hidden">{value.plan}</PlanTag>}
            </div>
            <div>
              <h3 className="mt-5 mb-0 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[20px] leading-[1.35] font-bold tracking-[-0.02em] text-ink mobile:mt-0 mobile:text-[17px]">
                {value.title}
                {value.plan && <PlanTag className="hidden mobile:inline-flex">{value.plan}</PlanTag>}
              </h3>
              <p className="mt-2 mb-0 text-[15px] leading-[1.6] text-pretty text-body mobile:mt-1 mobile:text-[14.5px]">{value.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** The plan a value starts at and how much of it that is, said in words next to it. `className` sets where it shows. */
function PlanTag({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span
      className={`h-[26px] flex-none items-center rounded-pill bg-accent px-2.5 text-[12px] leading-none font-bold tracking-normal whitespace-nowrap text-white ${className}`}
    >
      {children}
    </span>
  );
}
