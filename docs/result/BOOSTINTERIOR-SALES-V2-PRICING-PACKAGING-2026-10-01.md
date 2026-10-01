# BoostInterior Sales V2: 상품 패키징 + 가격 페이지 + Founding Partner + 브랜드 정리

`prompt` (BOOSTINTERIOR SALES V2 — PRODUCT PACKAGING + DEDICATED PRICING PAGE + FOUNDING PARTNER BENEFITS + BRAND CLEANUP)
결과 보고서, 2026-10-01 KST. [`BOOSTINTERIOR-PRICING-BRAND-2026-10-01.md`](./BOOSTINTERIOR-PRICING-BRAND-2026-10-01.md) 이후 작업이다.

랜딩을 다시 만들지 않았다. Hero, 제품 쇼케이스, 스토리 모션, 데모 흐름, CTA 구조는 그대로다. 바뀐 것은 가격 요약
섹션, 구축 방식 4가지, Founding Partner 블록의 위치와 내용, 헤더의 "가격" 링크, 그리고 새 `/pricing` 페이지다.

---

## Report

```
TASK = BOOSTINTERIOR SALES V2 — PRODUCT PACKAGING + PRICING PAGE + FOUNDING PARTNER + BRAND CLEANUP

LANDING_STATUS      = UPDATED (재디자인 없음). 가격 요약을 4 + 3 카드로 축소, Founding Partner를 Hero 바로 다음으로 이동,
                      구축 방식 A–D, 헤더 "가격" → /pricing
PRICING_PAGE_STATUS = NEW · LIVE  https://boost-interior-sales.vercel.app/pricing  (static, sitemap 포함, canonical /pricing)

CUSTOMER_BRAND = BoostInterior  (footer · 영상 엔딩: BoostInterior · by BoostWorks)

SETUP_PRICING:
  290000    A 기존 홈페이지 연동
  490000    B Quick Website
  1500000+  C 기존 홈페이지 맞춤 개선   ("부터")
  3000000+  D Custom Website           ("부터")
  (이전 700000 / 1500000 / 3000000 3단 구조는 폐기. production HTML에 700,000 = 0건)

MONTHLY:
  88000     Core
  198000    Growth
  297000    Managed

EXISTING_SITE_PORTFOLIO_LIMIT = NO FIXED COUNT
PUBLIC EXISTING PORTFOLIO     = ALL INITIAL ONBOARDING
                                ("포트폴리오 건수 제한 없음. 현재 홈페이지에 공개된 기존 포트폴리오 전체가 초기 구축 대상입니다."
                                 홈페이지에 없는 별도 자료는 "범위를 확인한 뒤 안내"로만 적었다.)

QUICK_WEBSITE = 490,000원. 검증된 표준 템플릿으로 제작하는 새 홈페이지 + BoostInterior 기본 연동.
                포함 14개: 템플릿 / 기본 페이지 · 섹션 구조 / 모바일 반응형 / 기본 SEO 구조 / 빠른 로딩 · 성능 기준 / HTTPS(SSL) /
                포트폴리오 구성 / 상담 · 견적 CTA / BoostInterior 기본 연동 / 관리자 CMS / 업체 기본정보 세팅 /
                기존 공개 포트폴리오 이전 / 필요한 기본 외부 연동 / 기본 QA
                "싸게 만들어서가 아니라, 표준화해서 빠르게 제작하기 때문에 49만원입니다."

CORE    = 월 88,000원 · "시스템 사용". 24시간 AI 상담 / 업체 정보 기반 답변 / 상담 전문지식 관리 기능 / 방문자의 공사 조건 이해 /
          실제 시공사례 검색 / 관련 포트폴리오 추천 / 사진 · 시공사례 연결 / 상담 맥락 유지 / 견적 문의 수집 / 상담 기록 확인 /
          기본 시스템 운영
GROWTH  = 월 198,000원 · "성장 기능". Core 전체 포함 + 방문자 행동 분석 / 방문 페이지 분석 / 주요 클릭 분석 / 체류 · 이탈 흐름 분석 /
          상담 시작 분석 / 포트폴리오 확인 흐름 / 견적 문의 전환 흐름 / AI Portfolio Video 제작 지원 · 건수 제한 없음
          + "AI Portfolio Video는 업체가 제공하는 실제 시공 자료 기준입니다."
MANAGED = 월 297,000원 · "사람이 함께 운영". Growth 전체 포함 + 월 1회 방문 · 상담 데이터 리뷰 / AI 상담 응답 흐름 점검 /
          자주 묻는 질문 · 응답 개선 / 전문 상담지식 업데이트 지원 / 포트폴리오 업데이트 지원 / 상담 · 견적 CTA 흐름 점검 /
          전환 동선 개선 제안 / 월간 개선 포인트 정리 / 우선 지원
          + "실제 작업 범위는 계약 및 운영정책에 따라 정해집니다."

FOUNDING_PARTNER = 랜딩 Hero 바로 다음(#partner), 혜택 카드 6장 (3 × 2 / 2열 / 1열).
                   플랫폼 우선 입점 / 기본 입점비 12개월 무료 / AI Portfolio Video 우선 혜택 / 3D Portfolio 우선 적용 /
                   신규 기능 우선 이용 / 초기 파트너 전용 할인 · 무료 이용 혜택
                   /pricing에는 같은 6개 제목의 요약 밴드 + "초기 파트너 혜택 자세히 보기" → /#partner
                   할인율 · Credit 금액 · 출시일 같은 숫자는 넣지 않았다 (정해진 값이 없다).

PLATFORM_FREE_LISTING = 12 MONTHS BASIC LISTING FEE
                        "플랫폼 출시 시 초기 파트너는 기본 입점비가 12개월 동안 무료입니다."
                        "무료 혜택은 기본 입점비에 한하며, 광고 · 프리미엄 노출 등 추가 상품은 포함되지 않습니다."

3D_CURRENT_PLAN       = NOT INCLUDED IN CURRENT GROWTH   (플랜 카드 · 비교표 어디에도 없음)
3D_FOUNDING_BENEFIT   = PRIORITY ACCESS                  ("3D Portfolio 우선 적용", 출시 일정은 적지 않음)
PORTFOLIO_VIDEO_GROWTH = YES                             (Growth · Managed. 건수 제한 없음, 업체가 제공하는 실제 시공 자료 기준)

BOOSTCHAT_VISIBLE_LANDING         = NO   (production HTML · /pricing HTML: BoostChat / boostchat 0건. title · meta · OG · alt · aria 포함)
BOOSTCHAT_VISIBLE_VIDEO           = 위젯의 "Powered by boostchat" 줄만 남음 (소유자 결정으로 유지, 2026-10-01). 그 외 NO:
                                    엔딩 카드 → "BoostInterior · by BoostWorks" (boostchat.co.kr 없음),
                                    관리 화면 사이드바의 "BoostChat" 라벨은 화면 밖으로 프레이밍
BOOSTCHAT_VISIBLE_DEMO            = 위젯의 "Powered by boostchat" 줄만 남음 (같은 결정으로 유지). 그 외 NO:
                                    푸터 고지 "BoostChat 기능 시연…" → "BoostInterior 기능 시연…", 라이브 13개 페이지 모두 반영
BOOSTCHAT_VISIBLE_EMAIL_THUMBNAIL = 위젯의 "Powered by boostchat" 줄만 남음 (같은 결정으로 유지). 파일 변경 없음.
                                    썸네일에 있던 옛 이름은 원래 그 줄 하나뿐이었다

VAT_POLICY          = UNDECIDED   ("VAT 포함 / 별도" 표기 없음. production HTML에 VAT · 부가세 0건)
VAT_POLICY_REQUIRED = YES         (소유자 결정 필요)
ANNUAL_PRICING      = NOT PUBLISHED

TYPECHECK = PASS   (next typegen && tsc --noEmit)
LINT      = PASS   (eslint, 0 problems)
BUILD     = PASS   (next build, 10/10 static routes, /pricing 포함)

GIT = 3744801  feat: expand BoostInterior pricing and partner packaging
      52dfb0e  feat: rebrand sales video end card as BoostInterior
      + 이 보고서의 docs 커밋
      main → origin/main fast-forward push, force 없음. `prompt` 파일의 로컬 수정은 커밋하지 않았다.
      데모 사이트 (별도 저장소 web-recon-track-b, branch track-b/static-deployment-foundation, push하지 않음):
      a87bbdc  fix(site): name BoostInterior in interior demo disclosure
      1da1658  build(site): publish BoostInterior-named interior demo package
      d325ac0  docs(site): record interior demo product rename

VERCEL = READY (Production)   52dfb0e → GitHub status "Vercel = success"
         https://boost-interior-sales-e8l60ctdp-vnfm0580s-projects.vercel.app
         (3744801 → dpl_9zgNp48Qz9povcaSLoNa6XyjGw9E, success)
         이 보고서의 docs 커밋도 Production 배포를 하나 더 만든다 (코드 · 에셋 변경 없음).

PRODUCTION_HOME    = https://boost-interior-sales.vercel.app
PRODUCTION_PRICING = https://boost-interior-sales.vercel.app/pricing
PRODUCTION_QA      = ALL PASS   (아래 "Responsive evidence")
```

