# BoostInterior Sales V2.1: 가격 페이지 scanability 개선

`prompt` (BOOSTINTERIOR SALES V2.1 — PRICING PAGE SCANABILITY REFINEMENT · SETUP COMPARISON + COLLAPSIBLE DETAILS +
PRICE REVISION · DELTA UPDATE ONLY) 결과 보고서. 파일명의 날짜는 prompt가 지정한 것이고, 실제 배포 시각은
2026-10-02 00:12 KST다. [`BOOSTINTERIOR-SALES-V2-PRICING-PACKAGING-2026-10-01.md`](./BOOSTINTERIOR-SALES-V2-PRICING-PACKAGING-2026-10-01.md)
이후 작업이다.

재디자인이 아니다. 디자인 토큰, 카드, 타이포, 카피 방향은 그대로다. 바뀐 것은 초기 구축 가격 2개와 `/pricing`의
정보 순서다. 지워진 정보는 없다. 처음부터 전부 펼쳐져 있던 것을 "핵심 먼저, 상세는 토글"로 옮겼다.

---

## Report

```
TASK = PRICING SCANABILITY REFINEMENT

SETUP_PRICING   = 290000 / 490000 / 1200000+ / 2500000+
                  (C 기존 홈페이지 맞춤 개선 1,500,000 → 1,200,000원부터, D Custom Website 3,000,000 → 2,500,000원부터)
MONTHLY_PRICING = 88000 / 198000 / 297000   (변경 없음)

SETUP_COMPARISON = IMPLEMENTED
                   821px 이상: 5열 표 (항목 | A | B | C | D). 헤더에 상품명 · 가격 · 한 줄 정의
                   820px 이하: 상품 선택 4칸(상품명 + 가격) + 선택한 상품의 같은 7행  (prompt §9 OPTION A)

SETUP_COLLAPSED_ROWS = 7
                       홈페이지 / 디자인 방식 / BoostInterior / 포트폴리오 / 관리자 CMS / 모바일 · SEO · 속도 /
                       추가 페이지 · 특수 기능
                       ✓/✗가 아니라 짧은 상태 문구. BoostInterior 행만 ✓ + 문구(네 상품 모두 포함, 형태가 다름)

SETUP_EXPANDED_ROWS  = 6  ("전체 구축 범위 보기" → "전체 구축 범위 접기")
                       홈페이지 디자인 · 구조 / 포트폴리오 / BoostInterior · 상담 흐름 / 모바일 · SEO · 성능 /
                       설치 · 운영 환경 · 검수 / 기본 범위 밖의 작업
                       각 칸에 그 상품의 실제 포함 항목이 들어간다: A 13 · B 14 · C 11 · D 12 = 50개, V2와 동일

290K_VALUE_BLOCK = KEPT · 재구성
                   "29만원은 단순한 위젯 설치비가 아닙니다." + 본문 + 4단계 카드(01 홈페이지 · 업체 분석 /
                   02 기존 포트폴리오 전체 구조화 / 03 AI 검색 · 상담 연결 / 04 설치 · 검수) + 포트폴리오 건수 제한 없음
                   "전체 포함 범위 보기" → 포함 항목 13개(4단계별) + 작업 7단계 + 이런 업체에 맞습니다

QUICK_WEBSITE_FEATURES = 6  Responsive / SEO / Speed / CMS / Portfolio / BoostInterior
                         "싸게 만들어서가 아니라, 표준화해서 빠르게 제작하기 때문에 49만원입니다."
                         "검증된 표준 구조에 맞춰 제작하기 때문에 빠르고 합리적인 가격으로 제공합니다."
                         "전체 포함 범위 보기" → 포함 항목 14개

MONTHLY_COLLAPSED_ROWS      = 6  24시간 AI 상담 / 시공사례 검색 · 추천 / 견적 문의 · 상담 기록 / 방문자 행동 분석 /
                                 AI Portfolio Video / 월간 운영 · 개선
MONTHLY_EXPANDED_COMPARISON = KEPT  "전체 기능 비교 보기" → 기존 6개 카테고리 · 22행 전체 (AI 상담 5 / 포트폴리오 3 /
                                    견적 문의 2 / 방문자 분석 4 / Portfolio Video 1 / 운영 지원 7) → "전체 기능 비교 접기"

INTERIOR_MARKETING_SECTION = NOT ADDED   ("인테리어 광고" / "인테리어 마케팅" production 0건)
FOUNDING_PARTNER           = UNCHANGED   (lib/partner.ts, Partner.tsx, PricingClosing.tsx diff 없음)

TYPECHECK = PASS  (next typegen && tsc --noEmit, exit 0)
LINT      = PASS  (eslint, exit 0)
BUILD     = PASS  (next build, 10/10 static pages, / 와 /pricing 모두 static)

DESKTOP_QA     = PASS  1440×900 · 1280×800 · 1024×768
MOBILE_QA      = PASS  768×1024 · 390×844 · 375×667
REDUCED_MOTION = PASS  1440 · 390 (토글 animation 제거, 열기 / 닫기 동작 동일)
PRODUCTION_QA  = PASS  public alias 기준. 반응형 48 상태 · 접근성 108 체크 · 링크 45개 전부 통과

GIT    = 13658de feat: simplify BoostInterior pricing comparison  → origin/main (force push 없음)
         + 이 보고서 커밋
VERCEL = READY (Production)  13658de → GitHub status "Vercel = success"
         https://boost-interior-sales-2jwxqaqsj-vnfm0580s-projects.vercel.app

HOME    = https://boost-interior-sales.vercel.app
PRICING = https://boost-interior-sales.vercel.app/pricing
```

