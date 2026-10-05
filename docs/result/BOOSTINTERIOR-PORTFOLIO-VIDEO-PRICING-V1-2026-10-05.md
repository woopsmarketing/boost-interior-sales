# BoostInterior 가격 정책 반영: Core AI Portfolio Video + 플랜 포지셔닝 V1

`prompt` (BOOSTINTERIOR PRICING POLICY UPDATE — CORE AI PORTFOLIO VIDEO + PLAN POSITIONING V1) 결과 보고서.
작업일 2026-10-05 ~ 10-06. 선행 문서는 [`BOOSTINTERIOR-SALES-LANDING-V3-2026-10-05.md`](./BOOSTINTERIOR-SALES-LANDING-V3-2026-10-05.md)이다.

V3의 구조 · section 순서 · 버튼 위계 · 가격은 그대로다. 바뀐 것은 AI Portfolio Video가 어느 플랜에 얼마나 들어가는지와, 그에 따라 Core / Growth / Managed를 설명하는 문구다.
**push하지 않았고 배포하지 않았다.** 로컬 `main`에 커밋 2개가 있다 (보고서 커밋 포함).

---

## Report

```
STATUS                 = 구현 · 검증 완료, 로컬 커밋만. 운영 사이트는 그대로다
CORE_VIDEO             = YES  Core 카드 · 비교표 · FAQ · HOME에 모두 표시
CORE_VIDEO_LIMIT       = 월 1건  (lib/pricing.ts VIDEO.core, 이 한 곳에서만 정한다)
GROWTH_VIDEO           = 신규 시공사례 기준 확대 제공  (숫자 없음, "무제한" 없음. 휴대폰 비교표에서는 "확대 제공")
MANAGED_VIDEO          = Growth와 동일  (별도 수량을 약속하지 않는다. 비교표의 Managed 칸은 Growth 칸과 같은 값이다)
QUICK_VALUE            = "Growth 플랜" badge → "Core 월 1건부터". 설명에 홈페이지 활용 추가
HOME_PRICING           = 내 상황에 맞는 선택의 플랜 3줄에 포함 범위 한 줄씩 추가
                         Core: AI 상담 · 시공사례 추천 · 견적 문의 + AI Portfolio Video 월 1건
                         Growth: Core 전체 포함 + 방문자 분석 + AI Portfolio Video 활용 범위 확대
                         Managed: Growth 전체 포함 + 매달 함께 검토 · 개선하는 운영 지원
PRICING_PAGE           = Core 카드에 "AI Portfolio Video 월 1건" 추가. Growth 카드는 "활용 범위 확대"로,
                         "플랜을 올리면 이것이 더해집니다"의 Growth는 "Core 월 1건 → Growth 신규 시공사례 기준 확대 제공"으로 표시
PRICING_DETAILS        = 플랜 카드 3장 · 비교표(접힘 6행 / 펼침 22행) · AI Portfolio Video 블록 · FAQ 모두 반영
                         비교표의 AI Portfolio Video 행은 ✓ 대신 값이다: 월 1건 / 신규 시공사례 기준 확대 제공 / Growth와 동일
FAQ                    = "몇 개까지 가능한가요?" → "어떤 플랜에서 사용할 수 있나요?" (질문 12개 유지, 답 3문장)
                         HOME의 5문항은 영상 질문이 없어 그대로다
FOUNDING_PARTNER       = "AI 시공사례 영상 우선 혜택" → "AI 시공사례 영상 추가 혜택"
                         본문이 "지금 모든 플랜에서 제공하는 기능"이라고 먼저 말하고, 혜택은 그 위의 추가 혜택으로만 남겼다
PORTFOLIO_VIDEO_SAMPLE = null  (repo의 영상은 판매 영상 master-sales.mp4와 예전 Hero 루프뿐이다. 기능 결과물은 없다)
PUBLIC_PREVIEW         = NO    (빈 틀 · 대체 영상을 넣지 않았다. <video>는 3개 페이지 모두 0개)
QUOTA_ENGINE           = NONE  (usage counter · quota · credit · 관리 화면 없음. 문구와 표시만 바꿨다)
TYPECHECK              = PASS  (next typegen && tsc --noEmit)
LINT                   = PASS  (eslint)
BUILD                  = PASS  (next build, 정적 11/11. / · /pricing · /pricing/details 모두 static)
TEST                   = PASS  (npm test, 36/36. 기존 27개 유지 + 신규 9개)
BROWSER_QA             = PASS  로컬 production build(next start), Chromium. 3개 route × 1440 · 390
                         console error 0 · failed request 0 · 가로 overflow 0 · 잘린 글자 0 · 중복 id 0 · h1 1개씩
                         추가로 320 · 600 · 821 · 1101 · 1280도 확인했다 (가로 overflow 0)
                         실제 기기 · iOS Safari는 확인하지 못했다
GIT                    = ca33005 feat(pricing): include AI Portfolio Video in Core plan
                         + 이 보고서 커밋 (docs(sales): record AI Portfolio Video pricing V1)
                         origin/main(63195fa)에서 시작. `prompt`와 CRO audit 문서는 커밋하지 않았다. force push 없음
PUSHED                 = NO
```