---

## Changed files

**`3744801` feat: expand BoostInterior pricing and partner packaging** (19 files, +1534 / −250)

| 파일 | 내용 |
| --- | --- |
| `lib/pricing.ts` | 가격의 단일 출처. `SETUP_OPTIONS` A–D, `PLANS` Core / Growth / Managed, `COMPARISON`(6개 카테고리), `won()`, `manwon()` |
| `lib/pricing-page.ts` (new) | /pricing 전용 카피: 29만원 포함 범위 4그룹, 구축 과정 7단계, Quick Website 칩 6개, 49 vs 150, FAQ 8개 |
| `lib/partner.ts` (new) | Founding Partner 혜택 6개와 조건 문구 |
| `lib/site.ts` | `PRICING_PATH`, `PRICING_TITLE`, `PRICING_DESCRIPTION`, `PARTNER_ID`, `PORTFOLIO_VIDEO_SAMPLE = null` |
| `app/pricing/page.tsx` (new) | /pricing 라우트와 metadata (부모의 OG / Twitter 이미지 상속) |
| `components/pricing/PricingIntro.tsx` (new) | Hero, "비용은 두 가지로 나뉩니다" |
| `components/pricing/SetupSection.tsx` (new) | 구축 방식 4개 상세, 29만원 설명 · 과정, Quick Website, 49 vs 150 |
| `components/pricing/PlanSection.tsx` (new) | 플랜 3개 전체 기능, AI Portfolio Video 설명, 비교표(데스크톱 표 / 모바일 아코디언) |
| `components/pricing/PricingClosing.tsx` (new) | Founding Partner 밴드, FAQ, 마지막 CTA |
| `components/landing/Pricing.tsx` | 랜딩 가격 요약: STEP 01 카드 4장, STEP 02 카드 3장, CTA 2개 |
| `components/landing/Partner.tsx` | Founding Partner 혜택 카드 그리드 |
| `components/landing/InstallPaths.tsx` | 구축 방식 2개 → A–D 4개 |
| `components/landing/SiteHeader.tsx` | `page` prop. "가격" → `/pricing`, /pricing에서는 로고 → `/`, 섹션 링크 → `/#…` |
| `components/landing/SiteFooter.tsx` | `note` prop (/pricing에서는 생략) |
| `components/ui/Button.tsx` | 내부 경로(`/…`)는 `next/link`로 렌더 |
| `components/ui/CheckList.tsx`, `components/ui/Icon.tsx` (new) | 체크 목록, 1.5px 라인 아이콘 |
| `app/page.tsx` | 섹션 순서: Hero → **Partner** → Problem → … |
| `app/sitemap.ts` | `/pricing` 추가 |

