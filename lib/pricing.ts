/**
 * BoostInterior pricing — the only prices this site shows (KRW), shared by the landing summary
 * and the /pricing page. Two independent choices: how the system is built (one-time setup)
 * and how it is run (monthly plan).
 * Monthly only, and no VAT wording: the annual and VAT policies are not decided yet.
 */
export interface SetupOption {
  /** Same letter as the matching path in InstallPaths */
  key: "A" | "B" | "C" | "D";
  /** Anchor of the option's detail block on /pricing */
  id: string;
  name: string;
  price: number;
  /** Price is a starting point ("부터"): the scope is confirmed per site */
  from?: boolean;
  /** What the money buys, in a few words */
  scope: string;
  summary: string;
  /** Who it is for */
  fit: string;
  /** Landing card: the two to four things that matter most */
  highlights: readonly string[];
  /** /pricing: the full scope */
  includes: readonly string[];
  note?: string;
}

export interface Plan {
  name: "Core" | "Growth" | "Managed";
  /** What sets the plan apart, in a few words: system → features → people */
  role: string;
  price: number;
  summary: string;
  /** The plan this one contains in full */
  base?: "Core" | "Growth";
  highlights: readonly string[];
  features: readonly string[];
  note?: string;
}

export const SETUP_OPTIONS: readonly SetupOption[] = [
  {
    key: "A",
    id: "integration",
    name: "기존 홈페이지 연동",
    price: 290_000,
    scope: "업체 전용 상담 시스템 초기 구축",
    summary: "지금 홈페이지는 그대로 두고, 업체 전용 BoostInterior 상담 시스템을 구축합니다.",
    fit: "이미 홈페이지가 있고, 디자인은 그대로 두고 싶은 업체",
    highlights: ["공개된 기존 포트폴리오 전체 수집 · 구조화", "AI 시공사례 검색 · 추천 연결", "상담 → 견적 문의 흐름 구성"],
    includes: [
      "기존 홈페이지 구조 확인",
      "업체 기본정보 초기 세팅",
      "상담 전문정보 초기 세팅",
      "홈페이지에 공개된 기존 포트폴리오 전체 수집",
      "기존 시공사례 구조화",
      "지역 · 평형 · 공간 · 스타일 · 공사범위 검색 데이터 구성",
      "AI 시공사례 검색 연결",
      "실제 포트폴리오 추천 흐름 연결",
      "상담 → 견적 문의 흐름 구성",
      "BoostInterior 위젯 연결",
      "고객 도메인 연결 · 허용 설정",
      "모바일 포함 기본 동작 QA",
      "초기 데이터 검수",
    ],
  },
  {
    key: "B",
    id: "quick-website",
    name: "Quick Website",
    price: 490_000,
    scope: "표준 구조 홈페이지 + BoostInterior",
    summary: "검증된 표준 구조로 빠르게 새 홈페이지를 제작하고 BoostInterior까지 함께 연결합니다.",
    fit: "기존 홈페이지를 크게 손보는 것보다, 빠르고 합리적으로 새 사이트를 만들고 싶은 업체",
    highlights: ["검증된 표준 템플릿으로 빠른 제작", "모바일 · SEO · 속도 · CMS 기본 제공", "BoostInterior 기본 연동"],
    includes: [
      "검증된 BoostInterior 홈페이지 템플릿",
      "인테리어 업체에 맞는 기본 페이지 · 섹션 구조",
      "모바일 반응형",
      "기본 SEO 구조",
      "빠른 로딩 · 성능 기준",
      "HTTPS(SSL)",
      "포트폴리오 구성",
      "상담 · 견적 CTA",
      "BoostInterior 기본 연동",
      "관리자 CMS",
      "업체 기본정보 세팅",
      "기존 공개 포트폴리오 이전",
      "필요한 기본 외부 연동",
      "기본 QA",
    ],
    note: "검증된 표준 구조에 맞춰 제작합니다. 브랜드와 구조부터 새로 설계하려면 Custom Website가 적합합니다.",
  },
  {
    key: "C",
    id: "improvement",
    name: "기존 홈페이지 맞춤 개선",
    price: 1_500_000,
    from: true,
    scope: "기존 홈페이지 개선 + BoostInterior",
    summary: "현재 사이트를 유지하면서 디자인 · 포트폴리오 · 상담 전환 구조를 맞춤 개선합니다.",
    fit: "현재 홈페이지를 버리고 싶지는 않지만, 디자인과 상담 전환 구조는 제대로 개선하고 싶은 업체",
    highlights: ["기존 사이트 진단 후 범위 확정", "UX · 모바일 · 상담 CTA 개선", "BoostInterior 통합"],
    includes: [
      "기존 사이트 진단",
      "기존 디자인 · 구조 중 유지 가능한 범위 확인",
      "UX 개선",
      "모바일 개선",
      "상담 CTA 개선",
      "포트폴리오 → 상담 연결 개선",
      "필요한 주요 섹션 개선",
      "기본 기술 문제 개선",
      "BoostInterior 통합",
      "기존 포트폴리오 구조화",
      "전환 동선 QA",
    ],
    note: "작업 범위에 따라 비용이 달라집니다. 사이트를 진단한 뒤 범위와 비용을 먼저 안내해드립니다.",
  },
  {
    key: "D",
    id: "custom-website",
    name: "Custom Website",
    price: 3_000_000,
    from: true,
    scope: "맞춤 홈페이지 + BoostInterior",
    summary: "브랜드와 콘텐츠 구조부터 새롭게 설계하는 맞춤 홈페이지 + BoostInterior 구축입니다.",
    fit: "브랜드부터 콘텐츠 구조까지 완전히 맞춰 제작하고 싶은 업체",
    highlights: ["브랜드 기반 맞춤 디자인", "정보구조 · UX · 포트폴리오 구조 설계", "CMS · SEO · BoostInterior 포함"],
    includes: [
      "고객 브랜드 기반 디자인",
      "정보구조 · UX 설계",
      "주요 페이지 맞춤 구성",
      "포트폴리오 구조 설계",
      "모바일 반응형",
      "SEO 기반 구조",
      "빠른 로딩 · 성능 기준",
      "HTTPS(SSL)",
      "관리자 CMS",
      "BoostInterior 구축 · 연동",
      "상담 · 견적 전환 흐름",
      "필요한 범위의 맞춤 인터랙션",
    ],
    note: "추가 특수 기능은 범위에 따라 별도로 협의합니다.",
  },
];

