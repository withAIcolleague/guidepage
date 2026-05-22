# NEXINOUS Guidepage

NEXINOUS Guidepage is a workflow-first portal for collecting services, tools, and learning links around practical task flows. Instead of showing every link at once, it starts from encyclopedia-level academic categories, narrows through intermediate fields into detailed workflow chains, and opens previews in a split browser panel.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui-style primitives
- next-themes

## Local Development

```bash
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm.cmd run lint
npm.cmd run build
```

On Windows PowerShell, use `npm.cmd` instead of `npm` if script execution policy blocks `npm.ps1`.

The app uses system fonts instead of remote Google Fonts, so `npm.cmd run build`
does not require network access for font downloads.

## Contribution Flow

1. Work from a `codex/*` branch.
2. Keep each PR focused on one improvement area.
3. Run `npm.cmd run lint` and `npm.cmd run build` before opening a PR.
4. Merge PRs into `main` in dependency order when branches are stacked.

## Project Shape

- `src/data/quick-links.ts`: workflow chain data.
- `src/data/workflow-categories.ts`: category -> section -> workflow chain taxonomy.
- `src/data/banners.ts`: direct service portal cards.
- `src/components/quick-links-section.tsx`: workflow dashboard state and composition.
- `src/components/workflow-*.tsx`: category search, chain tabs, canvas, and detail panel UI.
- `src/components/preview-panel.tsx`: left/right split preview with blocked-domain fallback.

## Product Direction

Guidepage is not a simple bookmark collection. The goal is to help users move
from broad academic categories into practical work contexts, then connect each
context to theory, search, tools, and previewable services in one screen.