**`52dfb0e` feat: rebrand sales video end card as BoostInterior**

| 파일 | 내용 |
| --- | --- |
| `public/video/master-sales.mp4`, `source-assets/videos/master-sales.mp4` | 86.6초 영상 재렌더 (아래 "Video") |
| `source-assets/videos/master-sales-edit/` (new) | 편집 목록(EDL), 엔딩 카드 스크립트, 렌더러 패치, README |

`public/images/email/video-thumbnail.*`, `app/opengraph-image.jpg`, `app/twitter-image.jpg`, 제품 캡처 PNG는 손대지 않았다.

---

## Exact pricing copy

### 랜딩 `#pricing` (요약)

- 도입 비용 · **구축 방식과 운영 플랜을 각각 선택합니다.** · 처음 한 번의 구축비와 매월의 운영 플랜으로 나뉩니다. 두 가지는 서로 독립적으로 고를 수 있습니다.
- **01 초기 구축** · 홈페이지 상태에 맞는 구축 방식을 한 번 선택합니다.

| | 이름 | 가격 | 한 줄 설명 | 카드의 핵심 3가지 |
| --- | --- | --- | --- | --- |
| A | 기존 홈페이지 연동 | 29만원 | 지금 홈페이지는 그대로 두고, 업체 전용 BoostInterior 상담 시스템을 구축합니다. | 공개된 기존 포트폴리오 전체 수집 · 구조화 / AI 시공사례 검색 · 추천 연결 / 상담 → 견적 문의 흐름 구성 |
| B | Quick Website | 49만원 | 검증된 표준 구조로 빠르게 새 홈페이지를 제작하고 BoostInterior까지 함께 연결합니다. | 검증된 표준 템플릿으로 빠른 제작 / 모바일 · SEO · 속도 · CMS 기본 제공 / BoostInterior 기본 연동 |
| C | 기존 홈페이지 맞춤 개선 | 150만원부터 | 현재 사이트를 유지하면서 디자인 · 포트폴리오 · 상담 전환 구조를 맞춤 개선합니다. | 기존 사이트 진단 후 범위 확정 / UX · 모바일 · 상담 CTA 개선 / BoostInterior 통합 |
| D | Custom Website | 300만원부터 | 브랜드와 콘텐츠 구조부터 새롭게 설계하는 맞춤 홈페이지 + BoostInterior 구축입니다. | 브랜드 기반 맞춤 디자인 / 정보구조 · UX · 포트폴리오 구조 설계 / CMS · SEO · BoostInterior 포함 |

- **02 운영 플랜** · 필요한 기능과 운영 수준을 매월 선택합니다.

| 플랜 | 태그 | 가격 | 카드의 핵심 |
| --- | --- | --- | --- |
| Core | 시스템 사용 | 월 88,000원 | 24시간 AI 상담 / 실제 시공사례 검색 · 추천 / 견적 문의 수집 · 상담 기록 확인 |
| Growth | 성장 기능 | 월 198,000원 | Core 전체 포함 / 방문자 행동 · 전환 흐름 분석 / AI Portfolio Video · 건수 제한 없음 |
| Managed | 사람이 함께 운영 | 월 297,000원 | Growth 전체 포함 / 월 1회 방문 · 상담 데이터 리뷰 / 응답 · 전환 동선 개선 지원 / 우선 지원 |

