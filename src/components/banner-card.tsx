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
      className="group flex w-20 flex-col items-center gap-2 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className={`relative flex size-11 items-center justify-center rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-emerald-400/60 group-hover:shadow-md ${banner.glowColor}`}
      >
        <span className="text-xl leading-none transition-transform duration-200 group-hover:scale-105">
          {banner.icon}
        </span>
        <ArrowUpRight className="absolute -right-1 -top-1 size-3.5 rounded-full bg-background p-0.5 text-muted-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100" />
      </div>
      <span className="line-clamp-2 min-h-8 text-xs leading-4 text-foreground">
        {banner.title}
      </span>
    </a>
  );
}
