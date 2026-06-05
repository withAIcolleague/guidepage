"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ExternalLink, FileText, Loader2, Lock, RefreshCw, X } from "lucide-react";
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
type PreviewKind = "iframe" | "link-card";

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

function matchesHost(hostname: string, domains: string[]) {
  return domains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
}

function checklistForResource(hostname: string) {
  const normalizedHost = hostname.replace(/^www\./, "");

  if (matchesHost(normalizedHost, ["github.com", "gitlab.com"])) {
    return ["README에서 목적과 사용법 확인", "최근 commit과 issue 상태 확인", "라이선스와 유지보수 신호 확인"];
  }

  if (matchesHost(normalizedHost, ["google.com", "scholar.google.com"])) {
    return ["검색어가 단계 목적과 맞는지 확인", "공식 출처와 최근 자료를 우선 확인", "여러 결과의 관점 차이를 비교"];
  }

  if (matchesHost(normalizedHost, ["wikipedia.org", "wikidata.org"])) {
    return ["개요와 핵심 용어 확인", "참고문헌과 관련 개념 확인", "최신성이나 논쟁 여부 확인"];
  }

  if (matchesHost(normalizedHost, ["youtube.com", "youtu.be", "figma.com", "notion.so"])) {
    return ["원본에서 공개 범위와 작성자를 확인", "자료가 현재 단계의 목적에 맞는지 확인", "필요한 부분만 메모로 정리"];
  }

  if (matchesHost(normalizedHost, ["developer.mozilla.org", "react.dev", "nextjs.org", "typescriptlang.org"])) {
    return ["공식 문서의 개념 정의 확인", "예제 코드와 적용 조건 확인", "버전이나 권장 방식 변경 여부 확인"];
  }

  return ["발행 주체와 신뢰도 확인", "업데이트 날짜와 현재성 확인", "다음 단계로 넘길 핵심 메모 정리"];
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
  const previewKind: PreviewKind = blocked || !parsedUrl ? "link-card" : "iframe";
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
  const checklist = parsedUrl ? checklistForResource(parsedUrl.hostname) : ["등록된 URL 형식을 점검"];

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
      ? "응답이 늦거나 iframe 로딩이 제한되어 포털 안에서 표시하지 못했습니다."
      : status === "invalid"
        ? "등록된 링크 형식이 올바르지 않습니다."
        : "이 도메인은 보안 정책상 포털 안에서 직접 표시되지 않습니다.";
  const unavailableAction =
    status === "timeout"
      ? "다시 시도하거나 새 탭에서 원본 페이지를 여세요."
      : status === "invalid"
        ? "데이터의 URL 값을 점검해야 합니다."
        : "새 탭에서 열면 원본 사이트를 바로 확인할 수 있습니다.";
  const resourceCard = (
    <div data-resource-preview-card="true" className="border-b border-border bg-background px-4 py-4">
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
              <FileText className="size-3.5" />
              Resource Preview
            </div>
            <h3 className="mt-2 truncate text-base font-semibold">{title}</h3>
            <p className="mt-1 truncate text-sm text-muted-foreground">{hostname}</p>
          </div>
          <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-[11px] text-muted-foreground">
            {previewKind === "iframe" && status !== "timeout" ? "미리보기 가능" : "링크 카드"}
          </span>
        </div>

        <div data-resource-checklist="true" className="mt-4 rounded-md border border-dashed border-border bg-muted/20 p-3">
          <div className="mb-2 text-xs font-medium text-foreground">이 도구에서 확인할 것</div>
          <ul className="space-y-1.5 text-xs leading-5 text-muted-foreground">
            {checklist.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={() => parsedUrl && openExternalUrl(parsedUrl.href)}
            disabled={!parsedUrl}
          >
            <ExternalLink className="size-4" />
            새 탭에서 보기
          </Button>
          {status === "timeout" && parsedUrl && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setPreviewKey((key) => key + 1)}
            >
              <RefreshCw className="size-4" />
              미리보기 재시도
            </Button>
          )}
        </div>
      </div>
    </div>
  );
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

      {resourceCard}

      <div className="relative min-h-0 flex-1 basis-0 bg-background">
        {status === "loading" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">미리보기를 불러오는 중...</p>
          </div>
        )}

        {unavailable ? (
          <div data-resource-preview-fallback="true" className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="rounded-full bg-muted p-3">
              <Lock className="size-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-base font-semibold">{unavailableTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                <strong>{hostname}</strong> · {unavailableDescription}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {unavailableAction}
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
              data-preview-frame="true"
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
      <div
        data-preview-panel="embedded"
        className="flex h-[88vh] min-h-[720px] max-h-[860px] flex-col overflow-hidden rounded-lg border border-border bg-background shadow-sm lg:h-[72vh] lg:min-h-[620px] lg:max-h-[820px]"
      >
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