- CTA: **가격과 포함 범위 자세히 보기** → `/pricing` · **내 홈페이지 기준으로 상담받기** → 카카오톡 오픈채팅
- 랜딩 카드는 "29만원" 표기, /pricing은 "290,000원" 표기다. 금액은 모두 `lib/pricing.ts` 한 곳에서 나온다.

### `/pricing`

1. **Hero** — BoostInterior Pricing · **필요한 만큼만 구축하고, 필요한 만큼만 운영하세요.** · CTA "내 홈페이지 기준으로 추천받기"(카카오) / "실제 데모 보기"
2. **비용은 두 가지로 나뉩니다.** — [한 번만] 초기 구축비 · 우리 업체에 맞게 처음 세팅하는 비용 · 290,000원부터 **+** [매월] 월 운영료 · 구축된 시스템을 계속 사용하는 비용 · 월 88,000원부터
3. **01 초기 구축 · 한 번** — 4개 방식 바로가기, 방식마다 가격 · 대상 · 포함 범위 전체
   - A 기존 홈페이지 연동 **290,000원** (13개 항목, 4그룹) + 구축 과정 7단계
   - B Quick Website **490,000원** (14개 항목) + 기능 칩 6개 + 49 vs 150 설명
   - C 기존 홈페이지 맞춤 개선 **1,500,000원부터** (11개 항목) · "작업 범위에 따라 비용이 달라집니다. 사이트를 진단한 뒤 범위와 비용을 먼저 안내해드립니다."
   - D Custom Website **3,000,000원부터** (12개 항목) · "추가 특수 기능은 범위에 따라 별도로 협의합니다."
4. **02 운영 플랜 · 매월** — Core / Growth / Managed 전체 기능, AI Portfolio Video 설명, 플랜별 차이 비교
5. **Founding Partner** 요약 밴드 → `/#partner`
6. **자주 묻는 질문** 8개
7. **마지막 CTA** — 우리 홈페이지에는 어떤 구축 방식이 맞을까요? · "내 홈페이지 기준으로 추천받기" / "실제 데모 보기"

결제 · 가입 · 폼은 없다. 모든 전환은 카카오톡 1:1 상담과 라이브 데모로 간다.

---

## 290,000원의 가치 설명

"챗봇 설치비"라는 말은 쓰지 않았다 (production 0건). 카드의 범위 라벨은 **업체 전용 상담 시스템 초기 구축**이다.

- 강조 문구: **스크립트 하나만 설치하는 비용이 아닙니다.** 현재 홈페이지의 업체 정보와 시공사례를 BoostInterior가 실제 상담에 사용할 수 있도록 업체 전용 시스템으로 구축합니다.
- 포함 범위 13개 (4그룹)
  - 홈페이지 · 업체 정보: 기존 홈페이지 구조 확인 / 업체 기본정보 초기 세팅 / 상담 전문정보 초기 세팅
  - 포트폴리오 데이터: 홈페이지에 공개된 기존 포트폴리오 전체 수집 / 기존 시공사례 구조화 / 지역 · 평형 · 공간 · 스타일 · 공사범위 검색 데이터 구성
  - AI 상담 연결: AI 시공사례 검색 연결 / 실제 포트폴리오 추천 흐름 연결 / 상담 → 견적 문의 흐름 구성
  - 설치 · 검수: BoostInterior 위젯 연결 / 고객 도메인 연결 · 허용 설정 / 모바일 포함 기본 동작 QA / 초기 데이터 검수
- **포트폴리오 건수 제한 없음.** 현재 홈페이지에 공개된 기존 포트폴리오 전체가 초기 구축 대상입니다. 홈페이지에 없는 별도 자료의 정리는 범위를 확인한 뒤 안내해드립니다.
- 구축 과정 7단계: 홈페이지 확인 → 업체 정보 정리 → 포트폴리오 수집 → 시공사례 구조화 → AI 검색 연결 → 견적 흐름 연결 → 설치 및 QA
- FAQ 첫 질문 "29만원은 단순 설치비인가요?" → "아닙니다. 스크립트 한 줄을 넣는 비용이 아니라 업체 전용 상담 시스템을 처음 구축하는 비용입니다. …"

## Quick Website 범위

- 표준화 · 템플릿 기반이라는 점을 숨기지 않았다: "검증된 표준 구조에 맞춰 제작합니다. 브랜드와 구조부터 새로 설계하려면 Custom Website가 적합합니다."
- 기능 칩 6개: Responsive(모바일 반응형) / SEO(기본 SEO 구조) / Speed(빠른 로딩 · 성능 기준) / CMS(관리자 CMS) / Portfolio(포트폴리오 구성) / BoostInterior(AI 상담 기본 연동)
- **싸게 만들어서가 아니라, 표준화해서 빠르게 제작하기 때문에 49만원입니다.**
- 데모 CTA 라벨은 "BoostInterior 실제 데모 보기"다. 라이브 데모를 "Quick Website 예시"라고 부르지 않았다. 그 사이트가 Quick Website 상품으로 만든 것이라는 근거가 저장소에 없기 때문이다.

