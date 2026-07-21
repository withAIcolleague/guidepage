#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
//  Agent 3 — File Routing & Distribution
//  Reads classified sites and routes them to category JSON files
//  Usage:  node scripts/agent3-route.mjs [--preview]
// ═══════════════════════════════════════════════════════════════

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// ── Path helpers ──────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const CLASSIFIED_PATH = path.join(ROOT, "scripts", "output", "classified-sites.json");
const DIR_DATA = path.join(ROOT, "src", "data", "directory");
const INDEX_PATH = path.join(DIR_DATA, "_index.json");

// ── Category mapping ─────────────────────────────────────────
const CATEGORY_MAP = {
  "존재와 이성": "being-reason.json",
  "가치와 신용": "value-exchange.json",
  "규범과 질서": "norms-governance.json",
  "표현과 감성": "expression-sensation.json",
  "물질과 우주": "matter-cosmos.json",
  "생명과 건강": "life-health.json",
  "도구와 지능": "tools-intelligence.json",
};

const CATEGORY_REVERSE = {};
for (const [ko, file] of Object.entries(CATEGORY_MAP)) {
  CATEGORY_REVERSE[file] = ko;
}

// All known category files (including uncategorized)
const ALL_CATEGORY_FILES = [
  ...new Set(Object.values(CATEGORY_MAP)),
  "uncategorized.json",
];

// ── CLI flags ────────────────────────────────────────────────
const isPreview = process.argv.includes("--preview");

// ── Helpers ──────────────────────────────────────────────────
function today() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

