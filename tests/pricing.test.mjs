// Regression checks for the sales site: `npm test` (node --test, no dependencies).
// lib/pricing.ts is the only price source, so the prices, what each product carries, what works
// today and the trial policy are checked there; the rest of the customer-facing source is scanned
// as text. The copy is written for an owner who knows no web terms, so the wording is checked too.
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import {
  ALL_IN_ONE,
  BASIC_CONNECTIONS,
  BASIC_CONNECTIONS_SHORT,
  CONSULT_SETUP_ITEMS,
  ENTRY_BUILD,
  INTEGRATION_OPTION,
  PRODUCT_COLUMNS,
  PRODUCT_COMPARISON,
  SETUP_COMPARISON,
  SETUP_OPTIONS,
  SETUP_SCOPE_GROUPS,
  SITUATIONS,
  STATUS_LABEL,
  SUBSCRIPTIONS,
  TRIAL,
  VAT_NOTICE,
  WEBSITE_OPERATION,
  monthly,
  scopeItems,
  won,
} from "../lib/pricing.ts";
import { PARTNER_BENEFITS, PARTNER_TERMS } from "../lib/partner.ts";

const ROOT = join(import.meta.dirname, "..");
const sourceFiles = (dir) =>
  readdirSync(join(ROOT, dir), { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(ts|tsx)$/.test(entry.name))
    .map((entry) => join(entry.parentPath, entry.name));
/** Everything a customer can be shown: pages, components and the copy they read from. */
const SOURCE = ["app", "components", "lib"].flatMap(sourceFiles).map((file) => ({ file, text: readFileSync(file, "utf8") }));
/** The same source without comments: what is left can reach the page. The `//` of an address (https://…) is not a comment. */
const code = (text) => text.replace(/\/\*[\s\S]*?\*\/|(?<!:)\/\/.*$/gm, "");
/** The files all copy lives in: prices, the pricing pages, the landing and the feature pages. */
const COPY = SOURCE.filter(({ file }) => /lib[\\/](pricing|pricing-page|home|features)\.ts$/.test(file));
const read = (...path) => readFileSync(join(ROOT, ...path), "utf8");
const src = (...path) => code(read(...path));

const [MARKETING, CONSULTATION, BUNDLE] = SUBSCRIPTIONS;

// ---------------------------------------------------------------- Prices and products

test("PRICE-1 the three subscriptions, by name and amount", () => {
  assert.deepEqual(
    SUBSCRIPTIONS.map((item) => [item.key, item.id, item.name, item.price]),
    [
      ["marketing", "ai-marketing", "AI 마케팅", 29_700],
      ["consultation", "ai-consultation", "AI 상담", 19_800],
      ["all-in-one", "all-in-one", "올인원", 39_600],
    ],
  );
  assert.deepEqual(SUBSCRIPTIONS.map(monthly), ["월 29,700원", "월 19,800원", "월 39,600원"]);
  // Each is a supply price plus 10% VAT, as the site's VAT wording says.
  assert.deepEqual(
    SUBSCRIPTIONS.map((item) => Math.round(item.price / 1.1)),
    [27_000, 18_000, 36_000],
  );
});

test("PRICE-2 올인원 is the other two together: its saving is computed, and it builds no homepage", () => {
  assert.equal(ALL_IN_ONE.separate, MARKETING.price + CONSULTATION.price);
  assert.equal(ALL_IN_ONE.separate, 49_500);
  assert.equal(ALL_IN_ONE.saving, 9_900);
  assert.equal(BUNDLE.price, ALL_IN_ONE.separate - ALL_IN_ONE.saving);
  assert.deepEqual([...ALL_IN_ONE.parts], ["marketing", "consultation"]);
  assert.deepEqual([...BUNDLE.features], ["AI 마케팅 전체", "AI 상담 전체"]);
  assert.match(BUNDLE.caution, /홈페이지 신규 제작은 포함되지 않습니다/);
  // The saving is never typed: wherever it is shown, it is read from ALL_IN_ONE.
  const pricing = src("lib", "pricing.ts");
  assert.match(pricing, /saving: MARKETING\.price \+ CONSULTATION\.price - BUNDLE\.price/);
  for (const { file, text } of SOURCE) {
    if (file.endsWith(join("lib", "pricing.ts"))) continue;
    const typed = code(text).match(/29[,_]?700|19[,_]?800|39[,_]?600|49[,_]?500|9[,_]?900/);
    assert.ok(!typed, `${file} types a monthly amount: "${typed?.[0]}"`);
  }
});

test("PRICE-3 the four homepage builds: names and prices did not move", () => {
  assert.deepEqual(
    SETUP_OPTIONS.map((option) => `${option.name} ${won(option.price)}원${option.from ? "부터" : ""}`),
    ["기존 홈페이지 연동 290,000원", "Quick Start 490,000원", "기존 홈페이지 맞춤 개선 1,200,000원부터", "맞춤 홈페이지 제작 2,500,000원부터"],
  );
  assert.deepEqual(
    SETUP_OPTIONS.map((option) => [option.key, option.id, option.badge]),
    [
      ["A", "integration", undefined],
      ["B", "quick-website", "홈페이지가 없다면 추천"],
      ["C", "improvement", undefined],
      ["D", "custom-website", undefined],
    ],
  );
  // "홈페이지 제작 49만원부터" reads the cheapest option that makes a homepage; 연동 connects AI 상담 and builds none.
  assert.equal(ENTRY_BUILD.key, "B");
  assert.equal(INTEGRATION_OPTION.key, "A");
  assert.deepEqual(SETUP_OPTIONS.map((option) => option.builds), [false, true, false, true]);
  assert.match(INTEGRATION_OPTION.note, /새 홈페이지를 만드는 상품이 아니라/);
});

test("PRICE-4 no obsolete price or plan, and no amount written outside lib/pricing.ts", () => {
  for (const { file, text } of SOURCE) {
    for (const obsolete of [/700[,_]?000/, /1[,_]?500[,_]?000/, /3[,_]?000[,_]?000/, /150만/, /300만/, /88[,_]000/, /198[,_]000/, /297[,_]000/]) {
      assert.ok(!obsolete.test(text), `${file} still has ${obsolete}`);
    }
    // The earlier monthly plans are gone, and so are their names.
    const plan = code(text).match(/\b(Core|Growth|Managed)\b|운영 플랜|PLANS\b/);
    assert.ok(!plan, `${file} still names an earlier plan: "${plan?.[0]}"`);
    if (file.endsWith(join("lib", "pricing.ts"))) continue;
    // Comments may name an amount; a string or JSX text may not.
    assert.ok(!/\d{2,3}[,_]\d{3}\s*원|\d+\s*만\s*(원|부터)|\b(290|490|1200|2500)000\b/.test(code(text)), `${file} hardcodes a price`);
  }
});

test("PRICE-5 VAT: every notice says included, nothing says extra", () => {
  for (const line of Object.values(VAT_NOTICE)) assert.match(line, /부가세\(VAT\)가 포함된/);
  for (const { file, text } of SOURCE) {
    assert.ok(!/(VAT|부가세|부가가치세)\s*(는|은)?\s*(별도|미포함|제외)/.test(text), `${file} says VAT is extra`);
  }
  assert.match(read("lib", "pricing-page.ts"), /표시 가격에 부가세가 포함되어 있나요\?/);
});

test("PRICE-6 homepage operation: no monthly fee, and nothing promised beyond that", () => {
  assert.equal(WEBSITE_OPERATION.label, "기본 운영 월 이용료 없음");
  assert.match(WEBSITE_OPERATION.separate, /주소의 구매 · 갱신 비용[^.]*포함되지 않습니다/);
  assert.match(WEBSITE_OPERATION.separate, /기본 운영에 포함되는 범위는 계약 전에 먼저 안내/);
  for (const { file, text } of SOURCE) {
    const copy = code(text);
    const unlimited = copy.match(/무제한|제한 없는|제한 없이|unlimited|평생 무료|영구 무료/i);
    assert.ok(!unlimited, `${file} says "${unlimited?.[0]}"`);
    const free = copy.match(/(도메인|주소)[^.\n]{0,10}무료|호스팅[^.\n]{0,10}무료/);
    assert.ok(!free, `${file} promises a free address or hosting: "${free?.[0]}"`);
  }
});

// ---------------------------------------------------------------- What works today, and the trial

test("STATUS-1 three words for availability, and each product says where it works today", () => {
  assert.deepEqual(STATUS_LABEL, { now: "지금 이용 가능", planned: "출시 예정", unsupported: "현재 미지원" });
  for (const item of SUBSCRIPTIONS) assert.ok(item.availability.some((entry) => entry.status === "now"), `${item.name} has nothing usable today`);
  // AI 마케팅 needs a homepage made with the product today; using it alone is decided, not released.
  assert.deepEqual(MARKETING.availability.map((entry) => entry.status), ["now", "planned"]);
  assert.match(MARKETING.availability[0].text, /BoostInterior로 만든 홈페이지와 함께/);
  assert.match(MARKETING.availability[1].text, /홈페이지 없이/);
  // AI 상담 goes onto an existing homepage; recommending that homepage's own 시공사례 as cards does not.
  assert.deepEqual(CONSULTATION.availability.map((entry) => entry.status), ["now", "now", "unsupported"]);
  assert.match(CONSULTATION.availability[2].text, /기존 홈페이지의 시공사례를 카드로 추천/);
  assert.ok(CONSULTATION.features.some((line) => /시공사례 안내 · 추천 \(BoostInterior 홈페이지에 게시한 시공사례가 있을 때\)/.test(line)));
  // The cards and the feature pages show these lines as they are.
  for (const where of [["components", "pricing", "Subscriptions.tsx"], ["components", "pricing", "SubscriptionDetails.tsx"], ["components", "landing", "CaseBuilder.tsx"], ["components", "landing", "Consult.tsx"]]) {
    assert.match(src(...where), /<AvailabilityList items=\{(item|product)\.availability\}/, `${where.at(-1)} lost the availability list`);
  }
  // Which subscriptions a build leaves usable today.
  assert.deepEqual(
    SETUP_OPTIONS.map((option) => [...option.subscriptions]),
    [["consultation"], ["marketing", "consultation", "all-in-one"], ["consultation"], ["marketing", "consultation", "all-in-one"]],
  );
  for (const row of SITUATIONS) assert.match(row.need, /(싶어요|필요해요)$/);
  assert.equal(SITUATIONS.filter((row) => row.status === "planned").length, 1);
});

test("TRIAL-1 the 14-day trial is a policy for launch: nothing on the site starts it", () => {
  assert.equal(TRIAL.status, "planned");
  assert.equal(TRIAL.days, 14);
  assert.equal(TRIAL.product, "marketing");
  assert.equal(TRIAL.label, "14일 무료 체험 예정");
  assert.equal(TRIAL.steps.length, 4);
  assert.match(TRIAL.steps.join(" "), /회원가입은 무료[\s\S]*카드를 등록하고 정기결제에 동의[\s\S]*14일 동안 무료[\s\S]*월 29,700원이 정기결제/);
  assert.match(TRIAL.cancel, /체험 중에 해지하면 첫 결제는 이루어지지 않습니다/);
  assert.match(TRIAL.notice, /지금은 카드 등록과 무료 체험을 시작할 수 없으며/);
  assert.match(TRIAL.others, /무료 체험 여부는 정해지지 않았으며/);
  // The policy block always carries the notice; a file that names the trial shows the policy, its status or the notice.
  const policy = src("components", "pricing", "TrialPolicy.tsx");
  assert.match(policy, /\{TRIAL\.notice\}/);
  assert.match(policy, /<StatusChip status=\{TRIAL\.status\}/);
  assert.ok(!/<ButtonLink|<Button|<a\b|href=/.test(policy), "the trial policy has a button of its own");
  for (const { file, text } of SOURCE) {
    const copy = code(text);
    if (/\.tsx$/.test(file) && /TRIAL\.(title|label)/.test(copy)) {
      assert.match(copy, /TRIAL\.notice|<TrialPolicy|<StatusChip status=\{TRIAL\.status\}/, `${file} names the trial without saying it is not open`);
    }
    // No button says a trial, a subscription or a payment starts here.
    const start = copy.match(/(무료\s*체험|체험)\s*(시작|신청)하기|무료로 시작|지금 (시작|가입|구독|결제)하기|카드 등록하기|결제하기|구독하기|가입하기/);
    assert.ok(!start, `${file} offers to start something the site cannot: "${start?.[0]}"`);
  }
});

test("PAY-1 the site takes no payment and collects nothing", () => {
  assert.ok(!readdirSync(join(ROOT, "app")).includes("api"), "the sales site has an API route");
  for (const { file, text } of SOURCE) {
    const copy = code(text);
    const form = copy.match(/<form\b|<input\b|<textarea\b|type="submit"|"use server"|payple|checkout|billing/i);
    assert.ok(!form, `${file} has a form or a payment hook: "${form?.[0]}"`);
    // The site counts nothing, so it ships no allowance screen either.
    const system = copy.match(/quota|usage|credit|counter|크레딧|차감|잔여|남은\s*(건수|횟수)|사용량/i);
    assert.ok(!system, `${file} has "${system?.[0]}"`);
  }
  // What a month covers is not decided: no count is given anywhere a subscription is described.
  for (const item of SUBSCRIPTIONS) {
    for (const line of [item.line, item.summary, ...item.features, item.caution]) {
      assert.ok(!/월\s*\d+\s*(건|회|편|개)|\d+\s*(건|회|편)\s*까지/.test(line), `${item.name} states an allowance: "${line}"`);
    }
  }
});

// ---------------------------------------------------------------- Comparison tables and build scope

test("COMPARE-1 the product comparison answers the twelve questions for all four products", () => {
  assert.deepEqual([...PRODUCT_COLUMNS], ["AI 마케팅", "AI 상담", "올인원", "홈페이지 제작"]);
  assert.deepEqual(
    PRODUCT_COMPARISON.map((row) => row.label),
    [
      "홈페이지가 있어야 하나요",
      "시공사진 · 공사 정보 등록",
      "릴스 · 쇼츠 영상",
      "게시글 · 블로그 초안",
      "AI 상담",
      "견적 문의 접수",
      "시공사례 추천에 필요한 자료",
      "홈페이지 구축",
      "홈페이지 기본 운영 월 이용료",
      "초기 구축비",
      "무료 체험",
      "별도 연동 · 설정",
    ],
  );
  for (const row of PRODUCT_COMPARISON) {
    assert.equal(row.cells.length, PRODUCT_COLUMNS.length);
    for (const cell of row.cells) assert.ok(cell.text.length > 0, `"${row.label}" has an empty cell`);
  }
  const row = (label) => PRODUCT_COMPARISON.find((entry) => entry.label === label).cells;
  // No subscription includes a homepage build, 올인원 least of all.
  for (const cell of row("홈페이지 구축").slice(0, 3)) assert.deepEqual(cell, { text: "포함되지 않음", mark: "no" });
  // The trial is said as planned for AI 마케팅 and as undecided for the other two.
  assert.equal(row("무료 체험")[0].text, TRIAL.label);
  assert.equal(row("무료 체험")[1].text, "출시 전에 안내");
  assert.match(row("홈페이지가 있어야 하나요")[0].text, /지금은 BoostInterior로 만든 홈페이지 필요 · 단독 이용은 출시 예정/);
  // The table and the phone cards render the same rows.
  const table = src("components", "pricing", "ProductComparison.tsx");
  assert.equal((table.match(/PRODUCT_COMPARISON\.map/g) ?? []).length, 2);
});

test("COMPARE-2 the build comparison: one value per option in every row", () => {
  assert.equal(SETUP_COMPARISON.length, 10);
  for (const row of SETUP_COMPARISON) assert.equal(row.values.length, SETUP_OPTIONS.length, `"${row.label}" is missing a value`);
  const row = (label) => SETUP_COMPARISON.find((entry) => entry.label.startsWith(label)).values;
  assert.deepEqual(row("홈페이지 기본 운영 월 이용료"), ["해당 없음 · 기존 방식 그대로", "없음", "해당 없음 · 기존 방식 그대로", "없음"]);
  assert.deepEqual(row("AI 마케팅"), ["단독 이용 출시 후", "바로 이용", "단독 이용 출시 후", "바로 이용"]);
  for (const option of SETUP_OPTIONS) {
    assert.deepEqual(Object.keys(option.includes), SETUP_SCOPE_GROUPS.map((group) => group.key));
    assert.match(option.need, /싶어요$/);
    assert.match(option.situation, /다면$/);
  }
  assert.equal(new Set(SETUP_OPTIONS.map((option) => option.situation)).size, SETUP_OPTIONS.length, "two options answer the same situation");
});

test("SCOPE-1 homepage management is never sold, and never confused with the BoostInterior 관리 화면", () => {
  for (const { file, text } of SOURCE) assert.ok(!/BoostChat/.test(code(text)), `${file} shows BoostChat`);
  // There is no homepage management feature to sell: an option may only name it as work quoted separately.
  for (const option of SETUP_OPTIONS) {
    for (const item of [...scopeItems(option), ...option.highlights, option.summary, option.website]) {
      assert.ok(!/홈페이지 관리|관리자/.test(item), `${option.key} sells homepage management: "${item}"`);
    }
  }
  const [, , improvement, custom] = SETUP_OPTIONS;
  assert.match(improvement.beyond, /홈페이지 관리 기능 재개발.*별도 견적/);
  assert.match(custom.beyond, /홈페이지 관리 기능 개발.*별도 견적/);
  assert.equal(CONSULT_SETUP_ITEMS.length, 5);
  assert.ok(CONSULT_SETUP_ITEMS.some((item) => item.startsWith("BoostInterior 관리 화면 연결")));
});

test("SCOPE-2 basic connections: B / C / D include the same ones, only complex integration is quoted separately", () => {
  const [integration, quick, improvement, custom] = SETUP_OPTIONS;
  assert.match(BASIC_CONNECTIONS, /카카오톡.*지도.*전화.*SNS 등.*기본 연결 지원/);
  assert.match(BASIC_CONNECTIONS_SHORT, /카카오톡.*지도.*전화.*SNS 등 기본 연결/);
  // A higher-priced option must never read as connecting less than Quick Start.
  for (const option of [quick, improvement, custom]) {
    const connections = scopeItems(option).filter((item) => item.includes("기본 연결"));
    assert.deepEqual(connections, [BASIC_CONNECTIONS], `${option.key} does not carry the basic connections as the others do`);
    assert.ok(option.includes.launch.includes(BASIC_CONNECTIONS), `${option.key} lists the basic connections outside "보안 연결 · 점검"`);
    assert.match(option.beyond, /복잡한 외부 시스템 연동.*별도 견적/);
    assert.ok(!/카카오|지도|전화|SNS/.test(option.beyond), `${option.key} quotes a basic connection separately`);
  }
  // 기존 홈페이지 연동 leaves the homepage as it is: no homepage work, so no connection work either.
  assert.ok(!scopeItems(integration).some((item) => item.includes("기본 연결")));
  for (const option of [improvement, custom]) assert.match(option.note, /예약 · 결제 등 복잡한 외부 시스템 연동.*별도 견적/);
  assert.match(improvement.note, /기본 연결은 현재 홈페이지에서 연결 가능한 범위에서 지원/);
  assert.match(improvement.beyond, /추가 개발이 필요한 연결은 범위 확인 후 안내/);
  assert.match(read("lib", "pricing-page.ts"), /\$\{BASIC_CONNECTIONS_SHORT\}은 홈페이지를 만들거나 고치는 세 가지 방식에 모두 같은 범위로 포함됩니다/);
  for (const { file, text } of SOURCE) {
    assert.ok(!/외부 서비스/.test(code(text)), `${file} still says "외부 서비스"`);
    const internal = code(text).match(/Contact Channels?|Launcher/);
    assert.ok(!internal, `${file} shows "${internal?.[0]}"`);
  }
});

test("SCOPE-3 scope wording says what is included; the example site is never a customer case", () => {
  const [, quick, improvement] = SETUP_OPTIONS;
  for (const option of SETUP_OPTIONS) {
    const all = [...scopeItems(option), option.beyond, option.note ?? ""].join("\n");
    assert.ok(!/기본적인 문제점|모든 문제/.test(all), `${option.key} promises to fix everything`);
  }
  assert.ok(scopeItems(improvement).some((item) => /주요 페이지 오류 등 필요한 범위를 확인해 개선/.test(item)));
  assert.ok(!SETUP_COMPARISON.some((row) => row.values.some((value) => /문제점/.test(value))));
  assert.match(quick.note, /홈페이지 내용 수정이 필요한 경우 요청해주시면 반영을 지원합니다/);
  const page = read("lib", "pricing-page.ts");
  assert.match(page, /cta: `\$\{QUICK\.name\} 예시 보기`/);
  assert.match(page, /가상 인테리어 업체를 기준으로 만든 예시 사이트입니다/);
  for (const { file, text } of SOURCE) {
    const claim = code(text).match(/고객 사례|고객 제작 사례|실제 고객 홈페이지|구축 사례|성공 사례|실제 구축 고객/);
    assert.ok(!claim, `${file} presents the demo as "${claim?.[0]}"`);
    // Customers do not edit the homepage itself. A 시공사례 is written and published from the admin; the
    // copy says that in its own words and never as editing the homepage.
    const selfService = code(text).match(/고객이 직접|직접 (등록|업로드)|직접 수정할 수|시공사례 (등록|업로드) 기능/);
    assert.ok(!selfService, `${file} sells self-service editing: "${selfService?.[0]}"`);
    assert.ok(!/Quick Website|Custom Website|빠른 홈페이지 제작/.test(code(text)), `${file} still shows an old product name`);
    assert.ok(!/빠른 시작 추천|추천 상품|\bBEST\b|\bPOPULAR\b/.test(code(text)), `${file} uses another badge wording`);
    const popular = code(text).match(/인기\s*상품|가장 많이 (선택|찾는|팔린)|베스트셀러|판매 1위/);
    assert.ok(!popular, `${file} claims popularity without a sales record: "${popular?.[0]}"`);
  }
});

// ---------------------------------------------------------------- Customer language

test("LANG-1 no web or product jargon in what a customer reads", () => {
  for (const { file, text } of SOURCE) {
    const jargon = code(text).match(/\b(SEO|HTTPS|SSL|CMS|UX|CTA|QA|LLM|RAG|SaaS)\b|Responsive|반응형|템플릿|[Tt]emplate|AI Portfolio Video|Portfolio Video|챗봇 빌더/);
    assert.ok(!jargon, `${file} shows "${jargon?.[0]}"`);
  }
  for (const { file, text } of COPY) {
    const copy = code(text);
    const jargon = copy.match(/\bURL\b|위젯|도메인|전환|성능|스크립트|백엔드|인터랙션|정보구조|자연어|섹션/);
    assert.ok(!jargon, `${file} shows "${jargon?.[0]}"`);
    const promise = copy.match(/상위\s*노출|무조건|최고 속도|완벽한 보안|해킹|100\s*%/);
    assert.ok(!promise, `${file} promises "${promise?.[0]}"`);
  }
});

test("LANG-2 one spelling of 시공사례, and no data terms for what is done with them", () => {
  for (const { file, text } of SOURCE) {
    assert.ok(!/시공 사례/.test(text), `${file} spells it "시공 사례"`);
    const term = code(text).match(/구조화|데이터 구조|검색 데이터|포트폴리오|Portfolio/);
    assert.ok(!term, `${file} shows "${term?.[0]}"`);
  }
  for (const name of ["opengraph-image.alt.txt", "twitter-image.alt.txt"]) {
    assert.ok(!/시공 사례/.test(read("app", name)), `${name} spells it "시공 사례"`);
  }
});

test("LANG-3 labels: 문의 has two names, the demo has one", () => {
  const site = read("lib", "site.ts");
  assert.match(site, /KAKAO_LABEL = "카카오톡 문의"/);
  assert.match(site, /KAKAO_RECOMMEND_LABEL = "내 홈페이지 기준으로 추천받기"/);
  assert.match(site, /DEMO_LABEL = "실제 데모 체험하기"/);
  for (const { file, text } of SOURCE) {
    const old = code(text).match(/도입 상담|상담받기|상담 신청|1:1 상담|실제 데모 보기|데모 보기/);
    assert.ok(!old, `${file} uses another label: "${old?.[0]}"`);
    // "카카오톡 상담" stays in the price list as homepage work (a link on the customer's own homepage), never as our button.
    if (!file.endsWith(join("lib", "pricing.ts"))) assert.ok(!/카카오톡 상담/.test(code(text)), `${file} uses another label: "카카오톡 상담"`);
    // 문의 happens in the chat room. Nobody is called, and the page must not suggest it.
    const call = code(text).match(/전화\s*(드리|드립|상담|로 안내)|연락\s*드리겠|콜백/);
    assert.ok(!call, `${file} suggests a sales call: "${call?.[0]}"`);
    // "내 홈페이지 기준으로 추천받기" does not name KakaoTalk, so every place it is shown says so next to it.
    if (/\{KAKAO_RECOMMEND_LABEL\}/.test(code(text))) assert.match(code(text), /\{KAKAO_NOTE\}/, `${file} shows the 추천 button without saying it opens KakaoTalk`);
    if (file.endsWith(join("lib", "site.ts"))) continue;
    // Each link to the chat room or the demo takes its words and its address from lib/site.ts.
    assert.ok(!/>\s*(카카오톡 문의|내 홈페이지 기준으로 추천받기|실제 데모 체험하기)\s*</.test(code(text)), `${file} hardcodes a link label`);
    assert.ok(!/open\.kakao\.com|interior-demo\.|boostweb\.co\.kr|boostwork\.co\.kr/.test(code(text)), `${file} hardcodes a link address`);
  }
});

test("HONEST-1 no customer count, review, result figure, deadline or delivery time", () => {
  for (const { file, text } of SOURCE) {
    const claim = code(text).match(
      /\d[\d,]*\s*(개|곳)?\s*(업체|고객사|고객)\s*(가|이)?\s*(도입|사용|이용|선택)|후기|리뷰|별점|만족도|전환율|문의\s*\d+\s*(%|배)|매출\s*\d|마감 임박|선착순|오늘만|한정 (수량|특가)|\d+\s*(일|영업일|주)\s*(만에|이내|안에)/,
    );
    assert.ok(!claim, `${file} makes a claim nothing backs: "${claim?.[0]}"`);
    // Nothing unreleased is dated, and no placeholder stands where a fact is missing.
    const filler = code(text).match(/곧 (출시|제공|공개)|출시 예정일|준비\s*중|XXX|000-00-00000|\d+월\s*(출시|오픈)/);
    assert.ok(!filler, `${file} shows "${filler?.[0]}"`);
    const real = code(text).match(/실제\s*(시공|공사)\s*(전후|전 ?· ?후|비포)|실제 고객의? (시공|현장)/);
    assert.ok(!real, `${file} presents demo imagery as a real job: "${real?.[0]}"`);
    // The video is made by the product on a press; nothing says it happens by itself, and it is not a 3D feature.
    const name = code(text).match(/3D (시공사례 )?영상|자동\s*(제작|생성)|영상 생성/);
    assert.ok(!name, `${file} says "${name?.[0]}"`);
    assert.ok(!/(업체와 문의만|업체만) 데모/.test(code(text)), `${file} says only part of the demo data is fictional`);
  }
  // The demo's cases and photos are examples too (its photos are AI-made).
  assert.match(read("lib", "site.ts"), /DEMO_SCREEN_NOTE = `[^`]*가상 업체[^`]*AI로 만든 예시 이미지/);
  assert.match(read("lib", "home.ts"), /업체와 시공사례, 문의는 데모용 예시이고, 사진은 AI로 만든 예시 이미지/);
});

test("HONEST-2 nothing is posted for the owner, nobody is alerted, and the page says so in plain words", () => {
  for (const { file, text } of SOURCE) {
    // "자동으로 올라가나요?" may be asked, and "자동으로 게시되지는 않습니다" may answer it. Nothing else may pair the two.
    for (const line of code(text).split("\n")) {
      if (!/자동(으로)?\s*(게시|업로드|포스팅|발행|등록|올라|올려|올리)/.test(line)) continue;
      assert.match(line, /않습니다|없습니다|나요\?/, `${file} reads as automatic posting: ${line.trim()}`);
    }
    const alert = code(text).match(/(문의|상담)[^.\n]{0,12}(알림|알려\s?드|푸시|문자로)/);
    assert.ok(!alert, `${file} promises an alert the product does not send: "${alert?.[0]}"`);
  }
  for (const where of [["lib", "home.ts"], ["lib", "features.ts"]]) {
    const item = read(...where).match(/q: "인스타그램 · 유튜브 · 블로그에 자동으로 올라가나요\?",\s*a: `([^`]*)`/);
    assert.ok(item, `${where.at(-1)} lost the question about automatic posting`);
    assert.match(item[1], /^아니요\. 자동으로 게시되지는 않습니다\./);
    assert.match(item[1], /내려받고[^.]*복사해서[^.]*직접 올립니다/);
  }
  assert.match(MARKETING.caution, /인스타그램 · 유튜브 · 블로그에는 대표님이 직접 올립니다/);
  // An existing homepage: AI 상담 yes; the 시공사례 cards and AI 마케팅 not today — said in the landing's FAQ.
  const existing = read("lib", "home.ts").match(/q: "기존 홈페이지에도 적용할 수 있나요\?",\s*a: `([^`]*)`/);
  assert.ok(existing, "the FAQ lost the question about an existing homepage");
  assert.match(existing[1], /시공사례를 카드로 추천하는 기능과 \$\{MARKETING\.name\}은 \$\{SITE_NAME\}로 만든 홈페이지에서 제공하며, 기존 홈페이지에서는 현재 지원하지 않습니다/);
  // AI never sets a price or a schedule.
  assert.match(CONSULTATION.caution, /견적 금액과 공사 일정은 AI가 정하지 않습니다/);
});

test("HONEST-3 the landing's copy: customer words only, and only what is decided", () => {
  const home = src("lib", "home.ts");
  const internal = home.match(/tenant|origin|Site Lead|schema|\bAPI\b|widget|테넌트|스키마|위젯|스크립트|키 발급/i);
  assert.ok(!internal, `lib/home.ts shows "${internal?.[0]}"`);
  // Contract length, cancellation, refunds, billing start and reply time are not decided: no answer may imply
  // one. (The trial's own cancellation line is the price list's, and is shown only inside the trial policy.)
  for (const name of ["home.ts", "features.ts", "pricing-page.ts"]) {
    // "해지" the word, not the middle of "정해지지".
    const undecided = src("lib", name).match(/약정|(?<!정)해지|환불|위약금|과금 시작|결제일|영업일|시간 (이내|안에)|당일 답변/);
    assert.ok(!undecided, `lib/${name} answers an undecided policy: "${undecided?.[0]}"`);
  }
  assert.equal((read("lib", "home.ts").match(/^\s*q: /gm) ?? []).length, 10, "the landing keeps ten questions");
});

test("PARTNER-1 Founding Partner: six benefits in plain Korean, no amount invented", () => {
  assert.deepEqual(
    PARTNER_BENEFITS.map((benefit) => benefit.title),
    ["향후 플랫폼 우선 입점", "기본 입점비 12개월 무료", "릴스 · 쇼츠 영상 추가 혜택", "3D 시공사례 우선 적용", "신규 기능 먼저 이용", "초기 파트너 전용 할인 · 무료 이용 혜택"],
  );
  const copy = PARTNER_BENEFITS.flatMap((benefit) => [benefit.tag, benefit.title, benefit.text]).join("\n");
  const jargon = copy.match(/Platform|Early Access|Partner Benefits|Credit|크레딧|전환|포트폴리오|12 Months/);
  assert.ok(!jargon, `Founding Partner copy shows "${jargon?.[0]}"`);
  // English only as the product name.
  const english = copy.replace(/BoostInterior|\bAI\b|\b3D\b/g, "").match(/[A-Za-z]{2,}/);
  assert.ok(!english, `Founding Partner copy shows "${english?.[0]}"`);
  assert.ok(!/\d\s*(%|원|만원)/.test(copy), "Founding Partner copy states an amount");
  assert.match(PARTNER_TERMS, /광고 · 프리미엄 노출 등 추가 상품은 포함되지 않습니다/);
  // Making the reel is what AI 마케팅 does today: the benefit is an extra on it, never the feature arriving later.
  const video = PARTNER_BENEFITS.find((benefit) => benefit.tag === MARKETING.name);
  assert.match(video.text, /지금 AI 마케팅에서 제공하는 기능/);
  const later = `${video.title}\n${video.text}`.match(/준비되면|출시|향후|예정|먼저 (이용|사용)|우선 (적용|이용|혜택)/);
  assert.ok(!later, `Founding Partner sells the reel as something still to come: "${later?.[0]}"`);
});

// ---------------------------------------------------------------- Pages, routes and anchors

const PAGES = {
  "/": ["app", "page.tsx"],
  "/features/ai-marketing": ["app", "features", "ai-marketing", "page.tsx"],
  "/features/ai-consultation": ["app", "features", "ai-consultation", "page.tsx"],
  "/features/website": ["app", "features", "website", "page.tsx"],
  "/pricing": ["app", "pricing", "page.tsx"],
  "/pricing/details": ["app", "pricing", "details", "page.tsx"],
};
/** The components a page renders inside its shell, in order. */
const blocks = (...path) => {
  const page = src(...path);
  const body = page.slice(page.indexOf("<PageShell"), page.indexOf("</PageShell>"));
  return [...body.matchAll(/^ {6}<([A-Z]\w+)/gm)].map((match) => match[1]);
};

test("ROUTE-1 six pages, each with its own title, description and canonical address", () => {
  const site = read("lib", "site.ts");
  for (const path of Object.keys(PAGES).slice(1)) assert.ok(site.includes(`"${path}"`), `lib/site.ts lost ${path}`);
  for (const [path, file] of Object.entries(PAGES)) {
    assert.ok(existsSync(join(ROOT, ...file)), `${path} has no page`);
    const page = src(...file);
    assert.match(page, /<PageShell page=/, `${path} is not in the shared shell`);
    if (path === "/") continue;
    assert.match(page, new RegExp(`generateMetadata\\(_props: PageProps<"${path}">`), `${path} has no metadata of its own`);
    assert.match(page, /pageMetadata\(parent,/);
  }
  assert.match(src("lib", "page-metadata.ts"), /alternates: \{ canonical: path \}/);
  // The sitemap lists all six, from the same constants the pages use.
  const sitemap = src("app", "sitemap.ts");
  assert.match(sitemap, /NAV_FEATURES\.map/);
  for (const part of ["`${SITE_URL}/`", "PRICING_PATH", "PRICING_DETAILS_PATH"]) assert.ok(sitemap.includes(part), `the sitemap lost ${part}`);
  // One h1 per page: the landing's hero, a feature page's hero, a pricing page's hero.
  for (const where of [["components", "landing", "Hero.tsx"], ["components", "features", "Parts.tsx"], ["components", "pricing", "PricingSummary.tsx"], ["components", "pricing", "PricingIntro.tsx"]]) {
    assert.equal((src(...where).match(/as="h1"/g) ?? []).length, 1, `${where.at(-1)} does not have exactly one h1`);
  }
});

test("ROUTE-2 the menu: three feature pages, 요금 안내, 실제 데모, and 문의 as the button", () => {
  const site = read("lib", "site.ts");
  assert.match(site, /NAV_FEATURES = \[FEATURES\.marketing, FEATURES\.consultation, FEATURES\.website\]/);
  assert.match(site, /label: "홈페이지 제작"/);
  assert.match(site, /NAV_PRICING_LABEL = "요금 안내"/);
  assert.match(site, /NAV_DEMO_LABEL = "실제 데모"/);
  const header = src("components", "landing", "SiteHeader.tsx");
  assert.match(header, /NAV_FEATURES\.map/);
  assert.match(header, /href: PRICING_PATH/);
  assert.match(header, /href: `\/#\$\{LIVE_ID\}`/);
  assert.match(header, /<SiteMenu items=\{items\}/);
  // The header's 문의 is outlined, so it does not compete with a page's own filled button.
  assert.match(header, /<ButtonLink[^>]*variant="secondary"[^>]*>\s*\{KAKAO_LABEL\}/);
  // The phone menu is a real button with its state, and it closes on Escape.
  const menu = src("components", "landing", "SiteMenu.tsx");
  assert.match(menu, /aria-expanded=\{open\}/);
  assert.match(menu, /Escape/);
  const footer = src("components", "landing", "SiteFooter.tsx");
  assert.match(footer, /NAV_FEATURES\.map/);
  assert.match(footer, /PRICING_PATH/);
});

test("ROUTE-3 the landing: blocks in the order an owner asks, with every anchor it has carried", () => {
  assert.deepEqual(blocks(...PAGES["/"]), [
    "Hero",
    "Outputs",
    "CaseBuilder",
    "Reels",
    "BlogDraft",
    "Consult",
    "Website",
    "AllInOne",
    "LiveDemo",
    "Pricing",
    "Faq",
    "Partner",
    "Contact",
  ]);
  const site = read("lib", "site.ts");
  for (const anchor of [
    'DEMO_VIDEO_ID = "demo-video"',
    'PARTNER_ID = "partner"',
    'PRICING_ID = "pricing"',
    'HOW_ID = "how"',
    'LIVE_ID = "live"',
    'VALUE_ID = "value"',
    'REELS_ID = "reels"',
    'BLOG_ID = "blog"',
    'CONSULT_ID = "consult"',
    'WEBSITE_ID = "website"',
    'BUNDLE_ID = "all-in-one"',
    'FAQ_ID = "faq"',
    'CONTACT_ID = "contact"',
  ]) {
    assert.ok(site.includes(anchor), `lib/site.ts lost ${anchor}`);
  }
  const landing = SOURCE.filter(({ file }) => file.includes(join("components", "landing"))).map(({ text }) => code(text)).join("\n");
  for (const id of [
    'id="top"',
    "id={VALUE_ID}",
    "id={HOW_ID}",
    "id={REELS_ID}",
    "id={BLOG_ID}",
    "id={CONSULT_ID}",
    "id={WEBSITE_ID}",
    "id={BUNDLE_ID}",
    "id={LIVE_ID}",
    "id={DEMO_VIDEO_ID}",
    "id={PRICING_ID}",
    "id={FAQ_ID}",
    "id={CONTACT_ID}",
    'id="why"',
    'id="problem"',
    'id="install"',
    "PARTNER_ID",
  ]) {
    assert.ok(landing.includes(id), `the landing lost ${id}`);
  }
  // #talk, #recommend, #inquiry and #owner are the consultation's four steps.
  assert.deepEqual([...read("lib", "home.ts").matchAll(/^\s*id: "(\w+)",$/gm)].map((match) => match[1]), ["talk", "recommend", "inquiry", "owner"]);
  assert.match(src("components", "landing", "Consult.tsx"), /id=\{step\.id\}/);
  // What was merged is gone, and nothing on any page is moved with CSS: the source order is the order on screen.
  for (const gone of ["BeforeAfter", "InstallPaths", "MobileScene", "StoryRail", "StoryScene", "QuickValue", "Problem", "HowItWorks", "OwnerResult", "HeroShowcase", "Onboarding", "PlanSection", "PlanComparison"]) {
    assert.ok(!SOURCE.some(({ file, text }) => file.endsWith(`${gone}.tsx`) || code(text).includes(`<${gone}`)), `${gone} is back`);
  }
  for (const { file, text } of SOURCE) {
    const moved = code(text).match(/\border-(first|last|\d+)\b|flex-(col|row)-reverse|\b(col|row)-start-\d/);
    assert.ok(!moved, `${file} reorders with CSS: "${moved?.[0]}"`);
  }
});

test("ROUTE-4 the landing introduces and hands over: one link per product, the price list one page away", () => {
  for (const [name, target] of [
    ["CaseBuilder", /href=\{FEATURES\.marketing\.path\}/],
    ["Reels", /href=\{`\$\{FEATURES\.marketing\.path\}#reels`\}/],
    ["BlogDraft", /href=\{`\$\{FEATURES\.marketing\.path\}#posts`\}/],
    ["Consult", /href=\{FEATURES\.consultation\.path\}/],
    ["Website", /href=\{FEATURES\.website\.path\}/],
    ["AllInOne", /href=\{`\$\{PRICING_PATH\}#\$\{bundle\.id\}`\}/],
  ]) {
    assert.match(src("components", "landing", `${name}.tsx`), target, `${name} lost its link`);
  }
  // …and the blocks those two anchors name are on the AI 마케팅 page.
  const marketing = src(...PAGES["/features/ai-marketing"]);
  for (const id of ['id="reels"', 'id="posts"']) assert.ok(marketing.includes(id), `/features/ai-marketing lost ${id}`);
  const home = src("components", "landing", "Pricing.tsx");
  assert.ok(!/PRICING_DETAILS_PATH|SETUP_OPTIONS\.map/.test(home), "the landing repeats the build cards or skips /pricing");
  assert.match(home, /SUBSCRIPTIONS\.map/);
  assert.match(home, /href=\{PRICING_PATH\}/);
  assert.match(home, /KAKAO_RECOMMEND_LABEL/);
});

test("ROUTE-5 the landing's hero: one filled button (the demo), 문의 outlined, the prices under them", () => {
  const hero = src("components", "landing", "Hero.tsx");
  assert.ok(!/PARTNER|Partner/.test(hero), "the hero links to the partner benefits again");
  const buttons = [...hero.matchAll(/<ButtonLink([^>]*)>/g)].map((match) => match[1]);
  assert.equal(buttons.length, 2);
  assert.equal(buttons.filter((props) => !/variant=/.test(props)).length, 1, "the hero needs exactly one filled button");
  assert.match(buttons.find((props) => !/variant=/.test(props)), /href=\{DEMO_URL\}/);
  assert.match(buttons.find((props) => /variant=/.test(props)), /href=\{KAKAO_OPEN_CHAT_URL\}[^>]*variant="secondary"/);
  assert.match(hero, /href=\{PRICING_PATH\}/);
  assert.match(hero, /ENTRY_PRICE/);
  // The copy and the buttons come before the film in the source, so a phone shows them first.
  assert.ok(hero.indexOf("<ButtonLink") < hero.indexOf("<HeroFilm"), "the hero film comes before the buttons");
  assert.match(src("components", "landing", "LiveDemo.tsx"), /DEMO_PROMPT/);
});

test("ROUTE-6 the pricing pages: a summary to choose on, the conditions one page further", () => {
  assert.deepEqual(blocks(...PAGES["/pricing"]), [
    "PricingHero",
    "SubscriptionSummary",
    "Situations",
    "SetupSummary",
    "TrialSummary",
    "Assurances",
    "DetailsLink",
    "Partner",
    "PricingCta",
  ]);
  assert.deepEqual(blocks(...PAGES["/pricing/details"]), ["DetailsHero", "ProductComparison", "SubscriptionDetails", "SetupSection", "PricingFaq", "Partner", "PricingCta"]);
  const summary = src("components", "pricing", "PricingSummary.tsx");
  assert.ok(!/use client|Disclosure|<table|<details/.test(summary), "/pricing has toggles or tables again");
  assert.match(summary, /PRICING_DETAILS_PATH/);
  // Anchors: the blocks of both pages, the cards' own ids, and the ones earlier versions of these pages carried.
  const site = read("lib", "site.ts");
  for (const anchor of ['PLANS_ID = "plans"', 'TRIAL_ID = "trial"', 'SETUP_ID = "setup"', 'COMPARISON_ID = "comparison"', 'CONSULT_SETUP_ID = "common-scope"', 'SETUP_COMPARISON_ID = "setup-comparison"', 'PRICING_FAQ_ID = "faq"']) {
    assert.ok(site.includes(anchor), `lib/site.ts lost ${anchor}`);
  }
  for (const id of ["plan-core", "plan-growth", "plan-managed"]) assert.ok(summary.includes(`"${id}"`), `/pricing lost #${id}`);
  assert.match(src("components", "pricing", "SubscriptionDetails.tsx"), /id="portfolio-video"/);
  assert.match(src("components", "pricing", "Subscriptions.tsx"), /id=\{item\.id\}/);
  assert.match(src("components", "pricing", "SubscriptionDetails.tsx"), /id=\{item\.id\}/);
  assert.match(src("components", "pricing", "SetupCards.tsx"), /id=\{anchors \? option\.id : undefined\}/);
  assert.match(src("components", "pricing", "SetupSection.tsx"), /<article id=\{option\.id\}/);
  assert.match(src("components", "landing", "Partner.tsx"), /"founding-partner"/);
});

test("ROUTE-7 a page opened from another starts at the top", () => {
  // globals.css scrolls smoothly; without the attribute Next.js 16 keeps that on while it changes pages,
  // so /pricing opened from far down the landing showed its bottom first and then glided up.
  assert.match(read("app", "globals.css"), /scroll-behavior:\s*smooth/);
  assert.match(read("app", "layout.tsx"), /<html[^>]*\bdata-scroll-behavior="smooth"/);
});

// ---------------------------------------------------------------- Films, clips, stills and what they may claim

const V2 = JSON.parse(read("public", "assets", "landing", "v2", "manifest.json"));
const V3 = JSON.parse(read("public", "assets", "landing", "v3", "manifest.json"));
const PACK_ITEMS = [...V2.videos, ...V2.samples, ...Object.values(V2.images).flat(), ...V3.clips, ...V3.stills];
/** Every file that puts an asset on a page: the landing's blocks, the feature pages and their parts. */
const SHOWING = SOURCE.filter(({ file }) => /components[\\/](landing|features)[\\/]|app[\\/]features[\\/]/.test(file));
const size = (path) => {
  try {
    return statSync(join(ROOT, "public", path)).size;
  } catch {
    return 0;
  }
};

test("MEDIA-1 every film, clip and still a page shows is in a manifest, with its files and its note", () => {
  const used = new Set(SHOWING.flatMap(({ text }) => [...code(text).matchAll(/"((?:VIDEO|SAMPLE|HERO|FEAT|COMP|UI|CLIP|SITE)-[\w-]+)"/g)].map((match) => match[1])));
  assert.ok(used.size >= 20, "the pages show fewer assets than they were built with");
  for (const id of used) {
    const item = PACK_ITEMS.find((entry) => entry.id === id);
    assert.ok(item, `${id} is not in a manifest`);
    const files = [item.video, item.posterFallback, item.poster, item.mobileVariant?.video, item.mobileVariant?.posterFallback, item.mobileVariant?.poster, item.fallback].filter(Boolean);
    assert.ok(files.length > 0, `${id} has no file`);
    for (const path of files) assert.ok(size(path) > 0, `${id}: ${path} is missing under public/`);
    if (!id.startsWith("CLIP-")) assert.ok(item.note && item.noteRequired, `${id} lost its note`);
  }
  for (const id of ["CLIP-01", "CLIP-02", "CLIP-03", "CLIP-04", "CLIP-05", "CLIP-06", "CLIP-07", "SAMPLE-01", "SAMPLE-02", "SITE-01", "SITE-05"]) {
    assert.ok(used.has(id), `no page shows ${id} any more`);
  }
});

test("MEDIA-2 short clips are short and light; the hero is the approved film, re-encoded, with the original kept", () => {
  assert.equal(V3.clips.length, 7);
  for (const clip of V3.clips) {
    for (const cut of [clip, clip.mobileVariant]) {
      assert.ok(cut.duration >= 5 && cut.duration <= 10, `${clip.id} runs ${cut.duration}s`);
      assert.equal(size(cut.video), cut.bytes, `${clip.id}: ${cut.video} is not the file the manifest describes`);
      assert.ok(cut.bytes <= 1_200_000, `${clip.id} weighs ${cut.bytes} bytes`);
    }
    assert.ok(V2.videos.some((video) => video.id === clip.of), `${clip.id} is cut from a film that is not in the pack`);
  }
  // The hero: same film, about half the bytes, and the approved files are still where they were.
  const approved = V2.videos.find((video) => video.id === "VIDEO-01");
  for (const [cut, original] of [[V3.hero.wide, approved.video], [V3.hero.tall, approved.mobileVariant.video]]) {
    assert.ok(cut.video.startsWith("/assets/landing/v3/hero/"), "the web hero overwrote an approved file");
    assert.ok(size(original) > 0, `the approved ${original} is gone`);
    assert.ok(size(cut.video) > 0 && size(cut.video) < size(original) * 0.65, `${cut.video} is not lighter than the approved film`);
  }
  assert.match(src("lib", "media.ts"), /export function heroFilm\(\)/);
  assert.match(src("components", "landing", "Hero.tsx"), /heroFilm\(\)/);
});

test("MEDIA-3 an asset is never shown without its note as text next to it", () => {
  // The figures of the feature pages own the note of what they show.
  const parts = src("components", "features", "Parts.tsx");
  assert.equal((parts.match(/<MediaNote[^>]*>\{film\.note\}/g) ?? []).length, 2);
  assert.match(parts, /<MediaNote>\{still\.note\}/);
  const reel = src("components", "media", "ReelCard.tsx");
  assert.match(reel, /<MediaNote tone="dark" size="body"[^>]*>\s*\{reel\.note\}/);
  assert.match(read("components", "media", "MediaNote.tsx"), /body: "text-\[14px\]"/);
  for (const { file, text } of SHOWING) {
    const body = code(text);
    // Each asset a file holds by name is handed to a figure that shows its note, or shows it right there.
    for (const [, name] of body.matchAll(/const (\w+) = (?:film|still|short|sample|heroFilm)\(/g)) {
      const figure = new RegExp(`<(ClipFigure|FilmFigure|StillFigure)\\b[^>]*\\b(film|still)=\\{${name}\\}`);
      const own = new RegExp(`\\{${name}\\.note\\}`);
      assert.ok(figure.test(body) || own.test(body), `${file} shows ${name} without its note`);
    }
    // …and a list of them carries a note for the list.
    for (const [, name] of body.matchAll(/const (\w+) = \[(?:still|short|film)\(/g)) {
      const figure = new RegExp(`<StillFigure\\b[^>]*\\bstill=\\{${name}\\[`);
      assert.ok(figure.test(body) || new RegExp(`\\{${name}\\[0\\]\\.note\\}`).test(body), `${file} shows ${name} without a note`);
    }
    if (/sample\("/.test(body)) assert.match(body, /<ReelCard\b/, `${file} shows a product-made reel outside its card`);
  }
  // Every short clip says it is a cut of an edited film, and names what its scene adds.
  const media = src("lib", "media.ts");
  assert.match(media, /SHORT_NOTE = "제품 화면을 촬영해 편집한 영상의 한 장면입니다\."/);
  assert.match(media, /\[source\.note, SHORT_EXTRA\[id\], SHORT_NOTE\]/);
  for (const id of ["CLIP-02", "CLIP-04", "CLIP-05", "CLIP-06", "CLIP-07"]) assert.ok(media.includes(`"${id}":`), `${id} lost what its scene adds to the note`);
  // A before/after is AI-made example imagery, and the pack's note says so in these words.
  assert.match(V2.samples.find((item) => item.id === "SAMPLE-02").note, /시공 전·후 사진 모두 AI로 만든 이미지이며, 실제 공사 기록이 아닙니다/);
  // The screenshots of the demo homepage say what they are, and the cropped one leaves the demo's contact column out.
  for (const shot of V3.stills) assert.match(shot.note, /가상 업체[^.]*데모 홈페이지를 그대로 촬영한 화면/);
  assert.ok(V3.stills.find((shot) => shot.id === "SITE-04").source.crop, "the inquiry form is shown uncropped");
});

test("MEDIA-4 films that play by themselves: muted, inline, looping, one at a time, and never against the visitor", () => {
  const auto = src("components", "media", "AutoFilm.tsx");
  for (const need of [/\bmuted\b/, /\bloop\b/, /\bplaysInline\b/, /IntersectionObserver/, /prefers-reduced-motion: reduce/, /saveData/, /PORTRAIT_QUERY/, /다시 시도/, /일시정지/]) {
    assert.match(auto, need, `AutoFilm lost ${need}`);
  }
  // It starts from script once the film is on screen, never with the page: no `autoPlay`, and no file until it is near.
  assert.ok(!/\bautoPlay\b/.test(auto), "a film starts with the page");
  assert.match(auto, /\{clip && !failed && \(\s*<video/);
  assert.ok(!/\bcontrols\b/.test(auto), "a looping clip shows the native controls");
  // One at a time, the most visible one, and none while a film the visitor started is playing.
  const stage = src("components", "media", "stage.ts");
  for (const need of [/export function join\(/, /export function seen\(/, /export function hold\(/, /document\.hidden/, /visibilitychange/]) assert.match(stage, need);
  assert.match(src("components", "media", "solo.ts"), /hold\(true\)/);
  assert.match(src("components", "media", "solo.ts"), /hold\(false\)/);
  // A press on pause holds until the visitor presses play again.
  assert.match(auto, /stopped\.current = true/);
  // Click-to-play films: no file before the press, never looping, never on their own.
  const player = src("components", "media", "FilmPlayer.tsx");
  assert.match(player, /\{clip && status !== "failed" && \(\s*<video/);
  assert.ok(!/\bautoPlay\b|\bloop\b/.test(player), "a click-to-play film plays or loops by itself");
  assert.match(player, /\bplaysInline\b/);
  // Only the three players render a <video>, and only AutoFilm loops.
  for (const { file, text } of SOURCE) {
    if (/media[\\/](FilmPlayer|AutoFilm)\.tsx$|DemoVideoPlayer\.tsx$/.test(file)) continue;
    assert.ok(!/<video\b|\bautoPlay\b/.test(code(text)), `${file} renders a video of its own`);
  }
  // One file per film: the vertical cut on a phone, the 16:9 film elsewhere, by the same query as the CSS.
  assert.match(read("lib", "film.ts"), /PORTRAIT_QUERY = "\(max-width: 640px\)"/);
  assert.match(read("app", "globals.css"), /@custom-variant phone \(@media \(max-width: 640px\)\)/);
  // The render projects of the films are not part of the site: their files are never scanned for class names.
  assert.match(read("app", "globals.css"), /@source not "\.\.\/source-assets";/);
});

test("MEDIA-5 no pinned scroll scenes", () => {
  const css = read("app", "globals.css");
  assert.ok(!/@custom-variant (pinned|unpinned|desktop-static)/.test(css), "globals.css has the pinned variants again");
  for (const { file, text } of SOURCE) {
    assert.ok(!/\bsticky\b[^"`]*\bh-\[\d+s?vh\]|h-\[2\d\ds?vh\]|pinned:/.test(code(text)), `${file} pins a scene to the scroll`);
  }
});
