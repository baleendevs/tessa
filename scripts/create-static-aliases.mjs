import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { outputAliases } from "./static-routes.mjs";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = resolve(projectRoot, "out");

for (const shareFile of ["share.html", "en/share.html"]) {
  const sharePath = resolve(outputRoot, shareFile);
  const html = await readFile(sharePath, "utf8");
  const withoutLateReferrer = html.replace(
    /<meta\s+name=["']referrer["']\s+content=["']no-referrer["']\s*\/?>(?:<\/meta>)?/gi,
    "",
  );
  const hardened = withoutLateReferrer.replace(
    "<head>",
    '<head><meta name="referrer" content="no-referrer"/>',
  );
  if (hardened === withoutLateReferrer) {
    throw new Error(`Unable to harden Referrer-Policy ordering in ${shareFile}`);
  }
  await writeFile(sharePath, hardened, "utf8");
}

for (const [source, alias] of outputAliases) {
  const sourcePath = resolve(outputRoot, source);
  const aliasPath = resolve(outputRoot, alias);
  await mkdir(dirname(aliasPath), { recursive: true });
  await copyFile(sourcePath, aliasPath);
}

await copyFile(
  resolve(projectRoot, "scripts/templates/404.html"),
  resolve(outputRoot, "404.html"),
);
await writeFile(resolve(outputRoot, ".nojekyll"), "", "utf8");

console.log(`Created ${outputAliases.length} compatibility aliases.`);
