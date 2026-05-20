"use client";

import { ChevronLeft, Layers } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { BannerGrid } from "@/components/banner-grid";
import { Button } from "@/components/ui/button";
import { PreviewPanel } from "@/components/preview-panel";
import { WorkflowCanvas } from "@/components/workflow-canvas";
import { WorkflowChainTabs } from "@/components/workflow-chain-tabs";
import { WorkflowDetailPanel } from "@/components/workflow-detail-panel";
import { WorkflowSearch } from "@/components/workflow-search";
import type { SelectedWorkflowItem, WorkflowSearchResult } from "@/components/workflow-types";
import { workflowCategories, type WorkflowCategory } from "@/data/workflow-categories";
import { workflowChains, type FlowNode, type WorkflowChain } from "@/data/quick-links";

const normalize = (value: string) => value.trim().toLowerCase();

function findNode(chainId: string, nodeRole: string) {
  return workflowChains
    .find((chain) => chain.id === chainId)
    ?.nodes.find((node) => node.role === nodeRole);
}

function findCategoryByChain(chainId: string) {
  return workflowCategories.find((category) => category.chainIds.includes(chainId));
}

function chainsForCategory(category: WorkflowCategory | null) {
  if (!category) return [];
  return category.chainIds
    .map((chainId) => workflowChains.find((chain) => chain.id === chainId))
    .filter((chain): chain is WorkflowChain => Boolean(chain));
}

interface QuickLinksSectionProps {
  onDetailModeChange?: (isDetailMode: boolean) => void;
}

