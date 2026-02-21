# [SPEC] 기술 명세서 및 아키텍처 가이드

## 1. Stack & Tools
- **Package Manager**: pnpm 10
- **Framework**: Next.js 15.5.12 (App Router v15 latest)
- **Library**: React 19.2 (Stable and latest)
- **i18n**: next-intl (Server Component 최적화 모델)
- **Styling**: Tailwind CSS latest
- **Infrastructure**: AWS (via SST or Amplify) / Custom Domain 적용 혹은 Vercel 사용 (이건 아직 미정)
- **Monitoring**: Google Analytics 4 (GA4)

## 2. Architecture: Feature-Sliced Design (Modified)
변경에 유연하도록 비즈니스 로직과 UI를 철저히 격리합니다.

### 2-1. 계층화 전략 (Feature-Sliced Design)
모든 코드는 아래 층(Layer) 중 하나에 속해야 하며, 아래 층은 위 층을 참조할 수 없습니다. (Strict One-way Dependency)

- **app**: 애플리케이션의 엔트리포인트 (Providers, Layouts, Global Styles).
- **pages**: 라우트별 페이지 컴포넌트. 데이터 패칭(Server Component) 및 위젯 조합만 담당.
- **widgets**: 독립적으로 사용 가능한 UI 블록 (예: `HeroSection`, `Footer`). 여러 Feature를 조합함.
- **features**: 유저 비즈니스 가치를 만드는 '액션' (예: `lead-form`, `language-switch`). **Use Case 레이어**.
- **entities**: 비즈니스 도메인 모델 및 상태 (예: `Lead`, `User`). 
- **shared**: 인프라 및 디자인 시스템 (API Client, UI-Kit, Utils). **Infrastructure 레이어**.

### 2-2. 비즈니스 로직 격리 (Clean Architecture)
비즈니스 핵심 로직(Entity, Use Case)은 인프라 세부 사항(Next.js API, Google Sheets, GA4)으로부터 독립되어야 합니다.
SOLID 원칙을 따르는 아키텍처 코드를 작성하십시오

- **Entity (Pure)**: 데이터 구조와 유효성 검사 로직 (ex: `zod` 스키마).
- **Use Case (Features/Hooks)**: 사용자 액션의 흐름 제어. UI 라이브러리에 의존하지 않는 순수 로직 지향.
- **Interface Adapter (Shared/API)**: 외부 통신을 위한 추상화 인터페이스.
- **Framework & Driver (Shared/Lib)**: 구체적인 라이브러리 구현체 (ex: `google-spreadsheet` 인스턴스).

## 3. 구현 지침 (Toss Fundamental 적용)
### 3.1. 응집도 (Cohesion)
- **Feature 단위 응집**: `features/lead-form` 폴더 안에 `LeadForm.tsx`, `useLeadForm.ts`, `api.ts`를 함께 두어 변경의 범위를 한정함.
- **매직 넘버 제거**: SEO 및 분석에 사용되는 고정값은 `entities/` 혹은 `shared/constants`로 추출.

### 3.2. 결합도 (Coupling)
- **DIP 적용**: `features`는 `shared/api`의 구체 클래스가 아닌 인터페이스에 의존.
- **조합 패턴 (Composition)**: Props Drilling 방지를 위해 `children`을 적극 활용하여 위젯을 구성.

### 3.3. 예측 가능성 (Predictability)
- **Side Effect 격리**: GA4 로깅이나 DB 저장 등의 부수 효과는 훅의 최상위 혹은 Server Action에서 명시적으로 실행.
- **결과 타입 통일**: 모든 비즈니스 결과는 `{ ok: boolean, data?: T, error?: string }` 형태로 반환.

## 3. 주요 구현 계획
### 3.1. i18n Strategy
- `next-intl`을 사용하여 `/kr`, `/cn` 경로를 생성합니다.
- SEO를 위해 `link rel="alternate" hreflang="..."` 태그를 자동으로 생성하도록 설정합니다.

### 3.2. Lead Storage (Google Sheets)
- Client-side에서 API 키 노출을 방지하기 위해 **Next.js Server Actions**를 사용합니다.
- `Google Auth Library`를 통해 Service Account 방식으로 인증을 처리합니다.

### 3.3. SEO & Analytics
- `generateMetadata` API를 활용하여 언어별 동적 메타데이터 적용.
- `Next.js 15`의 `<GoogleAnalytics />` 내장 컴포넌트를 사용하여 성능 저하 없이 추적.