import { readFileSync } from "node:fs";

const quickLinksSource = readFileSync("src/components/quick-links-section.tsx", "utf8");

const checks = [
  {
    name: "landing card shape helper",
    pass: /function landingCardClassName/.test(quickLinksSource),
  },
  {
    name: "asymmetric landing spans",
    pass: /lg:col-span-2/.test(quickLinksSource) && /lg:mt-10/.test(quickLinksSource),
  },
  {
    name: "landing grid supports irregular cards",
    pass: /lg:grid-cols-4/.test(quickLinksSource) && /lg:items-start/.test(quickLinksSource),
  },
  {
    name: "detail workflow split remains structured",
    pass: /lg:grid-cols-\[minmax\(0,1fr\)_minmax\(420px,50vw\)\]/.test(
      quickLinksSource,
    ),
  },
];

const failures = checks.filter((check) => !check.pass);

if (failures.length > 0) {
  console.error("Layout validation failed:");
  failures.forEach((check) => console.error(`- ${check.name}`));
  process.exit(1);
}

console.log(`Layout validation passed for ${checks.length} structural checks.`);
