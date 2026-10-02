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
    label: "기존 시공사례 전체 구조화",
    items: [
      "현재 홈페이지에 공개된 기존 시공사례 전체 수집",
      "기존 시공사례 구조화",
      "지역 · 평형 · 공간 · 스타일 · 공사범위로 찾을 수 있게 정리",
    ],
  },
  { icon: "search", label: "시공사례 검색 · 추천", items: ["AI 시공사례 검색 연결", "관련 시공사례 추천 흐름 연결"] },
  { icon: "form", label: "견적 문의 흐름", items: ["상담 → 견적 문의 흐름 구성"] },
  {
    icon: "sliders",
    label: "BoostInterior 관리 화면",
    items: ["BoostInterior 관리 화면 연결 (상담 기록 · 상담 요청 확인, 상담 자료 관리)"],
  },
  {
    icon: "window",
    label: "AI 상담창 · 홈페이지 주소 연결",
    items: ["BoostInterior AI 상담창 연결", "홈페이지 주소에서 정상 작동하도록 연결"],
  },
  { icon: "shield", label: "설치 · 점검", items: ["휴대폰 포함 기본 동작 점검", "초기 데이터 검수"] },
];

/** Every item of the common build, as one list. */
export const COMMON_SCOPE_ITEMS = COMMON_BOOSTINTERIOR_SCOPE.flatMap((group) => group.items);

/** /pricing: the areas of homepage work the setup options are compared by, in display order. */
export const SETUP_SCOPE_GROUPS = [
  { key: "site", label: "홈페이지 디자인 · 구성" },
  { key: "portfolio", label: "시공사례 페이지" },
  { key: "cta", label: "상담 · 견적 문의 동선" },
  { key: "quality", label: "휴대폰 화면 · 검색 노출 · 속도" },
  { key: "launch", label: "보안 연결 · 점검" },
] as const;

export type SetupScopeKey = (typeof SETUP_SCOPE_GROUPS)[number]["key"];

