"use client";

import { Html, Line, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ExternalLink, RotateCcw, Search, Sparkles } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { googleSearchUrl, openExternalUrl } from "@/lib/external-links";
import {
  buildKnowledgeGraph,
  collectDescendantIds,
  type GraphNode,
  TYPE_LABEL,
} from "@/lib/knowledge-graph";
import { layoutGraph, type PositionedNode } from "@/lib/knowledge-layout";

const SPHERE_SIZE: Record<string, number> = {
  root: 1.1,
  category: 0.72,
  section: 0.52,
  chain: 0.42,
  step: 0.3,
  tool: 0.18,
};

const FOCUS_DISTANCE: Record<string, number> = {
  root: 24,
  category: 16,
  section: 12,
  chain: 9,
  step: 6.5,
  tool: 4.5,
};

interface FocusState {
  target: THREE.Vector3;
  distance: number;
  dirty: boolean;
}

function CameraRig({
  focus,
  controlsRef,
}: {
  focus: React.MutableRefObject<FocusState>;
  controlsRef: React.MutableRefObject<any>;
}) {
  const { camera } = useThree();
  const offsetDir = useRef(new THREE.Vector3(0, 0.25, 1).normalize());
  // 포커스 이동 중에만 카메라를 강제 이동한다. 이동이 끝나면 OrbitControls가
  // 완전히 제어권을 가져 사용자가 자유롭게 회전할 수 있다.
  const animating = useRef(false);
  const desired = useRef(new THREE.Vector3());

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (focus.current.dirty) {
      // 현재 시점(사용자가 돌려둔 각도)을 유지한 채 목표 노드로 이동한다.
      const dir = camera.position.clone().sub(controls.target);
      if (dir.lengthSq() > 0.0001) {
        offsetDir.current.copy(dir.normalize());
      }
      desired.current
        .copy(focus.current.target)
        .add(offsetDir.current.clone().multiplyScalar(focus.current.distance));
      animating.current = true;
      focus.current.dirty = false;
    }

    if (!animating.current) return;

    controls.target.lerp(focus.current.target, 0.1);
    camera.position.lerp(desired.current, 0.1);
    controls.update();

    // 목표에 충분히 가까워지면 애니메이션을 멈추고 제어권을 넘긴다.
    if (
      controls.target.distanceToSquared(focus.current.target) < 0.0004 &&
      camera.position.distanceToSquared(desired.current) < 0.0004
    ) {
      controls.target.copy(focus.current.target);
      camera.position.copy(desired.current);
      controls.update();
      animating.current = false;
    }
  });

  return null;
}

