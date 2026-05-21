import type { FlowNode, WorkflowChain } from "@/data/quick-links";
import type {
  WorkflowCategory,
  WorkflowCategorySection,
} from "@/data/workflow-categories";

export type SelectedWorkflowItem = {
  chainId: string;
  nodeRole: string;
  mode: "tool" | "theory";
  toolIndex?: number;
};

export type WorkflowSearchResult = {
  category: WorkflowCategory;
  section: WorkflowCategorySection;
  chain: WorkflowChain;
  node: FlowNode;
  toolIndex: number;
};
