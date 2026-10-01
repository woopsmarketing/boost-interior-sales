# BoostInterior Sales V2.2: 상품 논리 · VAT · CMS 용어 · 월 카드 정리

`prompt` (BOOSTINTERIOR SALES V2.2 — FINAL PRODUCT LOGIC ALIGNMENT · COMMON BOOSTINTERIOR BUILD + VAT + CMS
CLARIFICATION · MONTHLY CARD SIMPLIFICATION · DELTA UPDATE ONLY) 결과 보고서. 배포 시각은 2026-10-02 02:00 KST.
[`BOOSTINTERIOR-SALES-V2-1-PRICING-SCANABILITY-2026-10-01.md`](./BOOSTINTERIOR-SALES-V2-1-PRICING-SCANABILITY-2026-10-01.md)
이후 작업이다.

재디자인이 아니다. 토큰, 카드, 타이포, 비교표, 토글 UX는 V2.1 그대로다. 바뀐 것은 다섯 가지다:
BoostInterior 기본 구축을 네 상품 공통으로 한 번만 정의, 구축 비교의 기준을 홈페이지 작업으로 변경,
"관리자 CMS" 표현 정리, 모든 가격의 VAT 포함 명시, 월 플랜 카드 축약.

가격 숫자는 하나도 바뀌지 않았다.

---

## Report

```
TASK = FINAL PRICING / PRODUCT LOGIC ALIGNMENT

SETUP_PRICING   = 290000 / 490000 / 1200000+ / 2500000+   (변경 없음)
MONTHLY_PRICING = 88000 / 198000 / 297000                 (변경 없음)

VAT_POLICY = ALL CUSTOMER-FACING PRICES INCLUDE VAT
             "모든 표시 가격은 부가세(VAT)가 포함된 최종 금액입니다."  랜딩 1회 · /pricing 1회
             "모든 구축비는 부가세(VAT)가 포함된 최종 금액입니다."      /pricing 구축 비교표 아래
             "월 이용료 역시 부가세(VAT)가 포함된 금액입니다."          /pricing 월 플랜 카드 아래
             + FAQ 1문항 + /pricing meta description. "VAT 별도" / "부가세 별도" 0건

COMMON_BOOSTINTERIOR_SCOPE = 8개 묶음 · 14개 항목 (lib/pricing.ts)
    AI 상담                       AI 상담 흐름 구성
    전문 상담지식 세팅            업체 기본정보 초기 세팅 / 상담 전문정보 초기 세팅
    기존 포트폴리오 전체 구조화   현재 홈페이지에 공개된 기존 포트폴리오 전체 수집 / 기존 시공사례 구조화 /
                                  지역 · 평형 · 공간 · 스타일 · 공사범위 검색 데이터 구성
    시공사례 검색 · 추천          AI 시공사례 검색 연결 / 실제 포트폴리오 추천 흐름 연결
    견적 문의 흐름                상담 → 견적 문의 흐름 구성
    BoostInterior 관리 화면       BoostInterior 관리 화면 연결 (상담 기록 · 상담 요청 확인, 상담 자료 관리)
    위젯 · 도메인 연결            BoostInterior 위젯 연결 / 고객 도메인 연결 · 허용 설정
    설치 · QA                     모바일 포함 기본 동작 QA / 초기 데이터 검수

COMMON_SCOPE_APPLIES_TO = A / B / C / D
                          상품 데이터에는 BoostInterior 항목이 없다. 공통 범위 하나를 네 상품이 같이 쓴다

SETUP_PRICE_DIFFERENCE = WEBSITE WORK SCOPE
                         A 지금 홈페이지 그대로 사용 / B 표준 홈페이지 새로 제작 /
                         C 지금 홈페이지 맞춤 개선 / D 완전 맞춤 홈페이지 새로 제작   (각각 "+ BoostInterior 기본 구축")

WEBSITE_CMS_STATUS = NOT IMPLEMENTED
                     인테리어 홈페이지 템플릿(interior-01)에 고객용 콘텐츠 관리 화면이 없다.
                     콘텐츠는 저장소의 JSON이고 운영자가 CLI로 빌드 · 배포한다. 설계 문서에 "Admin UI / CMS"는 LATER.
                     → "관리자 CMS" 판매 문구 전부 삭제 (prompt §16 OPTION 2)

BOOSTINTERIOR_ADMIN_STATUS = IMPLEMENTED (고객용 관리 화면, /admin/[tenantSlug])
                             홈 / 상담 / 상담 요청 / 상담 자료 / AI 직원 / 공유·설치 / 요금제·사용량 / 설정
                             없는 것: 포트폴리오 편집, 방문자 분석 화면, 영상 관련 화면
                             → 공통 구축 범위에 "BoostInterior 관리 화면"으로 표시, 설명은 구현된 기능만

CMS_TERMINOLOGY = 두 개념을 분리
                  "BoostInterior 관리 화면" = 우리 시스템. 네 상품 공통
                  "CMS" = 고객 홈페이지의 관리 시스템. 페이지에서 이 뜻으로만 쓴다 (7곳, 전부 "별도 견적" 또는 "그대로 유지" 문맥)
                  "관리자 CMS" / "BoostChat CMS" 0건

CORE_CARD    = 핵심 기능 · 월 88,000원 · "BoostInterior의 핵심 기능을 사용합니다."
               24시간 AI 상담 / 실제 시공사례 검색 · 추천 / 견적 문의 수집 · 상담 기록 확인
GROWTH_CARD  = 분석 + Portfolio Video · 월 198,000원
               Core 전체 포함 / 방문자 행동 · 전환 흐름 분석 / AI Portfolio Video · 건수 제한 없음
MANAGED_CARD = 사람이 함께 운영 · 월 297,000원
               Growth 전체 포함 / 월 1회 방문 · 상담 데이터 리뷰 / 응답 · 전환 동선 개선 지원 / 우선 지원
               (카드당 기능 목록 9–11행 → 3–4행. BEST / POPULAR / 추천 badge 없음)

MONTHLY_COMPARISON = KEPT  접힘 6행 / 펼침 6개 카테고리 22행. 카드 바로 아래로 이동, 카드 → "전체 기능 비교 ↓" 링크
                     카드에서 뺀 기능은 전부 펼친 비교표에 있다 (테스트로 고정)

FOUNDING_PARTNER   = UNCHANGED   (lib/partner.ts, Partner.tsx, PricingClosing.tsx diff 없음)
INTERIOR_MARKETING = NOT ADDED   ("인테리어 광고" / "인테리어 마케팅" production 0건)

TYPECHECK = PASS  (next typegen && tsc --noEmit, exit 0)
LINT      = PASS  (eslint, exit 0)
BUILD     = PASS  (next build, 10/10 static pages)
TEST      = PASS  (npm test, 8/8 — 이번에 추가)

DESKTOP_QA     = PASS  1440×900 · 1280×800 · 1024×768
MOBILE_QA      = PASS  768×1024 · 390×844 · 375×667
REDUCED_MOTION = PASS  1440 · 390
ACCESSIBILITY  = PASS  124 체크 (토글 7개, 키보드, aria-expanded / aria-controls, 표 caption / scope, 포함 · 미포함 텍스트)
PRODUCTION_QA  = PASS  public alias 기준. 반응형 48 상태 · 접근성 124 체크 · 링크 46개

GIT    = f4c2f04 feat: align BoostInterior pricing and common setup scope → origin/main (force push 없음)
         + 이 보고서 커밋
VERCEL = READY (Production)  f4c2f04 → GitHub status "Vercel = success"
         https://boost-interior-sales-m1494qtbt-vnfm0580s-projects.vercel.app

HOME    = https://boost-interior-sales.vercel.app
PRICING = https://boost-interior-sales.vercel.app/pricing
```

