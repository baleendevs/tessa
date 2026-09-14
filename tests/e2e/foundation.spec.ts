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
  await expect(page.locator(".site-footer__brand")).toContainText("TesSa");
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

test("maps each localised navigation label to one distinct homepage section", async ({ page }) => {
  const expectedHrefs = ["#documents", "#how-it-works", "#sharing", "#privacy", "#faq"];
  const expectedMobileHrefs = [...expectedHrefs, "#download"];
  const locales = [
    {
      labels: ["Documenti", "Come funziona", "Condivisione", "Privacy", "FAQ"],
      mobileLabels: ["Documenti", "Come funziona", "Condivisione", "Privacy", "FAQ", "Scarica"],
      path: "/tessa/",
    },
    {
      labels: ["Documents", "How it works", "Sharing", "Privacy", "FAQ"],
      mobileLabels: ["Documents", "How it works", "Sharing", "Privacy", "FAQ", "Download"],
      path: "/tessa/en/",
    },
  ];

  for (const { labels, mobileLabels, path } of locales) {
    await page.goto(path);
    const desktopLinks = page.locator(".marketing-nav a");
    const mobileLinks = page.locator(".mobile-menu nav a");
    await expect(desktopLinks).toHaveText(labels);
    await expect(mobileLinks).toHaveText(mobileLabels);
    expect(await desktopLinks.evaluateAll((links) => links.map((link) => link.getAttribute("href")))).toEqual(expectedHrefs);
    expect(await mobileLinks.evaluateAll((links) => links.map((link) => link.getAttribute("href")))).toEqual(expectedMobileHrefs);

    for (const href of expectedHrefs) {
      await expect(page.locator(href)).toHaveCount(1);
    }
    const targetTops = await page.locator(expectedHrefs.join(",")).evaluateAll((sections) =>
      sections.map((section) => (section as HTMLElement).offsetTop),
    );
    expect(targetTops).toEqual([...targetTops].sort((first, second) => first - second));
    expect(new Set(expectedHrefs).size).toBe(expectedHrefs.length);
    expect(
      await page.locator("[id]").evaluateAll((elements) => {
        const ids = elements.map((element) => element.id);
        return ids.filter((id, index) => ids.indexOf(id) !== index);
      }),
    ).toEqual([]);
  }
});

test("positions every desktop navigation target below the sticky header", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/tessa/");
  const destinations = ["#documents", "#how-it-works", "#sharing", "#privacy", "#faq"];

  for (let index = 0; index < destinations.length; index += 1) {
    await page.evaluate((position) => {
      const maximum = document.documentElement.scrollHeight - innerHeight;
      scrollTo({ top: position === 0 ? 0 : position === 1 ? maximum / 2 : maximum, behavior: "instant" });
    }, index % 3);
    await page.locator(`.marketing-nav a[href="${destinations[index]}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${destinations[index]}$`));
    await expect
      .poll(() =>
        page.evaluate((selector) => {
          const header = document.querySelector(".marketing-header")?.getBoundingClientRect();
          const target = document.querySelector(selector)?.getBoundingClientRect();
          if (!header || !target) return false;
          return target.top >= header.bottom - 1 && target.top <= header.bottom + 16;
        }, destinations[index]),
      )
      .toBe(true);
  }
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

