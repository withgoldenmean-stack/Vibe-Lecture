# AX/DX 바이브코딩 20시간 과정 웹 서비스 개발문서

## 1. 문서 세트 개요
이 폴더는 「바이브코딩 활용한 AX/DX 자동화 기본과 실무 과정」의 20시간 강의 목차와 상세 교육내용을 웹 서비스로 구현하기 위한 기획·설계·개발지시 문서 모음이다.

현재 저장소에는 앱 소스코드가 아니라 개발 착수를 위한 기준 문서가 들어 있다. 구현 대상은 교육생, 강사, 교육기획자가 20시간 과정을 단원·교시·세부목차 단위로 탐색하는 반응형 웹 서비스이다.

## 2. 서비스 한 줄 정의
AX/DX와 바이브코딩에 관심 있는 비개발자가 20시간 강의 과정의 전체 흐름, 교시별 세부목차, 상세 교육내용, 산출물을 웹에서 직관적으로 탐색할 수 있도록 돕는 교육 콘텐츠 내비게이터이다.

## 3. 핵심 사용자
- AX/DX에 관심 있는 비개발자
- 업무 AX/DX 서비스를 만들고 싶은 실무자
- 소상공인 및 중소기업 대표
- 공공기관, 교육기관, 지원기관 담당자
- 경영지도사, 컨설턴트, 마케팅 담당자
- 강사 및 교육기획자

## 4. 문서 색인
| 순서 | 문서 | 역할 | 주요 참조 대상 |
|---:|---|---|---|
| 1 | `01_서비스정의서.md` | 서비스 목적, 사용자, 문제, 가치, MVP 범위 정의 | 기획자, 강사, PM |
| 2 | `02_강의콘텐츠구조서.md` | 20개 교시 목록, 단원 구성, 강의 데이터의 콘텐츠 구조 정의 | 콘텐츠 작성자, 개발자 |
| 3 | `03_기능명세서.md` | P0/P1/P2 기능 요구사항과 완료 기준 정의 | 개발자, QA |
| 4 | `04_UI설계서.md` | Top Menu, Left Menu, Body, PC·모바일 화면 구조 정의 | UI 개발자, 디자이너 |
| 5 | `05_데이터구조설계서.md` | `Lesson`, `LessonSection` 타입과 정적 데이터 관리 방식 정의 | 프론트엔드 개발자 |
| 6 | `06_컴포넌트설계서.md` | React/Next.js 컴포넌트 구성과 props 설계 정의 | 프론트엔드 개발자 |
| 7 | `07_반응형_상태_라우팅설계서.md` | 반응형 기준, 선택 상태, URL 쿼리 라우팅 방식 정의 | 프론트엔드 개발자 |
| 8 | `08_테스트_검수체크리스트.md` | 화면, 반응형, 데이터, 빈 상태, 배포 전 검수 기준 정의 | QA, 개발자 |
| 9 | `09_바이브코딩용개발지시서.md` | 실제 구현 요청에 바로 사용할 통합 개발 프롬프트 | 바이브코딩 실행자 |

## 5. 기준 문서와 참조 문서
개발 중 판단이 엇갈릴 때는 아래 순서로 문서를 참조한다.

1. 서비스 방향과 MVP 범위: `01_서비스정의서.md`
2. 강의 목록과 콘텐츠 구조: `02_강의콘텐츠구조서.md`
3. 기능 요구사항: `03_기능명세서.md`
4. 화면 배치와 UI 원칙: `04_UI설계서.md`
5. 데이터 타입과 ID 규칙: `05_데이터구조설계서.md`
6. 컴포넌트 분리 방식: `06_컴포넌트설계서.md`
7. 반응형·상태·라우팅 규칙: `07_반응형_상태_라우팅설계서.md`
8. 테스트와 완료 판정: `08_테스트_검수체크리스트.md`
9. 구현 착수용 통합 지시문: `09_바이브코딩용개발지시서.md`

## 6. MVP 범위
- 20시간 강의 목록 표시
- 단원 또는 강의 선택용 Top Menu
- 선택된 강의의 세부목차를 보여주는 Left Menu
- 선택된 세부목차의 상세교육내용을 보여주는 Body
- 현재 선택된 강의와 세부목차의 시각적 강조
- PC, 태블릿, 모바일 반응형 레이아웃
- 강의별 산출물 표시
- 강의·세부목차·본문 데이터가 없을 때 빈 상태 메시지 표시

## 7. MVP 제외 범위
회원가입, 로그인, 개인별 진도 저장, 결제, 관리자 CMS, 댓글, 질문게시판, 동영상 플레이어, 수료증 발급, AI 챗봇은 MVP에서 제외한다.

## 8. 권장 기술 스택
| 영역 | 권장 기술 |
|---|---|
| Frontend | Next.js 또는 React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data | 정적 JSON 또는 TypeScript 객체 |
| Hosting | Vercel |
| 향후 DB | Supabase PostgreSQL |
| 향후 Auth | Supabase Auth |

## 9. 구현 기준 요약
- 데이터는 `src/data/lessons.ts` 또는 `src/data/lessons.json`으로 화면 컴포넌트와 분리한다.
- 강의는 `lessonId`, `lessonNo`, `unit`, `title`, `duration`, `target`, `output`, `summary`, `sections`를 가진다.
- 세부목차는 `sectionId`, `title`, `content`, 선택 필드 `activity`, `checklist`를 가진다.
- MVP 상태 관리는 React `useState`로 충분하다.
- 선택 상태는 `selectedUnit`, `selectedLessonId`, `selectedSectionId` 중심으로 관리한다.
- URL은 MVP에서 단일 페이지 `/`를 기본으로 하되, `/?lesson=L008&section=S008-02` 형태의 쿼리 파라미터 확장을 허용한다.

