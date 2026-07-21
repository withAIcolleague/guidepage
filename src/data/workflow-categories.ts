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
    id: "being-reason",
    name: "존재와 이성",
    description: "철학적 사유, 역사적 흐름, 인지학습 과정을 통해 존재의 근본을 성찰",
    icon: "🏛️",
    sections: [
      {
        id: "history-humanities",
        name: "역사와 사상",
        description: "시간 속에서 축적된 인류의 문화, 미술사, 음악사 및 인문 철학적 흐름 탐구",
        chainIds: ["art-history", "music-history-chain"],
      },
      {
        id: "learning-growth",
        name: "학습과 인지",
        description: "학습 전략, 지식 습득 과정 및 교육과 성장의 시스템 설계",
        chainIds: ["learning-growth"],
      },
      {
        id: "psychology-behavior",
        name: "심리·행동과학",
        description: "인간의 인지, 심리, 의사결정의 심리학적 구조 분석",
        chainIds: ["decision-analysis"],
      },
    ],
  },
  {
    id: "value-exchange",
    name: "가치와 신용",
    description: "가치를 평가하고, 재화와 신용을 거래하며, 비즈니스를 사업화하는 시장 시스템",
    icon: "📈",
    sections: [
      {
        id: "market-economics",
        name: "시장과 경제",
        description: "시장성 판단, 투자 의사결정 및 경제 가치 사슬 분석",
        chainIds: ["investment-analysis"],
      },
      {
        id: "venture-business",
        name: "비즈니스와 창업",
        description: "아이디어를 실체적인 비즈니스로 만들고 사업화하는 실행 체계",
        chainIds: ["startup-build"],
      },
    ],
  },
  {
    id: "norms-governance",
    name: "규범과 질서",
    description: "법률적 규범 수립, 공공 정책 조율 및 공동체의 행정적 거버넌스 체계",
    icon: "⚖️",
    sections: [
      {
        id: "law-policy",
        name: "법과 제도",
        description: "공동체 질서 유지를 위한 규범, 법률 준수 및 거버넌스",
        chainIds: ["terms-policy-review"],
      },
      {
        id: "public-governance",
        name: "행정과 공공정책",
        description: "정책 입안, 행정적 의사결정 및 공공 서비스 리스크 관리",
        chainIds: ["policy-proposal-review", "community-issue-analysis"],
      },
    ],
  },
  {
    id: "expression-sensation",
    name: "표현과 감성",
    description: "미적 감각, 대중적 감성을 창작물과 미디어로 표출하고 공감하는 영역",
    icon: "🎨",
    sections: [
      {
        id: "creative-design",
        name: "창작과 디자인",
        description: "시각 체계, 경험 설계 및 사용자 인터페이스(UI/UX) 구현",
        chainIds: ["design-system"],
      },
      {
        id: "content-media",
        name: "콘텐츠와 미디어",
        description: "대중문화 창작, 소통 플랫폼 및 다차원적 정보 유통 방식",
        chainIds: ["content-creation", "public-opinion-media-analysis"],
      },
    ],
  },
  {
    id: "matter-cosmos",
    name: "물질과 우주",
    description: "자연 세계와 물리 현상의 이론 모델을 검증하고 기후/지구를 분석하는 기초 과학",
    icon: "🔬",
    sections: [
      {
        id: "natural-sciences",
        name: "기초 자연과학",
        description: "물리, 화학적 발견 및 지구 환경/기후 변화 관측",
        chainIds: ["climate-environment-data"],
      },
    ],
  },
  {
    id: "life-health",
    name: "생명과 건강",
    description: "유기체 과학, 의료 보건 돌봄과 먹거리 생산(농업) 및 웰빙을 연결하는 생명 도메인",
    icon: "🌱",
    sections: [
      {
        id: "bioscience-medicine",
        name: "생명과 의학보건",
        description: "생태/진화 탐구, 의학 기초 연구 및 임상/공중 보건 정보 검증",
        chainIds: ["life-science-literature-review", "health-information-verification"],
      },
      {
        id: "agriculture-wellness",
        name: "농학과 웰니스",
        description: "식량/생명 자원 재배, 식품 안전성 공급망 및 개인 운동/영양 건강 설계",
        chainIds: ["crop-cultivation-research", "food-safety-verification", "lifestyle-health-planning"],
      },
    ],
  },
  {
    id: "tools-intelligence",
    name: "도구와 지능",
    description: "기술적 구현체 제작, 소프트웨어 공학, 인프라 배포 및 인공지능/분산 네트워크 구축",
    icon: "⚙️",
    sections: [
      {
        id: "software-engineering",
        name: "소프트웨어 공학",
        description: "애플리케이션 개발, 프론트엔드/백엔드 스택 및 DevOps 배포 인프라",
        chainIds: ["product-pipeline", "frontend-stack", "web-service-development", "devops-infra"],
      },
      {
        id: "ai-data-science",
        name: "인공지능과 데이터",
        description: "머신러닝 실험, 데이터 인프라 및 AI 서비스 프로토타이핑",
        chainIds: ["ai-workflow", "ai-service-build"],
      },
      {
        id: "hardware-systems",
        name: "하드웨어 공학",
        description: "반도체 제조 미세 공정 및 물리 인프라 가치 사슬",
        chainIds: ["semiconductor-process"],
      },
    ],
  },
];

export interface ConvergenceLink {
  id: string;
  sourceId: string;
  targetId: string;
  label: string;
  description: string;
}

export const convergenceLinks: ConvergenceLink[] = [
  {
    id: "semiconductor-physics",
    sourceId: "chain:semiconductor-process",
    targetId: "chain:climate-environment-data",
    label: "반도체 공학 ↔ 물성 물리학",
    description: "반도체 미세 공정(하드웨어 공학)은 고체 물리학 및 화학적 재료 분석(기초 자연과학)과 직접 오버랩되는 최첨단 융합 영역입니다.",
  },
  {
    id: "ai-bioscience",
    sourceId: "chain:ai-workflow",
    targetId: "chain:life-science-literature-review",
    label: "인공지능 ↔ 바이오 정보학",
    description: "AI 모델 실험 및 데이터 사이언스(인공지능) 기법은 생명과학 문헌 분석 및 신약 후보 물질 발굴(생명과학)에 핵심 도구로 쓰이며 강하게 융합됩니다.",
  },
  {
    id: "ai-medicine",
    sourceId: "chain:ai-service-build",
    targetId: "chain:health-information-verification",
    label: "AI 서비스 ↔ 보건의료 검증",
    description: "의료 데이터 진단 보조 및 환자 맞춤형 건강 검증(보건의료) 서비스 개발에 AI 기술과 지능형 에이전트 인프라가 결합되어 있습니다.",
  },
  {
    id: "smart-agriculture",
    sourceId: "chain:crop-cultivation-research",
    targetId: "chain:devops-infra",
    label: "스마트농업 ↔ IoT/DevOps 인프라",
    description: "식량/작물 재배 연구(농학)는 온습도/토양 센서 데이터를 실시간으로 모니터링하기 위한 IoT 인프라 및 클라우드 파이프라인(DevOps) 기술과 연결됩니다.",
  },
  {
    id: "climate-finance",
    sourceId: "chain:climate-environment-data",
    targetId: "chain:investment-analysis",
    label: "기후 환경 ↔ 녹색 금융/환경 투자",
    description: "글로벌 기후 변화 및 환경 오염 데이터 분석(기초 과학)은 기업 ESG 가치 평가 및 탄소배출권 투자 의사결정(시장 경제)과 밀접하게 연동됩니다.",
  },
];
