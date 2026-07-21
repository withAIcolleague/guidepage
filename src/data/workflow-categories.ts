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
    description: "인간이 함께 살아가기 위해 만든 교환, 제도, 공동체 구조",
    icon: "🏛️",
    sections: [
      {
        id: "exchange-market",
        name: "교환과 시장",
        description: "물물교환, 화폐, 시장, 자본주의로 발전한 가치 교환의 역사",
        chainIds: ["exchange-market-history"],
      },
      {
        id: "state-law",
        name: "제도와 국가",
        description: "관습, 법, 행정, 국민국가로 이어진 사회 질서의 제도화 흐름",
        chainIds: ["state-law-history"],
      },
      {
        id: "city-community",
        name: "도시와 공동체",
        description: "부족, 도시, 시민사회, 공공정책으로 확장된 공동생활의 구조",
        chainIds: ["city-community-history"],
      },
    ],
  },
  {
    id: "norms-governance",
    name: "마음과 안식",
    description: "의식, 감정, 학습, 치유를 통해 인간 내면의 질서를 탐구",
    icon: "🧠",
    sections: [
      {
        id: "consciousness-mind",
        name: "의식과 마음",
        description: "영혼론, 심리학, 인지과학으로 이어진 마음 이해의 발전 흐름",
        chainIds: ["consciousness-mind-history"],
      },
      {
        id: "learning-education",
        name: "학습과 교육",
        description: "도제, 학교, 대중교육, 온라인 학습으로 이어진 지식 전승의 역사",
        chainIds: ["learning-education-history"],
      },
      {
        id: "care-rest",
        name: "치유와 안식",
        description: "수행, 상담, 정신의학, 웰빙 문화로 이어진 마음 돌봄의 흐름",
        chainIds: ["care-rest-history"],
      },
    ],
  },
  {
    id: "expression-sensation",
    name: "표현과 소통",
    description: "언어, 예술, 매체를 통해 인간이 경험과 의미를 나누어 온 방식",
    icon: "🎨",
    sections: [
      {
        id: "language-writing",
        name: "언어와 문자",
        description: "구술, 문자, 인쇄, 디지털 텍스트로 이어진 기록과 소통의 역사",
        chainIds: ["language-writing-history"],
      },
      {
        id: "art-aesthetics",
        name: "예술과 미학",
        description: "의례적 이미지, 고전 예술, 근대 미학, 현대 예술로 발전한 감각 표현의 흐름",
        chainIds: ["art-aesthetics-history"],
      },
      {
        id: "media-communication",
        name: "매체와 소통",
        description: "신문, 방송, 인터넷, 플랫폼으로 확장된 대중 소통의 구조",
        chainIds: ["media-communication-history"],
      },
    ],
  },
  {
    id: "history-records",
    name: "역사와 기록",
    description: "시간 속에서 축적된 사건, 기억, 문명, 해석의 지식 체계",
    icon: "📖",
    sections: [
      {
        id: "memory-archives",
        name: "기억과 기록",
        description: "구전, 문서, 아카이브, 데이터베이스로 이어진 기억 보존의 흐름",
        chainIds: ["memory-archives-history"],
      },
      {
        id: "civilization-exchange",
        name: "문명과 교류",
        description: "농경, 도시, 제국, 해양 교역, 세계화로 이어진 문명 상호작용의 역사",
        chainIds: ["civilization-exchange-history"],
      },
      {
        id: "historical-interpretation",
        name: "사상과 해석",
        description: "신화, 철학, 역사학, 사회이론으로 이어진 세계 해석 방식의 변화",
        chainIds: ["historical-interpretation-history"],
      },
    ],
  },
  {
    id: "life-health",
    name: "생명과 환경",
    description: "생명의 발생, 몸의 유지, 생태계와 환경의 상호작용을 탐구",
    icon: "🌱",
    sections: [
      {
        id: "origin-evolution",
        name: "생명의 기원",
        description: "자연발생설, 세포설, 진화론, 유전학으로 이어진 생명 이해의 흐름",
        chainIds: ["origin-evolution-history"],
      },
      {
        id: "body-medicine",
        name: "몸과 의학",
        description: "고대 의학, 해부학, 병원, 공중보건, 근거중심의학으로 발전한 몸 돌봄의 역사",
        chainIds: ["body-medicine-history"],
      },
      {
        id: "ecology-environment",
        name: "생태와 환경",
        description: "자연사, 생태학, 보전, 기후위기 대응으로 확장된 생명 환경의 지식 흐름",
        chainIds: ["ecology-environment-history"],
      },
    ],
  },
  {
    id: "tools-intelligence",
    name: "인공물과 기술",
    description: "인간이 자연을 가공해 만든 도구, 계산, 자동화, 지능의 역사",
    icon: "⚙️",
    sections: [
      {
        id: "tool-making",
        name: "도구의 역사",
        description: "석기, 금속, 기계, 산업기술로 이어진 제작 능력의 발전 흐름",
        chainIds: ["tool-making-history"],
      },
      {
        id: "computation-information",
        name: "계산과 정보",
        description: "계산 도구, 컴퓨터, 네트워크, 웹으로 이어진 정보 처리의 역사",
        chainIds: ["computation-information-history"],
      },
      {
        id: "automation-intelligence",
        name: "자동화와 지능",
        description: "자동기계, 사이버네틱스, 인공지능, 에이전트로 확장된 기계 지능의 흐름",
        chainIds: ["automation-intelligence-history"],
      },
    ],
  },
  {
    id: "belief-religion",
    name: "신념과 종교",
    description: "초월, 의례, 구원, 의미 체계를 통해 인간이 세계를 해석해 온 방식",
    icon: "☸️",
    sections: [
      {
        id: "myth-ritual",
        name: "신화와 제의",
        description: "자연 숭배, 신화, 제사, 의례로 세계 질서를 상징화한 흐름",
        chainIds: ["myth-ritual-history"],
      },
      {
        id: "world-religions",
        name: "세계 종교",
        description: "고대 종교, 축의 시대, 보편 종교, 경전 전통으로 이어진 믿음의 역사",
        chainIds: ["world-religions-history"],
      },
      {
        id: "modern-belief",
        name: "근대 이후의 신념",
        description: "세속화, 이념, 과학주의, 뉴에이지와 현대 영성으로 분화한 의미 체계",
        chainIds: ["modern-belief-history"],
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
    id: "math-computation",
    sourceId: "chain:pure-forms-history",
    targetId: "chain:computation-information-history",
    label: "순수 형식 ↔ 계산과 정보",
    description: "논리, 대수, 형식 체계는 계산기와 컴퓨터, 프로그래밍 언어로 이어지는 정보 처리 기술의 이론적 기반입니다.",
  },
  {
    id: "quantum-technology",
    sourceId: "chain:micro-world-history",
    targetId: "chain:automation-intelligence-history",
    label: "미시 세계 ↔ 현대 기술",
    description: "원자와 양자 현상에 대한 이해는 반도체, 센서, 양자컴퓨팅 등 현대 기술 체계와 직접 연결됩니다.",
  },
  {
    id: "ecology-governance",
    sourceId: "chain:ecology-environment-history",
    targetId: "chain:state-law-history",
    label: "생태 환경 ↔ 제도와 국가",
    description: "기후위기와 보전 과학은 법, 행정, 국제 거버넌스의 제도 설계와 함께 작동합니다.",
  },
  {
    id: "media-belief",
    sourceId: "chain:media-communication-history",
    targetId: "chain:modern-belief-history",
    label: "매체와 소통 ↔ 현대 신념",
    description: "신문, 방송, 플랫폼은 현대 이념과 신념, 여론 형성 방식에 깊게 관여합니다.",
  },
  {
    id: "archives-history",
    sourceId: "chain:memory-archives-history",
    targetId: "chain:historical-interpretation-history",
    label: "기억과 기록 ↔ 사상과 해석",
    description: "기록의 보존 방식은 역사 해석의 가능성과 한계를 결정하며, 해석의 틀은 다시 어떤 기록을 남길지에 영향을 줍니다.",
  },
];