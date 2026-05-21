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

## Project Shape

- `src/data/quick-links.ts`: workflow chain data.
- `src/data/workflow-categories.ts`: category -> section -> workflow chain taxonomy.
- `src/data/banners.ts`: direct service portal cards.
- `src/components/quick-links-section.tsx`: workflow dashboard state and composition.
- `src/components/workflow-*.tsx`: category search, chain tabs, canvas, and detail panel UI.
- `src/components/preview-panel.tsx`: left/right split preview with blocked-domain fallback.
