import { MonthlyPrice } from "@/components/pricing/ProductParts";
import { Check } from "@/components/ui/CheckList";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { ENTRY_BUILD, PRODUCT_COLUMNS, PRODUCT_COMPARISON, SUBSCRIPTIONS, VAT_NOTICE, won, type Cell } from "@/lib/pricing";
import { COMPARISON_ID } from "@/lib/site";

const ROW_LABEL = "text-[14px] leading-[1.5] font-bold text-balance text-muted";

/** A cell: its words, with a tick for "included" and a dash for "not part of it". The words always say it too. */
function Value({ cell }: { cell: Cell }) {
  if (!cell.mark) return <span className="text-pretty">{cell.text}</span>;
  return (
    <span className={`flex gap-2 ${cell.mark === "no" ? "text-muted" : ""}`}>
      {cell.mark === "yes" ? (
        <Check className="mt-[5px] size-3.5 text-accent" />
      ) : (
        <span aria-hidden="true" className="w-3.5 flex-none text-center text-faint">
          –
        </span>
      )}
      <span className="text-pretty">{cell.text}</span>
    </span>
  );
}

/** The amount at the head of a column: a subscription's month, or the cheapest build. */
function ColumnPrice({ index }: { index: number }) {
  const item = SUBSCRIPTIONS[index];
  if (item) return <MonthlyPrice item={item} className="text-[22px]" />;
  return (
    <span className="inline-flex items-baseline whitespace-nowrap text-ink">
      <span className="text-[22px] leading-none font-bold tracking-[-0.035em]">{won(ENTRY_BUILD.price)}</span>
      <span className="ml-0.5 text-[14px] leading-none font-bold">원</span>
      <span className="ml-1 text-[13px] leading-none font-semibold text-body">부터 · 1회</span>
    </span>
  );
}

/**
 * 상품 비교 — the four things this site sells against the questions an owner asks before choosing.
 * A table from 821px up; below that four columns stop being readable, so each product becomes a
 * card with the same rows. Conditions are written out in every cell: a tick alone would hide them.
 */
export function ProductComparison() {
  return (
    <Section id={COMPARISON_ID} aria-labelledby="comparison-title" pt="pt-24 mobile:pt-14" pb="pb-0" className="scroll-mt-8">
      {/* `two-prices` was the anchor of the block that set the monthly price against the one-time one: this table does that now. */}
      <span id="two-prices" aria-hidden="true" className="block scroll-mt-24" />
      <div data-reveal>
        <SceneHeader
          size="md"
          step="01"
          eyebrow="상품 비교"
          titleId="comparison-title"
          title="네 가지 상품을 같은 질문으로 비교합니다."
          sub={`월 구독 세 가지와 ${PRODUCT_COLUMNS[3]}. 조건이 붙는 항목은 조건까지 적었습니다.`}
          subSize="md"
          subClassName="mobile:text-[16px]"
        />
      </div>

      <div data-reveal className="mt-9 overflow-hidden rounded-xl bg-white shadow-md mobile:hidden">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">{PRODUCT_COLUMNS.join(", ")} 비교</caption>
          <colgroup>
            <col className="w-[17%]" />
            <col span={4} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className={`px-7 py-6 align-bottom narrow:px-5 ${ROW_LABEL}`}>
                항목
              </th>
              {PRODUCT_COLUMNS.map((name, i) => (
                <th key={name} scope="col" className="border-l border-line px-6 py-6 align-top font-normal narrow:px-4">
                  <span className="block text-[17px] leading-[1.35] font-bold tracking-[-0.01em] text-ink">{name}</span>
                  <span className="mt-3 block">
                    <ColumnPrice index={i} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRODUCT_COMPARISON.map((row) => (
              <tr key={row.label} className="even:bg-sunken/60">
                <th scope="row" className={`border-t border-line px-7 py-4 align-top narrow:px-5 ${ROW_LABEL}`}>
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  <td key={PRODUCT_COLUMNS[i]} className="border-t border-l border-line px-6 py-4 align-top text-[14.5px] leading-[1.55] font-medium text-ink narrow:px-4">
                    <Value cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul data-reveal className="mt-7 mb-0 hidden list-none gap-3 p-0 mobile:grid mobile:grid-cols-2 mobile:items-start phone:grid-cols-1">
        {PRODUCT_COLUMNS.map((name, i) => (
          <li key={name} className="overflow-hidden rounded-xl bg-white shadow-md">
            <p className="m-0 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 px-5 pt-5 pb-4">
              <span className="text-[18px] leading-[1.35] font-bold tracking-[-0.02em] text-ink">{name}</span>
              <ColumnPrice index={i} />
            </p>
            <dl className="m-0">
              {PRODUCT_COMPARISON.map((row) => (
                <div key={row.label} className="grid grid-cols-[112px_minmax(0,1fr)] gap-3 border-t border-line px-5 py-3 max-[360px]:grid-cols-1 max-[360px]:gap-1">
                  <dt className="text-[13px] leading-[1.65] font-bold text-muted">{row.label}</dt>
                  <dd className="m-0 text-[14.5px] leading-[1.5] font-medium text-ink">
                    <Value cell={row.cells[i]} />
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <p data-reveal className="mt-4 mb-0 text-[14px] leading-[1.6] text-muted">
        {VAT_NOTICE.all}
      </p>
    </Section>
  );
}
