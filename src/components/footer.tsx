export function Footer() {
    return (
        <footer className="border-t border-border px-6 py-12">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
                {/* 로고 */}
                <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-cyan-500">
                        <span className="text-xs font-bold text-white">N</span>
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-foreground">
                        NEXINOUS&apos;s Portal
                    </span>
                </div>

                {/* 설명 */}
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                    모든 서비스를 하나의 포털에서 관리하고 접근하세요.
                </p>

                {/* 구분선 */}
                <div className="h-px w-full max-w-xs bg-border" />

                {/* 카피라이트 */}
                <p className="text-xs text-muted-foreground/60">
                    © 2026 NEXINOUS. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