async function readJSON(filePath) {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

async function writeJSON(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function resolveTargetFile(categoryPath) {
  const primary = Array.isArray(categoryPath) ? categoryPath[0] : undefined;
  const file = primary ? CATEGORY_MAP[primary] : undefined;
  return file || "uncategorized.json";
}

function categoryIdFromFile(fileName) {
  return fileName.replace(/\.json$/, "");
}

// ── Colour helpers (works in most terminals) ─────────────────
const c = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  bold: "\x1b[1m",
};

// ═════════════════════════════════════════════════════════════
//  MAIN
// ═════════════════════════════════════════════════════════════
async function main() {
  console.log();
  console.log(
    `${c.bold}${c.cyan}📦  Agent 3 — File Routing & Distribution${c.reset}`
  );
  if (isPreview) {
    console.log(
      `${c.yellow}👁️  Preview mode — no files will be written${c.reset}`
    );
  }
  console.log(`${c.dim}${"─".repeat(50)}${c.reset}`);

  // ── 1. Load classified sites ──────────────────────────────
  let sites;
  try {
    sites = await readJSON(CLASSIFIED_PATH);
  } catch {
    console.error(
      `\n${c.red}❌  Cannot read classified-sites.json${c.reset}`
    );
    console.error(
      `${c.dim}   Expected at: ${CLASSIFIED_PATH}${c.reset}`
    );
    console.error(
      `${c.dim}   Run agent2 first to generate classified sites.${c.reset}`
    );
    process.exit(1);
  }

  if (!Array.isArray(sites) || sites.length === 0) {
    console.log(`\n${c.yellow}⚠️  No sites found in classified-sites.json${c.reset}`);
    process.exit(0);
  }

  console.log(
    `\n${c.green}📋  Loaded ${c.bold}${sites.length}${c.reset}${c.green} classified site(s)${c.reset}\n`
  );

  // ── 2. Cache for category files (read once, write once) ───
  /** @type {Map<string, object>} fileName → parsed JSON */
  const fileCache = new Map();

  async function getCategoryData(fileName) {
    if (fileCache.has(fileName)) return fileCache.get(fileName);

    const filePath = path.join(DIR_DATA, fileName);
    let data;
    try {
      data = await readJSON(filePath);
    } catch {
      // File doesn't exist yet — create skeleton
      const catId = categoryIdFromFile(fileName);
      const catName = CATEGORY_REVERSE[fileName] || "미분류";
      data = {
        categoryId: catId,
        categoryName: catName,
        lastUpdated: today(),
        entries: [],
      };
    }
    fileCache.set(fileName, data);
    return data;
  }

  // ── 3. Route each site ────────────────────────────────────
  let routed = 0;
  let duplicates = 0;
  /** @type {Map<string, number>} fileName → count of newly added */
  const perFileNew = new Map();
  /** @type {Map<string, number>} fileName → count of duplicates */
  const perFileDup = new Map();

  for (const site of sites) {
    const targetFile = resolveTargetFile(site.categoryPath);
    const data = await getCategoryData(targetFile);

    // Duplicate check: compare URL
    const urlExists = data.entries.some(
      (e) => e.url === site.url
    );

    if (urlExists) {
      duplicates++;
      perFileDup.set(targetFile, (perFileDup.get(targetFile) || 0) + 1);
      console.log(
        `  ${c.yellow}⚠️  SKIP${c.reset}  ${c.dim}${site.siteName}${c.reset} → ${c.dim}${targetFile}${c.reset}  ${c.yellow}(duplicate URL)${c.reset}`
      );
      continue;
    }

    // Build entry
    const entry = {
      siteName: site.siteName ?? "",
      url: site.url ?? "",
      organizationType: site.organizationType ?? "",
      categoryPath: site.categoryPath ?? [],
      tags: site.tags ?? [],
      description: site.description ?? "",
    };

    data.entries.push(entry);
    data.lastUpdated = today();
    routed++;
    perFileNew.set(targetFile, (perFileNew.get(targetFile) || 0) + 1);

    console.log(
      `  ${c.green}✅  ROUTE${c.reset}  ${site.siteName} → ${c.cyan}${targetFile}${c.reset}`
    );
  }

  // ── 4. Write category files ───────────────────────────────
  if (!isPreview) {
    console.log(`\n${c.dim}${"─".repeat(50)}${c.reset}`);
    console.log(`${c.bold}💾  Writing category files…${c.reset}`);

    for (const [fileName, data] of fileCache.entries()) {
      // Only write files that actually got new entries
      if ((perFileNew.get(fileName) || 0) > 0) {
        const filePath = path.join(DIR_DATA, fileName);
        await writeJSON(filePath, data);
        console.log(`  ${c.green}✔${c.reset}  ${fileName}  ${c.dim}(${data.entries.length} entries)${c.reset}`);
      }
    }
  }

  // ── 5. Recalculate _index.json stats ──────────────────────
  if (!isPreview) {
    console.log(`\n${c.bold}📊  Updating _index.json stats…${c.reset}`);

    let indexData;
    try {
      indexData = await readJSON(INDEX_PATH);
    } catch {
      console.error(`${c.red}❌  Cannot read _index.json${c.reset}`);
      process.exit(1);
    }

    let totalEntries = 0;
    const byCategory = {};
    const byOrganizationType = {};

    for (const catFile of ALL_CATEGORY_FILES) {
      const catPath = path.join(DIR_DATA, catFile);
      let catData;
      try {
        catData = await readJSON(catPath);
      } catch {
        continue; // file doesn't exist, skip
      }

      const catId = categoryIdFromFile(catFile);
      const count = catData.entries ? catData.entries.length : 0;
      totalEntries += count;
      byCategory[catId] = count;

      // Aggregate organizationType
      if (catData.entries) {
        for (const entry of catData.entries) {
          const orgType = entry.organizationType || "Unknown";
          byOrganizationType[orgType] = (byOrganizationType[orgType] || 0) + 1;
        }
      }
    }

    indexData.stats = {
      totalEntries,
      byCategory,
      byOrganizationType,
      lastUpdated: today(),
    };
    indexData.lastUpdated = today();

    await writeJSON(INDEX_PATH, indexData);
    console.log(`  ${c.green}✔${c.reset}  _index.json updated`);
    console.log(`     ${c.dim}totalEntries: ${totalEntries}${c.reset}`);
  }

  // ── 6. Summary ────────────────────────────────────────────
  console.log(`\n${c.dim}${"─".repeat(50)}${c.reset}`);
  console.log(`${c.bold}${c.magenta}📊  Routing Summary${c.reset}`);
  console.log(`  ${c.green}✅  Routed:${c.reset}     ${routed}`);
  console.log(`  ${c.yellow}⚠️  Duplicates:${c.reset}  ${duplicates}`);
  console.log(`  ${c.cyan}📁  Total input:${c.reset} ${sites.length}`);

  if (perFileNew.size > 0 || perFileDup.size > 0) {
    console.log(`\n  ${c.bold}Per-file breakdown:${c.reset}`);
    const allFiles = new Set([...perFileNew.keys(), ...perFileDup.keys()]);
    for (const f of [...allFiles].sort()) {
      const added = perFileNew.get(f) || 0;
      const duped = perFileDup.get(f) || 0;
      const parts = [];
      if (added > 0) parts.push(`${c.green}+${added} new${c.reset}`);
      if (duped > 0) parts.push(`${c.yellow}${duped} dup${c.reset}`);
      console.log(`    ${c.cyan}${f}${c.reset}  ${parts.join(", ")}`);
    }
  }

  if (isPreview) {
    console.log(
      `\n${c.yellow}👁️  Preview complete — run without --preview to apply.${c.reset}`
    );
  } else {
    console.log(`\n${c.green}🎉  Routing complete!${c.reset}`);
  }
  console.log();
}

main().catch((err) => {
  console.error(`\n${c.red}💥  Unexpected error: ${err.message}${c.reset}`);
  console.error(err.stack);
  process.exit(1);
});