## 150만원 vs 49만원

Quick Website 블록 바로 아래 콜아웃과 FAQ 양쪽에 같은 답이 있다.

> **새 홈페이지가 49만원인데, 기존 홈페이지 개선은 왜 150만원부터인가요?**
> - Quick Website — 검증된 구조에 맞춰 빠르게 제작. 검증된 표준 구조와 템플릿을 사용해 제작 과정을 표준화했습니다. 그래서 빠르고 합리적인 가격으로 제공할 수 있습니다.
> - 기존 홈페이지 맞춤 개선 — 현재 홈페이지에 맞춰 직접 수정. 현재 사용 중인 기술, 디자인, URL, 콘텐츠, 페이지 구조를 유지하면서 업체마다 다른 문제를 직접 수정해야 하므로 맞춤 작업 범위가 커집니다.

## 월 플랜 비교

데스크톱(821px 이상)은 카테고리별 표 하나, 모바일(820px 이하)은 카테고리별 아코디언 6개(첫 번째만 열림)다. 포함 여부는 체크 아이콘과
화면 낭독기용 "포함 / 미포함" 텍스트로 함께 표시한다.

| 카테고리 | 항목 | Core | Growth | Managed |
| --- | --- | :-: | :-: | :-: |
| AI 상담 | 24시간 AI 상담 / 업체 정보 기반 답변 / 상담 전문지식 관리 기능 / 방문자의 공사 조건 이해 / 상담 맥락 유지 | ✓ | ✓ | ✓ |
| 포트폴리오 | 실제 시공사례 검색 / 관련 포트폴리오 추천 / 사진 · 시공사례 연결 | ✓ | ✓ | ✓ |
| 견적 문의 | 견적 문의 수집 / 상담 기록 확인 | ✓ | ✓ | ✓ |
| 방문자 분석 | 방문자 행동 분석 / 방문 페이지 · 주요 클릭 분석 / 체류 · 이탈 흐름 분석 / 상담 시작 · 포트폴리오 확인 · 견적 문의 전환 흐름 | — | ✓ | ✓ |
| Portfolio Video | AI Portfolio Video 제작 지원 · 건수 제한 없음 | — | ✓ | ✓ |
| 운영 지원 | 기본 시스템 운영 | ✓ | ✓ | ✓ |
| 운영 지원 | 월 1회 방문 · 상담 데이터 리뷰 / AI 상담 응답 흐름 점검 · 응답 개선 / 전문 상담지식 · 포트폴리오 업데이트 지원 / 상담 · 견적 CTA 흐름 점검 · 전환 동선 개선 제안 / 월간 개선 포인트 정리 / 우선 지원 | — | — | ✓ |

AI Portfolio Video 블록: "완성된 시공사진을 단순한 갤러리로 끝내지 않고, 공간을 따라 이동하는 형태의 영상 포트폴리오로 보여줄 수 있도록
지원합니다." 실제 샘플 영상이 없어서 미리보기는 넣지 않았다. `lib/site.ts`의 `PORTFOLIO_VIDEO_SAMPLE`에 실제 에셋을 지정하면 그 자리에
플레이어가 나타난다.

## Founding Partner 위치와 문구

- 랜딩 순서: Hero → **Founding Partner** → Problem → 스토리 장면 → 모바일 → 데모 영상 → Before / After → Why → 설치 → 구축 방식 → 라이브 데모 → 가격 → 문의. Hero보다 앞에 오지 않는다.
- Eyebrow "Founding Partner · 초기 파트너 혜택", 제목 "지금 도입하는 업체는 초기 파트너 혜택을 먼저 받습니다.", CTA "초기 파트너로 도입 상담받기"
- 카드 6장 (아이콘 + 짧은 제목 + 1–2줄)

| 제목 | 본문 |
| --- | --- |
| 플랫폼 우선 입점 | 향후 BoostInterior 인테리어 플랫폼에 초기 파트너로 우선 입점합니다. 기존 업체 정보와 포트폴리오의 초기 이전 · 세팅도 지원합니다. |
| 기본 입점비 12개월 무료 | 플랫폼 출시 시 초기 파트너는 기본 입점비가 12개월 동안 무료입니다. |
| AI Portfolio Video 우선 혜택 | 시공사진을 영상 포트폴리오로 보여주는 기능을 초기 파트너가 먼저 사용합니다. |
| 3D Portfolio 우선 적용 | 공간형 3D Portfolio가 준비되면 초기 파트너에게 먼저 적용 · 사용 기회를 드립니다. |
| 신규 기능 우선 이용 | 방문자 분석, AI 상담 확장, 포트폴리오 · 전환 기능 등 새로운 기능을 먼저 경험합니다. |
| 초기 파트너 전용 할인 · 무료 이용 혜택 | 새 유료 기능이 출시되면 전용 할인과 무료 이용 기간 · Credit, 전용 프로모션 혜택을 드립니다. |

