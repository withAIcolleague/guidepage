"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WorkflowSearchResult } from "@/components/workflow-types";

interface WorkflowSearchProps {
  query: string;
  results: WorkflowSearchResult[];
  onQueryChange: (value: string) => void;
  onClear: () => void;
  onSelectResult: (result: WorkflowSearchResult) => void;
  compact?: boolean;
}

export function WorkflowSearch({
  query,
  results,
  onQueryChange,
  onClear,
  onSelectResult,
  compact = false,
}: WorkflowSearchProps) {
  const hasQuery = query.trim().length > 0;

  return (
    <div
      className={`rounded-lg border border-border bg-background shadow-sm ${
        compact ? "px-2.5 py-1.5" : "px-3 py-2"
      }`}
    >
      <label htmlFor="workflow-search" className="sr-only">
        워크플로우와 도구 검색
      </label>
      <div className={`flex items-center gap-2 ${compact ? "min-h-8" : "min-h-9"}`}>
        <Search className="ml-1 size-4 shrink-0 text-muted-foreground" />
        <input
          id="workflow-search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="맥락, 단계, 도구 검색"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {hasQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onClear}
            aria-label="검색어 지우기"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {hasQuery && (
        <div className={`${compact ? "mt-2 pt-2" : "mt-3 pt-3"} border-t border-border`}>
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>검색 결과</span>
            <span>{results.length}개</span>
          </div>

          {results.length > 0 ? (
            <div
              className={`grid gap-2 ${
                compact
                  ? "max-h-56 overflow-y-auto pr-1"
                  : "sm:grid-cols-2 xl:grid-cols-3"
              }`}
            >
              {results.slice(0, 12).map((result) => {
                const tool = result.node.tools[result.toolIndex];

                return (
                  <button
                    key={`${result.chain.id}-${result.node.role}-${tool.name}`}
                    type="button"
                    onClick={() => onSelectResult(result)}
                    className="rounded-md border border-border bg-card px-3 py-2 text-left transition-colors hover:border-foreground/30 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="truncate text-sm font-semibold text-foreground">
                      {tool.name}
                    </div>
                    <div className="mt-1 truncate text-xs text-muted-foreground">
                      {result.chain.name} · {result.node.role}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-border px-3 py-5 text-center text-sm text-muted-foreground">
              일치하는 도구가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
