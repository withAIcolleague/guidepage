#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────
// Agent 2 – Knowledge Tree Classification & Mapping
// Reads validated-sites.json → classifies into taxonomy → outputs
// classified-sites.json
// ─────────────────────────────────────────────────────────────────

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ── Path helpers ────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolve = (...segs) => path.join(__dirname, ...segs);

const INPUT_PATH = resolve("output", "validated-sites.json");
const OVERRIDES_PATH = resolve("input", "manual-overrides.json");
const OUTPUT_PATH = resolve("output", "classified-sites.json");

// ── Colours & helpers ───────────────────────────────────────────
const c = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
  white: "\x1b[37m",
};

const log = (emoji, msg) => console.log(`${emoji}  ${msg}`);
const clr = (colour, text) => `${colour}${text}${c.reset}`;

// ── Taxonomy: 대분류 → 소분류 defaults ──────────────────────────
const TAXONOMY = {
  "존재와 이성": {
    id: "being-reason",
    subcategories: ["역사와 사상", "학습과 인지", "심리·행동과학"],
  },
  "가치와 신용": {
    id: "value-exchange",
    subcategories: ["시장과 경제", "비즈니스와 창업"],
  },
  "규범과 질서": {
    id: "norms-governance",
    subcategories: ["법과 제도", "행정과 공공정책"],
  },
  "표현과 감성": {
    id: "expression-sensation",
    subcategories: ["창작과 디자인", "콘텐츠와 미디어"],
  },
  "물질과 우주": {
    id: "matter-cosmos",
    subcategories: ["기초 자연과학"],
  },
  "생명과 건강": {
    id: "life-health",
    subcategories: ["생명과 의학보건", "농학과 웰니스"],
  },
  "도구와 지능": {
    id: "tools-intelligence",
    subcategories: ["소프트웨어 공학", "인공지능과 데이터", "하드웨어 공학"],
  },
};

// ── Keyword map (대분류 → keyword list) ─────────────────────────
const KEYWORD_MAP = {
  "도구와 지능": [
    "개발", "코딩", "프로그래밍", "소프트웨어", "AI", "인공지능",
    "머신러닝", "데이터", "반도체", "코드", "API", "클라우드",
    "서버", "프론트엔드", "백엔드",
  ],
  "가치와 신용": [
    "경제", "금융", "투자", "주식", "부동산", "시장", "사업",
    "창업", "스타트업", "은행", "통화",
  ],
  "규범과 질서": [
    "법률", "법령", "정책", "규제", "행정", "정부", "공공",
    "민원", "복지", "약관",
  ],
  "표현과 감성": [
    "디자인", "미술", "음악", "영상", "콘텐츠", "미디어",
    "UI", "UX", "창작",
  ],
  "물질과 우주": [
    "물리", "화학", "우주", "기후", "환경", "자연", "과학", "실험",
  ],
  "생명과 건강": [
    "의학", "보건", "건강", "의료", "농업", "식품", "생명", "수산", "약학",
  ],
  "존재와 이성": [
    "역사", "철학", "교육", "학습", "심리", "인문", "문학", "사상",
  ],
};

// ── Keyword → sub-category refinement map ───────────────────────
// Used to pick a more specific 소분류 when a keyword matches.
const SUB_KEYWORD_MAP = {
  "도구와 지능": {
    "소프트웨어 공학": ["개발", "코딩", "프로그래밍", "소프트웨어", "코드", "API", "클라우드", "서버", "프론트엔드", "백엔드"],
    "인공지능과 데이터": ["AI", "인공지능", "머신러닝", "데이터"],
    "하드웨어 공학": ["반도체"],
  },
  "가치와 신용": {
    "시장과 경제": ["경제", "금융", "투자", "주식", "부동산", "시장", "은행", "통화"],
    "비즈니스와 창업": ["사업", "창업", "스타트업"],
  },
  "규범과 질서": {
    "법과 제도": ["법률", "법령", "규제", "약관"],
    "행정과 공공정책": ["정책", "행정", "정부", "공공", "민원", "복지"],
  },
  "표현과 감성": {
    "창작과 디자인": ["디자인", "미술", "UI", "UX", "창작"],
    "콘텐츠와 미디어": ["음악", "영상", "콘텐츠", "미디어"],
  },
  "물질과 우주": {
    "기초 자연과학": ["물리", "화학", "우주", "기후", "환경", "자연", "과학", "실험"],
  },
  "생명과 건강": {
    "생명과 의학보건": ["의학", "보건", "건강", "의료", "생명", "약학"],
    "농학과 웰니스": ["농업", "식품", "수산"],
  },
  "존재와 이성": {
    "역사와 사상": ["역사", "철학", "인문", "문학", "사상"],
    "학습과 인지": ["교육", "학습"],
    "심리·행동과학": ["심리"],
  },
};

