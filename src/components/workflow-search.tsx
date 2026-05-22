"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowSearchResults } from "@/components/workflow-search-results";
import type { WorkflowSearchResult } from "@/components/workflow-types";

interface WorkflowSearchProps {
  query: string;
  results: WorkflowSearchResult[];
  onQueryChange: (value: string) => void;
  onClear: () => void;
  onSelectResult: (result: WorkflowSearchResult) => void;
  compact?: boolean;
  showResults?: boolean;
}

export function WorkflowSearch({
  query,
  results,
  onQueryChange,
  onClear,
  onSelectResult,
  compact = false,
  showResults = true,
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

      {showResults && hasQuery && (
        <div className={`${compact ? "mt-2 pt-2" : "mt-3 pt-3"} border-t border-border`}>
          <WorkflowSearchResults
            results={results}
            onSelectResult={onSelectResult}
            compact={compact}
          />
        </div>
      )}
    </div>
  );
}
