import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { spawn } from "node:child_process";

const routes = [
  "/",
  "/about/",
  "/career/",
  "/career/events/",
  "/career/operations/",
  "/career/staffing/",
  "/career/timeline/",
  "/chronicles/",
];

const port = 4173;
const baseUrl = `http://127.0.0.1:${port}`;
const outputRoot = resolve("dist/client");

async function waitForServer(url, timeoutMs = 120000) {
  const startedAt = Date.now();
  for (;;) {
    try {
      const response = await fetch(url, { method: "GET" });
      if (response.ok || response.status === 403 || response.status === 404) {
        return;
      }
    } catch {
      // Keep waiting until the server comes up.
    }

    if (Date.now() - startedAt > timeoutMs) {
      throw new Error(`Timed out waiting for ${url}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

function routeToOutputPath(route) {
  if (route === "/") {
    return resolve(outputRoot, "index.html");
  }

  const normalized = route.endsWith("/") ? route : `${route}/`;
  return resolve(outputRoot, `.${normalized}index.html`);
}

function pathToOutputPath(pathname) {
  if (pathname === "/404.html") {
    return resolve(outputRoot, "404.html");
  }

  return routeToOutputPath(pathname);
}

async function fetchPage(route, { allow404 = false } = {}) {
  const response = await fetch(`${baseUrl}${route}`);
  if (!response.ok && !(allow404 && response.status === 404)) {
    throw new Error(`Failed to fetch ${route}: ${response.status}`);
  }

  return response.text();
}

const server = spawn(
  process.platform === "win32" ? "npm.cmd" : "npm",
  ["run", "start", "--", "--host", "127.0.0.1", `--port`, `${port}`],
  {
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      PORT: `${port}`,
    },
  },
);

server.stdout.on("data", (chunk) => {
  process.stdout.write(chunk);
});
server.stderr.on("data", (chunk) => {
  process.stderr.write(chunk);
});

try {
  await waitForServer(baseUrl);

  for (const route of routes) {
    const html = await fetchPage(route);
    const outputPath = routeToOutputPath(route);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);
    console.log(`Prerendered ${route} -> ${outputPath}`);
  }

  const notFoundHtml = await fetchPage("/definitely-not-a-real-page", { allow404: true });
  const notFoundOutputPath = pathToOutputPath("/404.html");
  await mkdir(dirname(notFoundOutputPath), { recursive: true });
  await writeFile(notFoundOutputPath, notFoundHtml);
  console.log(`Prerendered /404.html -> ${notFoundOutputPath}`);
} finally {
  server.kill("SIGTERM");
}
