export interface Banner {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  gradient: string;
  glowColor: string;
}

/**
 * 배너 데이터 배열
 * 새 서비스 배너를 추가하려면 이 배열에 객체를 추가하세요.
 * - id: 고유 식별자
 * - title: 배너 제목
 * - description: 배너 설명
 * - url: 이동할 서비스 URL
 * - icon: 이모지 아이콘
 * - gradient: 배경 그래디언트 CSS
 * - glowColor: 호버 시 글로우 색상
 */
export const banners: Banner[] = [
  {
    id: "andong-intro",
    title: "AndongIntro",
    description: "안동을 소개합니다.",
    url: "https://andongintro.vercel.app/",
    icon: "🔮",
    gradient: "from-violet-600/20 via-purple-600/10 to-fuchsia-600/20",
    glowColor: "group-hover:shadow-violet-500/25",
  },
  {
    id: "k-history-tracker",
    title: "K-History-Tracker",
    description: "한국사 연표를 한눈에 확인하세요.",
    url: "https://k-history-tracker-blue.vercel.app/",
    icon: "⚡",
    gradient: "from-cyan-600/20 via-blue-600/10 to-indigo-600/20",
    glowColor: "group-hover:shadow-cyan-500/25",
  },
  {
    id: "service-gamma",
    title: "Service Gamma",
    description: "AI 기반 자동화 워크플로우 엔진",
    url: "https://example.com/gamma",
    icon: "🧬",
    gradient: "from-emerald-600/20 via-teal-600/10 to-green-600/20",
    glowColor: "group-hover:shadow-emerald-500/25",
  },
];
