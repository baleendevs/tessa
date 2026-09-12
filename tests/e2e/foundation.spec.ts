import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

async function setTheme(page: Page, theme: "light" | "dark") {
  if ((await page.locator("html").getAttribute("data-theme")) !== theme) {
    await page.getByTestId("theme-toggle").click();
  }
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
}

test("serves the Italian and English static foundations", async ({ page }) => {
  await page.goto("/tessa/");
  await expect(page.locator("html")).toHaveAttribute("lang", "it");
  await expect(page.locator(".brand-link")).toContainText("TesSa");
  await expect(page.locator(".marketing-footer__brand")).toContainText("TesSa");
  await expect(page.locator("body")).not.toContainText("TeSSa");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "I tuoi documenti",
  );

  await page.goto("/tessa/en/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your documents",
  );
});

test("renders the approved homepage narrative in both languages", async ({ page }) => {
  await page.goto("/tessa/");
  for (const heading of [
    "Un portafoglio",
    "Quello che ti serve",
    "quelli della tua famiglia",
    "Condividi quando",
    "restano sul tuo dispositivo",
    "pronto a seguirti",
    "nei gesti di ogni giorno",
    "Metti ordine",
  ]) {
    await expect(page.getByRole("heading", { name: new RegExp(heading, "i") })).toBeVisible();
  }
  await expect(page.locator("body")).not.toContainText(/Green Pass/i);

  await page.goto("/tessa/en/");
  await expect(page.getByRole("heading", { name: /One wallet/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Share when you choose/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Take your wallet with you/i })).toBeVisible();
  await expect(page.locator("main")).toContainText("driving licence");
  await expect(page.locator("main")).not.toContainText("driver's license");
});

test("keeps store and internal homepage links valid", async ({ page, request }) => {
  await page.goto("/tessa/");
  await expect(page.getByRole("link", { name: /Google Play/i }).first()).toHaveAttribute(
    "href",
    "https://play.google.com/store/apps/details?id=com.baleendevs.tessa&hl=it",
  );
  await expect(page.getByRole("link", { name: /App Store/i }).first()).toHaveAttribute(
    "href",
    "https://apps.apple.com/it/app/tessa-tessere-e-documenti/id1564434795",
  );

  const internalLinks = await page.locator('a[href^="/tessa/"]').evaluateAll((links) =>
    [...new Set(links.map((link) => (link as HTMLAnchorElement).getAttribute("href")?.split("#")[0]).filter(Boolean))] as string[],
  );
  for (const href of internalLinks) {
    expect((await request.get(href)).ok(), href).toBe(true);
  }
});

test("preserves the homepage fragment when switching language", async ({ page }) => {
  await page.goto("/tessa/#faq");
  await expect(page.getByRole("link", { name: "Passa all'inglese" })).toHaveAttribute("href", "/tessa/en/#faq");
});

test("isolates ShinyStat to marketing output", async ({ page }) => {
  await page.goto("/tessa/");
  await expect(page.locator('script[data-marketing-analytics="shinystat"]')).toHaveCount(1);
  const homeHtml = await page.content();
  expect(homeHtml).toContain("https://codice.shinystat.com/cgi-bin/getcod.cgi?USER=TesSa");

  await page.goto("/tessa/share");
  expect((await page.content()).toLowerCase()).not.toContain("shinystat");

  await page.goto("/tessa/privacy");
  await expect(page.locator('script[data-marketing-analytics="shinystat"]')).toHaveCount(1);
});

