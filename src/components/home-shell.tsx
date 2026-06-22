"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Footer } from "@/components/footer";
import { Header, type HomeView } from "@/components/header";
import { QuickLinksSection } from "@/components/quick-links-section";

const KnowledgeGraph3D = dynamic(
  () => import("@/components/knowledge-3d/knowledge-graph-3d").then((mod) => mod.KnowledgeGraph3D),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 top-12 flex items-center justify-center bg-[#070b14] text-sm text-white/50">
        3D 지식 공간을 불러오는 중...
      </div>
    ),
  },
);

export function HomeShell() {
  const [detailMode, setDetailMode] = useState(false);
  const [view, setView] = useState<HomeView>("2d");

  const showHeader = view === "3d" || !detailMode;

  return (
    <>
      {showHeader && <Header view={view} onViewChange={setView} />}
      {view === "3d" ? (
        <main className="min-h-screen">
          <KnowledgeGraph3D />
        </main>
      ) : (
        <main className={`min-h-screen ${detailMode ? "pt-0" : "pt-12"}`}>
          <QuickLinksSection onDetailModeChange={setDetailMode} />
        </main>
      )}
      {view === "2d" && !detailMode && <Footer />}
    </>
  );
}
