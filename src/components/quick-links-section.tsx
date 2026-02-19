"use client";

import { workflowChains, type FlowNode } from "@/data/quick-links";
import { useState } from "react";
import { PreviewPanel } from "./preview-panel";

export function QuickLinksSection() {
    const [activeChain, setActiveChain] = useState(workflowChains[0].id);
    const [selectedNode, setSelectedNode] = useState<{ node: FlowNode; mode: "tool" | "theory"; toolIndex?: number } | null>(null);

    const selected = workflowChains.find((c) => c.id === activeChain)!;

    return (
        <section className="relative w-full px-6 pt-16 pb-24">
            <div className="absolute inset-0 bg-muted/30" />

            <div className="relative mx-auto max-w-6xl">
                {/* 섹션 타이틀 */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        워크플로우 맵
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        서비스 간 연관성을 따라 탐색하세요.
                        <br />
                        <strong>카드</strong>를 누르면 이론을, <strong>각 서비스명</strong>을 누르면 실제 툴을 확인할 수 있습니다.
                    </p>
                </div>

                {/* 워크플로우 탭 */}
                <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
                    {workflowChains.map((chain) => (
                        <button
                            key={chain.id}
                            onClick={() => {
                                setActiveChain(chain.id);
                                setSelectedNode(null); // 체인 변경 시 미리보기 닫기
                            }}
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${activeChain === chain.id
                                ? "border-foreground/20 bg-foreground text-background shadow-lg"
                                : "border-border bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                                }`}
                        >
                            <span>{chain.icon}</span>
                            <span className="hidden sm:inline">{chain.name}</span>
                        </button>
                    ))}
                </div>

                {/* 선택된 워크플로우 설명 */}
                <div className="mb-8 text-center">
                    <p className="text-sm text-muted-foreground">{selected.description}</p>
                </div>

                {/* 플로우 시각화 */}
                <div className="overflow-x-auto pb-4">
                    <div className="relative mx-auto flex min-w-max items-center justify-center gap-2">
                        {selected.nodes.map((node, index) => (
                            <div key={node.role} className="flex items-center">
                                {/* 노드 */}
                                <div
                                    onClick={() => {
                                        if (node.theoryUrl) {
                                            setSelectedNode({ node, mode: "theory" });
                                        }
                                    }}
                                    className={`group relative flex h-auto min-h-[110px] w-[140px] cursor-pointer flex-col items-center justify-start gap-2 rounded-md border p-2 transition-all duration-300 sm:min-h-[80px] sm:w-[160px] ${selectedNode?.node.role === node.role
                                        ? `border-foreground/50 bg-foreground/5 shadow-xl scale-105 ring-2 ring-primary ring-offset-2 ring-offset-background`
                                        : "border-border bg-card hover:-translate-y-1 hover:shadow-lg"
                                        }`}
                                >
                                    {/* 역할 */}
                                    <span className="mb-1 border-b border-border/50 pb-1 text-center text-[11px] font-medium leading-snug text-muted-foreground sm:text-[11px]">
                                        {node.role}
                                    </span>

                                    {/* 서비스명 목록 */}
                                    <div className="flex w-full flex-col gap-1">
                                        {node.tools.map((tool, tIndex) => (
                                            <button
                                                key={tool.name}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedNode({ node, mode: "tool", toolIndex: tIndex });
                                                }}
                                                className={`text-center text-[11px] font-semibold transition-colors sm:text-xs ${selectedNode?.node.role === node.role && selectedNode?.toolIndex === tIndex
                                                        ? "text-primary"
                                                        : "text-foreground hover:text-primary"
                                                    }`}
                                            >
                                                {tool.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 화살표 커넥터 */}
                                {index < selected.nodes.length - 1 && (
                                    <div className="flex items-center px-1">
                                        <div className="h-px w-3 bg-border sm:w-4" />
                                        <svg
                                            width="10"
                                            height="10"
                                            viewBox="0 0 10 10"
                                            className="shrink-0 text-muted-foreground"
                                        >
                                            <path
                                                d="M2 1L8 5L2 9"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="h-px w-3 bg-border sm:w-4" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 미리보기 패널 */}
                {selectedNode && (
                    <PreviewPanel
                        url={selectedNode.mode === "theory" ? selectedNode.node.theoryUrl! : selectedNode.node.tools[selectedNode.toolIndex!].url}
                        title={selectedNode.mode === "theory" ? `${selectedNode.node.role} - 이론` : selectedNode.node.tools[selectedNode.toolIndex!].name}
                        isOpen={!!selectedNode}
                        onClose={() => setSelectedNode(null)}
                    />
                )}

                {/* 프로세스 설명 바 */}
                {!selectedNode && (
                    <div className="mt-8 flex items-center justify-center gap-3 animate-in fade-in duration-500">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <div
                                className={`h-2 w-2 rounded-full bg-gradient-to-r ${selected.gradient}`}
                            />
                            <span>시작</span>
                        </div>
                        <div className="h-px w-16 bg-border" />
                        <span className="text-xs text-muted-foreground">프로세스 흐름</span>
                        <div className="h-px w-16 bg-border" />
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <div
                                className={`h-2 w-2 rounded-full bg-gradient-to-r ${selected.gradient}`}
                            />
                            <span>완료</span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
