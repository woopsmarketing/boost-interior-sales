# BoostInterior Sales V2.3: 고객 언어 카피 · Quick Start · 인기상품 badge

`prompt` (BOOSTINTERIOR SALES V2.3 — CUSTOMER LANGUAGE COPY PASS · QUICK START + POPULAR BADGE · DELTA UPDATE ONLY)
결과 보고서. 배포 시각은 2026-10-02 16:55 KST.
[`BOOSTINTERIOR-SALES-V2-2-FINAL-PRICING-LOGIC-2026-10-02.md`](./BOOSTINTERIOR-SALES-V2-2-FINAL-PRICING-LOGIC-2026-10-02.md)
이후 작업이다.

재디자인이 아니다. 레이아웃, 토큰, 비교표, 토글 UX는 V2.2 그대로다. 바뀐 것은 세 가지다:
고객이 읽는 문구에서 웹 · 개발 용어를 걷어내고 고객이 얻는 결과로 다시 쓴 것, 상품명 두 개
(Quick Website → Quick Start, Custom Website → 맞춤 홈페이지 제작), Quick Start의 "인기상품" badge.

가격 숫자, VAT 문구, BoostInterior 기본 구축 논리, Founding Partner는 하나도 바뀌지 않았다.

---

## Report

```
TASK = CUSTOMER LANGUAGE COPY PASS

QUICK_START_NAME  = Quick Start
QUICK_START_BADGE = 인기상품
                    랜딩 가격 카드 / /pricing 비교표 헤더(820px 이하는 상품 선택 버튼) / /pricing Quick Start 상세 블록

QUICK_WEBSITE_CUSTOMER_LABEL = REMOVED   rendered text 0건 (랜딩 1 → 0, /pricing 11 → 0)
                               내부 id · anchor `quick-website`는 유지 (#quick-website 링크가 깨지지 않도록)
                               "Custom Website"도 같이 정리: → 맞춤 홈페이지 제작 (랜딩 1 → 0, /pricing 8 → 0)

TEMPLATE_CUSTOMER_COPY = REMOVED   "템플릿" 랜딩 1 → 0, /pricing 6 → 0. Template / template 0건
                         Quick Start 설명: "인테리어 업체에 필요한 기본 기능을 갖춘 홈페이지를 빠르게 제작합니다."

SEO_COPY        = "네이버·구글 노출을 위한 기본 설정" / 짧게 "네이버·구글 노출 기본 설정" / 표 행 이름 "검색 노출"
                  SEO 랜딩 2 → 0, /pricing 12 → 0. "상위노출" · "무조건" 0건
SECURITY_COPY   = "고객이 안심하고 접속할 수 있는 보안 연결" / 표 행 이름 "보안 연결"
                  HTTPS 7 → 0, SSL 6 → 0. "완벽한 보안" · "해킹" · "100%" 0건
MOBILE_COPY     = "휴대폰에서도 보기 편한 화면" / "휴대폰 · 태블릿에서도 보기 편한 화면" / 칩 "휴대폰에서도 편하게"
                  "반응형" 6 → 0, Responsive 1 → 0
SPEED_COPY      = "빠른 페이지 로딩" / "답답하지 않게 빠르게 열리는 화면"
                  "성능" 7 → 0. "최고 속도" 0건
CMS_COPY        = "CMS" 9 → 0. 두 개념을 다른 말로 부른다
                  BoostInterior 관리 화면 = 우리 시스템. 네 상품 공통 (6곳, V2.2와 같음)
                  홈페이지 관리 기능     = 고객 홈페이지의 글 · 사진을 고치는 기능. "별도 견적" 또는 "그대로 유지" 문맥으로만 (7곳)
                  Quick Start에 "홈페이지 관리" 칩은 넣지 않았다 — 그런 기능이 없다 (아래 Known issues 1)
UX_COPY         = "방문자가 필요한 정보를 쉽게 찾도록 화면과 동선 개선" / "보기 불편한 화면 개선" / "메뉴 · 화면 설계"
                  UX 랜딩 2 → 0, /pricing 9 → 0
CTA_COPY        = "상담 · 견적 문의로 이어지는 버튼과 동선" / 표 행 이름 "상담 · 견적 문의 동선"
                  CTA 랜딩 1 → 0, /pricing 13 → 0
CONVERSION_COPY = "상담에서 견적 문의까지 이어지는 흐름" / "견적 문의로 이어지는 흐름 확인"
                  "전환" /pricing 13 → 0, 랜딩 5 → 2 (남은 2건: Founding Partner 문구 1, "화면 자동 전환" aria-label 1)
PORTFOLIO_COPY  = 시공사례. "포트폴리오" /pricing 42 → 2, 랜딩 7 → 3
                  /pricing의 2건은 AI Portfolio Video의 설명 "…보여주는 영상 포트폴리오"(prompt §17 문구)
                  랜딩의 3건은 전부 Founding Partner 문구 (prompt §26 변경 금지)
                  AI Portfolio Video · 3D Portfolio는 기능 이름이라 유지

JARGON_AUDIT = prompt §29의 11개 단어 (SEO HTTPS SSL CMS UX CTA Responsive Performance Conversion Widget Integration)
               rendered text + alt + aria-label + meta 기준  / 0건,  /pricing 0건
               추가로 정리: 위젯 · 도메인 · 반응형 · 성능 · 스크립트 · 백엔드 · 인터랙션 · 정보구조 · 자연어 · 섹션 · URL · QA → 전부 0건

PRICING = UNCHANGED   290,000 / 490,000 / 1,200,000부터 / 2,500,000부터 · 88,000 / 198,000 / 297,000
VAT     = ALL PRICES INCLUDE VAT   (VAT_NOTICE 3줄 · FAQ · meta description — diff 없음)
COMMON_BOOSTINTERIOR_SCOPE = UNCHANGED   8개 묶음 · 14개 항목, A / B / C / D 공통. 항목의 말만 고객 언어로 바꿨다
FOUNDING_PARTNER = UNCHANGED   (lib/partner.ts, Partner.tsx, PricingClosing.tsx diff 없음)

TYPECHECK = PASS  (next typegen && tsc --noEmit, exit 0)
LINT      = PASS  (eslint, exit 0)
BUILD     = PASS  (next build, 10/10 static pages)
TEST      = PASS  (npm test, 11/11 — 3개 추가)
ACCESSIBILITY = PASS  124 체크, V2.2와 같은 스크립트 · 같은 기대값. "인기상품"은 DOM의 실제 텍스트
PRODUCTION_QA = PASS  public alias 기준. 반응형 48 상태 · 접근성 124 체크 · 링크 46개
                horizontal overflow 0 · console error 0 · failed request 0 · broken image 0 · broken link 0

GIT    = b76383d feat: rewrite BoostInterior pricing copy in customer language, add Quick Start badge → origin/main
         (force push 없음) + 이 보고서 커밋
VERCEL = READY (Production)  b76383d → GitHub status "Vercel = success"
         https://boost-interior-sales-4nztpsfp4-vnfm0580s-projects.vercel.app

HOME    = https://boost-interior-sales.vercel.app
PRICING = https://boost-interior-sales.vercel.app/pricing
```