---

## Changed files

| 파일 | 변경 |
| --- | --- |
| `lib/pricing.ts` | 가격 2개, 포함 범위를 영역별로 재구성, 구축 비교 7행, 플랜 핵심 6행, 플랜 칩 |
| `lib/pricing-page.ts` | 29만원 가치 문구, 4단계 카드 설명, Quick Website 문구. 문장 속 금액을 가격표에서 읽음 |
| `components/pricing/SetupSection.tsx` | 다시 작성: 비교표 → A 가치 블록 → B → 49 vs 120 → C · D |
| `components/pricing/SetupComparison.tsx` | 신규 (client). 구축 비교표, 모바일 상품 선택, 전체 범위 토글 |
| `components/pricing/PlanComparison.tsx` | 신규 (client). 핵심 6행 ↔ 전체 기능 비교 |
| `components/pricing/Disclosure.tsx` | 신규 (client). 토글 버튼, 상태 hook, 토글 + 상세 묶음 |
| `components/pricing/SetupParts.tsx` | 신규. A–D 표식과 금액 표기 (표와 블록이 함께 씀) |
| `components/pricing/PlanSection.tsx` | 비교표를 PlanComparison으로 분리, 플랜 카드에 칩 한 줄 |
| `components/ui/Icon.tsx` | chevron 아이콘 1개 |
| `app/globals.css` | 토글 상세가 열릴 때의 220ms fade keyframe |

랜딩 컴포넌트(`components/landing/*`), `lib/partner.ts`, `lib/site.ts`, `app/*.tsx`는 건드리지 않았다. 새 라이브러리 없음.

---

## Price source changes

`lib/pricing.ts`가 계속 유일한 가격 source다. 숫자가 바뀐 곳은 두 줄이다.

```
C 기존 홈페이지 맞춤 개선   price: 1_500_000 → 1_200_000   (from: true)
D Custom Website           price: 3_000_000 → 2_500_000   (from: true)
```

- 랜딩 가격 요약(`components/landing/Pricing.tsx`)은 코드 변경 없이 29 / 49 / 120만원부터 / 250만원부터로 바뀌었다.
- V2에서는 "49만원 … 150만원부터" 질문과 "29만원은 단순 설치비인가요?"가 `lib/pricing-page.ts`에 문자열로 적혀 있었다.
  이제 `SETUP_OPTIONS`에서 읽는다. 다음에 가격이 바뀌면 `lib/pricing.ts`만 고치면 된다.
- 120 / 250이 숫자로 적힌 컴포넌트는 없다. `grep -rnE "1,?500,?000|3,?000,?000|150만|300만" app components lib public` = 0건.
- 가격 외에 `lib/pricing.ts`에서 바뀐 문구:
  - 한 줄 정의(`scope`)를 prompt §42에 맞췄다: "지금 홈페이지 그대로 + BoostInterior 업체 전용 구축" /
    "검증된 표준 홈페이지 신규 제작 + BoostInterior" / "기존 홈페이지를 살려서 맞춤 개선" / "완전 맞춤형 신규 홈페이지 + BoostInterior"
  - C · D의 안내 문구를 §17 · §18의 "범위를 확인한 뒤 별도 견적"으로 바꿨다. D는 이전에 "별도로 협의"였다.
- VAT 문구, 연간 가격은 넣지 않았다 (production 0건).

