export interface Banner {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  gradient: string;
  glowColor: string;
}

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
    id: "wgis",
    title: "WGIS",
    description: "웹 기반 GIS 서비스입니다.",
    url: "https://wgis.vercel.app/",
    icon: "🗺️",
    gradient: "from-sky-600/20 via-cyan-600/10 to-blue-600/20",
    glowColor: "group-hover:shadow-sky-500/25",
  },
  {
    id: "write-partner",
    title: "Write Partner",
    description: "글쓰기 작업을 돕는 파트너 서비스입니다.",
    url: "https://write-partner-opal.vercel.app/",
    icon: "✍️",
    gradient: "from-amber-600/20 via-orange-600/10 to-rose-600/20",
    glowColor: "group-hover:shadow-amber-500/25",
  },
  {
    id: "sticky-memo",
    title: "Sticky Memo",
    description: "빠르게 메모를 붙이고 관리하는 서비스입니다.",
    url: "https://sticky-memo-app.vercel.app/",
    icon: "📝",
    gradient: "from-lime-600/20 via-green-600/10 to-emerald-600/20",
    glowColor: "group-hover:shadow-lime-500/25",
  },
  {
    id: "my-links",
    title: "My Links",
    description: "개인 링크를 모아 관리하는 바로가기 서비스입니다.",
    url: "https://mylinks-wheat.vercel.app/",
    icon: "🔗",
    gradient: "from-indigo-600/20 via-violet-600/10 to-purple-600/20",
    glowColor: "group-hover:shadow-indigo-500/25",
  },
];
