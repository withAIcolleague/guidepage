# CLAUDE.md - 프로젝트 가이드 및 개발 기록

이 파일은 프로젝트의 구조, 실행 방법 및 AI 어시스턴트(Claude Code 등)를 위한 주요 지침을 담고 있습니다.

## 프로젝트 개요
- **프로젝트명**: NEXINOUS's Portal
- **설명**: 워크플로우 맵 기반의 서비스 랜딩 페이지
- **기술 스택**: Next.js 16.1.6 (App Router), TypeScript, Tailwind CSS v4

## 주요 명령어 (Claude Code 참고용)
- **개발 서버 실행**: `npm run dev`
- **프로젝트 빌드**: `npm run build`
- **Lint 체크**: `npm run lint`

---

## 진행 기록

### 2026-02-16 - 프로젝트 초기화 ✅
- [x] Next.js 프로젝트 생성 (App Router, TypeScript, Tailwind CSS)
- [x] shadcn/ui 초기화 및 필수 컴포넌트 설치 (button, card, badge)
- [x] 랜딩 페이지 레이아웃 구성 (Header → Hero → Banner Grid → Footer)
- [x] 서비스 배너 시스템 구현 (확장 가능한 구조)
- [x] 다크 모드 프리미엄 디자인 완성
- [x] 빌드 & 렌더링 검증 통과

### 2026-02-16 - 테마별 퀵 링크 워크플로우 맵 전환 ✅
- [x] 단순 카테고리 목록을 **Value Chain / Task Process 기반 워크플로우**로 재설계
- [x] 6개 워크플로우 체인 정의 (프로덕트 파이프라인, AI 워크플로우 등)
- [x] 선형 플로우 다이어그램 UI 구현 (탭 전환, 가로 스크롤, 단계별 시각화)
- [x] **[NEW] '미술사조의 흐름' & '반도체 공정 흐름' 워크플로우 추가** 🎨💾
  - 반도체: Fabless(설계) → Fab(공정) → OSAT(패키징) → 유통 → 탑재까지 Value Chain 전체 확장
- [x] **[NEW] 워크플로우 맵 인앱 브라우저 미리보기 구현** 🌐
  - 노드 클릭 시 하단 패널에 iframe 로딩 (X-Frame-Options 고려 Fallback UI)
- [x] **[NEW] GitHub 원격 저장소 연동 완료** 🐙
  - Repository: `https://github.com/withAIcolleague/guidepage.git`
  - Initial Commit & Push 완료
- [x] **[NEW] 구글 검색(Search) 액션 버튼 추가** 🔍
  - 각 카드 노드에 역할(Role) 기반 맞춤형 검색어 자동 설정
  - '검색' 버튼 클릭 시 새 탭에서 구글 검색 결과 즉시 표시 (UX 편의성 증대)
- [x] 빌드 검증 및 GitHub 푸시 완료

### 2026-02-19 - 이중 링크 및 다중 도구 지원 시스템 구현 ✅
- [x] **[NEW] 카드 이중 링크 시스템 도입** 🔗
  - 카드 상단(역할): 관련 **이론/개념** 페이지 연결 (위키백과 등)
  - 서비스명 텍스트: 실제 **서비스/툴** 페이지 연결
- [x] **[NEW] 다중 도구(Multi-Tool) 지원 구조 개편** 🛠️
  - `FlowNode` 인터페이스 리팩토링 (`title`, `url` → `tools` 배열)
  - 한 노드에 여러 대체 도구를 수동 등록하고 선택할 수 있는 UI 구현
- [x] **[NEW] 데이터 전수 조사 및 보강 완료** 📚
  - 8개 모든 워크플로우 체인의 노드에 `theoryUrl` 및 관련 도구 목록 추가
- [x] **[NEW] PreviewPanel 사용자 경험 개선** ✨
  - `iframe` 높이 상향(500px → 600px), 로딩 애니메이션 및 에러 Fallback 강화

## 주요 기술 결정 및 참고 사항

### 1. iframe 보안 제약 (X-Frame-Options)
- **현상**: Dribbble, Figma, GitHub 등 대형 서비스는 `iframe` 삽입을 차단함.
- **대응**: `PreviewPanel`에 전용 `BLOCK_LIST`를 운영하여, 차단된 사이트는 즉시 "연결 거부" 안내와 함께 **새 탭으로 열기**를 유도하여 UX 저하 방지.
- **대안**: 추후 사이트 썸네일 API(Microlink 등) 연동 또는 수동 링크 프리뷰 카드 개발 고려.