test("renders preserved legal documents with localised review context", async ({ page }) => {
  await page.goto("/tessa/terms");
  await expect(page.getByRole("heading", { level: 1, name: "Condizioni d'uso" })).toBeVisible();
  await expect(page.locator("article.legal-copy")).toHaveAttribute("lang", "en");
  await expect(page.locator("time")).toHaveAttribute("datetime", "2020-09-30");
  await expect(page.locator(".legal-review-note")).toContainText("revisione legale e traduzione");
  await expect(page.locator("article.legal-copy")).toContainText("By downloading or using the app");

  await page.goto("/tessa/en/privacy");
  await expect(page.getByRole("heading", { level: 1, name: "Privacy Policy" })).toBeVisible();
  await expect(page.locator(".legal-review-note")).toContainText("requires legal review before launch");
  await expect(page.locator("article.legal-copy")).toContainText("Ad Supported app");
  await expect(page.locator("article.legal-copy")).toContainText("Google Analytics for Firebase");
});

test("preserves legal fragments when switching language", async ({ page }) => {
  await page.goto("/tessa/privacy#security");
  await expect(page.getByRole("link", { name: "Passa all'inglese" })).toHaveAttribute(
    "href",
    "/tessa/en/privacy#security",
  );
});

test("publishes canonical, hreflang and social metadata", async ({ page }) => {
  const cases = [
    ["/tessa/", "https://baleendevs.github.io/tessa/", "https://baleendevs.github.io/tessa/en/"],
    ["/tessa/en/terms", "https://baleendevs.github.io/tessa/en/terms", "https://baleendevs.github.io/tessa/en/terms"],
    ["/tessa/privacy", "https://baleendevs.github.io/tessa/privacy", "https://baleendevs.github.io/tessa/en/privacy"],
  ];

  for (const [path, canonical, english] of cases) {
    await page.goto(path);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('link[rel="alternate"][hreflang="en-GB"]')).toHaveAttribute("href", english);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", /\/tessa\//);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://baleendevs.github.io/tessa/media/social/tessa-social.png",
    );
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  }
});

test("publishes verified SoftwareApplication structured data", async ({ page }) => {
  await page.goto("/tessa/en/");
  const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
  const data = JSON.parse(jsonLd ?? "{}");
  expect(data).toMatchObject({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TesSa",
    operatingSystem: "Android, iOS",
  });
  expect(data.downloadUrl).toEqual([
    "https://play.google.com/store/apps/details?id=com.baleendevs.tessa",
    "https://apps.apple.com/it/app/tessa-tessere-e-documenti/id1564434795",
  ]);
  expect(data).not.toHaveProperty("aggregateRating");
  expect(data).not.toHaveProperty("offers");
});

test("keeps private share routes out of discovery files", async ({ request }) => {
  const sitemap = await (await request.get("/tessa/sitemap.xml")).text();
  expect(sitemap).toContain("https://baleendevs.github.io/tessa/en/privacy");
  expect(sitemap).toContain('hreflang="x-default"');
  expect(sitemap).not.toContain("/share");

  const robots = await (await request.get("/tessa/robots.txt")).text();
  expect(robots).toContain("Disallow: /tessa/share");
  expect(robots).toContain("Disallow: /tessa/en/share");
});

test("serves a branded, base-path-safe and analytics-free 404", async ({ request }) => {
  const response = await request.get("/tessa/not-a-real-route");
  expect(response.status()).toBe(404);
  const html = await response.text();
  expect(html).toContain("TesSa · 404");
  expect(html).toContain('href="/tessa/"');
  expect(html).toContain('name="robots" content="noindex, nofollow"');
  expect(html.toLowerCase()).not.toContain("shinystat");
  expect(html).not.toContain("/_next/");
});

test("keeps the standalone 404 in sync with unsaved OS theme changes", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/tessa/not-a-real-route");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("serves base-path-aware manifest and icon assets", async ({ request }) => {
  const manifestResponse = await request.get("/tessa/icons/site.webmanifest");
  expect(manifestResponse.ok()).toBe(true);
  await expect(manifestResponse.json()).resolves.toMatchObject({
    id: "/tessa/",
    start_url: "/tessa/",
    scope: "/tessa/",
    display: "browser",
  });
  for (const asset of [
    "/tessa/icons/favicon.ico",
    "/tessa/icons/apple-touch-icon.png",
    "/tessa/media/social/tessa-social.png",
  ]) {
    expect((await request.get(asset)).ok(), asset).toBe(true);
  }
});

