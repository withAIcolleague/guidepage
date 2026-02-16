export interface FlowNode {
    title: string;
    url: string;
    role: string; // 해당 플로우에서의 역할 설명
}

export interface WorkflowChain {
    id: string;
    name: string;
    description: string;
    icon: string;
    gradient: string;
    nodes: FlowNode[];
}

/**
 * Value Chain / Task Process 기반 워크플로우 데이터
 * 각 체인은 서비스들의 상호연관성과 프로세스 흐름을 나타냅니다.
 * 새 워크플로우를 추가하려면 이 배열에 체인을 추가하세요.
 */
export const workflowChains: WorkflowChain[] = [
    {
        id: "product-pipeline",
        name: "프로덕트 개발 파이프라인",
        description: "아이디어에서 배포까지, 프로덕트가 만들어지는 전체 흐름",
        icon: "🚀",
        gradient: "from-violet-500 to-indigo-500",
        nodes: [
            { title: "Dribbble", url: "https://dribbble.com", role: "영감 수집" },
            { title: "Figma", url: "https://www.figma.com", role: "UI/UX 디자인" },
            { title: "GitHub", url: "https://github.com", role: "소스 관리" },
            { title: "npm", url: "https://www.npmjs.com", role: "패키지 관리" },
            { title: "Docker Hub", url: "https://hub.docker.com", role: "컨테이너화" },
            { title: "Vercel", url: "https://vercel.com", role: "배포" },
            { title: "Cloudflare", url: "https://www.cloudflare.com", role: "CDN / 보안" },
        ],
    },
    {
        id: "ai-workflow",
        name: "AI / ML 워크플로우",
        description: "데이터 탐색에서 모델 서빙까지, AI 프로젝트의 생명 주기",
        icon: "🧠",
        gradient: "from-cyan-500 to-blue-500",
        nodes: [
            { title: "Papers with Code", url: "https://paperswithcode.com", role: "논문 리서치" },
            { title: "Kaggle", url: "https://www.kaggle.com", role: "데이터 & 실험" },
            { title: "Google AI Studio", url: "https://aistudio.google.com", role: "모델 프로토타입" },
            { title: "Hugging Face", url: "https://huggingface.co", role: "모델 허브" },
            { title: "ChatGPT", url: "https://chat.openai.com", role: "AI 어시스턴트" },
            { title: "Replicate", url: "https://replicate.com", role: "모델 서빙" },
        ],
    },
    {
        id: "frontend-stack",
        name: "프론트엔드 개발 스택",
        description: "웹 기초부터 프레임워크까지, 프론트엔드 기술의 레이어 구성",
        icon: "🏗️",
        gradient: "from-emerald-500 to-teal-500",
        nodes: [
            { title: "MDN Web Docs", url: "https://developer.mozilla.org", role: "웹 표준 기초" },
            { title: "TypeScript Docs", url: "https://www.typescriptlang.org/docs", role: "타입 시스템" },
            { title: "React Docs", url: "https://react.dev", role: "UI 라이브러리" },
            { title: "Tailwind CSS", url: "https://tailwindcss.com/docs", role: "스타일링" },
            { title: "Next.js Docs", url: "https://nextjs.org/docs", role: "풀스택 프레임워크" },
            { title: "CodePen", url: "https://codepen.io", role: "프로토타이핑" },
        ],
    },
    {
        id: "design-system",
        name: "디자인 시스템 구축 플로우",
        description: "색상 선정에서 에셋 관리까지, 일관된 디자인 언어를 만드는 과정",
        icon: "🎨",
        gradient: "from-pink-500 to-rose-500",
        nodes: [
            { title: "Behance", url: "https://www.behance.net", role: "트렌드 조사" },
            { title: "Coolors", url: "https://coolors.co", role: "색상 팔레트" },
            { title: "Google Fonts", url: "https://fonts.google.com", role: "타이포그래피" },
            { title: "Unsplash", url: "https://unsplash.com", role: "이미지 에셋" },
            { title: "Figma", url: "https://www.figma.com", role: "컴포넌트 설계" },
        ],
    },
    {
        id: "devops-infra",
        name: "인프라 & DevOps 체인",
        description: "코드에서 프로덕션까지, 안정적인 서비스 운영 인프라",
        icon: "⚙️",
        gradient: "from-amber-500 to-orange-500",
        nodes: [
            { title: "GitHub", url: "https://github.com", role: "코드 & CI/CD" },
            { title: "Docker Hub", url: "https://hub.docker.com", role: "컨테이너 이미지" },
            { title: "AWS", url: "https://aws.amazon.com", role: "클라우드 컴퓨팅" },
            { title: "Google Cloud", url: "https://cloud.google.com", role: "데이터 & AI 인프라" },
            { title: "Supabase", url: "https://supabase.com", role: "BaaS / 데이터베이스" },
            { title: "Cloudflare", url: "https://www.cloudflare.com", role: "엣지 네트워크" },
        ],
    },
    {
        id: "learning-growth",
        name: "학습 & 성장 사이클",
        description: "기초 학습에서 커뮤니티 기여까지, 개발자 성장의 순환 구조",
        icon: "📈",
        gradient: "from-purple-500 to-violet-500",
        nodes: [
            { title: "W3Schools", url: "https://www.w3schools.com", role: "기초 학습" },
            { title: "freeCodeCamp", url: "https://www.freecodecamp.org", role: "실습 코딩" },
            { title: "Stack Overflow", url: "https://stackoverflow.com", role: "문제 해결" },
            { title: "VS Code Docs", url: "https://code.visualstudio.com/docs", role: "도구 숙련" },
            { title: "Dev.to", url: "https://dev.to", role: "지식 공유" },
            { title: "Hacker News", url: "https://news.ycombinator.com", role: "트렌드 파악" },
            { title: "Product Hunt", url: "https://www.producthunt.com", role: "프로덕트 발굴" },
        ],
    },
    {
        id: "art-history",
        name: "미술사조의 흐름",
        description: "르네상스에서 현대 미술까지, 시대를 관통하는 미적 변천사",
        icon: "🖼️",
        gradient: "from-rose-500 to-red-500",
        nodes: [
            { title: "르네상스", url: "https://ko.wikipedia.org/wiki/르네상스_미술", role: "재생 & 휴머니즘" },
            { title: "바로크", url: "https://ko.wikipedia.org/wiki/바로크", role: "역동성 & 감정" },
            { title: "인상주의", url: "https://ko.wikipedia.org/wiki/인상주의", role: "빛과 순간" },
            { title: "입체파", url: "https://ko.wikipedia.org/wiki/입체파", role: "다시점 & 해체" },
            { title: "초현실주의", url: "https://ko.wikipedia.org/wiki/초현실주의", role: "무의식 & 꿈" },
            { title: "팝아트", url: "https://ko.wikipedia.org/wiki/팝_아트", role: "대중문화" },
            { title: "현대미술", url: "https://ko.wikipedia.org/wiki/현대_미술", role: "개념 & 융합" },
        ],
    },
    {
        id: "semiconductor-process",
        name: "반도체 공정 흐름",
        description: "모래에서 마이크로칩까지, 반도체 제조의 8대 공정",
        icon: "💾",
        gradient: "from-blue-600 to-cyan-600",
        nodes: [
            { title: "Fabless", url: "https://ko.wikipedia.org/wiki/팹리스_반도체_기업", role: "설계 & 기획" },
            { title: "Design House", url: "https://ko.wikipedia.org/wiki/반도체_설계", role: "설계 최적화" },
            { title: "Wafer Fab", url: "https://ko.wikipedia.org/wiki/파운드리", role: "전공정 (8대 공정)" },
            { title: "EDS Test", url: "https://ko.wikipedia.org/wiki/반도체_테스트", role: "수율 선별" },
            { title: "Packaging (OSAT)", url: "https://ko.wikipedia.org/wiki/반도체_패키징", role: "후공정 & 조립" },
            { title: "Distributor", url: "https://ko.wikipedia.org/wiki/유통", role: "글로벌 유통" },
            { title: "Application", url: "https://ko.wikipedia.org/wiki/전자기기", role: "최종 탑재" },
        ],
    },
];
