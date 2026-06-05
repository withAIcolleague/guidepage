import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const DEFAULT_URL = "https://guidepage-gray.vercel.app/";
const TARGET_URL = process.env.GUIDEPAGE_QA_URL ?? DEFAULT_URL;
const VIEWPORT = { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false };
const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];

const SEARCH_CHECKS = [
  { query: "지역사회", expected: "지역사회 이슈 분석 플로우" },
  { query: "미디어 반응", expected: "여론·미디어 반응 분석 플로우" },
  { query: "생명과학 논문", expected: "생명과학 논문 탐색 플로우" },
  { query: "생활습관", expected: "생활습관 건강 계획 플로우" },
  { query: "정책 제안", expected: "정책 제안 검토 플로우" },
  { query: "식품 안전", expected: "식품 안전 정보 검증 플로우" },
];

async function pathExists(path) {
  try {
    const { access } = await import("node:fs/promises");
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function findChrome() {
  for (const path of CHROME_PATHS) {
    if (await pathExists(path)) return path;
  }

  throw new Error("Chrome or Edge executable was not found.");
}

function findFreePort() {
  return 41000 + Math.floor(Math.random() * 10000);
}

async function waitForJsonVersion(port, timeoutMs = 10000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return response.json();
    } catch {
      await delay(150);
    }
  }

  throw new Error("Chrome DevTools endpoint did not become ready.");
}

async function createPageTarget(port) {
  const endpoint = `http://127.0.0.1:${port}/json/new?${encodeURIComponent("about:blank")}`;
  let response = await fetch(endpoint, { method: "PUT" });

  if (!response.ok) {
    response = await fetch(endpoint);
  }

  if (!response.ok) {
    throw new Error(`Could not create Chrome target: ${response.status}`);
  }

  return response.json();
}

function createCdpClient(wsUrl) {
  const socket = new WebSocket(wsUrl);
  let nextId = 1;
  const pending = new Map();
  const listeners = new Map();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);

    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);

      if (message.error) {
        reject(new Error(message.error.message));
      } else {
        resolve(message.result ?? {});
      }

      return;
    }

    const callbacks = listeners.get(message.method) ?? [];
    callbacks.forEach((callback) => callback(message.params ?? {}));
  });

  const opened = new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  return {
    async send(method, params = {}) {
      await opened;
      const id = nextId;
      nextId += 1;

      socket.send(JSON.stringify({ id, method, params }));

      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
      });
    },
    once(method) {
      return new Promise((resolve) => {
        const callbacks = listeners.get(method) ?? [];
        const callback = (params) => {
          listeners.set(
            method,
            (listeners.get(method) ?? []).filter((item) => item !== callback),
          );
          resolve(params);
        };
        listeners.set(method, [...callbacks, callback]);
      });
    },
    close() {
      socket.close();
    },
  };
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text ?? "Runtime evaluation failed.");
  }

  return result.result.value;
}

async function setSearchQuery(client, query) {
  return evaluate(
    client,
    `(() => {
      const input = document.querySelector('input[placeholder="맥락, 단계, 도구 검색"]');
      if (!input) return false;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
      setter.call(input, ${JSON.stringify(query)});
      input.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: ${JSON.stringify(query)} }));
      return true;
    })()`,
  );
}

async function readSearchState(client) {
  return evaluate(
    client,
    `(() => {
      const text = document.body.innerText;
      const doc = document.documentElement;
      const body = document.body;
      return {
        text,
        viewport: { width: innerWidth, height: innerHeight },
        overflowX: Math.max(doc.scrollWidth, body.scrollWidth) > innerWidth + 2,
        hasLandingTitle: text.includes("NEXINOUS 워크플로우 맵"),
        hasSearchInput: Boolean(document.querySelector('input[placeholder="맥락, 단계, 도구 검색"]')),
      };
    })()`,
  );
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const chromePath = await findChrome();
const port = findFreePort();
const userDataDir = mkdtempSync(join(tmpdir(), "guidepage-workflow-smoke-"));
const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--no-first-run",
  "--no-default-browser-check",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${userDataDir}`,
  `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
  "about:blank",
]);

try {
  await waitForJsonVersion(port);
  const target = await createPageTarget(port);
  const client = createCdpClient(target.webSocketDebuggerUrl);

  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Emulation.setDeviceMetricsOverride", VIEWPORT);
  await client.send("Emulation.setUserAgentOverride", {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
  });

  const loadEvent = client.once("Page.loadEventFired");
  await client.send("Page.navigate", { url: TARGET_URL });
  await Promise.race([loadEvent, delay(15000)]);
  await delay(1500);

  const landing = await readSearchState(client);
  assert(landing.hasLandingTitle, "Landing title was not rendered.");
  assert(landing.hasSearchInput, "Landing search input was not rendered.");
  assert(!landing.overflowX, "Landing page has horizontal overflow.");

  const checked = [];

  for (const check of SEARCH_CHECKS) {
    const typed = await setSearchQuery(client, check.query);
    assert(typed, `Could not type search query: ${check.query}`);
    await delay(350);

    const state = await readSearchState(client);
    assert(!state.overflowX, `Search query caused horizontal overflow: ${check.query}`);
    assert(
      state.text.includes(check.expected),
      `Search query "${check.query}" did not render expected workflow "${check.expected}".`,
    );
    checked.push(check);
  }

  client.close();

  console.log(
    JSON.stringify(
      {
        status: "passed",
        targetUrl: TARGET_URL,
        viewport: landing.viewport,
        checked,
      },
      null,
      2,
    ),
  );
} finally {
  chrome.kill();
  await Promise.race([
    new Promise((resolve) => chrome.once("exit", resolve)),
    delay(2000),
  ]);

  try {
    rmSync(userDataDir, { recursive: true, force: true });
  } catch (error) {
    console.warn(`Temporary Chrome profile cleanup skipped: ${error.code}`);
  }
}