test("reflows the homepage at 320 CSS pixels and enlarged text", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/tessa/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  await expect(page.getByRole("link", { name: "Scarica", exact: true })).toBeVisible();
  await expect(page.locator(".mobile-menu summary")).toBeVisible();
  for (const role of [
    page.getByRole("link", { name: "Scarica", exact: true }),
    page.locator(".mobile-menu summary"),
    page.getByRole("link", { name: "Passa all'inglese" }),
    page.getByTestId("theme-toggle"),
  ]) {
    const box = await role.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(48);
    expect(box?.width).toBeGreaterThanOrEqual(48);
  }

  await page.setViewportSize({ width: 640, height: 900 });
  await page.goto("/tessa/en/");
  await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  await expect(page.getByRole("heading", { name: /Your documents, ready/i })).toBeVisible();
});

test("keeps the desktop header usable at 200% text enlargement", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/tessa/");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });

  const download = page.getByRole("link", { name: "Scarica", exact: true });
  await expect(download).toBeVisible();
  const box = await download.boundingBox();
  expect(box?.x).toBeGreaterThanOrEqual(0);
  expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(1440);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    ),
  ).toBe(true);
});

test("closes mobile navigation after selection and with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/tessa/");
  const menu = page.locator(".mobile-menu");
  const summary = menu.locator("summary");

  await summary.click();
  await menu.getByRole("link", { name: "Documenti" }).click();
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(page).toHaveURL(/#documents$/);

  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("open", "");
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(summary).toBeFocused();
});

test("loads below-the-fold product evidence when it enters view", async ({ page }) => {
  await page.goto("/tessa/");
  await page.locator("#privacy").scrollIntoViewIfNeeded();
  for (const image of await page.locator("#privacy img").all()) {
    await expect.poll(() => image.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
});

test("has no horizontal overflow across the required responsive widths", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tessa/");
    for (const theme of ["light", "dark"] as const) {
      await setTheme(page, theme);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1),
        `${theme} theme at ${width}px`,
      ).toBe(true);
    }
  }

  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/tessa/en/");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1),
    "English homepage at 320px",
  ).toBe(true);
});

test("uses the OS theme without persisting an implicit preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/tessa/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => localStorage.getItem("tessa-theme"))).toBeNull();

  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await page.evaluate(() => localStorage.getItem("tessa-theme"))).toBeNull();
});

test("persists an explicit Dark choice and ignores later OS changes", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/tessa/");
  const toggle = page.getByTestId("theme-toggle");

  await expect(toggle).toHaveAccessibleName("Passa al tema scuro");
  await toggle.focus();
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAccessibleName("Passa al tema chiaro");
  expect(await page.evaluate(() => localStorage.getItem("tessa-theme"))).toBe("dark");

  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("persists an explicit Light choice over a dark OS preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/tessa/en/");
  const toggle = page.getByTestId("theme-toggle");

  await expect(toggle).toHaveAccessibleName("Switch to light theme");
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await page.evaluate(() => localStorage.getItem("tessa-theme"))).toBe("light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("removes a legacy System value instead of keeping it as a preference", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("tessa-theme", "system"));
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/tessa/");

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => localStorage.getItem("tessa-theme"))).toBeNull();
  await expect(page.locator("select")).toHaveCount(0);
  await expect(page.getByRole("option", { name: /Sistema|System/ })).toHaveCount(0);
});