- 조건 문구: "무료 혜택은 기본 입점비에 한하며, 광고 · 프리미엄 노출 등 추가 상품은 포함되지 않습니다. 세부 혜택은 플랫폼과 각 기능 출시 시 운영정책에 따라 안내됩니다."
- production HTML 0건: 평생 무료 / 평생 / 영구 최상단 / 최상단 / 항상 우선 추천 / 광고비 평생 무료

---

## Brand cleanup evidence

Production HTML 기준 (2026-10-01, `curl` 원본):

```
/         BoostChat = 0   boostchat = 0   BOOSTCHAT = 0   BoostInterior = 89   by BoostWorks = 2
/pricing  BoostChat = 0   boostchat = 0   BOOSTCHAT = 0   BoostInterior = 70   by BoostWorks = 2

/         <title> BoostInterior | 인테리어 업체를 위한 AI 상담·견적 시스템
/pricing  <title> BoostInterior 가격 | 인테리어 AI 상담 시스템 구축·운영 비용
          description  기존 홈페이지 연동 29만원부터, Quick Website 49만원, Core 월 88,000원부터. BoostInterior 구축 방식과 운영 플랜의 포함 범위를 확인하세요.
          canonical    https://boost-interior-sales.vercel.app/pricing
          og:image / twitter:image  랜딩과 같은 BoostInterior 이미지 (부모 metadata에서 상속)
```

소스: `grep -rni boostchat app components lib public` = 0건 (텍스트 파일 기준).

| Surface | 상태 |
| --- | --- |
| Landing HTML · `/pricing` · metadata · aria · alt | BoostChat 0건 |
| OG / Twitter 이미지 | 이전 작업에서 BoostInterior로 교체됨, 이번에 변경 없음 |
| 86초 영상 | 엔딩 카드와 관리 화면 라벨 정리 (아래) |
| 영상 poster (`scene-01` 확대 facade) | 변경 없음. 옛 이름 없음 |
| 이메일 썸네일 | 변경 없음. 남아 있는 것은 위젯의 "Powered by boostchat" 줄뿐 (유지 결정) |
| Live Demo (`interior-demo.boostweb.co.kr`) | 푸터 고지의 BoostChat → BoostInterior. 페이지에 보이는 BoostChat 0건 (아래 "Live demo") |
| 위젯 UI | "Powered by boostchat" 줄은 유지 (소유자 결정). 그 외 위젯 화면에 BoostChat 표기 없음 |

소유자 확인 (2026-10-01, 작업 중): **상담창 하단의 "Powered by boostchat"은 그대로 둬도 된다. 정리 대상은 그 외의 BoostChat 표기다.**
그래서 그 줄을 가리기 위한 편집은 하지 않았고, 위젯 branding은 blocker로 보지 않는다. 참고로 그 줄은 boostchat 위젯
(`src/components/widget/WidgetFrame.tsx`, `HostedChatPage.tsx`)에 고정 문자열로 들어 있고, 테넌트별로 끄는 설정은 없다.

## Video

`public/video/master-sales.mp4` — 1920 × 1080, 30fps, 86.6초, 9,635,410 B (이전 9,656,822 B). 길이가 같아서 `VIDEOS.master`와
"1분 26초" 표기는 그대로다.

원본 캡처 프레임에서 다시 렌더했고, 두 군데만 바꿨다.

| 구간 | 이전 | 이후 |
| --- | --- | --- |
| 엔딩 카드 1:21.1–1:26.6 | **BoostChat** · boostchat.co.kr | **BoostInterior** · by BoostWorks |
| 사업자 관리 화면 1:08.1–1:21.1 | 사이드바 맨 위에 플랫폼 라벨 "BoostChat" | 업체명 줄부터 보이도록 창을 프레이밍 (위쪽 31 CSS px가 화면 밖) |

- 검증: 이전 파일과 프레임 단위로 비교했다. 0:00–1:08.3은 인코더 노이즈 수준(480 × 270 축소 기준 평균 차이 0.49 이하)으로 같고,
  차이는 1:08.3 이후에만 있다. 68.3 / 70 / 73.3 / 77 / 80.5 / 81.3 / 84.5 / 86.3초 프레임을 직접 열어 확인했다.
- 검은 박스나 덧칠은 없다. 관리 화면은 crop이고, 엔딩 카드는 원래도 합성 카드였다. 제품 화면 픽셀은 다시 그리지 않았다.
- 실제 UI를 BoostInterior로 바꿔 다시 촬영하는 방식은 쓰지 않았다. 영상에서 옛 이름이 나오던 제품 화면은 관리 화면 사이드바 라벨
  하나였고, 이는 프레이밍으로 해결됐다. 재촬영은 운영 데모 테넌트에 실제 대화와 문의를 다시 만들어야 해서 얻는 것보다 위험이 컸다.
- Production 확인: `https://boost-interior-sales.vercel.app/video/master-sales.mp4` sha256 `1e69c3e9…871f965` = 저장소 파일과 동일.
- 편집 목록 · 엔딩 카드 스크립트 · 렌더러 패치는 `source-assets/videos/master-sales-edit/`에 있다.

## Email thumbnail