export const PLANS: readonly Plan[] = [
  {
    name: "Core",
    role: "시스템 사용",
    price: 88_000,
    summary: "AI 상담 시스템의 핵심 기능을 사용합니다.",
    highlights: ["24시간 AI 상담", "실제 시공사례 검색 · 추천", "견적 문의 수집 · 상담 기록 확인"],
    features: [
      "24시간 AI 상담",
      "업체 정보 기반 답변",
      "상담 전문지식 관리 기능",
      "방문자의 공사 조건 이해",
      "실제 시공사례 검색",
      "관련 포트폴리오 추천",
      "사진 · 시공사례 연결",
      "상담 맥락 유지",
      "견적 문의 수집",
      "상담 기록 확인",
      "기본 시스템 운영",
    ],
  },
  {
    name: "Growth",
    role: "성장 기능",
    price: 198_000,
    summary: "방문자가 어떻게 움직이는지 분석하고, 시공사례를 영상 포트폴리오로 보여줍니다.",
    base: "Core",
    highlights: ["방문자 행동 · 전환 흐름 분석", "AI Portfolio Video · 건수 제한 없음"],
    features: [
      "방문자 행동 분석",
      "방문 페이지 분석",
      "주요 클릭 분석",
      "체류 · 이탈 흐름 분석",
      "상담 시작 분석",
      "포트폴리오 확인 흐름",
      "견적 문의 전환 흐름",
      "AI Portfolio Video 제작 지원 · 건수 제한 없음",
    ],
    note: "AI Portfolio Video는 업체가 제공하는 실제 시공 자료 기준입니다.",
  },
  {
    name: "Managed",
    role: "사람이 함께 운영",
    price: 297_000,
    summary: "기능만 사용하는 것이 아니라, 매달 실제 데이터를 함께 보면서 개선합니다.",
    base: "Growth",
    highlights: ["월 1회 방문 · 상담 데이터 리뷰", "응답 · 전환 동선 개선 지원", "우선 지원"],
    features: [
      "월 1회 방문 · 상담 데이터 리뷰",
      "AI 상담 응답 흐름 점검",
      "자주 묻는 질문 · 응답 개선",
      "전문 상담지식 업데이트 지원",
      "포트폴리오 업데이트 지원",
      "상담 · 견적 CTA 흐름 점검",
      "전환 동선 개선 제안",
      "월간 개선 포인트 정리",
      "우선 지원",
    ],
    note: "실제 작업 범위는 계약 및 운영정책에 따라 정해집니다.",
  },
];

/** Which plans carry a row, in PLANS order: Core, Growth, Managed. */
type Included = readonly [boolean, boolean, boolean];
const ALL: Included = [true, true, true];
const GROWTH_UP: Included = [false, true, true];
const MANAGED_ONLY: Included = [false, false, true];

/** /pricing comparison: what each monthly plan carries, grouped by what the owner cares about. */
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
      { label: "AI 상담 응답 흐름 점검 · 응답 개선", plans: MANAGED_ONLY },
      { label: "전문 상담지식 · 포트폴리오 업데이트 지원", plans: MANAGED_ONLY },
      { label: "상담 · 견적 CTA 흐름 점검 · 전환 동선 개선 제안", plans: MANAGED_ONLY },
      { label: "월간 개선 포인트 정리", plans: MANAGED_ONLY },
      { label: "우선 지원", plans: MANAGED_ONLY },
    ],
  },
];

/** 290000 → "290,000" */
export const won = (value: number) => value.toLocaleString("en-US");

/** 290000 → "29" (만원). Every price here is a whole number of 만원. */
export const manwon = (value: number) => won(value / 10_000);
