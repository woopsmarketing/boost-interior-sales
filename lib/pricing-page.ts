import type { IconName } from "@/components/ui/Icon";
import { COMMON_BUILD, manwon, SETUP_OPTIONS } from "@/lib/pricing";

/**
 * Copy for the /pricing page that is not a price: what every setup option shares, what the
 * 290,000원 setup actually does, what a Quick Website is, and the questions an owner asks before
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
  text: "가격 차이는 AI 상담 기능의 차이가 아니라, 현재 홈페이지를 그대로 사용할지, 표준 홈페이지를 새로 만들지, 기존 사이트를 맞춤 개선할지, 완전히 맞춤 제작할지에 따라 결정됩니다.",
  /** Portfolio policy: everything public on the current homepage, and nothing implied beyond it */
  portfolio: {
    lead: "포트폴리오 건수 제한 없음.",
    text: "현재 홈페이지에 공개된 기존 포트폴리오 전체를 초기 구축 대상으로 수집 · 구조화합니다. 홈페이지에 없는 별도 자료의 정리는 범위를 확인한 뒤 안내해드립니다.",
  },
} as const;

/** Why 기존 홈페이지 연동 is not "a widget install": it is the common build, with no homepage work on top. */
export const INTEGRATION_VALUE = {
  title: `${spoken(INTEGRATION)}은 단순한 위젯 설치비가 아닙니다.`,
  text: `스크립트 한 줄을 넣는 비용이 아니라, 우리 업체에 BoostInterior를 처음 구축하는 기본 구축비입니다. 홈페이지는 지금 그대로 사용하므로, 홈페이지 작업 없이 아래 ${COMMON_BUILD} 과정만 진행합니다.`,
} as const;

/** The common build in four steps, in the order the work happens. */
export const INTEGRATION_GROUPS: readonly { icon: IconName; title: string; text: string }[] = [
  {
    icon: "window",
    title: "홈페이지 · 업체 분석",
    text: "현재 홈페이지 구조와 업체 정보를 확인하고 초기 세팅합니다.",
  },
  {
    icon: "layers",
    title: "기존 포트폴리오 전체 구조화",
    text: "홈페이지에 공개된 기존 시공사례 전체를 수집해 AI가 검색할 수 있는 데이터로 정리합니다.",
  },
  {
    icon: "chat",
    title: "AI 검색 · 상담 연결",
    text: "방문자의 조건에 맞는 실제 시공사례 검색 · 추천과 상담 · 견적 흐름을 연결합니다.",
  },
  {
    icon: "shield",
    title: "설치 · 검수",
    text: "위젯, 도메인, 모바일, 상담 동작, 견적 흐름을 검수한 뒤 적용합니다.",
  },
];

/** How the 290,000원 setup proceeds, step by step — the detail behind the four steps above. */
export const INTEGRATION_PROCESS: readonly { title: string; text: string }[] = [
  { title: "홈페이지 확인", text: "현재 홈페이지와 상담 동선을 분석합니다." },
  { title: "업체 정보 정리", text: "서비스, 지역, 상담 기준, 업체 정보를 BoostInterior에 세팅합니다." },
  { title: "포트폴리오 수집", text: "홈페이지에 공개된 기존 시공사례를 전체 수집합니다." },
  { title: "시공사례 구조화", text: "지역 · 평형 · 공간 · 스타일 · 공사범위 등 AI 상담에 필요한 형태로 정리합니다." },
  { title: "AI 검색 연결", text: "방문자의 자연어 조건을 이해하고 실제 시공사례를 찾아주는 검색 흐름을 연결합니다." },
  { title: "견적 흐름 연결", text: "시공사례 확인에서 상담과 견적 문의로 이어지도록 구성합니다." },
  { title: "설치 및 QA", text: "위젯, 도메인, 모바일, 상담 동작을 확인한 뒤 적용합니다." },
];

/** Quick Website — what the standard structure already covers. */
export const QUICK_FEATURES: readonly { icon: IconName; label: string; text: string }[] = [
  { icon: "phone", label: "Responsive", text: "모바일 반응형" },
  { icon: "search", label: "SEO", text: "기본 SEO 구조" },
  { icon: "bolt", label: "Speed", text: "빠른 로딩 · 성능 기준" },
  { icon: "lock", label: "HTTPS", text: "HTTPS(SSL) 적용" },
  { icon: "gallery", label: "Portfolio", text: "포트폴리오 구성" },
  { icon: "chat", label: "BoostInterior", text: "기본 구축 전체 포함" },
];

