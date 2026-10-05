import type { IconName } from "@/components/ui/Icon";
import { manwon, PLANS, SETUP_OPTIONS, VIDEO, VIDEO_FROM, won } from "@/lib/pricing";
import { SITE_NAME } from "@/lib/site";

/**
 * Copy for the landing that is not a price: what the product covers, why a homepage needs it,
 * the four steps, what the owner receives, how it gets onto a homepage, and the five questions
 * asked first. Every amount is read from lib/pricing.ts. Nothing here states a result, a customer
 * count, a delivery time or a contract term: none of those is decided or measured yet.
 */

const [INTEGRATION, QUICK, IMPROVEMENT, CUSTOM] = SETUP_OPTIONS;
const [CORE] = PLANS;

/** "29만원" / "120만원부터" — amounts inside sentences, read from the price list. */
const spoken = (option: (typeof SETUP_OPTIONS)[number]) => `${manwon(option.price)}만원${option.from ? "부터" : ""}`;

/** The cheapest way in, as the hero says it under its buttons. */
export const ENTRY_PRICE = [
  `${INTEGRATION.name} ${spoken(INTEGRATION)}부터`,
  `운영 월 ${won(CORE.price)}원부터`,
  "VAT 포함",
] as const;

/** The same two amounts as the price summary's headline: "29만원" and "월 8.8만원". */
export const ENTRY_HEADLINE = {
  setup: `${manwon(INTEGRATION.price)}만원`,
  monthly: `월 ${manwon(CORE.price)}만원`,
} as const;

/**
 * 02 — what one homepage gets, in four. All four are in every plan. The video is the one whose amount
 * differs by plan, so `plan` says where it starts and how much that is.
 */
export const QUICK_VALUES: readonly { icon: IconName; title: string; text: string; plan?: string }[] = [
  { icon: "chat", title: "24시간 상담", text: "방문자가 원하는 공사를 편하게 물어볼 수 있습니다." },
  { icon: "gallery", title: "우리 시공사례 추천", text: "업체가 실제로 해온 시공사례와 사진을 찾아 보여줍니다." },
  { icon: "form", title: "견적 문의 정리", text: "상담한 조건과 연락처가 관리 화면에 정리됩니다." },
  {
    icon: "video",
    title: VIDEO.name,
    text: "시공사진을 공간의 흐름에 맞춰 영상으로 만들어 홈페이지 · 인스타그램 · 유튜브 · 블로그 등에 활용할 수 있습니다.",
    plan: VIDEO_FROM,
  },
];

/** 04 — the same visit without and with BoostInterior. Four lines each; no numbers, no promised result. */
export const PROBLEM = {
  before: {
    title: "기존 홈페이지",
    lead: "방문자가",
    items: [
      "시공사례를 직접 찾아야 합니다",
      "내 조건과 비슷한 사례인지 스스로 판단해야 합니다",
      "궁금한 내용은 따로 문의해야 합니다",
      "연락하기 전에 나갈 수 있습니다",
    ],
  },
  after: {
    title: `${SITE_NAME} 적용`,
    lead: `${SITE_NAME}가`,
    items: ["원하는 조건을 대화로 이해합니다", "관련 시공사례를 추천합니다", "사진을 보며 상담합니다", "견적 문의까지 연결합니다"],
  },
} as const;

/**
 * 05 — the flow in four steps. `proofs` are what the longer walkthrough used to show one scene at a
 * time (the viewer, the photos, the remembered conditions, the phone layout), now inside the step
 * they belong to. Step 4 is shown in full by the section that follows.
 */
export const HOW_STEPS: readonly { id: string; title: string; text: string; proofs: readonly string[] }[] = [
  {
    id: "talk",
    title: "원하는 공사를 말합니다",
    text: "상담창이 지역 · 평수 · 공사 범위를 먼저 묻고, 방문자는 평소 말투로 답합니다.",
    proofs: ["버튼 하나로 상담 시작", "평수 · 공사 범위 · 스타일을 대화 속에서 이해"],
  },
  {
    id: "recommend",
    title: "우리 업체의 비슷한 시공사례와 사진을 보여줍니다",
    text: "지역 · 평형 · 공사 범위가 비슷한 우리 업체 시공사례를 카드로 추천합니다.",
    proofs: ["상담창을 떠나지 않고 사례를 크게 보기", "한 사례의 여러 사진을 넘겨 보기", "휴대폰에서는 화면 전체로 열림"],
  },
  {
    id: "inquiry",
    title: "상담한 조건으로 견적 문의를 남깁니다",
    text: "앞서 말한 지역 · 면적 · 공사 범위를 기억한 채로, 상담창 안에서 이름 · 연락처 · 문의 내용을 남깁니다.",
    proofs: ["처음부터 다시 설명할 필요 없음", "상담창 안에서 바로 남기는 견적 문의"],
  },
  {
    id: "owner",
    title: "대표님은 정리된 문의를 확인합니다",
    text: "어떤 공사를 원하는지 정리된 문의가 관리 화면에 들어옵니다.",
    proofs: [],
  },
];

/**
 * 06 — what one inquiry carries in the admin. These are the fields of the captured screen
 * (layer-inquiry-card.png), in its order; a field the screen does not have must not be added.
 */
export const OWNER_FIELDS = ["지역", "주거 유형", "면적", "공사 범위", "선호 스타일", "관심 사례", "연락처", "문의 내용"] as const;

