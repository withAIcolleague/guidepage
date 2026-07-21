import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const rootDir = process.cwd();
const requireFromScript = createRequire(import.meta.url);

function loadTypeScriptModule(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  const source = fs.readFileSync(absolutePath, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: absolutePath,
  }).outputText;
  const commonJsModule = { exports: {} };
  const sandbox = {
    exports: commonJsModule.exports,
    module: commonJsModule,
    require: requireFromScript,
  };

  vm.runInNewContext(compiled, sandbox, { filename: absolutePath });
  return commonJsModule.exports;
}

function normalize(value) {
  return value.trim().toLowerCase();
}

function buildSearchResults(workflowCategories, workflowChains, query) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  return workflowCategories.flatMap((category) =>
    category.sections.flatMap((section) =>
      section.chainIds.flatMap((chainId) => {
        const chain = workflowChains.find((item) => item.id === chainId);
        if (!chain) return [];

        return chain.nodes.flatMap((node) =>
          node.tools.flatMap((tool, toolIndex) => {
            const haystack = normalize(
              [
                category.name,
                category.description,
                section.name,
                section.description,
                chain.name,
                chain.description,
                node.role,
                node.searchQuery ?? "",
                tool.name,
                tool.url,
              ].join(" "),
            );

            return haystack.includes(normalizedQuery)
              ? [{ category, section, chain, node, tool, toolIndex }]
              : [];
          }),
        );
      }),
    ),
  );
}

const { workflowCategories } = loadTypeScriptModule("src/data/workflow-categories.ts");
const { workflowChains } = loadTypeScriptModule("src/data/quick-links.ts");

const checks = [
  { query: "기하학", expectedChainId: "pure-forms-history" },
  { query: "양자", expectedChainId: "micro-world-history" },
  { query: "상대성", expectedChainId: "macro-world-history" },
  { query: "빅뱅", expectedChainId: "cosmic-structure-history" },
  { query: "시장", expectedChainId: "exchange-market-history" },
  { query: "헌법", expectedChainId: "state-law-history" },
  { query: "도시", expectedChainId: "city-community-history" },
  { query: "의식", expectedChainId: "consciousness-mind-history" },
  { query: "교육", expectedChainId: "learning-education-history" },
  { query: "정신건강", expectedChainId: "care-rest-history" },
  { query: "문자", expectedChainId: "language-writing-history" },
  { query: "예술", expectedChainId: "art-aesthetics-history" },
  { query: "아카이브", expectedChainId: "memory-archives-history" },
  { query: "진화", expectedChainId: "origin-evolution-history" },
  { query: "인공지능", expectedChainId: "automation-intelligence-history" },
];

const errors = [];

for (const check of checks) {
  const results = buildSearchResults(workflowCategories, workflowChains, check.query);
  const matched = results.some((result) => result.chain.id === check.expectedChainId);

  if (!matched) {
    const foundChainIds = [...new Set(results.map((result) => result.chain.id))];
    errors.push(
      `Search query "${check.query}" did not return ${check.expectedChainId}. Found: ${
        foundChainIds.length > 0 ? foundChainIds.join(", ") : "(none)"
      }`,
    );
  }
}

if (errors.length > 0) {
  console.error(`Search validation failed with ${errors.length} error(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Search validation passed for ${checks.length} representative queries.`);