test("uses the shared site chrome and valid homepage links on legal pages", async ({ page }) => {
  await page.goto("/tessa/privacy");

  await expect(page.locator(".marketing-header .brand-link")).toContainText("TesSa");
  await expect(page.locator(".marketing-header").getByTestId("theme-toggle")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Passa all'inglese" })).toHaveAttribute(
    "href",
    "/tessa/en/privacy",
  );

  const footer = page.locator(".site-footer");
  await expect(footer.locator(".site-footer__brand")).toContainText("TesSa");
  await expect(footer.locator(".site-footer__links > nav")).toHaveCount(2);
  await expect(footer.getByRole("link", { name: "Documenti" })).toHaveAttribute(
    "href",
    "/tessa/#documents",
  );
  await expect(footer.getByRole("link", { name: "Privacy" })).toHaveAttribute(
    "aria-current",
    "page",
  );
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
  await expect(page.getByRole("button", { name: "Vai alla sezione successiva" })).toBeVisible();
  await expect(page.locator(".mobile-menu summary")).toBeVisible();
  for (const role of [
    page.getByRole("button", { name: "Vai alla sezione successiva" }),
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
  const faq = page.locator(".faq-list");
  for (const index of [1, 4, 5, 6]) {
    await faq.locator("summary").nth(index).click();
  }
  await expect(faq.locator("details[open]")).toHaveCount(5);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  const showcaseCards = page.locator(".showcase-card");
  await showcaseCards.first().scrollIntoViewIfNeeded();
  for (const card of await showcaseCards.all()) {
    const cardBox = await card.boundingBox();
    const captionBox = await card.locator("figcaption").boundingBox();
    expect(captionBox?.x).toBeGreaterThanOrEqual((cardBox?.x ?? 0) - 1);
    expect((captionBox?.x ?? 0) + (captionBox?.width ?? 0)).toBeLessThanOrEqual(
      (cardBox?.x ?? 0) + (cardBox?.width ?? 0) + 1,
    );
    expect((captionBox?.y ?? 0) + (captionBox?.height ?? 0)).toBeLessThanOrEqual(
      (cardBox?.y ?? 0) + (cardBox?.height ?? 0) + 1,
    );
  }
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
  await expect
    .poll(() =>
      page.evaluate(() => {
        const header = document.querySelector(".marketing-header")?.getBoundingClientRect();
        const target = document.querySelector("#documents")?.getBoundingClientRect();
        return Boolean(header && target && target.top >= header.bottom - 1);
      }),
    )
    .toBe(true);

  await summary.click();
  await menu.getByRole("link", { name: "Come funziona" }).click();
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(page).toHaveURL(/#how-it-works$/);
  await expect(page.locator("#how-it-works")).toContainText("Quello che ti serve, in pochi secondi.");
  await expect
    .poll(() =>
      page.evaluate(() => {
        const header = document.querySelector(".marketing-header")?.getBoundingClientRect();
        const target = document.querySelector("#how-it-works")?.getBoundingClientRect();
        return Boolean(header && target && target.top >= header.bottom - 1);
      }),
    )
    .toBe(true);

  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("open", "");
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(summary).toBeFocused();
});

test("advances through the canonical homepage sections and returns to the top", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 900 });

  const locales = [
    {
      backLabel: "Torna all'inizio",
      nextLabel: "Vai alla sezione successiva",
      path: "/tessa/",
    },
    {
      backLabel: "Back to the top",
      nextLabel: "Go to the next section",
      path: "/tessa/en/",
    },
  ];
  const destinations = ["#documents", "#how-it-works", "#sharing", "#privacy", "#faq", "#download"];

  for (const { backLabel, nextLabel, path } of locales) {
    await page.goto(path);
    let sectionButton = page.getByRole("button", { name: nextLabel });
    await expect(sectionButton).toBeVisible();
    await expect(sectionButton).toHaveAttribute("data-direction", "down");

    for (const destination of destinations) {
      await sectionButton.click();
      await expect
        .poll(() =>
          page.evaluate((selector) => {
            const header = document.querySelector(".marketing-header")?.getBoundingClientRect();
            const target = document.querySelector(selector)?.getBoundingClientRect();
            if (!header || !target) return false;
            return target.top >= header.bottom - 1 && target.top <= header.bottom + 16;
          }, destination),
        )
        .toBe(true);
    }

    sectionButton = page.getByRole("button", { name: backLabel });
    await expect(sectionButton).toHaveAttribute("data-direction", "up");
    await sectionButton.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(1);
    await expect(page.getByRole("button", { name: nextLabel })).toHaveAttribute("data-direction", "down");
  }

  await page.setViewportSize({ width: 768, height: 900 });
  await expect(page.locator(".header-section-nav")).toBeHidden();
  await expect(page.getByRole("link", { name: "Download", exact: true })).toBeVisible();
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
    const faq = page.locator(".faq-list");
    await faq.scrollIntoViewIfNeeded();
    for (const index of [1, 4, 6]) {
      await faq.locator("summary").nth(index).click();
    }
    await expect(faq.locator("details[open]")).toHaveCount(4);

    for (const theme of ["light", "dark"] as const) {
      await setTheme(page, theme);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1),
        `${theme} theme at ${width}px`,
      ).toBe(true);

      for (const summary of await faq.locator("summary").all()) {
        const summaryBox = await summary.boundingBox();
        const chevronBox = await summary.locator('i[aria-hidden="true"]').boundingBox();
        expect(summaryBox?.height, `FAQ touch target at ${width}px`).toBeGreaterThanOrEqual(48);
        expect(chevronBox?.x, `chevron left edge at ${width}px`).toBeGreaterThanOrEqual(
          (summaryBox?.x ?? 0) - 1,
        );
        expect(
          (chevronBox?.x ?? 0) + (chevronBox?.width ?? 0),
          `chevron right edge at ${width}px`,
        ).toBeLessThanOrEqual((summaryBox?.x ?? 0) + (summaryBox?.width ?? 0) + 1);
      }
    }
  }

  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/tessa/en/");
  for (const index of [1, 4, 5, 6]) {
    await page.locator(".faq-list summary").nth(index).click();
  }
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1),
    "English homepage at 320px",
  ).toBe(true);
});

test("presents backup creation, manual export and restore in chronological order", async ({ page }) => {
  for (const { path, labels, description } of [
    {
      path: "/tessa/",
      labels: ["Creazione del backup", "Esportazione manuale", "Ripristino quando serve"],
      description:
        "Crea un backup cifrato, esportalo dove preferisci e ripristinalo quando serve. Backup e ripristino sono disponibili gratuitamente.",
    },
    {
      path: "/tessa/en/",
      labels: ["Create a backup", "Manual export", "Restore when needed"],
      description:
        "Create an encrypted backup, export it wherever you choose and restore it when needed. Backup and restore are available free to everyone.",
    },
  ]) {
    await page.goto(path);
    const section = page.locator(".backup-story");
    const cards = section.locator(".backup-flow > div");

    await expect(section.locator(".section-intro")).toHaveText(description);
    await expect(cards).toHaveCount(3);
    await expect(cards.allTextContents()).resolves.toEqual(labels.map((label, index) =>
      index === 0
        ? `${label}${path === "/tessa/" ? "File cifrato nell'app" : "Encrypted file stored in TesSa"}`
        : label,
    ));
    await expect(cards.first()).toHaveClass(/backup-file/);
  }

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tessa/");
    const boxes = await page.locator(".backup-flow > div").evaluateAll((cards) =>
      cards.map((card) => {
        const { x, y } = card.getBoundingClientRect();
        return { x, y };
      }),
    );
    const axis = width <= 768 ? "y" : "x";
    expect(boxes[0][axis]).toBeLessThan(boxes[1][axis]);
    expect(boxes[1][axis]).toBeLessThan(boxes[2][axis]);
  }
});