---

## Changed files

| 파일 | 변경 |
| --- | --- |
| `lib/pricing.ts` | 상품명 2개, `SetupOption.badge` 추가(B만 "인기상품"), 네 상품의 요약 · 핵심 · 포함 항목 · 범위 밖 · 안내 문구, 공통 구축 항목의 말, 비교표 행 이름과 값, 월 플랜 카드 핵심, 플랜 비교표 행 |
| `lib/pricing-page.ts` | 공통 구축 문구, 29만원 문구와 7단계, Quick Start 칩 6개 · 대표 문구, "49만원 vs 120만원" 답, FAQ 5문항 |
| `components/ui/Badge.tsx` | 신규. 작은 파란 pill (22px, 12px bold, 흰 글자). animation 없음 |
| `components/landing/Pricing.tsx` | 구축 카드 상품명 옆에 badge |
| `components/pricing/SetupComparison.tsx` | 비교표 헤더와 모바일 상품 선택 버튼에 badge. 헤더의 링크는 상품명만 감싼다 (badge가 링크 이름에 섞이지 않도록) |
| `components/pricing/SetupSection.tsx` | 상품 상세 블록 제목 옆에 badge, 주석의 상품명 |
| `components/pricing/PlanSection.tsx` | AI Portfolio Video 설명, 플랜 섹션 한 줄 설명 |
| `components/pricing/PricingIntro.tsx` | eyebrow "BoostInterior Pricing" → "BoostInterior 가격" |
| `components/landing/InstallPaths.tsx` | B 한 줄 |
| `components/landing/HeroShowcase.tsx` | 1단계 이름 "자연어 상담" → "대화로 상담" (화면 글자와 aria-label) |
| `components/ui/Notice.tsx` | 주석만 |
| `tests/pricing.test.mjs` | 기대 문구 갱신, 테스트 3개 추가 |

새 라이브러리 없음. `lib/partner.ts`, `lib/site.ts`, `app/*`, `globals.css`는 건드리지 않았다. `/pricing` meta description은
가격표에서 상품명을 읽으므로 "Quick Start 49만원"으로 따라 바뀌었다. Next.js API를 쓰는 코드는 바꾸지 않았다.

---

## Before / after customer copy

### 상품명

| | V2.2 | V2.3 |
| --- | --- | --- |
| A | 기존 홈페이지 연동 | 그대로 |
| B | Quick Website | **Quick Start** + 인기상품 |
| C | 기존 홈페이지 맞춤 개선 | 그대로 |
| D | Custom Website | **맞춤 홈페이지 제작** |

### 상품 요약 (랜딩 카드, /pricing C · D 블록)

| | V2.2 | V2.3 |
| --- | --- | --- |
| A | 지금 홈페이지는 그대로 두고, 업체 전용 BoostInterior를 구축합니다. | 현재 홈페이지는 그대로 사용하면서, 우리 업체에 맞춘 BoostInterior AI 상담 시스템을 연결합니다. |
| B | 검증된 표준 구조로 새 홈페이지를 빠르게 제작하고, BoostInterior 기본 구축을 함께 진행합니다. | 새 홈페이지가 필요하고, 복잡한 제작 과정 없이 빠르게 시작하고 싶은 업체를 위한 상품입니다. |
| C | 현재 사이트를 유지하면서 디자인 · 포트폴리오 · 상담 전환 구조를 맞춤 개선하고, BoostInterior 기본 구축을 함께 진행합니다. | 현재 홈페이지를 살리면서 보기 불편한 화면과 시공사례 구성, 모바일 화면, 상담·견적 문의 동선을 업체에 맞게 개선합니다. |
| D | 브랜드와 콘텐츠 구조부터 새롭게 설계하는 맞춤 홈페이지를 제작하고, BoostInterior 기본 구축을 함께 진행합니다. | 업체의 브랜드와 원하는 구성에 맞춰 홈페이지를 처음부터 맞춤 제작합니다. |

요약에서 "BoostInterior 기본 구축을 함께 진행합니다"를 뺐다. 랜딩 카드는 첫 줄이 "BoostInterior 기본 구축 포함"이고,
/pricing 블록은 제목이 "○○ + BoostInterior 기본 구축"이라 같은 말이 바로 옆에 있다.

### 카드 핵심 (랜딩 구축 카드)

| | V2.2 | V2.3 |
| --- | --- | --- |
| A | 지금 홈페이지 그대로 사용 / 디자인 · 구조 변경 없음 | 지금 홈페이지 그대로 사용 / 디자인 · 구성 변경 없음 |
| B | 검증된 표준 템플릿으로 빠른 제작 / 모바일 · SEO · 속도 기본 제공 / 기존 공개 포트폴리오 이전 | 휴대폰에서도 보기 편한 화면 / 네이버·구글 노출 기본 설정 · 빠른 로딩 / 기존 공개 시공사례 이전 |
| C | 기존 사이트 진단 후 범위 확정 / UX · 모바일 · 상담 CTA 개선 / 포트폴리오 → 상담 연결 개선 | 기존 홈페이지 진단 후 범위 확정 / 보기 불편한 화면 · 모바일 화면 개선 / 시공사례 → 상담 연결 개선 |
| D | 브랜드 기반 맞춤 디자인 / 정보구조 · UX · 포트폴리오 구조 설계 / SEO 기반 구조 · 빠른 로딩 | 브랜드에 맞춘 맞춤 디자인 / 메뉴 · 화면 구성 맞춤 설계 / 네이버·구글 노출 기본 설정 · 빠른 로딩 |

