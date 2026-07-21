"use client";

import { Html, Line, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ChevronLeft, ChevronRight, ExternalLink, RotateCcw, Search, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { googleSearchUrl, openExternalUrl } from "@/lib/external-links";
import {
  buildKnowledgeGraph,
  collectDescendantIds,
  findGraphNode,
  TYPE_LABEL,
} from "@/lib/knowledge-graph";
import { layoutGraph, type PositionedNode } from "@/lib/knowledge-layout";
import { PreviewPanel } from "@/components/preview-panel";
import { convergenceLinks, workflowCategories } from "@/data/workflow-categories";

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
  animating: boolean;
}

function CameraRig({
  focus,
  controlsRef,
}: {
  focus: React.MutableRefObject<FocusState>;
  controlsRef: React.MutableRefObject<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  const { camera } = useThree();
  const offsetDir = useRef(new THREE.Vector3(0, 0.25, 1).normalize());
  const desired = useRef(new THREE.Vector3());

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const localFocus = focus;
    if (localFocus.current.dirty) {
      // 현재 시점(사용자가 돌려둔 각도)을 유지한 채 목표 노드로 이동한다.
      const dir = camera.position.clone().sub(controls.target);
      if (dir.lengthSq() > 0.0001) {
        offsetDir.current.copy(dir.normalize());
      }
      desired.current
        .copy(localFocus.current.target)
        .add(offsetDir.current.clone().multiplyScalar(localFocus.current.distance));
      // eslint-disable-next-line react-hooks/immutability
      localFocus.current.animating = true;
      localFocus.current.dirty = false;
    }

    if (!localFocus.current.animating) return;

    controls.target.lerp(localFocus.current.target, 0.1);
    camera.position.lerp(desired.current, 0.1);
    controls.update();

    // 목표에 충분히 가까워지면 애니메이션을 멈추고 제어권을 넘긴다.
    if (
      controls.target.distanceToSquared(localFocus.current.target) < 0.0004 &&
      camera.position.distanceToSquared(desired.current) < 0.0004
    ) {
      controls.target.copy(localFocus.current.target);
      camera.position.copy(desired.current);
      controls.update();
      localFocus.current.animating = false;
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
  isActive,
}: {
  item: PositionedNode;
  selected: boolean;
  hovered: boolean;
  onSelect: (item: PositionedNode) => void;
  onHover: (id: string | null) => void;
  isActive: boolean;
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
          emissiveIntensity={isActive ? (active ? 1.1 : item.expanded ? 0.55 : 0.3) : 0.08}
          roughness={0.35}
          metalness={0.1}
          transparent
          opacity={isActive ? 1.0 : 0.15}
        />
      </mesh>

      {/* 확장 가능 표시 링 */}
      {item.hasChildren && !item.expanded && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[baseSize * 1.6, baseSize * 1.9, 32]} />
          <meshBasicMaterial color={node.color} transparent opacity={isActive ? 0.5 : 0.08} side={THREE.DoubleSide} />
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
            className="flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-0.5 text-center font-medium backdrop-blur-sm transition-opacity duration-300"
            style={{
              background: active ? node.color : "rgba(10,14,22,0.72)",
              color: active ? "#0a0e16" : "#e5e7eb",
              border: `1px solid ${node.color}`,
              fontSize: node.type === "root" ? 15 : node.type === "category" ? 13 : 11,
              opacity: isActive ? 1.0 : hovered ? 0.8 : 0.08,
            }}
          >
            {node.icon ? <span>{node.icon}</span> : null}
            <span>{node.label.includes(":") ? node.label.split(":")[0].trim() : node.label}</span>
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
  onUserControlStart,
  focus,
  controlsRef,
  activeIds,
}: {
  positioned: PositionedNode[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (item: PositionedNode) => void;
  onHover: (id: string | null) => void;
  onUserControlStart: () => void;
  focus: React.MutableRefObject<FocusState>;
  controlsRef: React.MutableRefObject<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  activeIds: Set<string> | null;
}) {
  const edges = useMemo(
    () => positioned.filter((item) => item.parentPosition),
    [positioned],
  );

  const activeConvergenceLines = useMemo(() => {
    const list: {
      key: string;
      points: [THREE.Vector3, THREE.Vector3];
      color: string;
      label: string;
      active: boolean;
    }[] = [];

    const nodeMap = new Map<string, PositionedNode>();
    for (const p of positioned) {
      nodeMap.set(p.node.id, p);
    }

    for (const link of convergenceLinks) {
      const sourceNode = nodeMap.get(link.sourceId);
      const targetNode = nodeMap.get(link.targetId);

      if (sourceNode && targetNode) {
        const isSelectedOrHovered =
          selectedId === link.sourceId ||
          selectedId === link.targetId ||
          hoveredId === link.sourceId ||
          hoveredId === link.targetId;

        list.push({
          key: `convergence-${link.id}`,
          points: [sourceNode.position, targetNode.position],
          color: "#d946ef",
          label: link.label,
          active: isSelectedOrHovered,
        });
      }
    }
    return list;
  }, [positioned, selectedId, hoveredId]);

  return (
    <>
      <color attach="background" args={["#070b14"]} />
      <fog attach="fog" args={["#070b14", 28, 70]} />
      <ambientLight intensity={0.7} />
      <pointLight position={[0, 0, 0]} intensity={2.2} distance={40} color="#9fd8ff" />
      <directionalLight position={[10, 12, 8]} intensity={0.6} />
      <Stars radius={120} depth={60} count={3500} factor={4} saturation={0} fade speed={0.6} />

      {/* 융합 연결선 (Convergence Lines) */}
      {activeConvergenceLines.map((line) => (
        <Line
          key={line.key}
          points={line.points}
          color={line.color}
          lineWidth={line.active ? 2.5 : 0.8}
          dashed
          dashScale={1}
          dashSize={0.4}
          gapSize={0.2}
          transparent
          opacity={line.active ? 0.95 : 0.18}
        />
      ))}

      {/* 융합 연결선 텍스트 레이블 */}
      {activeConvergenceLines.map((line) => {
        if (!line.active) return null;
        const midPoint = new THREE.Vector3()
          .addVectors(line.points[0], line.points[1])
          .multiplyScalar(0.5);
        return (
          <Html
            key={`label-${line.key}`}
            position={midPoint}
            center
            distanceFactor={15}
            style={{ pointerEvents: "none", userSelect: "none" }}
            zIndexRange={[25, 0]}
          >
            <div className="flex items-center gap-1.5 rounded-full border border-pink-500/50 bg-[#070b14]/90 px-2.5 py-1 text-center text-[10px] font-bold text-pink-300 backdrop-blur-md shadow-lg shadow-pink-500/20">
              <Sparkles className="size-2.5 text-pink-400" />
              <span>{line.label}</span>
            </div>
          </Html>
        );
      })}

      {edges.map((item) => {
        const isEdgeActive = activeIds
          ? activeIds.has(item.node.id) && activeIds.has(item.parentId || "")
          : true;
        return (
          <Line
            key={`edge-${item.node.id}`}
            points={[
              item.parentPosition as THREE.Vector3,
              item.position,
            ]}
            color={item.node.color}
            lineWidth={item.node.depth <= 2 ? 1.4 : 0.8}
            transparent
            opacity={
              activeIds
                ? isEdgeActive
                  ? 0.9
                  : 0.05
                : hoveredId === item.node.id || selectedId === item.node.id
                  ? 0.9
                  : 0.28
            }
          />
        );
      })}

      {positioned.map((item) => (
        <GraphNodeMesh
          key={item.node.id}
          item={item}
          selected={selectedId === item.node.id}
          hovered={hoveredId === item.node.id}
          onSelect={onSelect}
          onHover={onHover}
          isActive={activeIds ? activeIds.has(item.node.id) : true}
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
        onStart={onUserControlStart}
      />
    </>
  );
}

export function KnowledgeGraph3D() {
  const root = useMemo(() => buildKnowledgeGraph(), []);
  const [expandedIds, setExpandedIds] = useState<string[]>(["root"]);
  const [selectedId, setSelectedId] = useState<string | null>("root");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const cameraConfig = useMemo(() => ({ position: [0, 5, 26] as [number, number, number], fov: 50 }), []);

  const controlsRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const focus = useRef<FocusState>({
    target: new THREE.Vector3(0, 0, 0),
    distance: FOCUS_DISTANCE.root,
    dirty: true,
    animating: true,
  });

  const expanded = useMemo(() => new Set(expandedIds), [expandedIds]);
  const positioned = useMemo(() => layoutGraph(root, expanded), [root, expanded]);

  const selectedNode = useMemo(
    () => positioned.find((item) => item.node.id === selectedId)?.node ?? null,
    [positioned, selectedId],
  );

  const selectedConvergenceLink = useMemo(() => {
    if (!selectedId) return null;
    return convergenceLinks.find(
      (link) => link.sourceId === selectedId || link.targetId === selectedId,
    ) ?? null;
  }, [selectedId]);

  const activeIds = useMemo(() => {
    if (!selectedId || selectedId === "root") return null;

    const set = new Set<string>();
    // 1. Build a map of node ID to parent ID
    const parentMap = new Map<string, string>();
    for (const p of positioned) {
      if (p.parentId) {
        parentMap.set(p.node.id, p.parentId);
      }
    }

    // 2. Add selectedId itself
    set.add(selectedId);

    // 3. Add all ancestors (climb up)
    let current = selectedId;
    while (parentMap.has(current)) {
      const parent = parentMap.get(current)!;
      set.add(parent);
      current = parent;
    }

    // 4. Add all descendants (climb down)
    for (const p of positioned) {
      let curr: string | undefined = p.node.id;
      while (curr) {
        if (curr === selectedId) {
          set.add(p.node.id);
          break;
        }
        curr = parentMap.get(curr);
      }
    }

    return set;
  }, [selectedId, positioned]);

  const handleUserControlStart = useCallback(() => {
    focus.current.animating = false;
  }, []);

  const flyTo = useCallback((position: THREE.Vector3, type: string) => {
    focus.current.target.copy(position);
    focus.current.distance = FOCUS_DISTANCE[type] ?? 8;
    focus.current.dirty = true;
  }, []);

  const lastFocusedId = useRef<string | null>(null);

  // Autofocus camera on the selected node once its 3D position is calculated
  useEffect(() => {
    if (!selectedId) return;
    const item = positioned.find((p) => p.node.id === selectedId);
    if (item) {
      if (lastFocusedId.current !== selectedId) {
        focus.current.target.copy(item.position);
        focus.current.distance = FOCUS_DISTANCE[item.node.type] ?? 8;
        focus.current.dirty = true;
        focus.current.animating = true;
        lastFocusedId.current = selectedId;
      }
    }
  }, [selectedId, positioned]);

  // Select target node and expand all its ancestors to make it visible
  const handleSelectTargetById = useCallback((targetId: string) => {
    const node = findGraphNode(root, targetId);
    if (!node) return;

    const ancestorsToExpand: string[] = ["root"];
    let targetCategoryId = "";
    let targetSectionId = "";

    for (const cat of workflowCategories) {
      for (const sec of cat.sections) {
        if (sec.chainIds.includes(targetId.replace("chain:", ""))) {
          targetCategoryId = `cat:${cat.id}`;
          targetSectionId = `sec:${cat.id}:${sec.id}`;
          break;
        }
      }
    }

    if (targetCategoryId) ancestorsToExpand.push(targetCategoryId);
    if (targetSectionId) ancestorsToExpand.push(targetSectionId);

    setExpandedIds((prev) => {
      const next = new Set(prev);
      for (const id of ancestorsToExpand) {
        next.add(id);
      }
      return [...next];
    });

    setSelectedId(targetId);
  }, [root]);

  const handleSelect = useCallback(
    (item: PositionedNode) => {
      const { node, position } = item;

      if (node.type === "tool" && node.url) {
        setPreviewUrl(node.url);
        setPreviewTitle(node.label);
        setSelectedId(node.id);
        setIsCollapsed(false);
        flyTo(position, node.type);
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


  const handleClosePreview = useCallback(() => {
    setPreviewUrl(null);
    setPreviewTitle(null);
    setIsCollapsed(false);
  }, []);

  const reset = useCallback(() => {
    setExpandedIds(["root"]);
    setSelectedId("root");
    setHoveredId(null);
    setPreviewUrl(null);
    setPreviewTitle(null);
    setIsCollapsed(false);
    flyTo(new THREE.Vector3(0, 0, 0), "root");
  }, [flyTo]);

  return (
    <div className="fixed inset-0 top-12 flex bg-[#070b14] overflow-hidden">
      {/* Left side: 3D Canvas Area */}
      <div className={`relative h-full w-full transition-all duration-300 ${previewUrl && !isCollapsed ? "lg:w-1/2 border-r border-white/10" : ""}`}>
        <Canvas camera={cameraConfig} dpr={[1, 2]}>
          <Scene
            positioned={positioned}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={handleSelect}
            onHover={setHoveredId}
            onUserControlStart={handleUserControlStart}
            focus={focus}
            controlsRef={controlsRef}
            activeIds={activeIds}
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

              {(() => {
                const hasColon = selectedNode.label.includes(":");
                const titleText = hasColon ? selectedNode.label.split(":")[0].trim() : selectedNode.label;
                const descText = hasColon ? selectedNode.label.split(":").slice(1).join(":").trim() : null;

                return (
                  <>
                    <h3 className="mt-2 flex items-center gap-1.5 text-base font-bold text-white">
                      {selectedNode.icon ? <span>{selectedNode.icon}</span> : null}
                      {titleText}
                    </h3>
                    {descText && (
                      <p className="mt-1.5 text-xs font-normal leading-relaxed text-white/70 bg-white/5 border border-white/5 rounded-md px-2.5 py-1.5">
                        {descText}
                      </p>
                    )}
                  </>
                );
              })()}
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
                        onClick={() => {
                          setPreviewUrl(selectedNode.theoryUrl as string);
                          const shortTitle = selectedNode.label.includes(":") ? selectedNode.label.split(":")[0].trim() : selectedNode.label;
                          setPreviewTitle(`${shortTitle} (이론)`);
                          setIsCollapsed(false);
                        }}
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
                        onClick={() => {
                          if (tool.url) {
                            setPreviewUrl(tool.url);
                            setPreviewTitle(tool.label);
                            setIsCollapsed(false);
                          }
                        }}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-opacity hover:opacity-80"
                        style={{ background: `${selectedNode.color}22`, color: selectedNode.color }}
                      >
                        {tool.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 융합 지식 생태계 연관 분야 */}
              {selectedConvergenceLink && (
                <div className="mt-3 rounded-lg border border-pink-500/25 bg-pink-500/5 p-2.5 text-xs text-pink-300">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Sparkles className="size-3 text-pink-400" />
                    <span>융합 지식 생태계 연관 분야</span>
                  </div>
                  <p className="mt-1 text-white/80 leading-relaxed font-normal">
                    {selectedConvergenceLink.description}
                  </p>
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        const targetId =
                          selectedConvergenceLink.sourceId === selectedId
                            ? selectedConvergenceLink.targetId
                            : selectedConvergenceLink.sourceId;
                        handleSelectTargetById(targetId);
                      }}
                      className="inline-flex items-center gap-1 rounded bg-pink-500/20 px-2.5 py-1 text-[10px] font-semibold text-pink-200 transition-colors hover:bg-pink-500/30"
                    >
                      <span>연관 분야로 이동</span>
                      <ChevronRight className="size-3" />
                    </button>
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

      {/* Right side: Mini Browser (Preview Panel) */}
      {previewUrl && (
        <div
          className={`absolute inset-y-0 right-0 z-50 transition-all duration-300 flex flex-col bg-background ${isCollapsed
            ? "w-0 border-l-transparent pointer-events-none"
            : "w-full lg:relative lg:w-1/2 border-l border-white/10 pointer-events-auto"
            }`}
        >
          {/* Collapse/Expand toggle button */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`absolute top-1/2 left-0 -translate-y-1/2 z-[60] flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#070b14]/90 text-white/70 shadow-md hover:bg-black hover:text-white transition-all duration-200 cursor-pointer focus:outline-none pointer-events-auto backdrop-blur-md ${isCollapsed ? "-translate-x-full" : "-translate-x-1/2"
              }`}
            title={isCollapsed ? "브라우저 열기" : "브라우저 접기"}
          >
            {isCollapsed ? (
              <ChevronLeft className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </button>

          {/* Preview Panel content */}
          <div className={`h-full w-full flex flex-col overflow-hidden transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}>
            <PreviewPanel
              url={previewUrl}
              title={previewTitle || ""}
              isOpen={!!previewUrl}
              mode="sidebar"
              onClose={handleClosePreview}
            />
          </div>
        </div>
      )}
    </div>
  );
}

