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
    name: "근원과 질서",
    description: "존재의 가장 밑바닥에 있는 규칙과 물질에 대한 탐구",
    icon: "🏺",
    sections: [
      {
        id: "pure-forms",
        name: "순수 형식",
        description: "수와 도형, 논리, 증명 체계가 추상적 질서로 정립되어 온 흐름",
        chainIds: ["pure-forms-history"],
      },
      {
        id: "micro-world",
        name: "미시 세계",
        description: "물질의 최소 단위와 보이지 않는 작용을 원자론, 화학, 양자론으로 이해해 온 흐름",
        chainIds: ["micro-world-history"],
      },
      {
        id: "macro-world",
        name: "거시 세계",
        description: "운동, 힘, 중력, 시공간을 통해 큰 규모의 자연 질서를 설명해 온 흐름",
        chainIds: ["macro-world-history"],
      },
      {
        id: "cosmic-structure",
        name: "우주 구조",
        description: "천문 관측과 우주론을 통해 세계의 전체 구조를 상상하고 검증해 온 흐름",
        chainIds: ["cosmic-structure-history"],
      },
    ],
  },
  {
    id: "value-exchange",
    name: "사회와 시스템",
    description: "인간이 모여 살기 위해 만든 규칙과 구조",
    icon: "🏛️",
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
    id: "norms-governance",
    name: "마음과 안식",
    description: "보이지 않는 내면 세계와 인지 능력을 탐구",
    icon: "🧠",
    sections: [
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
    id: "expression-sensation",
    name: "표현과 소통",
    description: "인간이 내부의 아이디어를 외부로 전달하고 기록하는 방식",
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
    id: "history-records",
    name: "역사와 기록",
    description: "시간의 흐름에 따라 축적된 인간과 우주의 궤적",
    icon: "📖",
    sections: [
      {
        id: "history-humanities",
        name: "역사와 사상",
        description: "시간 속에서 축적된 인류의 문화, 미술사, 음악사 및 인문 철학적 흐름 탐구",
        chainIds: ["art-history", "music-history-chain"],
      },
    ],
  },
  {
    id: "life-health",
    name: "생명과 환경",
    description: "유기적으로 살아 움직이는 모든 존재와 그들의 터전",
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
    name: "인공물과 기술",
    description: "인간이 생존과 편의를 위해 자연을 가공해 만든 모든 도구와 지식",
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
  {
    id: "belief-religion",
    name: "신념과 종교",
    description: "보이지 않는 초자연적 영역에 대한 인간의 믿음 체계",
    icon: "☸️",
    sections: [

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
