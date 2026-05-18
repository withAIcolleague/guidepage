"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Loader2, Lock, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreviewPanelProps {
  url: string;
  title: string;
  isOpen: boolean;
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

export function PreviewPanel({ url, title, isOpen, onClose }: PreviewPanelProps) {
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
    if (!isOpen || !parsedUrl || blocked) return;

    const timer = window.setTimeout(() => {
      setLoadState((current) =>
        current.key === stateKey && current.status === "ready"
          ? current
          : { key: stateKey, status: "timeout" },
      );
    }, 4500);

    return () => window.clearTimeout(timer);
  }, [blocked, isOpen, parsedUrl, stateKey]);

  if (!isOpen) return null;

  const isUnavailable = status === "blocked" || status === "timeout" || status === "invalid";
  const unavailableTitle =
    status === "timeout"
      ? "미리보기 응답이 지연됩니다"
      : status === "invalid"
        ? "주소를 확인할 수 없습니다"
        : "미리보기가 제한된 사이트입니다";
  const unavailableDescription =
    status === "timeout"
      ? "사이트가 늦게 응답하거나 iframe 로딩을 제한하고 있습니다. 새 탭에서 여는 편이 안정적입니다."
      : status === "invalid"
        ? "등록된 링크 형식이 올바르지 않습니다. 데이터 파일의 URL을 확인해야 합니다."
        : "이 사이트는 보안 정책상 포털 안에서 직접 표시되지 않습니다. 새 탭으로 안전하게 이동하세요.";

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-xl">
        <div className="flex flex-col gap-3 border-b border-border bg-muted/30 px-4 py-3 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 truncate text-sm font-semibold text-foreground">
                {title}
              </span>
            </div>
            <div className="mt-1 truncate text-xs text-muted-foreground">{hostname}</div>
          </div>

          <div className="flex items-center gap-2">
            {status === "timeout" && parsedUrl && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => {
                  setPreviewKey((key) => key + 1);
                }}
              >
                <RefreshCw className="size-3.5" />
                재시도
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={() => parsedUrl && window.open(parsedUrl.href, "_blank")}
              disabled={!parsedUrl}
            >
              <ExternalLink className="size-3.5" />
              새 탭
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

        <div className="relative h-[520px] w-full bg-background sm:h-[600px]">
          {status === "loading" && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background">
              <Loader2 className="size-7 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">미리보기를 불러오는 중...</p>
            </div>
          )}

          {isUnavailable ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="rounded-full bg-muted p-4">
                <Lock className="size-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{unavailableTitle}</h3>
                <p className="max-w-md text-sm leading-6 text-muted-foreground">
                  <strong>{hostname}</strong> · {unavailableDescription}
                </p>
              </div>
              <Button
                type="button"
                onClick={() => parsedUrl && window.open(parsedUrl.href, "_blank")}
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
      </div>
    </div>
  );
}