test("keeps backup cards visually equal at rest across responsive widths", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tessa/");
    const cards = page.locator(".backup-flow > div");
    await cards.first().scrollIntoViewIfNeeded();

    for (const theme of ["light", "dark"] as const) {
      await setTheme(page, theme);
      const styles = await cards.evaluateAll((elements) =>
        elements.map((element) => {
          const style = getComputedStyle(element);
          const iconStyle = getComputedStyle(element.querySelector(":scope > span")!);
          return {
            background: style.backgroundColor,
            border: style.borderColor,
            boxShadow: style.boxShadow,
            height: element.getBoundingClientRect().height,
            iconBackground: iconStyle.backgroundColor,
            transform: style.transform,
          };
        }),
      );

      expect(new Set(styles.map(({ background }) => background)).size).toBe(1);
      expect(new Set(styles.map(({ border }) => border)).size).toBe(1);
      expect(new Set(styles.map(({ boxShadow }) => boxShadow)).size).toBe(1);
      expect(new Set(styles.map(({ height }) => height)).size).toBe(1);
      expect(new Set(styles.map(({ iconBackground }) => iconBackground)).size).toBe(1);
      expect(new Set(styles.map(({ transform }) => transform)).size).toBe(1);
    }
  }
});

test("limits backup card lift to fine pointers and suppresses it for reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/tessa/");
  const cards = page.locator(".backup-flow > div");
  await cards.first().scrollIntoViewIfNeeded();
  const hasFineHover = await page.evaluate(() =>
    matchMedia("(hover: hover) and (pointer: fine)").matches,
  );

  for (let index = 0; index < 3; index += 1) {
    const card = cards.nth(index);
    const restingTransform = await card.evaluate((element) => getComputedStyle(element).transform);
    await card.hover();
    const hoveredTransform = await card.evaluate((element) => getComputedStyle(element).transform);
    expect(hoveredTransform === restingTransform, `card ${index + 1} fine-pointer hover`).toBe(
      !hasFineHover,
    );
    await page.mouse.move(0, 0);
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  const firstCard = cards.first();
  const restingBackground = await firstCard.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  await firstCard.hover();
  await expect
    .poll(() => firstCard.evaluate((element) => getComputedStyle(element).transform))
    .toBe("none");
  if (hasFineHover) {
    await expect
      .poll(() => firstCard.evaluate((element) => getComputedStyle(element).backgroundColor))
      .not.toBe(restingBackground);
  }
});

test("renders the approved FAQ copy and order in both languages", async ({ page }) => {
  for (const { path, items } of [
    {
      path: "/tessa/",
      items: [
        ["Quali documenti posso aggiungere a TesSa?", "TesSa supporta Tessera Sanitaria, Carta d'Identità Elettronica (CIE) e patente di guida."],
        ["Posso organizzare i documenti di più persone?", "Sì. Puoi tenere sullo stesso dispositivo i documenti di più persone, per esempio quelli dei tuoi familiari. TesSa non richiede la creazione di un account."],
        ["Dove conserva TesSa i dati dei miei documenti?", "I dati del tuo portafoglio sono memorizzati localmente sul dispositivo. TesSa non li salva su un proprio servizio cloud."],
        ["Come condivido un documento tramite codice QR o link?", "Apri il documento in TesSa e scegli di condividerlo tramite codice QR o link. La condivisione parte sempre da una tua azione nell'app."],
        ["Cosa devo sapere sui link condivisi?", "Il link contiene i dati del documento condiviso e non è cifrato né protetto da password. Chi riceve il link può visualizzare le informazioni condivise: invialo quindi solo alla persona giusta e trattalo come un documento personale."],
        ["Come funzionano backup e ripristino?", "TesSa ti permette gratuitamente di creare un file di backup cifrato del tuo portafoglio. Puoi poi esportarlo manualmente per conservarne una copia dove preferisci e, quando serve, utilizzarlo per ripristinare il portafoglio. Il ripristino sostituisce i dati attuali solo dopo la tua conferma."],
        ["Dove trovo il backup che ho creato?", "Quando crei un backup, il file rimane nello spazio interno di TesSa e non compare automaticamente tra i file del dispositivo. Per conservarne una copia fuori dall'app, usa la funzione di esportazione e scegli dove salvarlo o condividerlo."],
        ["Come posso proteggere l'accesso ai miei documenti?", "Puoi proteggere l'accesso a TesSa con un PIN e, sui dispositivi compatibili, utilizzare anche l'autenticazione biometrica."],
        ["TesSa è un'app ufficiale della Pubblica Amministrazione?", "No. TesSa è un'app indipendente e non è un'app ufficiale della Pubblica Amministrazione. Ti aiuta a organizzare e consultare i dati dei tuoi documenti, ma non sostituisce i documenti originali."],
        ["Su quali dispositivi posso usare TesSa?", "TesSa è disponibile per Android e iOS."],
      ],
    },
    {
      path: "/tessa/en/",
      items: [
        ["Which documents can I add to TesSa?", "TesSa supports the Italian health card, Electronic Identity Card (CIE) and driving licence."],
        ["Can I organise documents for more than one person?", "Yes. You can keep documents for several people on the same device, for example members of your family. TesSa does not require you to create an account."],
        ["Where does TesSa store my document data?", "Your wallet data is stored locally on your device. TesSa does not store it on its own cloud service."],
        ["How do I share a document using a QR code or link?", "Open the document in TesSa and choose to share it using a QR code or link. Sharing always starts with an action you take in the app."],
        ["What should I know about shared links?", "The link contains the data from the shared document and is not encrypted or password-protected. Anyone who receives the link can view the shared information, so send it only to the intended person and treat it like a personal document."],
        ["How do backup and restore work?", "TesSa lets you create an encrypted backup file of your wallet free of charge. You can then export it manually to keep a copy wherever you prefer and use it to restore your wallet when needed. Restoring replaces your current data only after you confirm."],
        ["Where can I find the backup I created?", "When you create a backup, the file remains in TesSa's internal app storage and does not automatically appear among the files on your device. To keep a copy outside the app, use the export function and choose where to save or share it."],
        ["How can I protect access to my documents?", "You can protect access to TesSa with a PIN and, on compatible devices, also use biometric authentication."],
        ["Is TesSa an official Public Administration app?", "No. TesSa is an independent app and is not an official Public Administration app. It helps you organise and view your document data, but it does not replace the original documents."],
        ["Which devices can I use TesSa on?", "TesSa is available for Android and iOS."],
      ],
    },
  ]) {
    await page.goto(path);
    const entries = page.locator(".faq-list details");
    await expect(entries).toHaveCount(10);
    await expect(entries.locator("summary span")).toHaveText(items.map(([question]) => question));
    await expect(entries.locator("p")).toHaveText(items.map(([, answer]) => answer));
  }
});

