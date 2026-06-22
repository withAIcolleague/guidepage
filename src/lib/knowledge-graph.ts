import { workflowChains } from "@/data/quick-links";
import { workflowCategories } from "@/data/workflow-categories";

export type GraphNodeType = "root" | "category" | "section" | "chain" | "step" | "tool";

export interface GraphNode {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
  type: GraphNodeType;
  depth: number;
  color: string;
  children: GraphNode[];
  /** tool 노드일 때 외부 링크 */
  url?: string;
  /** step 노드일 때 이론/검색 링크 */
  theoryUrl?: string;
  searchQuery?: string;
  /** 표시용 카운트 */
  childCount: number;
}

/**
 * 대분류(카테고리)별로 부여하는 카테고리컬 팔레트.
 * 보라/바이올렛 계열은 의도적으로 제외했습니다.
 */
const PALETTE = [
  "#22d3ee", // cyan
  "#34d399", // emerald
  "#60a5fa", // blue
  "#fbbf24", // amber
  "#fb7185", // rose
  "#2dd4bf", // teal
  "#38bdf8", // sky
  "#a3e635", // lime
  "#fcd34d", // yellow
  "#4ade80", // green
  "#f472b6", // pink
  "#f87171", // red
];

function chainById(chainId: string) {
  return workflowChains.find((chain) => chain.id === chainId) ?? null;
}

/**
 * workflowCategories / workflowChains 데이터를 하나의 방사형 그래프 트리로 변환합니다.
 * root → 대분류 → 중분류 → 세부분류(체인) → 단계 → 도구
 */
export function buildKnowledgeGraph(): GraphNode {
  const categoryNodes: GraphNode[] = workflowCategories.map((category, index) => {
    const color = PALETTE[index % PALETTE.length];

    const sectionNodes: GraphNode[] = category.sections
      .map((section): GraphNode | null => {
        const chains = section.chainIds
          .map((chainId) => chainById(chainId))
          .filter((chain): chain is NonNullable<ReturnType<typeof chainById>> => Boolean(chain));

        if (chains.length === 0) return null;

        const chainNodes: GraphNode[] = chains.map((chain) => {
          const stepNodes: GraphNode[] = chain.nodes.map((node, nodeIndex) => {
            const toolNodes: GraphNode[] = node.tools.map((tool, toolIndex) => ({
              id: `tool:${chain.id}:${nodeIndex}:${toolIndex}`,
              label: tool.name,
              type: "tool" as const,
              depth: 5,
              color,
              children: [],
              url: tool.url,
              childCount: 0,
            }));

            return {
              id: `step:${chain.id}:${nodeIndex}`,
              label: node.role,
              sublabel: `${node.tools.length}개 도구`,
              type: "step" as const,
              depth: 4,
              color,
              children: toolNodes,
              theoryUrl: node.theoryUrl,
              searchQuery: node.searchQuery,
              childCount: toolNodes.length,
            };
          });

          return {
            id: `chain:${chain.id}`,
            label: chain.name,
            sublabel: chain.description,
            icon: chain.icon,
            type: "chain" as const,
            depth: 3,
            color,
            children: stepNodes,
            childCount: stepNodes.length,
          };
        });

        return {
          id: `sec:${category.id}:${section.id}`,
          label: section.name,
          sublabel: section.description,
          type: "section" as const,
          depth: 2,
          color,
          children: chainNodes,
          childCount: chainNodes.length,
        };
      })
      .filter((section): section is GraphNode => Boolean(section));

    return {
      id: `cat:${category.id}`,
      label: category.name,
      sublabel: category.description,
      icon: category.icon,
      type: "category" as const,
      depth: 1,
      color,
      children: sectionNodes,
      childCount: sectionNodes.length,
    };
  });

  return {
    id: "root",
    label: "지식 지도",
    sublabel: "탐색을 시작하세요",
    type: "root",
    depth: 0,
    color: "#e5e7eb",
    children: categoryNodes,
    childCount: categoryNodes.length,
  };
}

/** 특정 노드의 모든 하위 노드 id를 수집합니다 (접기 처리용). */
export function collectDescendantIds(node: GraphNode): string[] {
  const ids: string[] = [];
  const walk = (current: GraphNode) => {
    for (const child of current.children) {
      ids.push(child.id);
      walk(child);
    }
  };
  walk(node);
  return ids;
}

/** id로 노드를 찾습니다. */
export function findGraphNode(root: GraphNode, id: string): GraphNode | null {
  if (root.id === id) return root;
  for (const child of root.children) {
    const found = findGraphNode(child, id);
    if (found) return found;
  }
  return null;
}

export const TYPE_LABEL: Record<GraphNodeType, string> = {
  root: "지식 지도",
  category: "대분류",
  section: "중분류",
  chain: "세부분류",
  step: "단계",
  tool: "도구",
};