### Quick Start 상세 블록

| | V2.2 | V2.3 |
| --- | --- | --- |
| 제목 | 싸게 만들어서가 아니라, 표준화해서 빠르게 제작하기 때문에 49만원입니다. | 필요한 기능을 갖춘 새 홈페이지와 BoostInterior를 빠르게 시작하세요. |
| 설명 | 검증된 표준 구조에 맞춰 제작하기 때문에 빠르고 합리적인 가격으로 제공합니다. | 새 홈페이지가 필요하고, 복잡한 제작 과정 없이 빠르게 시작하고 싶은 업체를 위한 상품입니다. 인테리어 업체에 필요한 기본 기능을 갖춘 홈페이지를 빠르게 제작합니다. |
| 칩 1 | Responsive — 모바일 반응형 | 휴대폰에서도 편하게 — 휴대폰 · 태블릿에서도 보기 편한 화면 |
| 칩 2 | SEO — 기본 SEO 구조 | 네이버·구글 노출 기본 설정 — 검색 노출에 필요한 기본 설정 |
| 칩 3 | Speed — 빠른 로딩 · 성능 기준 | 빠른 페이지 로딩 — 답답하지 않게 빠르게 열리는 화면 |
| 칩 4 | HTTPS — HTTPS(SSL) 적용 | 시공사례 구성 — 보기 좋게 구성 · 기존 공개 사례 이전 |
| 칩 5 | Portfolio — 포트폴리오 구성 | 상담·견적 문의 연결 — 상담과 견적 문의로 이어지는 동선 |
| 칩 6 | BoostInterior — 기본 구축 전체 포함 | BoostInterior AI 상담 — 기본 구축 전체 포함 |
| 안내 | 검증된 표준 구조에 맞춰 제작합니다. 브랜드와 구조부터 새로 설계하려면 Custom Website가 적합합니다. | 인테리어 업체에 맞춰 미리 준비된 기본 구성으로 제작해 빠르게 시작합니다. 브랜드와 구성부터 새로 설계하려면 맞춤 홈페이지 제작이 적합합니다. |

칩 6개는 prompt §11의 목록 그대로다. 그 목록에 보안이 없어서 HTTPS 칩이 빠졌고, "고객이 안심하고 접속할 수 있는 보안 연결"은
"전체 포함 범위" 11개 항목과 FAQ에 있다. 칩을 7개로 늘리면 3 × 2 격자가 깨진다.

"템플릿"은 쓰지 않지만 정해진 구성으로 만든다는 사실은 숨기지 않았다. 안내 문구와 "49만원 vs 120만원" 답에
"미리 준비된 기본 구성 / 화면과 기능을 미리 준비해 두었기 때문에"라고 적었다. 맞춤 제작으로 오해하게 두면 안 된다.

### 구축 비교표

| 행 (V2.2 → V2.3) | Quick Start 칸 (V2.2 → V2.3) |
| --- | --- |
| 홈페이지 | 표준 구조로 새로 제작 → 새로 빠르게 제작 |
| 디자인 방식 | 검증된 표준 템플릿 → 인테리어 업체에 맞춰 준비된 디자인 |
| 페이지 구조 → **페이지 구성** | 표준 페이지 · 섹션 구조 → 인테리어 업체에 필요한 기본 구성 |
| 포트폴리오 페이지 → **시공사례 페이지** | 표준 구성 · 기존 공개 포트폴리오 이전 → 보기 좋게 구성 · 기존 공개 시공사례 이전 |
| 상담 CTA · UX → **상담 · 견적 문의 동선** | 상담 · 견적 CTA 구성 → 상담 · 견적 문의 버튼과 동선 구성 |
| 모바일 · SEO · 속도 → **휴대폰 화면 · 검색 노출 · 속도** | 기본 제공 → 기본 설정 포함 |

"검색 노출 — 기본 제공"은 노출을 보장하는 말로 읽힐 수 있어서 값을 "기본 설정 포함"으로 바꿨다.
헤더 굵은 줄은 B만 바뀌었다: 표준 홈페이지 새로 제작 → 새 홈페이지 빠르게 제작.

펼친 표의 영역 이름: 홈페이지 디자인 · 구성 / 시공사례 페이지 / 상담 · 견적 문의 동선 /
휴대폰 화면 · 검색 노출 · 속도 / 보안 연결 · 점검 (V2.2: … 구조 / 포트폴리오 페이지 / 상담 CTA · 전환 동선 / 모바일 · SEO · 성능 / 운영 환경 · 검수).

### 포함 항목 (펼친 표, 상품별 "전체 포함 범위")