test("keeps native FAQ disclosures independent with decorative rotating chevrons", async ({ page }) => {
  await page.goto("/tessa/");
  const entries = page.locator(".faq-list details");
  const summaries = entries.locator("summary");
  const chevronContainers = summaries.locator('i[aria-hidden="true"]');
  const chevrons = chevronContainers.locator("svg");

  await expect(entries).toHaveCount(10);
  await expect(summaries).toHaveCount(10);
  await expect(chevronContainers).toHaveCount(10);
  await expect(chevrons).toHaveCount(10);
  await expect(entries.nth(0)).toHaveAttribute("open", "");
  await expect(entries.nth(1)).not.toHaveAttribute("open", "");

  await summaries.nth(1).focus();
  const focusStyle = await summaries.nth(1).evaluate((element) => {
    const style = getComputedStyle(element);
    return { outlineStyle: style.outlineStyle, outlineWidth: Number.parseFloat(style.outlineWidth) };
  });
  expect(focusStyle.outlineStyle).not.toBe("none");
  expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(3);
  await page.keyboard.press("Enter");
  await summaries.nth(2).focus();
  await page.keyboard.press("Space");
  await expect(entries.nth(0)).toHaveAttribute("open", "");
  await expect(entries.nth(1)).toHaveAttribute("open", "");
  await expect(entries.nth(2)).toHaveAttribute("open", "");

  await summaries.nth(1).click();
  await expect(entries.nth(0)).toHaveAttribute("open", "");
  await expect(entries.nth(1)).not.toHaveAttribute("open", "");
  await expect(entries.nth(2)).toHaveAttribute("open", "");

  await expect
    .poll(() =>
      chevrons.evaluateAll((icons) =>
        icons.slice(0, 3).map((icon) => {
          const direction = new DOMMatrix(getComputedStyle(icon).transform).a;
          return direction < -0.99 ? "up" : direction > 0.99 ? "down" : "moving";
        }),
      ),
    )
    .toEqual(["up", "down", "up"]);
});

test("keeps populated document overlays aligned and contained across responsive widths", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tessa/");

    const stack = page.locator(".document-stack");
    await stack.scrollIntoViewIfNeeded();
    await expect(stack.locator(".document-card")).toHaveCount(3);
    await expect(stack.locator('[data-kind="ts"] [data-field="fiscal-code"]')).toHaveText(
      "RSSGNN38A13D969W",
    );
    await expect(stack.locator('[data-kind="cie"] [data-field="document-number"]')).toHaveText(
      "CA12345NA",
    );
    await expect(stack.locator('[data-kind="licence"] [data-field="document-number"]')).toHaveText(
      "XX1234567Z",
    );

    for (const theme of ["light", "dark"] as const) {
      await setTheme(page, theme);
      for (const kind of ["ts", "cie", "licence"] as const) {
        const card = stack.locator(`[data-kind="${kind}"]`);
        await expect(card.locator("img")).toBeVisible();
        await expect(card.locator(".document-card__fields")).toBeVisible();
        const cardBox = await card.boundingBox();
        expect(cardBox?.x, `${kind} left edge in ${theme} at ${width}px`).toBeGreaterThanOrEqual(-1);
        expect(
          (cardBox?.x ?? 0) + (cardBox?.width ?? 0),
          `${kind} right edge in ${theme} at ${width}px`,
        ).toBeLessThanOrEqual(width + 1);
        expect(
          await card.evaluate((element) => {
            const fields = element.querySelectorAll<HTMLElement>(".document-field");
            return [...fields].every((field) => {
              const container = field.parentElement;
              if (!container) return false;
              return (
                field.offsetLeft >= 0 &&
                field.offsetTop >= 0 &&
                field.offsetLeft + field.offsetWidth <= container.clientWidth + 1 &&
                field.offsetTop + field.offsetHeight <= container.clientHeight + 1
              );
            });
          }),
          `${kind} overlay containment in ${theme} at ${width}px`,
        ).toBe(true);
      }
    }

    if (width <= 768) {
      await stack.hover();
      for (const kind of ["ts", "cie", "licence"] as const) {
        const cardBox = await stack.locator(`[data-kind="${kind}"]`).boundingBox();
        expect(cardBox?.x, `${kind} hover left edge at ${width}px`).toBeGreaterThanOrEqual(-1);
        expect(
          (cardBox?.x ?? 0) + (cardBox?.width ?? 0),
          `${kind} hover right edge at ${width}px`,
        ).toBeLessThanOrEqual(width + 1);
      }
    }
  }
});

