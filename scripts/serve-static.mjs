import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = resolve(projectRoot, "out");
const basePath = "/tessa";
const port = 4173;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
};

async function firstReadableFile(candidates) {
  for (const candidate of candidates) {
    const file = resolve(outputRoot, candidate);
    if (!file.startsWith(`${outputRoot}${sep}`) && file !== outputRoot) {
      continue;
    }
    try {
      await access(file);
      if ((await stat(file)).isFile()) return file;
    } catch {
      // Try the next static-file form.
    }
  }
  return undefined;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host}`);
  if (url.pathname !== basePath && !url.pathname.startsWith(`${basePath}/`)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const relative = decodeURIComponent(url.pathname.slice(basePath.length)).replace(
    /^\/+/,
    "",
  );
  const candidates = relative
    ? extname(relative)
      ? [relative]
      : [`${relative}.html`, `${relative}/index.html`]
    : ["index.html"];
  const file = await firstReadableFile(candidates);

  if (!file) {
    const notFound = resolve(outputRoot, "404.html");
    response.writeHead(404, { "Content-Type": contentTypes[".html"] });
    createReadStream(notFound).pipe(response);
    return;
  }

  response.writeHead(200, {
    "Content-Type": contentTypes[extname(file)] ?? "application/octet-stream",
  });
  createReadStream(file).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving static TesSa output at http://127.0.0.1:${port}${basePath}/`);
});
