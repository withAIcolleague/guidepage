# Data Model Readiness

Guidepage의 지식DB 확장은 현재 UI가 기대하는 데이터 계약을 유지하면서 진행한다.
이 문서는 확장 전에 지켜야 할 최소 스키마, 링크 역할, 검색 정책, 빈 상태 정책,
검증 방식을 정의한다.

## Current Model

현재 데이터는 다음 계층으로 연결된다.

```text
WorkflowCategory
  -> WorkflowCategorySection
    -> WorkflowChain
      -> FlowNode
        -> tools
```

### `WorkflowCategory`

파일: `src/data/workflow-categories.ts`

- `id`: 대분류 고유 ID. URL/상태 키로 쓰일 수 있으므로 변경 비용이 크다.
- `name`: 사용자에게 보이는 대분류명.
- `description`: 대분류의 학문적/맥락적 정의.
- `icon`: 대분류 시각 신호.
- `sections`: 중분류 목록.

### `WorkflowCategorySection`

파일: `src/data/workflow-categories.ts`

- `id`: 중분류 고유 ID.
- `name`: 사용자에게 보이는 중분류명.
- `description`: 중분류의 범위.
- `chainIds`: 이 중분류에 속한 세부분류/워크플로우 체인 ID 목록.

### `WorkflowChain`

파일: `src/data/quick-links.ts`

- `id`: 세부분류/워크플로우 고유 ID. `chainIds`에서 참조한다.
- `name`: 사용자에게 보이는 세부분류명.
- `description`: 이 체인이 다루는 작업 흐름.
- `icon`: 세부분류 시각 신호.
- `gradient`: 현재 카드/상세 패널의 색상 신호.
- `nodes`: 단계 목록. 순서가 곧 워크플로우 순서다.

### `FlowNode`

파일: `src/data/quick-links.ts`

- `role`: 단계 카드 제목. 사용자가 이해할 수 있는 실행 단계명이어야 한다.
- `tools`: 단계에서 실제로 열 수 있는 도구/서비스 링크 목록.
- `theoryUrl`: 선택 사항. 이 단계의 개념/이론을 설명하는 링크.
- `searchQuery`: 선택 사항. 외부 검색으로 확장할 때 쓰는 검색어.

### `tools`

- `name`: 도구명.
- `url`: 실제 이동할 외부 URL.

## Required Fields For Expansion

지식DB를 확장할 때 새 항목은 아래 기준을 만족해야 한다.

- 새 대분류는 `id`, `name`, `description`, `icon`, `sections`를 모두 가진다.
- 새 중분류는 `id`, `name`, `description`, `chainIds`를 모두 가진다.
- 새 워크플로우 체인은 `id`, `name`, `description`, `icon`, `gradient`, `nodes`를 모두 가진다.
- 새 단계는 `role`, `tools`를 반드시 가진다.
- 새 단계의 `tools`는 최소 1개 이상이어야 한다.
- `theoryUrl` 또는 `searchQuery` 중 최소 하나는 있는 것이 좋다.
- `id`는 소문자 kebab-case로 작성한다.
- 이미 존재하는 `id`를 재사용하지 않는다.
- `chainIds`에 들어간 ID는 반드시 `workflowChains`에 존재해야 한다.

## Theory Link And Tool Link Policy

`theoryUrl`과 `tools.url`은 역할이 다르다.

- `theoryUrl`: 개념, 정의, 역사, 원리, 방법론을 이해하기 위한 링크.
- `tools.url`: 실제 작업을 수행하기 위해 접속하는 서비스, 문서, 도구, 데이터베이스.
- 하나의 단계에서 이론 링크와 실행 도구가 같은 URL이면 데이터 품질이 낮은 신호로 본다.
- `theoryUrl`은 가능하면 안정적인 설명 자료를 우선한다.
- `tools.url`은 사용자가 바로 실행하거나 확인할 수 있는 서비스 진입점을 우선한다.

권장 우선순위:

1. 공식 문서, 공식 제품 페이지, 공공기관/학술기관 자료
2. 안정적인 백과/기초 개념 문서
3. 실무자가 반복적으로 쓰는 SaaS/도구
4. 개인 블로그나 단발성 글

## Search Policy