---

## 1. 무엇이 바뀌었나

| | 이전 | 지금 |
|---|---|---|
| AI Portfolio Video | Growth부터 제공 · 건수 제한 없음 | 모든 플랜. Core 월 1건 / Growth 신규 시공사례 기준 확대 제공 / Managed는 Growth와 동일 |
| Core | 핵심 기능 | 운영 기본형: AI 상담 · 시공사례 추천 · 견적 문의 + 영상 월 1건 |
| Growth | 분석 + Portfolio Video | 영상 활용 + 분석 강화형: Core 전체 + 방문자 분석 + 영상 활용 범위 확대 |
| Managed | 매달 함께 검토 · 개선 | 함께 검토 · 개선하는 관리형: Growth 전체 + 사람이 함께 하는 운영 지원 |
| 가격 | 290,000 / 490,000 / 1,200,000~ / 2,500,000~ · 월 88,000 / 198,000 / 297,000 | **동일** |

수량은 `lib/pricing.ts`의 `VIDEO` 한 곳에 있다. 카드 · 비교표 · HOME badge · AI Portfolio Video 블록 · FAQ가 모두 거기서 읽으므로, "월 1건"을 바꾸면 한 줄만 고치면 된다.

---

## 2. TASK 1: 수정 전 문구 inventory

검색어(Portfolio Video · AI Portfolio · 시공사례 영상 · 영상 제작 · 건수 제한 · 무제한 · Growth · Core · Managed)로 `app` · `components` · `lib` · `tests`를 찾은 결과다. "무제한" · "영상 제작" · "3D Portfolio Video"는 처음부터 0건이었다.

### 고객이 읽는 문구

