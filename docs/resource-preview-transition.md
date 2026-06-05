# Resource Preview Transition

Guidepage의 우측 미리보기는 iframe 브라우저가 아니라 맥락형 리소스 패널을 기준으로 운영한다.
외부 사이트 보안 정책 때문에 iframe은 항상 성공할 수 없으므로, 미리보기는 보조 기능으로 유지한다.

## Direction

- 기본 단위는 `ResourcePreview` 카드다.
- 모든 링크는 제목, 도메인, 새 탭 CTA, 확인 체크리스트를 먼저 보여준다.
- iframe 허용 사이트는 카드 아래에 보조 미리보기를 표시한다.
- iframe 차단 사이트는 iframe을 시도하지 않고 link-card fallback을 보여준다.
- 사용자는 외부 사이트를 보기 전에 “이 도구에서 무엇을 확인해야 하는지”를 먼저 확인한다.

## Preview Types

1. `iframe`
   - iframe 표시가 가능한 문서형 사이트에 사용한다.
   - 카드와 체크리스트가 먼저 나오고, iframe은 아래 보조 영역에 표시한다.

2. `link-card`
   - GitHub, Google, YouTube, Figma, Notion처럼 iframe이 차단되거나 새 탭 사용이 자연스러운 사이트에 사용한다.
   - 도메인, CTA, 확인 체크리스트만 표시한다.

3. `embed`
   - 공식 embed가 있는 사이트에 후속 적용한다.
   - 1차 구현 범위에는 포함하지 않는다.

4. `reader`
   - 문서 본문 일부를 읽기 모드로 보여주는 후속 기능이다.
   - 서버 또는 별도 API가 필요하므로 1차 구현 범위에는 포함하지 않는다.

## Current Implementation

- 기존 `PreviewPanel` 파일명과 props는 유지한다.
- 기존 `tool.url`, `theoryUrl` 데이터만으로 자동 판별한다.
- 차단 도메인은 `BLOCKED_DOMAINS`로 관리한다.
- 도메인별 기본 확인 체크리스트는 `checklistForResource`에서 생성한다.
- 향후 `tool.checklist`가 추가되면 도구별 수동 체크리스트가 기본 체크리스트보다 우선하도록 확장한다.

## QA Requirements

- `data-resource-preview-card="true"`가 표시되어야 한다.
- `data-resource-checklist="true"`가 표시되어야 한다.
- 차단 도메인은 `data-resource-preview-fallback="true"`와 새 탭 CTA를 표시해야 한다.
- iframe 허용 사이트는 resource card 아래에 `data-preview-frame="true"`를 표시할 수 있다.
- PC QA는 중분류, 세부분류, 단계 페이징 후 ResourcePreview 구조까지 확인해야 한다.

## Future Schema Extension

현재 데이터 구조:

```ts
{
  name: "GitHub",
  url: "https://github.com"
}
```

후속 확장 후보:

```ts
{
  name: "GitHub",
  url: "https://github.com",
  previewType: "link-card",
  sourceType: "tool",
  checklist: [
    "README에서 목적과 사용법 확인",
    "최근 commit과 issue 상태 확인",
    "라이선스와 유지보수 신호 확인"
  ]
}
```

이 확장은 지식DB가 충분히 커진 뒤 도구별 품질 차이를 더 세밀하게 다룰 때 적용한다.