| V2.2 | V2.3 |
| --- | --- |
| 검증된 BoostInterior 홈페이지 템플릿 | 인테리어 업체에 필요한 기본 기능을 갖춘 새 홈페이지 |
| 인테리어 업체에 맞는 기본 페이지 · 섹션 구조 | 인테리어 업체에 맞는 기본 페이지 구성 |
| 포트폴리오 구성 | 시공사례를 보기 좋게 구성 |
| 상담 · 견적 CTA | 상담 · 견적 문의로 이어지는 버튼과 동선 |
| 모바일 반응형 | 휴대폰 · 태블릿에서도 보기 편한 화면 |
| 기본 SEO 구조 / SEO 기반 구조 | 네이버·구글 노출을 위한 기본 설정 |
| 빠른 로딩 · 성능 기준 | 빠른 페이지 로딩 |
| HTTPS(SSL) | 고객이 안심하고 접속할 수 있는 보안 연결 |
| 필요한 기본 외부 연동 | 필요한 기본 외부 서비스 연결 |
| 기본 QA / 전환 동선 QA | 오픈 전 기본 점검 / 상담에서 견적 문의까지 이어지는 흐름 점검 |
| UX 개선 | 방문자가 필요한 정보를 쉽게 찾도록 화면과 동선 개선 |
| 필요한 주요 섹션 개선 | 필요한 주요 화면 개선 |
| 모바일 개선 / 기본 기술 문제 개선 | 휴대폰 화면 개선 / 홈페이지의 기본적인 문제점 개선 |
| 정보구조 · UX 설계 | 방문자가 필요한 정보를 쉽게 찾는 메뉴 · 화면 설계 |
| 필요한 범위의 맞춤 인터랙션 | 필요한 범위의 맞춤 화면 효과 |
| 포트폴리오 구조 설계 | 시공사례 페이지 맞춤 설계 |
| 상담 · 견적 전환 흐름 | 상담에서 견적 문의까지 이어지는 흐름 설계 |
| (C 범위 밖) … 외부 시스템 연동 · 기존 홈페이지 CMS 재개발 | … 외부 서비스 연결 · 기존 홈페이지 관리 기능 재개발 |
| (D 범위 밖) … 고급 인터랙션 · 별도 백엔드 · 특수 CMS | … 고급 화면 효과 · 별도 시스템 개발 · 홈페이지 관리 기능 개발 |

항목 수는 그대로다 (A 1 / B 11 / C 9 / D 10).

### BoostInterior 기본 구축 (네 상품 공통)

| V2.2 | V2.3 |
| --- | --- |
| 기존 포트폴리오 전체 구조화 (칩) | 기존 시공사례 전체 구조화 |
| 현재 홈페이지에 공개된 기존 포트폴리오 전체 수집 | 현재 홈페이지에 공개된 기존 시공사례 전체 수집 |
| 지역 · 평형 · 공간 · 스타일 · 공사범위 검색 데이터 구성 | 지역 · 평형 · 공간 · 스타일 · 공사범위로 찾을 수 있게 정리 |
| 실제 포트폴리오 추천 흐름 연결 | 관련 시공사례 추천 흐름 연결 |
| 위젯 · 도메인 연결 (칩) | AI 상담창 · 홈페이지 주소 연결 |
| BoostInterior 위젯 연결 | BoostInterior AI 상담창 연결 |
| 고객 도메인 연결 · 허용 설정 | 홈페이지 주소에서 정상 작동하도록 연결 |
| 설치 · QA (칩) / 모바일 포함 기본 동작 QA | 설치 · 점검 / 휴대폰 포함 기본 동작 점검 |
| 포트폴리오 건수 제한 없음. | 시공사례 건수 제한 없음. |
| … 표준 홈페이지를 새로 만들지, 기존 사이트를 맞춤 개선할지, 완전히 맞춤 제작할지 … | … 새 홈페이지를 빠르게 만들지, 기존 홈페이지를 맞춤 개선할지, 처음부터 맞춤 제작할지 … |

8개 묶음 · 14개 항목, 네 상품 공통이라는 구조는 그대로다. 나머지 8개 항목은 글자 하나 바뀌지 않았다.

### 29만원 블록

| V2.2 | V2.3 |
| --- | --- |
| 29만원은 단순한 위젯 설치비가 아닙니다. | 29만원은 단순한 상담창 설치비가 아닙니다. |
| 스크립트 한 줄을 넣는 비용이 아니라 … | 홈페이지에 상담창 하나를 붙이는 비용이 아니라 … |
| 위젯, 도메인, 모바일, 상담 동작, 견적 흐름을 검수한 뒤 적용합니다. | AI 상담창, 홈페이지 주소 연결, 휴대폰 화면, 상담 동작, 견적 문의 흐름을 점검한 뒤 적용합니다. |
| 방문자의 자연어 조건을 이해하고 … | 방문자가 평소 말투로 말한 조건을 이해하고 … |
| … AI가 검색할 수 있는 데이터로 정리합니다. | … AI가 조건에 맞게 찾아줄 수 있도록 정리합니다. |
| 설치 및 QA | 설치 및 점검 |

### 월 플랜

| | V2.2 | V2.3 |
| --- | --- | --- |
| Core | 24시간 AI 상담 / 실제 시공사례 검색 · 추천 / 견적 문의 수집 · 상담 기록 확인 | 24시간 AI 상담 / 조건에 맞는 실제 시공사례 추천 / 견적 문의와 상담 기록 확인 |
| Growth | Core 전체 포함 / 방문자 행동 · 전환 흐름 분석 / AI Portfolio Video · 건수 제한 없음 | Core 전체 포함 / 방문자가 어디를 보고 어떻게 움직이는지 확인 / AI Portfolio Video (시공사진 영상) · 건수 제한 없음 |
| Growth 요약 | 방문자가 어떻게 움직이는지 분석하고, 시공사례를 영상 포트폴리오로 보여줍니다. | 방문자가 어디를 보고 어떻게 움직이는지 확인하고, 시공사진을 공간의 흐름에 따라 영상으로 보여줍니다. |
| Managed | Growth 전체 포함 / 월 1회 방문 · 상담 데이터 리뷰 / 응답 · 전환 동선 개선 지원 / 우선 지원 | Growth 전체 포함 / 매월 방문 · 상담 데이터 확인 / 상담 답변과 견적 문의 흐름 개선 지원 / 우선 지원 |

플랜 비교표 (22행 그대로, 7행의 말만 바뀜):

