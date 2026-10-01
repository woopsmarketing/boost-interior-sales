"use client";

import { useState } from "react";
import { DisclosureButton, useDisclosure } from "@/components/pricing/Disclosure";
import { Letter, SetupPrice } from "@/components/pricing/SetupParts";
import { Check } from "@/components/ui/CheckList";
import {
  COMMON_BOOSTINTERIOR_SCOPE,
  COMMON_BUILD,
  COMMON_SCOPE_ITEMS,
  SETUP_COMPARISON,
  SETUP_OPTIONS,
  SETUP_SCOPE_GROUPS,
  type SetupOption,
  type SetupScopeKey,
} from "@/lib/pricing";

const TABLE_DETAIL_ID = "setup-scope-table";
const PANEL_DETAIL_ID = "setup-scope-panel";
const BEYOND_LABEL = "기본 범위 밖의 작업";

const ROW_LABEL = "text-[14px] leading-[1.5] font-bold text-balance text-muted";

/** The common build inside the full scope: one cell across all four options, because it is the same in each. */
function CommonScopeLine() {
  return (
    <span className="flex gap-2 text-[14px] leading-[1.55] text-body">
      <Check className="mt-1 size-3.5 text-accent" />
      <span>
        <strong className="font-bold text-ink">네 가지 구축 방식에 동일하게 포함 · 항목 {COMMON_SCOPE_ITEMS.length}개</strong>
        <span className="block">{COMMON_BOOSTINTERIOR_SCOPE.map((group) => group.label).join(" · ")}</span>
      </span>
    </span>
  );
}

