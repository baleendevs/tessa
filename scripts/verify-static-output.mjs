import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  outputAliases,
  requiredOutputFiles,
} from "./static-routes.mjs";
import {
  absoluteRoute,
  SITE_BASE_PATH,
  SITE_URL,
} from "../src/lib/site.ts";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = resolve(projectRoot, "out");

function fail(message) {
  throw new Error(`Static output verification failed: ${message}`);
}

async function listOutputFiles(directory, files = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await listOutputFiles(path, files);
    } else {
      files.push(relative(outputRoot, path));
    }
  }
  return files;
}

const outputFiles = await listOutputFiles(outputRoot);

async function outputPathExists(publicPath) {
  const pathname = publicPath.split(/[?#]/, 1)[0];
  const outputPath = pathname.replace(/^\/tessa\/?/, "");
  const candidates = outputPath === ""
    ? ["index.html"]
    : outputPath.endsWith("/")
      ? [`${outputPath}index.html`]
      : extname(outputPath)
        ? [outputPath]
        : [outputPath, `${outputPath}.html`, `${outputPath}/index.html`];
  for (const candidate of candidates) {
    try {
      await access(resolve(outputRoot, candidate));
      return true;
    } catch {
      // Try the next valid GitHub Pages file form.
    }
  }
  return false;
}

for (const file of requiredOutputFiles) {
  try {
    await access(resolve(outputRoot, file));
  } catch {
    fail(`missing ${file}`);
  }
}

for (const [source, alias] of outputAliases) {
  const sourceContents = await readFile(resolve(outputRoot, source));
  const aliasContents = await readFile(resolve(outputRoot, alias));
  if (!sourceContents.equals(aliasContents)) {
    fail(`${alias} differs from ${source}`);
  }
}

const localeFiles = {
  "index.html": "it",
  "terms.html": "it",
  "privacy.html": "it",
  "share.html": "it",
  "en.html": "en-GB",
  "en/terms.html": "en-GB",
  "en/privacy.html": "en-GB",
  "en/share.html": "en-GB",
};

for (const [file, locale] of Object.entries(localeFiles)) {
  const html = await readFile(resolve(outputRoot, file), "utf8");
  if (!html.includes(`<html lang="${locale}"`)) {
    fail(`${file} does not declare lang=${locale}`);
  }
  if (/\b(?:src|href)="\/_next\//.test(html)) {
    fail(`${file} contains a root-relative Next.js asset outside /tessa`);
  }
  if (html.includes("/_next/") && !html.includes("/tessa/_next/")) {
    fail(`${file} does not contain base-path-aware Next.js assets`);
  }
}

for (const file of outputFiles.filter((path) => path.endsWith(".html"))) {
  const html = await readFile(resolve(outputRoot, file), "utf8");
  const publicDirectory = dirname(`/tessa/${file}`);
  const references = [
    ...html.matchAll(/\b(?:href|src)="([^"]+)"/g),
  ].map((match) => match[1]);
  for (const reference of references) {
    if (
      reference === "" ||
      reference.startsWith("#") ||
      reference.startsWith("data:") ||
      reference.startsWith("mailto:") ||
      reference.startsWith("tel:") ||
      reference.startsWith("http://") ||
      reference.startsWith("https://") ||
      reference.startsWith("//")
    ) {
      continue;
    }
    const publicPath = new URL(
      reference,
      `https://static-audit.invalid${publicDirectory}/`,
    ).pathname;
    if (publicPath !== "/tessa" && !publicPath.startsWith("/tessa/")) {
      fail(`${file} contains a local reference outside /tessa: ${reference}`);
    }
    if (!(await outputPathExists(publicPath))) {
      fail(`${file} references missing static output: ${reference}`);
    }
  }
}

if (outputFiles.some((file) => file.endsWith(".map"))) {
  fail("production output contains source maps");
}

const auditTextFiles = outputFiles.filter(
  (file) =>
    file.endsWith(".html") ||
    file.endsWith(".txt") ||
    (/^_next\/static\/chunks\/app\//.test(file) && file.endsWith(".js")),
);
for (const file of auditTextFiles) {
  const contents = (await readFile(resolve(outputRoot, file), "utf8")).toLowerCase();
  for (const prohibited of [
    "/users/",
    "/volumes/",
    "127.0.0.1:4173",
    "http://localhost:",
    "tstpla80a01h000x",
    "fixture-certificate",
    "cognomedimostrativomoltolungo",
    "__fixtureinjected",
  ]) {
    if (contents.includes(prohibited)) {
      fail(`${file} contains development, fixture, or filesystem content: ${prohibited}`);
    }
  }
}

for (const file of ["index.html", "en.html", "en/index.html"]) {
  const html = (await readFile(resolve(outputRoot, file), "utf8")).toLowerCase();
  if (!html.includes("shinystat.com/cgi-bin/getcod.cgi?user=tessa")) {
    fail(`${file} is missing the approved marketing analytics boundary`);
  }
  if (html.includes("green pass")) {
    fail(`${file} contains legacy Green Pass homepage marketing`);
  }
  if (html.includes("fonts.googleapis.com") || html.includes("fonts.gstatic.com")) {
    fail(`${file} contains an external font request`);
  }
}

const informationalRoutes = [
  {
    file: "index.html",
    canonical: absoluteRoute("it", "home"),
    italian: absoluteRoute("it", "home"),
    english: absoluteRoute("en", "home"),
  },
  {
    file: "en.html",
    canonical: absoluteRoute("en", "home"),
    italian: absoluteRoute("it", "home"),
    english: absoluteRoute("en", "home"),
  },
  {
    file: "terms.html",
    canonical: absoluteRoute("it", "terms"),
    italian: absoluteRoute("it", "terms"),
    english: absoluteRoute("en", "terms"),
  },
  {
    file: "en/terms.html",
    canonical: absoluteRoute("en", "terms"),
    italian: absoluteRoute("it", "terms"),
    english: absoluteRoute("en", "terms"),
  },
  {
    file: "privacy.html",
    canonical: absoluteRoute("it", "privacy"),
    italian: absoluteRoute("it", "privacy"),
    english: absoluteRoute("en", "privacy"),
  },
  {
    file: "en/privacy.html",
    canonical: absoluteRoute("en", "privacy"),
    italian: absoluteRoute("it", "privacy"),
    english: absoluteRoute("en", "privacy"),
  },
];

for (const route of informationalRoutes) {
  const html = await readFile(resolve(outputRoot, route.file), "utf8");
  const isItalian = !route.file.startsWith("en/") && route.file !== "en.html";
  const expectedSocialImage = isItalian
    ? `${SITE_URL}/img/tessa-social.jpg`
    : `${SITE_URL}/img/tessa-social-en.jpg`;
  const expectedHeadValues = [
    `rel="canonical" href="${route.canonical}"`,
    `hrefLang="it" href="${route.italian}"`,
    `hrefLang="en-GB" href="${route.english}"`,
    `hrefLang="x-default" href="${route.italian}"`,
    `property="og:image" content="${expectedSocialImage}"`,
    'property="og:image:width" content="1200"',
    'property="og:image:height" content="630"',
    'name="twitter:card" content="summary_large_image"',
    `href="${SITE_BASE_PATH}/icons/site.webmanifest"`,
  ];
  for (const expected of expectedHeadValues) {
    if (!html.includes(expected)) fail(`${route.file} is missing metadata: ${expected}`);
  }
  if (!html.toLowerCase().includes("shinystat.com/cgi-bin/getcod.cgi?user=tessa")) {
    fail(`${route.file} is missing the informational analytics boundary`);
  }
}

for (const { file, effectiveDate, effectiveDateLabel } of [
  { file: "terms.html", effectiveDate: "2026-09-16", effectiveDateLabel: "In vigore dal" },
  { file: "privacy.html", effectiveDate: "2026-09-16", effectiveDateLabel: "In vigore dal" },
  { file: "en/terms.html", effectiveDate: "2026-09-16", effectiveDateLabel: "Effective from" },
  { file: "en/privacy.html", effectiveDate: "2026-09-16", effectiveDateLabel: "Effective from" },
]) {
  const html = await readFile(resolve(outputRoot, file), "utf8");
  if (!html.includes(`dateTime="${effectiveDate}"`)) {
    fail(`${file} does not expose the expected effective date`);
  }
  if (!html.includes(effectiveDateLabel)) {
    fail(`${file} does not expose the localised effective-date label`);
  }
  for (const obsoleteClass of [
    "legal-page__source-title",
    "legal-review-note",
    "legal-copy__language-note",
  ]) {
    if (html.includes(obsoleteClass)) {
      fail(`${file} still exposes obsolete legal review UI: ${obsoleteClass}`);
    }
  }
}

const homeHtml = await readFile(resolve(outputRoot, "index.html"), "utf8");
const jsonLdMatch = homeHtml.match(
  /<script type="application\/ld\+json">([^<]+)<\/script>/,
);
if (!jsonLdMatch) fail("homepage is missing SoftwareApplication JSON-LD");
const jsonLd = JSON.parse(jsonLdMatch[1]);
if (
  jsonLd["@type"] !== "SoftwareApplication" ||
  jsonLd.name !== "TesSa" ||
  jsonLd.operatingSystem !== "Android, iOS" ||
  !Array.isArray(jsonLd.downloadUrl) ||
  jsonLd.downloadUrl.length !== 2
) {
  fail("homepage SoftwareApplication JSON-LD contains unexpected facts");
}
if (
  !homeHtml.includes("https://play.google.com/store/apps/details?id=com.baleendevs.tessa&amp;hl=it") ||
  !homeHtml.includes("https://apps.apple.com/it/app/tessa-tessere-e-documenti/id1564434795")
) {
  fail("homepage does not contain the verified store destinations");
}

const socialImageIt = await readFile(resolve(outputRoot, "img/tessa-social.jpg"));
if (socialImageIt.subarray(0, 2).toString("hex") !== "ffd8") {
  fail("Italian social image is not a valid JPEG");
}

const socialImageEn = await readFile(resolve(outputRoot, "img/tessa-social-en.jpg"));
if (socialImageEn.subarray(0, 2).toString("hex") !== "ffd8") {
  fail("English social image is not a valid JPEG");
}

const sitemap = await readFile(resolve(outputRoot, "sitemap.xml"), "utf8");
for (const route of informationalRoutes) {
  if (!sitemap.includes(`<loc>${route.canonical}</loc>`)) {
    fail(`sitemap is missing ${route.canonical}`);
  }
}
if (sitemap.includes("/share")) fail("sitemap includes a private share route");
if ((sitemap.match(/hreflang="x-default"/g) ?? []).length !== 6) {
  fail("sitemap does not define x-default for every informational URL");
}

const robots = await readFile(resolve(outputRoot, "robots.txt"), "utf8");
for (const directive of [
  `Disallow: ${SITE_BASE_PATH}/share`,
  `Disallow: ${SITE_BASE_PATH}/en/share`,
  `Sitemap: ${SITE_URL}/sitemap.xml`,
]) {
  if (!robots.includes(directive)) fail(`robots.txt is missing ${directive}`);
}

const manifest = JSON.parse(
  await readFile(resolve(outputRoot, "icons/site.webmanifest"), "utf8"),
);
if (
  manifest.start_url !== `${SITE_BASE_PATH}/` ||
  manifest.scope !== `${SITE_BASE_PATH}/` ||
  manifest.display !== "browser"
) {
  fail("web manifest is not scoped to the static GitHub Pages base path");
}

const browserConfig = await readFile(
  resolve(outputRoot, "icons/browserconfig.xml"),
  "utf8",
);
if (!browserConfig.includes(`src="${SITE_BASE_PATH}/icons/mstile-150x150.png"`)) {
  fail("browserconfig.xml does not use the /tessa base path for its tile icon");
}

const notFound = await readFile(resolve(outputRoot, "404.html"), "utf8");
for (const expected of [
  'name="robots" content="noindex, nofollow"',
  `href="${SITE_BASE_PATH}/"`,
  "Pagina non trovata",
  "TesSa · 404",
]) {
  if (!notFound.includes(expected)) fail(`404.html is missing ${expected}`);
}
if (notFound.toLowerCase().includes("shinystat") || notFound.includes("/_next/")) {
  fail("404.html is not standalone and analytics-free");
}

const prohibitedShareContent = [
  "shinystat",
  "googletag",
  "google-analytics",
  "googlesyndication",
  "googleadservices",
  "adsbygoogle",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "materialize",
  "doubleclick",
  "connect.facebook.net",
  "hotjar",
  "segment.io",
];

const shareOutputFiles = outputFiles.filter(
  (file) =>
    file === "share.html" ||
    file === "share.txt" ||
    file.startsWith("share/") ||
    file === "en/share.html" ||
    file === "en/share.txt" ||
    file.startsWith("en/share/"),
);

for (const file of shareOutputFiles) {
  const html = (await readFile(resolve(outputRoot, file), "utf8")).toLowerCase();
  for (const prohibited of prohibitedShareContent) {
    if (html.includes(prohibited)) {
      fail(`${file} contains prohibited shared-page dependency: ${prohibited}`);
    }
  }
  if (file.endsWith(".html")) {
    if (!html.includes('name="robots" content="noindex, nofollow')) {
      fail(`${file} is missing noindex, nofollow`);
    }
    if (!html.includes('name="referrer" content="no-referrer"')) {
      fail(`${file} is missing Referrer-Policy metadata`);
    }
    const referrerPosition = html.indexOf('name="referrer" content="no-referrer"');
    const firstRuntimeResource = html.search(
      /<(?:link|script|img|iframe|source)\b/i,
    );
    if (firstRuntimeResource !== -1 && referrerPosition > firstRuntimeResource) {
      fail(`${file} declares Referrer-Policy after a runtime resource`);
    }
    if (
      /<(?:script|img|iframe|source)\b[^>]*\b(?:src|srcset)=["']https?:\/\//i.test(
        html,
      ) ||
      /<link\b(?=[^>]*\brel=["'](?:stylesheet|preload|modulepreload)["'])[^>]*\bhref=["']https?:\/\//i.test(
        html,
      )
    ) {
      fail(`${file} contains an external runtime resource`);
    }
    if (html.includes('rel="manifest"')) {
      fail(`${file} unnecessarily exposes the site manifest`);
    }
  }
}

console.log(`Verified ${requiredOutputFiles.length} static route files.`);
