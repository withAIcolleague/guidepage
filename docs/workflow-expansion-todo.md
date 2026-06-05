# Workflow Expansion Todo

이 문서는 지식DB 확장 2차 라운드를 실제 작업 순서로 관리한다.
각 항목은 구현, 검증, `origin/main` 직접 push까지 끝났을 때 완료로 표시한다.

## Rules

- 한 번에 하나의 워크플로우 체인 또는 QA 개선 단위만 처리한다.
- 새 체인은 5~8개 단계, 단계별 `theoryUrl`, `searchQuery`, 실행 도구를 갖춘다.
- 건강, 식품, 법·정책처럼 고위험성이 있는 영역은 공식 기관과 안정적 정보 출처를 우선한다.
- 모든 단위는 `validate:data`, `validate:search`, `validate:layout`, `validate:theme`, `lint`, `build`를 통과해야 한다.
- UI 회귀 가능성이 있는 변경은 `qa:mobile`, `qa:desktop`까지 확인한다.

## Todo

- [x] 농학·생명산업: `식품 안전 정보 검증 플로우` 추가
- [ ] 자연과학: `생명과학 논문 탐색 플로우` 추가
- [ ] 사회과학: `여론·미디어 반응 분석 플로우` 추가
- [ ] QA: 새 지식DB 체인을 직접 찾는 대분류별 smoke test 추가

## Done In Previous Round

- [x] 사회과학: `지역사회 이슈 분석 플로우`
- [x] 의학·보건: `생활습관 건강 계획 플로우`
- [x] 법·정책: `정책 제안 검토 플로우`
