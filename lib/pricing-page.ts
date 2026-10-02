import type { IconName } from "@/components/ui/Icon";
import { COMMON_BUILD, manwon, SETUP_OPTIONS } from "@/lib/pricing";

/**
 * Copy for the /pricing page that is not a price: what every setup option shares, what the
 * 290,000원 setup actually does, what Quick Start is, and the questions an owner asks before
 * paying. Prices and scope lists come from lib/pricing.ts.
 */

const [INTEGRATION, QUICK, IMPROVEMENT, CUSTOM] = SETUP_OPTIONS;

/** "29만원" / "120만원부터" — amounts inside sentences, read from the price list. */
const spoken = (option: (typeof SETUP_OPTIONS)[number]) => `${manwon(option.price)}만원${option.from ? "부터" : ""}`;

/**
 * The common build, above the setup comparison: the four options carry the same BoostInterior,
 * and the price follows the homepage work. The scope itself is COMMON_BOOSTINTERIOR_SCOPE.
 */
export const COMMON_SCOPE = {
  title: `어떤 구축 방식을 선택해도 ${COMMON_BUILD}은 동일하게 포함됩니다.`,
  text: "가격 차이는 AI 상담 기능의 차이가 아니라, 현재 홈페이지를 그대로 사용할지, 새 홈페이지를 빠르게 만들지, 기존 홈페이지를 맞춤 개선할지, 처음부터 맞춤 제작할지에 따라 결정됩니다.",
  /** 시공사례 policy: everything public on the current homepage, and nothing implied beyond it */
  portfolio: {
    lead: "시공사례 건수 제한 없음.",
    text: "현재 홈페이지에 공개된 기존 시공사례 전체를 수집해 AI가 찾아줄 수 있도록 정리합니다. 홈페이지에 없는 별도 자료의 정리는 범위를 확인한 뒤 안내해드립니다.",
  },
} as const;

/** Why 기존 홈페이지 연동 is not "installing a chat window": it is the common build, with no homepage work on top. */
export const INTEGRATION_VALUE = {
  title: `${spoken(INTEGRATION)}은 단순한 상담창 설치비가 아닙니다.`,
  text: `홈페이지에 상담창 하나를 붙이는 비용이 아니라, 우리 업체에 BoostInterior를 처음 구축하는 기본 구축비입니다. 홈페이지는 지금 그대로 사용하므로, 홈페이지 작업 없이 아래 ${COMMON_BUILD} 과정만 진행합니다.`,
} as const;

/** The common build in four steps, in the order the work happens. */
export const INTEGRATION_GROUPS: readonly { icon: IconName; title: string; text: string }[] = [
  {
    icon: "window",
    title: "홈페이지 · 업체 분석",
    text: "현재 홈페이지 구성과 업체 정보를 확인하고 초기 세팅합니다.",
  },
  {
    icon: "layers",
    title: "기존 시공사례 전체 정리",
    text: "홈페이지에 공개된 기존 시공사례 전체를 수집해 AI가 조건에 맞게 찾아줄 수 있도록 정리합니다.",
  },
  {
    icon: "chat",
    title: "AI 검색 · 상담 연결",
    text: "방문자의 조건에 맞는 실제 시공사례 검색 · 추천과 상담 · 견적 흐름을 연결합니다.",
  },
  {
    icon: "shield",
    title: "설치 · 점검",
    text: "AI 상담창, 홈페이지 주소 연결, 휴대폰 화면, 상담 동작, 견적 문의 흐름을 점검한 뒤 적용합니다.",
  },
];

/** How the 290,000원 setup proceeds, step by step — the detail behind the four steps above. */
export const INTEGRATION_PROCESS: readonly { title: string; text: string }[] = [
  { title: "홈페이지 확인", text: "현재 홈페이지와 상담 동선을 분석합니다." },
  { title: "업체 정보 정리", text: "서비스, 지역, 상담 기준, 업체 정보를 BoostInterior에 세팅합니다." },
  { title: "시공사례 수집", text: "홈페이지에 공개된 기존 시공사례를 전체 수집합니다." },
  { title: "시공사례 정리", text: "지역 · 평형 · 공간 · 스타일 · 공사범위 등으로 AI가 찾아줄 수 있도록 정리합니다." },
  { title: "AI 검색 연결", text: "방문자가 평소 말투로 말한 조건을 이해하고 실제 시공사례를 찾아주는 검색 흐름을 연결합니다." },
  { title: "견적 흐름 연결", text: "시공사례 확인에서 상담과 견적 문의로 이어지도록 구성합니다." },
  { title: "설치 및 점검", text: "AI 상담창, 홈페이지 주소 연결, 휴대폰 화면, 상담 동작을 확인한 뒤 적용합니다." },
];