function GraphNodeMesh({
  item,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  item: PositionedNode;
  selected: boolean;
  hovered: boolean;
  onSelect: (item: PositionedNode) => void;
  onHover: (id: string | null) => void;
}) {
  const { node, position } = item;
  const baseSize = SPHERE_SIZE[node.type] ?? 0.3;
  const active = selected || hovered;
  const showLabel = node.type !== "tool" || hovered || selected;

  return (
    <group position={position}>
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          onSelect(item);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          onHover(node.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          onHover(null);
          document.body.style.cursor = "auto";
        }}
        scale={active ? 1.35 : 1}
      >
        <sphereGeometry args={[baseSize, 32, 32]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={active ? 1.1 : item.expanded ? 0.55 : 0.3}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* 확장 가능 표시 링 */}
      {item.hasChildren && !item.expanded && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[baseSize * 1.6, baseSize * 1.9, 32]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      )}

      {showLabel && (
        <Html
          center
          position={[0, baseSize + 0.45, 0]}
          distanceFactor={node.type === "root" ? 22 : 16}
          style={{ pointerEvents: "none", userSelect: "none" }}
          zIndexRange={[20, 0]}
        >
          <div
            className="flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-0.5 text-center font-medium backdrop-blur-sm"
            style={{
              background: active ? node.color : "rgba(10,14,22,0.72)",
              color: active ? "#0a0e16" : "#e5e7eb",
              border: `1px solid ${node.color}`,
              fontSize: node.type === "root" ? 15 : node.type === "category" ? 13 : 11,
            }}
          >
            {node.icon ? <span>{node.icon}</span> : null}
            <span>{node.label}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

function Scene({
  positioned,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  focus,
  controlsRef,
}: {
  positioned: PositionedNode[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (item: PositionedNode) => void;
  onHover: (id: string | null) => void;
  focus: React.MutableRefObject<FocusState>;
  controlsRef: React.MutableRefObject<any>;
}) {
  const edges = useMemo(
    () => positioned.filter((item) => item.parentPosition),
    [positioned],
  );

  return (
    <>
      <color attach="background" args={["#070b14"]} />
      <fog attach="fog" args={["#070b14", 28, 70]} />
      <ambientLight intensity={0.7} />
      <pointLight position={[0, 0, 0]} intensity={2.2} distance={40} color="#9fd8ff" />
      <directionalLight position={[10, 12, 8]} intensity={0.6} />
      <Stars radius={120} depth={60} count={3500} factor={4} saturation={0} fade speed={0.6} />

      {edges.map((item) => (
        <Line
          key={`edge-${item.node.id}`}
          points={[
            item.parentPosition as THREE.Vector3,
            item.position,
          ]}
          color={item.node.color}
          lineWidth={item.node.depth <= 2 ? 1.4 : 0.8}
          transparent
          opacity={hoveredId === item.node.id || selectedId === item.node.id ? 0.9 : 0.28}
        />
      ))}

      {positioned.map((item) => (
        <GraphNodeMesh
          key={item.node.id}
          item={item}
          selected={selectedId === item.node.id}
          hovered={hoveredId === item.node.id}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}

      <CameraRig focus={focus} controlsRef={controlsRef} />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        minDistance={3}
        maxDistance={55}
        rotateSpeed={0.6}
        zoomSpeed={0.8}
      />
    </>
  );
}

export function KnowledgeGraph3D() {
  const root = useMemo(() => buildKnowledgeGraph(), []);
  const [expandedIds, setExpandedIds] = useState<string[]>(["root"]);
  const [selectedId, setSelectedId] = useState<string | null>("root");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const controlsRef = useRef<any>(null);
  const focus = useRef<FocusState>({
    target: new THREE.Vector3(0, 0, 0),
    distance: FOCUS_DISTANCE.root,
    dirty: true,
  });

  const expanded = useMemo(() => new Set(expandedIds), [expandedIds]);
  const positioned = useMemo(() => layoutGraph(root, expanded), [root, expanded]);

  const selectedNode = useMemo(
    () => positioned.find((item) => item.node.id === selectedId)?.node ?? null,
    [positioned, selectedId],
  );

  const flyTo = useCallback((position: THREE.Vector3, type: string) => {
    focus.current.target.copy(position);
    focus.current.distance = FOCUS_DISTANCE[type] ?? 8;
    focus.current.dirty = true;
  }, []);

  const handleSelect = useCallback(
    (item: PositionedNode) => {
      const { node, position } = item;

      if (node.type === "tool" && node.url) {
        openExternalUrl(node.url);
        return;
      }

      setSelectedId(node.id);
      flyTo(position, node.type);

      if (node.children.length > 0) {
        setExpandedIds((prev) => {
          const set = new Set(prev);
          if (set.has(node.id)) {
            set.delete(node.id);
            for (const descendant of collectDescendantIds(node)) {
              set.delete(descendant);
            }
          } else {
            set.add(node.id);
          }
          return [...set];
        });
      }
    },
    [flyTo],
  );

  const reset = useCallback(() => {
    setExpandedIds(["root"]);
    setSelectedId("root");
    setHoveredId(null);
    flyTo(new THREE.Vector3(0, 0, 0), "root");
  }, [flyTo]);

  return (
    <div className="fixed inset-0 top-12 bg-[#070b14]">
      <Canvas camera={{ position: [0, 5, 26], fov: 50 }} dpr={[1, 2]}>
        <Scene
          positioned={positioned}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={handleSelect}
          onHover={setHoveredId}
          focus={focus}
          controlsRef={controlsRef}
        />
      </Canvas>

      {/* 상단 안내 */}
      <div className="pointer-events-none absolute left-4 top-4 max-w-xs">
        <div className="pointer-events-auto rounded-lg border border-white/10 bg-black/40 p-3 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="size-4 text-cyan-300" />
            3D 지식 탐색
          </div>
          <p className="mt-1 text-xs leading-relaxed text-white/60">
            노드를 클릭하면 카메라가 이동하며 하위 지식이 펼쳐집니다. 드래그로 회전, 스크롤로
            확대·축소하세요.
          </p>
        </div>
      </div>

      {/* 리셋 버튼 */}
      <div className="absolute right-4 top-4">
        <Button
          size="sm"
          variant="secondary"
          onClick={reset}
          className="gap-1.5 bg-black/40 text-white backdrop-blur-md hover:bg-black/60"
        >
          <RotateCcw className="size-3.5" />
          초기화
        </Button>
      </div>

      {/* 상세 패널 */}
      {selectedNode && selectedNode.type !== "root" && (
        <div className="absolute bottom-4 left-4 right-4 mx-auto max-w-md sm:left-auto sm:right-4">
          <div className="rounded-xl border border-white/10 bg-black/55 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                style={{ background: selectedNode.color, color: "#0a0e16" }}
              >
                {TYPE_LABEL[selectedNode.type]}
              </span>
              {selectedNode.childCount > 0 && (
                <span className="text-[11px] text-white/50">
                  하위 {selectedNode.childCount}개
                </span>
              )}
            </div>

            <h3 className="mt-2 flex items-center gap-1.5 text-base font-bold text-white">
              {selectedNode.icon ? <span>{selectedNode.icon}</span> : null}
              {selectedNode.label}
            </h3>
            {selectedNode.sublabel && (
              <p className="mt-1 text-xs leading-relaxed text-white/60">{selectedNode.sublabel}</p>
            )}

            {/* step: 이론 / 검색 / 도구 */}
            {selectedNode.type === "step" && (
              <div className="mt-3 space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.theoryUrl && (
                    <button
                      type="button"
                      onClick={() => openExternalUrl(selectedNode.theoryUrl as string)}
                      className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-white/80 transition-colors hover:bg-white/10"
                    >
                      <ExternalLink className="size-3" />
                      이론 보기
                    </button>
                  )}
                  {selectedNode.searchQuery && (
                    <button
                      type="button"
                      onClick={() =>
                        openExternalUrl(googleSearchUrl(selectedNode.searchQuery as string))
                      }
                      className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-white/80 transition-colors hover:bg-white/10"
                    >
                      <Search className="size-3" />
                      검색
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.children.map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => tool.url && openExternalUrl(tool.url)}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-opacity hover:opacity-80"
                      style={{ background: `${selectedNode.color}22`, color: selectedNode.color }}
                    >
                      {tool.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedNode.type !== "step" && selectedNode.childCount > 0 && (
              <p className="mt-3 text-[11px] text-white/40">
                노드를 클릭하면 {expanded.has(selectedNode.id) ? "접을" : "펼칠"} 수 있습니다.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