test("switches authentic product screenshots with the resolved theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/tessa/");
  const heroImage = page.locator('[data-theme-screenshot="wallet"] img').first();
  const darkSources = page.locator('[data-theme-screenshot] source[data-theme-dark]');
  await expect.poll(() => heroImage.evaluate((image) => (image as HTMLImageElement).currentSrc)).toContain("wallet-dark.webp");
  await expect(darkSources.first()).toHaveAttribute("media", "all");
  expect(await darkSources.count()).toBeGreaterThanOrEqual(8);

  await page.getByTestId("theme-toggle").click();
  await expect.poll(() => heroImage.evaluate((image) => (image as HTMLImageElement).currentSrc)).toMatch(/\/wallet\.webp$/);
  await expect(darkSources.first()).toHaveAttribute("media", "not all");
  await expect(page.locator(".hero-document-chip")).toHaveCount(0);
});

test("removes non-essential transition duration for reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/tessa/");

  const duration = await page
    .getByTestId("theme-toggle")
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  const durations = duration
    .split(",")
    .map((value) => Number.parseFloat(value.trim()));
  expect(durations.every((value) => value <= 0.001)).toBe(true);

  const phone = page.locator(".phone-frame--hero");
  const restingTransform = await phone.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await page.locator(".hero__product").hover();
  await expect
    .poll(() => phone.evaluate((element) => getComputedStyle(element).transform))
    .toBe(restingTransform);
});

test("preserves the raw share query when switching language", async ({
  page,
}) => {
  await page.goto("/tessa/share?card=abc+def==&source=test#details");
  await expect(page.getByTestId("share-language-switch")).toHaveAttribute(
    "href",
    "/tessa/en/share?card=abc+def==&source=test#details",
  );
});

test("serves extensionless and html compatibility paths", async ({ request }) => {
  for (const path of [
    "/tessa/",
    "/tessa/index.html",
    "/tessa/en/",
    "/tessa/en/index.html",
    "/tessa/share?card=fixture",
    "/tessa/share.html?card=fixture",
    "/tessa/en/share?card=fixture",
    "/tessa/en/share.html?card=fixture",
    "/tessa/terms",
    "/tessa/terms.html",
    "/tessa/privacy",
    "/tessa/privacy.html",
    "/tessa/en/terms",
    "/tessa/en/terms.html",
    "/tessa/en/privacy",
    "/tessa/en/privacy.html",
  ]) {
    const response = await request.get(path);
    expect(response.ok(), path).toBe(true);
  }
});

test("has no automatically detectable accessibility violations", async ({
  page,
}) => {
  for (const route of [
    "/tessa/",
    "/tessa/en/",
    "/tessa/terms",
    "/tessa/privacy",
    "/tessa/en/terms",
    "/tessa/en/privacy",
  ]) {
    await page.goto(route);
    for (const theme of ["light", "dark"] as const) {
      await setTheme(page, theme);
      await page.waitForTimeout(250);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `${route} in ${theme}`).toEqual([]);
    }
  }
});

test("provides keyboard skip navigation on shared-header page types", async ({ page }) => {
  for (const route of [
    "/tessa/terms",
    "/tessa/privacy",
    "/tessa/share",
    "/tessa/en/terms",
    "/tessa/en/privacy",
    "/tessa/en/share",
  ]) {
    await page.goto(route);
    await page.keyboard.press("Tab");
    const skipLink = page
      .getByRole("link", { name: /(contenuto|content)/i })
      .first();
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toHaveAttribute("href", "#main-content");
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
  }
});

test("keeps utility, legal and 404 pages usable at narrow width and 200% text", async ({ page }) => {
  for (const route of [
    "/tessa/terms",
    "/tessa/en/privacy",
    "/tessa/share",
    "/tessa/en/share",
    "/tessa/not-a-real-route",
  ]) {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      ),
      `${route} at 320px`,
    ).toBe(true);

    await page.setViewportSize({ width: 640, height: 900 });
    await page.goto(route);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      ),
      `${route} at 200% text`,
    ).toBe(true);
  }
});

test("has no automatically detectable accessibility violations on the standalone 404", async ({ page }) => {
  await page.goto("/tessa/not-a-real-route");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
