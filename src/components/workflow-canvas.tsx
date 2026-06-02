"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import type { FlowNode, WorkflowChain } from "@/data/quick-links";
import { googleSearchUrl, openExternalUrl } from "@/lib/external-links";
import type { SelectedWorkflowItem } from "@/components/workflow-types";

interface WorkflowCanvasProps {
  chain: WorkflowChain;
  selectedItem: SelectedWorkflowItem | null;
  onSelectNode: (node: FlowNode) => void;
  onSelectTool: (node: FlowNode, toolIndex: number) => void;
}

export function WorkflowCanvas({
  chain,
  selectedItem,
  onSelectNode,
  onSelectTool,
}: WorkflowCanvasProps) {
  const [nodePage, setNodePage] = useState({ chainId: chain.id, index: 0 });
  const selectedNodeIndex =
    selectedItem?.chainId === chain.id
      ? chain.nodes.findIndex((node) => node.role === selectedItem.nodeRole)
      : -1;
  const nodeIndex =
    nodePage.chainId === chain.id
      ? nodePage.index
      : selectedNodeIndex >= 0
        ? selectedNodeIndex
        : 0;
  const visibleIndex = Math.min(nodeIndex, Math.max(chain.nodes.length - 1, 0));
  const visibleNode = chain.nodes[visibleIndex];

  const renderNodeCard = (node: FlowNode, className: string) => {
    const activeNode =
      selectedItem?.chainId === chain.id && selectedItem.nodeRole === node.role;

    return (
      <div
        data-workflow-node-card="true"
        className={`flex min-h-[150px] flex-col gap-3 rounded-lg border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          activeNode
            ? "border-foreground/40 bg-foreground/[0.04] shadow-md ring-1 ring-foreground/10"
            : "border-border bg-card shadow-sm hover:border-foreground/20 hover:bg-muted/30"
        } ${className}`}
      >
        <div className="flex items-start justify-between gap-2 border-b border-border/70 pb-2">
          <button
            type="button"
            data-workflow-node-select="true"
            onClick={() => onSelectNode(node)}
            className="min-w-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="line-clamp-2 text-xs font-semibold leading-5 text-foreground">
              {node.role}
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">
              {node.tools.length}개 도구
            </div>
          </button>

          {node.searchQuery && (
            <button
              type="button"
              onClick={() => openExternalUrl(googleSearchUrl(node.searchQuery!))}
              className="inline-flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
              aria-label={`${node.role} 검색`}
            >
              <Search className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          {node.tools.map((tool, toolIndex) => {
            const activeTool =
              activeNode &&
              selectedItem?.mode === "tool" &&
              selectedItem.toolIndex === toolIndex;

            return (
              <button
                key={tool.name}
                type="button"
                data-workflow-tool-button="true"
                onClick={() => onSelectTool(node, toolIndex)}
                className={`rounded-md px-2 py-1.5 text-center text-xs font-medium transition-colors ${
                  activeTool
                    ? "bg-foreground text-background"
                    : "bg-muted/50 text-foreground hover:bg-muted"
                }`}
              >
                {tool.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="pb-4" data-workflow-canvas="true">
      {visibleNode && (
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                setNodePage((page) => ({
                  chainId: chain.id,
                  index: Math.max((page.chainId === chain.id ? page.index : visibleIndex) - 1, 0),
                }))
              }
              disabled={visibleIndex === 0}
              className="inline-flex size-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-sm transition-colors disabled:opacity-40"
              aria-label="이전 단계"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="text-xs text-muted-foreground">
              {visibleIndex + 1} / {chain.nodes.length}
            </div>
            <button
              type="button"
              onClick={() =>
                setNodePage((page) => ({
                  chainId: chain.id,
                  index: Math.min(
                    (page.chainId === chain.id ? page.index : visibleIndex) + 1,
                    chain.nodes.length - 1,
                  ),
                }))
              }
              disabled={visibleIndex === chain.nodes.length - 1}
              className="inline-flex size-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-sm transition-colors disabled:opacity-40"
              aria-label="다음 단계"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          {renderNodeCard(visibleNode, "w-full")}
        </div>
      )}
    </div>
  );
}
