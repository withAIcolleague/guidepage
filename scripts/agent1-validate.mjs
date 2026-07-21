#!/usr/bin/env node

/**
 * Agent 1: Site Validation & Metadata Extraction
 *
 * Reads raw URL entries from scripts/input/raw-urls.json,
 * validates each entry (structure + optional HTTP reachability),
 * and writes results to scripts/output/validated-sites.json.
 *
 * CLI flags:
 *   --dry-run   Skip HTTP validation, just check JSON structure (default)
 *   --validate  Make HTTP HEAD requests to verify sites are reachable
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";
import https from "node:https";

// ---------------------------------------------------------------------------
// Path helpers
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

const INPUT_FILE = path.join(PROJECT_ROOT, "scripts", "input", "raw-urls.json");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "scripts", "output");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "validated-sites.json");

// ---------------------------------------------------------------------------
// CLI flag parsing
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const shouldValidateHttp = args.includes("--validate");
const isDryRun = !shouldValidateHttp; // default behaviour

// ---------------------------------------------------------------------------
// Colours (ANSI escape codes)
// ---------------------------------------------------------------------------
const c = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
};

// ---------------------------------------------------------------------------
// HTTP HEAD request helper (uses built-in http / https modules)
// ---------------------------------------------------------------------------
function headRequest(targetUrl, timeoutMs = 5000) {
  return new Promise((resolve) => {
    let parsedUrl;
    try {
      parsedUrl = new URL(targetUrl);
    } catch {
      resolve({ ok: false, reason: "Malformed URL" });
      return;
    }

    const lib = parsedUrl.protocol === "https:" ? https : http;

    const req = lib.request(
      targetUrl,
      { method: "HEAD", timeout: timeoutMs },
      (res) => {
        // Any response (even 4xx/5xx) means the server is reachable
        const ok = res.statusCode >= 200 && res.statusCode < 400;
        resolve({
          ok,
          statusCode: res.statusCode,
          reason: ok ? undefined : `HTTP ${res.statusCode}`,
        });
        res.resume(); // drain
      }
    );

    req.on("timeout", () => {
      req.destroy();
      resolve({ ok: false, reason: "Timeout (5 s)" });
    });

    req.on("error", (err) => {
      resolve({ ok: false, reason: err.message });
    });

    req.end();
  });
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
function validateStructure(entry, index) {
  const issues = [];

  if (!entry || typeof entry !== "object") {
    return { isValid: false, reason: `Entry #${index + 1} is not an object` };
  }

  if (typeof entry.url !== "string" || entry.url.trim() === "") {
    issues.push("url is missing or empty");
  } else if (
    !entry.url.startsWith("http://") &&
    !entry.url.startsWith("https://")
  ) {
    issues.push("url must start with http:// or https://");
  }

  if (typeof entry.siteName !== "string" || entry.siteName.trim() === "") {
    issues.push("siteName is missing or empty");
  }

  if (typeof entry.description !== "string" || entry.description.trim() === "") {
    issues.push("description is missing or empty");
  }

  if (issues.length > 0) {
    return { isValid: false, reason: issues.join("; ") };
  }

  return { isValid: true };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(
    `\n${c.bold}${c.cyan}🚀 Agent 1 – Site Validation & Metadata Extraction${c.reset}\n`
  );
  console.log(
    `${c.dim}   Mode : ${isDryRun ? "🏜️  Dry-run (structure only)" : "🌐 HTTP validation (HEAD requests)"}${c.reset}`
  );
  console.log(`${c.dim}   Input: ${INPUT_FILE}${c.reset}`);
  console.log(`${c.dim}   Output: ${OUTPUT_FILE}${c.reset}\n`);

  // ---- Read input --------------------------------------------------------
  let rawText;
  try {
    rawText = await fs.readFile(INPUT_FILE, "utf-8");
  } catch (err) {
    console.error(
      `${c.red}❌ Failed to read input file:${c.reset} ${INPUT_FILE}`
    );
    console.error(`   ${c.dim}${err.message}${c.reset}`);
    process.exit(1);
  }

  let entries;
  try {
    entries = JSON.parse(rawText);
  } catch (err) {
    console.error(
      `${c.red}❌ Input file is not valid JSON:${c.reset} ${err.message}`
    );
    process.exit(1);
  }

  if (!Array.isArray(entries)) {
    console.error(`${c.red}❌ Input JSON must be an array of objects.${c.reset}`);
    process.exit(1);
  }

  console.log(
    `${c.cyan}📋 Found ${c.bold}${entries.length}${c.reset}${c.cyan} entries to validate${c.reset}\n`
  );

  // ---- Process entries ---------------------------------------------------
  const results = [];
  let validCount = 0;
  let invalidCount = 0;

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const label =
      entry && typeof entry === "object" && entry.siteName
        ? entry.siteName
        : `Entry #${i + 1}`;

    // 1. Structural validation
    const structural = validateStructure(entry, i);

    if (!structural.isValid) {
      invalidCount++;
      console.log(
        `  ${c.red}❌ ${label}${c.reset}  ${c.dim}– ${structural.reason}${c.reset}`
      );
      results.push({
        url: entry?.url ?? null,
        isValid: false,
        siteName: entry?.siteName ?? null,
        description: entry?.description ?? null,
        reason: structural.reason,
      });
      continue;
    }

    // 2. Optional HTTP HEAD validation
    if (shouldValidateHttp) {
      const httpResult = await headRequest(entry.url);

      if (httpResult.ok) {
        validCount++;
        console.log(
          `  ${c.green}✅ ${label}${c.reset}  ${c.dim}(${entry.url}) – HTTP ${httpResult.statusCode ?? "OK"}${c.reset}`
        );
        results.push({
          url: entry.url,
          isValid: true,
          siteName: entry.siteName,
          description: entry.description,
        });
      } else {
        invalidCount++;
        console.log(
          `  ${c.red}❌ ${label}${c.reset}  ${c.dim}(${entry.url}) – ${httpResult.reason}${c.reset}`
        );
        results.push({
          url: entry.url,
          isValid: false,
          siteName: entry.siteName,
          description: entry.description,
          reason: httpResult.reason,
        });
      }
    } else {
      // Dry-run: structure is valid → mark valid
      validCount++;
      console.log(
        `  ${c.green}✅ ${label}${c.reset}  ${c.dim}(${entry.url})${c.reset}`
      );
      results.push({
        url: entry.url,
        isValid: true,
        siteName: entry.siteName,
        description: entry.description,
      });
    }
  }

  // ---- Write output ------------------------------------------------------
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(results, null, 2), "utf-8");
  } catch (err) {
    console.error(
      `\n${c.red}❌ Failed to write output file:${c.reset} ${err.message}`
    );
    process.exit(1);
  }

  // ---- Summary -----------------------------------------------------------
  console.log(`\n${c.bold}${c.cyan}📊 Summary${c.reset}`);
  console.log(`   Total  : ${entries.length}`);
  console.log(`   ${c.green}Valid  : ${validCount}${c.reset}`);
  console.log(`   ${c.red}Invalid: ${invalidCount}${c.reset}`);
  console.log(
    `\n${c.green}✨ Results written to ${c.bold}${OUTPUT_FILE}${c.reset}\n`
  );
}

main().catch((err) => {
  console.error(`\n${c.red}💥 Unexpected error:${c.reset} ${err.message}`);
  process.exit(1);
});