export function QuickLinksSection({ onDetailModeChange }: QuickLinksSectionProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeChainId, setActiveChainId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedWorkflowItem | null>(null);
  const [query, setQuery] = useState("");
  const [previewSide, setPreviewSide] = useState<"left" | "right">("right");

  const activeCategory =
    workflowCategories.find((category) => category.id === activeCategoryId) ?? null;
  const categoryChains = chainsForCategory(activeCategory);
  const activeChain =
    categoryChains.find((chain) => chain.id === activeChainId) ?? categoryChains[0] ?? null;
  const detailMode = Boolean(activeCategory && activeChain);
  const selectedNode = selectedItem
    ? (findNode(selectedItem.chainId, selectedItem.nodeRole) ?? null)
    : null;
  const selectedUrl =
    selectedItem && selectedNode
      ? selectedItem.mode === "theory"
        ? selectedNode.theoryUrl
        : selectedNode.tools[selectedItem.toolIndex ?? 0]?.url
      : undefined;
  const selectedTitle =
    selectedItem && selectedNode
      ? selectedItem.mode === "theory"
        ? `${selectedNode.role} - 이론`
        : selectedNode.tools[selectedItem.toolIndex ?? 0]?.name
      : undefined;
  const previewOpen = Boolean(selectedUrl && selectedTitle);

  useEffect(() => {
    onDetailModeChange?.(detailMode);
    return () => onDetailModeChange?.(false);
  }, [detailMode, onDetailModeChange]);

  const totalNodes = workflowChains.reduce(
    (count, chain) => count + chain.nodes.length,
    0,
  );
  const totalTools = workflowChains.reduce(
    (count, chain) =>
      count +
      chain.nodes.reduce((nodeCount, node) => nodeCount + node.tools.length, 0),
    0,
  );

  const searchResults = useMemo<WorkflowSearchResult[]>(() => {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return [];

    return workflowChains.flatMap((chain) =>
      chain.nodes.flatMap((node) =>
        node.tools.flatMap((tool, toolIndex) => {
          const haystack = normalize(
            [
              chain.name,
              chain.description,
              node.role,
              node.searchQuery ?? "",
              tool.name,
              tool.url,
            ].join(" "),
          );

          return haystack.includes(normalizedQuery)
            ? [{ chain, node, toolIndex }]
            : [];
        }),
      ),
    );
  }, [query]);

  const openCategory = (category: WorkflowCategory) => {
    const firstChainId = category.chainIds.find((chainId) =>
      workflowChains.some((chain) => chain.id === chainId),
    );

    if (!firstChainId) return;

    setActiveCategoryId(category.id);
    setActiveChainId(firstChainId);
    setSelectedItem(null);
  };

  const selectChain = (chainId: string) => {
    setActiveChainId(chainId);
    setSelectedItem(null);
  };

  const selectNode = (chainId: string, node: FlowNode) => {
    setActiveChainId(chainId);
    setSelectedItem({
      chainId,
      nodeRole: node.role,
      mode: node.theoryUrl ? "theory" : "tool",
      toolIndex: node.theoryUrl ? undefined : 0,
    });
  };

  const selectTool = (chainId: string, node: FlowNode, toolIndex: number) => {
    const category = findCategoryByChain(chainId);

    setActiveCategoryId(category?.id ?? activeCategoryId);
    setActiveChainId(chainId);
    setSelectedItem({
      chainId,
      nodeRole: node.role,
      mode: "tool",
      toolIndex,
    });
  };

  return (
    <section
      id="workflow"
      className={`relative w-full px-4 transition-[padding] duration-300 sm:px-6 ${
        detailMode ? "min-h-screen pb-6 pt-4" : "pb-16 pt-6"
      } ${
        previewOpen
          ? previewSide === "left"
            ? "lg:pl-[50vw]"
            : "lg:pr-[50vw]"
          : ""
      }`}
    >
      <div className="absolute inset-0 bg-muted/30" />

      <div className="relative mx-auto max-w-7xl">
        {!detailMode && (
          <>
            <div className="mb-4 grid gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-sm sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <Badge variant="outline" className="mb-2 bg-background px-2 py-0 text-[11px] text-muted-foreground">
                  Knowledge Dashboard
                </Badge>
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  NEXINOUS 워크플로우 맵
                </h1>
                <p className="mt-1.5 max-w-3xl text-sm leading-5 text-muted-foreground">
                  대분류를 먼저 선택한 뒤, 필요한 세부 흐름과 도구를 확인하세요. 복잡한
                  링크 목록 대신 작업 맥락부터 좁혀갑니다.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center sm:min-w-72">
                <div className="rounded-md border border-border bg-background px-3 py-1.5">
                  <div className="text-base font-semibold">{workflowCategories.length}</div>
                  <div className="text-[11px] text-muted-foreground">대분류</div>
                </div>
                <div className="rounded-md border border-border bg-background px-3 py-1.5">
                  <div className="text-base font-semibold">{totalNodes}</div>
                  <div className="text-[11px] text-muted-foreground">단계</div>
                </div>
                <div className="rounded-md border border-border bg-background px-3 py-1.5">
                  <div className="text-base font-semibold">{totalTools}</div>
                  <div className="text-[11px] text-muted-foreground">도구</div>
                </div>
              </div>
            </div>

            <BannerGrid />

            <div className="mb-4">
              <WorkflowSearch
                query={query}
                results={searchResults}
                onQueryChange={setQuery}
                onClear={() => setQuery("")}
                onSelectResult={(result) => {
                  selectTool(result.chain.id, result.node, result.toolIndex);
                  setQuery("");
                }}
              />
            </div>
          </>
        )}

        {!activeCategory || !activeChain ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {workflowCategories.map((category) => {
              const chains = chainsForCategory(category);
              const hasChains = chains.length > 0;
              const nodeCount = chains.reduce(
                (count, chain) => count + chain.nodes.length,
                0,
              );

              return (
                <button
                  key={category.id}
                  type="button"
                  disabled={!hasChains}
                  onClick={() => openCategory(category)}
                  className={`group rounded-lg border border-border p-4 text-left shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    hasChains
                      ? "bg-card hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
                      : "cursor-not-allowed bg-muted/40 text-muted-foreground opacity-75"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {category.icon}
                    </span>
                    <span className="rounded-md bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                      {hasChains ? `${chains.length}개 세부분류` : "준비 중"}
                    </span>
                  </div>
                  <h2 className="mt-4 text-lg font-semibold tracking-tight">
                    {category.name}
                  </h2>
                  <p className="mt-2 min-h-16 text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <Layers className="size-3.5" />
                    <span>{hasChains ? `${nodeCount}개 단계로 구성` : "분류 기준 먼저 확보"}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <>
            <div className="mb-4 rounded-lg border border-border bg-card p-3 shadow-sm">
              <div className="mb-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mb-2 h-8 px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
                  onClick={() => {
                    setActiveCategoryId(null);
                    setActiveChainId(null);
                    setSelectedItem(null);
                  }}
                >
                  <ChevronLeft className="size-4" />
                  대분류로 돌아가기
                </Button>
                <div className="text-xs font-medium uppercase text-muted-foreground">
                  {activeCategory.name}
                </div>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  {activeChain.name}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {activeChain.description}
                </p>
              </div>

              <WorkflowSearch
                compact
                query={query}
                results={searchResults}
                onQueryChange={setQuery}
                onClear={() => setQuery("")}
                onSelectResult={(result) => {
                  selectTool(result.chain.id, result.node, result.toolIndex);
                  setQuery("");
                }}
              />
            </div>

            <div className="mb-4">
              <WorkflowChainTabs
                chains={categoryChains}
                activeChainId={activeChain.id}
                onSelectChain={selectChain}
              />
            </div>

            <div className="grid gap-4">
              <WorkflowCanvas
                chain={activeChain}
                selectedItem={selectedItem}
                onSelectNode={(node) => selectNode(activeChain.id, node)}
                onSelectTool={(node, toolIndex) =>
                  selectTool(activeChain.id, node, toolIndex)
                }
              />

              <WorkflowDetailPanel
                chain={activeChain}
                selectedItem={selectedItem}
                selectedNode={selectedNode}
                onSelectTheory={(node) => selectNode(activeChain.id, node)}
                onSelectTool={(node, toolIndex) =>
                  selectTool(activeChain.id, node, toolIndex)
                }
                compact
              />
            </div>
          </>
        )}
      </div>

      {selectedUrl && selectedTitle && (
        <PreviewPanel
          url={selectedUrl}
          title={selectedTitle}
          isOpen={previewOpen}
          side={previewSide}
          onToggleSide={() =>
            setPreviewSide((current) => (current === "left" ? "right" : "left"))
          }
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
}