## 10. 개발 순서
1. Next.js 또는 React 프로젝트 초기화
2. `Lesson`, `LessonSection` 타입 정의
3. 20개 강의 데이터 작성
4. 기본 레이아웃 구현
5. TopNavigation, UnitTabs, LessonSelector 구현
6. SideNavigation 구현
7. ContentBody, OutputCard, EmptyState 구현
8. 이전/다음 이동과 선택 상태 동기화 구현
9. 모바일 드롭다운 레이아웃 구현
10. 테스트 및 Vercel 배포

## 11. 완료 기준
- 20개 강의가 모두 화면에 표시된다.
- Top Menu에서 단원 또는 강의를 선택할 수 있다.
- Left Menu에서 세부목차를 선택하면 Body 내용이 변경된다.
- 현재 선택된 강의와 세부목차가 명확히 강조된다.
- 모바일 375px 화면에서도 본문을 읽을 수 있다.
- 데이터가 없을 경우 안내 메시지가 표시된다.
- 데이터와 화면 컴포넌트가 분리되어 있다.
- `08_테스트_검수체크리스트.md`의 MVP 완료 기준을 통과한다.

## 12. 현재 폴더 상태
- 문서 수: Markdown 문서 11개
- 소스코드: Next.js 앱 구현 완료
- 워크스페이스 파일: `VIBELECTURE.code-workspace`
- 문서 진입점: `README.md`

## 13. 구현 산출물
| 구분 | 위치 | 설명 |
|---|---|---|
| 앱 진입점 | `src/app/page.tsx` | 단원, 강의, 세부목차 선택 상태를 관리하는 메인 화면 |
| 레이아웃 | `src/app/layout.tsx` | 기본 metadata와 한국어 문서 구조 |
| 전역 스타일 | `src/app/globals.css` | Tailwind CSS와 기본 화면 스타일 |
| 강의 데이터 | `src/data/lessons.ts` | 20개 강의와 세부목차 데이터 |
| 타입 | `src/types/lesson.ts` | `Lesson`, `LessonSection`, `UnitName` 타입 |
| 유틸 | `src/lib/lesson-utils.ts` | 강의 조회, 세부목차 조회, 이전/다음 이동 계산 |
| AI 설정 | `src/lib/openai.ts` | 서버 전용 OpenAI 클라이언트 생성 |
| AI API | `src/app/api/ai/route.ts` | GPT API 확장용 샘플 Route Handler |
| 데이터 검증 | `scripts/validate-lessons.mjs` | 강의 데이터 기본 무결성 검증 |

## 14. 실행 방법
```bash
npm install
npm run dev
```

개발 서버 실행 후 브라우저에서 `http://localhost:3000`으로 접속한다.

## 15. 검증 명령
```bash
npm run validate:data
npm run lint
npm run typecheck
npm run build
npm audit --audit-level=moderate
```

## 16. 환경변수
`.env.local`에 GPT API 키를 입력할 수 있다.

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
NEXT_PUBLIC_APP_NAME=AX/DX Vibe Coding Course
```

`OPENAI_API_KEY`는 서버 Route Handler에서만 사용하며 브라우저 번들에 노출하지 않는다.

## 17. 외부 수강생 접근
현재 임시 공개 URL:

```text
https://astrology-options-punch-affecting.trycloudflare.com
```

이 URL은 현재 PC에서 실행 중인 프로덕션 서버와 Cloudflare Quick Tunnel이 유지되는 동안 외부 수강생이 접속할 수 있다.

현재 실행 구조:

```text
Next.js production server: http://127.0.0.1:3001
Cloudflare Quick Tunnel: https://astrology-options-punch-affecting.trycloudflare.com
```

주의사항:
- PC가 꺼지거나 절전 상태가 되면 외부 접속이 중단된다.
- 터미널 또는 백그라운드 프로세스를 종료하면 외부 접속이 중단된다.
- Quick Tunnel URL은 임시 주소이므로 재실행 시 바뀔 수 있다.
- 정식 교육 운영용 고정 주소가 필요하면 Vercel 배포 또는 Cloudflare Named Tunnel 구성이 필요하다.

재시작 기본 순서:

```bash
npm run build
npm run start -- -p 3001
```

별도 터미널에서:

```bash
cloudflared tunnel --protocol http2 --url http://127.0.0.1:3001
```

## 18. 관리자 사전 승인 접속
외부 수강생은 바로 강의 화면에 들어가지 않고 `/access` 승인 화면을 먼저 통과해야 한다.

현재 승인 방식:
- 관리자가 승인된 수강생에게 접속 코드를 전달한다.
- 수강생은 공개 URL 접속 후 승인 화면에서 접속 코드를 입력한다.
- 승인 성공 시 8시간 동안 접속 가능한 보안 쿠키가 발급된다.
- 미승인 사용자는 강의 페이지와 보호된 API에 접근할 수 없다.

현재 기본 접속 코드:

```text
AX2026-VIBE
```

관리자 설정 파일:

```text
.env.local
```

승인 코드 변경 또는 추가:

```env
APPROVED_ACCESS_CODES=AX2026-VIBE,STUDENT-001,STUDENT-002
```

접속 차단을 잠시 끄는 방법:

```env
ACCESS_GATE_ENABLED=false
```

설정 변경 후에는 서버를 재시작해야 한다.

```bash
npm run build
npm run start -- -p 3001
```
