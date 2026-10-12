import type { IconName } from "@/components/ui/Icon";

/**
 * BoostInterior pricing — the only prices this site shows (KRW), shared by the landing, the three
 * feature pages and the two pricing pages. Two kinds of price that do not depend on each other:
 * a monthly subscription (AI 마케팅, AI 상담, or both as 올인원) and a one-time homepage build.
 * Every amount is what the customer pays, VAT included. Monthly only: there is no annual plan.
 * What each product carries, where it works today, what is still to be released, the trial policy
 * and the way on (this site takes no payment) are stated here once. Pages read them; none restates them.
 */

const BRAND = "BoostInterior";

/** VAT wording. `all` is said once per page; `short` sits next to an amount. */
export const VAT_NOTICE = {
  all: "모든 표시 가격은 부가세(VAT)가 포함된 최종 금액입니다.",
  setup: "모든 구축비는 부가세(VAT)가 포함된 최종 금액입니다.",
  monthly: "월 이용료 역시 부가세(VAT)가 포함된 금액입니다.",
} as const;
export const VAT_SHORT = "VAT 포함";

/**
 * Whether something can be used today. `planned` is decided and not released; `unsupported` is not
 * offered and has no release decided, so nothing may call it "coming".
 */
export type Status = "now" | "planned" | "unsupported";
export const STATUS_LABEL: Record<Status, string> = {
  now: "지금 이용 가능",
  planned: "출시 예정",
  unsupported: "현재 미지원",
};

export interface Availability {
  status: Status;
  text: string;
}

export type SubscriptionKey = "marketing" | "consultation" | "all-in-one";

export interface Subscription {
  key: SubscriptionKey;
  /** Anchor of the product's block on both pricing pages */
  id: string;
  name: string;
  icon: IconName;
  /** Monthly, VAT included */
  price: number;
  /** What it is for, in one line */
  line: string;
  summary: string;
  /** Everything the subscription carries. The same list on every page. */
  features: readonly string[];
  /** Where it works today and what is not released yet. Shown wherever the price is. */
  availability: readonly Availability[];
  /** What a reader might assume from the name, and should not */
  caution: string;
}

/**
 * The three subscriptions. 올인원 is the other two together and adds nothing of its own, so its
 * features are their names and its saving is computed from their prices (see ALL_IN_ONE).
 * How many videos or answers a month a subscription covers is not decided, so no number is given
 * and nothing is called without limit.
 */
export const SUBSCRIPTIONS: readonly Subscription[] = [
  {
    key: "marketing",
    id: "ai-marketing",
    name: "AI 마케팅",
    icon: "video",
    price: 29_700,
    line: "시공사진으로 릴스 · 쇼츠 영상과 게시글, 블로그 초안을 만듭니다.",
    summary: "시공사진과 공사 정보를 올리면 세로 영상과 표지 이미지, 채널별 글이 함께 준비됩니다.",
    features: [
      "시공사진 · 공사 정보 등록",
      "릴스 · 쇼츠용 세로 영상 만들기",
      "영상 파일(MP4) 내려받기",
      "표지 이미지 만들기",
      "인스타그램 본문 · 해시태그, 유튜브 쇼츠 제목 · 설명",
      "네이버 블로그 초안",
    ],
    availability: [
      { status: "now", text: `${BRAND}로 만든 홈페이지와 함께 이용` },
      { status: "planned", text: "홈페이지 없이 AI 마케팅만 따로 이용" },
    ],
    caution: "영상과 글을 만드는 데까지 돕습니다. 인스타그램 · 유튜브 · 블로그에는 대표님이 직접 올립니다.",
  },
  {
    key: "consultation",
    id: "ai-consultation",
    name: "AI 상담",
    icon: "chat",
    price: 19_800,
    line: "홈페이지 방문자의 질문에 AI가 답하고, 견적 문의를 받아 둡니다.",
    summary: "방문자가 원하는 공사를 말하면 우리 업체 정보로 답하고, 남긴 견적 문의는 관리 화면에 정리됩니다.",
    features: [
      "홈페이지 방문자 AI 응대",
      "업체 정보 · 자주 묻는 질문을 바탕으로 한 답변",
      "상담창 안에서 견적 문의 접수",
      "관리 화면에서 상담 기록 · 문의 확인",
      `시공사례 안내 · 추천 (${BRAND} 홈페이지에 게시한 시공사례가 있을 때)`,
    ],
    availability: [
      { status: "now", text: `${BRAND}로 만든 홈페이지: 상담창이 연결된 상태로 제작` },
      { status: "now", text: "기존 홈페이지: 상담창을 설치하고 업체 정보를 등록해 이용" },
      { status: "unsupported", text: "기존 홈페이지의 시공사례를 카드로 추천하는 기능" },
    ],
    caution: "견적 금액과 공사 일정은 AI가 정하지 않습니다. 대표님이 문의를 확인한 뒤 직접 상담합니다.",
  },
  {
    key: "all-in-one",
    id: "all-in-one",
    name: "올인원",
    icon: "layers",
    price: 39_600,
    line: "AI 마케팅과 AI 상담을 함께 씁니다.",
    summary: "시공사진으로 만든 콘텐츠가 방문자를 부르고, 방문자의 질문은 AI 상담이 받아 견적 문의로 잇습니다.",
    features: ["AI 마케팅 전체", "AI 상담 전체"],
    availability: [
      { status: "now", text: `${BRAND}로 만든 홈페이지에서 두 기능을 모두 이용` },
      { status: "planned", text: "기존 홈페이지에서의 AI 마케팅 (단독 이용 출시 후)" },
    ],
    caution: "홈페이지 신규 제작은 포함되지 않습니다. 홈페이지가 필요하면 제작비는 별도입니다.",
  },
];