`public/images/email/video-thumbnail.jpg` (84,921 B) / `.webp` (39,556 B) — **변경 없음**, 경로 그대로, production 200.

썸네일에 있던 옛 이름은 상담창 아래 "Powered by boostchat" 줄 하나였다. 그 줄은 유지해도 된다는 확인을 받았으므로 다시 만들 이유가
없어졌고, 아웃바운드 메일에서 쓰는 파일이라 건드리지 않는 쪽이 안전하다. 썸네일 구도(데모 홈페이지 + 상담창 + 재생 버튼 +
"86초 실제 작동 영상")는 새 영상과도 맞는다.

## Live demo

`https://interior-demo.boostweb.co.kr` — 소유 저장소는 `woopsmarketing/web-recon`, 공식 작업본은
`/Users/woops/projects/web-recon-track-b` (branch `track-b/static-deployment-foundation`)이다. 수정 전에 라이브 HTML이 그 저장소의
현재 패키지와 byte 단위로 같은지 확인해서 소유 저장소를 확정했다.

데모 사이트에서 고객에게 보이던 BoostChat은 두 곳이었다.

| 위치 | 조치 |
| --- | --- |
| 모든 페이지 푸터의 고지문 | **변경 · 배포 완료** |
| 위젯 iframe 안의 "Powered by boostchat" | 유지 (소유자 결정). iframe을 CSS로 건드리는 방식은 쓰지 않았다 |

푸터 고지문 (`data/sites/boost-interior-demo/slots.json` → `site.footer.notice`), 단어 하나만 바꿨다:

- 이전: 부스트 인테리어는 **BoostChat** 기능 시연을 위한 가상 인테리어 브랜드입니다. 포트폴리오·후기는 데모용 예시이고, 사진은 AI로 생성한 예시 이미지입니다.
- 이후: 부스트 인테리어는 **BoostInterior** 기능 시연을 위한 가상 인테리어 브랜드입니다. 포트폴리오·후기는 데모용 예시이고, 사진은 AI로 생성한 예시 이미지입니다.

- 배포는 그 저장소의 기존 절차 그대로 했다: build → dry-run `--check-store` → upload `--no-activate` → `--reverify` →
  `--expect-live b10d430b… --expect-package e562dedd…`로 활성화. 새 패키지 `e562dedd…` (build `01f7ac78…`), 이전 패키지
  `b10d430b…`가 rollback 대상으로 남아 있다.
- 새 패키지는 이전 패키지와 71개 파일(html 15, txt 56)이 다르고, 차이는 고지문의 그 단어와 Next build id뿐이다. 위젯 `<script>` 태그,
  포트폴리오 문서(8건), 이미지 · JS · CSS는 byte 단위로 같다.
- 내부 식별자는 그대로다: 위젯 origin `boostchat.co.kr/widget.js`, script id, `data-boost-chat-key`, API host.
- 라이브 확인: sitemap 13개 페이지 모두 200, 새 고지문 1건 / 옛 고지문 0건. `/`는 패키지의 `index.html`과 sha256 동일.
  브라우저(1440, 390)에서 푸터 문구, 위젯 iframe 로드, overflow 0, console error 0, failed request 0.
- 테스트(그 저장소): tsc exit 0, publish 66/0, portfolio-production-truth 10/0, integration 85/0, predemo2 9/0, predemo 10/0, step6 34/0,
  detail-facts 25/0, ia150 15/0, ia151 10/0, ia152 14/0, slice1 86/0. assertion을 지우거나 느슨하게 만든 것은 없다.
- 그 저장소의 기록: `docs/result/INTERIOR-DEMO-PRODUCT-RENAME-2026-10-01.md` + proof 로그. 커밋 3개는 push하지 않았다
  (그 저장소의 이전 커밋들도 local 상태였다).
- 되돌리려면: `site:publish --site boost-interior-demo --host interior-demo.boostweb.co.kr --remote --rollback --expect-live e562dedd…`

---

## Responsive evidence

Production alias(`https://boost-interior-sales.vercel.app`) 기준, Playwright Chromium, 52dfb0e 배포 후 실행.

| Viewport | `/` | `/pricing` |
| --- | --- | --- |
| 1440 × 900 | overflow 0 · console 0 · failed 0 · broken img 0 · 영상 재생 | overflow 0 · console 0 · failed 0 · broken img 0 · 플랜 3열 · 비교표 |
| 1280 × 800 | 동일 | 동일 · 플랜 3열 · 비교표 |
| 1024 × 768 | 동일 | 동일 · 플랜 1열 · 비교표 |
| 768 × 1024 | 동일 | 동일 · 플랜 1열 · 아코디언 6 |
| 390 × 844 | 동일 | 동일 · 플랜 1열 · 아코디언 6 |
| 375 × 667 | 동일 | 동일 · 플랜 1열 · 아코디언 6 |
| 1440 × 900 reduced motion | 동일 | 동일 |
| 390 × 844 reduced motion | 동일 | 동일 |

