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
  { query: "의사결정", expectedChainId: "decision-analysis" },
  { query: "기후", expectedChainId: "climate-environment-data" },
  { query: "건강 정보", expectedChainId: "health-information-verification" },
  { query: "서비스 약관", expectedChainId: "terms-policy-review" },
  { query: "작물 재배", expectedChainId: "crop-cultivation-research" },
  { query: "AI 서비스", expectedChainId: "ai-service-build" },
  { query: "프론트엔드", expectedChainId: "frontend-stack" },
  { query: "투자", expectedChainId: "investment-analysis" },
  { query: "음악", expectedChainId: "music-history-chain" },
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
