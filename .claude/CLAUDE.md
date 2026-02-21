# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # 개발 서버 실행
pnpm build        # 프로덕션 빌드 (타입 체크 + ESLint 포함)
pnpm lint         # ESLint 실행
pnpm start        # 프로덕션 서버 실행
```

Node 24 필수 (`nvm use 24` 또는 `.nvmrc` 자동 적용), 패키지 매니저는 pnpm 10.

## Architecture

### Feature-Sliced Design (FSD) — 단방향 의존성

`src/` 아래 레이어는 오직 자신보다 **아래** 레이어만 import할 수 있습니다.

```
app → pages → widgets → features → entities → shared
```

| 레이어 | 경로 | 역할 |
|---|---|---|
| `app` | `src/app/` | Next.js App Router 진입점, Providers, 글로벌 스타일 |
| `pages` | `src/pages/` | 라우트별 조합 (데이터 패칭 + 위젯 조립만) |
| `widgets` | `src/widgets/` | 독립 UI 블록 (`HeroSection`, `Footer` 등) |
| `features` | `src/features/` | 유저 액션 단위 (`lead-form`, `language-switch` 등) |
| `entities` | `src/entities/` | 비즈니스 도메인 모델, Zod 스키마 |
| `shared` | `src/shared/` | 인프라·디자인 시스템 (`api/`, `ui/`, `lib/`, `constants/`, `types/`) |

Feature 폴더 응집도 예시: `features/lead-form/LeadForm.tsx`, `useLeadForm.ts`, `api.ts`를 한 폴더에.

### i18n (next-intl)

- 로케일: `ko` (한국어, 기본값) · `zh` (중국어) → URL `/ko/...`, `/zh/...`
- `src/middleware.ts` — 요청을 적절한 로케일로 리다이렉트
- `src/i18n/routing.ts` — 로케일 목록 정의
- `src/i18n/request.ts` — 서버 사이드 메시지 로딩 (`src/i18n/locales/{ko,zh}.json`)
- `src/app/[locale]/layout.tsx` — 로케일별 html lang 설정 + `NextIntlClientProvider`
- 정적 렌더링: `generateStaticParams()`로 빌드 타임에 `/ko`, `/zh` 프리렌더

### 데이터 흐름 원칙

- **외부 API 호출은 반드시 Server Actions** — 클라이언트에 키 노출 금지
- **비즈니스 결과 타입 통일**: `{ ok: boolean, data?: T, error?: string }`
- **Server Component 우선**, `"use client"`는 인터랙션 필수 시에만
- GA4 로깅·부수 효과는 훅 최상위 또는 Server Action에서 명시적으로 실행

### Path Aliases (tsconfig)

```
@/*        → src/*
@shared/*  → src/shared/*
@features/* → src/features/*
@entities/* → src/entities/*
@widgets/* → src/widgets/*
@pages/*   → src/pages/*
```

## 주요 구현 예정 (미완성)

- **Lead 수집**: Google Sheets → Server Actions + Google Auth Library (Service Account)
- **Analytics**: `<GoogleAnalytics />` 컴포넌트로 GA4 연동
- **SEO**: `generateMetadata()`로 로케일별 메타데이터, `hreflang` 자동 생성
- **인프라**: AWS(SST/Amplify) 또는 Vercel (미정)
