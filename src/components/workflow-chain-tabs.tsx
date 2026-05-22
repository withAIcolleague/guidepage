"use client";

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
  return (
    <div className="overflow-x-auto pb-2">
      <div
        className="flex min-w-max gap-2 rounded-lg border border-border bg-background/70 p-1"
        role="tablist"
        aria-label="세부분류"
      >
        {chains.map((chain) => {
          const active = activeChainId === chain.id;

          return (
            <button
              key={chain.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelectChain(chain.id)}
              className={`inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors sm:px-4 ${
                active
                  ? "border-foreground/20 bg-foreground text-background shadow-sm"
                  : "border-border bg-card text-muted-foreground hover:border-foreground/20 hover:bg-muted/40 hover:text-foreground"
              }`}
            >
              <span aria-hidden="true">{chain.icon}</span>
              <span className="max-w-56 truncate">{chain.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
