import type { IconName } from "@/components/ui/Icon";

/**
 * BoostInterior pricing — the only prices this site shows (KRW), shared by the landing summary
 * and the two pricing pages. Two independent choices: how the system is built (one-time setup)
 * and how it is run (monthly plan).
 * Every amount is what the customer pays, VAT included. Monthly only: there is no annual plan.
 */

/** VAT wording. `all` is said once per page; the setup and monthly areas of the pricing pages add their own line. */
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
    label: "시공사례 AI 검색용 정리",
    items: [
      "현재 홈페이지에 공개된 기존 시공사례 전체 수집",
      "기존 시공사례를 AI가 찾아줄 수 있도록 정리",
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

/**
 * Basic homepage connections: links and buttons to the channels a visitor already uses. Every option
 * that builds or reworks the homepage (B, C, D) includes them, in the same words, so a higher-priced
 * option never reads as connecting less. Systems that have to be developed (예약, 결제, …) are not
 * connections: each option's `beyond` quotes them separately.
 */
export const BASIC_CONNECTIONS = "카카오톡 상담 · 지도 · 전화 · SNS 등 홈페이지에 필요한 기본 연결 지원";
/** The same scope inside a sentence. */
export const BASIC_CONNECTIONS_SHORT = "카카오톡 · 지도 · 전화 · SNS 등 기본 연결";

/** /pricing/details: the areas of homepage work the setup options are compared by, in display order. */
export const SETUP_SCOPE_GROUPS = [
  { key: "site", label: "홈페이지 디자인 · 구성" },
  { key: "portfolio", label: "시공사례 페이지" },
  { key: "cta", label: "상담 · 견적 문의 동선" },
  { key: "quality", label: "휴대폰 화면 · 검색 노출 · 속도" },
  { key: "launch", label: "보안 연결 · 점검" },
] as const;

export type SetupScopeKey = (typeof SETUP_SCOPE_GROUPS)[number]["key"];

export interface SetupOption {
  key: "A" | "B" | "C" | "D";
  /** Anchor of the option's block on both pricing pages */
  id: string;
  name: string;
  /** Compact label shown next to the name wherever the option is listed. A recommendation, never a sales claim. */
  badge?: string;
  price: number;
  /** Price is a starting point ("부터"): the scope is confirmed per site */
  from?: boolean;
  /** What happens to the homepage — the one thing the options differ in, and what the price follows */
  website: string;
  /** The owner's situation it answers, as the /pricing cards say it */
  situation: string;
  /** The same situation in the owner's own words: the decision helper on the landing and on /pricing */
  need: string;
  summary: string;
  /** Who it is for */
  fit: string;
  /** Landing card: the homepage work that matters most */
  highlights: readonly string[];
  /**
   * /pricing/details: the homepage work by area, on top of the common build. A string instead of a list
   * means the homepage is left as it is there, and says so.
   */
  includes: Readonly<Record<SetupScopeKey, readonly string[] | string>>;
  /** What falls outside the basic scope, and how it is handled */
  beyond: string;
  note?: string;
}

export interface Plan {
  name: "Core" | "Growth" | "Managed";
  /** What kind of plan it is, in a few words: the basics → more video and analysis → people working on it with you */
  role: string;
  price: number;
  /** What the owner wants from it, as the decision helper says it */
  need: string;
  /** The plan in one line, under that sentence: the plan below in full, and what this one puts on top */
  scope: string;
  summary: string;
  /** The plan this one contains in full */
  base?: "Core" | "Growth";
  /** The card, on the landing and on both pricing pages: the few things that define the plan. Every feature is in COMPARISON. */
  highlights: readonly string[];
  /** Said under the card's list: what a reader might think is missing from the plan, and is not */
  assurance?: string;
  note?: string;
}

/** Where the plans differ in how much rather than whether: the amount in words. `short` is for a column too narrow for `text`. */
export interface PlanAmount {
  text: string;
  short?: string;
}

/**
 * AI Portfolio Video — the one feature every plan carries in a different amount. Core's is a number.
 * Growth's has none: it follows the 시공사례 a company newly registers, and is never called unlimited.
 * Managed carries Growth's and promises no amount of its own. Usage is counted by hand for now (there
 * is no quota system), so the copy says nothing a person could not keep track of.
 */
export const VIDEO = {
  name: "AI Portfolio Video",
  core: { text: "월 1건" },
  growth: { text: "신규 시공사례 기준 확대 제공", short: "확대 제공" },
} as const satisfies { name: string; core: PlanAmount; growth: PlanAmount };

/** Where the feature starts, as the badge next to its name says it. */
export const VIDEO_FROM = `Core ${VIDEO.core.text}부터`;

export const SETUP_OPTIONS: readonly SetupOption[] = [
  {
    key: "A",
    id: "integration",
    name: "기존 홈페이지 연동",
    price: 290_000,
    website: "지금 홈페이지 그대로 사용",
    situation: "이미 홈페이지가 있다면",
    need: "지금 홈페이지가 있고, 그대로 사용하고 싶어요",
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
    // The id is also the pricing pages' anchor, so it keeps the name the option had before "Quick Start".
    id: "quick-website",
    name: "Quick Start",
    badge: "홈페이지가 없다면 추천",
    price: 490_000,
    website: "새 홈페이지 빠르게 제작",
    situation: "새 홈페이지가 빨리 필요하다면",
    need: "홈페이지가 없고, 빠르게 시작하고 싶어요",
    summary: "새 홈페이지가 필요하고, 복잡한 제작 과정 없이 빠르게 시작하고 싶은 업체를 위한 상품입니다.",
    fit: "홈페이지가 없거나 새로 만들고 싶고, 오래 기다리지 않고 빠르게 시작하고 싶은 업체",
    highlights: ["휴대폰에서도 보기 편한 화면", "네이버·구글 노출 기본 설정 · 빠른 로딩", "기존 공개 시공사례 이전"],
    includes: {
      site: ["인테리어 업체에 필요한 기본 기능을 갖춘 새 홈페이지", "인테리어 업체에 맞는 기본 페이지 구성"],
      portfolio: ["시공사례를 보기 좋게 구성", "기존 공개 시공사례 이전"],
      cta: ["상담 · 견적 문의로 이어지는 버튼과 동선"],
      quality: ["휴대폰 · 태블릿에서도 보기 편한 화면", "네이버·구글 노출을 위한 기본 설정", "빠른 페이지 로딩"],
      launch: ["고객이 안심하고 접속할 수 있는 보안 연결", BASIC_CONNECTIONS, "오픈 전 기본 점검"],
    },
    beyond: "예약 · 결제 등 복잡한 외부 시스템 연동은 별도 견적, 브랜드와 구성부터 새로 설계하려면 맞춤 홈페이지 제작",
    note: "인테리어 업체에 맞춰 미리 준비된 기본 구성으로 제작해 빠르게 시작합니다. 브랜드와 구성부터 새로 설계하려면 맞춤 홈페이지 제작이 적합합니다. 홈페이지 내용 수정이 필요한 경우 요청해주시면 반영을 지원합니다.",
  },
  {
    key: "C",
    id: "improvement",
    name: "기존 홈페이지 맞춤 개선",
    price: 1_200_000,
    from: true,
    website: "지금 홈페이지 맞춤 개선",
    situation: "지금 홈페이지를 고쳐 쓰고 싶다면",
    need: "홈페이지는 있는데, 화면이나 구성을 함께 고치고 싶어요",
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
      quality: ["휴대폰 화면 개선", "주요 페이지 오류 등 필요한 범위를 확인해 개선"],
      launch: [BASIC_CONNECTIONS, "상담에서 견적 문의까지 이어지는 흐름 점검"],
    },
    // The homepage is the customer's own build here, so a basic connection is promised only as far as it allows.
    beyond:
      "추가 페이지 · 특수 기능 · 복잡한 외부 시스템 연동 · 기존 홈페이지 관리 기능 재개발은 범위 확인 후 별도 견적, 현재 홈페이지 구조상 추가 개발이 필요한 연결은 범위 확인 후 안내",
    note: `홈페이지를 진단한 뒤 범위와 비용을 먼저 안내해드립니다. 기존 홈페이지를 관리하는 방식은 그대로 유지하며, 홈페이지 관리 기능의 재개발 · 교체와 기본 범위를 넘어서는 추가 페이지, 특수 기능, 예약 · 결제 등 복잡한 외부 시스템 연동은 범위를 확인한 뒤 별도 견적을 안내합니다. ${BASIC_CONNECTIONS_SHORT}은 현재 홈페이지에서 연결 가능한 범위에서 지원하며, 추가 개발이 필요한 경우 범위를 먼저 확인합니다.`,
  },
  {
    key: "D",
    // As with B, the id (and anchor) keeps the option's earlier name.
    id: "custom-website",
    name: "맞춤 홈페이지 제작",
    price: 2_500_000,
    from: true,
    website: "완전 맞춤 홈페이지 새로 제작",
    situation: "브랜드부터 새로 설계한다면",
    need: "홈페이지가 없고, 브랜드부터 새로 만들고 싶어요",
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
      launch: ["고객이 안심하고 접속할 수 있는 보안 연결", BASIC_CONNECTIONS],
    },
    beyond: "추가 페이지 · 특수 기능 · 복잡한 외부 시스템 연동 · 고급 화면 효과 · 별도 시스템 개발 · 홈페이지 관리 기능 개발은 범위 확인 후 별도 견적",
    note: "기본 범위를 넘어서는 추가 페이지, 특수 기능, 예약 · 결제 등 복잡한 외부 시스템 연동, 고급 화면 효과, 별도 시스템 개발, 홈페이지 관리 기능 개발은 범위를 확인한 뒤 별도 견적을 안내합니다.",
  },
];

