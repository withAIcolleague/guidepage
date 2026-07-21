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
        name: "지식 학습 & 성장 사이클",
        description: "기초 평생 교육부터 전문 학술 논문 탐구와 지식 집필까지 이어지는 인지 성장 흐름",
        icon: "📈",
        gradient: "from-purple-500 to-violet-500",
        nodes: [
            { tools: [{ name: "늘배움 평생학습포털", url: "https://www.lifelongedu.go.kr" }, { name: "K-MOOC", url: "http://www.kmooc.kr" }], role: "기초 평생교육 강좌 수강", theoryUrl: "https://ko.wikipedia.org/wiki/평생_교육", searchQuery: "평생 교육 국가 지원 프로그램 수강 방법" },
            { tools: [{ name: "에듀넷 티-클리어", url: "https://www.edunet.net" }, { name: "방송통신대학교", url: "https://www.knou.ac.kr" }], role: "교과 지식 실습 및 전공 강의", theoryUrl: "https://ko.wikipedia.org/wiki/교과목", searchQuery: "초중고 교육과정 지도안 자료실" },
            { tools: [{ name: "DBpia", url: "https://www.dbpia.co.kr" }, { name: "KISS 학술데이터베이스", url: "http://kiss.kstudy.com" }], role: "전문 자료 및 학술지 탐구", theoryUrl: "https://ko.wikipedia.org/wiki/학술지", searchQuery: "국내 학술지 연구 논문 검색" },
            { tools: [{ name: "국립중앙도서관", url: "https://www.nl.go.kr" }], role: "학술 아카이브 및 원문 열람", theoryUrl: "https://ko.wikipedia.org/wiki/도서관", searchQuery: "국립중앙도서관 학위논문 대출 신청" },
            { tools: [{ name: "브런치스토리", url: "https://brunch.co.kr" }, { name: "티스토리", url: "https://www.tistory.com" }], role: "자체 지식 집필 및 블로깅", theoryUrl: "https://ko.wikipedia.org/wiki/블로그", searchQuery: "브런치스토리 작가 신청 합격 팁" },
            { tools: [{ name: "네이버 뉴스", url: "https://news.naver.com" }, { name: "트렌드코리아", url: "https://www.trendkorea.com" }], role: "대중 지식 트렌드 분석", theoryUrl: "https://ko.wikipedia.org/wiki/정보기술", searchQuery: "소비 트렌드 분석 기법" },
            { tools: [{ name: "온-나라 정책연구 PRISM", url: "https://www.prism.go.kr" }], role: "공공 연구 데이터 분석 기여", theoryUrl: "https://ko.wikipedia.org/wiki/혁신", searchQuery: "공공 정책 과제 보고서 검색" },
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
                theoryUrl: "https://ko.wikipedia.org/wiki/동시대_미술",
                searchQuery: "동시대미술 설치미술 영상미술 NFT AI아트 트렌드"
            }
        ],
    },
    {
        id: "startup-build",
        name: "스타트업 창업 & 실행 흐름",
        description: "비즈니스 아이디어 정의부터 정부 지원사업 신청, 제품 출시, 크라우드 펀딩 및 결제 연동까지의 흐름",
        icon: "🏁",
        gradient: "from-sky-500 to-blue-600",
        nodes: [
            {
                tools: [
                    { name: "K-Startup 창업지원포털", url: "https://www.k-startup.go.kr" },
                    { name: "기업마당", url: "https://www.bizinfo.go.kr" }
                ],
                role: "창업 아이디어 기획 및 정책자금 검토",
                theoryUrl: "https://ko.wikipedia.org/wiki/문제_해결",
                searchQuery: "정부 지원 스타트업 예비창업패키지 지원 자격"
            },
            {
                tools: [
                    { name: "네이버 데이터랩", url: "https://datalab.naver.com" },
                    { name: "Google Trends", url: "https://trends.google.com" }
                ],
                role: "시장 수요 조사 및 검색 트렌드 검증",
                theoryUrl: "https://ko.wikipedia.org/wiki/시장_조사",
                searchQuery: "네이버 데이터랩 검색어 트렌드 분석"
            },
            {
                tools: [
                    { name: "네이버 오피스 폼", url: "https://office.naver.com" },
                    { name: "구글 설문지", url: "https://forms.google.com" }
                ],
                role: "고객 인터뷰 및 니즈 수집",
                theoryUrl: "https://ko.wikipedia.org/wiki/사용자_조사",
                searchQuery: "고객 설문조사 문항 설계 기법"
            },
            {
                tools: [
                    { name: "네이버 스마트스토어", url: "https://sell.smartstore.naver.com" },
                    { name: "아임웹", url: "https://imweb.me" }
                ],
                role: "초기 비즈니스 캔버스 정리 및 랜딩 페이지 설계",
                theoryUrl: "https://ko.wikipedia.org/wiki/사업_모형",
                searchQuery: "노코드 쇼핑몰 아임웹 활용 구축"
            },
            {
                tools: [
                    { name: "와디즈 크라우드펀딩", url: "https://www.wadiz.kr" },
                    { name: "텀블벅", url: "https://tumblbug.com" }
                ],
                role: "크라우드 펀딩을 통한 초기 투자/수요 확보",
                theoryUrl: "https://ko.wikipedia.org/wiki/사용자_경험_디자인",
                searchQuery: "크라우드 펀딩 성공 상세페이지 디자인 가이드"
            },
            {
                tools: [
                    { name: "카페24 빌더", url: "https://www.cafe24.com" },
                    { name: "식스샵", url: "https://www.sixshop.com" }
                ],
                role: "비즈니스 MVP(최소 기능 판매처) 구축",
                theoryUrl: "https://ko.wikipedia.org/wiki/최소_기능_제품",
                searchQuery: "쇼핑몰 빌더를 통한 무코드 MVP 구현"
            },
            {
                tools: [
                    { name: "네이버 비즈니스스쿨", url: "https://bizschool.naver.com" }
                ],
                role: "초기 운영 및 스토어 개설 완료",
                theoryUrl: "https://ko.wikipedia.org/wiki/소프트웨어_배포",
                searchQuery: "스마트스토어 개설 행정절차 통신판매업"
            },
            {
                tools: [
                    { name: "에이스카운터", url: "https://www.acecounter.com" },
                    { name: "구글 애널리틱스", url: "https://analytics.google.com" }
                ],
                role: "국내 유입 채널 및 고객 행동 데이터 수집",
                theoryUrl: "https://ko.wikipedia.org/wiki/웹_분석",
                searchQuery: "에이스카운터 전환 스크립트 설치"
            },
            {
                tools: [
                    { name: "카카오 비즈니스", url: "https://business.kakao.com" },
                    { name: "네이버 광고", url: "https://searchad.naver.com" }
                ],
                role: "마케팅 메시지 유포 및 홍보 채널 활성화",
                theoryUrl: "https://ko.wikipedia.org/wiki/디지털_마케팅",
                searchQuery: "카카오 채널 광고 집행 마케팅 가이드"
            },
            {
                tools: [
                    { name: "토스페이먼츠", url: "https://www.tosspayments.com" },
                    { name: "나이스페이", url: "https://www.nicepay.co.kr" }
                ],
                role: "결제 게이트웨이(PG) 연동 및 정산 프로세스 수립",
                theoryUrl: "https://ko.wikipedia.org/wiki/수익_모델",
                searchQuery: "온라인 쇼핑몰 PG사 가입 정산 심사"
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
        name: "가치 투자 & 경제 분석 플로우",
        description: "거시 환경 점검부터 기업 가치 공시, 국내외 자산 차트 및 포트폴리오 자산 배분까지의 흐름",
        icon: "📊",
        gradient: "from-amber-500 to-yellow-600",
        nodes: [
            {
                tools: [
                    { name: "한국은행 경제통계시스템 ECOS", url: "https://ecos.bok.or.kr" },
                    { name: "FRED 미국 연준 통계", url: "https://fred.stlouisfed.org" }
                ],
                role: "거시경제 환경 점검 및 지표 수집",
                theoryUrl: "https://ko.wikipedia.org/wiki/거시경제학",
                searchQuery: "한국은행 통화량 금리 추이 ECOS 검색 방법"
            },
            {
                tools: [
                    { name: "한경컨센서스", url: "http://consensus.hankyung.com" },
                    { name: "에프앤가이드", url: "https://www.fnguide.com" }
                ],
                role: "산업 리서치 보고서 및 증권사 전망 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/산업_분석",
                searchQuery: "증권사 산업 리포트 무료 열람 방법 한경컨센서스"
            },
            {
                tools: [
                    { name: "네이버 증권", url: "https://finance.naver.com" },
                    { name: "컴퍼니가이드 FnGuide", url: "http://comp.fnguide.com" }
                ],
                role: "기업 개요 및 재무 비율 분석",
                theoryUrl: "https://ko.wikipedia.org/wiki/기본적_분석",
                searchQuery: "기업 PER PBR 배당수익률 분석 방법 네이버금융"
            },
            {
                tools: [
                    { name: "금융감독원 전자공시시스템 DART", url: "https://dart.fss.or.kr" },
                    { name: "SEC EDGAR", url: "https://www.sec.gov/edgar/searchedgar/companysearch" }
                ],
                role: "분기·사업보고서 공시 원문 정독",
                theoryUrl: "https://ko.wikipedia.org/wiki/기업공시",
                searchQuery: "DART 분기보고서 주석 재무제표 읽는 법"
            },
            {
                tools: [
                    { name: "인베스팅닷컴 코리아", url: "https://kr.investing.com" },
                    { name: "트레이딩뷰", url: "https://kr.tradingview.com" }
                ],
                role: "주가 및 원자재 차트 추세 검정",
                theoryUrl: "https://ko.wikipedia.org/wiki/기술적_분석",
                searchQuery: "이동평균선 지지선 저항선 그리는 법 트레이딩뷰"
            },
            {
                tools: [
                    { name: "팍스넷", url: "http://www.paxnet.co.kr" },
                    { name: "두나무 증권플러스", url: "https://stockplus.com" }
                ],
                role: "시장 심리 및 실시간 종목 뉴스 추적",
                theoryUrl: "https://ko.wikipedia.org/wiki/옵션_(금융)",
                searchQuery: "실시간 테마주 검색 주식 찌라시 공포 탐욕 지수"
            },
            {
                tools: [
                    { name: "포트폴리오 비주얼라이저", url: "https://www.portfoliovisualizer.com" }
                ],
                role: "정밀 백테스팅 및 자산배분 상관성 평가",
                theoryUrl: "https://ko.wikipedia.org/wiki/포트폴리오_이론",
                searchQuery: "정적 자산배분 상관계수 올웨더 포트폴리오 백테스팅"
            },
            {
                tools: [
                    { name: "구글 스프레드시트", url: "https://sheets.google.com" }
                ],
                role: "본인 매매 기록 및 가계부 작성",
                theoryUrl: "https://ko.wikipedia.org/wiki/의사결정",
                searchQuery: "구글 시트 GOOGLEFINANCE 함수 활용 주식 관리"
            },
            {
                tools: [
                    { name: "연합인포맥스", url: "https://news.einfomax.co.kr" },
                    { name: "블룸버그 코리아", url: "https://www.bloomberg.co.kr" }
                ],
                role: "실시간 거시경제 이벤트 속보 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/정보",
                searchQuery: "연합인포맥스 경제지표 실시간 캘린더 활용"
            },
            {
                tools: [
                    { name: "종목 스크리너 (네이버)", url: "https://finance.naver.com/sise/sise_market_sum.naver" }
                ],
                role: "스크리닝 기준을 만족하는 종목 선별",
                theoryUrl: "https://ko.wikipedia.org/wiki/스크리닝",
                searchQuery: "네이버증권 조건검색식 설정 가치주 발굴"
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
    },
    {
        id: "decision-analysis",
        name: "개인 의사결정 분석 플로우",
        description: "문제 정의부터 편향 점검, 근거 수집, 선택안 비교까지 개인 의사결정을 구조화하는 흐름",
        icon: "🧭",
        gradient: "from-sky-500 to-cyan-500",
        nodes: [
            {
                tools: [
                    { name: "Notion", url: "https://www.notion.so" },
                    { name: "Miro", url: "https://miro.com" }
                ],
                role: "의사결정 문제와 선택지 정의",
                theoryUrl: "https://ko.wikipedia.org/wiki/의사결정",
                searchQuery: "의사결정 문제 정의 선택지 구조화 방법"
            },
            {
                tools: [
                    { name: "Google Scholar", url: "https://scholar.google.com" },
                    { name: "Semantic Scholar", url: "https://www.semanticscholar.org" }
                ],
                role: "관련 연구와 판단 기준 탐색",
                theoryUrl: "https://ko.wikipedia.org/wiki/문헌고찰",
                searchQuery: "의사결정 연구 문헌고찰 판단 기준"
            },
            {
                tools: [
                    { name: "Pew Research Center", url: "https://www.pewresearch.org" },
                    { name: "Our World in Data", url: "https://ourworldindata.org" }
                ],
                role: "사회적 맥락과 근거 데이터 수집",
                theoryUrl: "https://ko.wikipedia.org/wiki/사회과학",
                searchQuery: "사회과학 데이터 근거 기반 의사결정"
            },
            {
                tools: [
                    { name: "Google Forms", url: "https://forms.google.com" },
                    { name: "Typeform", url: "https://www.typeform.com" }
                ],
                role: "피드백과 선호 데이터 수집",
                theoryUrl: "https://ko.wikipedia.org/wiki/설문조사",
                searchQuery: "설문조사 선호도 조사 의사결정"
            },
            {
                tools: [
                    { name: "The Decision Lab", url: "https://thedecisionlab.com" },
                    { name: "Noba Project", url: "https://nobaproject.com" }
                ],
                role: "인지 편향과 행동 요인 점검",
                theoryUrl: "https://ko.wikipedia.org/wiki/인지_편향",
                searchQuery: "인지 편향 행동경제학 의사결정 오류"
            },
            {
                tools: [
                    { name: "Datawrapper", url: "https://www.datawrapper.de" },
                    { name: "Flourish", url: "https://flourish.studio" }
                ],
                role: "선택안 비교와 판단 결과 시각화",
                theoryUrl: "https://ko.wikipedia.org/wiki/데이터_시각화",
                searchQuery: "의사결정 매트릭스 대안 비교 시각화"
            }
        ],
    },
    {
        id: "community-issue-analysis",
        name: "지역사회 이슈 분석 플로우",
        description: "지역 문제를 정의하고 통계, 이해관계자, 제도 쟁점을 연결해 실행 메모로 정리하는 흐름",
        icon: "🏘️",
        gradient: "from-teal-500 to-sky-500",
        nodes: [
            {
                tools: [
                    { name: "Notion", url: "https://www.notion.so" },
                    { name: "Miro", url: "https://miro.com" }
                ],
                role: "문제 범위와 지역 단위 정의",
                theoryUrl: "https://ko.wikipedia.org/wiki/지역사회",
                searchQuery: "지역사회 문제 정의 지역 단위 설정 방법"
            },
            {
                tools: [
                    { name: "KOSIS 국가통계포털", url: "https://kosis.kr" },
                    { name: "공공데이터포털", url: "https://www.data.go.kr" }
                ],
                role: "인구·지역 통계와 기초 지표 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/인구통계학",
                searchQuery: "지역 인구 통계 생활 지표 분석"
            },
            {
                tools: [
                    { name: "Kumu", url: "https://kumu.io" },
                    { name: "Miro", url: "https://miro.com" }
                ],
                role: "이해관계자와 영향 범위 지도화",
                theoryUrl: "https://en.wikipedia.org/wiki/Stakeholder_analysis",
                searchQuery: "이해관계자 분석 영향 범위 지도화"
            },
            {
                tools: [
                    { name: "Google Scholar", url: "https://scholar.google.com" },
                    { name: "OECD iLibrary", url: "https://www.oecd-ilibrary.org" }
                ],
                role: "유사 지역 사례와 연구 근거 탐색",
                theoryUrl: "https://ko.wikipedia.org/wiki/사례_연구",
                searchQuery: "지역사회 문제 해결 사례 연구"
            },
            {
                tools: [
                    { name: "국가법령정보센터", url: "https://www.law.go.kr" },
                    { name: "자치법규정보시스템", url: "https://www.elis.go.kr" }
                ],
                role: "정책·제도 쟁점과 담당 기관 정리",
                theoryUrl: "https://ko.wikipedia.org/wiki/공공정책",
                searchQuery: "지역 정책 제도 쟁점 담당 기관 분석"
            },
            {
                tools: [
                    { name: "Google Docs", url: "https://docs.google.com" },
                    { name: "Notion", url: "https://www.notion.so" }
                ],
                role: "실행 메모와 후속 질문 작성",
                theoryUrl: "https://en.wikipedia.org/wiki/Policy_brief",
                searchQuery: "정책 브리프 실행 메모 작성 방법"
            }
        ],
    },
    {
        id: "public-opinion-media-analysis",
        name: "여론 & 언론 보도 분석 플로우",
        description: "국내 언론 기사 수집부터 검색 관심도 추이, 뉴스 빅데이터 프레임, 위험 요인 리포트까지의 미디어 반응 및 여론 분석 흐름",
        icon: "🗞️",
        gradient: "from-cyan-500 to-blue-500",
        nodes: [
            {
                tools: [
                    { name: "네이버 트렌드", url: "https://datalab.naver.com" },
                    { name: "Google Trends", url: "https://trends.google.com" }
                ],
                role: "이슈 키워드의 실시간 여론 검색 관심도 파악",
                theoryUrl: "https://ko.wikipedia.org/wiki/여론",
                searchQuery: "네이버 데이터랩 통합검색어 관심도 추이 비교"
            },
            {
                tools: [
                    { name: "빅카인즈 Big Kinds (한국언론진흥재단)", url: "https://www.bigkinds.or.kr" }
                ],
                role: "주요 일간지 뉴스 보도량 추이 및 보도 흐름 수집",
                theoryUrl: "https://ko.wikipedia.org/wiki/뉴스",
                searchQuery: "빅카인즈 뉴스 검색어 관계도 시각화 방법"
            },
            {
                tools: [
                    { name: "언론진흥재단 미디어연구", url: "https://www.kpf.or.kr" }
                ],
                role: "한국인의 미디어 수용자 행태 조사 보고서 탐색",
                theoryUrl: "https://ko.wikipedia.org/wiki/공론장",
                searchQuery: "언론수용자 조사 통계 미디어 이용률 KPF"
            },
            {
                tools: [
                    { name: "한국갤럽 여론조사", url: "https://www.gallup.co.kr" },
                    { name: "리얼미터", url: "https://www.realmeter.net" }
                ],
                role: "국민 여론조사 정기 지표 분석",
                theoryUrl: "https://ko.wikipedia.org/wiki/프레이밍",
                searchQuery: "한국갤럽 정기 주간 여론조사 결과 확인"
            },
            {
                tools: [
                    { name: "네이버 데이터랩 쇼핑 인사이트", url: "https://datalab.naver.com/shoppingInsight/skeyword.naver" }
                ],
                role: "소비자 선호 카테고리별 실시간 관심도 시각화",
                theoryUrl: "https://ko.wikipedia.org/wiki/시계열",
                searchQuery: "쇼핑인사이트 기기별 성별 선호 키워드 분석"
            },
            {
                tools: [
                    { name: "문화체육관광부 보도자료", url: "https://www.mcst.go.kr" }
                ],
                role: "정부 공식 언론 해명 보도자료 분석",
                theoryUrl: "https://ko.wikipedia.org/wiki/위험_커뮤니케이션",
                searchQuery: "문체부 보도자료 미디어 프레임 팩트체크"
            }
        ],
    },
    {
        id: "climate-environment-data",
        name: "기후·환경 데이터 분석 플로우",
        description: "기상청 관측 원시 자료 수집부터 국가 과학 기술 통합망 검색, 기후 변화 모델 시각화까지의 자연과학 데이터 탐구 흐름",
        icon: "🌦️",
        gradient: "from-emerald-500 to-cyan-500",
        nodes: [
            {
                tools: [
                    { name: "기상자료개방포털 (기상청)", url: "https://data.kma.go.kr" },
                    { name: "국가기후데이터센터", url: "https://sts.kma.go.kr" }
                ],
                role: "기상청 기온, 강수량 등 과거 시계열 데이터 수집",
                theoryUrl: "https://ko.wikipedia.org/wiki/원격탐사",
                searchQuery: "기상자료개방포털 기온 관측 데이터 csv 다운로드"
            },
            {
                tools: [
                    { name: "국가과학기술지식정보서비스 NTIS", url: "https://www.ntis.go.kr" },
                    { name: "ScienceON", url: "https://scienceon.kisti.re.kr" }
                ],
                role: "기후 변화 대응 및 탄소 중립 관련 국가 과제물 검색",
                theoryUrl: "https://ko.wikipedia.org/wiki/기후변화",
                searchQuery: "NTIS 기후변화 연구 보고서 과제 정보"
            },
            {
                tools: [
                    { name: "국립생물자원관 한반도의 생물다양성", url: "https://species.nibr.go.kr" }
                ],
                role: "기후 변화에 따른 국내 자생종 서식 생태계 데이터 탐색",
                theoryUrl: "https://ko.wikipedia.org/wiki/생물_다양성",
                searchQuery: "생물다양성 아카이브 멸종위기 야생생물 도감"
            },
            {
                tools: [
                    { name: "에어코리아 Air Korea (한국환경공단)", url: "https://www.airkorea.or.kr" }
                ],
                role: "전국 실시간 대기 오염 및 초미세먼지 농도 지표 수집",
                theoryUrl: "https://ko.wikipedia.org/wiki/대기_오염",
                searchQuery: "에어코리아 실시간 미세먼지 수치 조회 방법"
            },
            {
                tools: [
                    { name: "국토정보플랫폼 공간정보", url: "http://map.ngii.go.kr" }
                ],
                role: "GIS 공간 정보 지도 데이터 연동",
                theoryUrl: "https://ko.wikipedia.org/wiki/지리정보시스템",
                searchQuery: "국토정보플랫폼 국토통계지도 공간 시각화"
            },
            {
                tools: [
                    { name: "환경통계포털", url: "http://stat.me.go.kr" },
                    { name: "UNEP 데이터포털", url: "https://wesr.unep.org" }
                ],
                role: "국가 온실가스 배출량 및 환경 지표 원 데이터 분석",
                theoryUrl: "https://ko.wikipedia.org/wiki/환경과학",
                searchQuery: "환경통계포털 온실가스 배출량 통계표 검색"
            }
        ],
    },
    {
        id: "life-science-literature-review",
        name: "생명과학 학술 연구 탐색 플로우",
        description: "생명과학 논문 및 학술 문헌 탐구를 위해 생명 현상 키워드 정의부터 국가 R&D 자료, 생물정보학 데이터베이스, 유전자 분석 도구까지 아우르는 흐름",
        icon: "🧬",
        gradient: "from-emerald-500 to-teal-500",
        nodes: [
            {
                tools: [
                    { name: "한국생명공학연구원 KRIBB", url: "https://www.kribb.re.kr" }
                ],
                role: "국내 바이오 생명공학 주요 의제 및 가이드라인 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/생명과학",
                searchQuery: "생명공학연구원 바이오 트렌드 분석 보고서"
            },
            {
                tools: [
                    { name: "ScienceON", url: "https://scienceon.kisti.re.kr" },
                    { name: "PubMed 글로벌 의학도서관", url: "https://pubmed.ncbi.nlm.nih.gov" }
                ],
                role: "생명과학 분야 주요 논문 및 리뷰 학술지 수집",
                theoryUrl: "https://ko.wikipedia.org/wiki/문헌고찰",
                searchQuery: "ScienceON 생명과학 유전공학 논문 원문 읽기"
            },
            {
                tools: [
                    { name: "bioRxiv 생명과학 프리프린트", url: "https://www.biorxiv.org" }
                ],
                role: "동료 평가(peer-review) 전 단계 최신 논문 서치",
                theoryUrl: "https://en.wikipedia.org/wiki/Preprint",
                searchQuery: "biorxiv molecular biology preprint search"
            },
            {
                tools: [
                    { name: "한국생물정보학회", url: "http://www.ksbi.or.kr" }
                ],
                role: "유전자 염기서열 분석 및 프로토콜 레퍼런스 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/실험",
                searchQuery: "유전자 발현 데이터 생물정보학 분석 기법"
            },
            {
                tools: [
                    { name: "NCBI GenBank 글로벌 유전자은행", url: "https://www.ncbi.nlm.nih.gov/genbank/" }
                ],
                role: "염기서열, 아미노산 서열 데이터베이스 교차 대조",
                theoryUrl: "https://ko.wikipedia.org/wiki/생물정보학",
                searchQuery: "NCBI Blast 유전자 서열 정렬 비교 방법"
            },
            {
                tools: [
                    { name: "Zotero 논문 관리 프로그램", url: "https://www.zotero.org" }
                ],
                role: "인용 서지 정보 및 연구 노트 작성",
                theoryUrl: "https://ko.wikipedia.org/wiki/연구",
                searchQuery: "Zotero 한글 논문 인용 스타일 설정 가이드"
            }
        ],
    },
    {
        id: "health-information-verification",
        name: "보건의료 정보 및 증상 검증 플로우",
        description: "건강 정보와 증상 고민 정의부터 질병청 감염병 포털, 건강보험 심평원 평가 정보, 임상 진료 지침 검증까지의 의학 판단 흐름",
        icon: "⚕️",
        gradient: "from-rose-500 to-red-500",
        nodes: [
            {
                tools: [
                    { name: "국가건강정보포털 (질병관리청)", url: "https://health.kdca.go.kr" }
                ],
                role: "보건의료 증상 및 의학적 원인 기본 자료 수집",
                theoryUrl: "https://ko.wikipedia.org/wiki/증상",
                searchQuery: "질병관리청 국가건강정보포털 당뇨병 기본 정보"
            },
            {
                tools: [
                    { name: "질병관리청 감염병포털", url: "https://npt.kdca.go.kr" }
                ],
                role: "법정 감염병 발생 건수 및 격리 기준 지침 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/공중보건",
                searchQuery: "질병관리청 감염병포털 실시간 확진자 통계"
            },
            {
                tools: [
                    { name: "건강보험심사평가원 HIRA 비급여진료비", url: "https://www.hira.or.kr" }
                ],
                role: "전국 의원급/병원급 진료 적정성 및 가격 데이터 비교",
                theoryUrl: "https://ko.wikipedia.org/wiki/근거중심의학",
                searchQuery: "심평원 병원 평가 정보 도수치료 비급여 비용 비교"
            },
            {
                tools: [
                    { name: "임상진료지침 정보센터", url: "https://www.guideline.or.kr" }
                ],
                role: "의학 학회별 표준 임상진료 가이드라인 비교",
                theoryUrl: "https://ko.wikipedia.org/wiki/임상진료지침",
                searchQuery: "대한의학회 임상진료지침 고혈압 관리 기준"
            },
            {
                tools: [
                    { name: "식품의약품안전처 의약품안전나라", url: "https://nedrug.mfds.go.kr" }
                ],
                role: "전문의약품 효능, 부작용 및 복약 정보 공식 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/임상시험",
                searchQuery: "의약품안전나라 약물 성분 부작용 병용금기 검색"
            },
            {
                tools: [
                    { name: "종합병원 건강검진 포털 (개별 검진 센터)", url: "https://health.kdca.go.kr" }
                ],
                role: "개인 검진 수치 및 결과 기록지 보관",
                theoryUrl: "https://ko.wikipedia.org/wiki/의무기록",
                searchQuery: "건강검진 혈액검사 간수치 요단백 판독 가이드"
            }
        ],
    },
    {
        id: "lifestyle-health-planning",
        name: "생활습관 & 건강관리 플로우",
        description: "국가 운동/식단 권고 기준을 토대로 자가 추적 앱, 영양 안전 기준, 검진 상담까지 개인 건강을 보살피는 흐름",
        icon: "🥗",
        gradient: "from-lime-500 to-emerald-500",
        nodes: [
            {
                tools: [
                    { name: "보건복지부 건강증진포털", url: "https://www.khealth.or.kr" }
                ],
                role: "개인 신체 스펙 및 맞춤 건강 목표 설정",
                theoryUrl: "https://ko.wikipedia.org/wiki/건강증진",
                searchQuery: "보건복지부 비만 예방 식단 운동 가이드라인"
            },
            {
                tools: [
                    { name: "국가기초체력인증 (국민체력100)", url: "https://nfa.kspo.or.kr" }
                ],
                role: "체력 수준 인증 및 맞춤 운동 프로그램 추천",
                theoryUrl: "https://ko.wikipedia.org/wiki/신체활동",
                searchQuery: "국민체력100 체력 측정 무료 예약 신청 방법"
            },
            {
                tools: [
                    { name: "식품안전나라 칼로리 사전", url: "https://www.foodsafetykorea.go.kr/portal/healthyfoodlife/calorieDic.do" }
                ],
                role: "주요 한식 및 가공식품 영양 성분/칼로리 정밀 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/영양",
                searchQuery: "식품안전나라 음식 칼로리 영양소 데이터 검색"
            },
            {
                tools: [
                    { name: "대한수면의학회", url: "https://www.kosleep.org" }
                ],
                role: "수면 무호흡, 불면증 극복 수면위생 수칙 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/수면",
                searchQuery: "수면 위생 십계명 불면증 치료 가이드라인"
            },
            {
                tools: [
                    { name: "다이어트신 (Dietshin)", url: "http://www.dietshin.com" },
                    { name: "크로노미터 영양 분석", url: "https://cronometer.com" }
                ],
                role: "식단 및 일일 칼로리 자가 추적 모니터링",
                theoryUrl: "https://ko.wikipedia.org/wiki/자기추적",
                searchQuery: "다이어트신 식단 칼로리 몸무게 기록 어플"
            },
            {
                tools: [
                    { name: "정부24 나의 건강기록 앱", url: "https://www.gov.kr/portal/rcvamtZone/myHealth" }
                ],
                role: "국민건강보험 공단 검진 결과 데이터 자동 연동",
                theoryUrl: "https://ko.wikipedia.org/wiki/건강정보이해능력",
                searchQuery: "나의 건강기록 앱 보건의료 데이터 가져오기"
            }
        ],
    },
    {
        id: "terms-policy-review",
        name: "서비스 약관 & 준법 검토 플로우",
        description: "이용약관 구조 파악부터 개인정보보호 위원회 고시, GDPR 정보 주체 권리, 플랫폼 법률 규제 준수까지의 법무 검토 흐름",
        icon: "⚖️",
        gradient: "from-amber-500 to-orange-500",
        nodes: [
            {
                tools: [
                    { name: "공정거래위원회 표준약관", url: "https://www.ftc.go.kr" }
                ],
                role: "국내 서비스 업종별 공정위 표준약관 비교 검증",
                theoryUrl: "https://ko.wikipedia.org/wiki/이용약관",
                searchQuery: "공정거래위원회 이용약관 표준 약관 모델 검색"
            },
            {
                tools: [
                    { name: "개인정보보호 포털 (KISA)", url: "https://www.privacy.go.kr" },
                    { name: "개인정보보호위원회 고시", url: "https://www.pipc.go.kr" }
                ],
                role: "국내 개인정보 처리방침 법적 고시 의무 사항 점검",
                theoryUrl: "https://ko.wikipedia.org/wiki/개인정보_보호법",
                searchQuery: "개인정보보호법 개인정보 처리방침 필수 기재 항목"
            },
            {
                tools: [
                    { name: "GDPR.eu 유럽 개인정보 규제 가이드", url: "https://gdpr.eu" }
                ],
                role: "글로벌 해외 수출을 위한 유럽 GDPR 8대 정보 주체 권리 점검",
                theoryUrl: "https://ko.wikipedia.org/wiki/일반_개인정보_보호법",
                searchQuery: "GDPR 정보주체 권리 동의 철회 동의권 가이드"
            },
            {
                tools: [
                    { name: "국가법령정보센터 정보통신망법", url: "https://www.law.go.kr" }
                ],
                role: "전자상거래법 및 정보통신망법 광고성 정보 전송 동의 기준 분석",
                theoryUrl: "https://ko.wikipedia.org/wiki/소비자_보호",
                searchQuery: "정보통신망법 영리 목적 광고 전송 사전 수신 동의"
            },
            {
                tools: [
                    { name: "구글 투명성 보고서", url: "https://transparencyreport.google.com" }
                ],
                role: "플랫폼 서비스 콘텐츠 삭제 및 규제 투명성 레퍼런스 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/투명성",
                searchQuery: "구글 투명성보고서 정부의 콘텐츠 삭제 요청 건수"
            },
            {
                tools: [
                    { name: "종합법률정보 판례 검색", url: "https://glaw.scourt.go.kr" }
                ],
                role: "약관 설명 의무 위반 관련 대법원 판례 검색",
                theoryUrl: "https://ko.wikipedia.org/wiki/규정준수",
                searchQuery: "약관 설명의무 위반 효력 부인 판례 검색"
            }
        ],
    },
    {
        id: "policy-proposal-review",
        name: "정책 제안 & 입법 입안 검토 플로우",
        description: "공공 정책 문제 식별부터 PRISM 국가 연구 보고서, 법제처 상위법 저촉 검토, 비용 편익 분석까지의 행정 입안 흐름",
        icon: "📜",
        gradient: "from-indigo-500 to-violet-500",
        nodes: [
            {
                tools: [
                    { name: "대한민국 국회입법예고", url: "https://pal.assembly.go.kr" }
                ],
                role: "신규 발의 법안의 입법 추진 목적 및 타당성 분석",
                theoryUrl: "https://ko.wikipedia.org/wiki/공공정책",
                searchQuery: "국회입법예고 진행 법안 제안 이유 읽기"
            },
            {
                tools: [
                    { name: "온-나라 정책연구 PRISM", url: "https://www.prism.go.kr" },
                    { name: "KOSIS 국가통계포털", url: "https://kosis.kr" }
                ],
                role: "기존 중앙부처의 정책 연구 용역 결과 데이터 수집",
                theoryUrl: "https://ko.wikipedia.org/wiki/사회지표",
                searchQuery: "온나라 정책연구 prism 국책 과제 보고서 다운로드"
            },
            {
                tools: [
                    { name: "국가법령정보센터 상위법 검색", url: "https://www.law.go.kr" },
                    { name: "법제처 행정입법 검토 가이드", url: "https://www.moleg.go.kr" }
                ],
                role: "신규 행정 규칙 및 조례의 상위 법령 저촉 여부 검증",
                theoryUrl: "https://ko.wikipedia.org/wiki/행정법",
                searchQuery: "지자체 조례 상위법 위임 한계 저촉 판례"
            },
            {
                tools: [
                    { name: "국회예산정책처 NABO 보고서", url: "https://www.nabo.go.kr" }
                ],
                role: "예산안 분석 및 비용 추계 모델 비교 평가",
                theoryUrl: "https://en.wikipedia.org/wiki/Stakeholder_analysis",
                searchQuery: "국회예산정책처 법안 비용추계서 보고서"
            },
            {
                tools: [
                    { name: "KDI 한국개발연구원 정책 리포트", url: "https://www.kdi.re.kr" }
                ],
                role: "거시 경제적 영향 및 비용-편익(B/C) 타당성 비교",
                theoryUrl: "https://ko.wikipedia.org/wiki/비교정책학",
                searchQuery: "KDI 경제동향 정책 보고서 다운로드"
            },
            {
                tools: [
                    { name: "지방재정 365", url: "https://lofin.mois.go.kr" }
                ],
                role: "지자체 재정 자립도 및 공공 투자 타당성 검토 메모 정리",
                theoryUrl: "https://ko.wikipedia.org/wiki/정책분석",
                searchQuery: "지방재정365 지자체 세입 세출 분석 결과 조회"
            }
        ],
    },
    {
        id: "food-safety-verification",
        name: "식품 안전 & 위생 검증 플로우",
        description: "식품 위해 물질 정의부터 식약처 유해 식품 회수 공보, HACCP 안전 기준 대조, 위반 행정처분 기업 확인 흐름",
        icon: "🧪",
        gradient: "from-green-500 to-lime-500",
        nodes: [
            {
                tools: [
                    { name: "식품안전나라 (식약처)", url: "https://www.foodsafetykorea.go.kr" }
                ],
                role: "가공식품 원재료 및 국내 허가 번호 조회",
                theoryUrl: "https://ko.wikipedia.org/wiki/식품안전",
                searchQuery: "식품안전나라 품목제조보고번호 식품 검색"
            },
            {
                tools: [
                    { name: "식품의약품안전처 위해 정보", url: "https://www.mfds.go.kr" }
                ],
                role: "중금속, 잔류농약 등 식품 원료 유해 요인 공지 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/식중독",
                searchQuery: "식약처 식품 위해 성분 기준 규격 고시"
            },
            {
                tools: [
                    { name: "식품안전정보원", url: "https://www.foodinfo.or.kr" }
                ],
                role: "국내외 수입 식품 위험 동향 및 경보 모니터링",
                theoryUrl: "https://ko.wikipedia.org/wiki/식품위생",
                searchQuery: "식품안전정보원 수입 식품 유해 물질 모니터링"
            },
            {
                tools: [
                    { name: "한국식품안전관리인증원 (HACCP)", url: "https://www.haccp.or.kr" }
                ],
                role: "제조 시설의 식품 안전 관리 HACCP 기준 대조",
                theoryUrl: "https://ko.wikipedia.org/wiki/국제식품규격위원회",
                searchQuery: "HACCP 의무 적용 대상 품목 지정 기준"
            },
            {
                tools: [
                    { name: "식품안전나라 회수/판매중지 정보", url: "https://www.foodsafetykorea.go.kr/portal/board/board.do?menu_grp=MENU_GRP31&menu_no=463" }
                ],
                role: "유통기한 위반 및 위해 식품 긴급 회수 현황 점검",
                theoryUrl: "https://ko.wikipedia.org/wiki/제품_리콜",
                searchQuery: "식품안전나라 위해식품 회수 등급 판매중지 목록"
            },
            {
                tools: [
                    { name: "소비자24 행정처분 공보", url: "https://www.consumer.go.kr" }
                ],
                role: "식품위생법 위반에 따른 행정처분 이력 최종 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/위험_커뮤니케이션",
                searchQuery: "식품 제조업체 식위법 위반 영업정지 행정처분 조회"
            }
        ],
    },
    {
        id: "crop-cultivation-research",
        name: "농업 생산 & 작물 재배 플로우",
        description: "작물 재배 적합지 탐색부터 토양 환경, 기상 생육 지침, 병해충 방제 정보, 도소매 가격 시세 분석까지의 흐름",
        icon: "🌾",
        gradient: "from-lime-500 to-emerald-500",
        nodes: [
            {
                tools: [
                    { name: "KAMIS 농수산물유통정보", url: "https://www.kamis.or.kr" }
                ],
                role: "전국 도소매 농산물 품목별 가격 동향 및 거래량 파악",
                theoryUrl: "https://ko.wikipedia.org/wiki/농업",
                searchQuery: "KAMIS 농수산물 일별 도매 가격 시세 조회"
            },
            {
                tools: [
                    { name: "흙토람 토양환경정보시스템", url: "http://soil.rda.go.kr" }
                ],
                role: "지번별 토양 검정 및 비료 처방, 재배 적지 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/토양학",
                searchQuery: "흙토람 필지별 토양 특성 적지 조건 확인 방법"
            },
            {
                tools: [
                    { name: "농업기상정보서비스 (기상청)", url: "https://weather.rda.go.kr" }
                ],
                role: "농업 기상 관측 데이터 및 한해/동해 생육 재해 정보 비교",
                theoryUrl: "https://ko.wikipedia.org/wiki/농업기상학",
                searchQuery: "농업기상서비스 기온 토양 수분 센서 모니터링"
            },
            {
                tools: [
                    { name: "국가농작물병해충관리시스템 NCPMS", url: "https://ncpms.rda.go.kr" }
                ],
                role: "병해충 도감 검색 및 주간 병해충 예보/방제 지침 탐색",
                theoryUrl: "https://ko.wikipedia.org/wiki/식물병리학",
                searchQuery: "NCPMS 탄저병 도감 주간 병해충 발생 예보"
            },
            {
                tools: [
                    { name: "농촌진흥청 농사로", url: "https://www.nongsaro.go.kr" }
                ],
                role: "품목별 국가 정밀 재배 기술 지침 및 매뉴얼 확인",
                theoryUrl: "https://ko.wikipedia.org/wiki/재배",
                searchQuery: "농사로 고추 재배 매뉴얼 하우스 파종 방법"
            },
            {
                tools: [
                    { name: "농산물도매시장 정보시스템 (아포넷)", url: "https://www.agroinfo.or.kr" }
                ],
                role: "전국 도매시장 경매 낙찰 가격 동향 수집 및 유통 전략 수립",
                theoryUrl: "https://ko.wikipedia.org/wiki/농산물_유통",
                searchQuery: "도매시장 경매 결과 실시간 낙찰 낙찰단가 조회"
            }
        ],
    },

    {
        id: "pure-forms-history",
        name: "순수 형식의 역사",
        description: "도형과 수의 직관에서 공리, 논리, 현대 수학 기초론으로 이어지는 추상 질서의 발전 흐름",
        icon: "📐",
        gradient: "from-sky-500 to-indigo-500",
        nodes: [
            {
                tools: [
                    { name: "Euclid's Elements", url: "https://mathcs.clarku.edu/~djoyce/java/elements/elements.html" },
                    { name: "MacTutor History of Mathematics", url: "https://mathshistory.st-andrews.ac.uk" }
                ],
                role: "고대 기하학: 도형, 비례, 증명을 통해 질서를 형식화",
                theoryUrl: "https://en.wikipedia.org/wiki/Euclidean_geometry",
                searchQuery: "유클리드 원론 기하학 증명 역사"
            },
            {
                tools: [
                    { name: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu" },
                    { name: "Internet Encyclopedia of Philosophy", url: "https://iep.utm.edu" }
                ],
                role: "논리학과 공리: 참과 증명의 규칙을 독립된 체계로 정리",
                theoryUrl: "https://en.wikipedia.org/wiki/Logic",
                searchQuery: "아리스토텔레스 논리학 공리 체계 역사"
            },
            {
                tools: [
                    { name: "Wolfram MathWorld", url: "https://mathworld.wolfram.com" },
                    { name: "Khan Academy Algebra", url: "https://www.khanacademy.org/math/algebra" }
                ],
                role: "대수와 해석: 수, 기호, 함수로 변화와 관계를 계산",
                theoryUrl: "https://en.wikipedia.org/wiki/Algebra",
                searchQuery: "대수학 해석학 역사 함수 미적분 발전"
            },
            {
                tools: [
                    { name: "nLab", url: "https://ncatlab.org" },
                    { name: "ProofWiki", url: "https://proofwiki.org" }
                ],
                role: "현대 수학 기초론: 집합, 구조, 형식주의로 수학의 기반을 재검토",
                theoryUrl: "https://en.wikipedia.org/wiki/Foundations_of_mathematics",
                searchQuery: "수학 기초론 집합론 형식주의 괴델 불완전성"
            }
        ],
    },
    {
        id: "micro-world-history",
        name: "미시 세계의 발견",
        description: "원자론적 상상에서 화학 원소, 전자와 원자핵, 양자역학으로 이어지는 물질 이해의 발전 흐름",
        icon: "⚛️",
        gradient: "from-violet-500 to-fuchsia-500",
        nodes: [
            {
                tools: [
                    { name: "Atomic Heritage Foundation", url: "https://ahf.nuclearmuseum.org" },
                    { name: "Britannica Atom", url: "https://www.britannica.com/science/atom" }
                ],
                role: "원자론: 세계를 더 이상 나눌 수 없는 입자의 조합으로 상상",
                theoryUrl: "https://en.wikipedia.org/wiki/Atomism",
                searchQuery: "데모크리토스 원자론 고대 자연철학"
            },
            {
                tools: [
                    { name: "Royal Society of Chemistry", url: "https://www.rsc.org" },
                    { name: "PubChem", url: "https://pubchem.ncbi.nlm.nih.gov" }
                ],
                role: "근대 화학: 원소, 반응, 주기율로 물질의 규칙성을 정리",
                theoryUrl: "https://en.wikipedia.org/wiki/History_of_chemistry",
                searchQuery: "근대 화학 라부아지에 돌턴 주기율표 역사"
            },
            {
                tools: [
                    { name: "Nobel Prize Physics", url: "https://www.nobelprize.org/prizes/lists/all-nobel-prizes-in-physics/" },
                    { name: "CERN", url: "https://home.cern" }
                ],
                role: "전자와 원자핵: 보이지 않는 내부 구조를 실험으로 분해",
                theoryUrl: "https://en.wikipedia.org/wiki/Atomic_nucleus",
                searchQuery: "전자 발견 러더퍼드 원자핵 실험 역사"
            },
            {
                tools: [
                    { name: "Quantum Country", url: "https://quantum.country" },
                    { name: "Qiskit Learning", url: "https://learning.quantum.ibm.com" }
                ],
                role: "양자역학: 측정, 확률, 파동함수로 미시 세계의 규칙을 재정의",
                theoryUrl: "https://en.wikipedia.org/wiki/Quantum_mechanics",
                searchQuery: "양자역학 역사 플랑크 보어 하이젠베르크 슈뢰딩거"
            }
        ],
    },
    {
        id: "macro-world-history",
        name: "거시 세계의 법칙",
        description: "천상과 지상의 운동을 하나의 법칙으로 묶고, 중력과 시공간 개념으로 확장해 온 흐름",
        icon: "🪐",
        gradient: "from-amber-500 to-orange-500",
        nodes: [
            {
                tools: [
                    { name: "Galileo Project", url: "https://galileo.rice.edu" },
                    { name: "NASA History", url: "https://history.nasa.gov" }
                ],
                role: "관측과 운동: 천상 운동과 지상 운동을 수학적으로 비교",
                theoryUrl: "https://en.wikipedia.org/wiki/Classical_mechanics",
                searchQuery: "갈릴레이 운동 법칙 고전역학 역사"
            },
            {
                tools: [
                    { name: "Newton Project", url: "https://www.newtonproject.ox.ac.uk" },
                    { name: "Principia Online", url: "https://cudl.lib.cam.ac.uk/view/PR-ADV-B-00039-00001" }
                ],
                role: "뉴턴 역학: 힘과 중력으로 자연 현상을 하나의 법칙 아래 묶음",
                theoryUrl: "https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion",
                searchQuery: "뉴턴 프린키피아 만유인력 고전역학"
            },
            {
                tools: [
                    { name: "Einstein Online", url: "https://www.einstein-online.info" },
                    { name: "Nobel Prize Relativity", url: "https://www.nobelprize.org/prizes/themes/relativity-the-general-theory/" }
                ],
                role: "상대성 이론: 시간, 공간, 중력을 관측자와 기하학의 문제로 재구성",
                theoryUrl: "https://en.wikipedia.org/wiki/Theory_of_relativity",
                searchQuery: "특수 상대성 일반 상대성 역사 시공간 중력"
            },
            {
                tools: [
                    { name: "NASA Exoplanet Archive", url: "https://exoplanetarchive.ipac.caltech.edu" },
                    { name: "ESA Science", url: "https://www.esa.int/Science_Exploration" }
                ],
                role: "현대 천체물리: 별, 은하, 행성계를 관측 데이터로 모델링",
                theoryUrl: "https://en.wikipedia.org/wiki/Astrophysics",
                searchQuery: "현대 천체물리 별 은하 외계행성 관측 데이터"
            }
        ],
    },
    {
        id: "cosmic-structure-history",
        name: "우주 구조의 상상과 검증",
        description: "신화적 우주관에서 지동설, 팽창 우주, 현대 우주론과 외계 생명 탐색으로 이어지는 세계관의 변화",
        icon: "🌌",
        gradient: "from-slate-500 to-cyan-500",
        nodes: [
            {
                tools: [
                    { name: "World History Encyclopedia", url: "https://www.worldhistory.org" },
                    { name: "Internet Sacred Text Archive", url: "https://sacred-texts.com" }
                ],
                role: "신화적 우주관: 세계의 질서를 서사, 상징, 천체 주기로 설명",
                theoryUrl: "https://en.wikipedia.org/wiki/Cosmology_in_ancient_religion",
                searchQuery: "고대 우주관 신화 천문 상징 역사"
            },
            {
                tools: [
                    { name: "Copernicus Project", url: "https://copernicus.torun.pl/en/" },
                    { name: "Library of Congress Astronomy", url: "https://www.loc.gov/collections/finding-our-place-in-the-cosmos-with-carl-sagan/" }
                ],
                role: "지구중심설에서 태양중심설로: 관측과 수학 모델이 세계의 중심을 이동시킴",
                theoryUrl: "https://en.wikipedia.org/wiki/Heliocentrism",
                searchQuery: "지구중심설 태양중심설 코페르니쿠스 갈릴레이 역사"
            },
            {
                tools: [
                    { name: "NASA Universe", url: "https://science.nasa.gov/universe/" },
                    { name: "ESA Planck", url: "https://www.esa.int/Science_Exploration/Space_Science/Planck" }
                ],
                role: "팽창 우주와 빅뱅: 은하 후퇴와 우주배경복사로 우주의 역사를 추론",
                theoryUrl: "https://en.wikipedia.org/wiki/Big_Bang",
                searchQuery: "빅뱅 우주론 허블 우주배경복사 역사"
            },
            {
                tools: [
                    { name: "SETI Institute", url: "https://www.seti.org" },
                    { name: "NASA Astrobiology", url: "https://astrobiology.nasa.gov" }
                ],
                role: "외계 생명과 우주 탐색: 생명의 조건과 지성의 가능성을 과학적으로 탐구",
                theoryUrl: "https://en.wikipedia.org/wiki/Astrobiology",
                searchQuery: "우주생물학 SETI 외계 생명 탐색 과학"
            }
        ],
    },
];