/** Quick Website: why a new site costs this little, in the customer's terms. */
export const QUICK_VALUE = {
  title: `싸게 만들어서가 아니라, 표준화해서 빠르게 제작하기 때문에 ${spoken(QUICK)}입니다.`,
  text: "검증된 표준 구조에 맞춰 제작하기 때문에 빠르고 합리적인 가격으로 제공합니다.",
} as const;

/** Quick Website vs 기존 홈페이지 맞춤 개선 — the one comparison owners get stuck on. */
export const QUICK_VS_IMPROVEMENT = {
  question: `새 홈페이지가 ${spoken(QUICK)}인데, 기존 홈페이지 개선은 왜 ${spoken(IMPROVEMENT)}인가요?`,
  quick: {
    name: "Quick Website",
    line: "검증된 구조에 맞춰 빠르게 제작",
    text: "검증된 표준 구조와 템플릿을 사용해 제작 과정을 표준화했습니다. 그래서 빠르고 합리적인 가격으로 제공할 수 있습니다.",
  },
  improvement: {
    name: "기존 홈페이지 맞춤 개선",
    line: "현재 홈페이지에 맞춰 직접 수정",
    text: "현재 사용 중인 기술, 디자인, URL, 콘텐츠, 페이지 구조를 유지하면서 업체마다 다른 문제를 직접 수정해야 하므로 맞춤 작업 범위가 커집니다.",
  },
} as const;

export const PRICING_FAQ: readonly { q: string; a: string }[] = [
  {
    q: `${spoken(INTEGRATION)}은 단순 위젯 설치비인가요?`,
    a: `아닙니다. 스크립트 한 줄을 넣는 비용이 아니라, 우리 업체에 BoostInterior를 처음 구축하는 기본 구축비입니다. 업체 정보와 상담 정보 초기 세팅, 공개된 기존 포트폴리오 전체 수집과 구조화, AI 시공사례 검색 연결, 상담 · 견적 문의 흐름 구성, 위젯 · 도메인 설정, QA까지 포함합니다.`,
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
    q: "기존 포트폴리오가 많아도 모두 등록하나요?",
    a: "네. 현재 홈페이지에 공개 중인 포트폴리오는 건수 제한 없이 전체를 초기 구축 대상으로 세팅합니다. 홈페이지에 없는 별도 자료까지 함께 정리해야 한다면 범위를 확인한 뒤 안내해드립니다.",
  },
  {
    q: QUICK_VS_IMPROVEMENT.question,
    a: `Quick Website는 ${QUICK_VS_IMPROVEMENT.quick.text} 기존 홈페이지 맞춤 개선은 ${QUICK_VS_IMPROVEMENT.improvement.text}`,
  },
  {
    q: "Quick Website와 Custom Website는 무엇이 다른가요?",
    a: `표준화와 맞춤의 차이입니다. Quick Website(${spoken(QUICK)})는 인테리어 업체에 맞게 검증된 표준 템플릿으로 빠르게 만드는 홈페이지로, 모바일 반응형, 기본 SEO 구조, 빠른 로딩, HTTPS(SSL), 포트폴리오 구성, 상담 · 견적 CTA를 기본으로 제공합니다. Custom Website(${spoken(CUSTOM)})는 브랜드, 정보구조, 주요 페이지를 업체에 맞춰 처음부터 설계합니다. ${COMMON_BUILD}은 두 방식 모두 동일하게 포함됩니다.`,
  },
  {
    q: "기존 홈페이지 개선에 기존 CMS 재개발도 포함되나요?",
    a: "기존 홈페이지의 CMS 자체 재개발은 기본 범위에 포함되지 않습니다. 특수 관리자 개발이나 CMS 개편이 필요한 경우 범위를 확인한 뒤 별도 안내드립니다. 상담 기록과 상담 요청을 확인하는 BoostInterior 관리 화면은 홈페이지 CMS와 별개이며, 모든 구축 방식에 기본으로 제공됩니다.",
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
    q: "3D Portfolio도 제공하나요?",
    a: "3D Portfolio는 현재 월 운영 플랜의 제공 기능에 포함되어 있지 않습니다. 준비되는 대로 초기 파트너(Founding Partner)에게 먼저 적용 · 사용 기회를 드릴 예정이며, 출시 일정은 확정되면 안내해드립니다.",
  },
  {
    q: "AI Portfolio Video는 몇 개까지 가능한가요?",
    a: "Growth 플랜부터 제공합니다. 업체를 운영하면서 새롭게 등록되는 실제 시공사례를 기준으로 건수 제한 없이 지원하며, 업체가 제공하는 실제 시공 자료로 제작합니다.",
  },
];