현재 검색은 다음 필드를 대상으로 한다.

- `category.name`
- `category.description`
- `section.name`
- `section.description`
- `chain.name`
- `chain.description`
- `node.role`
- `node.searchQuery`
- `tool.name`
- `tool.url`

검색 범위 정책:

- 메인 페이지에서는 전체 워크플로우를 검색한다.
- 세부 페이지에서는 현재 선택한 대분류 안에서 검색한다.
- 중분류가 선택되면 해당 중분류 안에서만 검색한다.

확장 시 검색 품질 기준:

- `searchQuery`는 사용자가 실제로 검색창에 입력할 법한 자연어로 작성한다.
- 도구명만으로 찾기 어려운 단계는 `searchQuery`를 반드시 추가한다.
- 같은 검색어가 너무 많은 단계에 반복되면 세부분류 간 구분력이 낮아진다.

## Empty State Policy

빈 대분류/중분류는 삭제하지 않고 준비 상태로 유지할 수 있다.

- 대분류에 연결된 체인이 하나도 없으면 메인 카드에서 비활성 상태로 표시한다.
- 중분류에 연결된 체인이 없으면 `준비 중`으로 표시한다.
- 준비 중 항목도 학문적 큰 분류의 자리를 보여주는 역할이 있으므로, 지식DB 확장 전에는 유지한다.
- 단, 사용자가 실행 가능한 흐름을 기대하는 화면에서는 빈 체인을 클릭 가능하게 만들지 않는다.

## URL And Domain Validation Policy

지식DB 확장 PR마다 다음을 점검한다.

- URL이 `http://` 또는 `https://`로 시작하는지 확인한다.
- 같은 단계 안에서 같은 URL이 중복되지 않는지 확인한다.
- 같은 도구명이 다른 URL로 반복될 경우 의도한 차이인지 확인한다.
- `chainIds`가 존재하지 않는 체인을 참조하지 않는지 확인한다.
- `WorkflowChain.id`가 중복되지 않는지 확인한다.
- `FlowNode.role`이 같은 체인 안에서 중복되지 않는지 확인한다.

iframe 미리보기 제한 도메인은 `src/components/preview-panel.tsx`의 `BLOCKED_DOMAINS`에서 관리한다.
GitHub, Figma, Google, YouTube처럼 iframe 제한 가능성이 높은 서비스는 포털 내부 미리보기보다
새 탭 CTA를 우선한다.

현재 데이터 계약은 아래 명령으로 점검한다.

```bash
npm.cmd run validate:data
```

이 명령은 누락 필드, 중복 ID, 깨진 체인 참조, 잘못된 URL, 같은 단계 안의 중복 도구 URL을
오류로 처리한다. 이론 링크가 도구 URL과 같은 경우처럼 데이터 품질을 낮출 수 있지만 즉시
빌드를 막을 필요는 없는 항목은 경고로 표시한다.

## Expansion Checklist

새 워크플로우 체인을 추가할 때마다 아래를 확인한다.

- [ ] 대분류가 적절한가
- [ ] 중분류가 너무 세부적이거나 너무 넓지 않은가
- [ ] 체인 이름이 작업 흐름을 설명하는가
- [ ] 단계 순서가 실제 사용자의 사고/실행 순서와 맞는가
- [ ] 각 단계의 도구가 실제로 쓸 수 있는가
- [ ] 이론 링크와 도구 링크의 역할이 분리되어 있는가
- [ ] 검색어가 해당 단계를 찾는 데 도움이 되는가
- [ ] 모바일 카드 페이징에서 단계명이 지나치게 길지 않은가
- [ ] build와 lint가 통과하는가

새 체인을 작성할 때는 [Workflow Chain Template](./workflow-chain-template.md)을 기준으로 한다.

## Next Implementation Candidates

1. 대분류별 1차 중분류 후보는 [Taxonomy Expansion Candidates](./taxonomy-expansion-candidates.md)를 기준으로 검토한다.
2. 빈 대분류의 첫 워크플로우 후보를 하나씩 채운다.
3. 새 체인 추가 PR은 [Workflow Chain Template](./workflow-chain-template.md)로 설계한 뒤 `npm.cmd run validate:data`를 필수 검증으로 사용한다.