/** The summary line of the captured inquiry, word for word. Demo data, and labelled as such where it is quoted. */
export const OWNER_SUMMARY =
  "대구 32평 아파트의 주방·욕실을 깔끔한 화이트·모던 스타일로 리모델링하고 싶어 하며, ‘32평 주방·욕실 중심 리뉴얼’ 사례 기준 상담을 원함.";

/** 08 — how it gets onto a homepage, and who does each step. No number of days: none is fixed. */
export const ONBOARDING_STEPS: readonly { by: "owner" | "us"; title: string }[] = [
  { by: "owner", title: "홈페이지 주소를 보내주세요" },
  { by: "us", title: "현재 홈페이지와 공개된 시공사례를 확인합니다" },
  { by: "us", title: "업체 정보와 시공사례를 AI가 찾을 수 있도록 정리합니다" },
  { by: "us", title: "홈페이지에 상담 기능을 연결합니다" },
  { by: "us", title: "실제 문의가 들어오는지 점검한 뒤 오픈합니다" },
];

export const ONBOARDING_PREP = {
  title: "준비하실 것은 홈페이지 주소입니다.",
  text: "기존 홈페이지나 공개된 자료가 있다면 홈페이지 주소부터 보내주세요. 추가로 필요한 자료는 진행 과정에서 안내드립니다.",
  none: "홈페이지가 아직 없어도 새 홈페이지와 함께 시작할 수 있습니다.",
} as const;

/**
 * 10 — the five questions asked first, answered only with what the price list and the scope already
 * say. Contract length, cancellation, refunds, when billing starts and reply times are not decided,
 * so they are not answered here.
 */
export const HOME_FAQ: readonly { q: string; a: string }[] = [
  {
    q: "기존 홈페이지에도 설치할 수 있나요?",
    a: `네. ${INTEGRATION.name}(${spoken(INTEGRATION)})은 지금 홈페이지의 디자인과 구성을 그대로 두고 ${SITE_NAME}를 연결합니다. 홈페이지 주소를 보내주시면 현재 구성을 확인한 뒤 맞는 연결 방식을 안내드립니다. 화면이나 구성도 함께 고치고 싶다면 ${IMPROVEMENT.name}(${spoken(IMPROVEMENT)})을 선택할 수 있습니다.`,
  },
  {
    q: "홈페이지가 없어도 가능한가요?",
    a: `네. ${QUICK.name}(${spoken(QUICK)})는 인테리어 업체에 필요한 기본 구성을 갖춘 새 홈페이지와 ${SITE_NAME}를 함께 시작합니다. 브랜드와 구성부터 새로 설계하려면 ${CUSTOM.name}(${spoken(CUSTOM)})이 맞습니다.`,
  },
  {
    q: "시공사례는 어떻게 준비하나요?",
    a: "따로 준비하실 것은 없습니다. 현재 홈페이지에 공개된 기존 시공사례를 건수 제한 없이 수집해, AI가 지역 · 평형 · 공간 · 스타일 · 공사범위로 찾을 수 있도록 정리합니다. 홈페이지에 없는 별도 자료까지 정리해야 한다면 범위를 확인한 뒤 안내해드립니다.",
  },
  {
    q: "문의는 어디에서 확인하나요?",
    a: `${SITE_NAME} 관리 화면에서 확인합니다. 홈페이지 문의와 AI 상담에서 들어온 견적 문의, 상담 기록이 한곳에 정리됩니다. 관리 화면은 모든 구축 방식에 기본으로 제공됩니다.`,
  },
  {
    q: "비용은 어떻게 구성되나요?",
    a: `처음 한 번 내는 초기 구축비와 매월 내는 운영 플랜, 두 가지입니다. 가장 가볍게는 ${INTEGRATION.name} ${won(INTEGRATION.price)}원과 ${CORE.name} 월 ${won(CORE.price)}원으로 시작합니다. 표시된 금액은 모두 부가세(VAT)가 포함된 최종 금액입니다. ${IMPROVEMENT.name}과 ${CUSTOM.name}은 시작 가격이며, 추가 페이지 · 특수 기능 · 복잡한 외부 연동은 범위를 확인한 뒤 별도 견적을 안내합니다.`,
  },
];

/**
 * 11 — why it was made, and what a first-time visitor can check for themselves instead of taking our
 * word for it. Business registration details are not here: none are published in this repo yet.
 */
export const WHY = {
  body: [
    "광고와 검색으로 방문자를 데려오는 것만으로는 문의가 생기지 않습니다. 방문한 고객이 자기 조건에 맞는 사례를 찾고, 궁금한 점을 풀고, 문의를 남기는 과정은 별개이기 때문입니다.",
    `${SITE_NAME}는 업체가 쌓아온 실제 시공사례가 상담 과정에서 쓰이고, 그 상담이 견적 문의까지 한 번에 이어지도록 만들었습니다.`,
  ],
  checks: [
    { icon: "chat", title: "직접 써볼 수 있습니다", text: "가입 없이 열리는 실제 데모에서 고객이 되어 상담해볼 수 있습니다." },
    { icon: "ticket", title: "가격을 전부 공개합니다", text: "구축비와 월 이용료를 부가세(VAT)가 포함된 최종 금액으로 적었습니다." },
    {
      icon: "window",
      title: "화면은 모두 실제 제품입니다",
      text: "이 페이지의 화면과 영상은 작동하는 제품을 그대로 담았습니다. 화면 속 업체와 시공사례, 문의는 데모용 예시이고, 사진은 AI로 만든 예시 이미지입니다.",
    },
  ],
} as const satisfies { body: readonly string[]; checks: readonly { icon: IconName; title: string; text: string }[] };
