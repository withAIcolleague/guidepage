"use client";

import { useState } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { QuickLinksSection } from "@/components/quick-links-section";

export function HomeShell() {
  const [detailMode, setDetailMode] = useState(false);

  return (
    <>
      {!detailMode && <Header />}
      <main className={`min-h-screen ${detailMode ? "pt-0" : "pt-12"}`}>
        <QuickLinksSection onDetailModeChange={setDetailMode} />
      </main>
      {!detailMode && <Footer />}
    </>
  );
}
