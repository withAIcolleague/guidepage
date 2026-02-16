"use client";

import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden px-6 mt-16">
            {/* 애니메이션 배경 오브 */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="animate-float-slow absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-500/15 blur-[128px] dark:bg-violet-600/10" />
                <div className="animate-float-medium absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-cyan-500/15 blur-[128px] dark:bg-cyan-600/10" />
                <div className="animate-float-fast absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-emerald-500/15 blur-[128px] dark:bg-emerald-600/10" />
            </div>

            {/* 그리드 패턴 오버레이 */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
                    backgroundSize: "64px 64px",
                }}
            />

            {/* 콘텐츠 */}
            <div className="relative z-10 mx-auto max-w-4xl text-center">
                {/* 브랜드 라벨 */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    포털 운영 중
                </div>

                {/* 메인 타이틀 */}
                <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                    <span className="bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent">
                        NEXINOUS&apos;s
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-cyan-400 dark:to-emerald-400">
                        Portal
                    </span>
                </h1>

                {/* 서브 타이틀 */}
                <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                    모든 서비스를 하나의 관문에서.
                    <br />
                    빠른 접근, 직관적인 경험.
                </p>

                {/* CTA 버튼 */}
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Button
                        size="lg"
                        className="rounded-full bg-foreground px-8 text-background transition-all hover:scale-105 hover:opacity-90 hover:shadow-lg"
                        onClick={() => {
                            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        서비스 둘러보기
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full border-border px-8 transition-all hover:scale-105 hover:bg-muted"
                        onClick={() => {
                            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        더 알아보기
                    </Button>
                </div>
            </div>
        </section>
    );
}
