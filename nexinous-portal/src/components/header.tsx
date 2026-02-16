"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
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
            className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled
                ? "border-b border-border bg-background/60 backdrop-blur-xl"
                : "bg-transparent"
                }`}
        >
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                {/* 로고 */}
                <a href="/" className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500">
                        <span className="text-sm font-bold text-white">N</span>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-sm font-bold tracking-tight text-foreground">
                            NEXINOUS
                        </span>
                        <span className="text-[10px] font-medium text-muted-foreground">
                            Portal
                        </span>
                    </div>
                </a>

                {/* 네비게이션 + 테마 토글 */}
                <div className="flex items-center gap-6">
                    <nav className="hidden items-center gap-8 sm:flex">
                        <a
                            href="#services"
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            서비스
                        </a>
                        <a
                            href="#"
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            소개
                        </a>
                        <a
                            href="#"
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            문의
                        </a>
                    </nav>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
