"use client";

import { ArrowRight, Search } from "lucide-react";
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
  return (
    <div className="overflow-x-auto pb-4">
      <div className="relative flex min-w-max items-stretch gap-2">
        {chain.nodes.map((node, index) => {
          const activeNode =
            selectedItem?.chainId === chain.id && selectedItem.nodeRole === node.role;

          return (
            <div key={node.role} className="flex items-center">
              <div
                className={`flex min-h-[150px] w-[176px] flex-col gap-3 rounded-lg border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  activeNode
                    ? "border-foreground/40 bg-foreground/[0.04] shadow-md ring-1 ring-foreground/10"
                    : "border-border bg-card shadow-sm hover:border-foreground/20 hover:bg-muted/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2 border-b border-border/70 pb-2">
                  <button
                    type="button"
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

              {index < chain.nodes.length - 1 && (
                <div className="flex items-center px-1 text-muted-foreground">
                  <div className="h-px w-5 bg-border" />
                  <ArrowRight className="size-4" />
                  <div className="h-px w-5 bg-border" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
