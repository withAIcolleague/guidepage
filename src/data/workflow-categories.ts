export type WorkflowCategorySection = {
  id: string;
  name: string;
  description: string;
  chainIds: string[];
};

export type WorkflowCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  sections: WorkflowCategorySection[];
};

export const workflowCategories: WorkflowCategory[] = [
  {
    id: "humanities",
    name: "인문학",
    description: "역사, 언어, 철학, 예술사의 관점에서 인간의 의미와 표현을 해석",
    icon: "🏛️",
    sections: [
      {
        id: "history-arts",
        name: "역사·예술사",
        description: "시간 속에서 축적된 문화, 예술, 음악의 흐름을 해석",
        chainIds: ["art-history", "music-history-chain"],
      },
    ],
  },
  {
    id: "social-sciences",
    name: "사회과학",
    description: "사회 구조, 제도, 집단 행동과 인간 관계의 작동 원리를 분석",
    icon: "🌐",
    sections: [
      {
        id: "psychology-behavior",
        name: "심리·행동과학",
        description: "개인 행동, 인지, 감정, 동기와 의사결정을 분석",
        chainIds: ["decision-analysis"],
      },
      {
        id: "society-institutions",
        name: "사회·제도 연구",
        description: "사회 구조, 제도, 정책, 집단 행동을 다루는 분석 영역",
        chainIds: ["community-issue-analysis"],
      },
    ],
  },
  {
    id: "natural-sciences",
    name: "자연과학",
    description: "물질, 생명, 지구, 우주 현상의 원리와 관찰 체계를 탐구",
    icon: "🔬",
    sections: [
      {
        id: "physical-life-sciences",
        name: "물질·생명·지구",
        description: "자연 현상을 관찰하고 원리와 모델로 설명하는 영역",
        chainIds: ["climate-environment-data"],
      },
    ],
  },
  {
    id: "math-logic",
    name: "수학·논리",
    description: "형식 체계, 계산, 모델링, 추론을 통해 문제를 구조화",
    icon: "∑",
    sections: [
      {
        id: "computation-modeling",
        name: "계산·모델링",
        description: "데이터, 계산, 모델을 통해 패턴과 예측 체계를 구성",
        chainIds: ["ai-workflow"],
      },
    ],
  },
  {
    id: "engineering-technology",
    name: "공학·기술",
    description: "소프트웨어, 인프라, AI 서비스, 반도체 공정을 구현하는 응용 체계",
    icon: "⚙️",
    sections: [
      {
        id: "software-engineering",
        name: "소프트웨어 공학",
        description: "제품, 웹 서비스, 프론트엔드 구현을 다루는 개발 체계",
        chainIds: ["product-pipeline", "frontend-stack", "web-service-development"],
      },
      {
        id: "ai-data-engineering",
        name: "AI·데이터 공학",
        description: "AI 서비스를 설계하고 모델을 실제 제품으로 연결",
        chainIds: ["ai-service-build"],
      },
      {
        id: "infrastructure-devops",
        name: "인프라·DevOps",
        description: "운영, 배포, 자동화, 시스템 신뢰성을 다루는 영역",
        chainIds: ["devops-infra"],
      },
      {
        id: "semiconductor-hardware",
        name: "반도체·하드웨어",
        description: "공정, 장비, 소재, 하드웨어 가치사슬을 이해",
        chainIds: ["semiconductor-process"],
      },
    ],
  },
  {
    id: "medicine-health",
    name: "의학·보건",
    description: "질병, 건강, 임상, 공중보건과 돌봄 시스템을 다루는 영역",
    icon: "⚕️",
    sections: [
      {
        id: "health-systems",
        name: "보건·의료 체계",
        description: "건강, 임상, 공중보건, 의료 시스템의 작동 구조",
        chainIds: ["health-information-verification"],
      },
      {
        id: "nutrition-exercise-health",
        name: "영양·운동건강",
        description: "식이, 신체활동, 수면, 생활습관 기록과 예방적 건강 관리를 다루는 영역",
        chainIds: ["lifestyle-health-planning"],
      },
    ],
  },
  {
    id: "agriculture-bioindustry",
    name: "농학·생명산업",
    description: "식량, 생태, 바이오 자원과 생명 기반 산업의 생산 체계",
    icon: "🌱",
    sections: [
      {
        id: "bio-resources",
        name: "생명자원·생산",
        description: "식량, 생태, 바이오 자원과 생산 시스템을 연결",
        chainIds: ["crop-cultivation-research"],
      },
      {
        id: "food-safety-systems",
        name: "축산·식품시스템",
        description: "식품 원료, 위해 요인, 표시, 보관, 회수와 식품 공급망 안전을 다루는 영역",
        chainIds: ["food-safety-verification"],
      },
    ],
  },
  {
    id: "arts-design",
    name: "예술·디자인",
    description: "시각 언어, 창작 도구, 경험 설계를 다루는 표현과 설계 영역",
    icon: "🎨",
    sections: [
      {
        id: "visual-experience-design",
        name: "시각·경험 디자인",
        description: "시각 체계, 인터페이스, 사용자 경험을 설계",
        chainIds: ["design-system"],
      },
    ],
  },
  {
    id: "business-economics",
    name: "경영·경제",
    description: "시장, 조직, 창업, 투자와 가치 창출의 의사결정 체계",
    icon: "📈",
    sections: [
      {
        id: "venture-business",
        name: "창업·사업화",
        description: "아이디어를 시장과 조직으로 연결하는 실행 체계",
        chainIds: ["startup-build"],
      },
      {
        id: "market-investment",
        name: "시장·투자 분석",
        description: "시장 탐색, 수익 판단, 투자 의사결정을 다루는 영역",
        chainIds: ["investment-analysis"],
      },
    ],
  },
  {
    id: "law-policy",
    name: "법·정책",
    description: "규범, 제도, 공공 의사결정과 사회적 합의의 구조를 해석",
    icon: "⚖️",
    sections: [
      {
        id: "law-governance",
        name: "규범·거버넌스",
        description: "법, 정책, 공공 의사결정과 사회적 합의 구조",
        chainIds: ["terms-policy-review"],
      },
      {
        id: "public-policy",
        name: "행정·공공정책",
        description: "정책 문제 정의, 근거 수집, 제도 비교, 집행 리스크를 다루는 영역",
        chainIds: ["policy-proposal-review"],
      },
    ],
  },
  {
    id: "education-learning",
    name: "교육·학습",
    description: "역량 성장, 교수 설계, 학습 전략과 지식 습득 과정을 설계",
    icon: "🎓",
    sections: [
      {
        id: "learning-design",
        name: "학습 설계",
        description: "역량 성장, 학습 전략, 지식 습득 과정을 설계",
        chainIds: ["learning-growth"],
      },
    ],
  },
  {
    id: "information-media",
    name: "정보·미디어",
    description: "콘텐츠, 플랫폼, 커뮤니케이션과 정보 유통 방식을 다루는 영역",
    icon: "📰",
    sections: [
      {
        id: "content-communication",
        name: "콘텐츠·커뮤니케이션",
        description: "콘텐츠 제작, 플랫폼, 정보 전달 방식을 다루는 영역",
        chainIds: ["content-creation"],
      },
    ],
  },
];