---

## Changed files

| 파일 | 변경 |
| --- | --- |
| `lib/pricing.ts` | `VAT_NOTICE`, `COMMON_BUILD`, `COMMON_BOOSTINTERIOR_SCOPE` 추가. 상품의 `includes`를 홈페이지 작업만 남김. 구축 비교 8행. 플랜에서 `features` · `accents` 제거 |
| `lib/pricing-page.ts` | 공통 구축 문구(`COMMON_SCOPE`), 29만원 문구, Quick Website 기능 6개, FAQ 8 → 11문항 |
| `lib/site.ts` | `/pricing` meta description을 가격표에서 읽고 "모든 가격은 부가세(VAT) 포함" 추가. 비교표 anchor |
| `components/pricing/CommonScope.tsx` | 신규. 공통 구축 영역 (칩 8개 + 포트폴리오 정책 + 14개 항목 토글) |
| `components/ui/Notice.tsx` | 신규. ✓ 안내 한 줄 (VAT, 포트폴리오 정책). 기존 포트폴리오 callout의 스타일을 컴포넌트로 뺀 것 |
| `components/pricing/SetupComparison.tsx` | 헤더를 "홈페이지 작업 + BoostInterior 기본 구축"으로. 펼친 표에 공통 구축 행(4칸 병합) |
| `components/pricing/SetupSection.tsx` | 공통 영역을 비교표 앞에 배치. 상품별 상세는 "기본 구축 전체 포함" 한 줄 + 홈페이지 작업 |
| `components/pricing/PlanSection.tsx` | 카드에서 칩과 긴 목록 제거. VAT 문구, "전체 기능 비교 ↓". 비교표를 카드 바로 아래로 |
| `components/pricing/PlanComparison.tsx` | anchor, 안내 문장 한 줄 |
| `components/pricing/PricingIntro.tsx` | "비용은 두 가지로 나뉩니다" 아래 VAT 안내 |
| `components/landing/Pricing.tsx` | VAT 안내 1회, 초기 구축 한 줄, 카드 첫 줄 "BoostInterior 기본 구축 포함" |
| `components/landing/InstallPaths.tsx` | A · C 문구 2줄 (아래 "랜딩" 참고) |
| `components/ui/Icon.tsx` | 아이콘 3개 (book, form, lock) |
| `tests/pricing.test.mjs`, `package.json` | 신규 회귀 테스트, `npm test` |

새 라이브러리 없음. `lib/partner.ts`, `app/*`, `globals.css`는 건드리지 않았다.

---

## Common BoostInterior data source

V2.1에서는 상품마다 `includes.system`에 BoostInterior 항목을 따로 적었다 (A 6개, B 3개, C 2개, D 2개). 가장 싼 상품의
BoostInterior 범위가 가장 넓어 보였다. V2.2는 이렇게 바꿨다.