| V2.2 | V2.3 |
| --- | --- |
| 포트폴리오 (카테고리) / 관련 포트폴리오 추천 | 시공사례 / 관련 시공사례 추천 |
| 체류 · 이탈 흐름 분석 | 얼마나 머물고 어디에서 나가는지 분석 |
| 상담 시작 · 포트폴리오 확인 · 견적 문의 전환 흐름 | 상담 시작 → 시공사례 확인 → 견적 문의로 이어지는 흐름 확인 |
| Portfolio Video (카테고리) | AI Portfolio Video |
| 월 1회 방문 · 상담 데이터 리뷰 | 월 1회 방문 · 상담 데이터 함께 확인 |
| AI 상담 응답 흐름 점검 · 자주 묻는 질문 응답 개선 | AI 상담 답변 흐름 점검 · 자주 묻는 질문 답변 개선 |
| 전문 상담지식 · 포트폴리오 업데이트 지원 | 전문 상담지식 · 시공사례 업데이트 지원 |
| 상담 · 견적 CTA 흐름 점검 · 전환 동선 개선 제안 | 상담 · 견적 문의 버튼과 동선 점검 · 개선 제안 |

AI Portfolio Video 설명 블록: "시공사진을 공간의 흐름에 따라 보여주는 영상 포트폴리오입니다. 완성된 시공사진을 사진 목록으로만
두지 않고, 공간을 따라 이동하는 영상으로 보여줄 수 있도록 지원합니다." (첫 문장이 prompt §17의 설명)

### FAQ (11문항 그대로, 5문항 수정)

| V2.2 | V2.3 |
| --- | --- |
| 29만원은 단순 위젯 설치비인가요? | 29만원은 단순히 상담창을 설치하는 비용인가요? |
| 기존 포트폴리오가 많아도 모두 등록하나요? | 기존 시공사례가 많아도 모두 등록하나요? |
| Quick Website와 Custom Website는 무엇이 다른가요? — 표준화와 맞춤의 차이입니다. … 검증된 표준 템플릿 … 모바일 반응형, 기본 SEO 구조, 빠른 로딩, HTTPS(SSL), 포트폴리오 구성, 상담 · 견적 CTA … | Quick Start와 맞춤 홈페이지 제작은 무엇이 다른가요? — 빠르게 시작하는 것과 처음부터 맞춰 만드는 것의 차이입니다. … 휴대폰에서도 보기 편한 화면, 네이버·구글 노출을 위한 기본 설정, 빠른 페이지 로딩, 고객이 안심하고 접속할 수 있는 보안 연결, 시공사례 구성, 상담 · 견적 문의로 이어지는 버튼과 동선 … |
| 기존 홈페이지 개선에 기존 CMS 재개발도 포함되나요? | 기존 홈페이지 개선에 홈페이지 관리 기능을 새로 만드는 작업도 포함되나요? — 기존 홈페이지의 글과 사진을 직접 고치는 홈페이지 관리 기능을 새로 만들거나 바꾸는 작업은 기본 범위에 포함되지 않습니다. … BoostInterior 관리 화면은 홈페이지 관리 기능과 별개이며 … |
| AI Portfolio Video는 몇 개까지 가능한가요? — Growth 플랜부터 제공합니다. … | 답 첫 문장에 "AI Portfolio Video는 시공사진을 공간의 흐름에 따라 보여주는 영상 포트폴리오입니다." 추가 |

"새 홈페이지가 49만원인데 … 왜 120만원부터인가요?"는 질문은 그대로, 답의 Quick Start 부분이 위 "미리 준비해 두었기 때문에"
문장으로 바뀌었고 기존 홈페이지 쪽은 "현재 사용 중인 기술, 디자인, URL, 콘텐츠, 페이지 구조" → "현재 홈페이지의 제작 방식,
디자인, 주소, 내용, 페이지 구성"이다.

### 랜딩 (가격 요약 밖)

구조는 그대로다 (Hero / Founding Partner / Product Story / Demo / Video / Pricing / CTA). 가격 요약 밖에서 바뀐 문구는 두 곳이다.

- Hero 화면 미리보기 1단계: 자연어 상담 → 대화로 상담
- 구축 방식 4칸의 B: "검증된 표준 구조로 홈페이지와 BoostInterior를 함께 만듭니다." → "새 홈페이지와 BoostInterior를 빠르게 시작합니다."

---

## Jargon grep results

Production alias, 1440px. 접힌 토글 안의 글자, alt, aria-label, title, meta(title · description · og · twitter)까지 포함한 텍스트
(script · style 제외). 배포 전(V2.2, 6c9f17a)과 배포 후(b76383d)를 같은 스크립트로 셌다. 3글자 이하 영문은 단어 단위로 센다.

| 단어 | `/` | `/pricing` |
| --- | --- | --- |
| SEO | 2 → 0 | 12 → 0 |
| HTTPS | 0 → 0 | 7 → 0 |
| SSL | 0 → 0 | 6 → 0 |
| CMS | 0 → 0 | 9 → 0 |
| UX | 2 → 0 | 9 → 0 |
| CTA | 1 → 0 | 13 → 0 |
| Responsive | 0 → 0 | 1 → 0 |
| Performance · Conversion · Widget · Integration | 0 → 0 | 0 → 0 |
| 위젯 | 0 → 0 | 10 → 0 |
| 도메인 | 0 → 0 | 8 → 0 |
| 반응형 | 0 → 0 | 6 → 0 |
| 전환 | 5 → 2 | 13 → 0 |
| 성능 | 0 → 0 | 7 → 0 |
| 스크립트 · 백엔드 | 0 → 0 | 2 → 0 · 2 → 0 |
| 인터랙션 | 0 → 0 | 4 → 0 |
| 정보구조 | 1 → 0 | 5 → 0 |
| 자연어 | 2 → 0 | 1 → 0 |
| 섹션 | 0 → 0 | 6 → 0 |
| URL | 0 → 0 | 2 → 0 |
| QA | 0 → 0 | 11 → 0 |
| 포트폴리오 | 7 → 3 | 42 → 2 |
| 시공사례 | 8 → 11 | 19 → 57 |

남은 것과 그 이유:

- `/` "전환" 2건: "…포트폴리오 · 전환 기능 등 새로운 기능을 먼저 경험합니다"(Founding Partner),
  "화면 자동 전환 일시정지"(Hero 미리보기 버튼의 aria-label. 화면이 넘어간다는 뜻이고 Conversion이 아니다)