const [MARKETING, CONSULTATION, BUNDLE] = SUBSCRIPTIONS;

export const subscription = (key: SubscriptionKey) => SUBSCRIPTIONS.find((item) => item.key === key)!;

/** 올인원 against the two subscriptions taken separately. The saving is computed, never typed. */
export const ALL_IN_ONE = {
  parts: [MARKETING.key, CONSULTATION.key] as readonly SubscriptionKey[],
  separate: MARKETING.price + CONSULTATION.price,
  saving: MARKETING.price + CONSULTATION.price - BUNDLE.price,
} as const;

/**
 * 14일 무료 체험 — a policy decided for the launch of card payment. Nothing of it works yet: this
 * site registers no card, starts no trial and charges nothing, so every page that names it carries
 * `notice` and leads on with the demo or the 문의 button, never with a "start" button.
 * It is decided for AI 마케팅 only.
 */
const TRIAL_DAYS = 14;
export const TRIAL = {
  status: "planned" as Status,
  days: TRIAL_DAYS,
  product: MARKETING.key,
  label: `${TRIAL_DAYS}일 무료 체험 예정`,
  title: `${MARKETING.name} ${TRIAL_DAYS}일 무료 체험`,
  steps: [
    "회원가입은 무료입니다.",
    `${MARKETING.name}을 쓰기 전에 카드를 등록하고 정기결제에 동의합니다.`,
    `카드 등록 후 ${TRIAL_DAYS}일 동안 무료로 체험합니다.`,
    `체험이 끝나면 월 ${MARKETING.price.toLocaleString("en-US")}원이 정기결제됩니다.`,
  ],
  cancel: "체험 중에 해지하면 첫 결제는 이루어지지 않습니다.",
  notice: "출시 전 정책입니다. 지금은 카드 등록과 무료 체험을 시작할 수 없으며, 이용 문의는 카카오톡으로 받습니다.",
  others: `${CONSULTATION.name}과 ${BUNDLE.name}의 무료 체험 여부는 정해지지 않았으며, 출시 전에 안내드립니다.`,
} as const;

/** How a subscription is started today. There is no checkout: it begins with a 문의. */
export const SUBSCRIBE_NOTE = "지금은 이 사이트에서 결제하지 않습니다. 카카오톡으로 문의하시면 이용 방법을 안내드립니다.";

/** Said wherever a subscription's amount could be read as "as much as you like". */
export const ALLOWANCE_NOTE = "한 달에 만들 수 있는 횟수와 상담 건수의 기준은 정식 결제 출시 전에 확정해 안내드립니다.";
/** The same answer on a product's own page, about that product only. */
export const ALLOWANCE = {
  marketing: "한 달에 만들 수 있는 횟수의 기준은 아직 정해지지 않았습니다. 정식 결제 출시 전에 확정해 안내드립니다.",
  consultation: "한 달에 상담할 수 있는 건수의 기준은 아직 정해지지 않았습니다. 정식 결제 출시 전에 확정해 안내드립니다.",
} as const;

