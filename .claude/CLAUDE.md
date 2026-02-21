# Xiaohongshu Web Project

## 프로젝트 개요
소홍슈(Xiaohongshu) 한국/중국 타겟 마케팅 랜딩 페이지.
한국어(`/kr`)와 중국어(`/cn`) 두 로케일을 지원.

## 핵심 기술 스택
- **Node**: 24 | **pnpm**: 10
- **Framework**: Next.js 15 (App Router)
- **React**: 19
- **i18n**: next-intl (`/kr`, `/cn` 경로)
- **Styling**: Tailwind CSS
- **Analytics**: Google Analytics 4

## 아키텍처: Feature-Sliced Design (FSD)
`src/` 하위 레이어 — 아래 층은 위 층을 import 불가 (단방향 의존성)
```
app → pages → widgets → features → entities → shared
```

## 핵심 컨벤션
- 모든 비즈니스 결과 타입: `{ ok: boolean, data?: T, error?: string }`
- API 키 노출 방지: 외부 통신은 반드시 **Server Actions** 사용
- Server Component 우선, Client Component는 최소화
- 자세한 설계 원칙은 `.claude/SPEC.md` 참고
