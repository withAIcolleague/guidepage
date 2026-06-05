"use client";

import type { WorkflowSearchResult } from "@/components/workflow-types";

interface WorkflowSearchResultsProps {
  results: WorkflowSearchResult[];
  onSelectResult: (result: WorkflowSearchResult) => void;
  compact?: boolean;
  maxResults?: number;
  query?: string;
  scopeLabel?: string;
}

export function WorkflowSearchResults({
  results,
  onSelectResult,
  compact = false,
  maxResults = 12,
  query = "",
  scopeLabel = "현재 분류",
}: WorkflowSearchResultsProps) {
  const trimmedQuery = query.trim();
  const visibleResults = results.slice(0, maxResults);
  const hiddenCount = Math.max(results.length - visibleResults.length, 0);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>검색 결과</span>
        <span>
          {results.length}개{hiddenCount > 0 ? ` / 상위 ${visibleResults.length}개` : ""}
        </span>
      </div>

      {results.length > 0 ? (
        <div
          className={`grid gap-2 ${
            compact ? "max-h-56 overflow-y-auto pr-1" : "max-h-[48vh] overflow-y-auto pr-1"
          }`}
        >
          {visibleResults.map((result) => {
            const tool = result.node.tools[result.toolIndex];

            return (
              <button
                key={`${result.chain.id}-${result.node.role}-${tool.name}`}
                type="button"
                onClick={() => onSelectResult(result)}
                className="rounded-md border border-border bg-card px-3 py-2 text-left transition-colors hover:border-foreground/30 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-foreground">
                      {tool.name}
                    </div>
                    <div className="mt-1 truncate text-xs text-muted-foreground">
                      {result.chain.name}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                    도구
                  </span>
                </div>
                <div className="mt-2 truncate border-t border-border/70 pt-2 text-xs text-muted-foreground">
                  {result.category.name} / {result.section.name}
                </div>
                <div className="mt-1 truncate text-xs text-muted-foreground">
                  {result.node.role}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-border bg-muted/20 px-4 py-5 text-center text-sm text-muted-foreground">
          <p className="font-medium text-foreground">일치하는 결과가 없습니다.</p>
          <p className="mt-2 leading-6">
            {trimmedQuery ? (
              <>
                <strong className="font-semibold text-foreground">{trimmedQuery}</strong>
                {" "}검색어는 {scopeLabel} 안에서 찾지 못했습니다.
              </>
            ) : (
              "검색어를 입력하면 현재 맥락 안의 세부분류, 단계, 도구를 찾습니다."
            )}
          </p>
          <p className="mt-1 text-xs leading-5">
            더 넓게 찾으려면 상위 분류로 돌아가거나, 검색어를 더 짧게 입력하세요.
          </p>
        </div>
      )}
    </div>
  );
}