### 2. 데이터 구조 (quick-links.ts)
- `tools`: `{ name: string, url: string }[]` 배열 구조로, 한 역할에 대해 여러 선택지를 제공함.
- `theoryUrl`: 학습을 위한 위키백과 등의 공신력 있는 외부 링크를 우선 순위로 연결함.

## 배너 관리
> 새 배너 추가: `src/data/banners.ts` 배열에 객체 추가 → 자동 렌더링

| 배너 이름 | URL | 설명 | 추가일 |
|-----------|-----|------|--------|
| Service Alpha | https://example.com/alpha | 핵심 데이터 분석 및 인사이트 대시보드 | 2026-02-16 |
| Service Beta | https://example.com/beta | 실시간 모니터링 및 알림 시스템 | 2026-02-16 |
| NEXINOUS AI Lab | https://github.com/withAIcolleague | AI 기반 자동화 워크플로우 엔진 (Coming Soon) | 2026-02-16 |

## 파일 구조
```
nexinous-portal/
├── src/
│   ├── app/
│   │   ├── globals.css       # 글로벌 스타일, 애니메이션
│   │   ├── layout.tsx        # 다크 테마 레이아웃, SEO
│   │   └── page.tsx          # 메인 페이지 조합
│   ├── components/
│   │   ├── ui/                      # shadcn/ui 컴포넌트
│   │   ├── banner-card.tsx          # 개별 배너 카드
│   │   ├── banner-grid.tsx          # 배너 그리드 컨테이너
│   │   ├── quick-links-section.tsx  # 테마별 퀵 링크 섹션
│   │   ├── header.tsx               # 고정 네비게이션 헤더
│   │   ├── hero-section.tsx         # 히어로 섹션
│   │   └── footer.tsx               # 푸터
│   └── data/
│       ├── banners.ts               # ⭐ 배너 데이터
│       └── quick-links.ts           # ⭐ 퀵 링크 데이터
```
## 워크플로우 섹션 상세 구조 (Workflow Section Structure)

이 프로젝트의 핵심 기능인 '워크플로우 맵'은 데이터 기반의 동적 UI 시스템으로 설계되었습니다.

### 1. 컴포넌트 계층 구조
- **QuickLinksSection**: 메인 컨테이너. 탭 전환, 노드 렌더링, 상태 관리를 담당합니다.
- **PreviewPanel**: 선택된 노드의 상세 정보(이론 또는 실제 웹사이트)를 `iframe`으로 보여주는 슬라이드인 패널입니다.

### 2. 데이터 스키마 (`src/data/quick-links.ts`)
```typescript
interface FlowNode {
  role: string;          // 노드의 역할 (예: 영감 수집)
  theoryUrl?: string;    // 카드 클릭 시 열리는 이론/개념 링크
  searchQuery?: string;  // '검색' 버튼 클릭 시 구글로 전달될 키워드
  tools: {               // 서비스명 클릭 시 열리는 도구 목록
    name: string;
    url: string;
  }[];
}

interface WorkflowChain {
  id: string;            // 고유 ID (탭 전환용)
  name: string;          // 탭에 표시될 이름
  description: string;   // 체인에 대한 간단한 설명
  icon: string;          // 이모지 아이콘
  gradient: string;      // 시각적 강조를 위한 그라데이션 컬러
  nodes: FlowNode[];     // 연결된 프로세스 노드 배열
}
```

### 3. 상호작용 로직 (Interaction)
| 영역 | 액션 | 결과 |
| :--- | :--- | :--- |
| **카드 본체** | 클릭 | `theoryUrl`이 있는 경우, **이론/개념**을 하단 패널(iframe)에서 미리보기 |
| **서비스명 (텍스트)** | 클릭 | 해당 **서비스/툴** 사이트를 하단 패널(iframe)에서 미리보기 |
| **검색 버튼** | 클릭 | `searchQuery`를 사용하여 **구글 검색 결과**를 새 탭(`_blank`)에서 열기 |
| **탭 (상단)** | 클릭 | 활성화된 워크플로우 체인을 즉시 변경 (애니메이션 적용) |

### 4. 주요 UI 특징
- **가로 스크롤**: 노드가 많아져도 모바일 및 데스크탑에서 자연스럽게 탐색 가능한 가로 스크롤 레이아웃.
- **커넥터 시스템**: 노드 사이의 화살표(`SVG`)가 프로세스의 선형적 흐름을 시각적으로 연결.
- **상태 동기화**: `selectedNode` 상태를 통해 현재 보고 있는 툴이나 이론을 강조 표시(`ring`, `shadow`).
- **보안 대응**: `PreviewPanel`에서 `X-Frame-Options`로 차단된 사이트는 자동으로 감지하여 새 탭 열기를 제안.
