# Guidepage Project Checklist

Guidepage를 지식 대시보드형 워크플로우 포털로 발전시키기 위한 진행 기준이다.
작업은 의미 있는 단위별로 구현, 검증, 커밋, GitHub push를 거친다.

## Operating Rules

- 작업은 가능한 한 작은 PR 단위로 분리한다.
- 의미 있는 단위가 끝날 때마다 `npm.cmd run validate:data`, `npm.cmd run lint`, `npm.cmd run build`를 실행한다.
- UI만 변경한 PR도 `lint`와 `build`를 통과해야 한다.
- 지식DB를 변경한 PR은 `validate:data`를 반드시 통과해야 한다.
- 검증이 통과한 변경만 커밋하고 GitHub 브랜치로 push한다.
- 답변마다 현재 단계와 전체 진행척도를 보고한다.
- 명확한 위험 작업, 데이터 삭제, 큰 방향 전환, 제품 철학 변경이 필요한 경우에만 사용자 확인을 요청한다.
- PR은 `codex/*` 브랜치에서 만들고, merge 후 최신 `main` 기준으로 다음 브랜치를 만든다.

## Phase 1. Foundation And Stability

- [x] 프로젝트를 GitHub 기준으로 재정리
- [x] lint 오류 복구
- [x] build 안정화
- [x] Google Fonts 네트워크 의존 제거
- [x] README를 실제 프로젝트 설명과 검증 명령으로 정리
- [x] 서비스 섹션을 바로가기형 UI로 축소
- [x] WGIS, Write Partner, Sticky Memo, My Links 서비스 추가
- [x] NEXINOUS AI Lab 제거

## Phase 2. Knowledge Dashboard UX

- [x] 메인 페이지를 대분류 중심 대시보드로 재구성
- [x] 대분류를 대학 학부/대백과사전급 기준으로 확장
- [x] 대분류 -> 중분류 -> 세부분류 탐색 구조 도입
- [x] 세부 페이지에서 헤더/푸터/서비스 섹션 제거
- [x] 세부 페이지를 좌측 분류표, 우측 검색/상세/미리보기 패널로 분리
- [x] 미리보기 제한 사이트에 새 탭 fallback 제공
- [x] 세부 페이지 검색을 현재 대분류/중분류 맥락 안으로 제한
- [ ] 중분류/세부분류/단계 카드 화살표 페이징 PR merge
- [ ] 모바일 실제 화면 QA
- [ ] 우측 패널 높이와 스크롤 UX QA
- [ ] iframe fallback CTA QA
- [ ] 검색 결과 클릭 후 분류/체인/단계 이동 QA

## Phase 3. Data Model Readiness

- [x] 현재 `WorkflowCategory -> WorkflowCategorySection -> WorkflowChain -> FlowNode -> tools` 구조 검토
- [x] 지식DB 확장 전 필수 필드 정의
- [x] 이론 링크와 실행 도구 링크의 역할 분리 기준 정의
- [x] 검색 대상 필드와 우선순위 정의
- [x] 빈 대분류/중분류의 준비 중 표시 정책 확정
- [x] 데이터 중복, 깨진 URL, 차단 도메인 점검 방식 정리
- [x] `validate:data` 스크립트 추가
- [x] 워크플로우 체인 작성 템플릿 추가
- [x] 대분류별 1차 중분류 후보 문서화

## Phase 4. Knowledge DB Expansion

- [x] 사회과학 첫 체인 추가: `심리·행동과학 > 개인 의사결정 분석 플로우`
- [ ] 자연과학 첫 체인 추가: `물질·생명·지구 > 기후·환경 데이터 탐색 플로우` PR merge 대기
- [ ] 의학·보건 첫 체인 추가
- [ ] 법·정책 첫 체인 추가
- [ ] 농학·생명산업 첫 체인 추가
- [ ] 빈 대분류가 메인에서 준비 중으로만 남지 않도록 최소 1개 체인씩 채우기
- [ ] 중분류별 세부분류 후보 보강
- [ ] 세부분류별 워크플로우 체인 후보 보강
- [ ] 각 워크플로우별 핵심 단계 정의
- [ ] 각 단계별 이론 링크, 검색어, 실행 도구 추가
- [ ] 1차 확장 후 검색 품질 QA
- [ ] 1차 확장 후 모바일 카드 페이징 QA

## Phase 5. Product Polish

- [ ] 메인 대분류 카드 시각 밀도 재점검
- [ ] 서비스 바로가기 섹션 시각 비중 재점검
- [ ] 세부 페이지 정보 위계 재점검
- [ ] 다크모드 대비 QA
- [ ] 빈 상태, 검색 결과 없음, iframe 차단 상태 문구 정리
- [ ] 배포 preview와 production 반영 여부 확인 루틴 정리

## Pending PR Queue

현재 진행은 아래 PR merge 순서를 기준으로 한다. 같은 데이터 파일을 수정하는 지식DB 확장 PR은
앞선 PR이 merge된 뒤 최신 `main`에서 다음 브랜치를 만든다.

1. `codex/project-checklist-update`: 체크리스트 문서 정식 반영
2. `codex/detail-ux-qa`: 중분류/세부분류/단계 카드 화살표 페이징
3. `codex/add-natural-science-workflow`: 자연과학 첫 워크플로우 체인

## Current Next Actions

1. `codex/project-checklist-update` PR을 merge한다.
2. `codex/detail-ux-qa` PR을 merge하고 모바일 카드 페이징 QA를 진행한다.
3. `codex/add-natural-science-workflow` PR을 merge한다.
4. merge 후 최신 `main`에서 의학·보건 첫 워크플로우 체인을 추가한다.
5. 법·정책, 농학·생명산업 순서로 빈 대분류를 채운다.
