/**
 * 디렉토리 파이프라인 통합 러너
 *
 * 3개 에이전트를 순차적으로 실행합니다:
 *   1. agent1-validate.mjs → URL 검증 및 메타데이터 정제
 *   2. agent2-classify.mjs → 지식 트리 분류
 *   3. agent3-route.mjs   → 대분류별 파일 라우팅
 *
 * 사용법:
 *   node scripts/run-directory-pipeline.mjs
 *   node scripts/run-directory-pipeline.mjs --validate   # HTTP 검증 포함
 *   node scripts/run-directory-pipeline.mjs --preview    # 파일 쓰기 없이 미리보기
 */

import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const flags = process.argv.slice(2);
const useValidate = flags.includes("--validate");
const usePreview = flags.includes("--preview");

const SEPARATOR = "═".repeat(60);

function header(step, title) {
  console.log();
  console.log(SEPARATOR);
  console.log(`  🔹 Step ${step}: ${title}`);
  console.log(SEPARATOR);
  console.log();
}

async function runAgent(scriptName, args = []) {
  const scriptPath = path.join(__dirname, scriptName);
  try {
    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [scriptPath, ...args],
      { cwd: path.join(__dirname, ".."), encoding: "utf-8", timeout: 60_000 }
    );
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    return true;
  } catch (err) {
    console.error(`\n❌ ${scriptName} 실행 실패:`);
    if (err.stdout) console.log(err.stdout);
    if (err.stderr) console.error(err.stderr);
    console.error(err.message);
    return false;
  }
}

async function main() {
  const startTime = Date.now();

  console.log();
  console.log("🚀 NEXINOUS Directory Pipeline 시작");
  console.log(`   시각: ${new Date().toISOString()}`);
  console.log(`   옵션: ${useValidate ? "HTTP 검증 포함" : "구조 검증만"} | ${usePreview ? "미리보기 모드" : "실제 반영"}`);

  // Step 1: Validate
  header(1, "사이트 정제 및 메타데이터 추출 (Agent 1)");
  const agent1Args = useValidate ? ["--validate"] : ["--dry-run"];
  const step1Ok = await runAgent("agent1-validate.mjs", agent1Args);
  if (!step1Ok) {
    console.error("\n⛔ Step 1 실패. 파이프라인을 중단합니다.");
    process.exit(1);
  }

  // Step 2: Classify
  header(2, "지식 트리 분류 및 매핑 (Agent 2)");
  const step2Ok = await runAgent("agent2-classify.mjs");
  if (!step2Ok) {
    console.error("\n⛔ Step 2 실패. 파이프라인을 중단합니다.");
    process.exit(1);
  }

  // Step 3: Route
  header(3, "대분류별 파일 라우팅 (Agent 3)");
  const agent3Args = usePreview ? ["--preview"] : [];
  const step3Ok = await runAgent("agent3-route.mjs", agent3Args);
  if (!step3Ok) {
    console.error("\n⛔ Step 3 실패. 파이프라인을 중단합니다.");
    process.exit(1);
  }

  // Summary
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log();
  console.log(SEPARATOR);
  console.log(`  ✅ 파이프라인 완료 (${elapsed}초 소요)`);
  console.log(SEPARATOR);
  console.log();
  console.log("📊 통계를 확인하려면: npm run directory:stats");
  console.log();
}

main().catch((err) => {
  console.error("파이프라인 오류:", err);
  process.exit(1);
});
