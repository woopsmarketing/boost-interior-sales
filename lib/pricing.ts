import type { IconName } from "@/components/ui/Icon";

/**
 * BoostInterior pricing — the only prices this site shows (KRW), shared by the landing summary
 * and the /pricing page. Two independent choices: how the system is built (one-time setup)
 * and how it is run (monthly plan).
 * Every amount is what the customer pays, VAT included. Monthly only: there is no annual plan.
 */

/** VAT wording. `all` is said once per page; the setup and monthly areas of /pricing add their own line. */
export const VAT_NOTICE = {
  all: "모든 표시 가격은 부가세(VAT)가 포함된 최종 금액입니다.",
  setup: "모든 구축비는 부가세(VAT)가 포함된 최종 금액입니다.",
  monthly: "월 이용료 역시 부가세(VAT)가 포함된 금액입니다.",
} as const;

/** The part of the setup every option shares. */
export const COMMON_BUILD = "BoostInterior 기본 구축";

/**
 * BoostInterior 기본 구축 — what all four setup options include, whatever happens to the homepage.
 * It is listed here once and no option restates it, so the four cannot drift apart: the options
 * below only describe their homepage work. `label` is the short form, `items` the work behind it.
 */
export const COMMON_BOOSTINTERIOR_SCOPE: readonly { icon: IconName; label: string; items: readonly string[] }[] = [
  { icon: "chat", label: "AI 상담", items: ["AI 상담 흐름 구성"] },
  { icon: "book", label: "전문 상담지식 세팅", items: ["업체 기본정보 초기 세팅", "상담 전문정보 초기 세팅"] },
  {
    icon: "layers",
    label: "기존 포트폴리오 전체 구조화",
    items: [
      "현재 홈페이지에 공개된 기존 포트폴리오 전체 수집",
      "기존 시공사례 구조화",
      "지역 · 평형 · 공간 · 스타일 · 공사범위 검색 데이터 구성",
    ],
  },
  { icon: "search", label: "시공사례 검색 · 추천", items: ["AI 시공사례 검색 연결", "실제 포트폴리오 추천 흐름 연결"] },
  { icon: "form", label: "견적 문의 흐름", items: ["상담 → 견적 문의 흐름 구성"] },
  {
    icon: "sliders",
    label: "BoostInterior 관리 화면",
    items: ["BoostInterior 관리 화면 연결 (상담 기록 · 상담 요청 확인, 상담 자료 관리)"],
  },
  { icon: "window", label: "위젯 · 도메인 연결", items: ["BoostInterior 위젯 연결", "고객 도메인 연결 · 허용 설정"] },
  { icon: "shield", label: "설치 · QA", items: ["모바일 포함 기본 동작 QA", "초기 데이터 검수"] },
];

/** Every item of the common build, as one list. */
export const COMMON_SCOPE_ITEMS = COMMON_BOOSTINTERIOR_SCOPE.flatMap((group) => group.items);

/** /pricing: the areas of homepage work the setup options are compared by, in display order. */
export const SETUP_SCOPE_GROUPS = [
  { key: "site", label: "홈페이지 디자인 · 구조" },
  { key: "portfolio", label: "포트폴리오 페이지" },
  { key: "cta", label: "상담 CTA · 전환 동선" },
  { key: "quality", label: "모바일 · SEO · 성능" },
  { key: "launch", label: "운영 환경 · 검수" },
] as const;

export type SetupScopeKey = (typeof SETUP_SCOPE_GROUPS)[number]["key"];

export interface SetupOption {
  /** Same letter as the matching path in InstallPaths */
  key: "A" | "B" | "C" | "D";
  /** Anchor of the option's detail block on /pricing */
  id: string;
  name: string;
  price: number;
  /** Price is a starting point ("부터"): the scope is confirmed per site */
  from?: boolean;
  /** What happens to the homepage — the one thing the options differ in, and what the price follows */
  website: string;
  summary: string;
  /** Who it is for */
  fit: string;
  /** Landing card: the homepage work that matters most */
  highlights: readonly string[];
  /**
   * /pricing: the homepage work by area, on top of the common build. A string instead of a list
   * means the homepage is left as it is there, and says so.
   */
  includes: Readonly<Record<SetupScopeKey, readonly string[] | string>>;
  /** What falls outside the basic scope, and how it is handled */
  beyond: string;
  note?: string;
}