| FILE | CURRENT COPY | PROBLEM | NEW COPY |
|---|---|---|---|
| `lib/home.ts` Quick Value | badge `Growth 플랜` | Core에도 있는데 Growth 전용으로 읽힌다 | `Core 월 1건부터` |
| `lib/home.ts` Quick Value | 시공사진을 영상으로 만들어 인스타그램 · 유튜브 · 블로그에도 활용할 수 있습니다. | 기능의 가치가 약하다. 홈페이지 활용이 빠져 있다 | 시공사진을 공간의 흐름에 맞춰 영상으로 만들어 홈페이지 · 인스타그램 · 유튜브 · 블로그 등에 활용할 수 있습니다. |
| `lib/pricing.ts` Core 카드 | 24시간 AI 상담 / 조건에 맞는 실제 시공사례 추천 / 견적 문의와 상담 기록 확인 | 영상이 없다 | 4번째 줄 `AI Portfolio Video 월 1건` 추가 |
| `lib/pricing.ts` Core 요약 | BoostInterior의 핵심 기능을 사용합니다. | 영상이 없다 | AI 상담부터 견적 문의까지 핵심 기능을 모두 사용하고, AI Portfolio Video도 월 1건 사용합니다. |
| `lib/pricing.ts` Core 태그 | 핵심 기능 | 세 플랜의 계단이 보이지 않는다 | 운영 기본형 |
| `lib/pricing.ts` Growth 태그 | 분석 + Portfolio Video | 영상이 Growth의 것으로 읽힌다 | 영상 활용 + 분석 강화형 |
| `lib/pricing.ts` Growth 한 문장 (HOME · /pricing 선택 도우미) | 방문자 분석과 AI Portfolio Video까지 | 영상이 Growth에서 처음 생기는 것처럼 읽힌다 | 방문자 분석과 더 넉넉한 영상 활용까지 |
| `lib/pricing.ts` Growth 요약 | …확인하고, 시공사진을 공간의 흐름에 따라 영상으로 보여줍니다. | 같은 문제 | …확인하고, 새롭게 등록되는 시공사례를 영상으로 더 넉넉하게 활용합니다. |
| `lib/pricing.ts` Growth 카드 | AI Portfolio Video (시공사진 영상) · 건수 제한 없음 | 같은 문제 + "건수 제한 없음" | AI Portfolio Video 활용 범위 확대 |
| `lib/pricing.ts` Growth 주석 문구 | AI Portfolio Video는 새롭게 등록되는 실제 시공사례를 기준으로, 업체가 제공하는 실제 시공 자료로 제작합니다. | Core와의 차이가 없다 | AI Portfolio Video는 Core의 월 1건에서, 새롭게 등록되는 실제 시공사례 기준으로 제공 범위가 넓어집니다. 영상은 업체가 제공하는 실제 시공 자료로 제작합니다. |
| `lib/pricing.ts` Managed 태그 | 매달 함께 검토 · 개선 | (충돌 없음) 계단에 맞춰 형태만 통일 | 함께 검토 · 개선하는 관리형 |
| `lib/pricing.ts` 비교표 (접힘) | AI Portfolio Video: — / ✓ / ✓ | Core가 미포함으로 표시된다 | 월 1건 / 신규 시공사례 기준 확대 제공 / Growth와 동일 |
| `lib/pricing.ts` 비교표 (펼침) | AI Portfolio Video 제작 지원 · 건수 제한 없음: — / ✓ / ✓ | 같은 문제 + "건수 제한 없음" | AI Portfolio Video 제공 범위: 월 1건 / 신규 시공사례 기준 확대 제공 / Growth와 동일 |
| `PricingSummary.tsx` · `PlanSection.tsx` 플랜 section 설명 | Core는 핵심 기능, Growth는 방문자 분석과 시공사진 영상(AI Portfolio Video), Managed는 매달 함께 확인하고 개선하는 운영 지원입니다. | Growth = 분석 + 영상 | Core는 AI 상담과 AI Portfolio Video 월 1건을 담은 운영 기본형, Growth는 영상 활용 범위를 넓히고 방문자 분석을 더한 강화형, Managed는 매달 함께 확인하고 개선하는 관리형입니다. |
| `PricingSummary.tsx` Growth가 더하는 것 | AI Portfolio Video / 시공사례 영상 제작 · 건수 제한 없음 — … | 영상 자체가 추가되는 것으로 읽힌다 | AI Portfolio Video 활용 범위 확대 / Core 월 1건 → Growth 신규 시공사례 기준 확대 제공 |
| `PlanSection.tsx` AI Portfolio Video 블록 | 태그 `Growth부터` | Growth 전용 | `Core 월 1건부터` + 플랜별 3줄 (Core 월 1건 / Growth 신규 시공사례 기준 확대 제공 / Managed Growth와 동일) |
| `lib/pricing-page.ts` 영상 설명 | 시공사진을 공간의 흐름에 따라 보여주는 AI 시공사례 영상입니다. 완성된 시공사진을 사진 목록으로만 두지 않고, 공간을 따라 이동하는 영상으로 보여줄 수 있도록 지원합니다. | 어디에 쓰는지가 없다 | 시공사진을 공간의 흐름에 맞춰 AI 시공사례 영상으로 만듭니다. 완성된 시공사진을 사진 목록으로만 두지 않고, 홈페이지 · 인스타그램 · 유튜브 · 블로그 등에 영상으로 활용할 수 있습니다. |
| `lib/pricing-page.ts` 영상 조건 | 시공사례 영상 제작 · 건수 제한 없음 — 새롭게 등록되는 실제 시공사례 · 업체가 제공하는 실제 시공 자료 기준 | "건수 제한 없음" | 영상은 업체가 제공하는 실제 시공 자료로 제작합니다. (수량은 플랜별 3줄로 분리) |
| `lib/pricing-page.ts` FAQ | Q. AI Portfolio Video는 몇 개까지 가능한가요? / A. …Growth 플랜부터 제공합니다. …건수 제한 없이 지원하며… | Growth 전용 + "건수 제한 없이" | Q. AI Portfolio Video는 어떤 플랜에서 사용할 수 있나요? / A. 모든 플랜에서 사용할 수 있습니다. Core는 월 1건, Growth와 Managed는 새롭게 등록되는 실제 시공사례를 기준으로 더 넉넉하게 제공합니다. 영상은 업체가 제공하는 실제 시공 자료로 제작합니다. |
| `PortfolioSample.tsx` 영상 캡션 (지금은 표시되지 않음) | AI Portfolio Video 실제 예시 · Growth 플랜부터 제공 | sample이 연결되는 순간 틀린 문구가 나간다 | AI Portfolio Video 실제 예시 · Core 월 1건부터 제공 |
| `lib/partner.ts` Founding Partner | AI 시공사례 영상 우선 혜택 / 시공사진을 영상으로 보여주는 AI Portfolio Video 관련 혜택을 초기 파트너에게 먼저 드립니다. | 옆의 "3D 시공사례 우선 적용" · "신규 기능 먼저 이용"과 나란히 있어 나중에 나올 기능처럼 읽힌다 | AI 시공사례 영상 추가 혜택 / AI Portfolio Video는 지금 모든 플랜에서 제공하는 기능입니다. 초기 파트너에게는 영상 관련 추가 혜택을 먼저 드립니다. |
| `Partner.tsx` HOME 띠 설명 | 앞으로 추가되는 기능과 BoostInterior 인테리어 플랫폼에서 먼저 받는 혜택입니다. | 띠 전체가 "앞으로의 것"이라고 말해, 영상도 미래 기능이 된다 | 지금 제공하는 기능의 추가 혜택과, 앞으로 추가되는 기능 · BoostInterior 인테리어 플랫폼에서 먼저 받는 혜택입니다. |
| `lib/pricing-page.ts` /pricing "어떤 조합을 골라도 같습니다" | 시공사례 건수 제한 없음 | 영상 문구가 아니다. 다만 "월 1건" 옆에서 영상까지 포함하는 말로 읽힐 수 있다 | 기존 시공사례 건수 제한 없음 |
| `lib/pricing-page.ts` /pricing/details 공통 구축 | 시공사례 건수 제한 없음. | 같음 | 기존 시공사례 건수 제한 없음. |

