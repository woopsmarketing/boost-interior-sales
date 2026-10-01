/**
 * BoostInterior pricing — the only prices this page shows (KRW). Two independent choices:
 * how the system is built (one-time setup) and how it is run (monthly plan).
 * Monthly only, and no VAT wording: the annual and VAT policies are not decided yet.
 */
export interface SetupOption {
  /** Same letter as the matching path in InstallPaths */
  key: "A" | "B" | "C";
  name: string;
  scope: string;
  price: number;
  summary: string;
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
  base?: string;
  features: readonly string[];
  note?: string;
}

export const SETUP_OPTIONS: readonly SetupOption[] = [
  {
    key: "A",
    name: "기존 홈페이지 연동",
    scope: "업체 전용 상담 시스템 구축",
    price: 700_000,
    summary: "현재 홈페이지를 그대로 활용하면서 BoostInterior 상담 시스템을 연결합니다.",
    includes: [
      "기존 홈페이지 기본 확인",
      "포트폴리오 · 시공사례 구조 파악",
      "업체 상담 기준 세팅",
      "시공사례 연결",
      "AI 상담 시스템 세팅",
      "상담 → 견적 문의 흐름 구성",
      "홈페이지 위젯 설치",
      "기본 QA",
    ],
  },
  {
    key: "B",
    name: "기존 홈페이지 개선",
    scope: "홈페이지 개선 + BoostInterior",
    price: 1_500_000,
    summary: "현재 사이트를 활용하되, 고객이 상담과 문의로 이어지기 어려운 부분까지 함께 개선합니다.",
    includes: [
      "기존 홈페이지 연동 전체",
      "기존 홈페이지 UX 확인",
      "상담 진입점 개선",
      "CTA 개선",
      "포트폴리오 → 상담 연결 개선",
      "필요한 화면 · 섹션 구조 수정",
      "기본 기술 상태 개선 (가능한 범위)",
      "BoostInterior 통합",
    ],
    note: "전체를 다시 만들어야 하는 경우에는 신규 홈페이지 구축으로 안내해드립니다.",
  },
  {
    key: "C",
    name: "신규 홈페이지 구축",
    scope: "홈페이지 제작 + BoostInterior",
    price: 3_000_000,
    summary: "인테리어 홈페이지와 AI 상담 시스템을 처음부터 하나의 고객 여정으로 구축합니다.",
    includes: [
      "신규 홈페이지 구축",
      "모바일 대응",
      "포트폴리오 구조",
      "상담 · 견적 CTA",
      "기본 SEO 구조",
      "HTTPS(SSL) 기반 배포",
      "BoostInterior 구축 · 연동",
      "시공사례 연결",
      "문의 전환 흐름",
    ],
    note: "추가 개발이나 특수 기능은 범위에 따라 별도로 협의합니다.",
  },
];

export const PLANS: readonly Plan[] = [
  {
    name: "Core",
    role: "시스템 사용",
    price: 88_000,
    summary: "BoostInterior의 핵심 AI 상담 기능을 사용합니다.",
    features: [
      "24시간 AI 상담",
      "업체 정보 기반 답변",
      "상담 전문지식 직접 관리 (관리자 기능)",
      "방문자의 공사 조건 이해",
      "관련 시공사례 추천",
      "사진 · 포트폴리오 연결",
      "상담 내용 기억",
      "견적 문의 수집",
      "상담 기록 확인",
      "기본 시스템 운영",
    ],
  },
  {
    name: "Growth",
    role: "고급 기능",
    price: 198_000,
    summary: "웹사이트 방문자를 더 깊게 이해하고, 포트폴리오 경험까지 강화합니다.",
    base: "Core",
    features: [
      "방문자 행동 분석",
      "방문 페이지 · 클릭 · 체류 · 이탈 흐름",
      "상담 시작 · 견적 문의 전환 흐름 분석",
      "3D Portfolio",
      "인터랙티브 공간 탐색",
      "3D Portfolio 프레젠테이션",
    ],
  },
  {
    name: "Managed",
    role: "사람이 함께 운영",
    price: 297_000,
    summary: "Growth 기능에 더해, BoostInterior 운영을 직접 관리해드립니다.",
    base: "Growth",
    features: [
      "월 1회 방문 · 상담 데이터 리뷰",
      "AI 상담 흐름 점검 및 개선",
      "자주 묻는 질문 · 응답 개선",
      "업체 전문 상담지식 업데이트 지원",
      "포트폴리오 업데이트 지원",
      "CTA · 상담 전환 동선 개선 제안",
      "월간 개선 포인트 정리",
      "우선 지원",
    ],
    note: "실제 작업 범위는 운영정책과 계약에 따라 정해집니다.",
  },
];

/** Setup and plan are chosen separately; these pairs only illustrate that. */
export const COMBO_EXAMPLES = [
  [SETUP_OPTIONS[0].name, PLANS[0].name],
  [SETUP_OPTIONS[2].name, PLANS[1].name],
] as const;

/** 700000 → "700,000" */
export const won = (value: number) => value.toLocaleString("en-US");
