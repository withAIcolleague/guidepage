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

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isKebabCase(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function isHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function pushDuplicateErrors(values, label, errors) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) {
      errors.push(`${label} has duplicate value: ${value}`);
    }
    seen.add(value);
  }
}

function validate() {
  const errors = [];
  const warnings = [];
  const { workflowCategories } = loadTypeScriptModule("src/data/workflow-categories.ts");
  const { workflowChains } = loadTypeScriptModule("src/data/quick-links.ts");

  if (!Array.isArray(workflowCategories)) {
    errors.push("workflowCategories must be an array.");
  }
  if (!Array.isArray(workflowChains)) {
    errors.push("workflowChains must be an array.");
  }
  if (errors.length > 0) {
    return { errors, warnings };
  }

  const chainIds = workflowChains.map((chain) => chain.id);
  const chainIdSet = new Set(chainIds);
  pushDuplicateErrors(chainIds, "WorkflowChain.id", errors);

  for (const category of workflowCategories) {
    if (!isPlainObject(category)) {
      errors.push("WorkflowCategory entries must be objects.");
      continue;
    }

    if (!isNonEmptyString(category.id)) {
      errors.push("WorkflowCategory.id is required.");
    } else if (!isKebabCase(category.id)) {
      errors.push(`WorkflowCategory.id must be kebab-case: ${category.id}`);
    }
    if (!isNonEmptyString(category.name)) {
      errors.push(`WorkflowCategory.name is required for ${category.id ?? "(unknown)"}.`);
    }
    if (!isNonEmptyString(category.description)) {
      errors.push(`WorkflowCategory.description is required for ${category.id ?? "(unknown)"}.`);
    }
    if (!isNonEmptyString(category.icon)) {
      errors.push(`WorkflowCategory.icon is required for ${category.id ?? "(unknown)"}.`);
    }
    if (!Array.isArray(category.sections)) {
      errors.push(`WorkflowCategory.sections must be an array for ${category.id ?? "(unknown)"}.`);
      continue;
    }

    let categoryValidChainCount = 0;

    pushDuplicateErrors(
      category.sections.map((section) => section.id),
      `WorkflowCategorySection.id in ${category.id}`,
      errors,
    );

    for (const section of category.sections) {
      if (!isPlainObject(section)) {
        errors.push(`Section entries must be objects in ${category.id}.`);
        continue;
      }
      if (!isNonEmptyString(section.id)) {
        errors.push(`WorkflowCategorySection.id is required in ${category.id}.`);
      } else if (!isKebabCase(section.id)) {
        errors.push(`WorkflowCategorySection.id must be kebab-case: ${section.id}`);
      }
      if (!isNonEmptyString(section.name)) {
        errors.push(`WorkflowCategorySection.name is required for ${section.id ?? "(unknown)"}.`);
      }
      if (!isNonEmptyString(section.description)) {
        errors.push(
          `WorkflowCategorySection.description is required for ${section.id ?? "(unknown)"}.`,
        );
      }
      if (!Array.isArray(section.chainIds)) {
        errors.push(`WorkflowCategorySection.chainIds must be an array for ${section.id}.`);
        continue;
      }

      pushDuplicateErrors(section.chainIds, `chainIds in ${section.id}`, errors);
      for (const chainId of section.chainIds) {
        if (!chainIdSet.has(chainId)) {
          errors.push(`Section ${section.id} references missing WorkflowChain.id: ${chainId}`);
        } else {
          categoryValidChainCount += 1;
        }
      }
    }

    if (categoryValidChainCount === 0) {
      errors.push(`WorkflowCategory must reference at least one valid chain: ${category.id}`);
    }
  }

  pushDuplicateErrors(
    workflowCategories.map((category) => category.id),
    "WorkflowCategory.id",
    errors,
  );

  for (const chain of workflowChains) {
    if (!isPlainObject(chain)) {
      errors.push("WorkflowChain entries must be objects.");
      continue;
    }

    if (!isNonEmptyString(chain.id)) {
      errors.push("WorkflowChain.id is required.");
    } else if (!isKebabCase(chain.id)) {
      errors.push(`WorkflowChain.id must be kebab-case: ${chain.id}`);
    }
    if (!isNonEmptyString(chain.name)) {
      errors.push(`WorkflowChain.name is required for ${chain.id ?? "(unknown)"}.`);
    }
    if (!isNonEmptyString(chain.description)) {
      errors.push(`WorkflowChain.description is required for ${chain.id ?? "(unknown)"}.`);
    }
    if (!isNonEmptyString(chain.icon)) {
      errors.push(`WorkflowChain.icon is required for ${chain.id ?? "(unknown)"}.`);
    }
    if (!isNonEmptyString(chain.gradient)) {
      errors.push(`WorkflowChain.gradient is required for ${chain.id ?? "(unknown)"}.`);
    }
    if (!Array.isArray(chain.nodes) || chain.nodes.length === 0) {
      errors.push(`WorkflowChain.nodes must contain at least one node for ${chain.id}.`);
      continue;
    }

    pushDuplicateErrors(
      chain.nodes.map((node) => node.role),
      `FlowNode.role in ${chain.id}`,
      errors,
    );

    for (const node of chain.nodes) {
      const nodeLabel = `${chain.id} / ${node?.role ?? "(unknown node)"}`;
      if (!isPlainObject(node)) {
        errors.push(`FlowNode entries must be objects in ${chain.id}.`);
        continue;
      }
      if (!isNonEmptyString(node.role)) {
        errors.push(`FlowNode.role is required in ${chain.id}.`);
      }
      if (!Array.isArray(node.tools) || node.tools.length === 0) {
        errors.push(`FlowNode.tools must contain at least one tool for ${nodeLabel}.`);
        continue;
      }
      if (!node.theoryUrl && !node.searchQuery) {
        warnings.push(`FlowNode should include theoryUrl or searchQuery: ${nodeLabel}`);
      }
      if (node.theoryUrl && !isHttpUrl(node.theoryUrl)) {
        errors.push(`Invalid theoryUrl for ${nodeLabel}: ${node.theoryUrl}`);
      }
      if (node.searchQuery !== undefined && !isNonEmptyString(node.searchQuery)) {
        errors.push(`FlowNode.searchQuery must be non-empty when present for ${nodeLabel}.`);
      }

      const toolUrls = node.tools.map((tool) => tool.url);
      pushDuplicateErrors(toolUrls, `tool.url in ${nodeLabel}`, errors);

      for (const tool of node.tools) {
        if (!isPlainObject(tool)) {
          errors.push(`Tool entries must be objects for ${nodeLabel}.`);
          continue;
        }
        if (!isNonEmptyString(tool.name)) {
          errors.push(`Tool.name is required for ${nodeLabel}.`);
        }
        if (!isNonEmptyString(tool.url) || !isHttpUrl(tool.url)) {
          errors.push(`Tool.url must be a valid http(s) URL for ${nodeLabel}: ${tool.url}`);
        }
        if (node.theoryUrl && tool.url === node.theoryUrl) {
          warnings.push(`theoryUrl duplicates a tool URL for ${nodeLabel}: ${tool.url}`);
        }
      }
    }
  }

  return { errors, warnings };
}

const { errors, warnings } = validate();

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

if (errors.length > 0) {
  console.error(`Data validation failed with ${errors.length} error(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Data validation passed${warnings.length > 0 ? ` with ${warnings.length} warning(s)` : ""}.`,
);