### 그대로 둔 문구

| FILE | COPY | 이유 |
|---|---|---|
| `lib/pricing-page.ts` FAQ "기존 시공사례가 많아도 모두 등록하나요?" | …공개 중인 시공사례는 건수 제한 없이 전체를 초기 구축 대상으로 세팅합니다. | 초기 구축 범위에 대한 약속이고 "공개 중인 시공사례"라고 대상을 말한다. 영상 정책과 충돌하지 않는다 |
| `lib/home.ts` FAQ "시공사례는 어떻게 준비하나요?" | …공개된 기존 시공사례를 건수 제한 없이 수집해… | 같음 |
| `lib/pricing-page.ts` FAQ "3D 시공사례도 제공하나요?" · `lib/partner.ts` "3D 시공사례 우선 적용" | 3D 시공사례(3D Portfolio)는 현재 월 운영 플랜의 제공 기능에 포함되어 있지 않습니다. … | AI Portfolio Video와 다른, 아직 없는 기능이다. "3D Portfolio Video"라는 말은 어디에도 없다 |
| `lib/pricing.ts` Core 안내 | AI 상담 · 시공사례 추천 · 견적 문의는 Core부터 모두 포함됩니다. | 여전히 사실이다 |
| Hero · 실제 작동 영상 section의 "영상" | 86초 영상으로 보기 등 | 제품 판매 영상이다. AI Portfolio Video가 아니다 |

### 테스트

| FILE | 이전 | 지금 |
|---|---|---|
| `tests/pricing.test.mjs` "the plan cards are short…" | 비교표에 `AI Portfolio Video 제작 지원 · 건수 제한 없음`이 있어야 한다 | `AI Portfolio Video 제공 범위`가 있어야 한다 |
| `tests/pricing.test.mjs` "Founding Partner…" | 3번째 혜택 제목 `AI 시공사례 영상 우선 혜택` | `AI 시공사례 영상 추가 혜택` + 영상을 미래 기능으로 말하지 않는지 검사 추가 |

