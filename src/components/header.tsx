"use client";

import { Boxes, Github, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export type HomeView = "2d" | "3d";

interface HeaderProps {
  view?: HomeView;
  onViewChange?: (view: HomeView) => void;
}

export function Header({ view, onViewChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-cyan-500">
            <span className="text-xs font-bold text-white">N</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-foreground">
              NEXINOUS
            </span>
            <span className="text-[10px] font-medium text-muted-foreground">
              Portal
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {view && onViewChange ? (
            <div className="flex items-center rounded-full border border-border bg-background/60 p-0.5 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => onViewChange("2d")}
                aria-pressed={view === "2d"}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  view === "2d"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="size-3.5" />
                2D
              </button>
              <button
                type="button"
                onClick={() => onViewChange("3d")}
                aria-pressed={view === "3d"}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  view === "3d"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Boxes className="size-3.5" />
                3D
              </button>
            </div>
          ) : null}
          <nav className="hidden items-center gap-6 sm:flex">
            <a
              href="#workflow"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              워크플로우
            </a>
            <a
              href="#services"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              서비스
            </a>
            <a
              href="https://github.com/withAIcolleague/guidepage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-4" />
              GitHub
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
