"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PreviewPanelProps {
    url: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

export function PreviewPanel({ url, title, isOpen, onClose }: PreviewPanelProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                {/* 헤더 바 */}
                <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-red-500/80" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                            <div className="h-3 w-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="h-4 w-px bg-border mx-1" />
                        <span className="text-sm font-medium text-foreground truncate max-w-[200px] sm:max-w-md">
                            {title}
                        </span>
                        <span className="hidden text-xs text-muted-foreground sm:inline-block">
                            — {url}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-2 text-xs"
                            onClick={() => window.open(url, "_blank")}
                        >
                            <span>새 탭으로 열기</span>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.5 1.5H1.5C1.22386 1.5 1 1.72386 1 2V10C1 10.2761 1.22386 10.5 1.5 10.5H9.5C9.77614 10.5 10 10.2761 10 10V8M6 6L11 1M11 1H8M11 1V4"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={onClose}
                            aria-label="닫기"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 4L4 12M4 4L12 12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Button>
                    </div>
                </div>

                {/* 브라우저 영역 */}
                <div className="relative h-[500px] w-full bg-background">
                    {isLoading && !hasError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background z-10">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                            <p className="text-sm text-muted-foreground animate-pulse">
                                페이지를 불러오는 중...
                            </p>
                        </div>
                    )}

                    {hasError ? (
                        <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                            <div className="rounded-full bg-muted p-4">
                                <span className="text-4xl">🔒</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">연결이 거부되었습니다</h3>
                                <p className="max-w-md text-sm text-muted-foreground">
                                    <strong>{new URL(url).hostname}</strong>에서 콘텐츠 표시를 허용하지 않습니다.
                                    <br />
                                    보안 정책(X-Frame-Options)으로 인해 인앱 브라우저에서 볼 수 없습니다.
                                </p>
                            </div>
                            <Button onClick={() => window.open(url, "_blank")}>
                                새 탭에서 보기
                            </Button>
                        </div>
                    ) : (
                        <iframe
                            title={`${title} preview`}
                            src={url}
                            className="h-full w-full border-0"
                            onLoad={() => setIsLoading(false)}
                            onError={() => {
                                setIsLoading(false);
                                setHasError(true);
                            }}
                            // 샌드박스 정책 완화 (필요시 조정)
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
