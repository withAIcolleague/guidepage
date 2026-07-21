"use client";

import { Building2, ExternalLink, Globe, Hash, User } from "lucide-react";
import { useState } from "react";
import type { ClassifiedSite } from "@/data/directory/directory-schema";

const ORG_TYPE_CONFIG: Record<
  string,
  { icon: typeof Building2; label: string; color: string }
> = {
  Government: {
    icon: Building2,
    label: "정부/공공기관",
    color: "text-blue-400",
  },
  Public: { icon: Globe, label: "공공/교육", color: "text-emerald-400" },
  Enterprise: {
    icon: Building2,
    label: "기업/서비스",
    color: "text-amber-400",
  },
  Individual: { icon: User, label: "개인/블로그", color: "text-purple-400" },
  Unknown: { icon: Globe, label: "기타", color: "text-muted-foreground" },
};

function OrgTypeBadge({ type }: { type: string }) {
  const config = ORG_TYPE_CONFIG[type] ?? ORG_TYPE_CONFIG.Unknown;
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium ${config.color}`}
    >
      <Icon className="size-2.5" />
      {config.label}
    </span>
  );
}

interface DirectoryPanelProps {
  entries: ClassifiedSite[];
  categoryName?: string;
  compact?: boolean;
}

export function DirectoryPanel({
  entries,
  categoryName,
  compact = false,
}: DirectoryPanelProps) {
  const [filter, setFilter] = useState<string | null>(null);

  if (entries.length === 0) {
    return (
      <div
        className={`rounded-lg border border-dashed border-border bg-muted/20 ${compact ? "p-3" : "p-5"}`}
      >
        <p className="text-sm font-medium text-foreground">
          📂 등록된 디렉토리 사이트가 없습니다
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {categoryName
            ? `${categoryName} 분류에 아직 사이트가 등록되지 않았습니다.`
            : "파이프라인을 통해 사이트를 추가해보세요."}
        </p>
      </div>
    );
  }

  // 조직 유형별 필터 옵션 계산
  const orgTypes = Array.from(
    new Set(entries.map((e) => e.organizationType))
  ).sort();
  const filteredEntries = filter
    ? entries.filter((e) => e.organizationType === filter)
    : entries;

  return (
    <div
      className={`rounded-lg border border-border bg-card shadow-sm ${compact ? "p-3" : "p-4"}`}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Globe className="size-4 text-muted-foreground" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            디렉토리
          </h3>
          <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-medium text-foreground">
            {entries.length}
          </span>
        </div>
      </div>

      {/* 필터 (엔트리가 2개 이상이고, 조직 유형이 2종 이상일 때) */}
      {orgTypes.length >= 2 && entries.length >= 3 && (
        <div className="mt-2 flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors ${
              !filter
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            전체
          </button>
          {orgTypes.map((type) => {
            const count = entries.filter(
              (e) => e.organizationType === type
            ).length;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setFilter(filter === type ? null : type)}
                className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors ${
                  filter === type
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {(ORG_TYPE_CONFIG[type] ?? ORG_TYPE_CONFIG.Unknown).label} (
                {count})
              </button>
            );
          })}
        </div>
      )}

      {/* 사이트 목록 */}
      <div className={`${compact ? "mt-2" : "mt-3"} grid gap-1.5`}>
        {filteredEntries.map((entry) => (
          <a
            key={entry.url}
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-md border border-transparent px-2.5 py-2 transition-colors hover:border-border hover:bg-muted/40"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium text-foreground group-hover:text-foreground">
                  {entry.siteName}
                </span>
                <OrgTypeBadge type={entry.organizationType} />
              </div>
              <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                {entry.description}
              </p>
              {entry.tags.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {entry.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground/70"
                    >
                      <Hash className="size-2" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <ExternalLink className="mt-1 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        ))}
      </div>
    </div>
  );
}
