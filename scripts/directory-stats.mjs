/**
 * 디렉토리 데이터 통계 및 검증 스크립트
 *
 * src/data/directory/ 내 모든 카테고리 파일을 읽어
 * 전체 통계를 요약 출력합니다.
 *
 * 사용법:
 *   node scripts/directory-stats.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIRECTORY_DIR = path.join(__dirname, "..", "src", "data", "directory");

const CATEGORY_FILES = [
  "being-reason.json",
  "value-exchange.json",
  "norms-governance.json",
  "expression-sensation.json",
  "matter-cosmos.json",
  "life-health.json",
  "tools-intelligence.json",
  "uncategorized.json",
];

async function readCategoryFile(fileName) {
  const filePath = path.join(DIRECTORY_DIR, fileName);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function main() {
  console.log();
  console.log("📊 NEXINOUS Directory 통계");
  console.log("═".repeat(60));
  console.log();

  let totalEntries = 0;
  const byCategory = {};
  const byOrgType = {};
  const allTags = {};
  const allUrls = new Set();
  const duplicateUrls = [];
  const emptyCategories = [];
  const errors = [];

  for (const fileName of CATEGORY_FILES) {
    const data = await readCategoryFile(fileName);

    if (!data) {
      errors.push(`❌ 파일 읽기 실패: ${fileName}`);
      continue;
    }

    const entries = data.entries || [];
    const count = entries.length;
    totalEntries += count;
    byCategory[data.categoryName || fileName] = count;

    if (count === 0) {
      emptyCategories.push(data.categoryName || fileName);
    }

    for (const entry of entries) {
      // Organization type 집계
      const orgType = entry.organizationType || "Unknown";
      byOrgType[orgType] = (byOrgType[orgType] || 0) + 1;

      // 태그 빈도 집계
      if (entry.tags) {
        for (const tag of entry.tags) {
          allTags[tag] = (allTags[tag] || 0) + 1;
        }
      }

      // 중복 URL 검출
      if (allUrls.has(entry.url)) {
        duplicateUrls.push({ url: entry.url, file: fileName });
      } else {
        allUrls.add(entry.url);
      }

      // 데이터 무결성 검사
      if (!entry.url) errors.push(`⚠️ URL 누락: ${entry.siteName} in ${fileName}`);
      if (!entry.siteName) errors.push(`⚠️ 사이트명 누락: ${entry.url} in ${fileName}`);
      if (!entry.categoryPath || entry.categoryPath.length !== 3) {
        errors.push(`⚠️ categoryPath 형식 오류: ${entry.siteName || entry.url} in ${fileName}`);
      }
    }
  }

  // 카테고리별 통계
  console.log("📁 카테고리별 엔트리 수:");
  console.log("─".repeat(40));
  for (const [name, count] of Object.entries(byCategory)) {
    const bar = "█".repeat(Math.min(count, 30));
    const icon = count === 0 ? "  ⚪" : "  🟢";
    console.log(`${icon} ${name.padEnd(16)} ${String(count).padStart(4)}  ${bar}`);
  }
  console.log(`\n   총 엔트리: ${totalEntries}개`);
  console.log();

  // 조직 유형별 분포
  if (Object.keys(byOrgType).length > 0) {
    console.log("🏛️  조직 유형별 분포:");
    console.log("─".repeat(40));
    for (const [type, count] of Object.entries(byOrgType).sort((a, b) => b[1] - a[1])) {
      const pct = totalEntries > 0 ? ((count / totalEntries) * 100).toFixed(1) : 0;
      console.log(`   ${type.padEnd(14)} ${String(count).padStart(4)}  (${pct}%)`);
    }
    console.log();
  }

  // 태그 빈도 (상위 15개)
  if (Object.keys(allTags).length > 0) {
    const sortedTags = Object.entries(allTags).sort((a, b) => b[1] - a[1]).slice(0, 15);
    console.log("🏷️  태그 빈도 (상위 15개):");
    console.log("─".repeat(40));
    for (const [tag, count] of sortedTags) {
      console.log(`   #${tag.padEnd(18)} ${count}`);
    }
    console.log();
  }

  // 빈 카테고리 경고
  if (emptyCategories.length > 0) {
    console.log("⚠️  빈 카테고리:");
    for (const name of emptyCategories) {
      console.log(`   - ${name}`);
    }
    console.log();
  }

  // 중복 URL
  if (duplicateUrls.length > 0) {
    console.log("🔴 중복 URL 감지:");
    for (const { url, file } of duplicateUrls) {
      console.log(`   ${url} (in ${file})`);
    }
    console.log();
  }

  // 에러
  if (errors.length > 0) {
    console.log("🚨 데이터 무결성 문제:");
    for (const err of errors) {
      console.log(`   ${err}`);
    }
    console.log();
  }

  // 최종 판정
  const hasIssues = duplicateUrls.length > 0 || errors.length > 0;
  if (hasIssues) {
    console.log("─".repeat(60));
    console.log("❌ 데이터 검증 실패 — 위의 문제를 확인하세요.");
    process.exit(1);
  } else {
    console.log("─".repeat(60));
    console.log("✅ 데이터 검증 통과 — 문제 없음");
  }
  console.log();
}

main().catch((err) => {
  console.error("통계 스크립트 오류:", err);
  process.exit(1);
});