- `COMMON_BOOSTINTERIOR_SCOPE` (lib/pricing.ts): 8개 묶음 · 14개 항목. 한 곳에만 있다.
- `SETUP_OPTIONS[n].includes`: 홈페이지 작업만 남겼다. BoostInterior 항목은 한 줄도 없다.
  A 1개 / B 11개 / C 9개 / D 10개. 영역은 홈페이지 디자인 · 구조 / 포트폴리오 페이지 / 상담 CTA · 전환 동선 /
  모바일 · SEO · 성능 / 운영 환경 · 검수.
- `SetupOption.website`: 그 상품이 홈페이지를 어떻게 처리하는지. 화면의 "○○ + BoostInterior 기본 구축"은 이 값과
  `COMMON_BUILD`를 합쳐서 그린다.

상품별로 다르게 적을 자리가 없으므로 네 상품의 BoostInterior 범위가 다시 어긋날 수 없다. 테스트가 이것을 고정한다:
상품 항목에 공통 항목이나 "BoostInterior 연동 / 통합 / 구축"이 들어오면 실패한다.

14개 항목의 출처: 12개는 V2.1에서 A에 적혀 있던 문구 그대로다. "AI 상담 흐름 구성"과 "BoostInterior 관리 화면 연결"
2개는 prompt §5의 8번 · 12번이다. 관리 화면 항목의 괄호 설명(상담 기록 · 상담 요청 확인, 상담 자료 관리)은
아래 감사에서 실제로 확인한 기능만 적었다.

V2.1의 A 항목 중 "기존 홈페이지 구조 확인"은 공통 목록에 없어서 A의 홈페이지 작업 1개로 남겼다.

### 화면

`/pricing` 초기 구축 섹션, 비교표 바로 위:

- A B C D 표식 + "네 가지 구축 방식 공통"
- "어떤 구축 방식을 선택해도 BoostInterior 기본 구축은 동일하게 포함됩니다."
- "가격 차이는 AI 상담 기능의 차이가 아니라, 현재 홈페이지를 그대로 사용할지, 표준 홈페이지를 새로 만들지,
  기존 사이트를 맞춤 개선할지, 완전히 맞춤 제작할지에 따라 결정됩니다."
- 칩 8개 (아이콘 + 묶음 이름)
- 포트폴리오 정책: "포트폴리오 건수 제한 없음. 현재 홈페이지에 공개된 기존 포트폴리오 전체를 초기 구축 대상으로
  수집 · 구조화합니다. 홈페이지에 없는 별도 자료의 정리는 범위를 확인한 뒤 안내해드립니다."
  V2.1에서는 A 블록 안에 있었다. 네 상품 공통 정책이라 여기로 옮겼다.
- 토글 "기본 구축 항목 14개 보기": 8개 묶음별 체크리스트

14개 항목은 이 토글 한 곳에만 있다. 상품별 상세에는 "BoostInterior 기본 구축 전체 포함" 한 줄만 있다.

---

## Setup comparison changes

| | V2.1 | V2.2 |
| --- | --- | --- |
| 헤더의 한 줄 정의 | "지금 홈페이지 그대로 + BoostInterior 업체 전용 구축" 등 상품마다 다른 문장 | 홈페이지 작업(굵게) + "+ BoostInterior 기본 구축"(네 칸 동일) |
| BoostInterior 행 | 업체 전용 구축 / 기본 연동 / 통합 / 구축 · 연동 | **BoostInterior 기본 구축**: ✓ 동일하게 포함 × 4 |
| 포트폴리오 행 | 수집 · 구조화 / 이전 / 구조화 / 구조 설계 (BoostInterior 작업과 섞임) | **포트폴리오 페이지**: 기존 페이지 그대로 / 표준 구성 · 기존 공개 포트폴리오 이전 / 포트폴리오 → 상담 연결 개선 / 포트폴리오 구조 설계 |
| 관리자 CMS 행 | 기존 환경 기준 / 기본 제공 / 기존 환경 기준 / 기본 제공 | 삭제 |
| 새 행 | | **페이지 구조**, **상담 CTA · UX** |
| 접힌 행 수 | 7 | 8 |

접힌 8행: BoostInterior 기본 구축 / 홈페이지 / 디자인 방식 / 페이지 구조 / 포트폴리오 페이지 / 상담 CTA · UX /
모바일 · SEO · 속도 / 추가 페이지 · 특수 기능. 첫 행만 네 칸이 같고, 나머지 7행이 홈페이지 작업 차이다.

펼친 "전체 구축 범위": 첫 행이 BoostInterior 기본 구축이고 A–D 네 칸을 하나로 합쳤다
("네 가지 구축 방식에 동일하게 포함 · 항목 14개" + 묶음 이름 8개). 그 아래 5개 영역은 상품별 홈페이지 작업 항목,
마지막은 기본 범위 밖의 작업이다.

값은 각 상품의 기존 포함 항목 문구에서 가져왔다. A의 "기존 구조 유지", "기존 페이지 그대로", "기존 화면 그대로"는
"홈페이지를 건드리지 않는다"는 사실을 행마다 적은 것이다.

820px 이하의 상품 선택 UI, 표 caption, scope, 토글 동작은 V2.1 그대로다.

---

## CMS audit evidence

