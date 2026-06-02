import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const DEFAULT_URL = "https://guidepage-gray.vercel.app/";
const TARGET_URL = process.env.GUIDEPAGE_QA_URL ?? DEFAULT_URL;
const QA_MODE = process.argv.includes("--desktop") ? "desktop" : "mobile";
const VIEWPORT =
  QA_MODE === "desktop"
    ? { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false }
    : { width: 390, height: 844, deviceScaleFactor: 3, mobile: true };
const USER_AGENT =
  QA_MODE === "desktop"
    ? "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36"
    : "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
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

async function clickByText(client, text) {
  return evaluate(
    client,
    `(() => {
      const button = [...document.querySelectorAll("button")].find((item) =>
        item.textContent?.includes(${JSON.stringify(text)})
      );
      if (!button) return false;
      button.click();
      return true;
    })()`,
  );
}

async function clickByAriaLabel(client, label) {
  return evaluate(
    client,
    `(() => {
      const button = document.querySelector(${JSON.stringify(
        `button[aria-label="${label}"]`,
      )});
      if (!button || button.disabled) return false;
      button.click();
      return true;
    })()`,
  );
}

async function clickBySelector(client, selector) {
  return evaluate(
    client,
    `(() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      if (!element || element.disabled) return false;
      element.click();
      return true;
    })()`,
  );
}

async function readMobileState(client) {
  return evaluate(
    client,
    `(() => {
      const text = document.body.innerText;
      const doc = document.documentElement;
      const body = document.body;
      const previewPanel = document.querySelector('[data-preview-panel="embedded"]');
      const previewFrame = document.querySelector('[data-preview-frame="true"]');
      const previewPanelRect = previewPanel?.getBoundingClientRect();
      const previewFrameRect = previewFrame?.getBoundingClientRect();
      const buttons = [...document.querySelectorAll("button")].map((button) => ({
        text: button.textContent?.replace(/\\s+/g, " ").trim() ?? "",
        ariaLabel: button.getAttribute("aria-label"),
        disabled: button.disabled,
      }));

      return {
        url: location.href,
        title: document.title,
        viewport: { width: innerWidth, height: innerHeight },
        scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
        overflowX: Math.max(doc.scrollWidth, body.scrollWidth) > innerWidth + 2,
        hasLandingTitle: text.includes("NEXINOUS 워크플로우 맵"),
        hasSearchInput: Boolean(document.querySelector('input[placeholder="맥락, 단계, 도구 검색"]')),
        hasBackToCategories: text.includes("대분류로 돌아가기"),
        hasMiddleCategoryLabel: text.includes("중분류"),
        hasDetailCategoryLabel: text.includes("세부분류"),
        hasPreviewFallbackCopy: text.includes("새 탭에서 보기") || text.includes("미리보기가 제한된 사이트입니다"),
        preview: {
          hasPanel: Boolean(previewPanel),
          hasFrame: Boolean(previewFrame),
          panelHeight: previewPanelRect?.height ?? 0,
          panelWidth: previewPanelRect?.width ?? 0,
          frameHeight: previewFrameRect?.height ?? 0,
          frameWidth: previewFrameRect?.width ?? 0,
        },
        buttons,
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
const userDataDir = mkdtempSync(join(tmpdir(), `guidepage-${QA_MODE}-qa-`));
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
    userAgent: USER_AGENT,
  });

  const loadEvent = client.once("Page.loadEventFired");
  await client.send("Page.navigate", { url: TARGET_URL });
  await Promise.race([loadEvent, delay(15000)]);
  await delay(1500);

  const landing = await readMobileState(client);
  assert(landing.viewport.width === VIEWPORT.width, `${QA_MODE} viewport width was not applied.`);
  assert(landing.hasLandingTitle, "Landing title was not rendered.");
  assert(landing.hasSearchInput, "Landing search input was not rendered.");
  assert(!landing.overflowX, `Landing page has horizontal overflow on ${QA_MODE}.`);

  const openedCategory = await clickByText(client, "공학·기술");
  assert(openedCategory, "Could not open engineering category.");
  await delay(700);

  let detail = await readMobileState(client);
  assert(detail.hasBackToCategories, "Detail mode did not open after category click.");
  assert(detail.hasMiddleCategoryLabel, "Middle category label is missing.");
  assert(!detail.overflowX, `Detail page has horizontal overflow on ${QA_MODE}.`);

  await clickByAriaLabel(client, "다음 중분류");
  await delay(300);
  detail = await readMobileState(client);
  assert(!detail.overflowX, "Middle category paging caused horizontal overflow.");

  const selectedSection = await clickByText(client, "개 세부분류");
  assert(selectedSection, "Could not select a middle category card.");
  await delay(500);

  const selectedChain = await clickBySelector(client, 'button[role="tab"]');
  assert(selectedChain, "Could not select a workflow chain.");
  await delay(500);

  detail = await readMobileState(client);
  assert(detail.hasDetailCategoryLabel, "Detail category area is missing.");
  assert(!detail.overflowX, "Workflow card paging has horizontal overflow.");

  await clickByAriaLabel(client, "다음 단계");
  await delay(300);
  detail = await readMobileState(client);
  assert(!detail.overflowX, "Node paging caused horizontal overflow.");

  const openedTheory = await clickBySelector(client, '[data-workflow-node-select="true"]');
  assert(openedTheory, "Could not open a workflow theory preview.");
  await delay(1200);

  detail = await readMobileState(client);
  const minimumPreviewHeight = QA_MODE === "desktop" ? 420 : 500;
  const theoryPreview = detail.preview;
  assert(detail.preview.hasPanel, "Embedded theory preview panel did not open.");
  assert(detail.preview.hasFrame, "Embedded theory preview iframe did not open.");
  assert(
    detail.preview.panelHeight >= minimumPreviewHeight,
    `Embedded theory preview panel is too short on ${QA_MODE}: ${detail.preview.panelHeight}px.`,
  );
  assert(
    detail.preview.frameHeight >= minimumPreviewHeight - 80,
    `Embedded theory preview iframe is too short on ${QA_MODE}: ${detail.preview.frameHeight}px.`,
  );

  const openedTool = await clickBySelector(client, '[data-workflow-tool-button="true"]');
  assert(openedTool, "Could not open a workflow tool preview.");
  await delay(700);

  detail = await readMobileState(client);
  const toolPreview = detail.preview;
  assert(detail.preview.hasPanel, "Embedded preview panel did not open.");
  assert(
    detail.preview.panelHeight >= minimumPreviewHeight,
    `Embedded preview panel is too short on ${QA_MODE}: ${detail.preview.panelHeight}px.`,
  );
  if (detail.preview.hasFrame) {
    assert(
      detail.preview.frameHeight >= minimumPreviewHeight - 80,
      `Embedded preview iframe is too short on ${QA_MODE}: ${detail.preview.frameHeight}px.`,
    );
  }

  client.close();

  console.log(
    JSON.stringify(
      {
        status: "passed",
        mode: QA_MODE,
        targetUrl: TARGET_URL,
        viewport: landing.viewport,
        landingScrollWidth: landing.scrollWidth,
        detailScrollWidth: detail.scrollWidth,
        theoryPreview,
        toolPreview,
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
