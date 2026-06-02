import { readFileSync } from "node:fs";

const quickLinksSource = readFileSync("src/components/quick-links-section.tsx", "utf8");
const previewPanelSource = readFileSync("src/components/preview-panel.tsx", "utf8");
const workflowCanvasSource = readFileSync("src/components/workflow-canvas.tsx", "utf8");
const workflowChainTabsSource = readFileSync(
  "src/components/workflow-chain-tabs.tsx",
  "utf8",
);

const checks = [
  {
    name: "landing card shape helper",
    pass: /function landingCardClassName/.test(quickLinksSource),
  },
  {
    name: "asymmetric landing spans",
    pass: /lg:col-span-2/.test(quickLinksSource) && /lg:mt-10/.test(quickLinksSource),
  },
  {
    name: "landing grid supports irregular cards",
    pass: /lg:grid-cols-4/.test(quickLinksSource) && /lg:items-start/.test(quickLinksSource),
  },
  {
    name: "detail workflow split remains structured",
    pass: /lg:grid-cols-\[minmax\(0,1fr\)_minmax\(420px,50vw\)\]/.test(
      quickLinksSource,
    ),
  },
  {
    name: "detail panel has viewport height cap and internal scroll",
    pass:
      /lg:max-h-\[calc\(100vh-1\.5rem\)\]/.test(quickLinksSource) &&
      /lg:overflow-y-auto/.test(quickLinksSource),
  },
  {
    name: "search result selection moves category section chain and node",
    pass:
      /const selectSearchResult = \(result: WorkflowSearchResult\) =>/.test(
        quickLinksSource,
      ) &&
      /setActiveCategoryId\(result\.category\.id\)/.test(quickLinksSource) &&
      /setActiveSectionId\(result\.section\.id\)/.test(quickLinksSource) &&
      /setActiveChainId\(result\.chain\.id\)/.test(quickLinksSource) &&
      /setSectionPage\(sectionIndex >= 0 \? sectionIndex : 0\)/.test(
        quickLinksSource,
      ) &&
      /nodeRole: result\.node\.role/.test(quickLinksSource) &&
      /toolIndex: result\.toolIndex/.test(quickLinksSource),
  },
  {
    name: "iframe blocked domains show new-tab fallback",
    pass:
      /const BLOCKED_DOMAINS = \[/.test(previewPanelSource) &&
      /"github\.com"/.test(previewPanelSource) &&
      /"figma\.com"/.test(previewPanelSource) &&
      /"google\.com"/.test(previewPanelSource) &&
      /"youtube\.com"/.test(previewPanelSource) &&
      /새 탭에서 보기/.test(previewPanelSource) &&
      /openExternalUrl\(parsedUrl\.href\)/.test(previewPanelSource),
  },
  {
    name: "workflow nodes page one card with arrow controls",
    pass:
      /const \[nodePage, setNodePage\]/.test(workflowCanvasSource) &&
      /const visibleNode = chain\.nodes\[visibleIndex\]/.test(workflowCanvasSource) &&
      /aria-label="이전 단계"/.test(workflowCanvasSource) &&
      /aria-label="다음 단계"/.test(workflowCanvasSource),
  },
  {
    name: "workflow chains page one card with arrow controls",
    pass:
      /const visibleChain = chains\[activeIndex\]/.test(workflowChainTabsSource) &&
      /aria-label="이전 세부분류"/.test(workflowChainTabsSource) &&
      /aria-label="다음 세부분류"/.test(workflowChainTabsSource),
  },
];

const failures = checks.filter((check) => !check.pass);

if (failures.length > 0) {
  console.error("Layout validation failed:");
  failures.forEach((check) => console.error(`- ${check.name}`));
  process.exit(1);
}

console.log(`Layout validation passed for ${checks.length} structural checks.`);