sales 저장소에는 제품 코드가 없어서 실제 제품 저장소를 읽었다. 추측으로 채운 항목은 없다.

### BoostInterior 관리 화면: 있음

`/Users/woops/projects/boost-chat-main` (90a2087, 2026-09-29)

- 고객용 관리 화면 경로: `src/app/admin/[tenantSlug]/` — `ai`, `billing`, `conversations`, `install`, `integrations`,
  `knowledge`, `leads`, `plan`, `preview`, `settings`
- 메뉴 (`src/components/admin/workspace/AdminSidebar.tsx:26-36`):
  홈 / 상담 / 상담 요청 / 상담 자료 / AI 직원 / 공유·설치 / 연동 / 요금제·사용량 / 설정
- 제품 안에서 부르는 이름이 "관리 화면"이다 (`src/app/page.tsx:185,252`). sales 랜딩도 이미 "사업자 관리 화면"이라고 쓴다
  (`lib/scenes.tsx:181-183`). 그래서 고객용 표기를 "BoostInterior 관리 화면"으로 정했다.
- **고객용 관리 화면에 없는 것**
  - 포트폴리오 편집: `src/app/admin`, `src/components/admin`에서 `포트폴리오|시공사례|portfolio` 검색 결과는
    상담 요청 요약의 읽기 전용 한 줄(`LeadBoard.tsx:331`)뿐이다. 포트폴리오 데이터 패널은 운영자 화면에 있다
    (`src/app/ops/tenants/[tenantSlug]/page.tsx:431`).
  - 방문자 분석: `src/app/admin/[tenantSlug]/page.tsx:8-11`에 "새 analytics 시스템을 만들지 않았다"는 주석이 있다.
- prompt §12는 관리 화면이 다루는 것으로 Portfolio를 예로 들었다. 실제 고객용 화면에는 없으므로 설명에서 뺐다.
  페이지의 설명은 "상담 기록 · 상담 요청 확인, 상담 자료 관리"다.

### 홈페이지 CMS: 없음

`/Users/woops/projects/web-recon-track-b` (d325ac0, 2026-10-01) — 데모 사이트(interior-demo.boostweb.co.kr)의 소스

- 템플릿 `templates/interior-01/v1/app/`의 경로: home, about, contact, portfolio, 3d-portfolio. 관리자 경로 없음.
  `templates/interior-01`에서 `admin|cms|관리자` 검색 0건.
- 콘텐츠는 저장소 파일이다: `data/sites/boost-interior-demo/` (`content/`, `slots.json`, `settings.json`, `theme.json` …).
- 설계 문서가 CMS를 미구현으로 적고 있다: `docs/result/recon-template-platform-architecture-study/14-implementation-order.md`
  252행 "Supabase, CMS / admin UI, server mode / tags"(MVP 제외 목록), 277행 "Admin UI / CMS | Customers edit their own content"(LATER).
- 헤드리스 CMS / 페이지 빌더 의존성(Sanity, Strapi, Payload, Contentful, WordPress 등)은 관련 저장소의 `package.json` 어디에도 없다.
- `boostweb`에는 고객용 "웹사이트 수정" 화면이 있지만 다른 제품(AI 랜딩 페이지)의 것이고 인테리어 템플릿과 연결되어 있지 않다.

이 두 저장소의 관리 화면 메뉴, 관리자 경로 목록, 포트폴리오 · analytics 검색 결과, 템플릿 경로, 설계 문서의 두 행은
직접 다시 열어 확인했다. `boostweb`과 의존성 검색은 조사 결과를 그대로 옮긴 것이다.

### 그래서 바꾼 것

| 위치 | V2.1 | V2.2 |
| --- | --- | --- |
| B 랜딩 카드 | 모바일 · SEO · 속도 · CMS 기본 제공 | 모바일 · SEO · 속도 기본 제공 |
| D 랜딩 카드 | CMS · SEO · BoostInterior 포함 | SEO 기반 구조 · 빠른 로딩 |
| B · D 포함 항목 | 관리자 CMS | 삭제 |
| 비교표 | 관리자 CMS 행 | 행 삭제 |
| Quick Website 기능 카드 | CMS — 관리자 CMS | HTTPS — HTTPS(SSL) 적용 (B의 기존 포함 항목) |
| FAQ "Quick Website는 어떤 홈페이지인가요?" | … 관리자 CMS, BoostInterior 연동 … | 질문을 "Quick Website와 Custom Website는 무엇이 다른가요?"로 바꾸고 CMS 삭제 |
| C 안내 문구 | (CMS 언급 없음) | "기존 홈페이지의 관리 방식(CMS)은 그대로 유지하며, CMS 재개발 · 교체와 … 별도 견적" |
| C · D 기본 범위 밖 | (CMS 언급 없음) | C "기존 홈페이지 CMS 재개발", D "별도 백엔드 · 특수 CMS" → 별도 견적 |
| A 운영 환경 | (없음) | "기존 홈페이지 환경 · 관리 방식 그대로" |
| FAQ 신규 | | "기존 홈페이지 개선에 기존 CMS 재개발도 포함되나요?" — 답 끝에 "BoostInterior 관리 화면은 홈페이지 CMS와 별개이며, 모든 구축 방식에 기본으로 제공됩니다." |

