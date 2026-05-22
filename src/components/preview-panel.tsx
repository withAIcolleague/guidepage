"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Loader2, Lock, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openExternalUrl } from "@/lib/external-links";

interface PreviewPanelProps {
  url: string;
  title: string;
  isOpen: boolean;
  side?: "left" | "right";
  mode?: "fixed" | "embedded";
  onToggleSide?: () => void;
  onClose: () => void;
}

type PreviewStatus = "loading" | "ready" | "blocked" | "timeout" | "invalid";

const BLOCKED_DOMAINS = [
  "github.com",
  "figma.com",
  "dribbble.com",
  "google.com",
  "youtu.be",
  "youtube.com",
  "notion.so",
  "twitter.com",
  "x.com",
  "facebook.com",
  "instagram.com",
  "linkedin.com",
  "vercel.com",
  "netlify.com",
  "cloudflare.com",
  "amazon.com",
  "aws.amazon.com",
  "medium.com",
  "dev.to",
  "stackoverflow.com",
  "reddit.com",
  "npmjs.com",
  "docker.com",
  "microsoft.com",
  "visualstudio.com",
  "apple.com",
  "adobe.com",
  "behance.net",
  "openai.com",
  "chat.openai.com",
  "replicate.com",
  "huggingface.co",
  "kaggle.com",
  "paperswithcode.com",
  "react.dev",
  "nextjs.org",
  "tailwindcss.com",
  "typescriptlang.org",
  "developer.mozilla.org",
  "w3schools.com",
  "freecodecamp.org",
  "producthunt.com",
  "ycombinator.com",
  "baekjoon.ac",
  "programmers.co.kr",
  "inflearn.com",
  "udemy.com",
  "fastcampus.co.kr",
  "wanted.co.kr",
  "rocketpunch.com",
  "rememberapp.co.kr",
  "coolors.co",
  "unsplash.com",
];

function parseUrl(value: string) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function isBlockedHost(hostname: string) {
  return BLOCKED_DOMAINS.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
  );
}

export function PreviewPanel({
  url,
  title,
  isOpen,
  side = "right",
  mode = "fixed",
  onToggleSide,
  onClose,
}: PreviewPanelProps) {
  const parsedUrl = useMemo(() => parseUrl(url), [url]);
  const hostname = parsedUrl?.hostname.replace(/^www\./, "") ?? "잘못된 주소";
  const blocked = parsedUrl ? isBlockedHost(parsedUrl.hostname) : false;
  const baseStatus: PreviewStatus | null = !parsedUrl
    ? "invalid"
    : blocked
      ? "blocked"
      : null;
  const [loadState, setLoadState] = useState<{ key: string; status: PreviewStatus }>({
    key: "",
    status: "loading",
  });
  const [previewKey, setPreviewKey] = useState(0);
  const stateKey = `${parsedUrl?.href ?? url}:${previewKey}`;
  const status = baseStatus ?? (loadState.key === stateKey ? loadState.status : "loading");

  useEffect(() => {
    if (!isOpen || !parsedUrl || baseStatus) return;

    const timer = window.setTimeout(() => {
      setLoadState((current) =>
        current.key === stateKey && current.status === "ready"
          ? current
          : { key: stateKey, status: "timeout" },
      );
    }, 4500);

    return () => window.clearTimeout(timer);
  }, [baseStatus, isOpen, parsedUrl, stateKey]);

  if (!isOpen) return null;

  const unavailable = status === "blocked" || status === "timeout" || status === "invalid";
  const unavailableTitle =
    status === "timeout"
      ? "미리보기 응답이 지연됩니다"
      : status === "invalid"
        ? "주소를 확인할 수 없습니다"
        : "미리보기가 제한된 사이트입니다";
  const unavailableDescription =
    status === "timeout"
      ? "사이트가 늦게 응답하거나 iframe 로딩을 제한하고 있습니다."
      : status === "invalid"
        ? "등록된 링크 형식이 올바르지 않습니다."
        : "보안 정책상 포털 안에서 직접 표시되지 않습니다.";
  const frame = (
    <>
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/30 px-4 py-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{title}</div>
          <div className="truncate text-xs text-muted-foreground">{hostname}</div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {mode === "fixed" && onToggleSide && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onToggleSide}
              className="hidden h-8 text-xs lg:inline-flex"
            >
              {side === "left" ? "오른쪽" : "왼쪽"}
            </Button>
          )}
          {status === "timeout" && parsedUrl && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setPreviewKey((key) => key + 1)}
              aria-label="미리보기 재시도"
            >
              <RefreshCw className="size-4" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => parsedUrl && openExternalUrl(parsedUrl.href)}
            disabled={!parsedUrl}
            aria-label="새 탭에서 열기"
          >
            <ExternalLink className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="미리보기 닫기"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 bg-background">
        {status === "loading" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">미리보기를 불러오는 중...</p>
          </div>
        )}

        {unavailable ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="rounded-full bg-muted p-3">
              <Lock className="size-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-base font-semibold">{unavailableTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                <strong>{hostname}</strong> · {unavailableDescription}
              </p>
            </div>
            <Button
              type="button"
              onClick={() => parsedUrl && openExternalUrl(parsedUrl.href)}
              disabled={!parsedUrl}
            >
              <ExternalLink className="size-4" />
              새 탭에서 보기
            </Button>
          </div>
        ) : (
          parsedUrl && (
            <iframe
              key={previewKey}
              title={`${title} preview`}
              src={parsedUrl.href}
              className="h-full w-full border-0"
              onLoad={() => setLoadState({ key: stateKey, status: "ready" })}
              onError={() => setLoadState({ key: stateKey, status: "timeout" })}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          )
        )}
      </div>
    </>
  );

  if (mode === "embedded") {
    return (
      <div className="flex min-h-[360px] flex-1 flex-col overflow-hidden rounded-lg border border-border bg-background shadow-sm lg:min-h-[calc(50vh-1rem)]">
        {frame}
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-x-3 bottom-3 top-3 z-[60] flex flex-col overflow-hidden rounded-lg border border-border bg-background shadow-2xl lg:inset-x-auto lg:w-[calc(50vw-1.5rem)] ${
        side === "left" ? "lg:left-3" : "lg:right-3"
      }`}
    >
      {frame}
    </div>
  );
}