- `/` "포트폴리오" 3건: 전부 Founding Partner 혜택 설명
- `/pricing` "포트폴리오" 2건: AI Portfolio Video 설명의 "영상 포트폴리오" (설명 블록, FAQ)
- "Portfolio": `/` 5건, `/pricing` 14건. 전부 AI Portfolio Video(2 / 10), 3D Portfolio(2 / 3), 역할 태그 "분석 + Portfolio Video"(1 / 1)

### Template grep

| | `/` | `/pricing` |
| --- | --- | --- |
| 템플릿 | 1 → 0 | 6 → 0 |
| Template · template | 0 | 0 |

소스: `app` · `components` · `lib`에서 주석을 뺀 코드에 `템플릿|[Tt]emplate` 0건 (테스트로 고정).

### Quick Website grep

| | `/` | `/pricing` |
| --- | --- | --- |
| Quick Website | 1 → 0 | 11 → 0 |
| 빠른 홈페이지 제작 | 0 | 0 |
| Custom Website | 1 → 0 | 8 → 0 |
| Quick Start | 0 → 1 | 0 → 11 |
| 맞춤 홈페이지 제작 | 0 → 1 | 0 → 8 |

소스에 남은 것은 id 두 개(`quick-website`, `custom-website`)다. `/pricing#quick-website` anchor로 쓰이고 화면에는 보이지 않는다.
주소창에는 보인다.

### 가격 · VAT (불변 확인)

| 값 | `/` | `/pricing` |
| --- | --- | --- |
| 290,000 · 490,000 · 1,200,000 · 2,500,000 | 랜딩은 만원 표기: 29 / 49 / 120 / 250 각 1 | 6 / 4 / 4 / 3 |
| 88,000 · 198,000 · 297,000 | 1 / 1 / 1 | 7 / 2 / 2 |
| 700,000 · 1,500,000 · 3,000,000 · 150만 · 300만 | 0 | 0 |
| 부가세(VAT)가 포함 | 1 | 4 |
| VAT 별도 · 부가세 별도 · 별도 부과 | 0 | 0 |
| BoostInterior 관리 화면 | 0 | 6 |
| 홈페이지 관리 기능 | 0 | 7 |
| 상위노출 · 무조건 · 최고 속도 · 완벽한 보안 · 해킹 · 100% | 0 | 0 |
| BoostChat · 인테리어 광고 · 인테리어 마케팅 | 0 | 0 |

구축 금액 4개의 횟수는 V2.2 보고서와 같다. 88,000은 이번 스크립트가 meta description까지 세어서 4 → 7이다 (본문 4 + meta 3).

---

## 인기상품 badge locations

| 위치 | 보이는 폭 | 형태 |
| --- | --- | --- |
| 랜딩 "도입 비용" → 초기 구축 카드 B, 상품명 오른쪽 | 전 구간 | 6개 폭 모두 상품명과 같은 줄. 네 카드의 가격 줄 높이 동일 |
| /pricing 구축 비교표 헤더 B 열, 상품명 오른쪽 | 821px 이상 | 1440 · 1280은 같은 줄, 1024는 상품명 아래 줄. 네 열의 가격 줄 차이 최대 1px |
| /pricing 상품 선택 버튼 B | 820px 이하 | 상품명 아래 줄. 버튼 높이는 옆 버튼과 같고 가격은 아래에 맞춰짐 |
| /pricing Quick Start 상세 블록 제목 옆 | 전 구간 | 같은 줄 |

한 화면 폭에서 랜딩 1개, /pricing 2개다. FAQ, "49만원 vs 120만원" 블록, 펼친 표에는 넣지 않았다.

- 문구는 `lib/pricing.ts`의 `SETUP_OPTIONS[1].badge` 한 곳이다. 세 위치가 같은 값을 읽는다.
- 57 × 22px pill, 12px bold. 배경 `#155dfc`(accent), 글자 흰색 — 대비 약 5.2 : 1. animation 없음 (`animation-name: none`).
- 실제 텍스트 노드다. 제목(h3 / h4)과 링크 바깥에 있어서 상품의 접근성 이름은 "Quick Start" 그대로다.
- "빠른 시작 추천" · "추천 상품" · BEST · POPULAR 0건 (rendered text, 테스트로도 고정).

---

## Screenshots

Production alias에서 Playwright Chromium으로 찍었다. `assets/v2-3-customer-language/`.

| | 1440 | 390 |
| --- | --- | --- |
| `/pricing` BEFORE (V2.2, 6c9f17a) | [before-pricing-1440.jpg](./assets/v2-3-customer-language/before-pricing-1440.jpg) · 8,796px | [before-pricing-390.jpg](./assets/v2-3-customer-language/before-pricing-390.jpg) · 11,662px |
| `/pricing` AFTER 접힘 (b76383d) | [after-pricing-1440.jpg](./assets/v2-3-customer-language/after-pricing-1440.jpg) · 8,926px | [after-pricing-390.jpg](./assets/v2-3-customer-language/after-pricing-390.jpg) · 12,059px |
| `/pricing` AFTER 펼침 (토글 7개 전부) | [after-pricing-expanded-1440.jpg](./assets/v2-3-customer-language/after-pricing-expanded-1440.jpg) · 12,763px | [after-pricing-expanded-390.jpg](./assets/v2-3-customer-language/after-pricing-expanded-390.jpg) · 17,809px |
| `/` AFTER full page | [after-home-1440.jpg](./assets/v2-3-customer-language/after-home-1440.jpg) · 18,622px | [after-home-390.jpg](./assets/v2-3-customer-language/after-home-390.jpg) · 16,236px |
| 랜딩 가격 요약 BEFORE | [before-landing-pricing-1440.jpg](./assets/v2-3-customer-language/before-landing-pricing-1440.jpg) | [before-landing-pricing-390.jpg](./assets/v2-3-customer-language/before-landing-pricing-390.jpg) |
| 랜딩 가격 요약 AFTER | [after-landing-pricing-1440.jpg](./assets/v2-3-customer-language/after-landing-pricing-1440.jpg) | [after-landing-pricing-390.jpg](./assets/v2-3-customer-language/after-landing-pricing-390.jpg) |
| badge: 비교표 헤더 | [1440](./assets/v2-3-customer-language/badge-pricing-table-1440.png) · [1024](./assets/v2-3-customer-language/badge-pricing-table-1024.png) | [상품 선택 버튼](./assets/v2-3-customer-language/badge-pricing-selector-390.png) |
| badge: Quick Start 블록 | [badge-quick-start-block-1440.png](./assets/v2-3-customer-language/badge-quick-start-block-1440.png) | [badge-quick-start-block-390.png](./assets/v2-3-customer-language/badge-quick-start-block-390.png) |