/**
 * 홈페이지 기본 운영 — no monthly fee. What "basic operation" covers is not written down anywhere
 * yet, so the page promises the one thing decided (no monthly fee) and names what is not in it.
 */
export const WEBSITE_OPERATION = {
  label: "기본 운영 월 이용료 없음",
  text: `${BRAND}로 만든 홈페이지는 기본 운영에 월 이용료를 받지 않습니다.`,
  separate:
    "홈페이지 주소의 구매 · 갱신 비용과 구축 범위 밖의 추가 작업은 포함되지 않습니다. 기본 운영에 포함되는 범위는 계약 전에 먼저 안내드립니다.",
  addOn: `${MARKETING.name}과 ${CONSULTATION.name}은 필요할 때 월 구독으로 추가합니다.`,
} as const;

/** The initial setup of AI 상담: what 기존 홈페이지 연동 is, and what every build carries for a subscriber. */
export const CONSULT_SETUP = "AI 상담 초기 세팅";
export const CONSULT_SETUP_ITEMS = [
  "AI 상담창 연결",
  "업체 기본정보 · 자주 묻는 질문 초기 등록",
  "상담에서 견적 문의로 이어지는 흐름 구성",
  `${BRAND} 관리 화면 연결 (상담 기록 · 상담 요청 확인, 상담 자료 관리)`,
  "휴대폰 포함 기본 동작 점검",
] as const;

/**
 * Basic homepage connections: links and buttons to the channels a visitor already uses. Every option
 * that builds or reworks the homepage (B, C, D) includes them, in the same words, so a higher-priced
 * option never reads as connecting less. Systems that have to be developed (예약, 결제, …) are not
 * connections: each option's `beyond` quotes them separately.
 */
export const BASIC_CONNECTIONS = "카카오톡 상담 · 지도 · 전화 · SNS 등 홈페이지에 필요한 기본 연결 지원";
/** The same scope inside a sentence. */
export const BASIC_CONNECTIONS_SHORT = "카카오톡 · 지도 · 전화 · SNS 등 기본 연결";

/** /pricing/details: the areas of homepage work the build options are compared by, in display order. */
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
  /** One time, VAT included */
  price: number;
  /** Price is a starting point ("부터"): the scope is confirmed per site */
  from?: boolean;
  /** What happens to the homepage — the one thing the options differ in, and what the price follows */
  website: string;
  /** Whether the option makes a homepage, or works on the one the owner has */
  builds: boolean;
  /** The owner's situation it answers */
  situation: string;
  /** The same situation in the owner's own words */
  need: string;
  summary: string;
  /** Who it is for */
  fit: string;
  /** The card: the work that matters most */
  highlights: readonly string[];
  /** The homepage work by area. A string instead of a list means the homepage is left as it is there, and says so. */
  includes: Readonly<Record<SetupScopeKey, readonly string[] | string>>;
  /** Which subscriptions can be used on the homepage this option leaves, today */
  subscriptions: readonly SubscriptionKey[];
  /** What falls outside the basic scope, and how it is handled */
  beyond: string;
  note?: string;
}

/**
 * 홈페이지 제작 — four one-time builds. Their prices are the ones the site has always shown; this
 * version changed none of them. A is not a homepage build: it connects AI 상담 to the homepage the
 * owner already has, and is listed first so the two are never confused.
 */