export interface Plan {
  name: "Core" | "Growth" | "Managed";
  /** What sets the plan apart, in a few words: core → analysis and video → people */
  role: string;
  price: number;
  summary: string;
  /** The plan this one contains in full */
  base?: "Core" | "Growth";
  /** The card, on the landing and on /pricing: the few things that define the plan. Every feature is in COMPARISON. */
  highlights: readonly string[];
  note?: string;
}

export const SETUP_OPTIONS: readonly SetupOption[] = [
  {
    key: "A",
    id: "integration",
    name: "기존 홈페이지 연동",
    price: 290_000,
    website: "지금 홈페이지 그대로 사용",
    summary: "지금 홈페이지는 그대로 두고, 업체 전용 BoostInterior를 구축합니다.",
    fit: "이미 홈페이지가 있고, 디자인은 그대로 두고 싶은 업체",
    highlights: ["지금 홈페이지 그대로 사용", "디자인 · 구조 변경 없음"],
    includes: {
      site: ["기존 홈페이지 구조 확인"],
      portfolio: "기존 포트폴리오 페이지 그대로",
      cta: "기존 화면 그대로",
      quality: "기존 홈페이지 기준",
      launch: "기존 홈페이지 환경 · 관리 방식 그대로",
    },
    beyond: "홈페이지 수정 · 개선이 필요하면 기존 홈페이지 맞춤 개선",
  },
  {
    key: "B",
    id: "quick-website",
    name: "Quick Website",
    price: 490_000,
    website: "표준 홈페이지 새로 제작",
    summary: "검증된 표준 구조로 새 홈페이지를 빠르게 제작하고, BoostInterior 기본 구축을 함께 진행합니다.",
    fit: "기존 홈페이지를 크게 손보는 것보다, 빠르고 합리적으로 새 사이트를 만들고 싶은 업체",
    highlights: ["검증된 표준 템플릿으로 빠른 제작", "모바일 · SEO · 속도 기본 제공", "기존 공개 포트폴리오 이전"],
    includes: {
      site: ["검증된 BoostInterior 홈페이지 템플릿", "인테리어 업체에 맞는 기본 페이지 · 섹션 구조"],
      portfolio: ["포트폴리오 구성", "기존 공개 포트폴리오 이전"],
      cta: ["상담 · 견적 CTA"],
      quality: ["모바일 반응형", "기본 SEO 구조", "빠른 로딩 · 성능 기준"],
      launch: ["HTTPS(SSL)", "필요한 기본 외부 연동", "기본 QA"],
    },
    beyond: "브랜드와 구조부터 새로 설계하려면 Custom Website",
    note: "검증된 표준 구조에 맞춰 제작합니다. 브랜드와 구조부터 새로 설계하려면 Custom Website가 적합합니다.",
  },
  {
    key: "C",
    id: "improvement",
    name: "기존 홈페이지 맞춤 개선",
    price: 1_200_000,
    from: true,
    website: "지금 홈페이지 맞춤 개선",
    summary: "현재 사이트를 유지하면서 디자인 · 포트폴리오 · 상담 전환 구조를 맞춤 개선하고, BoostInterior 기본 구축을 함께 진행합니다.",
    fit: "현재 홈페이지를 버리고 싶지는 않지만, 디자인과 상담 전환 구조는 제대로 개선하고 싶은 업체",
    highlights: ["기존 사이트 진단 후 범위 확정", "UX · 모바일 · 상담 CTA 개선", "포트폴리오 → 상담 연결 개선"],
    includes: {
      site: ["기존 사이트 진단", "기존 디자인 · 구조 중 유지 가능한 범위 확인", "UX 개선", "필요한 주요 섹션 개선"],
      portfolio: ["포트폴리오 → 상담 연결 개선"],
      cta: ["상담 CTA 개선"],
      quality: ["모바일 개선", "기본 기술 문제 개선"],
      launch: ["전환 동선 QA"],
    },
    beyond: "추가 페이지 · 특수 기능 · 외부 시스템 연동 · 기존 홈페이지 CMS 재개발은 범위 확인 후 별도 견적",
    note: "사이트를 진단한 뒤 범위와 비용을 먼저 안내해드립니다. 기존 홈페이지의 관리 방식(CMS)은 그대로 유지하며, CMS 재개발 · 교체와 기본 범위를 넘어서는 추가 페이지, 특수 기능, 외부 시스템 연동은 범위를 확인한 뒤 별도 견적을 안내합니다.",
  },
  {
    key: "D",
    id: "custom-website",
    name: "Custom Website",
    price: 2_500_000,
    from: true,
    website: "완전 맞춤 홈페이지 새로 제작",
    summary: "브랜드와 콘텐츠 구조부터 새롭게 설계하는 맞춤 홈페이지를 제작하고, BoostInterior 기본 구축을 함께 진행합니다.",
    fit: "브랜드부터 콘텐츠 구조까지 완전히 맞춰 제작하고 싶은 업체",
    highlights: ["브랜드 기반 맞춤 디자인", "정보구조 · UX · 포트폴리오 구조 설계", "SEO 기반 구조 · 빠른 로딩"],
    includes: {
      site: ["고객 브랜드 기반 디자인", "정보구조 · UX 설계", "주요 페이지 맞춤 구성", "필요한 범위의 맞춤 인터랙션"],
      portfolio: ["포트폴리오 구조 설계"],
      cta: ["상담 · 견적 전환 흐름"],
      quality: ["모바일 반응형", "SEO 기반 구조", "빠른 로딩 · 성능 기준"],
      launch: ["HTTPS(SSL)"],
    },
    beyond: "추가 페이지 · 특수 기능 · 외부 시스템 · 고급 인터랙션 · 별도 백엔드 · 특수 CMS는 범위 확인 후 별도 견적",
    note: "기본 범위를 넘어서는 추가 페이지, 특수 기능, 외부 시스템 연동, 고급 인터랙션, 별도 백엔드, 특수 CMS는 범위를 확인한 뒤 별도 견적을 안내합니다.",
  },
];

