import type { IconName } from "@/components/ui/Icon";
import { manwon, SETUP_OPTIONS } from "@/lib/pricing";

/**
 * Copy for the /pricing page that is not a price: what the 290,000원 setup actually does,
 * what a Quick Website is, and the questions an owner asks before paying. Prices and scope
 * lists come from lib/pricing.ts.
 */

const [INTEGRATION, QUICK, IMPROVEMENT] = SETUP_OPTIONS;

/** "29만원" / "120만원부터" — amounts inside sentences, read from the price list. */
const spoken = (option: (typeof SETUP_OPTIONS)[number]) => `${manwon(option.price)}만원${option.from ? "부터" : ""}`;

/** Why 기존 홈페이지 연동 is not "a widget install": said once, above the four things it produces. */
export const INTEGRATION_VALUE = {
  title: `${spoken(INTEGRATION)}은 단순한 위젯 설치비가 아닙니다.`,
  text: "현재 홈페이지의 업체 정보와 공개된 기존 시공사례를 BoostInterior가 실제 상담에서 활용할 수 있도록 수집 · 구조화하고, AI 검색과 상담 · 견적 흐름에 연결한 뒤 설치 · 검수까지 진행하는 업체 전용 AI 상담 시스템 초기 구축입니다.",
} as const;

/**
 * 기존 홈페이지 연동 in four steps: `text` is what shows first, `items` are the same 13 items as
 * SETUP_OPTIONS[0].includes, grouped by the step that produces them.
 */
export const INTEGRATION_GROUPS: readonly { icon: IconName; title: string; text: string; items: readonly string[] }[] = [
  {
    icon: "window",
    title: "홈페이지 · 업체 분석",
    text: "현재 홈페이지 구조와 업체 정보를 확인하고 초기 세팅합니다.",
    items: ["기존 홈페이지 구조 확인", "업체 기본정보 초기 세팅", "상담 전문정보 초기 세팅"],
  },
  {
    icon: "layers",
    title: "기존 포트폴리오 전체 구조화",
    text: "홈페이지에 공개된 기존 시공사례 전체를 수집해 AI가 검색할 수 있는 데이터로 정리합니다.",
    items: [
      "홈페이지에 공개된 기존 포트폴리오 전체 수집",
      "기존 시공사례 구조화",
      "지역 · 평형 · 공간 · 스타일 · 공사범위 검색 데이터 구성",
    ],
  },
  {
    icon: "chat",
    title: "AI 검색 · 상담 연결",
    text: "방문자의 조건에 맞는 실제 시공사례 검색 · 추천과 상담 · 견적 흐름을 연결합니다.",
    items: ["AI 시공사례 검색 연결", "실제 포트폴리오 추천 흐름 연결", "상담 → 견적 문의 흐름 구성"],
  },
  {
    icon: "shield",
    title: "설치 · 검수",
    text: "위젯, 도메인, 모바일, 상담 동작, 견적 흐름을 검수한 뒤 적용합니다.",
    items: ["BoostInterior 위젯 연결", "고객 도메인 연결 · 허용 설정", "모바일 포함 기본 동작 QA", "초기 데이터 검수"],
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
  { icon: "sliders", label: "CMS", text: "관리자 CMS" },
  { icon: "gallery", label: "Portfolio", text: "포트폴리오 구성" },
  { icon: "chat", label: "BoostInterior", text: "AI 상담 기본 연동" },
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
    q: `${spoken(INTEGRATION)}은 단순 설치비인가요?`,
    a: "아닙니다. 스크립트 한 줄을 넣는 비용이 아니라 업체 전용 상담 시스템을 처음 구축하는 비용입니다. 홈페이지 확인, 업체 정보와 상담 정보 초기 세팅, 공개된 기존 포트폴리오 전체 수집과 구조화, AI 시공사례 검색 연결, 견적 문의 흐름 구성, 위젯 · 도메인 설정, QA까지 포함합니다.",
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
    q: "Quick Website는 어떤 홈페이지인가요?",
    a: "인테리어 업체에 맞게 검증된 표준 템플릿으로 만드는 홈페이지입니다. 모바일 반응형, 기본 SEO 구조, 빠른 로딩, HTTPS(SSL), 포트폴리오 구성, 상담 · 견적 CTA, 관리자 CMS, BoostInterior 연동을 기본으로 제공합니다.",
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