export const SETUP_OPTIONS: readonly SetupOption[] = [
  {
    key: "A",
    id: "integration",
    name: "기존 홈페이지 연동",
    price: 290_000,
    website: "지금 홈페이지 그대로 사용",
    builds: false,
    situation: "이미 홈페이지가 있다면",
    need: "지금 홈페이지는 그대로 두고, AI 상담을 붙이고 싶어요",
    summary: "지금 홈페이지는 그대로 사용하면서, AI 상담창을 설치하고 우리 업체 정보로 상담을 세팅합니다.",
    fit: "이미 홈페이지가 있고, 디자인은 그대로 두고 싶은 업체",
    highlights: ["지금 홈페이지 그대로 사용", "AI 상담창 설치 · 초기 세팅", "디자인 · 구성 변경 없음"],
    includes: {
      site: ["현재 홈페이지 구성 확인"],
      portfolio: "기존 시공사례 페이지 그대로",
      cta: "기존 화면 그대로",
      quality: "기존 홈페이지 기준",
      launch: "기존 홈페이지 관리 방식 그대로",
    },
    subscriptions: ["consultation"],
    beyond: "홈페이지 수정 · 개선이 필요하면 기존 홈페이지 맞춤 개선",
    note: `새 홈페이지를 만드는 상품이 아니라, ${CONSULTATION.name}을 지금 홈페이지에 연결하는 한 번의 작업입니다. 시공사례를 카드로 추천하는 기능은 ${BRAND}로 만든 홈페이지에서 제공하며, 기존 홈페이지에서는 현재 지원하지 않습니다.`,
  },
  {
    key: "B",
    // The id is also the pricing pages' anchor, so it keeps the name the option had before "Quick Start".
    id: "quick-website",
    name: "Quick Start",
    badge: "홈페이지가 없다면 추천",
    price: 490_000,
    website: "새 홈페이지 빠르게 제작",
    builds: true,
    situation: "새 홈페이지가 빨리 필요하다면",
    need: "홈페이지가 없고, 빠르게 시작하고 싶어요",
    summary: "새 홈페이지가 필요하고, 복잡한 제작 과정 없이 빠르게 시작하고 싶은 업체를 위한 상품입니다.",
    fit: "홈페이지가 없거나 새로 만들고 싶고, 오래 기다리지 않고 빠르게 시작하고 싶은 업체",
    highlights: ["휴대폰에서도 보기 편한 화면", "시공사례 목록 · 상세 · 조건 검색", "견적 문의 양식 포함"],
    includes: {
      site: ["인테리어 업체에 필요한 기본 기능을 갖춘 새 홈페이지", "인테리어 업체에 맞는 기본 페이지 구성"],
      portfolio: ["시공사례를 보기 좋게 구성", "기존 공개 시공사례 이전 (건수와 범위는 제작 전에 안내)"],
      cta: ["상담 · 견적 문의로 이어지는 버튼과 동선"],
      quality: ["휴대폰 · 태블릿에서도 보기 편한 화면", "네이버·구글 노출을 위한 기본 설정", "빠른 페이지 로딩"],
      launch: ["고객이 안심하고 접속할 수 있는 보안 연결", BASIC_CONNECTIONS, "오픈 전 기본 점검"],
    },
    subscriptions: ["marketing", "consultation", "all-in-one"],
    beyond: "예약 · 결제 등 복잡한 외부 시스템 연동은 별도 견적, 브랜드와 구성부터 새로 설계하려면 맞춤 홈페이지 제작",
    note: "인테리어 업체에 맞춰 미리 준비된 기본 구성으로 제작해 빠르게 시작합니다. 브랜드와 구성부터 새로 설계하려면 맞춤 홈페이지 제작이 적합합니다. 홈페이지 내용 수정이 필요한 경우 요청해주시면 반영을 지원합니다. 수정 범위와 비용은 요청 내용을 확인한 뒤 먼저 안내드립니다.",
  },
  {
    key: "C",
    id: "improvement",
    name: "기존 홈페이지 맞춤 개선",
    price: 1_200_000,
    from: true,
    website: "지금 홈페이지 맞춤 개선",
    builds: false,
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
    subscriptions: ["consultation"],
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
    builds: true,
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
    subscriptions: ["marketing", "consultation", "all-in-one"],
    beyond: "추가 페이지 · 특수 기능 · 복잡한 외부 시스템 연동 · 고급 화면 효과 · 별도 시스템 개발 · 홈페이지 관리 기능 개발은 범위 확인 후 별도 견적",
    note: "기본 범위를 넘어서는 추가 페이지, 특수 기능, 예약 · 결제 등 복잡한 외부 시스템 연동, 고급 화면 효과, 별도 시스템 개발, 홈페이지 관리 기능 개발은 범위를 확인한 뒤 별도 견적을 안내합니다.",
  },
];

/** The cheapest build that makes a homepage: what "홈페이지 제작 ○○만원부터" reads from. */
export const ENTRY_BUILD = SETUP_OPTIONS.filter((option) => option.builds).reduce((low, option) => (option.price < low.price ? option : low));
/** The one option that connects AI 상담 to a homepage the owner already has. */
export const INTEGRATION_OPTION = SETUP_OPTIONS.find((option) => option.key === "A")!;