/** One value per setup option, in SETUP_OPTIONS order: A, B, C, D. */
type PerSetup = readonly [string, string, string, string];

const SAME: PerSetup = ["동일하게 포함", "동일하게 포함", "동일하게 포함", "동일하게 포함"];

/**
 * /pricing/details setup comparison, collapsed: the common build in one row — the same in all four —
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
    values: ["기존 홈페이지 기준", "기본 설정 포함", "휴대폰 화면 · 주요 페이지 오류 등 필요한 범위 개선", "기본 설정 포함"],
  },
  { label: "추가 페이지 · 특수 기능", values: ["별도 협의", "별도 협의", "별도 견적", "별도 견적"] },
];

export const PLANS: readonly Plan[] = [
  {
    name: "Core",
    role: "운영 기본형",
    price: 88_000,
    need: "상담 · 시공사례 추천 · 견적 문의부터",
    scope: `AI 상담 · 시공사례 추천 · 견적 문의 + ${VIDEO.name} ${VIDEO.core.text}`,
    summary: `AI 상담부터 견적 문의까지 핵심 기능을 모두 사용하고, ${VIDEO.name}도 ${VIDEO.core.text} 사용합니다.`,
    highlights: ["24시간 AI 상담", "조건에 맞는 실제 시공사례 추천", "견적 문의와 상담 기록 확인", `${VIDEO.name} ${VIDEO.core.text}`],
    assurance: "AI 상담 · 시공사례 추천 · 견적 문의는 Core부터 모두 포함됩니다.",
  },
  {
    name: "Growth",
    role: "영상 활용 + 분석 강화형",
    price: 198_000,
    need: "방문자 분석과 더 넉넉한 영상 활용까지",
    scope: `Core 전체 포함 + 방문자 분석 + ${VIDEO.name} 활용 범위 확대`,
    summary: "방문자가 어디를 보고 어떻게 움직이는지 확인하고, 새롭게 등록되는 시공사례를 영상으로 더 넉넉하게 활용합니다.",
    base: "Core",
    // The video is Core's too. What Growth adds is how much of it, so the line says "more", never "has".
    highlights: ["방문자가 어디를 보고 어떻게 움직이는지 확인", `${VIDEO.name} 활용 범위 확대`],
    note: `${VIDEO.name}는 Core의 ${VIDEO.core.text}에서, 새롭게 등록되는 실제 시공사례 기준으로 제공 범위가 넓어집니다. 영상은 업체가 제공하는 실제 시공 자료로 제작합니다.`,
  },
  {
    name: "Managed",
    role: "함께 검토 · 개선하는 관리형",
    price: 297_000,
    need: "매달 함께 확인하고 개선할 운영 지원까지",
    scope: "Growth 전체 포함 + 매달 함께 검토 · 개선하는 운영 지원",
    summary: "기능만 사용하는 것이 아니라, 매달 실제 데이터를 함께 보면서 개선합니다.",
    base: "Growth",
    // The Managed-only rows of COMPARISON, two to a line: what the owner gets every month.
    highlights: ["월 1회 방문자 · 상담 데이터 함께 확인", "자주 묻는 질문 답변 개선 · 시공사례 업데이트 지원", "월간 개선 포인트 정리 · 우선 지원"],
    note: "실제 작업 범위는 계약 및 운영정책에 따라 정해집니다.",
  },
];

/** What a plan carries of a row: all of it, none of it, or — where the plans differ in amount — how much. */
type Cell = boolean | PlanAmount;
/** One cell per plan, in PLANS order: Core, Growth, Managed. */
type Cells = readonly [Cell, Cell, Cell];
const ALL: Cells = [true, true, true];
const GROWTH_UP: Cells = [false, true, true];
const MANAGED_ONLY: Cells = [false, false, true];
/** Managed's cell is Growth's own, not a copy of its words: the two cannot drift, and the table says "Growth와 동일". */
const VIDEO_PLANS: Cells = [VIDEO.core, VIDEO.growth, VIDEO.growth];

