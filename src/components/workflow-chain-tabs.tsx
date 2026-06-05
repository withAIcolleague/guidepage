"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { WorkflowChain } from "@/data/quick-links";

interface WorkflowChainTabsProps {
  chains: WorkflowChain[];
  activeChainId: string;
  onSelectChain: (chainId: string) => void;
}

export function WorkflowChainTabs({
  chains,
  activeChainId,
  onSelectChain,
}: WorkflowChainTabsProps) {
  const activeIndex = Math.max(
    chains.findIndex((chain) => chain.id === activeChainId),
    0,
  );
  const visibleChain = chains[activeIndex];

  if (!visibleChain) return null;

  const selectByOffset = (offset: number) => {
    const nextIndex = Math.min(Math.max(activeIndex + offset, 0), chains.length - 1);
    onSelectChain(chains[nextIndex].id);
  };

  return (
    <div
      className="grid grid-cols-[2rem_minmax(0,1fr)_2rem] items-center gap-2"
      role="tablist"
      aria-label="세부분류"
    >
      <button
        type="button"
        onClick={() => selectByOffset(-1)}
        disabled={activeIndex === 0}
        className="inline-flex size-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-foreground disabled:opacity-40"
        aria-label="이전 세부분류"
      >
        <ChevronLeft className="size-4" />
      </button>

      <div className="min-w-0 rounded-lg border border-border bg-background/70 p-1">
        <button
          type="button"
          role="tab"
          data-workflow-chain-tab="true"
          aria-selected={activeChainId === visibleChain.id}
          onClick={() => onSelectChain(visibleChain.id)}
          className={`flex h-10 w-full items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors ${
            activeChainId === visibleChain.id
              ? "border-foreground/20 bg-foreground text-background shadow-sm"
              : "border-border bg-card text-muted-foreground hover:border-foreground/20 hover:bg-muted/40 hover:text-foreground"
          }`}
        >
          <span aria-hidden="true">{visibleChain.icon}</span>
          <span className="min-w-0 truncate">{visibleChain.name}</span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => selectByOffset(1)}
        disabled={activeIndex === chains.length - 1}
        className="inline-flex size-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-foreground disabled:opacity-40"
        aria-label="다음 세부분류"
      >
        <ChevronRight className="size-4" />
      </button>

      <div className="col-start-2 text-center text-xs text-muted-foreground">
        {activeIndex + 1} / {chains.length}
      </div>
    </div>
  );
}
