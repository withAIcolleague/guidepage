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
    name: "asymmetric landing card sizes",
    pass:
      /lg:basis-\[34rem\]/.test(quickLinksSource) &&
      /lg:basis-\[16rem\]/.test(quickLinksSource) &&
      /lg:mt-12/.test(quickLinksSource) &&
      /lg:-rotate-\[0\.18deg\]/.test(quickLinksSource),
  },
  {
    name: "landing layout supports masonry-like flex cards",
    pass:
      /lg:flex/.test(quickLinksSource) &&
      /lg:flex-wrap/.test(quickLinksSource) &&
      /lg:grow/.test(quickLinksSource) &&
      /lg:items-start/.test(quickLinksSource),
  },
  {
    name: "detail workflow split keeps left 3 / right 7 ratio",
    pass: /xl:grid-cols-\[minmax\(0,3fr\)_minmax\(0,7fr\)\]/.test(
      quickLinksSource,
    ),
  },
  {
    name: "right panel is limited to directory and iframe preview",
    pass:
      /activeSection \? \(/.test(quickLinksSource) &&
      /<DirectoryPanel/.test(quickLinksSource) &&
      /entries=\{activeDirEntries\}/.test(quickLinksSource) &&
      /activeUrl=\{activeDirectoryUrl\}/.test(quickLinksSource) &&
      /onSelectEntry=\{selectDirectoryEntry\}/.test(quickLinksSource) &&
      /<PreviewPanel/.test(quickLinksSource) &&
      /data-preview-empty="true"/.test(quickLinksSource) &&
      !/WorkflowDetailPanel/.test(quickLinksSource) &&
      /getDirectoryEntries\(activeCategoryId, activeSectionName\)/.test(
        quickLinksSource,
      ),
  },  {
    name: "detail panel has viewport height cap and internal scroll",
    pass:
      /xl:max-h-\[calc\(100vh-1\.5rem\)\]/.test(quickLinksSource) &&
      /xl:overflow-y-auto/.test(quickLinksSource),
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
    name: "resource preview supports link-card fallback",
    pass:
      /const BLOCKED_DOMAINS = \[/.test(previewPanelSource) &&
      /"github\.com"/.test(previewPanelSource) &&
      /"figma\.com"/.test(previewPanelSource) &&
      /"google\.com"/.test(previewPanelSource) &&
      /"youtube\.com"/.test(previewPanelSource) &&
      /data-resource-preview-card="true"/.test(previewPanelSource) &&
      /data-resource-checklist="true"/.test(previewPanelSource) &&
      /data-resource-preview-fallback="true"/.test(previewPanelSource) &&
      /새 탭에서 보기/.test(previewPanelSource) &&
      /openExternalUrl\(parsedUrl\.href\)/.test(previewPanelSource),
  },
  {
    name: "embedded resource preview has explicit mobile height",
    pass:
      /h-\[88vh\]/.test(previewPanelSource) &&
      /min-h-\[680px\]/.test(previewPanelSource) &&
      /basis-0/.test(previewPanelSource),
  },
  {
    name: "embedded resource preview uses full desktop viewport height",
    pass:
      /data-preview-panel="embedded"/.test(previewPanelSource) &&
      /data-preview-frame="true"/.test(previewPanelSource) &&
      /xl:h-\[calc\(100vh-1\.5rem\)\]/.test(previewPanelSource) &&
      /xl:min-h-\[720px\]/.test(previewPanelSource) &&
      /xl:max-h-none/.test(previewPanelSource),
  },
  {
    name: "workflow nodes page one card with arrow controls",
    pass:
      /const \[nodePage, setNodePage\]/.test(workflowCanvasSource) &&
      /const visibleNode = chain\.nodes\[visibleIndex\]/.test(workflowCanvasSource) &&
      /data-workflow-node-select="true"/.test(workflowCanvasSource) &&
      /data-workflow-tool-button="true"/.test(workflowCanvasSource) &&
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