/** One value per setup option, in SETUP_OPTIONS order: A, B, C, D. */
type PerSetup = readonly [string, string, string, string];

const SAME: PerSetup = ["동일하게 포함", "동일하게 포함", "동일하게 포함", "동일하게 포함"];

/**
 * /pricing setup comparison, collapsed: the common build in one row — the same in all four —
 * and then the homepage work, which is where the four differ and what the price follows.
 * Short status words rather than ✓ / ✗ — the options differ in kind, not in how much they include.
 * `included` rows are part of every option.
 */
export const SETUP_COMPARISON: readonly { label: string; values: PerSetup; included?: boolean }[] = [
  { label: COMMON_BUILD, values: SAME, included: true },
  { label: "홈페이지", values: ["그대로 사용", "표준 구조로 새로 제작", "유지하며 맞춤 개선", "맞춤으로 새로 제작"] },
  { label: "디자인 방식", values: ["기존 디자인 유지", "검증된 표준 템플릿", "기존 디자인 맞춤 개선", "브랜드 기반 맞춤 디자인"] },
  { label: "페이지 구조", values: ["기존 구조 유지", "표준 페이지 · 섹션 구조", "필요한 주요 섹션 개선", "정보구조부터 맞춤 설계"] },
  {
    label: "포트폴리오 페이지",
    values: ["기존 페이지 그대로", "표준 구성 · 기존 공개 포트폴리오 이전", "포트폴리오 → 상담 연결 개선", "포트폴리오 구조 설계"],
  },
  { label: "상담 CTA · UX", values: ["기존 화면 그대로", "상담 · 견적 CTA 구성", "UX · 상담 CTA 개선", "상담 · 견적 전환 흐름 설계"] },
  { label: "모바일 · SEO · 속도", values: ["기존 홈페이지 기준", "기본 제공", "모바일 · 기본 기술 문제 개선", "기본 제공"] },
  { label: "추가 페이지 · 특수 기능", values: ["별도 협의", "별도 협의", "별도 견적", "별도 견적"] },
];

export const PLANS: readonly Plan[] = [
  {
    name: "Core",
    role: "핵심 기능",
    price: 88_000,
    summary: "BoostInterior의 핵심 기능을 사용합니다.",
    highlights: ["24시간 AI 상담", "실제 시공사례 검색 · 추천", "견적 문의 수집 · 상담 기록 확인"],
  },
  {
    name: "Growth",
    role: "분석 + Portfolio Video",
    price: 198_000,
    summary: "방문자가 어떻게 움직이는지 분석하고, 시공사례를 영상 포트폴리오로 보여줍니다.",
    base: "Core",
    highlights: ["방문자 행동 · 전환 흐름 분석", "AI Portfolio Video · 건수 제한 없음"],
    note: "AI Portfolio Video는 업체가 제공하는 실제 시공 자료 기준입니다.",
  },
  {
    name: "Managed",
    role: "사람이 함께 운영",
    price: 297_000,
    summary: "기능만 사용하는 것이 아니라, 매달 실제 데이터를 함께 보면서 개선합니다.",
    base: "Growth",
    highlights: ["월 1회 방문 · 상담 데이터 리뷰", "응답 · 전환 동선 개선 지원", "우선 지원"],
    note: "실제 작업 범위는 계약 및 운영정책에 따라 정해집니다.",
  },
];

