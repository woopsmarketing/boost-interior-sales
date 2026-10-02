// Pricing regression checks: `npm test` (node --test, no dependencies).
// lib/pricing.ts is the only price source, so the prices, the common build and the VAT wording
// are checked there; the rest of the customer-facing source is scanned as text.
// The copy is written for an owner who knows no web terms, so the wording is checked too.
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import {
  BASIC_CONNECTIONS,
  BASIC_CONNECTIONS_SHORT,
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
import { PARTNER_BENEFITS, PARTNER_TERMS } from "../lib/partner.ts";

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
    "기존 시공사례를 AI가 찾아줄 수 있도록 정리",
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
    // 시공사례, not 포트폴리오 — except the two feature names.
    const portfolio = copy.match(/포트폴리오|(?<!AI |3D |\+ )Portfolio(?! Video)/);
    assert.ok(!portfolio, `${file} says "${portfolio?.[0]}" for 시공사례`);
  }
});

test("customer language: one spelling of 시공사례, and no data terms for what is done with them", () => {
  for (const { file, text } of SOURCE) {
    assert.ok(!/시공 사례/.test(text), `${file} spells it "시공 사례"`);
    const term = code(text).match(/구조화|데이터 구조|검색 데이터|포트폴리오/);
    assert.ok(!term, `${file} shows "${term?.[0]}"`);
  }
  for (const name of ["opengraph-image.alt.txt", "twitter-image.alt.txt"]) {
    assert.ok(!/시공 사례/.test(readFileSync(join(ROOT, "app", name), "utf8")), `${name} spells it "시공 사례"`);
  }
});

test("basic connections: B / C / D include the same ones, only complex integration is quoted separately", () => {
  const [integration, quick, improvement, custom] = SETUP_OPTIONS;
  assert.match(BASIC_CONNECTIONS, /카카오톡.*지도.*전화.*SNS 등.*기본 연결 지원/);
  assert.match(BASIC_CONNECTIONS_SHORT, /카카오톡.*지도.*전화.*SNS 등 기본 연결/);
  // A higher-priced option must never read as connecting less than Quick Start.
  for (const option of [quick, improvement, custom]) {
    const connections = scopeItems(option).filter((item) => item.includes("기본 연결"));
    assert.deepEqual(connections, [BASIC_CONNECTIONS], `${option.key} does not carry the basic connections as the others do`);
    assert.ok(option.includes.launch.includes(BASIC_CONNECTIONS), `${option.key} lists the basic connections outside "보안 연결 · 점검"`);
    assert.match(option.beyond, /복잡한 외부 시스템 연동.*별도 견적/);
    // A link or a button is basic; nothing basic may be listed as separately quoted.
    assert.ok(!/카카오|지도|전화|SNS/.test(option.beyond), `${option.key} quotes a basic connection separately`);
  }
  // 기존 홈페이지 연동 leaves the homepage as it is: no homepage work, so no connection work either.
  assert.ok(!scopeItems(integration).some((item) => item.includes("기본 연결")));
  for (const option of [improvement, custom]) assert.match(option.note, /예약 · 결제 등 복잡한 외부 시스템 연동.*별도 견적/);
  // On an existing homepage the connections go as far as the homepage allows, and the copy says so.
  assert.match(improvement.note, /기본 연결은 현재 홈페이지에서 연결 가능한 범위에서 지원/);
  assert.match(improvement.beyond, /추가 개발이 필요한 연결은 범위 확인 후 안내/);
  const faq = SOURCE.find(({ file }) => file.endsWith("pricing-page.ts")).text;
  assert.match(faq, /\$\{BASIC_CONNECTIONS_SHORT\}과 \$\{COMMON_BUILD\}은 두 방식 모두 동일하게 포함됩니다/);
  for (const { file, text } of SOURCE) {
    assert.ok(!/외부 서비스/.test(code(text)), `${file} still says "외부 서비스"`);
    // The names of how the connections are built stay out of the sales copy.
    const internal = code(text).match(/Contact Channels?|Launcher/);
    assert.ok(!internal, `${file} shows "${internal?.[0]}"`);
  }
});