기존 27개 테스트는 모두 남아 있다. 위 두 곳은 이전 정책의 문구 자체를 고정하던 기대값이라 새 문구를 따라갔다.

---

## 3. 화면

`docs/result/assets/portfolio-video-pricing-v1/`에 수정 후 화면이 있다 (로컬 production build, 화면 캡처 때만 상단 고정 바를 가렸다).

**HOME**

- Quick Value: [1440](./assets/portfolio-video-pricing-v1/home-1440-quick-value.jpg) · [390](./assets/portfolio-video-pricing-v1/home-390-quick-value.jpg)
- 가격 (내 상황에 맞는 선택): [1440](./assets/portfolio-video-pricing-v1/home-1440-pricing.jpg) · [390](./assets/portfolio-video-pricing-v1/home-390-pricing.jpg)
- 초기 파트너 혜택: [1440](./assets/portfolio-video-pricing-v1/home-1440-partner.jpg)

**/pricing**

- 운영 플랜 카드: [1440](./assets/portfolio-video-pricing-v1/pricing-1440-plans.jpg) · [390](./assets/portfolio-video-pricing-v1/pricing-390-plans.jpg)
- 플랜을 올리면 이것이 더해집니다: [1440](./assets/portfolio-video-pricing-v1/pricing-1440-plan-additions.jpg) · [390](./assets/portfolio-video-pricing-v1/pricing-390-plan-additions.jpg)

**/pricing/details**

- 플랜 카드 + 비교표 + AI Portfolio Video 블록: [1440](./assets/portfolio-video-pricing-v1/details-1440-plans.jpg)
- 비교표 390: [접힘](./assets/portfolio-video-pricing-v1/details-390-comparison.jpg) · [펼침](./assets/portfolio-video-pricing-v1/details-390-comparison-open.jpg)
- AI Portfolio Video 블록: [1440](./assets/portfolio-video-pricing-v1/details-1440-portfolio-video.jpg) · [390](./assets/portfolio-video-pricing-v1/details-390-portfolio-video.jpg)
- FAQ (영상 질문을 연 상태): [1440](./assets/portfolio-video-pricing-v1/details-1440-faq-video.jpg)

페이지 길이 변화 (수정 전 → 후):

| route | 1440 | 390 |
|---|---|---|
| `/` | 12,131 → 12,155px (+24) | 12,852 → 13,028px (+176) |
| `/pricing` | 5,328 → 5,372px (+44) | 9,028 → 9,212px (+184) |
| `/pricing/details` | 9,431 → 9,552px (+121) | 13,012 → 13,197px (+185) |

늘어난 만큼은 선택 도우미의 포함 범위 한 줄, Core 카드의 한 줄, AI Portfolio Video 블록의 플랜별 3줄이다.

---

## 4. 판단이 들어간 곳

prompt가 그대로 정해주지 않았거나, 기존 규칙과 부딪혀 고른 것들이다. 마음에 들지 않으면 여기부터 보면 된다.

1. **"포트폴리오 영상"이라고 쓰지 않았다.** prompt의 권장 설명은 "…포트폴리오 영상으로 만들어…"였다. 이 사이트는 "포트폴리오"를 쓰지 않고 "시공사례"로 통일하며 (기능 이름 AI Portfolio Video · 3D Portfolio만 예외), 기존 테스트가 이를 막는다. 그래서 같은 문장을 "AI 시공사례 영상"으로 썼다. 나머지(공간의 흐름에 맞춰 · 홈페이지 · 인스타그램 · 유튜브 · 블로그 등)는 권장 문장 그대로다.

2. **"건수 제한 없음"은 영상에서만 지웠다.** 영상에 붙어 있던 4곳은 모두 없앴다. 남은 4곳은 초기 구축 때 홈페이지에 공개된 기존 시공사례를 전부 정리한다는 다른 약속이다. 이 약속은 이번 정책 변경과 무관해서 유지했고, 제목만 있던 2곳은 "월 1건" 옆에서 영상까지 포함하는 말로 읽히지 않도록 "**기존** 시공사례 건수 제한 없음"으로 바꿨다. 이 약속도 빼고 싶다면 `lib/pricing-page.ts`의 `ASSURANCES` · `COMMON_SCOPE`와 FAQ 2문항이다.