test("keeps each fast-access screenshot and caption in one correctly layered preview card", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tessa/");

    const media = page.locator(".access-story__media");
    await media.scrollIntoViewIfNeeded();
    const details = media.locator(".product-preview-card--details");
    const barcode = media.locator(".product-preview-card--barcode");

    await expect(media.locator(".product-preview-card")).toHaveCount(2);
    await expect(details.locator(":scope > .product-preview-card__viewport")).toHaveCount(1);
    await expect(details.locator(":scope > figcaption")).toHaveText("Dettagli ordinati");
    await expect(barcode.locator(":scope > .product-preview-card__viewport")).toHaveCount(1);
    await expect(barcode.locator(":scope > figcaption")).toHaveText(
      "Codici a barre a schermo intero",
    );

    const detailsLayer = Number.parseInt(
      await details.evaluate((element) => getComputedStyle(element).zIndex),
      10,
    );
    const barcodeLayer = Number.parseInt(
      await barcode.evaluate((element) => getComputedStyle(element).zIndex),
      10,
    );
    expect(barcodeLayer, `foreground layer at ${width}px`).toBeGreaterThan(detailsLayer);

    for (const card of [details, barcode]) {
      const cardBox = await card.boundingBox();
      const captionBox = await card.locator(":scope > figcaption").boundingBox();
      expect(cardBox?.x, `card left edge at ${width}px`).toBeGreaterThanOrEqual(-1);
      expect(
        (cardBox?.x ?? 0) + (cardBox?.width ?? 0),
        `card right edge at ${width}px`,
      ).toBeLessThanOrEqual(width + 1);
      expect(captionBox?.x, `caption left edge at ${width}px`).toBeGreaterThanOrEqual(
        (cardBox?.x ?? 0) - 1,
      );
      expect(
        (captionBox?.x ?? 0) + (captionBox?.width ?? 0),
        `caption right edge at ${width}px`,
      ).toBeLessThanOrEqual((cardBox?.x ?? 0) + (cardBox?.width ?? 0) + 1);
      expect(captionBox?.y, `caption top edge at ${width}px`).toBeGreaterThanOrEqual(
        (cardBox?.y ?? 0) - 1,
      );
      expect(
        (captionBox?.y ?? 0) + (captionBox?.height ?? 0),
        `caption bottom edge at ${width}px`,
      ).toBeLessThanOrEqual((cardBox?.y ?? 0) + (cardBox?.height ?? 0) + 1);
    }

    for (const theme of ["light", "dark"] as const) {
      await setTheme(page, theme);
      await expect
        .poll(() => details.locator("img").evaluate((image) => (image as HTMLImageElement).currentSrc))
        .toContain(theme === "dark" ? "details-dark.webp" : "details.webp");
      await expect
        .poll(() => barcode.locator("img").evaluate((image) => (image as HTMLImageElement).currentSrc))
        .toContain(theme === "dark" ? "barcode-dark.webp" : "barcode.webp");
    }
  }
});

test("presents the family screenshot as a status-bar-free close-up without decorative controls", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tessa/");

    const media = page.locator(".family-story__media");
    await media.scrollIntoViewIfNeeded();
    const frame = media.locator(".screenshot-window--family");
    const image = frame.locator("img");

    await expect(media.locator(":scope > *")).toHaveCount(1);
    await expect(page.locator(".family-orbits")).toHaveCount(0);
    await expect(frame).toBeVisible();

    const frameBox = await frame.boundingBox();
    const imageBox = await image.boundingBox();
    expect(frameBox?.x, `family screenshot left edge at ${width}px`).toBeGreaterThanOrEqual(-1);
    expect(
      (frameBox?.x ?? 0) + (frameBox?.width ?? 0),
      `family screenshot right edge at ${width}px`,
    ).toBeLessThanOrEqual(width + 1);

    const croppedShare =
      ((frameBox?.y ?? 0) - (imageBox?.y ?? 0)) / (imageBox?.height ?? 1);
    expect(croppedShare, `family screenshot top crop at ${width}px`).toBeGreaterThan(0.04);
    expect(croppedShare, `family screenshot top crop at ${width}px`).toBeLessThan(0.05);

    for (const theme of ["light", "dark"] as const) {
      await setTheme(page, theme);
      await expect
        .poll(() => image.evaluate((element) => (element as HTMLImageElement).currentSrc))
        .toContain(theme === "dark" ? "family-dark.webp" : "family.webp");
    }
  }
});

test("removes the status bar from editorial close-ups while preserving the full-device hero", async ({ page }) => {
  const closeUps = [
    [".screenshot-window--sharing", "sharing"],
    [".screenshot-window--settings", "settings"],
    [".screenshot-window--pin", "pin"],
  ] as const;

  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tessa/");

    for (const section of [".sharing-story", ".privacy-story", ".showcase-story"]) {
      await page.locator(section).scrollIntoViewIfNeeded();
    }

    await expect(page.locator(".share-path span")).toHaveCount(3);
    await expect(page.locator(".share-path i")).toHaveCount(2);
    expect(
      await page
        .locator(".phone-frame--hero img")
        .evaluate((image) => getComputedStyle(image).transform),
    ).toBe("none");

    for (const [selector] of closeUps) {
      const wrapper = page.locator(selector);
      const image = wrapper.locator("img");
      const wrapperBox = await wrapper.boundingBox();
      const imageBox = await image.boundingBox();
      expect(wrapperBox?.x, `${selector} left edge at ${width}px`).toBeGreaterThanOrEqual(-1);
      expect(
        (wrapperBox?.x ?? 0) + (wrapperBox?.width ?? 0),
        `${selector} right edge at ${width}px`,
      ).toBeLessThanOrEqual(width + 1);

      const croppedShare =
        ((wrapperBox?.y ?? 0) - (imageBox?.y ?? 0)) / (imageBox?.height ?? 1);
      expect(croppedShare, `${selector} top crop at ${width}px`).toBeGreaterThan(0.04);
      expect(croppedShare, `${selector} top crop at ${width}px`).toBeLessThan(0.05);
    }

    for (const theme of ["light", "dark"] as const) {
      await setTheme(page, theme);
      for (const [selector, name] of closeUps) {
        await expect
          .poll(() =>
            page
              .locator(`${selector} img`)
              .evaluate((image) => (image as HTMLImageElement).currentSrc),
          )
          .toContain(`${name}${theme === "dark" ? "-dark" : ""}.webp`);
      }
    }
  }
});