`/` full page는 reduced motion으로 찍었다. 스토리 장면이 스크롤에 고정되어 움직이는 구간이라, 기본 상태로는 full-page 캡처에
한 장면만 찍힌다. 랜딩 full page의 BEFORE는 찍지 않았다 (가격 요약 구간의 before / after만 있다).

### 길이

| | V2.2 | V2.3 | 차이 |
| --- | --- | --- | --- |
| `/pricing` 1440 접힘 | 8,796 | 8,926 | +130 (+1.5%) |
| `/pricing` 390 접힘 | 11,662 | 12,059 | +397 (+3.4%) |
| `/pricing` 1440 펼침 | 12,480 | 12,763 | +283 |
| `/pricing` 390 펼침 | 17,345 | 17,809 | +464 |
| 랜딩 가격 요약 1440 | 1,904 | 1,664 | −240 |
| 랜딩 가격 요약 390 | 3,507 | 3,288 | −219 |

/pricing은 풀어 쓴 문구만큼 길어졌다. 390px에서 늘어난 곳은 Quick Start 칩(두 줄 제목), 비교 패널의 행 이름, 포함 항목 목록이다.
랜딩 카드는 요약에서 "BoostInterior 기본 구축을 함께 진행합니다"를 빼서 오히려 짧아졌다.

### Visual review (prompt §37)

스크린샷을 직접 보고 판단한 것이다. 실제 고객에게 물어본 결과가 아니다.

| 기준 | 판단 |
| --- | --- |
| 1. Quick Start가 빠르게 시작하는 상품으로 읽히는가 | 이름, 카드 요약("복잡한 제작 과정 없이 빠르게 시작하고 싶은 업체를 위한 상품"), 표 헤더("새 홈페이지 빠르게 제작"), 상세 블록 제목("…빠르게 시작하세요") 네 곳이 같은 말을 한다 |
| 2. badge가 자연스러운가 | 상품명 옆 작은 pill 하나. 카드 테두리 · 리본 · 강조 배경은 넣지 않았다. A B C D 원 표식보다 작고, 가격보다 눈에 띄지 않는다 |
| 3. "템플릿 상품" 느낌 | 템플릿 · 표준 · 검증된 0건. "싸게 만들어서가 아니라…"로 시작하던 제목도 없앴다. 정해진 구성이라는 사실은 안내 문구 한 줄과 FAQ 답에만 있다 |
| 4. SEO / SSL / CMS / UX를 몰라도 읽히는가 | 네 단어 모두 0건. 표의 행 이름이 "휴대폰 화면 · 검색 노출 · 속도", "상담 · 견적 문의 동선"이다 |
| 5. 가격 비교 UX | 비교표 8행 · 5열, 토글 7개, 모바일 상품 선택 그대로. 1440에서 헤더 네 열의 가격 줄이 같은 높이 |

---

## Responsive / production QA

Production alias(`https://boost-interior-sales.vercel.app`), Playwright Chromium, b76383d 배포 후 실행. V2.2와 같은 스크립트다.
`/pricing`은 폭마다 접힌 상태 → 토글 7개 전부 연 상태 → (820px 이하) 상품 4개를 차례로 선택 → 다시 접은 상태를 검사했다.

| Viewport | `/` | `/pricing` |
| --- | --- | --- |
| 1440 × 900 | pass | pass |
| 1280 × 800 | pass | pass |
| 1024 × 768 | pass | pass |
| 768 × 1024 | pass | pass |
| 390 × 844 | pass | pass |
| 375 × 667 | pass | pass |
| 1440 × 900 reduced motion | pass | pass |
| 390 × 844 reduced motion | pass | pass |

"pass"의 기준 (48개 상태 모두): horizontal overflow 0, 화면 밖으로 나간 요소 0, console error 0, failed request 0,
HTTP 4xx / 5xx 0, broken image 0, 보이는 금액이 전부 한 줄이고 잘리지 않음, 자기 칸보다 넓은 글자 0,
(데스크톱) 접었다 다시 접으면 높이가 처음과 같음.

링크: `/` 27개(in-page anchor 17), `/pricing` 19개(in-page anchor 6). anchor 대상 누락 0.
`/`, `/pricing`, 카카오 오픈채팅, 데모 사이트 모두 HTTP 200.

Quick Start + badge + 가격: 랜딩 카드는 6개 폭 모두 badge가 상품명과 같은 줄이고 가격 위치가 네 카드에서 같다.
375 · 390의 상품 선택 버튼은 badge가 상품명 아래 줄에 오고 "490,000원"은 한 줄이다.

### Accessibility

Production, 1440 · 390 · 각각 reduced motion — 124개 체크 통과. V2.2와 같은 스크립트, 같은 기대값(토글 7, 구축표 행 8)이다.

- 토글 7개: `<button type="button" aria-expanded>`, `aria-controls` 대상 존재, Enter · Space, focus 유지, 닫을 때 버튼 이동 0px
- 구축 비교표: caption, 열 머리 5개, 접힌 상태 행 머리 8개. 플랜 비교표 표시 칸 84개 전부에 "포함" / "미포함" 텍스트
- 모바일 상품 선택: `aria-pressed`, 키보드로 세 번째를 고르면 영역 이름이 "기존 홈페이지 맞춤 개선 구축 범위"
- badge: 텍스트가 DOM에 있고 제목 · 링크 이름에 섞이지 않는다

실제 iOS / Android 기기에서는 확인하지 않았다 (Playwright Chromium만).

### Tests