3. **HOME 선택 도우미의 플랜 줄에 한 줄을 추가했다.** HOME 가격 영역은 가격 카드를 반복하지 않는 구조라(기존 테스트가 고정), Core / Growth 차이를 말하는 곳은 "운영은 어디까지 필요한가요?"의 문장 3개뿐이다. 문장은 대표님의 말투 그대로 두고, 그 아래에 포함 범위를 한 줄씩 넣었다. 이번 작업에서 HOME에 새로 생긴 요소는 이것 하나다. 같은 컴포넌트를 쓰는 /pricing에도 똑같이 나온다.

4. **비교표의 영상 행은 ✓가 아니라 값이다.** Core도 포함이라 ✓ / ✓ / ✓로는 차이가 보이지 않는다. 그 행만 "월 1건 / 신규 시공사례 기준 확대 제공 / Growth와 동일"을 글자로 보여준다. 휴대폰은 칸이 62px라 Growth 칸을 "확대 제공"으로 줄였다. "Growth와 동일"은 따로 적은 문구가 아니라, Managed 칸이 Growth 칸과 같은 값일 때 표가 스스로 만드는 표시다. Managed에만 다른 수량을 넣으면 테스트가 실패한다.

5. **플랜 태그 3개를 한 형태로 맞췄다.** 운영 기본형 / 영상 활용 + 분석 강화형 / 함께 검토 · 개선하는 관리형. TASK 7의 구조(기본형 → 콘텐츠 활용 + 분석 강화형 → 관리형)를 따랐다. Managed는 "사람이 같이 운영하는"이 대신 운영해주는 것으로 읽힐 수 있어, 기존에 검토를 거친 "함께 검토 · 개선"을 살렸다.

6. **"맛보기"는 쓰지 않았다.** TASK 7의 "Core: 영상 맛보기"는 구조 설명으로 받아들였다. 고객 문구에서는 Core가 덜어낸 플랜으로 읽히지 않게 "월 1건"이라는 사실만 적었다.

7. **만드는 방식은 "제작합니다 · 만듭니다"로만 썼다.** "자동 제작" · "영상 생성"은 어디에도 없다. 누가 어떤 과정으로 만드는지는 이 repo에서 확인할 수 없어서, 이전부터 있던 "업체가 제공하는 실제 시공 자료로 제작합니다"만 남겼다.

8. **Founding Partner 제목을 "우선 혜택"에서 "추가 혜택"으로 바꿨다.** 가격 페이지의 파트너 띠에는 제목만 나온다. "3D 시공사례 우선 적용" 옆의 "우선 혜택"은 아직 없는 기능의 선공개처럼 읽혔다.

---

## 5. 테스트

`npm test` 36/36.

| 이름 | 확인하는 것 |
|---|---|
| PRICING-VIDEO-1 | Core 카드 · 선택 도우미 · 비교표 2행에 AI Portfolio Video 월 1건 |
| PRICING-VIDEO-2 | Growth = Core 전체 포함. Core에 있는 비교표 행은 모두 Growth에도 있다 |
| PRICING-VIDEO-3 | Growth의 영상 문구는 전부 "확대 · 넉넉 · 넓어 · 강화"로 말한다. "Growth부터 · 전용 · Portfolio Video까지" 없음 |
| PRICING-VIDEO-4 | Managed = Growth 전체 포함. 영상 칸은 Growth와 같은 값, Managed 자체 문구에 영상 수량 없음 |
| PRICING-VIDEO-5 | HOME Quick Value badge = "Core 월 1건부터". `lib/home.ts` · `QuickValue.tsx`에 Growth 없음 |
| PRICING-VIDEO-6 | FAQ 질문 · 답이 정책과 일치, 수량은 가격표에서 읽음, 이전 답 없음 |
| PRICING-VIDEO-7 | "무제한" 없음, Growth 전용 문구 없음, "3D Portfolio Video" · "자동 제작" 없음, "건수 제한 없음"은 기존 · 공개 시공사례 문장에만 |
| PRICING-VIDEO-8 | 구축비 4개 · 월 이용료 3개의 표시 금액이 그대로 |
| (이름 없음) | 고객에게 나가는 코드에 quota · usage · credit · 차감 · 사용량이 없고 API route가 없다 |

---

## 6. 확인이 필요한 것