/** /pricing/details comparison, collapsed: one row per category below — the six differences that decide a plan. */
export const COMPARISON_CORE: readonly { label: string; plans: Cells }[] = [
  { label: "24시간 AI 상담", plans: ALL },
  { label: "시공사례 검색 · 추천", plans: ALL },
  { label: "견적 문의 · 상담 기록", plans: ALL },
  { label: "방문자 행동 분석", plans: GROWTH_UP },
  { label: VIDEO.name, plans: VIDEO_PLANS },
  { label: "월간 운영 · 개선", plans: MANAGED_ONLY },
];

/**
 * /pricing/details comparison, expanded: everything each monthly plan carries, grouped by what the owner
 * cares about. The plan cards only show highlights, so this is where every feature is listed.
 */
export const COMPARISON: readonly { category: string; rows: readonly { label: string; plans: Cells }[] }[] = [
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
    category: VIDEO.name,
    rows: [{ label: `${VIDEO.name} 제공 범위`, plans: VIDEO_PLANS }],
  },
  {
    category: "운영 지원",
    rows: [
      { label: "기본 시스템 운영", plans: ALL },
      { label: "월 1회 방문자 · 상담 데이터 함께 확인", plans: MANAGED_ONLY },
      { label: "AI 상담 답변 흐름 점검 · 자주 묻는 질문 답변 개선", plans: MANAGED_ONLY },
      { label: "전문 상담지식 · 시공사례 업데이트 지원", plans: MANAGED_ONLY },
      { label: "상담 · 견적 문의 버튼과 동선 점검 · 개선 제안", plans: MANAGED_ONLY },
      { label: "월간 개선 포인트 정리", plans: MANAGED_ONLY },
      { label: "우선 지원", plans: MANAGED_ONLY },
    ],
  },
];