test("scope wording says what is included: improvement bounded", () => {
  const [, , improvement] = SETUP_OPTIONS;
  for (const option of SETUP_OPTIONS) {
    const all = [...scopeItems(option), option.beyond, option.note ?? ""].join("\n");
    assert.ok(!/외부 서비스/.test(all), `${option.key} still says "외부 서비스"`);
    assert.ok(!/기본적인 문제점|모든 문제/.test(all), `${option.key} promises to fix everything`);
  }
  assert.ok(scopeItems(improvement).some((item) => /주요 페이지 오류 등 필요한 범위를 확인해 개선/.test(item)));
  assert.ok(!SETUP_COMPARISON.some((row) => row.values.some((value) => /문제점/.test(value))));
});

test("Quick Start: edits are supported on request, the example site is never a customer case", () => {
  const [, quick] = SETUP_OPTIONS;
  assert.match(quick.note, /홈페이지 내용 수정이 필요한 경우 요청해주시면 반영을 지원합니다/);
  const page = SOURCE.find(({ file }) => file.endsWith("pricing-page.ts")).text;
  assert.match(page, /cta: `\$\{QUICK\.name\} 예시 보기`/);
  assert.match(page, /가상 인테리어 업체를 기준으로 만든 예시 사이트입니다/);
  for (const { file, text } of SOURCE) {
    const claim = code(text).match(/고객 사례|고객 제작 사례|실제 고객 홈페이지|구축 사례|성공 사례|실제 구축 고객/);
    assert.ok(!claim, `${file} presents the demo as "${claim?.[0]}"`);
    // Customers do not edit the homepage themselves, and 시공사례 upload is not a feature yet.
    const selfService = code(text).match(/고객이 직접|직접 (등록|업로드)|직접 수정할 수|시공사례 (등록|업로드) 기능/);
    assert.ok(!selfService, `${file} sells self-service editing: "${selfService?.[0]}"`);
  }
});

test("Founding Partner: six benefits in plain Korean, no amount invented", () => {
  assert.deepEqual(
    PARTNER_BENEFITS.map((benefit) => benefit.title),
    [
      "향후 플랫폼 우선 입점",
      "기본 입점비 12개월 무료",
      "AI 시공사례 영상 우선 혜택",
      "3D 시공사례 우선 적용",
      "신규 기능 먼저 이용",
      "초기 파트너 전용 할인 · 무료 이용 혜택",
    ],
  );
  const copy = PARTNER_BENEFITS.flatMap((benefit) => [benefit.tag, benefit.title, benefit.text]).join("\n");
  const jargon = copy.match(/Platform|Early Access|Partner Benefits|Credit|크레딧|전환|포트폴리오|12 Months/);
  assert.ok(!jargon, `Founding Partner copy shows "${jargon?.[0]}"`);
  // English only as the product name and the two feature names.
  const english = copy.replace(/AI Portfolio Video|3D Portfolio|BoostInterior|\bAI\b|\b3D\b/g, "").match(/[A-Za-z]{2,}/);
  assert.ok(!english, `Founding Partner copy shows "${english?.[0]}"`);
  assert.ok(!/\d\s*(%|원|만원)/.test(copy), "Founding Partner copy states an amount");
  assert.match(PARTNER_TERMS, /광고 · 프리미엄 노출 등 추가 상품은 포함되지 않습니다/);
});

test("no promise the page cannot keep: search ranking, speed, security", () => {
  for (const { file, text } of COPY) {
    const promise = code(text).match(/상위\s*노출|무조건|최고 속도|완벽한 보안|해킹|100\s*%/);
    assert.ok(!promise, `${file} promises "${promise?.[0]}"`);
  }
});
