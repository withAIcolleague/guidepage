import type { FlowNode, WorkflowChain } from "@/data/quick-links";

export type SelectedWorkflowItem = {
  chainId: string;
  nodeRole: string;
  mode: "tool" | "theory";
  toolIndex?: number;
};

export type WorkflowSearchResult = {
  chain: WorkflowChain;
  node: FlowNode;
  toolIndex: number;
};
