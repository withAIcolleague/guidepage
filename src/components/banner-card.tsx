"use client";

import { ArrowUpRight } from "lucide-react";
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
      title={banner.description}
      className="group flex w-16 flex-col items-center gap-1.5 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className={`relative flex size-9 items-center justify-center rounded-lg border border-border bg-card shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-foreground/25 group-hover:shadow-md ${banner.glowColor}`}
      >
        <span className="text-lg leading-none transition-transform duration-200 group-hover:scale-105">
          {banner.icon}
        </span>
        <ArrowUpRight className="absolute -right-1 -top-1 size-3 rounded-full bg-background p-0.5 text-muted-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100" />
      </div>
      <span className="line-clamp-2 min-h-7 text-[11px] leading-[14px] text-foreground">
        {banner.title}
      </span>
    </a>
  );
}
