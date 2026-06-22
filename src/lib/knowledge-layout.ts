import * as THREE from "three";
import type { GraphNode } from "@/lib/knowledge-graph";

export interface PositionedNode {
  node: GraphNode;
  position: THREE.Vector3;
  parentPosition: THREE.Vector3 | null;
  parentId: string | null;
  expanded: boolean;
  hasChildren: boolean;
}

/** 자식 깊이별 부모로부터의 거리. index = child depth */
const RADIUS_BY_DEPTH = [0, 9, 5, 4, 3, 2];

/** 균일하게 구 표면에 점을 분포 (피보나치 구). */
function fibonacciSphere(count: number): THREE.Vector3[] {
  if (count <= 0) return [];
  if (count === 1) return [new THREE.Vector3(0, 0, 1)];

  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push(
      new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius).normalize(),
    );
  }
  return points;
}

/** axis 방향을 중심으로 원뿔 안에 자식 방향들을 펼칩니다. */
function coneSpread(axis: THREE.Vector3, count: number): THREE.Vector3[] {
  if (count <= 0) return [];
  const a = axis.clone().normalize();
  if (count === 1) return [a];

  // axis에 수직인 기저 벡터 u, v 구성
  const reference =
    Math.abs(a.y) < 0.95 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const u = new THREE.Vector3().crossVectors(a, reference).normalize();
  const v = new THREE.Vector3().crossVectors(a, u).normalize();

  // 자식 수가 많을수록 더 넓게 벌림
  const half = Math.min(1.15, 0.45 + count * 0.07);

  const dirs: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / count;
    const radial = u
      .clone()
      .multiplyScalar(Math.cos(theta))
      .add(v.clone().multiplyScalar(Math.sin(theta)));
    const dir = a
      .clone()
      .multiplyScalar(Math.cos(half))
      .add(radial.multiplyScalar(Math.sin(half)))
      .normalize();
    dirs.push(dir);
  }
  return dirs;
}

/**
 * 확장된 노드 집합을 바탕으로 보이는 노드들의 3D 위치를 계산합니다.
 */
export function layoutGraph(root: GraphNode, expanded: Set<string>): PositionedNode[] {
  const out: PositionedNode[] = [];

  const place = (
    node: GraphNode,
    position: THREE.Vector3,
    axis: THREE.Vector3,
    parentPosition: THREE.Vector3 | null,
    parentId: string | null,
  ) => {
    const isExpanded = expanded.has(node.id);
    out.push({
      node,
      position,
      parentPosition,
      parentId,
      expanded: isExpanded,
      hasChildren: node.children.length > 0,
    });

    if (!isExpanded || node.children.length === 0) return;

    const radius = RADIUS_BY_DEPTH[node.depth + 1] ?? 2;
    const dirs =
      node.depth === 0
        ? fibonacciSphere(node.children.length)
        : coneSpread(axis, node.children.length);

    node.children.forEach((child, index) => {
      const dir = dirs[index] ?? axis;
      const childPosition = position.clone().add(dir.clone().multiplyScalar(radius));
      place(child, childPosition, dir, position, node.id);
    });
  };

  place(root, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 1), null, null);
  return out;
}