/** Quick Start — what the new homepage gives the customer, in their words. Six, so the grid stays 3 × 2. */
export const QUICK_FEATURES: readonly { icon: IconName; label: string; text: string }[] = [
  { icon: "phone", label: "휴대폰에서도 편하게", text: "휴대폰 · 태블릿에서도 보기 편한 화면" },
  { icon: "search", label: "네이버·구글 노출 기본 설정", text: "검색 노출에 필요한 기본 설정" },
  { icon: "bolt", label: "빠른 페이지 로딩", text: "답답하지 않게 빠르게 열리는 화면" },
  { icon: "gallery", label: "시공사례 구성", text: "보기 좋게 구성 · 기존 공개 사례 이전" },
  { icon: "form", label: "상담·견적 문의 연결", text: "상담과 견적 문의로 이어지는 동선" },
  { icon: "chat", label: "BoostInterior AI 상담", text: "기본 구축 전체 포함" },
];

/**
 * Quick Start: the example site. It is a demo built for a made-up interior company, not a customer's
 * homepage, and the copy must never call it a customer case.
 */
export const QUICK_EXAMPLE = {
  title: `${QUICK.name} 예시 사이트`,
  text: "실제 화면과 BoostInterior 상담 흐름을 확인해보세요.",
  note: "가상 인테리어 업체를 기준으로 만든 예시 사이트입니다.",
  cta: `${QUICK.name} 예시 보기`,
  consult: "도입 상담받기",
} as const;

/** Quick Start: who it is for — a quick start with a new homepage, not a cut-down one. */
export const QUICK_VALUE = {
  title: "필요한 기능을 갖춘 새 홈페이지와 BoostInterior를 빠르게 시작하세요.",
  text: "새 홈페이지가 필요하고, 복잡한 제작 과정 없이 빠르게 시작하고 싶은 업체를 위한 상품입니다. 인테리어 업체에 필요한 기본 기능을 갖춘 홈페이지를 빠르게 제작합니다.",
} as const;

/** Quick Start vs 기존 홈페이지 맞춤 개선 — the one comparison owners get stuck on. */
export const QUICK_VS_IMPROVEMENT = {
  question: `새 홈페이지가 ${spoken(QUICK)}인데, 기존 홈페이지 개선은 왜 ${spoken(IMPROVEMENT)}인가요?`,
  quick: {
    name: QUICK.name,
    line: "미리 준비된 구성으로 빠르게 제작",
    text: "인테리어 업체에 필요한 화면과 기능을 미리 준비해 두었기 때문에 제작 과정이 단순하고 빠릅니다. 그래서 합리적인 가격으로 제공할 수 있습니다.",
  },
  improvement: {
    name: IMPROVEMENT.name,
    line: "현재 홈페이지에 맞춰 직접 수정",
    text: "현재 홈페이지의 제작 방식, 디자인, 주소, 내용, 페이지 구성을 유지하면서 업체마다 다른 문제를 하나씩 직접 고쳐야 하므로 맞춤 작업 범위가 커집니다.",
  },
} as const;

