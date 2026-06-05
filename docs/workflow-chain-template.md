# Workflow Chain Template

이 문서는 지식DB 확장 시 새 워크플로우 체인을 추가하는 표준 템플릿이다.
새 체인은 아래 순서로 작성한다.

## 1. Taxonomy Placement

먼저 새 체인이 어느 대분류와 중분류에 들어갈지 정한다.

```ts
// src/data/workflow-categories.ts
{
  id: "category-id",
  name: "대분류명",
  description: "대분류 설명",
  icon: "아이콘",
  sections: [
    {
      id: "section-id",
      name: "중분류명",
      description: "중분류 설명",
      chainIds: ["new-workflow-chain-id"],
    },
  ],
}
```

작성 기준:

- `category-id`, `section-id`, `new-workflow-chain-id`는 kebab-case를 사용한다.
- 기존 대분류/중분류에 들어갈 수 있으면 새 대분류를 만들지 않는다.
- 중분류는 학문/산업/작업 맥락을 묶는 기준이고, 개별 실행 순서는 체인에서 다룬다.
- `chainIds`에 넣은 ID는 반드시 `src/data/quick-links.ts`의 `WorkflowChain.id`와 같아야 한다.

## 2. Workflow Chain Skeleton

새 체인은 `src/data/quick-links.ts`의 `workflowChains` 배열에 추가한다.

```ts
{
  id: "new-workflow-chain-id",
  name: "세부분류 / 워크플로우 이름",
  description: "이 체인이 다루는 작업 흐름을 한 문장으로 설명",
  icon: "🧭",
  gradient: "from-sky-500 to-blue-600",
  nodes: [
    {
      role: "1단계 역할 / 실행 맥락",
      theoryUrl: "https://example.com/concept",
      searchQuery: "사용자가 실제로 검색할 자연어 검색어",
      tools: [
        {
          name: "도구명",
          url: "https://example.com",
          // 후속 확장 후보:
          // checklist: ["이 도구에서 확인할 것"],
        },
      ],
    },
  ],
}
```

작성 기준:

- `name`은 단순 주제명이 아니라 사용자가 들어갈 작업 맥락을 설명해야 한다.
- `description`은 “무엇에서 무엇까지 이어지는 흐름”인지 보여준다.
- `nodes`는 사용자의 사고 또는 실행 순서대로 배열한다.
- `gradient`는 기존 값과 너무 비슷하지 않게 고르되, UI의 절제된 톤을 해치지 않는다.

## 3. Node Design

각 `FlowNode`는 하나의 작업 단계다.

좋은 예:

```ts
{
  role: "문제 정의 / 요구사항 정리",
  theoryUrl: "https://ko.wikipedia.org/wiki/요구사항_분석",
  searchQuery: "제품 요구사항 정의 방법 PRD 작성법",
  tools: [
    { name: "Notion", url: "https://www.notion.so" },
    { name: "Google Docs", url: "https://docs.google.com" },
  ],
}
```

피해야 할 예:

```ts
{
  role: "자료",
  tools: [{ name: "Google", url: "https://google.com" }],
}
```

피해야 하는 이유:

- `role`이 너무 넓어서 단계의 의미가 없다.
- `theoryUrl` 또는 `searchQuery`가 없어 검색/학습 맥락이 약하다.
- 도구가 너무 일반적이라 실제 실행 경로를 좁혀주지 못한다.

## 4. Link Role Rules

`theoryUrl`과 `tools.url`은 반드시 역할을 분리한다.

- `theoryUrl`: 개념, 원리, 방법론, 역사, 정의를 이해하는 링크.
- `tools.url`: 사용자가 실제 작업을 실행하는 도구나 서비스 링크.
- 같은 URL을 `theoryUrl`과 `tools.url`에 동시에 넣지 않는다.
- 공식 문서나 안정적인 설명 자료를 우선한다.
- 블로그 링크는 공식/기초 자료가 부족할 때만 쓴다.

## 5. Search Query Rules

`searchQuery`는 사용자가 실제로 입력할 법한 자연어여야 한다.

좋은 검색어:

- `UI UX 디자인 기초`
- `반도체 EUV 리소그래피 원리`
- `스타트업 MVP 검증 방법`
- `투자 포트폴리오 리밸런싱 전략`

피해야 할 검색어:

- `tool`
- `study`
- `link`
- `AI`

기준:

- 너무 짧은 단어 하나만 쓰지 않는다.
- 단계의 역할, 도메인, 목적이 드러나야 한다.
- 같은 체인 안에서 검색어가 반복되지 않게 한다.

## 6. Card Length Rules

중분류, 세부분류, 단계 카드는 단일 카드 페이징 UI에서 읽혀야 한다.

- `name`은 가능하면 20자 안팎으로 유지한다.
- `role`은 길어도 40자 안팎으로 유지한다.
- 괄호와 슬래시를 과도하게 쓰지 않는다.
- 긴 설명은 `description`이나 `searchQuery`로 보낸다.
- 카드에서 핵심 단어가 앞쪽에 오게 쓴다.

## 7. ResourcePreview Rules

ResourcePreview 기준:

- 모든 도구는 기본적으로 link-card와 새 탭 CTA가 표시된다.
- iframe은 가능한 사이트에서만 보조로 표시된다.
- 중요한 도구는 후속 확장 시 `checklist`를 추가해 도메인 기본 체크리스트보다 구체적으로 안내한다.

## 8. Pre-PR Checklist

새 체인을 추가한 PR은 아래 명령을 통과해야 한다.

```bash
npm.cmd run validate:data
npm.cmd run lint
npm.cmd run build
```

검증 전 확인:

- [ ] `WorkflowChain.id`가 중복되지 않는다.
- [ ] `WorkflowCategorySection.chainIds`가 실제 체인을 참조한다.
- [ ] 모든 URL이 `http://` 또는 `https://`로 시작한다.
- [ ] 같은 단계 안에서 도구 URL이 중복되지 않는다.
- [ ] `theoryUrl`과 `tools.url`이 같은 URL이 아니다.
- [ ] 각 단계에 `searchQuery` 또는 `theoryUrl`이 있다.
- [ ] 모바일 단일 카드에서 이름이 지나치게 길지 않다.

## 9. Minimal Example

```ts
{
  id: "research-writing-flow",
  name: "리서치 글쓰기 흐름",
  description: "자료 탐색에서 초안 작성, 검토, 발행까지 이어지는 글쓰기 작업 흐름",
  icon: "✍️",
  gradient: "from-emerald-500 to-teal-600",
  nodes: [
    {
      role: "주제 정의 / 질문 만들기",
      theoryUrl: "https://ko.wikipedia.org/wiki/연구문제",
      searchQuery: "리서치 질문 만드는 방법",
      tools: [
        { name: "Google Scholar", url: "https://scholar.google.com" },
      ],
    },
    {
      role: "자료 수집 / 출처 정리",
      theoryUrl: "https://ko.wikipedia.org/wiki/문헌_검토",
      searchQuery: "문헌 검토 자료 정리 방법",
      tools: [
        { name: "Zotero", url: "https://www.zotero.org" },
      ],
    },
    {
      role: "초안 작성 / 구조화",
      theoryUrl: "https://ko.wikipedia.org/wiki/개요",
      searchQuery: "글쓰기 개요 작성법",
      tools: [
        { name: "Google Docs", url: "https://docs.google.com" },
        { name: "Notion", url: "https://www.notion.so" },
      ],
    },
  ],
}
```
