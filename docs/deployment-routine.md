# Deployment Routine

Guidepage의 운영 배포 기준은 GitHub `main` 브랜치와 Vercel production 배포다.

## Source Of Truth

- Repository: `withAIcolleague/guidepage`
- Production branch: `main`
- Production domain: `https://guidepage-gray.vercel.app/`
- Deployment platform: Vercel

Netlify 자동 배포는 운영 루틴에서 제외한다. Netlify preview가 생성되더라도 검증 기준이나 production 반영 기준으로 사용하지 않는다.

## Direct Main Push Flow

1. 작업 단위를 구현한다.
2. 아래 검증을 모두 통과시킨다.

```bash
npm.cmd run validate:data
npm.cmd run validate:search
npm.cmd run validate:theme
npm.cmd run validate:layout
npm.cmd run lint
npm.cmd run build
```

3. 변경을 커밋한다.
4. `origin/main`이 최신인지 확인한다.
5. force push 없이 `origin/main`으로 직접 push한다.

```bash
git fetch
git merge-base --is-ancestor origin/main HEAD
git push origin HEAD:main
```

`merge-base` 확인이 실패하면 `origin/main`을 현재 작업 브랜치에 병합하거나 rebase한 뒤 다시 검증한다.

## Production Verification

1. GitHub `main`의 최신 커밋이 방금 push한 커밋인지 확인한다.
2. Vercel production deployment가 새 커밋으로 생성되었는지 확인한다.
3. `https://guidepage-gray.vercel.app/`에서 최신 UI가 반영되었는지 확인한다.
4. production에서 최소 흐름을 확인한다.
   - 메인 대분류 카드 표시
   - 대분류 진입
   - 중분류/세부분류/단계 화살표 이동
   - 검색 결과 선택
   - iframe 제한 사이트의 새 탭 CTA 표시

브라우저 자동화가 불안정한 환경에서는 실제 화면 QA 항목을 완료 처리하지 않는다. 해당 항목은 사람이 production 화면에서 직접 확인한 뒤 체크한다.