- 16회 실행 모두: horizontal overflow 0, console error 0, failed request 0, broken image 0.
- 링크: 카카오 `https://open.kakao.com/o/sAS9ebQi` — `/` 5개, `/pricing` 3개. 데모 `https://interior-demo.boostweb.co.kr` — 각 3개.
  `/pricing` 링크와 Home 링크 정상. HTTP 200: `/`, `/pricing`, `/sitemap.xml`, OG 이미지, 이메일 썸네일 2개, 데모, 카카오.
- Client navigation(1440, 390): `/` → 헤더 "가격" → `/pricing`(맨 위에서 열림) → 구축 방식 바로가기 `#quick-website` → "초기 파트너 혜택 자세히 보기" → `/#partner` → 랜딩 가격 CTA → `/pricing` → 헤더 첫 링크 → `/`. 1440에서는 `/pricing` 헤더 "작동 방식" → `/#talk`까지. 이동 후에도 헤더 · reveal · 스토리 모션이 동작.
- 금액이 줄바꿈되거나 잘리는 카드 없음 (금액 노드 11개 검사). 모바일 390 / 375에서 Quick Website 칩은 2열.
- `/pricing` grep: 290,000 · 490,000 · 1,500,000 · 3,000,000 · 88,000 · 198,000 · 297,000 모두 존재. 1,500,000 / 3,000,000은 항상 "원부터"와 함께. 랜딩은 "150만원부터 / 300만원부터".
- 양쪽 0건: 700,000 · 19,000 · 49,000 · 99,000 · VAT · 부가세 · 연간.
- Founding 문구(랜딩 · /pricing 모두 존재): 초기 파트너 / 플랫폼 우선 입점 / 기본 입점비 12개월 무료 / AI Portfolio Video 우선 혜택 / 3D Portfolio 우선 적용 / 신규 기능 우선 이용 / 초기 파트너 전용 할인 · 무료 이용 혜택.

실제 iOS / Android 기기에서는 확인하지 않았다 (Playwright Chromium만).

---

## Known blockers / 소유자 결정이 필요한 것

1. **VAT 표시 정책 미정** — `VAT_POLICY_REQUIRED = YES`. 포함 / 별도 어느 쪽도 적지 않았다. 연간 가격도 넣지 않았다.
2. **데모 저장소 커밋은 push하지 않았다** — `web-recon-track-b`의 `a87bbdc`, `1da1658`, `d325ac0`는 local에만 있다. 라이브 사이트에는
   이미 반영됐다. 그 저장소의 통합 테스트는 `822ee12` 커밋에서 예전 패키지를 읽는다. 그 커밋이 rebase / amend로 바뀌면
   `platform/test/integration.test.ts`의 `DATA_TRUTH_PACKAGE_COMMIT`도 함께 고쳐야 한다.
3. **정해지지 않아 숫자를 넣지 않은 것** — 초기 파트너 할인율, 무료 이용 기간 · Credit 금액, 3D Portfolio와 플랫폼의 출시 일정,
   플랜 변경 규칙. FAQ "나중에 플랜을 변경할 수 있나요?"는 가능 여부를 단정하지 않고 상담으로 안내한다. 정책이 정해지면
   `lib/partner.ts`, `lib/pricing-page.ts`만 고치면 된다.
4. **AI Portfolio Video 샘플 없음** — 설명만 있고 미리보기는 없다. 가짜 샘플은 만들지 않았다.
5. **영상 캐시** — mp4는 `cache-control: max-age=86400`으로 서비스된다. 이전에 영상을 본 브라우저는 최대 하루 동안 예전 파일을 볼 수 있다.
6. **영상 원본 프레임 위치** — 재렌더에 쓴 캡처 프레임은 capture studio의 임시 scratchpad(`/private/tmp/…`)에 있고 이 저장소에는 없다.
   그 폴더가 지워지면 같은 편집을 다시 렌더할 수 없고 새로 촬영해야 한다. 보존하려면 그 폴더의 `takes/typed-212405`, `admin/take-215209`를 옮겨 둘 것.
7. **랜딩 캡처의 crop / fade는 그대로** — 이전 작업에서 "Powered by boostchat" 줄을 숨기려고 넣은 `CHAT_WINDOW` crop과 `PHONE_FADE`
   (휴대폰 화면 하단이 흐려짐)가 남아 있다. 그 줄을 유지해도 되므로 원한다면 `lib/assets.ts`의 `PHONE_FADE` / `PHONE_COMPOSITE_FADE`를
   빈 문자열로 바꿔 휴대폰 화면을 원래대로 되돌릴 수 있다. 요청 범위 밖이라 바꾸지 않았다.
8. **CTA 라벨** — prompt §4는 "내 홈페이지 기준으로 상담받기", §24는 "도입 상담받기"였다. 랜딩 가격 섹션에는 §4의 문구를 썼다.
9. **Quick Website 예시 사이트 없음** — 라이브 데모는 Quick Website 예시로 표기하지 않았다. 실제 Quick Website 사례가 생기면 그 블록의 CTA를 바꾸면 된다.
10. 이전 보고서에서 넘어온 것: favicon은 placeholder "B", 캡처는 1× PNG, production 도메인과 저장소 이름은 그대로.
