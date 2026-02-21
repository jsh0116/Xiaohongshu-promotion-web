# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # 개발 서버 실행
pnpm build        # 프로덕션 빌드 (TypeScript + ESLint 포함)
pnpm lint         # ESLint 실행
pnpm start        # 프로덕션 서버 실행
pnpm test:e2e     # Playwright E2E 테스트 (e2e/landing.spec.ts)
```

Node 24 필수 (`.nvmrc` 자동 적용), 패키지 매니저는 pnpm 9.

## Architecture

### Feature-Sliced Design (FSD) — 단방향 의존성

```
app → widgets → features → entities → shared
```

| 레이어 | 경로 | 역할 |
|---|---|---|
| `app` | `src/app/` | Next.js App Router 진입점, layout, API routes, SEO |
| `widgets` | `src/widgets/` | 독립 UI 섹션 (Header, HeroSection, PainSection, FeaturesSection, LeadFormSection, Footer) |
| `features` | `src/features/` | 유저 인터랙션 단위 (theme-toggle, locale-switcher, lead-capture, survey-popup, social-proof-toast, counter) |
| `entities` | `src/entities/` | 도메인 모델 (lead: 이메일 유효성 검증) |
| `shared` | `src/shared/` | 인프라·디자인 시스템 (types, constants, lib/cn, api, ui) |

> **주의**: FSD의 `pages` 레이어는 Next.js Pages Router(`src/pages/`)와 충돌하므로 사용하지 않음. 페이지 조합은 `src/app/[locale]/page.tsx`에서 직접 위젯을 조합.

### 페이지 조합 흐름

`src/app/[locale]/page.tsx` → HeroSection + PainSection + FeaturesSection + LeadFormSection + SocialProofToast

모든 레이아웃 래퍼(Header, Footer, ThemeProvider)는 `src/app/[locale]/layout.tsx`에 있음.

### Dark Mode (쿠키 기반, next-themes 미사용)

hydration mismatch 없이 구현:

1. `layout.tsx`: `cookies()`로 `theme` 쿠키 읽기 → `<html class="dark">` 서버 렌더
2. `ThemeProvider.tsx` (`'use client'`): `initialTheme` prop 수신, `useEffect`에서 localStorage 동기화
3. `ThemeToggle.tsx`: `useTheme()` → `classList.toggle + localStorage + cookie` 동시 업데이트
4. Tailwind v4 CSS: `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css`

### Lead 수집 아키텍처

`googleapis`가 클라이언트 번들에 포함되는 webpack 분석 문제를 회피하기 위해 Route Handler 분리:

```
LeadForm.tsx (client)
  → submitLead Server Action (src/shared/api/submitLead.ts)
    → fetch POST /api/lead
      → src/app/api/lead/route.ts  ← 여기서만 googleapis 사용
```

`serverExternalPackages: ["googleapis", "google-auth-library"]` in `next.config.ts`.
env 변수(`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`) 없으면 graceful no-op.

### i18n (next-intl v4)

- 로케일: `ko` (기본값) · `zh` → URL `/ko/...`, `/zh/...`
- 번역 파일: `src/i18n/locales/{ko,zh}.json`
- Server Components: `getTranslations()` (async), Client Components: `useTranslations()` (hook)
- 로케일 스위처: `usePathname()` + `useRouter()` 로 세그먼트 교체 (`/ko` → `/zh`)
- 정적 렌더링: `generateStaticParams()` → 빌드 타임에 `/ko`, `/zh` 프리렌더

### Path Aliases (tsconfig)

```
@/*         → src/*
@shared/*   → src/shared/*
@features/* → src/features/*
@entities/* → src/entities/*
@widgets/*  → src/widgets/*
```

## 핵심 파일 참고

| 파일 | 역할 |
|---|---|
| `src/shared/types/index.ts` | `ActionResult<T>`, `UserType`, `Locale` 타입 |
| `src/shared/constants/index.ts` | `SITE_URL`, `COUNTER_START`(847), `TOAST_MS`(4000) |
| `src/shared/ui/ThemeProvider.tsx` | `ThemeContext`, `useTheme()` 훅 export |
| `src/app/api/lead/route.ts` | Google Sheets 저장 (googleapis, POST /api/lead) |
| `src/shared/api/submitLead.ts` | Server Action — 유효성 검증 후 `/api/lead` fetch |
| `src/i18n/locales/ko.json` | 한국어 번역 원본 (zh.json과 키 구조 동일) |
| `playwright.config.ts` | E2E 설정 (baseURL: localhost:3000, chromium) |
| `e2e/landing.spec.ts` | 페이지 로드·폼·설문·다크모드·로케일·SEO 테스트 |

## 환경 변수

`.env.local.example` 참고:

```
NEXT_PUBLIC_SITE_URL        # sitemap, hreflang 기준 URL
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
GOOGLE_SHEET_ID
```

## 알려진 제약

- `src/pages/` 디렉토리를 만들면 Next.js Pages Router와 충돌 → 절대 생성 금지
- `googleapis`를 `'use server'` 파일에서 직접 import하면 빌드 실패 (클라이언트 번들 분석 문제) → Route Handler에서만 사용
- `pnpm-workspace.yaml`에 `packages: ["."]` 필드 필수 (없으면 모든 pnpm 명령 실패)
