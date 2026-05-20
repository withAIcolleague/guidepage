export type WorkflowCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  chainIds: string[];
};

export const workflowCategories: WorkflowCategory[] = [
  {
    id: "humanities",
    name: "인문학",
    description: "역사, 언어, 철학, 예술사의 관점에서 인간의 의미와 표현을 해석",
    icon: "🏛️",
    chainIds: ["art-history", "music-history-chain"],
  },
  {
    id: "social-sciences",
    name: "사회과학",
    description: "사회 구조, 제도, 집단 행동과 인간 관계의 작동 원리를 분석",
    icon: "🌐",
    chainIds: [],
  },
  {
    id: "natural-sciences",
    name: "자연과학",
    description: "물질, 생명, 지구, 우주 현상의 원리와 관찰 체계를 탐구",
    icon: "🔬",
    chainIds: [],
  },
  {
    id: "math-logic",
    name: "수학·논리",
    description: "형식 체계, 계산, 모델링, 추론을 통해 문제를 구조화",
    icon: "∑",
    chainIds: ["ai-workflow"],
  },
  {
    id: "engineering-technology",
    name: "공학·기술",
    description: "소프트웨어, 인프라, AI 서비스, 반도체 공정을 구현하는 응용 체계",
    icon: "⚙️",
    chainIds: [
      "product-pipeline",
      "frontend-stack",
      "web-service-development",
      "devops-infra",
      "ai-service-build",
      "semiconductor-process",
    ],
  },
  {
    id: "medicine-health",
    name: "의학·보건",
    description: "질병, 건강, 임상, 공중보건과 돌봄 시스템을 다루는 영역",
    icon: "⚕️",
    chainIds: [],
  },
  {
    id: "agriculture-bioindustry",
    name: "농학·생명산업",
    description: "식량, 생태, 바이오 자원과 생명 기반 산업의 생산 체계",
    icon: "🌱",
    chainIds: [],
  },
  {
    id: "arts-design",
    name: "예술·디자인",
    description: "시각 언어, 창작 도구, 경험 설계를 다루는 표현과 설계 영역",
    icon: "🎨",
    chainIds: ["design-system"],
  },
  {
    id: "business-economics",
    name: "경영·경제",
    description: "시장, 조직, 창업, 투자와 가치 창출의 의사결정 체계",
    icon: "📈",
    chainIds: ["startup-build", "investment-analysis"],
  },
  {
    id: "law-policy",
    name: "법·정책",
    description: "규범, 제도, 공공 의사결정과 사회적 합의의 구조를 해석",
    icon: "⚖️",
    chainIds: [],
  },
  {
    id: "education-learning",
    name: "교육·학습",
    description: "역량 성장, 교수 설계, 학습 전략과 지식 습득 과정을 설계",
    icon: "🎓",
    chainIds: ["learning-growth"],
  },
  {
    id: "information-media",
    name: "정보·미디어",
    description: "콘텐츠, 플랫폼, 커뮤니케이션과 정보 유통 방식을 다루는 영역",
    icon: "📰",
    chainIds: ["content-creation"],
  },
];