export interface SetupOption {
  /** Same letter as the matching path in InstallPaths */
  key: "A" | "B" | "C" | "D";
  /** Anchor of the option's detail block on /pricing */
  id: string;
  name: string;
  /** Compact label shown next to the name wherever the option is listed */
  badge?: string;
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
    summary: "현재 홈페이지는 그대로 사용하면서, 우리 업체에 맞춘 BoostInterior AI 상담 시스템을 연결합니다.",
    fit: "이미 홈페이지가 있고, 디자인은 그대로 두고 싶은 업체",
    highlights: ["지금 홈페이지 그대로 사용", "디자인 · 구성 변경 없음"],
    includes: {
      site: ["현재 홈페이지 구성 확인"],
      portfolio: "기존 시공사례 페이지 그대로",
      cta: "기존 화면 그대로",
      quality: "기존 홈페이지 기준",
      launch: "기존 홈페이지 관리 방식 그대로",
    },
    beyond: "홈페이지 수정 · 개선이 필요하면 기존 홈페이지 맞춤 개선",
  },
  {
    key: "B",
    // The id is also the /pricing anchor, so it keeps the name the option had before "Quick Start".
    id: "quick-website",
    name: "Quick Start",
    badge: "인기상품",
    price: 490_000,
    website: "새 홈페이지 빠르게 제작",
    summary: "새 홈페이지가 필요하고, 복잡한 제작 과정 없이 빠르게 시작하고 싶은 업체를 위한 상품입니다.",
    fit: "홈페이지가 없거나 새로 만들고 싶고, 오래 기다리지 않고 빠르게 시작하고 싶은 업체",
    highlights: ["휴대폰에서도 보기 편한 화면", "네이버·구글 노출 기본 설정 · 빠른 로딩", "기존 공개 시공사례 이전"],
    includes: {
      site: ["인테리어 업체에 필요한 기본 기능을 갖춘 새 홈페이지", "인테리어 업체에 맞는 기본 페이지 구성"],
      portfolio: ["시공사례를 보기 좋게 구성", "기존 공개 시공사례 이전"],
      cta: ["상담 · 견적 문의로 이어지는 버튼과 동선"],
      quality: ["휴대폰 · 태블릿에서도 보기 편한 화면", "네이버·구글 노출을 위한 기본 설정", "빠른 페이지 로딩"],
      launch: ["고객이 안심하고 접속할 수 있는 보안 연결", "필요한 기본 외부 서비스 연결", "오픈 전 기본 점검"],
    },
    beyond: "브랜드와 구성부터 새로 설계하려면 맞춤 홈페이지 제작",
    note: "인테리어 업체에 맞춰 미리 준비된 기본 구성으로 제작해 빠르게 시작합니다. 브랜드와 구성부터 새로 설계하려면 맞춤 홈페이지 제작이 적합합니다.",
  },
  {
    key: "C",
    id: "improvement",
    name: "기존 홈페이지 맞춤 개선",
    price: 1_200_000,
    from: true,
    website: "지금 홈페이지 맞춤 개선",
    summary: "현재 홈페이지를 살리면서 보기 불편한 화면과 시공사례 구성, 모바일 화면, 상담·견적 문의 동선을 업체에 맞게 개선합니다.",
    fit: "현재 홈페이지를 버리고 싶지는 않지만, 디자인과 상담 · 견적 문의 동선은 제대로 개선하고 싶은 업체",
    highlights: ["기존 홈페이지 진단 후 범위 확정", "보기 불편한 화면 · 모바일 화면 개선", "시공사례 → 상담 연결 개선"],
    includes: {
      site: [
        "기존 홈페이지 진단",
        "기존 디자인 · 구성 중 유지 가능한 범위 확인",
        "방문자가 필요한 정보를 쉽게 찾도록 화면과 동선 개선",
        "필요한 주요 화면 개선",
      ],
      portfolio: ["시공사례 → 상담 연결 개선"],
      cta: ["상담 · 견적 문의 버튼과 동선 개선"],
      quality: ["휴대폰 화면 개선", "홈페이지의 기본적인 문제점 개선"],
      launch: ["상담에서 견적 문의까지 이어지는 흐름 점검"],
    },
    beyond: "추가 페이지 · 특수 기능 · 외부 서비스 연결 · 기존 홈페이지 관리 기능 재개발은 범위 확인 후 별도 견적",
    note: "홈페이지를 진단한 뒤 범위와 비용을 먼저 안내해드립니다. 기존 홈페이지를 관리하는 방식은 그대로 유지하며, 홈페이지 관리 기능의 재개발 · 교체와 기본 범위를 넘어서는 추가 페이지, 특수 기능, 외부 서비스 연결은 범위를 확인한 뒤 별도 견적을 안내합니다.",
  },
  {
    key: "D",
    // As with B, the id (and anchor) keeps the option's earlier name.
    id: "custom-website",
    name: "맞춤 홈페이지 제작",
    price: 2_500_000,
    from: true,
    website: "완전 맞춤 홈페이지 새로 제작",
    summary: "업체의 브랜드와 원하는 구성에 맞춰 홈페이지를 처음부터 맞춤 제작합니다.",
    fit: "브랜드부터 홈페이지 구성까지 완전히 맞춰 제작하고 싶은 업체",
    highlights: ["브랜드에 맞춘 맞춤 디자인", "메뉴 · 화면 구성 맞춤 설계", "네이버·구글 노출 기본 설정 · 빠른 로딩"],
    includes: {
      site: [
        "업체 브랜드에 맞춘 디자인",
        "방문자가 필요한 정보를 쉽게 찾는 메뉴 · 화면 설계",
        "주요 페이지 맞춤 구성",
        "필요한 범위의 맞춤 화면 효과",
      ],
      portfolio: ["시공사례 페이지 맞춤 설계"],
      cta: ["상담에서 견적 문의까지 이어지는 흐름 설계"],
      quality: ["휴대폰 · 태블릿에서도 보기 편한 화면", "네이버·구글 노출을 위한 기본 설정", "빠른 페이지 로딩"],
      launch: ["고객이 안심하고 접속할 수 있는 보안 연결"],
    },
    beyond: "추가 페이지 · 특수 기능 · 외부 서비스 연결 · 고급 화면 효과 · 별도 시스템 개발 · 홈페이지 관리 기능 개발은 범위 확인 후 별도 견적",
    note: "기본 범위를 넘어서는 추가 페이지, 특수 기능, 외부 서비스 연결, 고급 화면 효과, 별도 시스템 개발, 홈페이지 관리 기능 개발은 범위를 확인한 뒤 별도 견적을 안내합니다.",
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
  { label: "홈페이지", values: ["그대로 사용", "새로 빠르게 제작", "유지하며 맞춤 개선", "맞춤으로 새로 제작"] },
  {
    label: "디자인 방식",
    values: ["기존 디자인 유지", "인테리어 업체에 맞춰 준비된 디자인", "기존 디자인 맞춤 개선", "브랜드에 맞춘 맞춤 디자인"],
  },
  {
    label: "페이지 구성",
    values: ["기존 구성 유지", "인테리어 업체에 필요한 기본 구성", "필요한 주요 화면 개선", "메뉴 · 화면 구성부터 맞춤 설계"],
  },
  {
    label: "시공사례 페이지",
    values: ["기존 페이지 그대로", "보기 좋게 구성 · 기존 공개 시공사례 이전", "시공사례 → 상담 연결 개선", "시공사례 페이지 맞춤 설계"],
  },
  {
    label: "상담 · 견적 문의 동선",
    values: ["기존 화면 그대로", "상담 · 견적 문의 버튼과 동선 구성", "보기 불편한 화면 · 문의 동선 개선", "상담에서 견적 문의까지 흐름 설계"],
  },
  {
    label: "휴대폰 화면 · 검색 노출 · 속도",
    values: ["기존 홈페이지 기준", "기본 설정 포함", "휴대폰 화면 · 기본적인 문제점 개선", "기본 설정 포함"],
  },
  { label: "추가 페이지 · 특수 기능", values: ["별도 협의", "별도 협의", "별도 견적", "별도 견적"] },
];