// ── Blog domain patterns ────────────────────────────────────────
const BLOG_DOMAINS = [
  "tistory.com",
  "brunch.co.kr",
  "velog.io",
  "medium.com",
  "blog.naver.com",
];

// ─────────────────────────────────────────────────────────────────
// detectOrganizationType(url)
// ─────────────────────────────────────────────────────────────────
function detectOrganizationType(url) {
  let hostname;
  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch {
    return "Unknown";
  }

  // Government
  if (hostname.endsWith(".go.kr") || hostname.endsWith(".gov")) return "Government";

  // Blog / Individual
  if (BLOG_DOMAINS.some((d) => hostname.includes(d))) return "Individual";

  // Public / Academic / Non-profit
  if (
    hostname.endsWith(".ac.kr") ||
    hostname.endsWith(".edu") ||
    hostname.endsWith(".or.kr")
  )
    return "Public";

  // Enterprise (broad catch)
  if (
    hostname.endsWith(".com") ||
    hostname.endsWith(".io") ||
    hostname.endsWith(".co") ||
    hostname.endsWith(".co.kr")
  )
    return "Enterprise";

  return "Unknown";
}

// ─────────────────────────────────────────────────────────────────
// classifyCategory(text)  → { major, sub, detail }
// ─────────────────────────────────────────────────────────────────
function classifyCategory(text) {
  const scores = {};

  for (const [major, keywords] of Object.entries(KEYWORD_MAP)) {
    let score = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) score++;
    }
    if (score > 0) scores[major] = score;
  }

  if (Object.keys(scores).length === 0) {
    return { major: "미분류", sub: "미분류", detail: "미분류" };
  }

  // Pick the major category with the highest score
  const major = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

  // Determine sub-category via SUB_KEYWORD_MAP
  const subMap = SUB_KEYWORD_MAP[major] || {};
  let bestSub = TAXONOMY[major]?.subcategories?.[0] || "일반";
  let bestSubScore = 0;

  for (const [sub, kws] of Object.entries(subMap)) {
    let subScore = 0;
    for (const kw of kws) {
      if (text.includes(kw)) subScore++;
    }
    if (subScore > bestSubScore) {
      bestSubScore = subScore;
      bestSub = sub;
    }
  }

  // Detail (3rd level) — derive from the highest-matching keyword itself
  const detailKeywords = subMap[bestSub] || [];
  const matchedDetails = detailKeywords.filter((kw) => text.includes(kw));
  const detail = matchedDetails.length > 0 ? matchedDetails[0] : bestSub;

  return { major, sub: bestSub, detail };
}

// ─────────────────────────────────────────────────────────────────
// extractTags(text, organizationType)
// ─────────────────────────────────────────────────────────────────
function extractTags(text, organizationType) {
  const allKeywords = Object.values(KEYWORD_MAP).flat();
  const matched = allKeywords.filter((kw) => text.includes(kw));

  // De-duplicate and cap at 4 keyword tags
  const uniqueKw = [...new Set(matched)].slice(0, 4);

  // Always include organizationType
  const tags = [...uniqueKw, organizationType];

  // Ensure 2–5 total
  return [...new Set(tags)].slice(0, 5);
}

