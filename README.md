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
npm.cmd run validate:data
npm.cmd run validate:search
npm.cmd run validate:theme
npm.cmd run validate:layout
npm.cmd run lint
npm.cmd run build
```

On Windows PowerShell, use `npm.cmd` instead of `npm` if script execution policy blocks `npm.ps1`.

The app uses system fonts instead of remote Google Fonts, so `npm.cmd run build`
does not require network access for font downloads.

## Delivery Flow

1. Keep each change focused on one improvement area.
2. Run the verification commands before committing.
3. Push verified changes directly to `origin/main`.
4. Treat Vercel production as the deployment source of truth.
5. Do not use Netlify automatic deploys as an operating or verification target.

See [Deployment Routine](./docs/deployment-routine.md) for the exact production check flow.

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
