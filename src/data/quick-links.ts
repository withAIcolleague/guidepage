export interface FlowNode {
    tools: { name: string; url: string }[]; // 관련 도구 또는 서비스 목록
    role: string; // 해당 플로우에서의 역할 설명
    theoryUrl?: string; // (Optional) 관련 이론 또는 개념 링크
    searchQuery?: string; // (Optional) 구글 검색 키워드
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
            { tools: [{ name: "Dribbble", url: "https://dribbble.com" }, { name: "Pinterest", url: "https://pinterest.com" }, { name: "Behance", url: "https://behance.net" }], role: "영감 수집", theoryUrl: "https://www.google.com/search?q=%EC%98%81%EA%B0%90%EC%88%98%EC%A7%91&num=10&newwindow=1&sca_esv=db43bf9cab898b26&biw=1646&bih=913&sxsrf=ANbL-n6I8H22D7oeF86i5GkNHOMhk1KfqQ%3A1771478048936&ei=IJyWafO1OOal2roP472awQs&ved=0ahUKEwjzxdX-5eSSAxXmklYBHeOeJrgQ4dUDCBM&uact=5&oq=%EC%98%81%EA%B0%90%EC%88%98%EC%A7%91&gs_lp=Egxnd3Mtd2l6LXNlcnAiDOyYgeqwkOyImOynkTIEEAAYHjIIEAAYgAQYogQyBRAAGO8FMgUQABjvBTIFEAAY7wUyBRAAGO8FMgYQABgFGB4yBhAAGAUYHjIGEAAYBRgeSM8lUL4IWPUecAp4AZABAZgBjwGgAcIQqgEEMC4xN7gBA8gBAPgBAZgCFKACngqoAgHCAgoQABiwAxjWBBhHwgIIEAAYgAQYsQPCAgUQABiABMICChAAGIAEGEMYigXCAgcQLhiABBgKwgINEC4YgAQY0QMYxwEYCsICERAuGIAEGLEDGNEDGIMBGMcBwgIEEAAYA8ICCxAAGIAEGLEDGIMBwgIFEC4YgATCAgsQLhiABBjHARivAcICFBAuGIAEGJcFGNwEGN4EGOAE2AEBwgIGELMBGIUEmAMD8QXzbyRZuyRnZogGAZAGCroGBggBEAEYFJIHBTEwLjEwoAfac7IHBDAuMTC4B_4JwgcGMC4xMS45yAc8gAgA&sclient=gws-wiz-serp", searchQuery: "디자인 영감 수집 방법" },
            { tools: [{ name: "Figma", url: "https://www.figma.com" }, { name: "Adobe XD", url: "https://www.adobe.com/products/xd.html" }], role: "UI/UX 디자인", theoryUrl: "https://ko.wikipedia.org/wiki/사용자_인터페이스_디자인", searchQuery: "UI UX 디자인 기초" },
            { tools: [{ name: "GitHub", url: "https://github.com" }, { name: "GitLab", url: "https://gitlab.com" }], role: "소스 관리", theoryUrl: "https://ko.wikipedia.org/wiki/버전_관리", searchQuery: "Git 협업 워크플로우" },
            { tools: [{ name: "npm", url: "https://www.npmjs.com" }, { name: "Yarn", url: "https://yarnpkg.com" }], role: "패키지 관리", theoryUrl: "https://ko.wikipedia.org/wiki/패키지_관리자", searchQuery: "모던 자바스크립트 패키지 관리" },
            { tools: [{ name: "Docker Hub", url: "https://hub.docker.com" }], role: "컨테이너화", theoryUrl: "https://ko.wikipedia.org/wiki/OS_수준_가상화", searchQuery: "도커 컨테이너 라이프사이클" },
            { tools: [{ name: "Vercel", url: "https://vercel.com" }, { name: "Netlify", url: "https://www.netlify.com" }], role: "배포", theoryUrl: "https://ko.wikipedia.org/wiki/소프트웨어_배포", searchQuery: "CI CD 자동 배포 가이드" },
            { tools: [{ name: "Cloudflare", url: "https://www.cloudflare.com" }], role: "CDN / 보안", theoryUrl: "https://ko.wikipedia.org/wiki/콘텐츠_전송_네트워크", searchQuery: "웹 서비스 보안 및 성능 최적화" },
        ],
    },
    {
        id: "ai-workflow",
        name: "AI / ML 워크플로우",
        description: "데이터 탐색에서 모델 서빙까지, AI 프로젝트의 생명 주기",
        icon: "🧠",
        gradient: "from-cyan-500 to-blue-500",
        nodes: [
            { tools: [{ name: "Papers with Code", url: "https://paperswithcode.com" }, { name: "ArXiv", url: "https://arxiv.org" }], role: "논문 리서치", theoryUrl: "https://ko.wikipedia.org/wiki/인공지능", searchQuery: "최신 AI 논문 트렌드" },
            { tools: [{ name: "Kaggle", url: "https://www.kaggle.com" }, { name: "Colab", url: "https://colab.research.google.com" }], role: "데이터 & 실험", theoryUrl: "https://ko.wikipedia.org/wiki/데이터_사이언스", searchQuery: "데이터 전처리 및 EDA 방법" },
            { tools: [{ name: "Google AI Studio", url: "https://aistudio.google.com" }], role: "모델 프로토타입", theoryUrl: "https://ko.wikipedia.org/wiki/기계_학습", searchQuery: "LLM 프롬프트 엔지니어링" },
            { tools: [{ name: "Hugging Face", url: "https://huggingface.co" }], role: "모델 허브", theoryUrl: "https://ko.wikipedia.org/wiki/자연어_처리", searchQuery: "오픈소스 AI 모델 활용법" },
            { tools: [{ name: "ChatGPT", url: "https://chat.openai.com" }, { name: "Claude", url: "https://claude.ai" }, { name: "Gemini", url: "https://gemini.google.com" }], role: "AI 어시스턴트", theoryUrl: "https://ko.wikipedia.org/wiki/거대_언어_모델", searchQuery: "생성형 AI 서비스 비교" },
            { tools: [{ name: "Replicate", url: "https://replicate.com" }], role: "모델 서빙", theoryUrl: "https://ko.wikipedia.org/wiki/클라우드_컴퓨팅", searchQuery: "AI 모델 API 배포" },
        ],
    },
    {
        id: "frontend-stack",
        name: "프론트엔드 개발 스택",
        description: "웹 기초부터 프레임워크까지, 프론트엔드 기술의 레이어 구성",
        icon: "🏗️",
        gradient: "from-emerald-500 to-teal-500",
        nodes: [
            { tools: [{ name: "MDN Web Docs", url: "https://developer.mozilla.org" }, { name: "W3Schools", url: "https://www.w3schools.com" }], role: "웹 표준 기초", theoryUrl: "https://ko.wikipedia.org/wiki/월드_와이드_웹", searchQuery: "HTML5 CSS3 웹 표준 가이드" },
            { tools: [{ name: "TypeScript Docs", url: "https://www.typescriptlang.org/docs" }], role: "타입 시스템", theoryUrl: "https://ko.wikipedia.org/wiki/타입_시스템", searchQuery: "타입스크립트 고급 문법" },
            { tools: [{ name: "React Docs", url: "https://react.dev" }, { name: "Vue.js", url: "https://vuejs.org" }], role: "UI 라이브러리", theoryUrl: "https://velog.io/@bdd14club/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-1.-UI-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC", searchQuery: "리액트 상태 관리 패턴" },
            { tools: [{ name: "Tailwind CSS", url: "https://tailwindcss.com/docs" }, { name: "Bootstrap", url: "https://getbootstrap.com" }], role: "스타일링", theoryUrl: "https://gh-coding.tistory.com/6", searchQuery: "테일윈드 CSS 컴포넌트 디자인" },
            { tools: [{ name: "Next.js Docs", url: "https://nextjs.org/docs" }, { name: "Remix", url: "https://remix.run" }], role: "풀스택 프레임워크", theoryUrl: "https://wikidocs.net/197516", searchQuery: "Next.js 14 서버 컴포넌트" },
            { tools: [{ name: "CodePen", url: "https://codepen.io" }, { name: "StackBlitz", url: "https://stackblitz.com" }], role: "프로토타이핑", theoryUrl: "https://www.samsungsds.com/kr/insights/1233420_4627.html", searchQuery: "온라인 코드 에디터 활용" },
        ],
    },
    {
        id: "design-system",
        name: "디자인 시스템 구축 플로우",
        description: "색상 선정에서 에셋 관리까지, 일관된 디자인 언어를 만드는 과정",
        icon: "🎨",
        gradient: "from-pink-500 to-rose-500",
        nodes: [
            { tools: [{ name: "Behance", url: "https://www.behance.net" }], role: "트렌드 조사", theoryUrl: "https://ko.wikipedia.org/wiki/경향", searchQuery: "디자인 트렌드 2024" },
            { tools: [{ name: "Coolors", url: "https://coolors.co" }, { name: "Adobe Color", url: "https://color.adobe.com" }], role: "색상 팔레트", theoryUrl: "https://ko.wikipedia.org/wiki/색_체계", searchQuery: "UI 색상 조합 사이트" },
            { tools: [{ name: "Google Fonts", url: "https://fonts.google.com" }], role: "타이포그래피", theoryUrl: "https://ko.wikipedia.org/wiki/타이포그래피", searchQuery: "한글 구글 폰트 추천" },
            { tools: [{ name: "Unsplash", url: "https://unsplash.com" }, { name: "Pexels", url: "https://www.pexels.com" }], role: "이미지 에셋", theoryUrl: "https://ko.wikipedia.org/wiki/사진술", searchQuery: "무료 고화질 이미지 사이트" },
            { tools: [{ name: "Figma", url: "https://www.figma.com" }], role: "컴포넌트 설계", theoryUrl: "https://ko.wikipedia.org/wiki/시스템_설계", searchQuery: "피그마 디자인 시스템 가이드" },
        ],
    },
    {
        id: "devops-infra",
        name: "인프라 & DevOps 체인",
        description: "코드에서 프로덕션까지, 안정적인 서비스 운영 인프라",
        icon: "⚙️",
        gradient: "from-amber-500 to-orange-500",
        nodes: [
            { tools: [{ name: "GitHub Actions", url: "https://github.com/features/actions" }, { name: "Jenkins", url: "https://www.jenkins.io" }], role: "코드 & CI/CD", theoryUrl: "https://ko.wikipedia.org/wiki/지속적_통합", searchQuery: "GitHub Actions 자동화 템플릿" },
            { tools: [{ name: "Docker Hub", url: "https://hub.docker.com" }], role: "컨테이너 이미지", theoryUrl: "https://ko.wikipedia.org/wiki/OS_수준_가상화", searchQuery: "도커 이미지 최적화 전략" },
            { tools: [{ name: "AWS", url: "https://aws.amazon.com" }, { name: "Azure", url: "https://azure.microsoft.com" }], role: "클라우드 컴퓨팅", theoryUrl: "https://ko.wikipedia.org/wiki/클라우드_컴퓨팅", searchQuery: "클라우드 인프라 아키텍처" },
            { tools: [{ name: "Google Cloud", url: "https://cloud.google.com" }], role: "데이터 & AI 인프라", theoryUrl: "https://ko.wikipedia.org/wiki/빅_데이터", searchQuery: "빅데이터 파이프라인 구축" },
            { tools: [{ name: "Supabase", url: "https://supabase.com" }, { name: "Firebase", url: "https://firebase.google.com" }], role: "BaaS / 데이터베이스", theoryUrl: "https://ko.wikipedia.org/wiki/서비스형_백엔드", searchQuery: "실시간 데이터베이스 서비스" },
            { tools: [{ name: "Cloudflare", url: "https://www.cloudflare.com" }], role: "엣지 네트워크", theoryUrl: "https://ko.wikipedia.org/wiki/에지_컴퓨팅", searchQuery: "CDN 및 엣지 컴퓨팅 트렌드" },
        ],
    },
    {
        id: "learning-growth",
        name: "학습 & 성장 사이클",
        description: "기초 학습에서 커뮤니티 기여까지, 개발자 성장의 순환 구조",
        icon: "📈",
        gradient: "from-purple-500 to-violet-500",
        nodes: [
            { tools: [{ name: "W3Schools", url: "https://www.w3schools.com" }, { name: "MDN", url: "https://developer.mozilla.org" }], role: "기초 학습", theoryUrl: "https://ko.wikipedia.org/wiki/평생_교육", searchQuery: "독학 개발자 커리큘럼" },
            { tools: [{ name: "freeCodeCamp", url: "https://www.freecodecamp.org" }, { name: "LeetCode", url: "https://leetcode.com" }], role: "실습 코딩", theoryUrl: "https://ko.wikipedia.org/wiki/컴퓨터_프로그래밍", searchQuery: "코딩 테스트 알고리즘 기초" },
            { tools: [{ name: "Stack Overflow", url: "https://stackoverflow.com" }, { name: "Reddit", url: "https://www.reddit.com/r/programming" }], role: "문제 해결", theoryUrl: "https://ko.wikipedia.org/wiki/지식_공유", searchQuery: "효율적인 구글링 검색 팁" },
            { tools: [{ name: "VS Code Docs", url: "https://code.visualstudio.com/docs" }], role: "도구 숙련", theoryUrl: "https://ko.wikipedia.org/wiki/통합_개발_환경", searchQuery: "생산성 높여주는 VS Code 익스텐션" },
            { tools: [{ name: "Dev.to", url: "https://dev.to" }, { name: "Medium", url: "https://medium.com" }], role: "지식 공유", theoryUrl: "https://ko.wikipedia.org/wiki/블로그", searchQuery: "기술 블로그 시작하기" },
            { tools: [{ name: "Hacker News", url: "https://news.ycombinator.com" }], role: "트렌드 파악", theoryUrl: "https://ko.wikipedia.org/wiki/정보기술", searchQuery: "해커뉴스 실시간 인기 키워드" },
            { tools: [{ name: "Product Hunt", url: "https://www.producthunt.com" }], role: "프로덕트 발굴", theoryUrl: "https://ko.wikipedia.org/wiki/혁신", searchQuery: "글로벌 신규 프로덕트 런칭" },
        ],
    },
    {
        id: "art-history",
        name: "미술사조의 흐름",
        description: "르네상스에서 현대/동시대까지, 양식과 관점이 바뀌는 핵심 변곡점 체인",
        icon: "🖼️",
        gradient: "from-rose-500 to-red-500",
        nodes: [
            {
                tools: [
                    { name: "위키백과(고딕 미술)", url: "https://ko.wikipedia.org/wiki/고딕_미술" },
                    { name: "The Met - Heilbrunn Timeline", url: "https://www.metmuseum.org/toah/" }
                ],
                role: "중세/고딕: 상징 & 신앙 중심",
                theoryUrl: "https://ko.wikipedia.org/wiki/상징주의",
                searchQuery: "고딕 미술 특징 스테인드글라스 제단화"
            },
            {
                tools: [
                    { name: "위키백과(르네상스 미술)", url: "https://ko.wikipedia.org/wiki/르네상스_미술" },
                    { name: "구글 아트 & 컬처(르네상스)", url: "https://artsandculture.google.com/entity/renaissance/m06f_6" }
                ],
                role: "르네상스: 원근법 & 인체 비례, 휴머니즘",
                theoryUrl: "https://ko.wikipedia.org/wiki/인문주의",
                searchQuery: "르네상스 원근법 레오나르도 미켈란젤로 라파엘로"
            },
            {
                tools: [
                    { name: "위키백과(매너리즘)", url: "https://ko.wikipedia.org/wiki/매너리즘" },
                    { name: "브리태니커(매너리즘)", url: "https://www.britannica.com/art/Mannerism" }
                ],
                role: "매너리즘: 과장된 비례 & 불안정한 균형",
                theoryUrl: "https://ko.wikipedia.org/wiki/양식주의",
                searchQuery: "매너리즘 특징 엘 그레코 폰토르모"
            },
            {
                tools: [
                    { name: "위키백과(바로크)", url: "https://ko.wikipedia.org/wiki/바로크" },
                    { name: "위키백과(카라바조)", url: "https://ko.wikipedia.org/wiki/카라바조" }
                ],
                role: "바로크: 극적 명암 & 역동성, 감정의 연출",
                theoryUrl: "https://ko.wikipedia.org/wiki/테네브리즘",
                searchQuery: "바로크 미술 카라바조 렘브란트 베르니니 특징"
            },
            {
                tools: [
                    { name: "위키백과(로코코)", url: "https://ko.wikipedia.org/wiki/로코코" },
                    { name: "위키백과(프라고나르)", url: "https://ko.wikipedia.org/wiki/장오노레_프라고나르" }
                ],
                role: "로코코: 우아함 & 장식성, 귀족 취향",
                theoryUrl: "https://ko.wikipedia.org/wiki/장식예술",
                searchQuery: "로코코 미술 특징 와토 부셰 프라고나르"
            },
            {
                tools: [
                    { name: "위키백과(신고전주의)", url: "https://ko.wikipedia.org/wiki/신고전주의" },
                    { name: "위키백과(다비드)", url: "https://ko.wikipedia.org/wiki/자크루이_다비드" }
                ],
                role: "신고전주의: 이성 & 질서, 고대의 재소환",
                theoryUrl: "https://ko.wikipedia.org/wiki/고전주의",
                searchQuery: "신고전주의 미술 프랑스혁명 다비드 앵그르"
            },
            {
                tools: [
                    { name: "위키백과(낭만주의)", url: "https://ko.wikipedia.org/wiki/낭만주의" },
                    { name: "위키백과(들라크루아)", url: "https://ko.wikipedia.org/wiki/외젠_들라크루아" }
                ],
                role: "낭만주의: 숭고 & 감정, 자연/혁명/개인의 드라마",
                theoryUrl: "https://ko.wikipedia.org/wiki/숭고",
                searchQuery: "낭만주의 미술 제리코 들라크루아 터너 프리드리히"
            },
            {
                tools: [
                    { name: "위키백과(사실주의)", url: "https://ko.wikipedia.org/wiki/사실주의" },
                    { name: "위키백과(쿠르베)", url: "https://ko.wikipedia.org/wiki/귀스타브_쿠르베" }
                ],
                role: "사실주의: 현실 묘사 & 사회의 시선",
                theoryUrl: "https://ko.wikipedia.org/wiki/자연주의",
                searchQuery: "사실주의 미술 쿠르베 밀레 도미에 특징"
            },
            {
                tools: [
                    { name: "위키백과(인상주의)", url: "https://ko.wikipedia.org/wiki/인상주의" },
                    { name: "구글 아트 & 컬처(모네)", url: "https://artsandculture.google.com/entity/claude-monet/m03q5t" }
                ],
                role: "인상주의: 빛 & 순간, 야외 제작과 색채 분할",
                theoryUrl: "https://ko.wikipedia.org/wiki/색채",
                searchQuery: "인상주의 모네 르누아르 드가 특징 빛"
            },
            {
                tools: [
                    { name: "위키백과(후기인상주의)", url: "https://ko.wikipedia.org/wiki/후기인상주의" },
                    { name: "위키백과(세잔)", url: "https://ko.wikipedia.org/wiki/폴_세잔" }
                ],
                role: "후기인상주의: 구조(세잔)·상징(고갱)·표현(반 고흐)",
                theoryUrl: "https://ko.wikipedia.org/wiki/형식주의",
                searchQuery: "후기인상주의 세잔 고갱 반고흐 차이"
            },
            {
                tools: [
                    { name: "위키백과(야수파)", url: "https://ko.wikipedia.org/wiki/야수파" },
                    { name: "위키백과(표현주의)", url: "https://ko.wikipedia.org/wiki/표현주의" }
                ],
                role: "야수파/표현주의: 강렬한 색 & 내면의 왜곡",
                theoryUrl: "https://ko.wikipedia.org/wiki/표현",
                searchQuery: "야수파 마티스 표현주의 뭉크 키르히너"
            },
            {
                tools: [
                    { name: "위키백과(입체파)", url: "https://ko.wikipedia.org/wiki/입체파" },
                    { name: "위키백과(피카소)", url: "https://ko.wikipedia.org/wiki/파블로_피카소" }
                ],
                role: "입체파: 다시점 & 형태 해체, 분석/종합",
                theoryUrl: "https://ko.wikipedia.org/wiki/추상",
                searchQuery: "입체파 분석적 입체주의 종합적 입체주의 브라크"
            },
            {
                tools: [
                    { name: "위키백과(미래주의)", url: "https://ko.wikipedia.org/wiki/미래주의" },
                    { name: "위키백과(다다이즘)", url: "https://ko.wikipedia.org/wiki/다다이즘" }
                ],
                role: "미래주의/다다: 속도·기계 vs 반예술·충격",
                theoryUrl: "https://ko.wikipedia.org/wiki/아방가르드",
                searchQuery: "미래주의 보초니 다다 마르셀 뒤샹 레디메이드"
            },
            {
                tools: [
                    { name: "위키백과(초현실주의)", url: "https://ko.wikipedia.org/wiki/초현실주의" },
                    { name: "위키백과(프로이트)", url: "https://ko.wikipedia.org/wiki/지그문트_프로이트" }
                ],
                role: "초현실주의: 무의식 & 꿈, 자동기술/상징적 이미지",
                theoryUrl: "https://ko.wikipedia.org/wiki/무의식",
                searchQuery: "초현실주의 달리 마그리트 미로 자동기술"
            },
            {
                tools: [
                    { name: "위키백과(추상표현주의)", url: "https://ko.wikipedia.org/wiki/추상표현주의" },
                    { name: "위키백과(잭슨 폴록)", url: "https://ko.wikipedia.org/wiki/잭슨_폴록" }
                ],
                role: "추상표현주의: 행위(액션) & 거대한 캔버스, 전후 미국",
                theoryUrl: "https://ko.wikipedia.org/wiki/표현주의",
                searchQuery: "추상표현주의 폴록 로스코 드 쿠닝 특징"
            },
            {
                tools: [
                    { name: "위키백과(팝_아트)", url: "https://ko.wikipedia.org/wiki/팝_아트" },
                    { name: "위키백과(앤디 워홀)", url: "https://ko.wikipedia.org/wiki/앤디_워홀" }
                ],
                role: "팝아트: 대중문화 & 소비 이미지의 예술화",
                theoryUrl: "https://ko.wikipedia.org/wiki/대중문화",
                searchQuery: "팝아트 워홀 리히텐슈타인 실크스크린"
            },
            {
                tools: [
                    { name: "위키백과(미니멀리즘)", url: "https://ko.wikipedia.org/wiki/미니멀리즘" },
                    { name: "위키백과(개념미술)", url: "https://ko.wikipedia.org/wiki/개념_미술" }
                ],
                role: "미니멀/개념미술: 물성 최소화 & 아이디어가 작품",
                theoryUrl: "https://ko.wikipedia.org/wiki/개념",
                searchQuery: "미니멀리즘 도널드 저드 개념미술 코수스"
            },
            {
                tools: [
                    { name: "위키백과(포스트모더니즘)", url: "https://ko.wikipedia.org/wiki/포스트모더니즘" },
                    { name: "Tate(Contemporary art)", url: "https://www.tate.org.uk/art/art-terms/c/contemporary-art" }
                ],
                role: "포스트모던/동시대: 혼성 & 인용, 매체 융합(설치·영상·AI)",
                theoryUrl: "https://ko.wikipedia.org/wiki/포스트모더니즘",
                searchQuery: "동시대미술 설치미술 영상미술 NFT AI아트 트렌드"
            }
        ],
    },
    {
        id: "startup-build",
        name: "스타트업 구축 플로우",
        description: "아이디어 발굴에서 MVP, 배포, 고객 확보까지 이어지는 스타트업 실행 흐름",
        icon: "🏁",
        gradient: "from-sky-500 to-blue-600",
        nodes: [
            {
                tools: [
                    { name: "YC Library", url: "https://www.ycombinator.com/library" },
                    { name: "Paul Graham Essays", url: "https://paulgraham.com/articles.html" }
                ],
                role: "문제 발견 / 아이디어 정의",
                theoryUrl: "https://ko.wikipedia.org/wiki/문제_해결",
                searchQuery: "스타트업 문제 발견 방법 고객의 불편 찾기"
            },
            {
                tools: [
                    { name: "Google Trends", url: "https://trends.google.com" },
                    { name: "Reddit", url: "https://www.reddit.com" },
                    { name: "Product Hunt", url: "https://www.producthunt.com" }
                ],
                role: "시장 탐색 / 수요 검증",
                theoryUrl: "https://ko.wikipedia.org/wiki/시장_조사",
                searchQuery: "스타트업 시장 검증 MVP 전 고객 인터뷰"
            },
            {
                tools: [
                    { name: "Typeform", url: "https://www.typeform.com" },
                    { name: "Google Forms", url: "https://forms.google.com" }
                ],
                role: "고객 인터뷰 / 문제 검증",
                theoryUrl: "https://ko.wikipedia.org/wiki/사용자_조사",
                searchQuery: "고객 인터뷰 질문지 스타트업 problem interview"
            },
            {
                tools: [
                    { name: "Notion", url: "https://www.notion.so" },
                    { name: "Whimsical", url: "https://whimsical.com" },
                    { name: "Miro", url: "https://miro.com" }
                ],
                role: "서비스 구조 설계 / 가설 정리",
                theoryUrl: "https://ko.wikipedia.org/wiki/사업_모형",
                searchQuery: "린 캔버스 작성법 서비스 기획 구조도"
            },
            {
                tools: [
                    { name: "Figma", url: "https://www.figma.com" },
                    { name: "Framer", url: "https://www.framer.com" }
                ],
                role: "와이어프레임 / UX 설계",
                theoryUrl: "https://ko.wikipedia.org/wiki/사용자_경험_디자인",
                searchQuery: "MVP 와이어프레임 UX 설계 방법"
            },
            {
                tools: [
                    { name: "Next.js", url: "https://nextjs.org" },
                    { name: "Supabase", url: "https://supabase.com" },
                    { name: "Firebase", url: "https://firebase.google.com" }
                ],
                role: "MVP 개발",
                theoryUrl: "https://ko.wikipedia.org/wiki/최소_기능_제품",
                searchQuery: "MVP 빠르게 만들기 nextjs supabase"
            },
            {
                tools: [
                    { name: "GitHub", url: "https://github.com" },
                    { name: "Vercel", url: "https://vercel.com" }
                ],
                role: "배포 / 초기 운영",
                theoryUrl: "https://ko.wikipedia.org/wiki/소프트웨어_배포",
                searchQuery: "웹 서비스 배포 운영 체크리스트"
            },
            {
                tools: [
                    { name: "Google Analytics", url: "https://analytics.google.com" },
                    { name: "PostHog", url: "https://posthog.com" }
                ],
                role: "사용자 행동 분석",
                theoryUrl: "https://ko.wikipedia.org/wiki/웹_분석",
                searchQuery: "스타트업 사용자 행동 분석 핵심 지표"
            },
            {
                tools: [
                    { name: "Mailchimp", url: "https://mailchimp.com" },
                    { name: "Beehiiv", url: "https://www.beehiiv.com" },
                    { name: "Buffer", url: "https://buffer.com" }
                ],
                role: "초기 마케팅 / 고객 확보",
                theoryUrl: "https://ko.wikipedia.org/wiki/디지털_마케팅",
                searchQuery: "초기 스타트업 고객 확보 방법"
            },
            {
                tools: [
                    { name: "Stripe", url: "https://stripe.com" },
                    { name: "Toss Payments", url: "https://www.tosspayments.com" }
                ],
                role: "수익화 / 결제",
                theoryUrl: "https://ko.wikipedia.org/wiki/수익_모델",
                searchQuery: "SaaS 수익화 결제 모델 설계"
            }
        ]
    },
    {
        id: "web-service-development",
        name: "웹 서비스 개발 플로우",
        description: "기획부터 프론트엔드, 백엔드, 배포까지 웹 서비스를 구축하는 전체 흐름",
        icon: "🌐",
        gradient: "from-emerald-500 to-green-600",
        nodes: [
            {
                tools: [
                    { name: "Notion", url: "https://www.notion.so" },
                    { name: "Whimsical", url: "https://whimsical.com" }
                ],
                role: "서비스 기획 / 요구사항 정의",
                theoryUrl: "https://ko.wikipedia.org/wiki/요구사항_분석",
                searchQuery: "웹 서비스 기획 방법 PRD 작성법"
            },
            {
                tools: [
                    { name: "Figma", url: "https://www.figma.com" },
                    { name: "Framer", url: "https://www.framer.com" }
                ],
                role: "UI/UX 디자인",
                theoryUrl: "https://ko.wikipedia.org/wiki/사용자_경험_디자인",
                searchQuery: "웹 UX 디자인 원칙 와이어프레임 제작"
            },
            {
                tools: [
                    { name: "React", url: "https://react.dev" },
                    { name: "Next.js", url: "https://nextjs.org" }
                ],
                role: "프론트엔드 개발",
                theoryUrl: "https://ko.wikipedia.org/wiki/프론트엔드와_백엔드",
                searchQuery: "React Next.js 구조 이해 컴포넌트 설계"
            },
            {
                tools: [
                    { name: "Node.js", url: "https://nodejs.org" },
                    { name: "Express", url: "https://expressjs.com" },
                    { name: "Supabase", url: "https://supabase.com" }
                ],
                role: "백엔드 개발 / API 구축",
                theoryUrl: "https://ko.wikipedia.org/wiki/웹_API",
                searchQuery: "REST API 설계 방법 백엔드 구조"
            },
            {
                tools: [
                    { name: "PostgreSQL", url: "https://www.postgresql.org" },
                    { name: "MongoDB", url: "https://www.mongodb.com" }
                ],
                role: "데이터베이스 설계",
                theoryUrl: "https://ko.wikipedia.org/wiki/데이터베이스",
                searchQuery: "DB 설계 ERD 관계형 vs NoSQL 차이"
            },
            {
                tools: [
                    { name: "GitHub", url: "https://github.com" }
                ],
                role: "버전 관리 / 협업",
                theoryUrl: "https://ko.wikipedia.org/wiki/버전_관리",
                searchQuery: "Git 브랜치 전략 협업 workflow"
            },
            {
                tools: [
                    { name: "Docker", url: "https://www.docker.com" }
                ],
                role: "컨테이너화 / 실행 환경 통일",
                theoryUrl: "https://ko.wikipedia.org/wiki/컨테이너화",
                searchQuery: "Docker 기본 개념 사용법"
            },
            {
                tools: [
                    { name: "Vercel", url: "https://vercel.com" },
                    { name: "Netlify", url: "https://www.netlify.com" }
                ],
                role: "배포 (프론트엔드)",
                theoryUrl: "https://ko.wikipedia.org/wiki/소프트웨어_배포",
                searchQuery: "Next.js 배포 방법 vercel 설정"
            },
            {
                tools: [
                    { name: "AWS", url: "https://aws.amazon.com" },
                    { name: "Render", url: "https://render.com" }
                ],
                role: "서버 / 백엔드 배포",
                theoryUrl: "https://ko.wikipedia.org/wiki/클라우드_컴퓨팅",
                searchQuery: "웹 서버 배포 AWS vs Render 비교"
            },
            {
                tools: [
                    { name: "Cloudflare", url: "https://www.cloudflare.com" }
                ],
                role: "보안 / CDN / 성능 최적화",
                theoryUrl: "https://ko.wikipedia.org/wiki/콘텐츠_전송_네트워크",
                searchQuery: "CDN 역할 웹 성능 최적화 방법"
            }
        ]
    },
    {
        id: "ai-service-build",
        name: "AI 서비스 제작 플로우",
        description: "문제 정의부터 모델 선택, 프롬프트 설계, 앱 구현, 배포까지 AI 서비스를 만드는 전체 흐름",
        icon: "🤖",
        gradient: "from-cyan-500 to-sky-600",
        nodes: [
            {
                tools: [
                    { name: "Notion", url: "https://www.notion.so" },
                    { name: "Whimsical", url: "https://whimsical.com" }
                ],
                role: "문제 정의 / AI 적용 가능성 검토",
                theoryUrl: "https://ko.wikipedia.org/wiki/인공지능",
                searchQuery: "AI 서비스 기획 문제 정의 자동화 적합성 판단"
            },
            {
                tools: [
                    { name: "OpenAI", url: "https://platform.openai.com" },
                    { name: "Anthropic", url: "https://www.anthropic.com" },
                    { name: "Google AI Studio", url: "https://aistudio.google.com" }
                ],
                role: "모델 탐색 / API 선택",
                theoryUrl: "https://ko.wikipedia.org/wiki/거대_언어_모델",
                searchQuery: "LLM API 비교 OpenAI Claude Gemini"
            },
            {
                tools: [
                    { name: "Hugging Face", url: "https://huggingface.co" },
                    { name: "Papers with Code", url: "https://paperswithcode.com" }
                ],
                role: "오픈소스 모델 / 사례 조사",
                theoryUrl: "https://ko.wikipedia.org/wiki/기계_학습",
                searchQuery: "오픈소스 LLM 활용 사례 허깅페이스 모델 찾기"
            },
            {
                tools: [
                    { name: "OpenAI Playground", url: "https://platform.openai.com/playground" },
                    { name: "Anthropic Console", url: "https://console.anthropic.com" }
                ],
                role: "프롬프트 실험 / 출력 품질 검증",
                theoryUrl: "https://ko.wikipedia.org/wiki/프롬프트_엔지니어링",
                searchQuery: "프롬프트 엔지니어링 기초 시스템 프롬프트 예시"
            },
            {
                tools: [
                    { name: "LangChain", url: "https://www.langchain.com" },
                    { name: "LlamaIndex", url: "https://www.llamaindex.ai" }
                ],
                role: "RAG / 체인 / 에이전트 구조 설계",
                theoryUrl: "https://en.wikipedia.org/wiki/Retrieval-augmented_generation",
                searchQuery: "RAG 구조 설계 LangChain LlamaIndex 차이"
            },
            {
                tools: [
                    { name: "Pinecone", url: "https://www.pinecone.io" },
                    { name: "Weaviate", url: "https://weaviate.io" },
                    { name: "Supabase", url: "https://supabase.com" }
                ],
                role: "지식베이스 / 벡터DB 구축",
                theoryUrl: "https://ko.wikipedia.org/wiki/벡터_공간_모형",
                searchQuery: "벡터 데이터베이스 임베딩 검색 RAG 구축"
            },
            {
                tools: [
                    { name: "Next.js", url: "https://nextjs.org" },
                    { name: "Vercel AI SDK", url: "https://sdk.vercel.ai" },
                    { name: "React", url: "https://react.dev" }
                ],
                role: "AI 앱 프론트엔드 구현",
                theoryUrl: "https://ko.wikipedia.org/wiki/웹_애플리케이션",
                searchQuery: "AI 챗봇 UI 구현 Next.js Vercel AI SDK"
            },
            {
                tools: [
                    { name: "FastAPI", url: "https://fastapi.tiangolo.com" },
                    { name: "Node.js", url: "https://nodejs.org" }
                ],
                role: "백엔드 / 모델 호출 로직 구현",
                theoryUrl: "https://ko.wikipedia.org/wiki/응용_프로그래밍_인터페이스",
                searchQuery: "LLM API 백엔드 구성 FastAPI Node.js"
            },
            {
                tools: [
                    { name: "Helicone", url: "https://www.helicone.ai" },
                    { name: "Langfuse", url: "https://langfuse.com" }
                ],
                role: "로그 / 비용 / 응답 품질 모니터링",
                theoryUrl: "https://ko.wikipedia.org/wiki/모니터링",
                searchQuery: "LLM observability logging tracing cost monitoring"
            },
            {
                tools: [
                    { name: "Vercel", url: "https://vercel.com" },
                    { name: "Render", url: "https://render.com" },
                    { name: "Cloudflare", url: "https://www.cloudflare.com" }
                ],
                role: "배포 / 운영 / 성능 최적화",
                theoryUrl: "https://ko.wikipedia.org/wiki/클라우드_컴퓨팅",
                searchQuery: "AI 서비스 배포 운영 최적화 서버리스"
            }
        ]
    },
    {
        id: "investment-analysis",
        name: "투자 분석 플로우",
        description: "거시 환경 점검부터 산업, 기업, 차트, 리스크 관리까지 이어지는 투자 판단 흐름",
        icon: "📊",
        gradient: "from-amber-500 to-yellow-600",
        nodes: [
            {
                tools: [
                    { name: "Trading Economics", url: "https://tradingeconomics.com" },
                    { name: "FRED", url: "https://fred.stlouisfed.org" },
                    { name: "Investing.com", url: "https://www.investing.com" }
                ],
                role: "거시경제 환경 점검",
                theoryUrl: "https://ko.wikipedia.org/wiki/거시경제학",
                searchQuery: "금리 물가 고용 경기침체 투자 판단 방법"
            },
            {
                tools: [
                    { name: "Finviz", url: "https://finviz.com" },
                    { name: "MarketWatch", url: "https://www.marketwatch.com" },
                    { name: "Seeking Alpha", url: "https://seekingalpha.com" }
                ],
                role: "산업 / 섹터 흐름 분석",
                theoryUrl: "https://ko.wikipedia.org/wiki/산업_분석",
                searchQuery: "섹터 로테이션 산업 사이클 투자 분석"
            },
            {
                tools: [
                    { name: "Yahoo Finance", url: "https://finance.yahoo.com" },
                    { name: "Macrotrends", url: "https://www.macrotrends.net" },
                    { name: "CompaniesMarketCap", url: "https://companiesmarketcap.com" }
                ],
                role: "기업 개요 / 실적 / 밸류에이션 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/기본적_분석",
                searchQuery: "PER PSR PEG ROE 매출성장률 기업 분석 방법"
            },
            {
                tools: [
                    { name: "SEC EDGAR", url: "https://www.sec.gov/edgar/searchedgar/companysearch" },
                    { name: "DART", url: "https://dart.fss.or.kr" }
                ],
                role: "공시 / 원문 자료 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/기업공시",
                searchQuery: "10-K 10-Q 사업보고서 읽는 법"
            },
            {
                tools: [
                    { name: "TradingView", url: "https://www.tradingview.com" },
                    { name: "Investing.com Charts", url: "https://www.investing.com/charts/" }
                ],
                role: "차트 / 추세 / 거래량 분석",
                theoryUrl: "https://ko.wikipedia.org/wiki/기술적_분석",
                searchQuery: "이동평균선 거래량 RSI 추세 분석 방법"
            },
            {
                tools: [
                    { name: "OptionStrat", url: "https://optionstrat.com" },
                    { name: "CBOE", url: "https://www.cboe.com" }
                ],
                role: "옵션 / 변동성 / 시장 심리 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/옵션_(금융)",
                searchQuery: "VIX 옵션 시장 심리 변동성 해석"
            },
            {
                tools: [
                    { name: "Portfolio Visualizer", url: "https://www.portfoliovisualizer.com" },
                    { name: "Koyfin", url: "https://www.koyfin.com" }
                ],
                role: "포트폴리오 구성 / 시나리오 점검",
                theoryUrl: "https://ko.wikipedia.org/wiki/포트폴리오_이론",
                searchQuery: "포트폴리오 분산투자 리스크 관리 방법"
            },
            {
                tools: [
                    { name: "Google Sheets", url: "https://sheets.google.com" },
                    { name: "Microsoft Excel", url: "https://www.microsoft.com/microsoft-365/excel" }
                ],
                role: "투자 기록 / 매매 복기 / 데이터 정리",
                theoryUrl: "https://ko.wikipedia.org/wiki/의사결정",
                searchQuery: "투자일지 매매복기 엑셀 템플릿"
            },
            {
                tools: [
                    { name: "Benzinga", url: "https://www.benzinga.com" },
                    { name: "Reuters", url: "https://www.reuters.com" },
                    { name: "Bloomberg", url: "https://www.bloomberg.com" }
                ],
                role: "뉴스 / 이벤트 / 실시간 변수 점검",
                theoryUrl: "https://ko.wikipedia.org/wiki/정보",
                searchQuery: "실적발표 FOMC CPI 뉴스가 주가에 미치는 영향"
            },
            {
                tools: [
                    { name: "TradingView Watchlist", url: "https://www.tradingview.com" },
                    { name: "Finviz Screener", url: "https://finviz.com/screener.ashx" }
                ],
                role: "후보 종목 선별 / 모니터링",
                theoryUrl: "https://ko.wikipedia.org/wiki/스크리닝",
                searchQuery: "주식 스크리너 조건 설정 성장주 추세주 찾기"
            }
        ]
    },
    {
        id: "content-creation",
        name: "콘텐츠 제작 플로우",
        description: "아이디어 발굴부터 제작, 업로드, 성장까지 이어지는 콘텐츠 제작 흐름",
        icon: "🎥",
        gradient: "from-pink-500 to-rose-500",
        nodes: [
            {
                tools: [
                    { name: "YouTube Trending", url: "https://www.youtube.com/feed/trending" },
                    { name: "Google Trends", url: "https://trends.google.com" }
                ],
                role: "주제 선정 / 트렌드 분석",
                theoryUrl: "https://ko.wikipedia.org/wiki/콘텐츠",
                searchQuery: "유튜브 주제 선정 방법 조회수 잘 나오는 콘텐츠"
            },
            {
                tools: [
                    { name: "Notion", url: "https://www.notion.so" },
                    { name: "ChatGPT", url: "https://chat.openai.com" }
                ],
                role: "콘텐츠 기획 / 스크립트 작성",
                theoryUrl: "https://ko.wikipedia.org/wiki/기획",
                searchQuery: "유튜브 대본 작성 구조 스토리텔링 방법"
            },
            {
                tools: [
                    { name: "Canva", url: "https://www.canva.com" },
                    { name: "Figma", url: "https://www.figma.com" }
                ],
                role: "썸네일 / 비주얼 제작",
                theoryUrl: "https://ko.wikipedia.org/wiki/시각_디자인",
                searchQuery: "썸네일 클릭률 높이는 디자인 방법"
            },
            {
                tools: [
                    { name: "CapCut", url: "https://www.capcut.com" },
                    { name: "Premiere Pro", url: "https://www.adobe.com/products/premiere.html" }
                ],
                role: "영상 편집",
                theoryUrl: "https://ko.wikipedia.org/wiki/영상_편집",
                searchQuery: "유튜브 영상 편집 기본 컷편집 자막 넣기"
            },
            {
                tools: [
                    { name: "YouTube Studio", url: "https://studio.youtube.com" }
                ],
                role: "업로드 / SEO 최적화",
                theoryUrl: "https://ko.wikipedia.org/wiki/검색_엔진_최적화",
                searchQuery: "유튜브 SEO 제목 태그 설명 작성 방법"
            },
            {
                tools: [
                    { name: "TubeBuddy", url: "https://www.tubebuddy.com" },
                    { name: "VidIQ", url: "https://vidiq.com" }
                ],
                role: "조회수 / 키워드 분석",
                theoryUrl: "https://ko.wikipedia.org/wiki/데이터_분석",
                searchQuery: "유튜브 키워드 분석 툴 사용법"
            },
            {
                tools: [
                    { name: "Instagram", url: "https://www.instagram.com" },
                    { name: "TikTok", url: "https://www.tiktok.com" }
                ],
                role: "콘텐츠 확산 / 채널 성장",
                theoryUrl: "https://ko.wikipedia.org/wiki/소셜_미디어",
                searchQuery: "쇼츠 릴스 틱톡 알고리즘 성장 전략"
            },
            {
                tools: [
                    { name: "AdSense", url: "https://www.google.com/adsense" },
                    { name: "Patreon", url: "https://www.patreon.com" }
                ],
                role: "수익화",
                theoryUrl: "https://ko.wikipedia.org/wiki/수익_모델",
                searchQuery: "유튜브 수익화 조건 애드센스 수익 구조"
            }
        ]
    },
    {
        id: "semiconductor-process",
        name: "반도체 공정 흐름",
        description: "모래(실리콘)에서 마이크로칩까지, 설계→제조→패키징→테스트→양산 운영 체인",
        icon: "💾",
        gradient: "from-blue-600 to-cyan-600",
        nodes: [
            {
                tools: [
                    { name: "Synopsys", url: "https://www.synopsys.com" },
                    { name: "Cadence", url: "https://www.cadence.com" },
                    { name: "Siemens EDA", url: "https://eda.sw.siemens.com" }
                ],
                role: "시스템/칩 설계(Architecture → RTL → Verification)",
                theoryUrl: "https://ko.wikipedia.org/wiki/집적_회로_설계",
                searchQuery: "반도체 설계 RTL 검증 흐름 Synopsys Cadence"
            },
            {
                tools: [
                    { name: "ARM", url: "https://www.arm.com" },
                    { name: "RISC-V International", url: "https://riscv.org" }
                ],
                role: "IP/마이크로아키텍처 & 성능·전력·면적(PPA) 최적화",
                theoryUrl: "https://ko.wikipedia.org/wiki/시스템_온_칩",
                searchQuery: "PPA 최적화 low power design UPF 기법"
            },
            {
                tools: [
                    { name: "TSMC", url: "https://www.tsmc.com" },
                    { name: "Samsung Foundry", url: "https://semiconductor.samsung.com/foundry/" },
                    { name: "Intel Foundry", url: "https://www.intel.com/content/www/us/en/foundry/overview.html" }
                ],
                role: "테이프아웃 & 파운드리 제조 준비(DFM/PDK/Mask)",
                theoryUrl: "https://ko.wikipedia.org/wiki/포토마스크",
                searchQuery: "테이프아웃 DFM PDK 마스크 셋 구성"
            },
            {
                tools: [
                    { name: "SUMCO", url: "https://www.sumcosi.com" },
                    { name: "Shin-Etsu", url: "https://www.shinetsu.co.jp/e/" }
                ],
                role: "웨이퍼/재료(실리콘 웨이퍼, 포토레지스트, 가스/케미칼)",
                theoryUrl: "https://ko.wikipedia.org/wiki/실리콘",
                searchQuery: "실리콘 웨이퍼 제조 공정 CZ FZ 차이 포토레지스트"
            },
            {
                tools: [
                    { name: "ASML", url: "https://www.asml.com" },
                    { name: "Nikon Precision", url: "https://www.nikon.com" }
                ],
                role: "리소그래피(노광) & 패터닝(EUV/DUV, 레지스트, 현상)",
                theoryUrl: "https://ko.wikipedia.org/wiki/포토리소그래피",
                searchQuery: "EUV 리소그래피 원리 레지스트 LER overlay"
            },
            {
                tools: [
                    { name: "Applied Materials", url: "https://www.appliedmaterials.com" },
                    { name: "Tokyo Electron", url: "https://www.tel.com" }
                ],
                role: "증착/산화(CVD/PVD/ALD)로 박막 형성",
                theoryUrl: "https://ko.wikipedia.org/wiki/화학_기상_증착",
                searchQuery: "ALD CVD PVD 차이 박막 균일도"
            },
            {
                tools: [
                    { name: "Lam Research", url: "https://www.lamresearch.com" },
                    { name: "Tokyo Electron", url: "https://www.tel.com" }
                ],
                role: "식각(Etch) & 패턴 전사(건식/습식, 선택비/손상 관리)",
                theoryUrl: "https://ko.wikipedia.org/wiki/식각",
                searchQuery: "반도체 건식식각 플라즈마 선택비 프로파일 제어"
            },
            {
                tools: [
                    { name: "Axcelis", url: "https://www.axcelis.com" },
                    { name: "Applied Materials", url: "https://www.appliedmaterials.com" }
                ],
                role: "도핑/이온주입(Implant) & 열처리(Anneal)로 전기적 특성 형성",
                theoryUrl: "https://ko.wikipedia.org/wiki/도핑_(반도체)",
                searchQuery: "이온주입 anneal 활성화 junction depth 제어"
            },
            {
                tools: [
                    { name: "Applied Materials", url: "https://www.appliedmaterials.com" },
                    { name: "Ebara", url: "https://www.ebara.com" }
                ],
                role: "평탄화(CMP) & 세정(Clean)으로 층간 정밀도 확보",
                theoryUrl: "https://ko.wikipedia.org/wiki/화학기계연마",
                searchQuery: "CMP 공정 슬러리 결함 스크래치 세정"
            },
            {
                tools: [
                    { name: "KLA", url: "https://www.kla.com" },
                    { name: "Hitachi High-Tech", url: "https://www.hitachi-hightech.com" }
                ],
                role: "계측/검사(Metrology/Inspection) & 결함 분석(수율의 핵심 레버)",
                theoryUrl: "https://ko.wikipedia.org/wiki/통계적_공정_관리",
                searchQuery: "반도체 결함 검사 metrology SPC yield management"
            },
            {
                tools: [
                    { name: "Teradyne", url: "https://www.teradyne.com" },
                    { name: "Advantest", url: "https://www.advantest.com" }
                ],
                role: "웨이퍼 테스트(Probe) & 선별(Binning) — 양품/불량 구분",
                theoryUrl: "https://ko.wikipedia.org/wiki/반도체_테스트",
                searchQuery: "웨이퍼 프로빙 테스트 binning parametric test"
            },
            {
                tools: [
                    { name: "ASE", url: "https://www.aseglobal.com" },
                    { name: "Amkor", url: "https://www.amkor.com" },
                    { name: "JCET", url: "https://www.jcetglobal.com" }
                ],
                role: "패키징(후공정): 와이어본딩/플립칩/2.5D·3D, 열/신호/전력 통합",
                theoryUrl: "https://ko.wikipedia.org/wiki/반도체_패키징",
                searchQuery: "첨단 패키징 2.5D 3D chiplet CoWoS FOWLP"
            },
            {
                tools: [
                    { name: "Teradyne", url: "https://www.teradyne.com" },
                    { name: "Advantest", url: "https://www.advantest.com" }
                ],
                role: "패키지 테스트(FT) & 신뢰성 평가(열/전기/수명) — 출하 품질 보증",
                theoryUrl: "https://ko.wikipedia.org/wiki/신뢰성_공학",
                searchQuery: "반도체 신뢰성 시험 HTOL HAST 온도사이클"
            },
            {
                tools: [
                    { name: "Arrow Electronics", url: "https://www.arrow.com" },
                    { name: "Avnet", url: "https://www.avnet.com" },
                    { name: "DigiKey", url: "https://www.digikey.kr" }
                ],
                role: "유통/공급망(부품 채널, 리드타임, 대체품, EOL 관리)",
                theoryUrl: "https://ko.wikipedia.org/wiki/공급망_관리",
                searchQuery: "전자부품 리드타임 EOL 대체품 소싱 전략"
            },
            {
                tools: [
                    { name: "Apple", url: "https://www.apple.com" },
                    { name: "Tesla", url: "https://www.tesla.com" },
                    { name: "NVIDIA", url: "https://www.nvidia.com" }
                ],
                role: "최종 제품 탑재(서버/모바일/자동차) & 현장 품질(리콜/리비전 관리)",
                theoryUrl: "https://ko.wikipedia.org/wiki/임베디드_시스템",
                searchQuery: "자동차 반도체 품질 표준 AEC-Q100 적용 사례"
            }
        ],
    },
    {
        id: "music-history-chain",
        name: "음악사조 체인",
        description: "서양 음악의 시대별 사조와 스타일의 진화",
        icon: "🎼",
        gradient: "from-indigo-500 to-purple-500",
        nodes: [
            {
                tools: [
                    { name: "Gregorian Chant", url: "https://en.wikipedia.org/wiki/Gregorian_chant" },
                    { name: "Organum", url: "https://en.wikipedia.org/wiki/Organum" }
                ],
                role: "중세 음악 (Medieval, ~1400)",
                theoryUrl: "https://ko.wikipedia.org/wiki/중세_음악",
                searchQuery: "중세 음악 특징 그레고리오 성가"
            },
            {
                tools: [
                    { name: "Palestrina", url: "https://en.wikipedia.org/wiki/Giovanni_Pierluigi_da_Palestrina" },
                    { name: "Madrigal", url: "https://en.wikipedia.org/wiki/Madrigal" }
                ],
                role: "르네상스 음악 (Renaissance, 1400~1600)",
                theoryUrl: "https://ko.wikipedia.org/wiki/르네상스_음악",
                searchQuery: "르네상스 음악 다성음악 특징"
            },
            {
                tools: [
                    { name: "Bach", url: "https://en.wikipedia.org/wiki/Johann_Sebastian_Bach" },
                    { name: "Vivaldi", url: "https://en.wikipedia.org/wiki/Antonio_Vivaldi" }
                ],
                role: "바로크 음악 (Baroque, 1600~1750)",
                theoryUrl: "https://ko.wikipedia.org/wiki/바로크_음악",
                searchQuery: "바로크 음악 특징 대위법"
            },
            {
                tools: [
                    { name: "Mozart", url: "https://en.wikipedia.org/wiki/Wolfgang_Amadeus_Mozart" },
                    { name: "Haydn", url: "https://en.wikipedia.org/wiki/Joseph_Haydn" }
                ],
                role: "고전주의 음악 (Classical, 1750~1820)",
                theoryUrl: "https://ko.wikipedia.org/wiki/고전주의_음악",
                searchQuery: "고전주의 음악 특징 소나타 형식"
            },
            {
                tools: [
                    { name: "Beethoven", url: "https://en.wikipedia.org/wiki/Ludwig_van_Beethoven" },
                    { name: "Chopin", url: "https://en.wikipedia.org/wiki/Frédéric_Chopin" }
                ],
                role: "낭만주의 음악 (Romantic, 1820~1900)",
                theoryUrl: "https://ko.wikipedia.org/wiki/낭만주의_음악",
                searchQuery: "낭만주의 음악 특징 감정 표현"
            },
            {
                tools: [
                    { name: "Debussy", url: "https://en.wikipedia.org/wiki/Claude_Debussy" },
                    { name: "Ravel", url: "https://en.wikipedia.org/wiki/Maurice_Ravel" }
                ],
                role: "인상주의 음악 (Impressionism, 1890~1920)",
                theoryUrl: "https://ko.wikipedia.org/wiki/인상주의_음악",
                searchQuery: "인상주의 음악 특징 드뷔시"
            },
            {
                tools: [
                    { name: "Stravinsky", url: "https://en.wikipedia.org/wiki/Igor_Stravinsky" },
                    { name: "Schoenberg", url: "https://en.wikipedia.org/wiki/Arnold_Schoenberg" }
                ],
                role: "현대 음악 (Modern, 1900~1975)",
                theoryUrl: "https://ko.wikipedia.org/wiki/현대_음악",
                searchQuery: "현대 음악 무조음악 특징"
            },
            {
                tools: [
                    { name: "Minimalism", url: "https://en.wikipedia.org/wiki/Minimal_music" },
                    { name: "Electronic Music", url: "https://en.wikipedia.org/wiki/Electronic_music" }
                ],
                role: "현대 이후 음악 (Postmodern / Contemporary, 1975~현재)",
                theoryUrl: "https://ko.wikipedia.org/wiki/현대_음악",
                searchQuery: "미니멀 음악 전자 음악 특징"
            }
        ],
    }

];