// ─────────────────────────────────────────────────────────────────
// main()
// ─────────────────────────────────────────────────────────────────
async function main() {
  console.log();
  log("🌳", clr(c.bold + c.cyan, "Agent 2 – Knowledge Tree Classification & Mapping"));
  console.log(clr(c.dim, "─".repeat(60)));

  // ── 1. Read validated-sites.json ──────────────────────────────
  let sites;
  try {
    const raw = await fs.readFile(INPUT_PATH, "utf-8");
    sites = JSON.parse(raw);
    log("📂", `Loaded ${clr(c.green, sites.length)} entries from validated-sites.json`);
  } catch (err) {
    log("❌", clr(c.red, `Failed to read input: ${err.message}`));
    log("💡", `Expected at: ${clr(c.dim, INPUT_PATH)}`);
    process.exit(1);
  }

  // ── 2. Filter valid entries ───────────────────────────────────
  const validSites = sites.filter((s) => s.isValid === true);
  log("✅", `${clr(c.green, validSites.length)} valid sites to classify (${sites.length - validSites.length} invalid skipped)`);

  if (validSites.length === 0) {
    log("⚠️", clr(c.yellow, "No valid sites found. Writing empty output."));
    await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
    await fs.writeFile(OUTPUT_PATH, JSON.stringify([], null, 2), "utf-8");
    process.exit(0);
  }

  // ── 3. Read manual overrides ──────────────────────────────────
  let overrides = {};
  try {
    const raw = await fs.readFile(OVERRIDES_PATH, "utf-8");
    overrides = JSON.parse(raw);
    const count = Object.keys(overrides).length;
    log("🔧", `Loaded ${clr(c.magenta, count)} manual override(s)`);
  } catch {
    log("ℹ️", clr(c.dim, "No manual-overrides.json found — proceeding without overrides"));
  }

  // ── 4. Classify each site ─────────────────────────────────────
  console.log();
  log("🏷️", clr(c.bold, "Classifying sites…"));
  console.log(clr(c.dim, "─".repeat(60)));

  const categoryCounts = {};
  const orgTypeCounts = {};
  const results = [];

  for (const site of validSites) {
    const url = site.url || "";
    const textPool = `${site.siteName || ""} ${site.description || ""} ${url}`;

    // Check manual override first
    const override = overrides[url];

    let organizationType;
    let categoryPath;
    let tags;
    let isOverridden = false;

    if (override) {
      // ── Manual override takes absolute precedence ─────────
      isOverridden = true;
      organizationType = override.organizationType || detectOrganizationType(url);
      categoryPath = override.categoryPath || ["미분류", "미분류", "미분류"];
      tags = override.tags || extractTags(textPool, organizationType);
    } else {
      // ── Auto-classification ───────────────────────────────
      organizationType = detectOrganizationType(url);
      const { major, sub, detail } = classifyCategory(textPool);
      categoryPath = [major, sub, detail];
      tags = extractTags(textPool, organizationType);
    }

    // Tally counts
    const majorCat = categoryPath[0];
    categoryCounts[majorCat] = (categoryCounts[majorCat] || 0) + 1;
    orgTypeCounts[organizationType] = (orgTypeCounts[organizationType] || 0) + 1;

    // Log
    const overrideTag = isOverridden ? clr(c.magenta, " [override]") : "";
    const catLabel = categoryPath.join(" › ");
    log(
      "📌",
      `${clr(c.white, site.siteName || url)}${overrideTag}\n` +
        `      ${clr(c.dim, "→")} ${clr(c.cyan, catLabel)}  ${clr(c.dim, `(${organizationType})`)}`
    );

    results.push({
      siteName: site.siteName || "",
      url,
      organizationType,
      categoryPath,
      tags,
      description: site.description || "",
    });
  }

  // ── 5. Write output ───────────────────────────────────────────
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(results, null, 2), "utf-8");

  // ── 6. Summary ────────────────────────────────────────────────
  console.log();
  console.log(clr(c.dim, "─".repeat(60)));
  log("📊", clr(c.bold, "Classification Summary"));
  console.log();

  // By category
  log("🗂️", clr(c.bold, " By Category (대분류):"));
  const sortedCats = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  for (const [cat, count] of sortedCats) {
    const bar = "█".repeat(Math.min(count, 30));
    console.log(`      ${clr(c.cyan, cat.padEnd(10))} ${clr(c.green, String(count).padStart(3))} ${clr(c.dim, bar)}`);
  }

  console.log();

  // By organization type
  log("🏢", clr(c.bold, " By Organization Type:"));
  const sortedOrgs = Object.entries(orgTypeCounts).sort((a, b) => b[1] - a[1]);
  for (const [org, count] of sortedOrgs) {
    const bar = "█".repeat(Math.min(count, 30));
    console.log(`      ${clr(c.yellow, org.padEnd(12))} ${clr(c.green, String(count).padStart(3))} ${clr(c.dim, bar)}`);
  }

  console.log();
  log("💾", `Output written to ${clr(c.green, OUTPUT_PATH)}`);
  log("✨", clr(c.bold + c.green, `Done — ${results.length} sites classified successfully.`));
  console.log();
}

// ── Run ─────────────────────────────────────────────────────────
main().catch((err) => {
  log("💥", clr(c.red, `Unexpected error: ${err.message}`));
  console.error(err);
  process.exit(1);
});
