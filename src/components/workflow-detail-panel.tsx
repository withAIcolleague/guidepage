"use client";

import { BookOpen, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FlowNode, WorkflowChain } from "@/data/quick-links";
import { googleSearchUrl, openExternalUrl } from "@/lib/external-links";
import type { SelectedWorkflowItem } from "@/components/workflow-types";

interface WorkflowDetailPanelProps {
  chain: WorkflowChain;
  selectedItem: SelectedWorkflowItem | null;
  selectedNode: FlowNode | null;
  onSelectTheory: (node: FlowNode) => void;
  onSelectTool: (node: FlowNode, toolIndex: number) => void;
  compact?: boolean;
}

export function WorkflowDetailPanel({
  chain,
  selectedItem,
  selectedNode,
  onSelectTheory,
  onSelectTool,
  compact = false,
}: WorkflowDetailPanelProps) {
  if (!selectedNode || !selectedItem) {
    return (
      <aside
        className={`rounded-lg border border-border bg-card shadow-sm ${
          compact ? "p-3" : "min-h-[420px] p-5 lg:sticky lg:top-24"
        }`}
      >
        <div className="text-xs font-medium uppercase text-muted-foreground">
          선택된 세부분류
        </div>
        <h2 className={`${compact ? "mt-1 text-base" : "mt-2 text-xl"} font-semibold tracking-tight`}>
          {chain.name}
        </h2>
        <p className={`${compact ? "mt-1 leading-5" : "mt-2 leading-6"} text-sm text-muted-foreground`}>
          {chain.description}
        </p>
        <div
          className={`rounded-md border border-dashed border-border text-sm text-muted-foreground ${
            compact ? "mt-3 p-3" : "mt-5 p-4"
          }`}
        >
          왼쪽의 단계를 선택하면 이론, 검색, 관련 도구를 한 번에 확인할 수 있습니다.
        </div>
      </aside>
    );
  }

  const selectedUrl =
    selectedItem.mode === "theory"
      ? selectedNode.theoryUrl
      : selectedNode.tools[selectedItem.toolIndex ?? 0]?.url;
  const selectedTitle =
    selectedItem.mode === "theory"
      ? `${selectedNode.role} - 이론`
      : selectedNode.tools[selectedItem.toolIndex ?? 0]?.name;

  return (
    <aside
      className={`rounded-lg border border-border bg-card shadow-sm ${
        compact ? "p-3" : "min-h-[520px] p-5 lg:sticky lg:top-24"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase text-muted-foreground">
            {chain.name}
          </div>
          <h2
            className={`font-semibold tracking-tight ${
              compact ? "mt-1 text-base leading-6" : "mt-2 text-xl leading-7"
            }`}
          >
            {selectedNode.role}
          </h2>
        </div>
        <div
          className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r ${chain.gradient}`}
        />
      </div>

      <div className={`${compact ? "mt-3" : "mt-4"} grid grid-cols-2 gap-2`}>
        {selectedNode.theoryUrl && (
          <Button
            type="button"
            variant={selectedItem.mode === "theory" ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectTheory(selectedNode)}
          >
            <BookOpen className="size-4" />
            이론
          </Button>
        )}
        {selectedNode.searchQuery && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => openExternalUrl(googleSearchUrl(selectedNode.searchQuery!))}
          >
            <Search className="size-4" />
            검색
          </Button>
        )}
      </div>

      <div className={compact ? "mt-3" : "mt-5"}>
        <div className="mb-2 text-xs font-medium text-muted-foreground">관련 도구</div>
        <div className="grid gap-2">
          {selectedNode.tools.map((tool, toolIndex) => {
            const active =
              selectedItem.mode === "tool" && selectedItem.toolIndex === toolIndex;

            return (
              <button
                key={tool.name}
                type="button"
                onClick={() => onSelectTool(selectedNode, toolIndex)}
                className={`flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  active
                    ? "border-foreground/30 bg-foreground text-background"
                    : "border-border bg-background hover:bg-muted/50"
                }`}
              >
                <span className="min-w-0 truncate font-medium">{tool.name}</span>
                <ExternalLink className="size-3.5 shrink-0 opacity-70" />
              </button>
            );
          })}
        </div>
      </div>

      {selectedUrl && selectedTitle && (
        <p className="mt-4 rounded-md border border-dashed border-border px-3 py-2 text-xs leading-5 text-muted-foreground">
          선택한 링크는 화면을 양분한 미리보기 패널에서 열립니다. 제한된 사이트는 새
          탭 이동 버튼을 사용하세요.
        </p>
      )}
    </aside>
  );
}