### Production price audit (public alias, script 제외 visible text)

| 값 | `/` | `/pricing` |
| --- | --- | --- |
| 290,000 · 490,000 · 1,200,000 · 2,500,000 | 랜딩은 만원 표기: 29 / 49 / 120 / 250 | 6 / 4 / 4 / 3 |
| 88,000 · 198,000 · 297,000 | 1 / 1 / 1 | 4 / 2 / 2 |
| 1,500,000 · 3,000,000 · 150만원 · 300만원 · 700,000 | 0 | 0 |
| VAT · 부가세 · 연간 | 0 | 0 |
| BEST · POPULAR · 가장 많이 선택 | 0 | 0 |
| 인테리어 광고 · 인테리어 마케팅 | 0 | 0 |

이전 보고서 등 `docs/`의 과거 기록에 있는 1,500,000 / 3,000,000은 고치지 않았다 (prompt §31).

---

## Comparison architecture

### 초기 구축

V2는 가격 바로가기 4칸 다음에 상품별 상세 블록 4개(체크리스트 13 / 14 / 11 / 12개, callout, 7단계 과정, 기능 카드)가
전부 펼쳐져 있었다. V2.1의 순서:

1. **비교표** — 네 상품이 무엇이 다른지. 헤더가 prompt §42의 "5초 안에 알아야 하는 것"(상품명, 가격, 한 줄 정의)이다.
2. **A 290,000원 가치 블록** — 왜 설치비가 아닌지.
3. **B Quick Website** — 왜 49만원인지 + 대표 기능 6개.
4. **49만원 vs 120만원부터** 질문 — 내용은 V2와 같고 금액만 바뀌었다.
5. **C · D** 나란히 — 한 줄 정의, 요약, 핵심 3개, 별도 견적 안내. 120과 250의 차이가 좌우로 읽힌다.

데이터: 각 상품의 포함 범위를 한 줄 목록에서 5개 영역으로 옮겼다 (`SETUP_SCOPE_GROUPS`: 홈페이지 디자인 · 구조 /
포트폴리오 / BoostInterior · 상담 흐름 / 모바일 · SEO · 성능 / 설치 · 운영 환경 · 검수). 항목 문구는 V2의 것을 그대로
옮겼고 새로 만든 항목은 없다. 펼친 비교표는 "행 = 영역, 칸 = 그 상품이 실제로 포함하는 항목"이다.

- prompt §8은 기능 하나가 한 행인 비교(업체 기본정보 세팅, Widget 연결, Domain 설정 …)를 예로 들었다. 그렇게 만들면
  "Quick Website에 상담 전문정보 세팅이 포함되는가" 같은, 현재 상품 정의에 답이 없는 칸을 ✓나 —로 채워야 한다.
  어느 쪽을 적어도 지어낸 값이 된다. 그래서 행을 영역으로 잡고 칸에는 원래 목록의 항목만 넣었다.
- 항목이 없는 칸은 A의 "모바일 · SEO · 성능" 하나다. 비워 두지 않고 "기존 홈페이지 기준"이라고 적었다.
- 접힌 7행의 값도 같은 기준이다. 예: 포트폴리오 행은 A "공개 포트폴리오 전체 수집 · 구조화" / B "기존 공개 포트폴리오 이전" /
  C "기존 포트폴리오 구조화" / D "포트폴리오 구조 설계"로, 각 상품의 포함 항목 문구다.
- prompt의 후보 1(기존 홈페이지 유지)과 2(새 홈페이지 제작)는 같은 사실의 양면이라 "홈페이지" 한 행으로 합쳤다.

모바일(820px 이하): 5열 표를 줄이지 않았다. 상품 4개가 2 × 2 버튼(600px 이상은 4 × 1)으로 놓이고 버튼마다
상품명과 가격이 있다. 네 가격은 항상 동시에 보인다. 버튼을 누르면 아래 카드가 그 상품의 한 줄 정의와 같은 7행으로
바뀐다. 행 위치가 고정이라 상품을 바꿔 가며 비교할 수 있다. 가로 스크롤과 drag는 없다.
"전체 구축 범위 보기"는 표와 모바일 카드가 같이 쓰는 버튼 하나다.

### 290,000원 블록