prompt §16의 OPTION 1("홈페이지 관리 방식" 행)은 쓰지 않았다. B · D 칸에 "실제 제공되는 새 홈페이지 관리 방식"을
적어야 하는데, 고객이 쓸 수 있는 관리 방식이 현재 없다.

---

## VAT implementation

문구는 `lib/pricing.ts`의 `VAT_NOTICE` 세 줄이고 컴포넌트에는 적혀 있지 않다.

| 위치 | 문구 | 형태 |
| --- | --- | --- |
| 랜딩 "도입 비용" 제목 바로 아래 | 모든 표시 가격은 부가세(VAT)가 포함된 최종 금액입니다. | ✓ 안내 박스. 가격 카드 7개보다 먼저 나온다 |
| /pricing "비용은 두 가지로 나뉩니다" 카드 아래 | 같은 문구 | ✓ 안내 박스 |
| /pricing 구축 비교표 아래 | 모든 구축비는 부가세(VAT)가 포함된 최종 금액입니다. | 작은 회색 한 줄 |
| /pricing 월 플랜 카드 아래 | 월 이용료 역시 부가세(VAT)가 포함된 금액입니다. | 작은 회색 한 줄 |
| /pricing FAQ | 표시 가격에 부가세가 포함되어 있나요? → 네. … 모두 부가세(VAT)가 포함된 최종 금액입니다. | |
| /pricing meta description | … 모든 가격은 부가세(VAT) 포함. … | |

카드마다 "VAT 포함"을 붙이지 않았다 (prompt §3). 390px에서 안내 박스는 두 줄이고 화면 폭을 다 쓴다.

"부터" 금액(120만원부터, 250만원부터)도 같은 정책이다. "부터"는 그대로 있다.

---

## Monthly card before / after

| | V2.1 | V2.2 |
| --- | --- | --- |
| 카드 구성 | 이름 · 역할 / 가격 / 요약 / 칩 2개 / 기능 목록 9–11행 / 안내 | 이름 · 역할 / 가격 / 요약 / 핵심 3–4행 / 안내 |
| Core | 11행 | 24시간 AI 상담 / 실제 시공사례 검색 · 추천 / 견적 문의 수집 · 상담 기록 확인 |
| Growth | Core 전체 포함 + 8행 | Core 전체 포함 / 방문자 행동 · 전환 흐름 분석 / AI Portfolio Video · 건수 제한 없음 |
| Managed | Growth 전체 포함 + 9행 | Growth 전체 포함 / 월 1회 방문 · 상담 데이터 리뷰 / 응답 · 전환 동선 개선 지원 / 우선 지원 |
| 역할 태그 | 시스템 사용 / 성장 기능 / 사람이 함께 운영 | 핵심 기능 / 분석 + Portfolio Video / 사람이 함께 운영 |
| 카드 높이 1440 | 710 × 3 | 435 × 3 |
| 카드 높이 390 | 624 + 642 + 654 = 1,920px | 316 + 399 + 411 = 1,126px (−794px, −41%) |
| 월 플랜 섹션 390 | 3,022px | 2,388px (−634px) |

- 카드의 핵심 3–4행은 랜딩 카드와 같은 데이터(`highlights`)다. 랜딩과 /pricing의 카드 문구가 같다.
- 카드에서 뺀 기능 28개는 전부 펼친 비교표 22행에 있다. Managed의 "자주 묻는 질문 · 응답 개선"은 V2.1 비교표에서
  "응답 개선"으로 줄어 있었고 카드에만 원문이 있었다. 비교표 행을 "AI 상담 응답 흐름 점검 · 자주 묻는 질문 응답 개선"으로 고쳤다.
- 순서를 바꿨다: 카드 → 비교표 → AI Portfolio Video 설명. V2.1은 카드와 비교표 사이에 영상 설명이 있었다 (prompt §32).
- 카드 아래 오른쪽에 "전체 기능 비교 ↓" 링크, 비교표 제목 아래에 "카드에는 핵심만 담았습니다. 세부 기능은 이 표에서
  모두 확인할 수 있습니다."

---

## 랜딩 변경

구조는 그대로다. 가격 요약 섹션에서 바뀐 것:

- 제목 아래 VAT 안내 박스 1개
- 초기 구축 설명: "홈페이지 상태에 맞는 구축 방식을 한 번 선택합니다." →
  "어떤 구축 방식을 선택해도 BoostInterior 기본 구축이 포함됩니다. 달라지는 것은 홈페이지 작업 범위입니다."
- 구축 카드 4개의 첫 줄이 모두 "BoostInterior 기본 구축 포함"(굵게)이고, 그 아래는 홈페이지 작업 2–3줄
- 월 플랜 역할 태그

가격 요약 밖에서 바꾼 것은 "구축 방식" 4칸(`InstallPaths`)의 두 줄이다. 지시에 없던 수정이고, 상품 논리와 어긋나서 고쳤다.

- A: "기존 디자인은 그대로 두고 BoostInterior**만 연결합니다**." → "… BoostInterior**를 구축합니다**."
- C: "디자인과 상담 전환 동선을 맞춤 개선합니다." → "디자인과 상담 동선을 맞춤 개선하고 BoostInterior를 함께 구축합니다."
  (네 칸 중 C에만 BoostInterior가 없었다)

---

## FAQ

8 → 11문항.

