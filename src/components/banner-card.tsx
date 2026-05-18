"use client";

import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Banner } from "@/data/banners";

interface BannerCardProps {
    banner: Banner;
}

export function BannerCard({ banner }: BannerCardProps) {
    return (
        <a
            href={banner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block"
        >
            {/* 글로우 효과 배경 */}
            <div
                className={`absolute -inset-0.5 rounded-lg bg-gradient-to-r ${banner.gradient} opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100`}
            />

            {/* 카드 본체 */}
            <div
                className={`relative flex h-full flex-col gap-4 rounded-lg border border-border bg-card p-6 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-border/80 group-hover:shadow-xl dark:group-hover:border-white/[0.15] ${banner.glowColor} group-hover:shadow-2xl`}
            >
                {/* 아이콘 */}
                <div className="flex items-center justify-between">
                    <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
                        {banner.icon}
                    </span>
                    <Badge
                        variant="outline"
                        className="border-border bg-muted/50 text-xs text-muted-foreground"
                    >
                        서비스
                    </Badge>
                </div>

                {/* 텍스트 */}
                <div className="flex flex-1 flex-col gap-2">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors">
                        {banner.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {banner.description}
                    </p>
                </div>

                {/* 화살표 인디케이터 */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground">
                    <span>바로가기</span>
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
            </div>
        </a>
    );
}
