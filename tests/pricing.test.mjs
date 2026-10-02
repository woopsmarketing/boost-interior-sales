// Pricing regression checks: `npm test` (node --test, no dependencies).
// lib/pricing.ts is the only price source, so the prices, the common build and the VAT wording
// are checked there; the rest of the customer-facing source is scanned as text.
// The copy is written for an owner who knows no web terms, so the wording is checked too.
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import {
  COMMON_BOOSTINTERIOR_SCOPE,
  COMMON_BUILD,
  COMMON_SCOPE_ITEMS,
  COMPARISON,
  COMPARISON_CORE,
  PLANS,
  SETUP_COMPARISON,
  SETUP_OPTIONS,
  SETUP_SCOPE_GROUPS,
  VAT_NOTICE,
  scopeItems,
} from "../lib/pricing.ts";

const ROOT = join(import.meta.dirname, "..");
const sourceFiles = (dir) =>
  readdirSync(join(ROOT, dir), { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(ts|tsx)$/.test(entry.name))
    .map((entry) => join(entry.parentPath, entry.name));
/** Everything a customer can be shown: pages, components and the copy they read from. */
const SOURCE = ["app", "components", "lib"].flatMap(sourceFiles).map((file) => ({ file, text: readFileSync(file, "utf8") }));
/** The same source without comments: what is left can reach the page. */
const code = (text) => text.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");
/** The two files all pricing copy lives in. */
const COPY = SOURCE.filter(({ file }) => /pricing(-page)?\.ts$/.test(file));

test("current prices", () => {
  assert.deepEqual(
    SETUP_OPTIONS.map((option) => [option.key, option.price, Boolean(option.from)]),
    [
      ["A", 290_000, false],
      ["B", 490_000, false],
      ["C", 1_200_000, true],
      ["D", 2_500_000, true],
    ],
  );
  assert.deepEqual(
    PLANS.map((plan) => [plan.name, plan.price]),
    [
      ["Core", 88_000],
      ["Growth", 198_000],
      ["Managed", 297_000],
    ],
  );
});

test("monthly prices are a supply price plus 10% VAT", () => {
  assert.deepEqual(
    PLANS.map((plan) => plan.price / 1.1),
    [80_000, 180_000, 270_000],
  );
});

test("the common build is defined once and covers the agreed scope", () => {
  assert.equal(COMMON_SCOPE_ITEMS.length, 14);
  assert.equal(new Set(COMMON_SCOPE_ITEMS).size, COMMON_SCOPE_ITEMS.length);
  assert.ok(COMMON_BOOSTINTERIOR_SCOPE.length >= 6 && COMMON_BOOSTINTERIOR_SCOPE.length <= 8);
  const all = COMMON_SCOPE_ITEMS.join("\n");
  for (const required of [
    "업체 기본정보",
    "상담 전문정보",
    "기존 시공사례 전체 수집",
    "시공사례 구조화",
    "AI 시공사례 검색",
    "관련 시공사례 추천",
    "AI 상담 흐름",
    "견적 문의 흐름",
    "BoostInterior 관리 화면",
    "AI 상담창 연결",
    "홈페이지 주소",
    "기본 동작 점검",
    "초기 데이터 검수",
  ]) {
    assert.ok(all.includes(required), `common build is missing "${required}"`);
  }
});

test("A / B / C / D all carry the same common build, and none restates or narrows it", () => {
  const [common, ...rest] = SETUP_COMPARISON;
  assert.equal(common.label, COMMON_BUILD);
  assert.equal(common.included, true);
  assert.equal(common.values.length, SETUP_OPTIONS.length);
  assert.equal(new Set(common.values).size, 1, "the common build row must read the same for every option");
  for (const row of rest) assert.ok(!row.label.includes("BoostInterior"), `"${row.label}" compares BoostInterior per option`);

  for (const option of SETUP_OPTIONS) {
    assert.deepEqual(Object.keys(option.includes), SETUP_SCOPE_GROUPS.map((group) => group.key));
    for (const item of scopeItems(option)) {
      assert.ok(!COMMON_SCOPE_ITEMS.includes(item), `${option.key} restates the common item "${item}"`);
      assert.ok(!/BoostInterior (기본 )?(연동|통합|구축)/.test(item), `${option.key} lists its own BoostInterior scope: "${item}"`);
    }
  }
});

test("the plan cards are short, and nothing they left out is missing from the comparison", () => {
  for (const plan of PLANS) {
    assert.ok(plan.highlights.length + (plan.base ? 1 : 0) <= 4, `${plan.name} card is long again`);
  }
  assert.equal(COMPARISON_CORE.length, 6);
  const rows = COMPARISON.flatMap((group) => group.rows);
  assert.equal(rows.length, 22);
  const labels = rows.map((row) => row.label).join("\n");
  // Every feature the cards listed before they were shortened (V2.1).
  for (const feature of [
    "24시간 AI 상담",
    "업체 정보 기반 답변",
    "상담 전문지식 관리 기능",
    "방문자의 공사 조건 이해",
    "실제 시공사례 검색",
    "관련 시공사례 추천",
    "사진 · 시공사례 연결",
    "상담 맥락 유지",
    "견적 문의 수집",
    "상담 기록 확인",
    "기본 시스템 운영",
    "방문자 행동 분석",
    "방문 페이지",
    "주요 클릭 분석",
    "얼마나 머물고 어디에서 나가는지 분석",
    "상담 시작",
    "시공사례 확인",
    "견적 문의로 이어지는 흐름",
    "AI Portfolio Video 제작 지원 · 건수 제한 없음",
    "월 1회 방문 · 상담 데이터 함께 확인",
    "AI 상담 답변 흐름 점검",
    "자주 묻는 질문",
    "답변 개선",
    "전문 상담지식",
    "시공사례 업데이트 지원",
    "상담 · 견적 문의 버튼과 동선 점검",
    "개선 제안",
    "월간 개선 포인트 정리",
    "우선 지원",
  ]) {
    assert.ok(labels.includes(feature), `comparison lost "${feature}"`);
  }
});

test("VAT: every notice says included, nothing says extra", () => {
  for (const line of Object.values(VAT_NOTICE)) assert.match(line, /부가세\(VAT\)가 포함된/);
  for (const { file, text } of SOURCE) {
    assert.ok(!/(VAT|부가세|부가가치세)\s*(는|은)?\s*(별도|미포함|제외)/.test(text), `${file} says VAT is extra`);
  }
  const faq = SOURCE.find(({ file }) => file.endsWith("pricing-page.ts")).text;
  assert.match(faq, /표시 가격에 부가세가 포함되어 있나요\?/);
});

test("no obsolete price, and no amount written outside lib/pricing.ts", () => {
  for (const { file, text } of SOURCE) {
    for (const obsolete of [/700[,_]?000/, /1[,_]?500[,_]?000/, /3[,_]?000[,_]?000/, /150만/, /300만/]) {
      assert.ok(!obsolete.test(text), `${file} still has ${obsolete}`);
    }
    if (file.endsWith(join("lib", "pricing.ts"))) continue;
    // Comments may name an amount; a string or JSX text may not.
    assert.ok(!/\d{2,3}[,_]\d{3}\s*원|\d+\s*만\s*원/.test(code(text)), `${file} hardcodes a price`);
  }
});

test("homepage management is never sold, and never confused with the BoostInterior 관리 화면", () => {
  for (const { file, text } of SOURCE) {
    assert.ok(!/BoostChat/.test(code(text)), `${file} shows BoostChat`);
  }
  // There is no homepage management feature to sell: an option may only name it as work quoted separately.
  for (const option of SETUP_OPTIONS) {
    for (const item of [...scopeItems(option), ...option.highlights, option.summary, option.website]) {
      assert.ok(!/홈페이지 관리|관리자/.test(item), `${option.key} sells homepage management: "${item}"`);
    }
  }
  const [, , improvement, custom] = SETUP_OPTIONS;
  assert.match(improvement.beyond, /홈페이지 관리 기능 재개발.*별도 견적/);
  assert.match(custom.beyond, /홈페이지 관리 기능 개발.*별도 견적/);
  assert.ok(COMMON_SCOPE_ITEMS.some((item) => item.startsWith("BoostInterior 관리 화면")));
});

test("Quick Start: the customer-facing name, and the only badge", () => {
  assert.deepEqual(
    SETUP_OPTIONS.map((option) => [option.key, option.name, option.badge]),
    [
      ["A", "기존 홈페이지 연동", undefined],
      ["B", "Quick Start", "인기상품"],
      ["C", "기존 홈페이지 맞춤 개선", undefined],
      ["D", "맞춤 홈페이지 제작", undefined],
    ],
  );
  for (const { file, text } of SOURCE) {
    assert.ok(!/Quick Website|Custom Website|빠른 홈페이지 제작/.test(code(text)), `${file} still shows an old product name`);
    assert.ok(!/빠른 시작 추천|추천 상품|\bBEST\b|\bPOPULAR\b/.test(code(text)), `${file} uses another badge wording`);
  }
});

test("customer language: no web jargon in what a customer reads", () => {
  for (const { file, text } of SOURCE) {
    const jargon = code(text).match(/\b(SEO|HTTPS|SSL|CMS|UX|CTA|QA)\b|Responsive|반응형|템플릿|[Tt]emplate/);
    assert.ok(!jargon, `${file} shows "${jargon?.[0]}"`);
  }
  for (const { file, text } of COPY) {
    const copy = code(text);
    const jargon = copy.match(/\bURL\b|위젯|도메인|전환|성능|스크립트|백엔드|인터랙션|정보구조|자연어|섹션/);
    assert.ok(!jargon, `${file} shows "${jargon?.[0]}"`);
    // 시공사례, not 포트폴리오 — except the feature names and the one-line description of the video.
    const portfolio = copy.match(/(?<!영상 )포트폴리오|(?<!AI |3D |\+ )Portfolio(?! Video)/);
    assert.ok(!portfolio, `${file} says "${portfolio?.[0]}" for 시공사례`);
  }
});

test("no promise the page cannot keep: search ranking, speed, security", () => {
  for (const { file, text } of COPY) {
    const promise = code(text).match(/상위\s*노출|무조건|최고 속도|완벽한 보안|해킹|100\s*%/);
    assert.ok(!promise, `${file} promises "${promise?.[0]}"`);
  }
});