/** Which plans carry a row, in PLANS order: Core, Growth, Managed. */
type Included = readonly [boolean, boolean, boolean];
const ALL: Included = [true, true, true];
const GROWTH_UP: Included = [false, true, true];
const MANAGED_ONLY: Included = [false, false, true];

/** /pricing comparison, collapsed: one row per category below — the six differences that decide a plan. */
export const COMPARISON_CORE: readonly { label: string; plans: Included }[] = [
  { label: "24시간 AI 상담", plans: ALL },
  { label: "시공사례 검색 · 추천", plans: ALL },
  { label: "견적 문의 · 상담 기록", plans: ALL },
  { label: "방문자 행동 분석", plans: GROWTH_UP },
  { label: "AI Portfolio Video", plans: GROWTH_UP },
  { label: "월간 운영 · 개선", plans: MANAGED_ONLY },
];

/**
 * /pricing comparison, expanded: everything each monthly plan carries, grouped by what the owner
 * cares about. The plan cards only show highlights, so this is where every feature is listed.
 */
export const COMPARISON: readonly { category: string; rows: readonly { label: string; plans: Included }[] }[] = [
  {
    category: "AI 상담",
    rows: [
      { label: "24시간 AI 상담", plans: ALL },
      { label: "업체 정보 기반 답변", plans: ALL },
      { label: "상담 전문지식 관리 기능", plans: ALL },
      { label: "방문자의 공사 조건 이해", plans: ALL },
      { label: "상담 맥락 유지", plans: ALL },
    ],
  },
  {
    category: "포트폴리오",
    rows: [
      { label: "실제 시공사례 검색", plans: ALL },
      { label: "관련 포트폴리오 추천", plans: ALL },
      { label: "사진 · 시공사례 연결", plans: ALL },
    ],
  },
  {
    category: "견적 문의",
    rows: [
      { label: "견적 문의 수집", plans: ALL },
      { label: "상담 기록 확인", plans: ALL },
    ],
  },
  {
    category: "방문자 분석",
    rows: [
      { label: "방문자 행동 분석", plans: GROWTH_UP },
      { label: "방문 페이지 · 주요 클릭 분석", plans: GROWTH_UP },
      { label: "체류 · 이탈 흐름 분석", plans: GROWTH_UP },
      { label: "상담 시작 · 포트폴리오 확인 · 견적 문의 전환 흐름", plans: GROWTH_UP },
    ],
  },
  {
    category: "Portfolio Video",
    rows: [{ label: "AI Portfolio Video 제작 지원 · 건수 제한 없음", plans: GROWTH_UP }],
  },
  {
    category: "운영 지원",
    rows: [
      { label: "기본 시스템 운영", plans: ALL },
      { label: "월 1회 방문 · 상담 데이터 리뷰", plans: MANAGED_ONLY },
      { label: "AI 상담 응답 흐름 점검 · 자주 묻는 질문 응답 개선", plans: MANAGED_ONLY },
      { label: "전문 상담지식 · 포트폴리오 업데이트 지원", plans: MANAGED_ONLY },
      { label: "상담 · 견적 CTA 흐름 점검 · 전환 동선 개선 제안", plans: MANAGED_ONLY },
      { label: "월간 개선 포인트 정리", plans: MANAGED_ONLY },
      { label: "우선 지원", plans: MANAGED_ONLY },
    ],
  },
];

/** An option's homepage work — what it adds to the common build — as one list in SETUP_SCOPE_GROUPS order. */
export const scopeItems = (option: SetupOption) =>
  SETUP_SCOPE_GROUPS.flatMap((group) => {
    const scope = option.includes[group.key];
    return typeof scope === "string" ? [] : scope;
  });

/** 290000 → "290,000" */
export const won = (value: number) => value.toLocaleString("en-US");

/** 290000 → "29" (만원). Every price here is a whole number of 만원. */
export const manwon = (value: number) => won(value / 10_000);