/**
 * Where each subscription works today and what it takes to start, in one line: shown under the
 * price wherever there is no room for the full availability list, so a monthly amount is never
 * read as the whole cost of starting.
 */
export const TODAY: Readonly<Record<SubscriptionKey, string>> = {
  marketing: `지금은 ${BRAND}로 만든 홈페이지와 함께 이용합니다. 홈페이지 없이 따로 쓰는 방식은 출시 예정입니다.`,
  consultation: `${BRAND}로 만든 홈페이지에서는 바로, 기존 홈페이지에는 ${INTEGRATION_OPTION.name}(${INTEGRATION_OPTION.price / 10_000}만원, 1회)으로 연결해 이용합니다.`,
  "all-in-one": `지금은 ${BRAND}로 만든 홈페이지에서 이용합니다.`,
};

/** One value per build option, in SETUP_OPTIONS order: A, B, C, D. */
type PerSetup = readonly [string, string, string, string];

/**
 * /pricing/details build comparison: what happens to the homepage, then what each option means for
 * the two subscriptions and for the monthly fee. Short status words rather than ✓ / ✗ — the options
 * differ in kind, not in how much they include.
 */
export const SETUP_COMPARISON: readonly { label: string; values: PerSetup }[] = [
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
  {
    label: `${CONSULTATION.name} (월 구독)`,
    values: ["상담창 설치 · 초기 세팅이 이 상품의 작업", "상담창이 연결된 상태로 제작", "상담창 설치 · 초기 세팅 포함", "상담창이 연결된 상태로 제작"],
  },
  {
    label: `${MARKETING.name} (월 구독)`,
    values: ["단독 이용 출시 후", "바로 이용", "단독 이용 출시 후", "바로 이용"],
  },
  {
    label: "홈페이지 기본 운영 월 이용료",
    values: ["해당 없음 · 기존 방식 그대로", "없음", "해당 없음 · 기존 방식 그대로", "없음"],
  },
  { label: "추가 페이지 · 특수 기능", values: ["별도 협의", "별도 협의", "별도 견적", "별도 견적"] },
];

/** A comparison cell: what the product carries of the row. `mark` adds a tick or a dash to the words. */
export interface Cell {
  text: string;
  mark?: "yes" | "no";
}
const YES: Cell = { text: "포함", mark: "yes" };
const NO: Cell = { text: "해당 없음", mark: "no" };

const won0 = (value: number) => value.toLocaleString("en-US");

/** The four things this site sells, as the columns of the product comparison. */
export const PRODUCT_COLUMNS = [MARKETING.name, CONSULTATION.name, BUNDLE.name, "홈페이지 제작"] as const;

/**
 * /pricing/details product comparison: one row per question an owner asks before choosing, one cell
 * per product in PRODUCT_COLUMNS order. Conditions are written out, because a tick would hide them.
 */