prompt §11의 가치 카드 4개와 §13의 단순화된 4단계는 같은 네 가지다 (홈페이지 분석 / 수집 · 구조화 /
AI 검색 · 상담 연결 / 설치 · 검수). 둘을 따로 그리면 같은 내용이 두 번 나오므로 번호가 붙은 카드 4개 한 줄로 합쳤다.
아이콘, 번호, 제목, 한두 줄 설명이다. 13개 항목과 7단계 과정은 "전체 포함 범위 보기" 안에 있고, 13개는 같은 4단계
제목 아래에 묶여 있다. 13개 항목은 비교표를 펼쳐도 볼 수 있다.

포트폴리오 정책 문구는 V2 그대로 토글 밖에 있다: "포트폴리오 건수 제한 없음. 현재 홈페이지에 공개된 기존 포트폴리오
전체가 초기 구축 대상입니다. 홈페이지에 없는 별도 자료의 정리는 범위를 확인한 뒤 안내해드립니다."

### 월 플랜

- 카드 3개의 모양과 기능 목록은 그대로다. 요약 문장 아래에 칩 한 줄이 생겼다:
  Core `24시간 AI 상담` `시공사례 검색 · 추천` / Growth `Core +` `방문자 행동 분석` `AI Portfolio Video` /
  Managed `Growth +` `월 1회 데이터 리뷰` `우선 지원`.
  Growth에만 넣으면 세 카드의 행 정렬(subgrid)이 어긋나서 세 카드 모두에 넣었다. BEST / 추천류 badge는 없다.
- 비교표는 모든 폭에서 표 하나다. V2는 데스크톱 표와 모바일 아코디언 6개를 따로 그렸다.
- 접힌 상태는 6행이고 카테고리당 한 행이다. 펼치면 6행 자리에 기존 22행이 카테고리별로 나온다. 6행 아래에 덧붙이지
  않은 이유는 "24시간 AI 상담", "방문자 행동 분석" 같은 행이 두 번 나오기 때문이다.
- 펼친 표는 화면보다 길어서 표 머리가 화면 밖으로 나간다. 카테고리 행마다 Core / Growth / Managed를 작게 다시 적었다.

### 토글

- 전부 `<button type="button">`에 `aria-expanded`와 `aria-controls`가 있다. 한 페이지에 6개다:
  전체 구축 범위 / 전체 포함 범위 × 4 (A · B · C · D) / 전체 기능 비교.
- "전체 포함 범위 보기"는 문구가 같은 버튼이 4개라, 스크린리더용으로 상품명이 앞에 붙는다
  ("Quick Website 전체 포함 범위 보기").
- 모양은 두 가지다. 비교표 카드의 아래쪽 띠, 그리고 블록 안의 pill 버튼. 기존 border / radius / 타이포를 썼다.
- 열릴 때 220ms opacity fade만 있고 `motion-safe`일 때만 적용된다. 닫힐 때는 animation이 없다.
- 비교표는 상세가 버튼 위쪽에서 열린다. 닫으면 버튼이 위로 끌려 올라가므로, 닫는 순간 스크롤 위치를 같이 옮겨
  버튼이 누른 자리에 남게 했다 (측정: 닫은 뒤 버튼 이동 0px).
- 접힌 상세도 HTML에 들어 있다 (`hidden` 속성). 서버 렌더 결과에 50개 항목과 22행이 모두 있다.

---

## Screenshots

Production alias에서 Playwright Chromium으로 찍은 full-page 캡처. `assets/v2-1-pricing-scanability/`.

| | 1440 | 390 |
| --- | --- | --- |
| BEFORE (V2, e95cdf1) | [before-1440.jpg](./assets/v2-1-pricing-scanability/before-1440.jpg) · 9,523px | [before-390.jpg](./assets/v2-1-pricing-scanability/before-390.jpg) · 13,249px |
| AFTER collapsed (13658de) | [after-collapsed-1440.jpg](./assets/v2-1-pricing-scanability/after-collapsed-1440.jpg) · 7,999px | [after-collapsed-390.jpg](./assets/v2-1-pricing-scanability/after-collapsed-390.jpg) · 10,932px |
| AFTER expanded (토글 6개 전부 연 상태) | [after-expanded-1440.jpg](./assets/v2-1-pricing-scanability/after-expanded-1440.jpg) · 11,635px | [after-expanded-390.jpg](./assets/v2-1-pricing-scanability/after-expanded-390.jpg) · 16,518px |

처음 열렸을 때의 페이지 길이: 1440에서 9,523 → 7,999px (−16%), 390에서 13,249 → 10,932px (−17%).
월 플랜 카드의 기능 목록은 prompt §19에 따라 그대로 두었다. 줄어든 길이는 거의 전부 초기 구축 섹션에서 나왔다.