export const PRICING_FAQ: readonly { q: string; a: string }[] = [
  {
    q: `${spoken(INTEGRATION)}은 단순히 상담창을 설치하는 비용인가요?`,
    a: `아닙니다. 홈페이지에 상담창 하나를 붙이는 비용이 아니라, 우리 업체에 BoostInterior를 처음 구축하는 기본 구축비입니다. 업체 정보와 상담 정보 초기 세팅, 공개된 기존 시공사례 전체를 수집해 AI가 찾아줄 수 있도록 정리하는 작업, AI 시공사례 검색 연결, 상담 · 견적 문의 흐름 구성, AI 상담창과 홈페이지 주소 연결, 동작 점검까지 포함합니다.`,
  },
  {
    q: "어떤 구축 방식을 선택해도 AI 상담 기능은 같은가요?",
    a: `네. ${COMMON_BUILD} 범위는 모든 구축 방식에 공통으로 포함됩니다. 가격 차이는 홈페이지 작업 범위에 따라 달라집니다.`,
  },
  {
    q: "표시 가격에 부가세가 포함되어 있나요?",
    a: "네. BoostInterior에 표시된 구축비와 월 이용료는 모두 부가세(VAT)가 포함된 최종 금액입니다.",
  },
  {
    q: "기존 시공사례가 많아도 모두 등록하나요?",
    a: "네. 현재 홈페이지에 공개 중인 시공사례는 건수 제한 없이 전체를 초기 구축 대상으로 세팅합니다. 홈페이지에 없는 별도 자료까지 함께 정리해야 한다면 범위를 확인한 뒤 안내해드립니다.",
  },
  {
    q: QUICK_VS_IMPROVEMENT.question,
    a: `${QUICK.name}는 ${QUICK_VS_IMPROVEMENT.quick.text} ${IMPROVEMENT.name}은 ${QUICK_VS_IMPROVEMENT.improvement.text}`,
  },
  {
    q: `${QUICK.name}와 ${CUSTOM.name}은 무엇이 다른가요?`,
    a: `빠르게 시작하는 것과 처음부터 맞춰 만드는 것의 차이입니다. ${QUICK.name}(${spoken(QUICK)})는 인테리어 업체에 필요한 기본 기능을 갖춘 홈페이지를 빠르게 제작합니다. 휴대폰에서도 보기 편한 화면, 네이버·구글 노출을 위한 기본 설정, 빠른 페이지 로딩, 고객이 안심하고 접속할 수 있는 보안 연결, 시공사례 구성, 상담 · 견적 문의로 이어지는 버튼과 동선을 기본으로 갖춥니다. ${CUSTOM.name}(${spoken(CUSTOM)})은 브랜드, 메뉴와 화면 구성, 주요 페이지를 업체에 맞춰 처음부터 설계합니다. ${COMMON_BUILD}은 두 방식 모두 동일하게 포함됩니다.`,
  },
  {
    q: `${QUICK.name}로 만든 홈페이지는 나중에 수정할 수 있나요?`,
    a: "네. 홈페이지 내용 수정이 필요한 경우 요청해주시면 반영을 지원합니다.",
  },
  {
    q: "기존 홈페이지 개선에 홈페이지 관리 기능을 새로 만드는 작업도 포함되나요?",
    a: "기존 홈페이지의 글과 사진을 직접 고치는 홈페이지 관리 기능을 새로 만들거나 바꾸는 작업은 기본 범위에 포함되지 않습니다. 필요한 경우 범위를 확인한 뒤 별도 안내드립니다. 상담 기록과 상담 요청을 확인하는 BoostInterior 관리 화면은 홈페이지 관리 기능과 별개이며, 모든 구축 방식에 기본으로 제공됩니다.",
  },
  {
    q: "월 운영 플랜은 구축비와 별도인가요?",
    a: "네. 초기 구축비는 처음 한 번, 운영 플랜은 매월 이용하는 비용입니다. 구축 방식과 운영 플랜은 각각 선택합니다.",
  },
  {
    q: "나중에 플랜을 변경할 수 있나요?",
    a: "플랜 변경은 이용 상황에 맞춰 도입 상담에서 안내해드립니다. 카카오톡 1:1 상담으로 문의해 주세요.",
  },
  {
    q: "3D 시공사례도 제공하나요?",
    a: "3D 시공사례(3D Portfolio)는 현재 월 운영 플랜의 제공 기능에 포함되어 있지 않습니다. 준비되는 대로 초기 파트너(Founding Partner)에게 먼저 적용 · 사용 기회를 드릴 예정이며, 출시 일정은 확정되면 안내해드립니다.",
  },
  {
    q: "AI Portfolio Video는 몇 개까지 가능한가요?",
    a: "AI Portfolio Video는 시공사진을 공간의 흐름에 따라 보여주는 AI 시공사례 영상입니다. Growth 플랜부터 제공합니다. 업체를 운영하면서 새롭게 등록되는 실제 시공사례를 기준으로 건수 제한 없이 지원하며, 업체가 제공하는 실제 시공 자료로 제작합니다.",
  },
];