export const PRODUCT_COMPARISON: readonly { label: string; cells: readonly [Cell, Cell, Cell, Cell] }[] = [
  {
    label: "홈페이지가 있어야 하나요",
    cells: [
      { text: `지금은 ${BRAND}로 만든 홈페이지 필요 · 단독 이용은 출시 예정` },
      { text: `필요 · ${BRAND}로 만든 홈페이지 또는 기존 홈페이지` },
      { text: `지금은 ${BRAND}로 만든 홈페이지 필요` },
      { text: "홈페이지를 만드는 서비스" },
    ],
  },
  {
    label: "시공사진 · 공사 정보 등록",
    cells: [YES, NO, YES, { text: "관리 화면에서 시공사례 등록 · 게시" }],
  },
  {
    label: "릴스 · 쇼츠 영상",
    cells: [YES, NO, YES, { text: `${MARKETING.name} 구독 시` }],
  },
  {
    label: "게시글 · 블로그 초안",
    cells: [YES, NO, YES, { text: `${MARKETING.name} 구독 시` }],
  },
  {
    label: "AI 상담",
    cells: [NO, YES, YES, { text: `${CONSULTATION.name} 구독 시` }],
  },
  {
    label: "견적 문의 접수",
    cells: [NO, { text: "상담창 안에서 접수", mark: "yes" }, { text: "상담창 안에서 접수", mark: "yes" }, { text: "홈페이지 견적 문의 양식 포함" }],
  },
  {
    label: "시공사례 추천에 필요한 자료",
    cells: [
      NO,
      { text: `${BRAND} 홈페이지에 게시한 시공사례` },
      { text: `${BRAND} 홈페이지에 게시한 시공사례` },
      { text: "게시한 시공사례가 추천에 쓰입니다" },
    ],
  },
  {
    label: "홈페이지 구축",
    cells: [
      { text: "포함되지 않음", mark: "no" },
      { text: "포함되지 않음", mark: "no" },
      { text: "포함되지 않음", mark: "no" },
      { text: "이 상품" },
    ],
  },
  {
    label: "홈페이지 기본 운영 월 이용료",
    cells: [NO, NO, NO, { text: "없음" }],
  },
  {
    label: "초기 구축비",
    cells: [
      { text: "없음 · 홈페이지 제작비는 별도" },
      { text: `기존 홈페이지에 연결할 때 ${INTEGRATION_OPTION.name} ${won0(INTEGRATION_OPTION.price)}원 (1회)` },
      { text: "홈페이지를 새로 만들 때 제작비 별도" },
      { text: `${won0(ENTRY_BUILD.price)}원부터 (1회 · ${ENTRY_BUILD.name} 기준)` },
    ],
  },
  {
    label: "무료 체험",
    cells: [{ text: TRIAL.label }, { text: "출시 전에 안내" }, { text: "출시 전에 안내" }, NO],
  },
  {
    label: "별도 연동 · 설정",
    cells: [
      { text: `${BRAND}로 만든 홈페이지에서는 연결된 상태로 시작` },
      { text: "기존 홈페이지는 상담창 설치와 업체 정보 · 자주 묻는 질문 등록 필요" },
      { text: "두 기능의 조건이 그대로 적용" },
      { text: "기존 자료 확인 후 제작" },
    ],
  },
];

/**
 * "내 상황에 맞는 선택" — the owner's situation, and what answers it: a subscription, a build, or
 * both. `planned` rows are said as such; they never read as something to buy today.
 */
export const SITUATIONS: readonly {
  need: string;
  subscription?: SubscriptionKey;
  setup?: SetupOption["key"];
  status: Status;
  note: string;
}[] = [
  {
    need: "홈페이지는 있고, 방문자 상담과 견적 문의를 받고 싶어요",
    subscription: "consultation",
    setup: "A",
    status: "now",
    note: "지금 홈페이지는 그대로 두고 상담창을 연결합니다.",
  },
  {
    need: "홈페이지가 없고, 홍보 콘텐츠와 상담까지 함께 시작하고 싶어요",
    subscription: "all-in-one",
    setup: "B",
    status: "now",
    note: "새 홈페이지를 만들고, 두 기능을 함께 씁니다.",
  },
  {
    need: "홈페이지만 먼저 만들고 싶어요",
    setup: "B",
    status: "now",
    note: "월 이용료 없이 시작하고, AI 기능은 필요할 때 추가합니다.",
  },
  {
    need: `${BRAND} 홈페이지가 있고, 릴스 · 쇼츠 영상과 글이 필요해요`,
    subscription: "marketing",
    status: "now",
    note: "등록한 시공사례의 사진으로 영상과 글을 만듭니다.",
  },
  {
    need: "홈페이지 없이 영상과 글만 만들고 싶어요",
    subscription: "marketing",
    status: "planned",
    note: "단독 이용은 출시 예정입니다. 지금은 홈페이지와 함께 시작할 수 있습니다.",
  },
];

/** An option's homepage work as one list in SETUP_SCOPE_GROUPS order. */
export const scopeItems = (option: SetupOption) =>
  SETUP_SCOPE_GROUPS.flatMap((group) => {
    const scope = option.includes[group.key];
    return typeof scope === "string" ? [] : scope;
  });

/** 290000 → "290,000" */
export const won = won0;

/** 290000 → "29" (만원). Every build price is a whole number of 만원. */
export const manwon = (value: number) => won(value / 10_000);

/** "월 29,700원" */
export const monthly = (item: Subscription) => `월 ${won(item.price)}원`;

/** "49만원" / "120만원부터" — a build's amount inside a sentence. "부터" only where the option itself starts from its price. */
export const spoken = (option: { price: number; from?: boolean }) => `${manwon(option.price)}만원${option.from ? "부터" : ""}`;