export const PLANS: readonly Plan[] = [
  {
    name: "Core",
    role: "핵심 기능",
    price: 88_000,
    summary: "BoostInterior의 핵심 기능을 사용합니다.",
    highlights: ["24시간 AI 상담", "조건에 맞는 실제 시공사례 추천", "견적 문의와 상담 기록 확인"],
  },
  {
    name: "Growth",
    role: "분석 + Portfolio Video",
    price: 198_000,
    summary: "방문자가 어디를 보고 어떻게 움직이는지 확인하고, 시공사진을 공간의 흐름에 따라 영상으로 보여줍니다.",
    base: "Core",
    highlights: ["방문자가 어디를 보고 어떻게 움직이는지 확인", "AI Portfolio Video (시공사진 영상) · 건수 제한 없음"],
    note: "AI Portfolio Video는 업체가 제공하는 실제 시공 자료로 제작합니다.",
  },
  {
    name: "Managed",
    role: "사람이 함께 운영",
    price: 297_000,
    summary: "기능만 사용하는 것이 아니라, 매달 실제 데이터를 함께 보면서 개선합니다.",
    base: "Growth",
    highlights: ["매월 방문 · 상담 데이터 확인", "상담 답변과 견적 문의 흐름 개선 지원", "우선 지원"],
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
    category: "시공사례",
    rows: [
      { label: "실제 시공사례 검색", plans: ALL },
      { label: "관련 시공사례 추천", plans: ALL },
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
      { label: "얼마나 머물고 어디에서 나가는지 분석", plans: GROWTH_UP },
      { label: "상담 시작 → 시공사례 확인 → 견적 문의로 이어지는 흐름 확인", plans: GROWTH_UP },
    ],
  },
  {
    category: "AI Portfolio Video",
    rows: [{ label: "AI Portfolio Video 제작 지원 · 건수 제한 없음", plans: GROWTH_UP }],
  },
  {
    category: "운영 지원",
    rows: [
      { label: "기본 시스템 운영", plans: ALL },
      { label: "월 1회 방문 · 상담 데이터 함께 확인", plans: MANAGED_ONLY },
      { label: "AI 상담 답변 흐름 점검 · 자주 묻는 질문 답변 개선", plans: MANAGED_ONLY },
      { label: "전문 상담지식 · 시공사례 업데이트 지원", plans: MANAGED_ONLY },
      { label: "상담 · 견적 문의 버튼과 동선 점검 · 개선 제안", plans: MANAGED_ONLY },
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
