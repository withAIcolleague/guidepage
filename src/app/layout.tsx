import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXINOUS's Portal",
  description:
    "대분류에서 세부분류와 실행 도구까지 탐색하는 NEXINOUS 지식 워크플로우 포털.",
  keywords: ["NEXINOUS", "portal", "지식 포털", "대시보드", "워크플로우", "분류"],
  authors: [{ name: "NEXINOUS" }],
  openGraph: {
    title: "NEXINOUS's Portal",
    description:
      "대분류에서 세부분류와 실행 도구까지 탐색하는 NEXINOUS 지식 워크플로우 포털.",
    type: "website",
    locale: "ko_KR",
    siteName: "NEXINOUS Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXINOUS's Portal",
    description:
      "대분류에서 세부분류와 실행 도구까지 탐색하는 NEXINOUS 지식 워크플로우 포털.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
