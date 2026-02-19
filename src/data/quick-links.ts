export interface FlowNode {
    tools: { name: string; url: string }[]; // 관련 도구 또는 서비스 목록
    role: string; // 해당 플로우에서의 역할 설명
    theoryUrl?: string; // (Optional) 관련 이론 또는 개념 링크
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
            { tools: [{ name: "Dribbble", url: "https://dribbble.com" }, { name: "Pinterest", url: "https://pinterest.com" }, { name: "Behance", url: "https://behance.net" }], role: "영감 수집", theoryUrl: "https://www.google.com" },
            { tools: [{ name: "Figma", url: "https://www.figma.com" }, { name: "Adobe XD", url: "https://www.adobe.com/products/xd.html" }], role: "UI/UX 디자인", theoryUrl: "https://ko.wikipedia.org/wiki/사용자_인터페이스_디자인" },
            { tools: [{ name: "GitHub", url: "https://github.com" }, { name: "GitLab", url: "https://gitlab.com" }], role: "소스 관리", theoryUrl: "https://ko.wikipedia.org/wiki/버전_관리" },
            { tools: [{ name: "npm", url: "https://www.npmjs.com" }, { name: "Yarn", url: "https://yarnpkg.com" }], role: "패키지 관리", theoryUrl: "https://ko.wikipedia.org/wiki/패키지_관리자" },
            { tools: [{ name: "Docker Hub", url: "https://hub.docker.com" }], role: "컨테이너화", theoryUrl: "https://ko.wikipedia.org/wiki/OS_수준_가상화" },
            { tools: [{ name: "Vercel", url: "https://vercel.com" }, { name: "Netlify", url: "https://www.netlify.com" }], role: "배포", theoryUrl: "https://ko.wikipedia.org/wiki/소프트웨어_배포" },
            { tools: [{ name: "Cloudflare", url: "https://www.cloudflare.com" }], role: "CDN / 보안", theoryUrl: "https://ko.wikipedia.org/wiki/콘텐츠_전송_네트워크" },
        ],
    },
    {
        id: "ai-workflow",
        name: "AI / ML 워크플로우",
        description: "데이터 탐색에서 모델 서빙까지, AI 프로젝트의 생명 주기",
        icon: "🧠",
        gradient: "from-cyan-500 to-blue-500",
        nodes: [
            { tools: [{ name: "Papers with Code", url: "https://paperswithcode.com" }, { name: "ArXiv", url: "https://arxiv.org" }], role: "논문 리서치", theoryUrl: "https://ko.wikipedia.org/wiki/인공지능" },
            { tools: [{ name: "Kaggle", url: "https://www.kaggle.com" }, { name: "Colab", url: "https://colab.research.google.com" }], role: "데이터 & 실험", theoryUrl: "https://ko.wikipedia.org/wiki/데이터_사이언스" },
            { tools: [{ name: "Google AI Studio", url: "https://aistudio.google.com" }], role: "모델 프로토타입", theoryUrl: "https://ko.wikipedia.org/wiki/기계_학습" },
            { tools: [{ name: "Hugging Face", url: "https://huggingface.co" }], role: "모델 허브", theoryUrl: "https://ko.wikipedia.org/wiki/자연어_처리" },
            { tools: [{ name: "ChatGPT", url: "https://chat.openai.com" }, { name: "Claude", url: "https://claude.ai" }, { name: "Gemini", url: "https://gemini.google.com" }], role: "AI 어시스턴트", theoryUrl: "https://ko.wikipedia.org/wiki/거대_언어_모델" },
            { tools: [{ name: "Replicate", url: "https://replicate.com" }], role: "모델 서빙", theoryUrl: "https://ko.wikipedia.org/wiki/클라우드_컴퓨팅" },
        ],
    },
    {
        id: "frontend-stack",
        name: "프론트엔드 개발 스택",
        description: "웹 기초부터 프레임워크까지, 프론트엔드 기술의 레이어 구성",
        icon: "🏗️",
        gradient: "from-emerald-500 to-teal-500",
        nodes: [
            { tools: [{ name: "MDN Web Docs", url: "https://developer.mozilla.org" }, { name: "W3Schools", url: "https://www.w3schools.com" }], role: "웹 표준 기초", theoryUrl: "https://ko.wikipedia.org/wiki/월드_와이드_웹" },
            { tools: [{ name: "TypeScript Docs", url: "https://www.typescriptlang.org/docs" }], role: "타입 시스템", theoryUrl: "https://ko.wikipedia.org/wiki/타입_시스템" },
            { tools: [{ name: "React Docs", url: "https://react.dev" }, { name: "Vue.js", url: "https://vuejs.org" }], role: "UI 라이브러리", theoryUrl: "https://ko.wikipedia.org/wiki/리액트_(자바스크립트_라이브러리)" },
            { tools: [{ name: "Tailwind CSS", url: "https://tailwindcss.com/docs" }, { name: "Bootstrap", url: "https://getbootstrap.com" }], role: "스타일링", theoryUrl: "https://ko.wikipedia.org/wiki/CSS" },
            { tools: [{ name: "Next.js Docs", url: "https://nextjs.org/docs" }, { name: "Remix", url: "https://remix.run" }], role: "풀스택 프레임워크", theoryUrl: "https://ko.wikipedia.org/wiki/웹_프레임워크" },
            { tools: [{ name: "CodePen", url: "https://codepen.io" }, { name: "StackBlitz", url: "https://stackblitz.com" }], role: "프로토타이핑", theoryUrl: "https://ko.wikipedia.org/wiki/소프트웨어_프로토타이핑" },
        ],
    },
    {
        id: "design-system",
        name: "디자인 시스템 구축 플로우",
        description: "색상 선정에서 에셋 관리까지, 일관된 디자인 언어를 만드는 과정",
        icon: "🎨",
        gradient: "from-pink-500 to-rose-500",
        nodes: [
            { tools: [{ name: "Behance", url: "https://www.behance.net" }], role: "트렌드 조사", theoryUrl: "https://ko.wikipedia.org/wiki/경향" },
            { tools: [{ name: "Coolors", url: "https://coolors.co" }, { name: "Adobe Color", url: "https://color.adobe.com" }], role: "색상 팔레트", theoryUrl: "https://ko.wikipedia.org/wiki/색_체계" },
            { tools: [{ name: "Google Fonts", url: "https://fonts.google.com" }], role: "타이포그래피", theoryUrl: "https://ko.wikipedia.org/wiki/타이포그래피" },
            { tools: [{ name: "Unsplash", url: "https://unsplash.com" }, { name: "Pexels", url: "https://www.pexels.com" }], role: "이미지 에셋", theoryUrl: "https://ko.wikipedia.org/wiki/사진술" },
            { tools: [{ name: "Figma", url: "https://www.figma.com" }], role: "컴포넌트 설계", theoryUrl: "https://ko.wikipedia.org/wiki/시스템_설계" },
        ],
    },
    {
        id: "devops-infra",
        name: "인프라 & DevOps 체인",
        description: "코드에서 프로덕션까지, 안정적인 서비스 운영 인프라",
        icon: "⚙️",
        gradient: "from-amber-500 to-orange-500",
        nodes: [
            { tools: [{ name: "GitHub Actions", url: "https://github.com/features/actions" }, { name: "Jenkins", url: "https://www.jenkins.io" }], role: "코드 & CI/CD", theoryUrl: "https://ko.wikipedia.org/wiki/지속적_통합" },
            { tools: [{ name: "Docker Hub", url: "https://hub.docker.com" }], role: "컨테이너 이미지", theoryUrl: "https://ko.wikipedia.org/wiki/OS_수준_가상화" },
            { tools: [{ name: "AWS", url: "https://aws.amazon.com" }, { name: "Azure", url: "https://azure.microsoft.com" }], role: "클라우드 컴퓨팅", theoryUrl: "https://ko.wikipedia.org/wiki/클라우드_컴퓨팅" },
            { tools: [{ name: "Google Cloud", url: "https://cloud.google.com" }], role: "데이터 & AI 인프라", theoryUrl: "https://ko.wikipedia.org/wiki/빅_데이터" },
            { tools: [{ name: "Supabase", url: "https://supabase.com" }, { name: "Firebase", url: "https://firebase.google.com" }], role: "BaaS / 데이터베이스", theoryUrl: "https://ko.wikipedia.org/wiki/서비스형_백엔드" },
            { tools: [{ name: "Cloudflare", url: "https://www.cloudflare.com" }], role: "엣지 네트워크", theoryUrl: "https://ko.wikipedia.org/wiki/에지_컴퓨팅" },
        ],
    },
    {
        id: "learning-growth",
        name: "학습 & 성장 사이클",
        description: "기초 학습에서 커뮤니티 기여까지, 개발자 성장의 순환 구조",
        icon: "📈",
        gradient: "from-purple-500 to-violet-500",
        nodes: [
            { tools: [{ name: "W3Schools", url: "https://www.w3schools.com" }, { name: "MDN", url: "https://developer.mozilla.org" }], role: "기초 학습", theoryUrl: "https://ko.wikipedia.org/wiki/평생_교육" },
            { tools: [{ name: "freeCodeCamp", url: "https://www.freecodecamp.org" }, { name: "LeetCode", url: "https://leetcode.com" }], role: "실습 코딩", theoryUrl: "https://ko.wikipedia.org/wiki/컴퓨터_프로그래밍" },
            { tools: [{ name: "Stack Overflow", url: "https://stackoverflow.com" }, { name: "Reddit", url: "https://www.reddit.com/r/programming" }], role: "문제 해결", theoryUrl: "https://ko.wikipedia.org/wiki/지식_공유" },
            { tools: [{ name: "VS Code Docs", url: "https://code.visualstudio.com/docs" }], role: "도구 숙련", theoryUrl: "https://ko.wikipedia.org/wiki/통합_개발_환경" },
            { tools: [{ name: "Dev.to", url: "https://dev.to" }, { name: "Medium", url: "https://medium.com" }], role: "지식 공유", theoryUrl: "https://ko.wikipedia.org/wiki/블로그" },
            { tools: [{ name: "Hacker News", url: "https://news.ycombinator.com" }], role: "트렌드 파악", theoryUrl: "https://ko.wikipedia.org/wiki/정보기술" },
            { tools: [{ name: "Product Hunt", url: "https://www.producthunt.com" }], role: "프로덕트 발굴", theoryUrl: "https://ko.wikipedia.org/wiki/혁신" },
        ],
    },
    {
        id: "art-history",
        name: "미술사조의 흐름",
        description: "르네상스에서 현대 미술까지, 시대를 관통하는 미적 변천사",
        icon: "🖼️",
        gradient: "from-rose-500 to-red-500",
        nodes: [
            { tools: [{ name: "위키백과", url: "https://ko.wikipedia.org/wiki/르네상스_미술" }, { name: "구글 아트 & 컬처", url: "https://artsandculture.google.com/entity/renaissance/m06f_6" }], role: "재생 & 휴머니즘", theoryUrl: "https://ko.wikipedia.org/wiki/인문주의" },
            { tools: [{ name: "위키백과", url: "https://ko.wikipedia.org/wiki/바로크" }], role: "역동성 & 감정", theoryUrl: "https://ko.wikipedia.org/wiki/감정" },
            { tools: [{ name: "위키백과", url: "https://ko.wikipedia.org/wiki/인상주의" }], role: "빛과 순간", theoryUrl: "https://ko.wikipedia.org/wiki/빛" },
            { tools: [{ name: "위키백과", url: "https://ko.wikipedia.org/wiki/입체파" }], role: "다시점 & 해체", theoryUrl: "https://ko.wikipedia.org/wiki/포스트모더니즘" },
            { tools: [{ name: "위키백과", url: "https://ko.wikipedia.org/wiki/초현실주의" }], role: "무의식 & 꿈", theoryUrl: "https://ko.wikipedia.org/wiki/무의식" },
            { tools: [{ name: "위키백과", url: "https://ko.wikipedia.org/wiki/팝_아트" }], role: "대중문화", theoryUrl: "https://ko.wikipedia.org/wiki/대중문화" },
            { tools: [{ name: "위키백과", url: "https://ko.wikipedia.org/wiki/현대_미술" }], role: "개념 & 융합", theoryUrl: "https://ko.wikipedia.org/wiki/개념_미술" },
        ],
    },
    {
        id: "semiconductor-process",
        name: "반도체 공정 흐름",
        description: "모래에서 마이크로칩까지, 반도체 제조의 8대 공정",
        icon: "💾",
        gradient: "from-blue-600 to-cyan-600",
        nodes: [
            { tools: [{ name: "삼성전자 반도체", url: "https://semiconductor.samsung.com/kr/" }, { name: "NVIDIA", url: "https://www.nvidia.com" }], role: "설계 & 기획", theoryUrl: "https://ko.wikipedia.org/wiki/시스템_온_칩" },
            { tools: [{ name: "ARM", url: "https://www.arm.com" }], role: "설계 최적화", theoryUrl: "https://ko.wikipedia.org/wiki/집적_회로_설계" },
            { tools: [{ name: "TSMC", url: "https://www.tsmc.com" }, { name: "SK하이닉스", url: "https://www.skhynix.com" }], role: "전공정 (8대 공정)", theoryUrl: "https://ko.wikipedia.org/wiki/반도체_제조" },
            { tools: [{ name: "삼성전자 기술센터", url: "https://www.samsung.com/sec/about-us/company-info/tech-center/" }], role: "수율 선별", theoryUrl: "https://ko.wikipedia.org/wiki/반도체_테스트" },
            { tools: [{ name: "Amkor", url: "https://www.amkor.com" }], role: "후공정 & 조립", theoryUrl: "https://ko.wikipedia.org/wiki/반도체_패키징" },
            { tools: [{ name: "DigiKey", url: "https://www.digikey.kr" }, { name: "Mouser", url: "https://www.mouser.kr" }], role: "유통", theoryUrl: "https://ko.wikipedia.org/wiki/공급망_관리" },
            { tools: [{ name: "Apple", url: "https://www.apple.com" }, { name: "Tesla", url: "https://www.tesla.com" }], role: "최종 탑재", theoryUrl: "https://ko.wikipedia.org/wiki/임베디드_시스템" },
        ],
    },
];