### Visual review (prompt §36)

스크린샷을 직접 보고 판단한 것이다. 실제 고객에게 물어본 결과가 아니다.

| 기준 | 판단 |
| --- | --- |
| 1. 4개 구축 상품 차이가 5초 안에 | 표 헤더 한 줄에 상품명 · 가격 · 한 줄 정의. 그 아래 "홈페이지" 행이 그대로 유지 / 신규 제작 / 유지하며 개선 / 신규 제작 |
| 2. 29만원이 위젯 설치비처럼 보이지 않는가 | A 블록의 가장 큰 글자가 "29만원은 단순한 위젯 설치비가 아닙니다."이고, 바로 아래가 4단계 카드 |
| 3. 49 vs 120 | 질문 카드가 B와 C 사이에 있고 금액이 좌우로 나란하다 |
| 4. 120 vs 250 | C · D 카드가 나란히: "기존 홈페이지를 살려서 맞춤 개선" / "완전 맞춤형 신규 홈페이지 + BoostInterior". 1100px 이하에서는 위아래 |
| 5. 월 88 / 198 / 297 | 가격 아래 칩: Growth "Core + 방문자 행동 분석 · AI Portfolio Video", Managed "Growth + 월 1회 데이터 리뷰 · 우선 지원" |
| 6. 펼치지 않아도 핵심 이해 | 접힌 상태에 가격 7개, 구축 7행, 플랜 6행, 가치 문구가 모두 있다 |
| 7. 필요하면 상세 전부 확인 | 구축 항목 50개, 7단계 과정, 플랜 22행 모두 토글 안에 있다 |
| 8. 세로 길이와 정보 피로도 | 위 수치. 초기 구축에서 처음 보이는 체크 항목은 50개 → 6개(C · D 핵심 3개씩) |

---

## Responsive / production QA

Production alias(`https://boost-interior-sales.vercel.app`), Playwright Chromium, 13658de 배포 후 실행.
`/pricing`은 폭마다 접힌 상태 → 토글 6개 전부 연 상태 → (820px 이하) 상품 4개를 차례로 선택 → 다시 접은 상태를 검사했다.

| Viewport | `/` | `/pricing` 접힘 | `/pricing` 펼침 |
| --- | --- | --- | --- |
| 1440 × 900 | pass | pass · 7,999px · 표 | pass · 11,635px |
| 1280 × 800 | pass | pass · 7,973px · 표 | pass · 11,674px |
| 1024 × 768 | pass | pass · 9,485px · 표 | pass · 14,109px |
| 768 × 1024 | pass | pass · 8,800px · 상품 선택 4 × 1 | pass · 12,972px |
| 390 × 844 | pass | pass · 10,932px · 상품 선택 2 × 2 | pass · 16,518px |
| 375 × 667 | pass | pass · 11,187px · 상품 선택 2 × 2 | pass · 16,885px |
| 1440 × 900 reduced motion | pass | pass | pass |
| 390 × 844 reduced motion | pass | pass | pass |

"pass"의 기준 (48개 상태 모두):

- horizontal overflow 0. 화면 밖으로 나간 요소 0.
- console error 0, failed request 0, HTTP 4xx / 5xx 0, broken image 0.
- 보이는 금액 전부(`/pricing` 22–26개, `/`의 월 가격 3개)가 한 줄에 있고 잘리지 않는다.
  375px의 "1,200,000원부터", "2,500,000원부터"도 한 줄이다.
- 랜딩의 구축 금액 4개는 6개 폭 모두에서 "29만원 | 49만원 | 120만원부터 | 250만원부터"로 읽히고 카드 밖으로 나가지 않는다.
- 자기 칸보다 넓은 글자 0 (li / button / th / td / dt / dd).
- 접었다가 다시 접으면 페이지 높이가 처음과 같다 (데스크톱).

링크: `/` 27개(in-page anchor 17), `/pricing` 18개(in-page anchor 5). anchor 대상 누락 0. `/`, `/pricing`, 카카오 오픈채팅,
데모 사이트 모두 HTTP 200. 표 헤더의 상품명 링크(`#integration`, `#quick-website`, `#improvement`, `#custom-website`)는
V2와 같은 id로 연결된다.

실제 iOS / Android 기기에서는 확인하지 않았다 (Playwright Chromium만).

---

## Accessibility evidence

Production, 1440 · 390 · 각각 reduced motion — 108개 체크 통과.