| | 질문 | |
| --- | --- | --- |
| 1 | 29만원은 단순 위젯 설치비인가요? | 문구 수정 ("기본 구축비") |
| 2 | 어떤 구축 방식을 선택해도 AI 상담 기능은 같은가요? | 신규 |
| 3 | 표시 가격에 부가세가 포함되어 있나요? | 신규 |
| 4 | 기존 포트폴리오가 많아도 모두 등록하나요? | 그대로 |
| 5 | 새 홈페이지가 49만원인데, 기존 홈페이지 개선은 왜 120만원부터인가요? | 그대로 |
| 6 | Quick Website와 Custom Website는 무엇이 다른가요? | "Quick Website는 어떤 홈페이지인가요?"를 대체. 표준화 vs 맞춤 |
| 7 | 기존 홈페이지 개선에 기존 CMS 재개발도 포함되나요? | 신규 |
| 8–11 | 월 운영 플랜 별도 여부 / 플랜 변경 / 3D Portfolio / AI Portfolio Video 건수 | 그대로 |

---

## Screenshots

Production alias에서 Playwright Chromium으로 찍은 full-page 캡처. `assets/v2-2-final-pricing-logic/`.

| | 1440 | 390 |
| --- | --- | --- |
| BEFORE (V2.1, 13658de) | [before-1440.jpg](./assets/v2-2-final-pricing-logic/before-1440.jpg) · 7,999px | [before-390.jpg](./assets/v2-2-final-pricing-logic/before-390.jpg) · 10,932px |
| AFTER collapsed (f4c2f04) | [after-collapsed-1440.jpg](./assets/v2-2-final-pricing-logic/after-collapsed-1440.jpg) · 8,796px | [after-collapsed-390.jpg](./assets/v2-2-final-pricing-logic/after-collapsed-390.jpg) · 11,662px |
| AFTER expanded (토글 7개 전부) | [after-expanded-1440.jpg](./assets/v2-2-final-pricing-logic/after-expanded-1440.jpg) · 12,480px | [after-expanded-390.jpg](./assets/v2-2-final-pricing-logic/after-expanded-390.jpg) · 17,345px |
| 랜딩 가격 요약 | [after-landing-1440.jpg](./assets/v2-2-final-pricing-logic/after-landing-1440.jpg) | [after-landing-390.jpg](./assets/v2-2-final-pricing-logic/after-landing-390.jpg) |

### 페이지 길이: 월 카드는 줄었고, 페이지 전체는 늘었다

`/pricing` 390px, 접힌 상태, 섹션별 높이 (px):

| 섹션 | V2.1 | V2.2 | 차이 | 이유 |
| --- | --- | --- | --- | --- |
| Hero | 494 | 494 | 0 | |
| 비용 구조 | 753 | 871 | +118 | VAT 안내 박스 |
| 초기 구축 | 4,600 | 5,547 | +947 | 공통 구축 영역 신설, 비교표 7 → 8행 |
| 월 플랜 | 3,022 | 2,388 | −634 | 카드 축약 |
| Founding Partner | 679 | 679 | 0 | |
| FAQ | 816 | 1,116 | +300 | 3문항 추가 |
| CTA | 492 | 492 | 0 | |
| **합계** | **10,932** | **11,662** | **+730 (+7%)** | |

1440px은 7,999 → 8,796px (+797px, +10%). 월 플랜 섹션은 1,877 → 1,677px.

prompt §39가 측정하라고 한 월 카드 구간은 줄었다. 페이지 전체가 길어진 것은 공통 구축 영역, VAT 안내, FAQ 3문항을
새로 넣었기 때문이다. 길이를 줄이려고 이 내용을 접거나 빼지는 않았다 (prompt §39 "가독성 우선", §7 "이 문구가 매우 중요하다").
더 줄이고 싶다면 아래 Known issues 1번을 보면 된다.

### Visual review (prompt §49)

스크린샷을 직접 보고 판단한 것이다. 실제 고객에게 물어본 결과가 아니다.

| 기준 | 판단 |
| --- | --- |
| 1. BoostInterior가 공통이라는 사실 | 비교표 위 영역의 제목이 그 문장이고, A B C D 표식이 붙어 있다. 표 헤더 네 칸에 "+ BoostInterior 기본 구축", 표 첫 행이 "✓ 동일하게 포함" × 4, 랜딩 카드 네 개의 첫 줄이 같다 |
| 2. 홈페이지 작업 차이 | 표 헤더의 굵은 줄: 지금 홈페이지 그대로 사용 / 표준 홈페이지 새로 제작 / 지금 홈페이지 맞춤 개선 / 완전 맞춤 홈페이지 새로 제작. 2–8행이 전부 홈페이지 작업 |
| 3. CMS 혼동 | "관리자 CMS" 0건. "CMS"는 7곳 모두 고객 홈페이지의 것이고 "별도 견적" 또는 "그대로 유지" 문맥. BoostInterior 관리 화면은 공통 구축의 칩으로 따로 있다 |
| 4. VAT | 랜딩과 /pricing 모두 첫 가격 근처에 파란 안내 박스. 390px에서 화면 폭을 다 쓴다 |
| 5. 월 카드 | 390px 합계 1,920 → 1,126px. 카드 하나가 한 화면(844px) 안에 들어온다 |
| 6. 전체 기능 비교 | 카드 바로 아래에 비교표, "전체 기능 비교 보기"로 22행 |