test("balances the privacy story across its feature and screenshot layouts", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tessa/");

    const section = page.locator(".privacy-story");
    const media = section.locator(".privacy-story__media");
    const settings = media.locator(".screenshot-window--settings");
    const pin = media.locator(".screenshot-window--pin");
    const connector = media.locator('.privacy-connector[aria-hidden="true"]');
    const features = section.locator(".privacy-story__heading .feature-pill");
    await section.scrollIntoViewIfNeeded();

    await expect(media.locator(":scope > *")).toHaveCount(3);
    await expect(page.locator(".local-device")).toHaveCount(0);
    await expect(connector.locator(":scope > i")).toHaveCount(1);
    await expect(connector.locator(":scope > span > svg")).toHaveCount(1);
    await expect(features).toHaveText([
      "Memorizzazione locale",
      "PIN facoltativo",
      "Accesso biometrico",
    ]);

    const mediaBox = await media.boundingBox();
    const settingsBox = await settings.boundingBox();
    const pinBox = await pin.boundingBox();
    const lockBox = await connector.locator(":scope > span").boundingBox();
    expect(Math.abs((settingsBox?.width ?? 0) - (pinBox?.width ?? 0))).toBeLessThan(1);
    expect(Math.abs((settingsBox?.height ?? 0) - (pinBox?.height ?? 0))).toBeLessThan(1);
    expect(
      Math.abs(
        ((lockBox?.x ?? 0) + (lockBox?.width ?? 0) / 2) -
          ((mediaBox?.x ?? 0) + (mediaBox?.width ?? 0) / 2),
      ),
      `centred lock at ${width}px`,
    ).toBeLessThan(1);
    expect((settingsBox?.x ?? 0) + (settingsBox?.width ?? 0)).toBeLessThan(
      (lockBox?.x ?? 0) + (lockBox?.width ?? 0),
    );
    expect(pinBox?.x ?? 0).toBeGreaterThan(lockBox?.x ?? 0);
    expect(
      await connector.locator(":scope > i").evaluate((element) =>
        getComputedStyle(element).borderTopStyle,
      ),
    ).toBe("dashed");

    const featureBoxes = await features.evaluateAll((elements) =>
      elements.map((element) => {
        const { height, width: itemWidth, x, y } = element.getBoundingClientRect();
        return { height, width: itemWidth, x, y };
      }),
    );
    const introBox = await section.locator(".section-intro").boundingBox();
    if (width > 1072) {
      expect(featureBoxes[0].x).toBeGreaterThan(
        (introBox?.x ?? 0) + (introBox?.width ?? 0),
      );
      expect(Math.max(...featureBoxes.map(({ x }) => x)) - Math.min(...featureBoxes.map(({ x }) => x))).toBeLessThan(1);
      expect(featureBoxes[1].y).toBeGreaterThan(featureBoxes[0].y);
      expect(featureBoxes[2].y).toBeGreaterThan(featureBoxes[1].y);
    } else if (width > 560) {
      expect(featureBoxes[0].y).toBeGreaterThan(
        (introBox?.y ?? 0) + (introBox?.height ?? 0),
      );
      expect(Math.max(...featureBoxes.map(({ y }) => y)) - Math.min(...featureBoxes.map(({ y }) => y))).toBeLessThan(1);
      expect(featureBoxes[0].x).toBeLessThan(featureBoxes[1].x);
      expect(featureBoxes[1].x).toBeLessThan(featureBoxes[2].x);
    } else {
      expect(featureBoxes[0].y).toBeGreaterThan(
        (introBox?.y ?? 0) + (introBox?.height ?? 0),
      );
      expect(Math.max(...featureBoxes.map(({ x }) => x)) - Math.min(...featureBoxes.map(({ x }) => x))).toBeLessThan(1);
      for (let index = 1; index < featureBoxes.length; index += 1) {
        const gap = featureBoxes[index].y -
          (featureBoxes[index - 1].y + featureBoxes[index - 1].height);
        expect(gap, `compact feature gap at ${width}px`).toBeLessThanOrEqual(4);
      }
    }

    for (const theme of ["light", "dark"] as const) {
      await setTheme(page, theme);
      const [connectorStyle, sharingStyle] = await Promise.all([
        connector.locator(":scope > span").evaluate((element) => {
          const style = getComputedStyle(element);
          return { background: style.backgroundColor, colour: style.color, shadow: style.boxShadow };
        }),
        page.locator(".share-path span").nth(1).evaluate((element) => {
          const style = getComputedStyle(element);
          return { background: style.backgroundColor, colour: style.color };
        }),
      ]);
      expect(connectorStyle.background).toBe(sharingStyle.background);
      expect(connectorStyle.colour).toBe(sharingStyle.colour);
      expect(connectorStyle.shadow).toBe("none");
    }
  }

  await page.setViewportSize({ width: 640, height: 900 });
  await page.goto("/tessa/en/");
  await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
  await page.locator(".privacy-story").scrollIntoViewIfNeeded();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    ),
  ).toBe(true);
  await expect(page.locator(".privacy-story .feature-pill")).toHaveCount(3);
});