/** One option's homepage work in one area: its items, or a line saying the area is left as it is. */
function Scope({ option, area }: { option: SetupOption; area: SetupScopeKey }) {
  const scope = option.includes[area];
  if (typeof scope === "string") return <p className="m-0 text-[14px] leading-[1.55] text-muted">{scope}</p>;
  return (
    <ul className="m-0 grid list-none gap-2 p-0">
      {scope.map((item) => (
        <li key={item} className="flex gap-2 text-[14px] leading-[1.55] text-body">
          <Check className="mt-1 size-3.5 text-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** A comparison value. Rows every option includes say so in words, not only with the mark. */
function Value({ text, included }: { text: string; included?: boolean }) {
  if (!included) return text;
  return (
    <span className="flex gap-2">
      <Check className="mt-1 size-3.5 text-accent" />
      <span>
        <span className="sr-only">포함 · </span>
        {text}
      </span>
    </span>
  );
}

/**
 * 초기 구축 — the four options side by side. The common build is one row, the same in every column;
 * the rest compares the homepage work: the handful of differences first, the full scope of each
 * under one toggle. From 821px up it is a table; below that four columns stop being readable,
 * so the options become a selector and the same rows are shown for one option at a time.
 */
export function SetupComparison() {
  const { open, toggle, ref } = useDisclosure();
  const [selected, setSelected] = useState(0);
  const current = SETUP_OPTIONS[selected];

  return (
    <div data-reveal className="mt-10 mobile:mt-7">
      <div role="group" aria-label="구축 방식 선택" className="hidden grid-cols-2 gap-2.5 min-[600px]:grid-cols-4 mobile:grid">
        {SETUP_OPTIONS.map((option, i) => (
          <button
            key={option.key}
            type="button"
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
            className="flex cursor-pointer flex-col justify-between gap-3 rounded-lg border border-line-strong p-3.5 text-left transition-colors duration-160 ease-out aria-pressed:border-accent aria-pressed:bg-white aria-pressed:shadow-[inset_0_0_0_1px_var(--color-accent),var(--shadow-md)]"
          >
            <span className="flex items-start gap-2">
              <Letter option={option} />
              <span className="pt-[3px] text-[14px] leading-[1.35] font-bold tracking-[-0.01em] text-ink">{option.name}</span>
            </span>
            <SetupPrice option={option} className="text-[19px]" />
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-md mobile:mt-3">
        <table className="w-full table-fixed border-collapse text-left mobile:hidden">
          <caption className="sr-only">초기 구축 방식 4가지 비교</caption>
          <colgroup>
            <col className="w-[15%]" />
            <col span={4} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className={`px-7 py-7 align-bottom narrow:px-5 ${ROW_LABEL}`}>
                항목
              </th>
              {SETUP_OPTIONS.map((option) => (
                <th key={option.key} scope="col" className="border-l border-line px-6 py-7 align-top font-normal narrow:px-4">
                  <a href={`#${option.id}`} className="group flex items-start gap-2.5 text-ink no-underline hover:text-ink">
                    <Letter option={option} />
                    <span className="pt-0.5 text-[16px] leading-[1.35] font-bold tracking-[-0.01em] underline-offset-4 group-hover:underline">
                      {option.name}
                    </span>
                  </a>
                  <span className="mt-4 block">
                    <SetupPrice option={option} className="text-[clamp(21px,2vw,28px)]" />
                  </span>
                  <span className="mt-3 block text-[14px] leading-[1.5] font-bold text-pretty text-ink">{option.website}</span>
                  <span className="mt-0.5 block text-[13px] leading-[1.5] font-medium text-muted">+ {COMMON_BUILD}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SETUP_COMPARISON.map((row) => (
              <tr key={row.label}>
                <th scope="row" className={`border-t border-line px-7 py-4 align-top narrow:px-5 ${ROW_LABEL}`}>
                  {row.label}
                </th>
                {row.values.map((value, i) => (
                  <td
                    key={SETUP_OPTIONS[i].key}
                    className="border-t border-l border-line px-6 py-4 align-top text-[15px] leading-[1.5] font-medium text-ink narrow:px-4"
                  >
                    <Value text={value} included={row.included} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tbody
            id={TABLE_DETAIL_ID}
            hidden={!open}
            className="motion-safe:[&_td]:animate-disclose motion-safe:[&_th]:animate-disclose"
          >
            <tr>
              <th
                scope="colgroup"
                colSpan={5}
                className="border-t border-line bg-sunken px-7 py-3 text-[13px] leading-[1.4] font-bold text-accent narrow:px-5"
              >
                전체 구축 범위
              </th>
            </tr>
            <tr>
              <th scope="row" className={`border-t border-line px-7 py-5 align-top narrow:px-5 ${ROW_LABEL}`}>
                {COMMON_BUILD}
              </th>
              <td colSpan={4} className="border-t border-l border-line px-6 py-5 align-top narrow:px-4">
                <CommonScopeLine />
              </td>
            </tr>
            {SETUP_SCOPE_GROUPS.map((group) => (
              <tr key={group.key}>
                <th scope="row" className={`border-t border-line px-7 py-5 align-top narrow:px-5 ${ROW_LABEL}`}>
                  {group.label}
                </th>
                {SETUP_OPTIONS.map((option) => (
                  <td key={option.key} className="border-t border-l border-line px-6 py-5 align-top narrow:px-4">
                    <Scope option={option} area={group.key} />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className={`border-t border-line px-7 py-5 align-top narrow:px-5 ${ROW_LABEL}`}>
                {BEYOND_LABEL}
              </th>
              {SETUP_OPTIONS.map((option) => (
                <td
                  key={option.key}
                  className="border-t border-l border-line px-6 py-5 align-top text-[14px] leading-[1.55] text-body narrow:px-4"
                >
                  {option.beyond}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <div role="region" aria-label={`${current.name} 구축 범위`} className="hidden mobile:block">
          <p className="m-0 px-5 pt-5 pb-4">
            <span className="block text-[17px] leading-[1.45] font-bold tracking-[-0.02em] text-balance text-ink">
              {current.website}
            </span>
            <span className="mt-0.5 block text-[14px] leading-[1.5] font-medium text-muted">+ {COMMON_BUILD}</span>
          </p>
          <dl className="m-0">
            {SETUP_COMPARISON.map((row) => (
              <div key={row.label} className="grid grid-cols-[104px_minmax(0,1fr)] gap-3 border-t border-line px-5 py-3">
                <dt className="text-[13px] leading-[1.7] font-bold text-muted">{row.label}</dt>
                <dd className="m-0 text-[15px] leading-[1.5] font-semibold text-ink">
                  <Value text={row.values[selected]} included={row.included} />
                </dd>
              </div>
            ))}
          </dl>
          <div id={PANEL_DETAIL_ID} hidden={!open} className="motion-safe:animate-disclose">
            <p className="m-0 border-t border-line bg-sunken px-5 py-2.5 text-[13px] leading-[1.4] font-bold text-accent">
              전체 구축 범위
            </p>
            <dl className="m-0">
              <div className="px-5 py-4">
                <dt className="mb-2.5 text-[13px] leading-[1.5] font-bold text-muted">{COMMON_BUILD}</dt>
                <dd className="m-0">
                  <CommonScopeLine />
                </dd>
              </div>
              {SETUP_SCOPE_GROUPS.map((group) => (
                <div key={group.key} className="border-t border-line px-5 py-4">
                  <dt className="mb-2.5 text-[13px] leading-[1.5] font-bold text-muted">{group.label}</dt>
                  <dd className="m-0">
                    <Scope option={current} area={group.key} />
                  </dd>
                </div>
              ))}
              <div className="border-t border-line px-5 py-4">
                <dt className="mb-1.5 text-[13px] leading-[1.5] font-bold text-muted">{BEYOND_LABEL}</dt>
                <dd className="m-0 text-[14px] leading-[1.55] text-body">{current.beyond}</dd>
              </div>
            </dl>
          </div>
        </div>

        <DisclosureButton
          ref={ref}
          open={open}
          controls={`${TABLE_DETAIL_ID} ${PANEL_DETAIL_ID}`}
          show="전체 구축 범위 보기"
          hide="전체 구축 범위 접기"
          variant="bar"
          onClick={toggle}
        />
      </div>
    </div>
  );
}