- 토글 6개 모두 `<button type="button" aria-expanded>`이고, `aria-controls`의 id가 전부 실제로 존재한다
  (전체 구축 범위 2개: 표의 tbody와 모바일 패널 / 전체 포함 범위 각 1개 / 전체 기능 비교 6개: 카테고리 tbody).
- 키보드: focus 후 Enter와 Space로 열고 닫았다. 열면 `aria-expanded="true"`, 문구가 "… 접기"로 바뀌고 대상이 보이며
  focus는 버튼에 남는다. 닫으면 "… 보기"로 돌아가고 버튼은 화면에서 0px 이동한다.
- Reduced motion: 열린 상세의 `animation-name`이 `none`이다. 일반 모드에서는 `disclose`.
- 플랜 비교표: 표시 칸 84개 전부에 "포함" 또는 "미포함" 텍스트가 있다 (sr-only). 표시는 ✓와 —로 모양이 다르다.
  색만으로 구분하지 않는다.
- 구축 비교표: `<caption>` "초기 구축 방식 4가지 비교", 열 머리 5개(`scope="col"`), 행 머리 7개(`scope="row"`).
  BoostInterior 행의 ✓에는 "포함 · " 텍스트가 붙는다. 나머지 행은 값 자체가 글자다.
- 모바일 상품 선택: `role="group"` "구축 방식 선택" 안의 버튼 4개에 `aria-pressed`. 키보드로 세 번째를 고르면
  `false,false,true,false`가 되고 아래 영역의 이름이 "기존 홈페이지 맞춤 개선 구축 범위"로 바뀐다.
  선택 표시는 색 + 두꺼운 테두리 + 흰 배경 + 그림자다.

---

## Known issues / 소유자 결정이 필요한 것

1. **관리자 CMS 행의 C 값** — prompt §6의 예시는 C = "기존 환경 개선"이었다. 현재 C의 포함 항목 11개에는 CMS 작업이 없다.
   그래서 A와 같은 "기존 환경 기준"으로 적었다. 맞춤 개선에 CMS 개선이 실제로 포함된다면 `lib/pricing.ts`의
   `SETUP_COMPARISON`에서 그 값 하나를 바꾸고 C의 `includes`에 항목을 추가하면 된다.
2. **B · C · D의 BoostInterior 범위** — 표에는 현재 정의대로 "기본 연동" / "통합" / "구축 · 연동"이라고 적혀 있다.
   펼치면 A에는 BoostInterior 항목이 6개, B는 3개, C · D는 2개씩이다. 가장 싼 상품의 목록이 가장 길어 보인다.
   B · C · D에도 A와 같은 초기 세팅(상담 전문정보, AI 시공사례 검색 연결 등)이 들어간다면 그 항목을 각 상품의
   `includes.system`에 적어야 표가 실제와 맞는다. 확인 없이 추가하지 않았다.
3. **JavaScript가 꺼진 경우** — 토글 6개와 모바일 상품 선택은 열리지 않는다. 내용은 HTML에 있지만 화면에는 접힌 상태만
   보이고, 모바일 비교는 A만 보인다. FAQ는 V2처럼 native `<details>`라 그대로 동작한다.
   또 접힌 내용은 브라우저 "페이지에서 찾기"에 잡히지 않는다.
4. **월 플랜 카드의 기능 목록** — §19에 따라 9–11개 목록을 그대로 두었다. 390px에서 카드 3개의 높이 합이 1,920px이고,
   같은 내용이 "전체 기능 비교"에도 있다. 카드를 핵심 3개(`highlights`)로 줄이면 모바일이 600px쯤 더 짧아질 것으로
   보인다 (측정하지 않은 추정). 카드 디자인 유지 지시와 충돌해서 하지 않았다.
5. **VAT · 연간** — 미정 그대로다. 문구를 넣지 않았다.
6. **`prompt` 파일** — 작업 지시가 담긴 `prompt`의 변경은 커밋하지 않았다 (이전 작업들도 같은 방식).
7. **QA 스크립트** — 반응형 / 접근성 / 링크 검사 스크립트는 세션 scratchpad에 있고 저장소에는 넣지 않았다.
   스크린샷 6장(3.2MB)만 `docs/result/assets/`에 넣었다.
8. 이전 보고서에서 넘어온 것은 그대로다: AI Portfolio Video 샘플 없음, Quick Website 예시 사이트 없음,
   초기 파트너 할인율 · 3D Portfolio 일정 미정, favicon placeholder.