test("keeps the final CTA badges uniform and centres its illustration when stacked", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tessa/");

    const section = page.locator(".download-story");
    const inner = section.locator(".download-story__inner");
    const mark = section.locator(".download-story__mark");
    const badges = section.locator(".store-badges a");
    await section.scrollIntoViewIfNeeded();

    await expect(section.locator(":scope .section-intro")).toHaveCount(1);
    const [ctaEyebrowStyle, sectionEyebrowStyle] = await Promise.all([
      section.locator(".eyebrow").evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          color: style.color,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          letterSpacing: style.letterSpacing,
          lineHeight: style.lineHeight,
          marginBottom: style.marginBottom,
        };
      }),
      page.locator(".faq-story .eyebrow").evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          color: style.color,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          letterSpacing: style.letterSpacing,
          lineHeight: style.lineHeight,
          marginBottom: style.marginBottom,
        };
      }),
    ]);
    expect(ctaEyebrowStyle, `final CTA eyebrow at ${width}px`).toEqual(sectionEyebrowStyle);

    await expect(badges).toHaveCount(2);
    await expect(badges.nth(0).locator("img")).toHaveAttribute(
      "alt",
      "Scarica TesSa da Google Play",
    );
    await expect(badges.nth(1).locator("img")).toHaveAttribute(
      "alt",
      "Scarica TesSa dall'App Store",
    );
    await expect(badges.nth(0).locator("img")).toHaveAttribute(
      "src",
      /google-play-badge\.svg$/,
    );
    await expect(badges.nth(1).locator("img")).toHaveAttribute(
      "src",
      /app-store-badge\.svg$/,
    );

    const badgeBoxes = await badges.evaluateAll((elements) =>
      elements.map((element) => {
        const { height, width: badgeWidth } = element.getBoundingClientRect();
        return { height, width: badgeWidth };
      }),
    );
    expect(badgeBoxes[0].height).toBe(52);
    expect(badgeBoxes[1].height).toBe(52);
    expect(badgeBoxes[0].width).not.toBe(badgeBoxes[1].width);

    const imageTreatments = await badges.locator("img").evaluateAll((images) =>
      images.map((image) => {
        const style = getComputedStyle(image);
        return { borderRadius: style.borderRadius, transform: style.transform };
      }),
    );
    expect(imageTreatments).toEqual([
      { borderRadius: "0px", transform: "none" },
      { borderRadius: "0px", transform: "none" },
    ]);

    const columns = await inner.evaluate((element) => getComputedStyle(element).gridTemplateColumns);
    if (columns.split(" ").length === 1) {
      const innerBox = await inner.boundingBox();
      const markBox = await mark.boundingBox();
      expect(
        Math.abs(
          ((markBox?.x ?? 0) + (markBox?.width ?? 0) / 2) -
            ((innerBox?.x ?? 0) + (innerBox?.width ?? 0) / 2),
        ),
        `centred CTA illustration at ${width}px`,
      ).toBeLessThan(1);
    }
  }
});

test("uses an intentional two-row footer below the wide desktop breakpoint", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tessa/");

    const footer = page.locator(".site-footer");
    const brand = footer.locator(".site-footer__brand");
    const groups = footer.locator(".site-footer__links > nav");
    const copyright = footer.locator(".site-footer__copyright");
    await footer.scrollIntoViewIfNeeded();

    await expect(groups).toHaveCount(2);
    const brandBox = await brand.boundingBox();
    const groupBoxes = await groups.evaluateAll((elements) =>
      elements.map((element) => {
        const { height, width: groupWidth, x, y } = element.getBoundingClientRect();
        return { height, width: groupWidth, x, y };
      }),
    );
    const copyrightBox = await copyright.boundingBox();

    if (width <= 1072) {
      expect(groupBoxes[0].y).toBeGreaterThan(
        (brandBox?.y ?? 0) + (brandBox?.height ?? 0),
      );
      expect(Math.abs(groupBoxes[0].y - groupBoxes[1].y)).toBeLessThan(1);
      expect(groupBoxes[0].x).toBeLessThan(groupBoxes[1].x);
    } else {
      expect(Math.abs((brandBox?.y ?? 0) - groupBoxes[0].y)).toBeLessThan(1);
      expect(Math.abs(groupBoxes[0].y - groupBoxes[1].y)).toBeLessThan(1);
    }
    expect(copyrightBox?.y ?? 0).toBeGreaterThan(
      Math.max(...groupBoxes.map(({ height, y }) => y + height)),
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      ),
    ).toBe(true);
  }

  await page.setViewportSize({ width: 640, height: 900 });
  await page.goto("/tessa/en/");
  await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
  await page.locator(".site-footer").scrollIntoViewIfNeeded();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    ),
  ).toBe(true);
});