---

## Responsive / production QA

Production alias(`https://boost-interior-sales.vercel.app`), Playwright Chromium, f4c2f04 배포 후 실행.
`/pricing`은 폭마다 접힌 상태 → 토글 7개 전부 연 상태 → (820px 이하) 상품 4개를 차례로 선택 → 다시 접은 상태를 검사했다.

| Viewport | `/` | `/pricing` 접힘 | `/pricing` 펼침 |
| --- | --- | --- | --- |
| 1440 × 900 | pass | pass · 8,796px | pass · 12,480px |
| 1280 × 800 | pass | pass · 8,801px | pass · 12,561px |
| 1024 × 768 | pass | pass · 10,264px | pass · 14,893px |
| 768 × 1024 | pass | pass · 9,463px | pass · 13,727px |
| 390 × 844 | pass | pass · 11,662px | pass · 17,345px |
| 375 × 667 | pass | pass · 11,888px | pass · 17,703px |
| 1440 × 900 reduced motion | pass | pass | pass |
| 390 × 844 reduced motion | pass | pass | pass |

"pass"의 기준 (48개 상태 모두): horizontal overflow 0, 화면 밖으로 나간 요소 0, console error 0, failed request 0,
HTTP 4xx / 5xx 0, broken image 0, 보이는 금액이 전부 한 줄이고 잘리지 않음, 자기 칸보다 넓은 글자 0,
(데스크톱) 접었다 다시 접으면 높이가 처음과 같음.

링크: `/` 27개(in-page anchor 17), `/pricing` 19개(in-page anchor 6 — "전체 기능 비교" 1개 추가). anchor 대상 누락 0.
`/`, `/pricing`, 카카오 오픈채팅, 데모 사이트 모두 HTTP 200.

### Accessibility

Production, 1440 · 390 · 각각 reduced motion — 124개 체크 통과. V2.1의 108개와 같은 스크립트에서 기대값 두 개(토글 6 → 7, 구축표 행 7 → 8)만 바꿨고, 토글이 하나 늘어서 체크가 늘었다.

- 토글 7개 모두 `<button type="button" aria-expanded>`, `aria-controls`의 id가 전부 실제로 존재한다.
  새 토글은 "기본 구축 항목 14개 보기 / 접기".
- 키보드: Enter와 Space로 열고 닫힌다. focus는 버튼에 남고, 닫을 때 버튼이 화면에서 움직이지 않는다 (0px).
- Reduced motion: 열린 상세의 `animation-name`이 `none`.
- 구축 비교표: caption "초기 구축 방식 4가지 비교", 열 머리 5개, 접힌 상태 행 머리 8개.
  BoostInterior 기본 구축 행의 ✓에는 "포함 · " 텍스트가 붙는다.
- 플랜 비교표: 표시 칸 84개 전부에 "포함" / "미포함" 텍스트.
- 모바일 상품 선택: `aria-pressed`, 키보드로 세 번째를 고르면 영역 이름이 "기존 홈페이지 맞춤 개선 구축 범위"로 바뀐다.
- 공통 구축 영역: `role="group"` + `aria-labelledby`. A B C D 표식은 장식이라 스크린리더용 "A · B · C · D" 텍스트를 따로 넣었다.

실제 iOS / Android 기기에서는 확인하지 않았다 (Playwright Chromium만).

---

## Price / VAT / obsolete grep

Production alias, 접힌 내용까지 포함한 문서 전체 텍스트 (script · style 제외).

| 값 | `/` | `/pricing` |
| --- | --- | --- |
| 290,000 · 490,000 · 1,200,000 · 2,500,000 | 랜딩은 만원 표기: 29 / 49 / 120 / 250 각 1 | 6 / 4 / 4 / 3 |
| 88,000 · 198,000 · 297,000 | 1 / 1 / 1 | 4 / 2 / 2 |
| 700,000 · 1,500,000 · 3,000,000 · 150만 · 300만 | 0 | 0 |
| 부가세(VAT)가 포함 | 1 | 4 |
| VAT 별도 · 부가세 별도 · 별도 부과 · +10% | 0 | 0 |
| 관리자 CMS | 0 | 0 |
| CMS | 0 | 9 (7개 문맥, 전부 고객 홈페이지 CMS) |
| BoostInterior 관리 화면 | 0 | 6 |
| BoostInterior 기본 구축 | 8 | 24 |
| BoostChat · boostchat | 0 | 0 |
| BEST · POPULAR · 추천 플랜 · 가장 많이 선택 | 0 | 0 |
| 인테리어 광고 · 인테리어 마케팅 · 연간 | 0 | 0 |

소스: `lib/pricing.ts` 밖의 `app` · `components` · `lib` 코드에 금액 문자열 0건 (주석 제외). `lib/site.ts`의 meta
description에 적혀 있던 "29만원 · 49만원 · 88,000원"도 가격표에서 읽도록 바꿨다.

`docs/`의 과거 보고서에 있는 예전 금액은 고치지 않았다.

### Tests

`npm test` → `node --test "tests/*.test.mjs"`. 의존성 없음. 8개:

1. 현재 가격 7개와 "부터" 여부
2. 월 가격이 공급가 80,000 / 180,000 / 270,000 + VAT 10%
3. 공통 구축이 14개 항목이고 prompt §45의 항목을 모두 포함
4. A / B / C / D의 공통 구축 행이 네 칸 동일하고, 어떤 상품도 BoostInterior 항목을 따로 적지 않음
5. 플랜 카드가 4행 이하이고, 카드에서 뺀 기능이 전부 비교표 22행에 있음
6. VAT 문구가 전부 "포함"이고, 소스에 "VAT 별도"류 0건
7. 폐기된 금액 0건, `lib/pricing.ts` 밖에 금액 문자열 0건
8. "관리자 CMS" / "CMS 기본 제공"류 0건, 상품 항목에 CMS 없음, BoostChat 표기 0건

Node 22.18 이상이 필요하다 (TypeScript 파일을 그대로 읽는다. 로컬은 22.22.3). Vercel 빌드에서는 실행되지 않는다.

---

## Known issues / 소유자 결정이 필요한 것

1. **페이지가 길어졌다** — 390px 접힌 상태 10,932 → 11,662px. 월 카드에서 794px를 줄였지만 공통 구축 영역(약 800px),
   FAQ 3문항(300px), VAT 안내(118px)가 더 크다. 줄일 수 있는 곳: 공통 영역의 포트폴리오 정책 박스(390px에서 약 170px)를
   토글 안으로 넣기, FAQ의 "월 운영 플랜은 구축비와 별도인가요?"를 삭제(위 "비용은 두 가지로 나뉩니다"와 같은 내용).
   둘 다 정보를 접거나 빼는 일이라 하지 않았다.
2. **새 홈페이지(B · D)의 콘텐츠 수정 방식이 정해져 있지 않다** — 홈페이지 CMS가 없어서 "관리자 CMS" 문구를 지웠다.
   그 결과 Quick / Custom Website를 산 고객이 납품 뒤에 글과 사진을 어떻게 바꾸는지 페이지 어디에도 없다.
   현재 구현으로는 운영자가 저장소의 파일을 고쳐 다시 배포해야 한다. "수정 요청 시 반영"이 상품에 포함되는지,
   횟수나 비용이 있는지는 운영 정책이라 적지 않았다. 정해지면 B · D의 "운영 환경 · 검수"에 한 줄 넣으면 된다.
3. **Growth의 "방문자 행동 분석"을 고객이 볼 화면을 찾지 못했다** — 이번 감사는 CMS와 관리 화면이 대상이었고,
   그 과정에서 고객용 관리 화면에 방문자 분석 화면이 없는 것을 확인했다 (`page.tsx:8-11`). 월 플랜의 분석 기능이
   다른 경로(리포트 전달 등)로 제공되는지는 확인하지 않았다. prompt §24가 Growth의 정의를 확정했으므로 문구는 그대로 두었다.
   판매 문구가 구현보다 앞서 있을 수 있으니 확인이 필요하다.
4. **포트폴리오는 고객이 관리 화면에서 직접 고칠 수 없다** — 고객용 관리 화면에 포트폴리오 편집이 없다.
   페이지는 관리 화면을 "상담 기록 · 상담 요청 확인, 상담 자료 관리"로만 설명하므로 지금 문구에 과장은 없다.
   Managed의 "포트폴리오 업데이트 지원"은 사람이 해주는 작업으로 읽히므로 그대로 두었다.
5. **관리 화면 안의 브랜드** — 실제 관리 화면 사이드바에는 "BoostChat"이라고 적혀 있다
   (`AdminSidebar.tsx:71`). sales 페이지는 "BoostInterior 관리 화면"이라고 부른다. 로그인한 고객은 BoostChat 표기를 보게 된다.
   제품 저장소의 일이라 건드리지 않았다.
6. **구축비의 공급가가 딱 떨어지지 않는다** — 월 가격은 공급가 80,000 / 180,000 / 270,000원에 VAT 10%다.
   구축비는 VAT 포함 금액이 먼저 정해져서 290,000원의 공급가는 263,636원, 490,000원은 445,455원이다.
   페이지에는 영향이 없고, 세금계산서 발행 때 참고할 점이다.
7. **prompt §5의 2개 항목** — "AI 상담 흐름 구성", "BoostInterior 관리 화면 연결"은 V2.1 목록에 없던 항목이다.
   prompt가 지정한 대로 넣었다.
8. **AI Portfolio Video 설명 블록의 위치** — 카드와 비교표가 붙도록 비교표 아래로 옮겼다.
9. **JavaScript가 꺼진 경우** — V2.1과 같다. 토글 7개와 모바일 상품 선택이 열리지 않는다. 내용은 HTML에 있다.
10. **`prompt` 파일** — 변경을 커밋하지 않았다 (이전 작업들과 같은 방식).
11. **QA 스크립트** — 반응형 / 접근성 / 링크 / 텍스트 감사 스크립트는 세션 scratchpad에 있고 저장소에는 넣지 않았다.
    저장소에 들어간 것은 `tests/pricing.test.mjs`와 스크린샷 8장(3.5MB)이다.
12. 이전 보고서에서 넘어온 것은 그대로다: AI Portfolio Video 샘플 없음, Quick Website 예시 사이트 없음,
    초기 파트너 할인율 · 3D Portfolio 일정 미정, 연간 가격 없음, 실제 모바일 기기 미확인.