/** The order the decision helper asks in: owners with a homepage first (keep it, or rework it), then those without. */
export const DECISION_SETUP_KEYS: readonly SetupOption["key"][] = ["A", "C", "B", "D"];

/**
 * A plan's cell in words, where the row is an amount: its own, or "Growth와 동일" where it carries
 * the plan below's unchanged. Null for a row a plan simply has or does not have.
 */
export const planAmount = (plans: Cells, i: number): PlanAmount | null => {
  const cell = plans[i];
  if (typeof cell === "boolean") return null;
  return i > 0 && cell === plans[i - 1] ? { text: `${PLANS[i - 1].name}와 동일` } : cell;
};

/** AI Portfolio Video plan by plan, as the comparison has it: 월 1건 → 신규 시공사례 기준 확대 제공 → Growth와 동일. */
export const VIDEO_AMOUNTS = PLANS.map((plan, i) => ({ plan: plan.name, text: planAmount(VIDEO_PLANS, i)!.text }));

/**
 * What a plan adds to the one below it: the comparison rows that start at that plan or grow there,
 * by category. Growth → 방문자 분석 and more AI Portfolio Video; Managed → 운영 지원.
 */
export const planAdditions = (name: Plan["name"]) => {
  const i = PLANS.findIndex((plan) => plan.name === name);
  return COMPARISON.map((group) => ({
    category: group.category,
    labels: group.rows.filter((row) => row.plans[i] && !(i > 0 && row.plans[i] === row.plans[i - 1])).map((row) => row.label),
  })).filter((group) => group.labels.length > 0);
};

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
