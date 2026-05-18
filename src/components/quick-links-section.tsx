"use client";

import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Search,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { workflowChains, type FlowNode, type WorkflowChain } from "@/data/quick-links";
import { PreviewPanel } from "./preview-panel";

type SelectedNode = {
  node: FlowNode;
  mode: "tool" | "theory";
  toolIndex?: number;
};

type SearchResult = {
  chain: WorkflowChain;
  node: FlowNode;
  toolIndex: number;
};

const normalize = (value: string) => value.trim().toLowerCase();

export function QuickLinksSection() {
  const [activeChain, setActiveChain] = useState(workflowChains[0].id);
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);
  const [query, setQuery] = useState("");

  const selected = workflowChains.find((chain) => chain.id === activeChain) ?? workflowChains[0];
  const normalizedQuery = normalize(query);
  const totalTools = workflowChains.reduce(
    (count, chain) => count + chain.nodes.reduce((nodeCount, node) => nodeCount + node.tools.length, 0),
    0,
  );

  const searchResults = useMemo<SearchResult[]>(() => {
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
  }, [normalizedQuery]);

  const openToolPreview = (chainId: string, node: FlowNode, toolIndex: number) => {
    setActiveChain(chainId);
    setSelectedNode({ node, mode: "tool", toolIndex });
    setQuery("");
  };

  return (
    <section id="workflow" className="relative w-full px-4 pb-20 pt-16 sm:px-6">
      <div className="absolute inset-0 bg-muted/30" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 grid gap-5 rounded-lg border border-border bg-card/80 p-5 shadow-sm backdrop-blur sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <Badge variant="outline" className="mb-3 gap-1.5 bg-background/70">
              <Workflow className="size-3.5" />
              Core Navigation
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              NEXINOUS 워크플로우 맵
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              서비스, 학습 자료, 개발 도구를 작업 흐름 기준으로 묶었습니다. 필요한 도구를 검색하거나 체인을 선택해 바로 확인하세요.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center sm:min-w-72">
            <div className="rounded-md border border-border bg-background px-3 py-2">
              <div className="text-lg font-semibold">{workflowChains.length}</div>
              <div className="text-[11px] text-muted-foreground">체인</div>
            </div>
            <div className="rounded-md border border-border bg-background px-3 py-2">
              <div className="text-lg font-semibold">{totalTools}</div>
              <div className="text-[11px] text-muted-foreground">도구</div>
            </div>
            <div className="rounded-md border border-border bg-background px-3 py-2">
              <div className="text-lg font-semibold">Live</div>
              <div className="text-[11px] text-muted-foreground">포털</div>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-border bg-background p-3 shadow-sm">
          <label htmlFor="workflow-search" className="sr-only">
            워크플로우와 서비스 검색
          </label>
          <div className="flex items-center gap-2">
            <Search className="ml-1 size-4 shrink-0 text-muted-foreground" />
            <input
              id="workflow-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="예: Vercel, 반도체, 디자인, GitHub"
              className="min-h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => setQuery("")}
                aria-label="검색어 지우기"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
        </div>

        {normalizedQuery && (
          <div className="mb-8 rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold">검색 결과</h2>
                <p className="text-xs text-muted-foreground">
                  {searchResults.length > 0
                    ? `${searchResults.length}개의 관련 도구를 찾았습니다.`
                    : "일치하는 도구가 없습니다."}
                </p>
              </div>
              <Sparkles className="size-4 text-muted-foreground" />
            </div>

            {searchResults.length > 0 ? (
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.slice(0, 9).map(({ chain, node, toolIndex }) => {
                  const tool = node.tools[toolIndex];

                  return (
                    <button
                      key={`${chain.id}-${node.role}-${tool.name}`}
                      type="button"
                      onClick={() => openToolPreview(chain.id, node, toolIndex)}
                      className="rounded-md border border-border bg-background p-3 text-left transition-colors hover:border-foreground/30 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold">{tool.name}</div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {chain.name} · {node.role}
                          </div>
                        </div>
                        <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                다른 키워드로 검색해 보세요.
              </div>
            )}
          </div>
        )}

        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2" role="tablist" aria-label="워크플로우 체인">
            {workflowChains.map((chain) => (
              <button
                key={chain.id}
                type="button"
                role="tab"
                aria-selected={activeChain === chain.id}
                onClick={() => {
                  setActiveChain(chain.id);
                  setSelectedNode(null);
                }}
                className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-4 ${
                  activeChain === chain.id
                    ? "border-foreground/20 bg-foreground text-background shadow-md"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                }`}
              >
                <span aria-hidden="true">{chain.icon}</span>
                <span>{chain.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{selected.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{selected.description}</p>
          </div>
          <div className="text-xs text-muted-foreground">가로로 스크롤해 전체 흐름을 확인하세요.</div>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="relative flex min-w-max items-stretch gap-2">
            {selected.nodes.map((node, index) => (
              <div key={node.role} className="flex items-center">
                <div
                  className={`relative flex min-h-[138px] w-[178px] flex-col gap-2 rounded-lg border p-3 transition-all duration-300 ${
                    selectedNode?.node.role === node.role
                      ? "scale-[1.02] border-foreground/50 bg-foreground/5 shadow-lg ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "border-border bg-card shadow-sm hover:border-foreground/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 border-b border-border/60 pb-2">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold leading-5 text-foreground">
                        {node.role}
                      </div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">
                        {node.tools.length}개 도구
                      </div>
                    </div>
                    {node.theoryUrl && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => setSelectedNode({ node, mode: "theory" })}
                        aria-label={`${node.role} 이론 보기`}
                        title="이론 보기"
                      >
                        <BookOpen className="size-3.5" />
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-1.5">
                    {node.tools.map((tool, toolIndex) => (
                      <button
                        key={tool.name}
                        type="button"
                        onClick={() => setSelectedNode({ node, mode: "tool", toolIndex })}
                        className={`rounded-md px-2 py-1.5 text-left text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          selectedNode?.node.role === node.role && selectedNode.toolIndex === toolIndex
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/50 text-foreground hover:bg-muted"
                        }`}
                      >
                        {tool.name}
                      </button>
                    ))}
                  </div>

                  {node.searchQuery && (
                    <Button
                      type="button"
                      variant="outline"
                      size="xs"
                      className="mt-1 justify-between text-[11px]"
                      onClick={() =>
                        window.open(
                          `https://www.google.com/search?q=${encodeURIComponent(node.searchQuery!)}`,
                          "_blank",
                        )
                      }
                    >
                      검색
                      <ExternalLink className="size-3" />
                    </Button>
                  )}
                </div>

                {index < selected.nodes.length - 1 && (
                  <div className="flex items-center px-1 text-muted-foreground">
                    <div className="h-px w-5 bg-border" />
                    <ArrowRight className="size-4" />
                    <div className="h-px w-5 bg-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {selectedNode ? (
          <PreviewPanel
            url={
              selectedNode.mode === "theory"
                ? selectedNode.node.theoryUrl!
                : selectedNode.node.tools[selectedNode.toolIndex!].url
            }
            title={
              selectedNode.mode === "theory"
                ? `${selectedNode.node.role} - 이론`
                : selectedNode.node.tools[selectedNode.toolIndex!].name
            }
            isOpen={!!selectedNode}
            onClose={() => setSelectedNode(null)}
          />
        ) : (
          <div className="mt-6 flex items-center justify-center gap-3 animate-in fade-in duration-500">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${selected.gradient}`} />
              <span>시작</span>
            </div>
            <div className="h-px w-16 bg-border" />
            <span className="text-xs text-muted-foreground">프로세스 흐름</span>
            <div className="h-px w-16 bg-border" />
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${selected.gradient}`} />
              <span>완료</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