`npm test` 11개. 기존 8개는 기대 문구만 새 카피로 바꿨고(가격 · VAT · 공통 구축 14항목 · 22행 검사는 그대로), 3개를 추가했다.

9. 상품명 4개와 badge(B만 "인기상품"). 소스에 Quick Website · Custom Website · 다른 badge 문구 0건
10. 고객 언어: `app` · `components` · `lib` 코드에 SEO / HTTPS / SSL / CMS / UX / CTA / QA / Responsive / 반응형 / 템플릿 0건,
    가격 카피 두 파일에 위젯 · 도메인 · 전환 · 성능 · 스크립트 · 백엔드 · 인터랙션 · 정보구조 · 자연어 · 섹션 · URL 0건,
    "포트폴리오"는 "영상 포트폴리오"만, "Portfolio"는 기능 이름만
11. 보장 표현 0건: 상위노출 · 무조건 · 최고 속도 · 완벽한 보안 · 해킹 · 100%

8번은 "관리자 CMS" 검사에서 "상품 항목 · 핵심 · 요약에 홈페이지 관리가 판매 항목으로 들어오면 실패"로 바꿨다.

---

## Known issues / 소유자 결정이 필요한 것

1. **Quick Start에 "홈페이지 관리" 칩과 항목을 넣지 않았다** — prompt §5 · §11은 "실제 repository에서 홈페이지 관리 기능이
   존재하는 경우에만"이라고 했다. V2.2 감사 결과가 "없음"이다 (인테리어 홈페이지 템플릿에 고객용 관리 화면이 없고, 콘텐츠는
   저장소 파일이며 운영자가 다시 배포한다). 이번에는 제품 저장소를 다시 열어보지 않았고 V2.2 보고서의 결론을 그대로 따랐다.
   그 뒤에 기능이 생겼다면 `QUICK_FEATURES`와 B의 `includes`에 한 줄씩 넣으면 된다.
   Quick Start · 맞춤 홈페이지 제작을 산 고객이 납품 뒤에 글과 사진을 어떻게 바꾸는지는 여전히 페이지에 없다 (V2.2 Known issues 2).
2. **prompt에 없던 판단**
   - D의 이름 "Custom Website" → "맞춤 홈페이지 제작" (§1의 이름표를 따랐다).
   - "QA" → "점검". prompt §9는 "기본 QA"라고 적었지만 §28의 기준(개발을 모르는 대표가 바로 아는가)으로는 통과하지 못한다.
   - "체류 · 이탈 흐름 분석" → "얼마나 머물고 어디에서 나가는지 분석", "BoostInterior Pricing" → "BoostInterior 가격",
     랜딩 Hero의 "자연어 상담" → "대화로 상담". §29 목록에는 없는 단어들이다.
   - 보안 칩을 뺐다 (위 Quick Start 표 아래 설명).
   되돌리려면 `lib/pricing.ts` · `lib/pricing-page.ts`의 해당 문자열만 바꾸면 된다.
3. **"구조화"는 남겼다** — "기존 시공사례 전체 구조화", "수집 · 구조화합니다". prompt §9가 쓴 말이라 그대로 두고,
   바로 아래 항목을 "지역 · 평형 · 공간 · 스타일 · 공사범위로 찾을 수 있게 정리"로 풀어 썼다. 더 쉬운 말을 원하면 "정리"가 후보다.
4. **뜻을 몰라서 말만 바꾼 항목 2개** — "필요한 기본 외부 연동" → "필요한 기본 외부 서비스 연결"(B),
   "기본 기술 문제 개선" → "홈페이지의 기본적인 문제점 개선"(C). 원문이 무엇을 가리키는지 저장소에서 확인할 수 없어서
   구체적인 예를 지어내지 않았다. 여전히 막연하다. 실제 내용(예: 지도, 카카오톡 채널)을 알려주면 구체적으로 쓸 수 있다.
5. **Founding Partner에 남은 용어** — prompt §26에 따라 건드리지 않았다. "포트폴리오" 3건, "전환 기능" 1건, "Credit",
   영문 태그(Platform · 12 Months · Early Access · Partner Benefits)가 랜딩에 그대로 있다.
6. **그대로 둔 영어 · 외래어** — Core / Growth / Managed, Founding Partner, AI Portfolio Video, 3D Portfolio, Before / After,
   "사례 뷰어". 상품 · 기능 이름이거나 §29 목록 밖이다. Growth의 역할 태그는 "분석 + Portfolio Video" 그대로다.
7. **"시공사례"와 "시공 사례"가 섞여 있다** — 가격 영역은 전부 "시공사례"이고, 랜딩의 스토리 장면과 이미지 alt는
   "시공 사례"다 (랜딩 rendered text 기준 11 : 14). V2.2 이전부터 그랬고 이번에 맞추지 않았다.
8. **/pricing이 조금 길어졌다** — 390px 접힌 상태 11,662 → 12,059px (+3.4%). 풀어 쓴 말의 길이다.
9. **랜딩 C 카드 요약의 줄바꿈** — 1440px에서 "상담·" 뒤에서 줄이 바뀐다 ("상담· / 견적 문의 동선"). 읽는 데 지장은 없다.
10. **주소창의 `#quick-website`, `#custom-website`** — id를 바꾸면 기존에 공유된 링크가 깨져서 유지했다.
11. **`prompt` 파일** — 변경을 커밋하지 않았다 (이전 작업들과 같은 방식).
12. **QA 스크립트** — 반응형 / 접근성 / 링크 / 텍스트 감사 스크립트는 세션 scratchpad에 있고 저장소에는 넣지 않았다.
    저장소에 들어간 것은 `tests/pricing.test.mjs`와 스크린샷 17장(약 6MB)이다.
13. V2.2에서 넘어온 것은 그대로다: Growth의 방문자 분석을 고객이 볼 화면 미확인, 고객용 관리 화면에 시공사례 편집 없음,
    관리 화면 사이드바의 BoostChat 표기, AI Portfolio Video 샘플 없음, Quick Start 예시 사이트 없음, 실제 모바일 기기 미확인.