test("uses feature-oriented showcase crops in the correct responsive grid", async ({ page }) => {
  const cropSelectors = [
    ".showcase-card__crop--top",
    ".showcase-card__crop--middle",
    ".showcase-card__crop--bottom",
    ".showcase-card__crop--menu",
  ];
  const screenshotNames = ["wallet", "details", "sharing", "add-menu"];

  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tessa/");
    const section = page.locator(".showcase-story");
    const cards = section.locator(".showcase-card");
    await section.scrollIntoViewIfNeeded();

    await expect(cards).toHaveCount(4);
    await expect(cards.locator("figcaption")).toHaveText([
      "01Cerca e filtra",
      "02Consulta i dettagli",
      "03Condividi con QR o link",
      "04Aggiungi ciò che serve",
    ]);

    const cardBoxes = await cards.evaluateAll((elements) =>
      elements.map((element) => {
        const { x, y } = element.getBoundingClientRect();
        return { x, y };
      }),
    );
    if (width <= 1072) {
      expect(Math.abs(cardBoxes[0].y - cardBoxes[1].y)).toBeLessThan(1);
      expect(Math.abs(cardBoxes[2].y - cardBoxes[3].y)).toBeLessThan(1);
      expect(cardBoxes[0].x).toBeLessThan(cardBoxes[1].x);
      expect(cardBoxes[2].x).toBeLessThan(cardBoxes[3].x);
      expect(cardBoxes[2].y).toBeGreaterThan(cardBoxes[0].y);
    } else {
      expect(cardBoxes[0].x).toBeLessThan(cardBoxes[1].x);
      expect(cardBoxes[1].x).toBeLessThan(cardBoxes[2].x);
      expect(cardBoxes[2].x).toBeLessThan(cardBoxes[3].x);
      expect(cardBoxes[1].y).toBeGreaterThan(cardBoxes[0].y);
      expect(cardBoxes[3].y).toBeGreaterThan(cardBoxes[2].y);
    }

    const expectedCrops = width <= 560
      ? [0.0435, 0.07, 0.32, 0.42]
      : width <= 1072
        ? [0.0435, 0.065, 0.34, 0.46]
        : [0.0435, 0.065, 0.13, 0.18];
    for (let index = 0; index < cropSelectors.length; index += 1) {
      const wrapper = section.locator(cropSelectors[index]);
      const image = wrapper.locator("img");
      const wrapperBox = await wrapper.boundingBox();
      const imageBox = await image.boundingBox();
      const croppedShare =
        ((wrapperBox?.y ?? 0) - (imageBox?.y ?? 0)) / (imageBox?.height ?? 1);
      expect(
        Math.abs(croppedShare - expectedCrops[index]),
        `${cropSelectors[index]} crop at ${width}px`,
      ).toBeLessThan(0.012);
    }

    for (const theme of ["light", "dark"] as const) {
      await setTheme(page, theme);
      for (let index = 0; index < cropSelectors.length; index += 1) {
        await expect
          .poll(() =>
            section
              .locator(`${cropSelectors[index]} img`)
              .evaluate((image) => (image as HTMLImageElement).currentSrc),
          )
          .toContain(`${screenshotNames[index]}${theme === "dark" ? "-dark" : ""}.webp`);
      }
    }
  }

  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/tessa/en/");
  await expect(page.locator(".showcase-card figcaption")).toHaveText([
    "01Search and filter",
    "02View the details",
    "03Share by QR code or link",
    "04Add what you need",
  ]);
});

test("moves every showcase card upward by the same hover delta", async ({ page }) => {
  for (const width of [1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tessa/");
    const cards = page.locator(".showcase-card");
    await cards.first().scrollIntoViewIfNeeded();
    const hasFineHover = await page.evaluate(() =>
      matchMedia("(hover: hover) and (pointer: fine)").matches,
    );
    const restingLayoutTranslations = await cards.evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).translate),
    );
    const hoverTransforms: string[] = [];

    for (let index = 0; index < 4; index += 1) {
      const card = cards.nth(index);
      await card.hover();
      await page.waitForTimeout(240);
      const hoveredStyle = await card.evaluate((element) => {
        const style = getComputedStyle(element);
        return { boxShadow: style.boxShadow, transform: style.transform, translate: style.translate };
      });
      expect(hoveredStyle.translate).toBe(restingLayoutTranslations[index]);
      if (hasFineHover) {
        expect(hoveredStyle.transform, `card ${index + 1} at ${width}px`).not.toBe("none");
        expect(hoveredStyle.boxShadow, `card ${index + 1} at ${width}px`).not.toBe("none");
        expect(
          await card.evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m42),
          `card ${index + 1} upward motion at ${width}px`,
        ).toBeLessThan(0);
        hoverTransforms.push(hoveredStyle.transform);
      } else {
        expect(hoveredStyle.transform, `touch card ${index + 1} at ${width}px`).toBe("none");
      }
      await page.mouse.move(0, 0);
      await page.waitForTimeout(240);
    }

    if (hasFineHover) {
      expect(new Set(hoverTransforms).size).toBe(1);
    }
  }
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

test("keeps the hero phone boundary legible in both themes", async ({ page }) => {
  const outlines = new Map<string, string>();

  for (const theme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto("/tessa/");

    const boxShadow = await page
      .locator(".phone-frame--hero")
      .evaluate((element) => getComputedStyle(element).boxShadow);
    expect(boxShadow, `${theme} hero phone outline`).toContain("0px 0px 0px 1px");
    outlines.set(theme, boxShadow);
  }

  expect(outlines.get("dark")).not.toBe(outlines.get("light"));
});

test("keeps showcase screenshot cards visibly bounded in both themes", async ({ page }) => {
  for (const theme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto("/tessa/");

    const border = await page
      .locator(".showcase-card")
      .first()
      .evaluate((element) => getComputedStyle(element).borderTop);
    expect(border, `${theme} showcase card boundary`).toContain("1px");
    expect(border).toContain("solid");
  }
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

  const healthCard = page.locator('.document-card[data-kind="ts"]');
  const restingCardTransform = await healthCard.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await page.locator(".document-stack").hover();
  await expect
    .poll(() => healthCard.evaluate((element) => getComputedStyle(element).transform))
    .toBe(restingCardTransform);

  const showcaseCard = page.locator(".showcase-card").first();
  const restingShowcaseTransform = await showcaseCard.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await showcaseCard.hover();
  await expect
    .poll(() => showcaseCard.evaluate((element) => getComputedStyle(element).transform))
    .toBe(restingShowcaseTransform);

  const faqEntry = page.locator(".faq-list details").nth(1);
  const faqChevron = faqEntry.locator('i[aria-hidden="true"] svg');
  await expect
    .poll(() => faqChevron.evaluate((element) => getComputedStyle(element).transitionProperty))
    .toBe("none");
  await faqEntry.locator("summary").click();
  await expect(faqEntry).toHaveAttribute("open", "");
  expect(
    await faqChevron.evaluate(
      (element) => new DOMMatrix(getComputedStyle(element).transform).a,
    ),
  ).toBeLessThan(-0.99);
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