이 repo에서 정할 수 없어 문구에 넣지 않은 것들이다. 정해지면 한 줄씩 추가하면 된다.

1. **Core 월 1건의 세부 기준.** 쓰지 않은 달의 건수가 이월되는지, 한 건이 영상 1개인지 시공사례 1건인지. 지금 문구는 "월 1건"이라고만 한다.
2. **Growth "신규 시공사례 기준"의 운영 기준.** 수동으로 관리하는 동안 어디까지를 정상적인 신규 등록으로 볼지. 고객 문구에는 숫자가 없다.
3. **제작 방식과 소요 시간.** 누가 만들고 요청 후 얼마나 걸리는지. 지금은 "업체가 제공하는 실제 시공 자료로 제작합니다"뿐이다.
4. **AI Portfolio Video 실제 sample.** 공개해도 되는 결과물 영상 1개와 poster를 `public/`에 넣고 `lib/site.ts`의 `PORTFOLIO_VIDEO_SAMPLE`에 경로 · 크기를 적으면 HOME 가격 요약 · /pricing Growth 카드 · /pricing/details AI Portfolio Video 블록 3곳에 나온다. 캡션은 이미 "Core 월 1건부터 제공"이다.
5. **Founding Partner의 "영상 관련 추가 혜택".** 내용이 정해지지 않아 구체적인 것을 적지 않았다.

이번 변경과 무관하게 본 것 하나: 821px · 1101px에서 `/pricing/details`의 구축 방식 비교표 머리칸(Quick Start badge)과 HOME 작동 방식의 단계 이름 한 곳이 자기 칸보다 넓게 측정됐다. 수정 전에도 같았을 컴포넌트이고 이번에 건드리지 않았다. 실제로 보이는 문제인지는 확인하지 않았다.

---

## 7. 마지막 질문

**1. Core에서 AI Portfolio Video를 사용할 수 있는가?**
있다. Core 카드(/pricing · /pricing/details), 비교표, FAQ, HOME의 Quick Value와 선택 도우미가 모두 그렇게 말한다.

**2. Core 제한은 무엇인가?**
월 1건. `lib/pricing.ts`의 `VIDEO.core` 한 곳에서 정한다.

**3. Growth는 Core와 무엇이 다른가?**
Core 전체에 두 가지가 더해진다: 방문자 분석(4개 항목)과 AI Portfolio Video 활용 범위 확대(월 1건 → 신규 시공사례 기준 확대 제공). 영상이 Growth에서 처음 생긴다고 읽히는 문구는 없다.

**4. Managed는 Video 정책이 어떻게 되는가?**
Growth와 동일하다. 별도 수량을 약속하지 않는다. Managed가 더하는 것은 사람이 함께 하는 운영 지원 6개 항목이다.

**5. HOME에서 Growth-only처럼 보이는 문구가 남아 있는가?**
없다. Quick Value badge는 "Core 월 1건부터"이다. HOME에서 Growth라는 단어는 선택 도우미에만 나온다: Growth 줄의 플랜 이름(그 줄의 설명은 "Core 전체 포함 + 방문자 분석 + AI Portfolio Video 활용 범위 확대")과 Managed 줄의 "Growth 전체 포함".

**6. "건수 제한 없음"이나 "무제한" 표현이 남아 있는가?**
"무제한"은 없다. "건수 제한 없음 / 없이"는 영상에 대해서는 없고, 초기 구축 때 기존 공개 시공사례를 전부 정리한다는 약속으로 4곳에 남아 있다 (/pricing 1 · /pricing/details 2 · HOME FAQ 1). 4장 2번 참고.

**7. 실제 Portfolio Video sample이 public에 연결됐는가?**
아니다. repo에 기능 결과물 영상이 없어 `PORTFOLIO_VIDEO_SAMPLE = null`을 유지했다. 대신 넣은 것도 없다.

**8. quota 시스템을 새로 만들었는가?**
아니다. counter · DB · billing · reset job · credit · 관리 화면 모두 없다. 바뀐 것은 문구와 그 문구를 보여주는 표시뿐이다.

**9. 가격 숫자는 하나라도 바뀌었는가?**
아니다. 구축비 4개와 월 이용료 3개 모두 그대로이고, 기존 "current prices" 테스트와 PRICING-VIDEO-8이 고정한다.
