import { readFileSync } from "node:fs";

const css = readFileSync("src/app/globals.css", "utf8");

const TEXT_PAIRS = [
  ["background", "foreground"],
  ["card", "card-foreground"],
  ["popover", "popover-foreground"],
  ["primary", "primary-foreground"],
  ["secondary", "secondary-foreground"],
  ["muted", "muted-foreground"],
  ["accent", "accent-foreground"],
  ["sidebar", "sidebar-foreground"],
  ["sidebar-primary", "sidebar-primary-foreground"],
  ["sidebar-accent", "sidebar-accent-foreground"],
];

function parseBlock(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`));
  if (!match) {
    throw new Error(`Missing CSS block: ${selector}`);
  }

  return Object.fromEntries(
    [...match[1].matchAll(/--([a-z0-9-]+):\s*([^;]+);/gi)].map(([, key, value]) => [
      key,
      value.trim(),
    ]),
  );
}

function parseOklch(value) {
  const match = value.match(
    /^oklch\(\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+%?))?\s*\)$/i,
  );

  if (!match) {
    throw new Error(`Unsupported color format: ${value}`);
  }

  const [, l, c, h, alpha = "1"] = match;

  return {
    l: Number(l),
    c: Number(c),
    h: Number(h),
    alpha: alpha.endsWith("%") ? Number(alpha.slice(0, -1)) / 100 : Number(alpha),
  };
}

function linearToSrgb(channel) {
  const clamped = Math.min(Math.max(channel, 0), 1);

  return clamped <= 0.0031308
    ? 12.92 * clamped
    : 1.055 * clamped ** (1 / 2.4) - 0.055;
}

function oklchToSrgb({ l, c, h }) {
  const hue = (h * Math.PI) / 180;
  const a = c * Math.cos(hue);
  const b = c * Math.sin(hue);

  const lmsL = l + 0.3963377774 * a + 0.2158037573 * b;
  const lmsM = l - 0.1055613458 * a - 0.0638541728 * b;
  const lmsS = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = lmsL ** 3;
  const m3 = lmsM ** 3;
  const s3 = lmsS ** 3;

  return {
    r: linearToSrgb(4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3),
    g: linearToSrgb(-1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3),
    b: linearToSrgb(-0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3),
  };
}

function relativeLuminance({ r, g, b }) {
  const convert = (channel) =>
    channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  const [linearR, linearG, linearB] = [r, g, b].map(convert);

  return 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
}

function contrastRatio(colorA, colorB) {
  const luminanceA = relativeLuminance(oklchToSrgb(parseOklch(colorA)));
  const luminanceB = relativeLuminance(oklchToSrgb(parseOklch(colorB)));
  const light = Math.max(luminanceA, luminanceB);
  const dark = Math.min(luminanceA, luminanceB);

  return (light + 0.05) / (dark + 0.05);
}

function assertThemeContrast(themeName, tokens) {
  const failures = [];

  for (const [backgroundToken, foregroundToken] of TEXT_PAIRS) {
    const background = tokens[backgroundToken];
    const foreground = tokens[foregroundToken];

    if (!background || !foreground) {
      failures.push(`${themeName}: missing ${backgroundToken}/${foregroundToken}`);
      continue;
    }

    const ratio = contrastRatio(background, foreground);

    if (ratio < 4.5) {
      failures.push(
        `${themeName}: ${foregroundToken} on ${backgroundToken} contrast ${ratio.toFixed(
          2,
        )}:1`,
      );
    }
  }

  return failures;
}

const failures = [
  ...assertThemeContrast("light", parseBlock(":root")),
  ...assertThemeContrast("dark", parseBlock(".dark")),
];

if (failures.length > 0) {
  console.error("Theme contrast validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Theme contrast validation passed for ${TEXT_PAIRS.length * 2} text pairs.`);
