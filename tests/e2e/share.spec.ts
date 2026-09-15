import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import {
  compactHealthCard,
  compactIdentityCard,
  drivingLicence,
  encodeFixture,
  legacyAliasIdentityCard,
  nullableIdentityCard,
  releasedFullKeyHealthCard,
  unicodeHealthCard,
} from "../fixtures/share/fixture-contract";

const healthCardPayload = encodeFixture(compactHealthCard);
const unicodeHealthCardPayload = encodeFixture(unicodeHealthCard);

async function setTheme(page: Page, theme: "light" | "dark") {
  if ((await page.locator("html").getAttribute("data-theme")) !== theme) {
    await page.getByTestId("theme-toggle").click();
  }
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
}

test("renders a valid card through every public share route", async ({ page }) => {
  for (const route of [
    "/tessa/share",
    "/tessa/share.html",
    "/tessa/en/share",
    "/tessa/en/share.html",
  ]) {
    await page.goto(`${route}?card=${healthCardPayload}`);
    await expect(page.getByTestId("shared-card-content")).toHaveAttribute(
      "data-card-kind",
      "TS",
    );
    await expect(page.getByText(compactHealthCard.cF).first()).toBeVisible();
  }
});

test("renders current and legacy document shapes", async ({ page }) => {
  const examples = [
    [compactIdentityCard, "CIE", "Aggiungi questa CIE al tuo portafoglio"],
    [legacyAliasIdentityCard, "CIE", "LUOGO STORICO"],
    [drivingLicence, "P", drivingLicence.nP],
    [releasedFullKeyHealthCard, "TS", releasedFullKeyHealthCard.codiceFiscale],
  ] as const;

  for (const [payload, kind, expectedText] of examples) {
    await page.goto(`/tessa/share?card=${encodeFixture(payload)}`);
    await expect(page.getByTestId("shared-card-content")).toHaveAttribute(
      "data-card-kind",
      kind,
    );
    await expect(page.getByText(expectedText).first()).toBeVisible();
  }

  await page.goto(`/tessa/share?card=${encodeFixture(compactIdentityCard)}`);
  await expect(page.getByText(compactIdentityCard.cAN).first()).toBeVisible();
  await expect(page.getByText(compactIdentityCard.iR)).toHaveCount(0);
  await expect(page.getByText(compactIdentityCard.m)).toHaveCount(0);

  await page.goto(`/tessa/share?card=${encodeFixture(drivingLicence)}`);
  await expect(page.getByText(drivingLicence.rD).last()).toBeVisible();
  await expect(page.getByText("B AM", { exact: true })).toBeVisible();
});

test("renders UTF-8 text and repairs query-decoded plus signs", async ({
  page,
}) => {
  expect(unicodeHealthCardPayload).toContain("+");
  await page.goto(
    `/tessa/share?card=${unicodeHealthCardPayload.replaceAll("+", " ")}`,
  );
  await expect(page.getByText("Zoë 🚲").first()).toBeVisible();
  await expect(page.getByText("D’Àuria").first()).toBeVisible();

  await page.goto(`/tessa/share?card=${unicodeHealthCardPayload}`);
  await expect(page.getByText("Zoë 🚲").first()).toBeVisible();
});

test("handles nullable values without showing implementation values", async ({
  page,
}) => {
  await page.goto(`/tessa/en/share?card=${encodeFixture(nullableIdentityCard)}`);
  await expect(page.getByTestId("shared-card-content")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("null");
  await expect(page.locator("body")).not.toContainText("undefined");
  await expect(
    page.getByRole("heading", { name: "Add this CIE to your wallet" }),
  ).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Shared details");
});

test("shows localised inline error states without redirecting", async ({ page }) => {
  const excessivePayload = encodeFixture({
    ...compactHealthCard,
    future: { a: { b: { c: { d: { e: { f: { g: { h: "deep" } } } } } } } },
  });
  const cases = [
    ["/tessa/share", "", "Nessuna tessera condivisa"],
    ["/tessa/share?card=not-base64!", "", "Non riusciamo a leggere questo link"],
    [
      `/tessa/en/share?card=${encodeFixture({ t: "FUTURE" })}`,
      "",
      "Unsupported document",
    ],
    [
      `/tessa/en/share?card=${encodeFixture({ t: "GP", r: "fixture" })}`,
      "",
      "Legacy content unavailable",
    ],
    [
      `/tessa/share?card=${excessivePayload}`,
      "",
      "Questo link non può essere aperto",
    ],
  ] as const;

  for (const [route, suffix, message] of cases) {
    await page.goto(`${route}${suffix}`);
    await expect(page.getByTestId("share-error")).toContainText(message);
    await expect(page.locator(".store-badges")).toHaveCount(0);
    await expect(page).toHaveURL(new RegExp(route.split("?")[0].replace(".", "\\.")));
  }
});

test("preserves the exact raw query and fragment on language switching", async ({
  page,
}) => {
  const rawQuery = `?card=${healthCardPayload}&source=a+b%2Bc#details`;
  await page.goto(`/tessa/share${rawQuery}`);
  await expect(page.getByTestId("language-switch")).toHaveAttribute(
    "href",
    `/tessa/en/share${rawQuery}`,
  );
});

test("preserves raw queries in both directions and from html aliases", async ({ page }) => {
  expect(unicodeHealthCardPayload).toContain("+");
  const rawQuery = `?source=one+two&card=${unicodeHealthCardPayload}&card=ignored%2Bvalue&empty=&flag#details`;
  const cases = [
    ["/tessa/share.html", `/tessa/en/share${rawQuery}`],
    ["/tessa/en/share.html", `/tessa/share${rawQuery}`],
  ] as const;

  for (const [route, expectedHref] of cases) {
    await page.goto(`${route}${rawQuery}`);
    await expect(page.getByTestId("language-switch")).toHaveAttribute(
      "href",
      expectedHref,
    );
  }
});

test("accepts a percent-encoded standard-Base64 query value", async ({ page }) => {
  await page.goto(`/tessa/share?card=${encodeURIComponent(healthCardPayload)}`);
  await expect(page.getByTestId("shared-card-content")).toHaveAttribute(
    "data-card-kind",
    "TS",
  );
});

test("keeps shared-card metadata generic and private", async ({ page }) => {
  const privateValues = [compactHealthCard.cF, compactHealthCard.c];
  await page.goto(`/tessa/share?card=${healthCardPayload}`);

  await expect(page).toHaveTitle("Documento condiviso — TesSa");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex.*nofollow/,
  );
  await expect(page.locator('meta[name="referrer"]')).toHaveAttribute(
    "content",
    "no-referrer",
  );

  const metadata = await page.locator("head").textContent();
  const headMarkup = await page.locator("head").evaluate((head) => head.innerHTML);
  for (const value of privateValues) {
    expect(metadata).not.toContain(value);
    expect(headMarkup).not.toContain(value);
  }
});

test("makes no third-party or payload-bearing secondary requests", async ({
  page,
}) => {
  const secondaryRequests: Array<{ url: string; referrer: string | undefined }> = [];
  const consoleMessages: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() !== "document") {
      secondaryRequests.push({
        url: request.url(),
        referrer: request.headers().referer,
      });
    }
  });
  page.on("console", (message) => consoleMessages.push(message.text()));

  await page.goto(`/tessa/share?card=${healthCardPayload}`);
  await expect(page.getByTestId("shared-card-content")).toBeVisible();

  for (const request of secondaryRequests) {
    expect(new URL(request.url).origin).toBe("http://127.0.0.1:4173");
    expect(request.url).not.toContain("card=");
    expect(request.url).not.toContain(compactHealthCard.cF);
    expect(request.referrer ?? "").not.toContain("card=");
    expect(request.referrer ?? "").not.toContain(healthCardPayload);
  }
  expect(consoleMessages.join(" ")).not.toContain(compactHealthCard.cF);
  expect(consoleMessages.join(" ")).not.toContain(healthCardPayload);
});

test("supports the shared two-state theme behaviour", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto(`/tessa/share?card=${healthCardPayload}`);
  const toggle = page.getByTestId("theme-toggle");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAccessibleName("Passa al tema chiaro");
  expect(await page.evaluate(() => localStorage.getItem("tessa-theme"))).toBeNull();

  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await page.evaluate(() => localStorage.getItem("tessa-theme"))).toBe("light");
});

test("uses document-specific artwork and payload-derived headings", async ({ page }) => {
  const cases = [
    [compactHealthCard, "TS", "Aggiungi questa Tessera Sanitaria al tuo portafoglio", "tessera_sanitaria_card_bg_generic.jpg"],
    [compactIdentityCard, "CIE", "Aggiungi questa CIE al tuo portafoglio", "cie_card_bg_female.jpg"],
    [drivingLicence, "P", "Aggiungi questa patente al tuo portafoglio", "license_card_bg_no_gender.jpg"],
  ] as const;

  for (const [payload, kind, title, artwork] of cases) {
    await page.goto(`/tessa/share?card=${encodeFixture(payload)}`);
    await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
    await expect(page.getByTestId("document-preview")).toHaveAttribute("data-document-kind", kind);
    await expect(page.getByTestId("document-preview").locator("img")).toHaveAttribute("src", new RegExp(artwork));
  }
});

test("uses one import-focused CTA without a duplicated details panel", async ({ page }) => {
  await page.goto(`/tessa/share?card=${healthCardPayload}`);

  await expect(page.getByText("Hai ricevuto la Tessera Sanitaria di Paola Esempio.")).toBeVisible();
  await expect(page.locator(".store-badges a")).toHaveCount(2);
  await expect(page.locator("body")).not.toContainText("Dettagli condivisi");
  await expect(page.locator("body")).not.toContainText("Porta i tuoi documenti con te");
});

test("keeps document artwork unchanged across light and dark themes", async ({ page }) => {
  await page.goto(`/tessa/share?card=${healthCardPayload}`);
  const preview = page.getByTestId("document-preview");
  const lightImage = await preview.locator("img").getAttribute("src");
  const lightBackground = await preview.evaluate((element) => getComputedStyle(element).backgroundColor);

  await setTheme(page, "dark");
  await expect(preview.locator("img")).toHaveAttribute("src", lightImage ?? "");
  expect(await preview.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe(lightBackground);
});

test("reuses official store badges and the shared locale-aware footer", async ({ page }) => {
  await page.goto(`/tessa/en/share?card=${healthCardPayload}`);
  await expect(page.getByRole("img", { name: "Get TesSa on Google Play" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Download TesSa on the App Store" })).toBeVisible();
  await expect(page.locator("footer.site-footer")).toBeVisible();
  await expect(page.locator("footer.site-footer--utility")).toHaveCount(0);
  await expect(page.locator("footer").getByRole("link", { name: "Documents" })).toHaveAttribute("href", "/tessa/en/#documents");
  await expect(page.locator("footer").getByRole("link", { name: "Terms of Use" })).toHaveAttribute("href", "/tessa/en/terms");
});

test("shares the legal-page header, container, and top-spacing rhythm", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  const measurements = async (route: string) => {
    await page.goto(route);
    return page.evaluate(() => {
      const header = document.querySelector<HTMLElement>("header.marketing-header");
      const main = document.querySelector<HTMLElement>("main.site-content-page");
      if (!header || !main) throw new Error("Shared page shell was not rendered");
      const mainStyle = getComputedStyle(main);
      return {
        headerHeight: header.getBoundingClientRect().height,
        mainLeft: main.getBoundingClientRect().left,
        maxWidth: mainStyle.maxWidth,
        paddingLeft: mainStyle.paddingLeft,
        paddingTop: mainStyle.paddingTop,
      };
    });
  };

  const share = await measurements(`/tessa/share?card=${healthCardPayload}`);
  const terms = await measurements("/tessa/terms");

  expect(share.headerHeight).toBeCloseTo(terms.headerHeight, 1);
  expect(share.mainLeft).toBeCloseTo(terms.mainLeft, 1);
  expect(share.maxWidth).toBe(terms.maxWidth);
  expect(share.paddingLeft).toBe(terms.paddingLeft);
  expect(share.paddingTop).toBe(terms.paddingTop);
});

test("places context, preview, and download action intentionally by breakpoint", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`/tessa/share?card=${healthCardPayload}`);
  const desktopPreview = await page.locator(".share-primary__preview").boundingBox();
  const desktopCopy = await page.locator(".share-primary__copy").boundingBox();
  expect(desktopPreview?.x).toBeLessThan(desktopCopy?.x ?? 0);

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileCopy = await page.locator(".share-primary__copy").boundingBox();
  const mobilePreview = await page.locator(".share-primary__preview").boundingBox();
  const mobileDownload = await page.locator(".share-primary__download").boundingBox();
  expect(mobileCopy?.y).toBeLessThan(mobilePreview?.y ?? 0);
  expect(mobilePreview?.y).toBeLessThan(mobileDownload?.y ?? 0);
});

test("has no horizontal overflow at the required responsive widths and 200% text", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/tessa/share?card=${encodeFixture(drivingLicence)}`);
    const sizes = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(sizes.scroll, `overflow at ${width}px`).toBeLessThanOrEqual(sizes.viewport);
  }

  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto(`/tessa/share?card=${healthCardPayload}`);
  await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
  const zoomed = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(zoomed.scroll).toBeLessThanOrEqual(zoomed.viewport);
  await expect(page.getByTestId("document-preview")).toBeVisible();
});

test("reflows long values at 320 CSS pixels", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  const longPayload = encodeFixture({
    ...compactHealthCard,
    c: "CognomeDimostrativoMoltoLungoSenzaSpazi".repeat(4),
    nT: "1234567890".repeat(15),
  });
  await page.goto(`/tessa/share?card=${longPayload}`);
  await expect(page.getByTestId("document-preview")).toBeVisible();
  const widths = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
  }));
  expect(widths.document).toBeLessThanOrEqual(widths.viewport);
});

test("keeps share utility controls at usable touch sizes", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto(`/tessa/share?card=${healthCardPayload}`);

  for (const control of [
    page.getByTestId("theme-toggle"),
    page.getByTestId("language-switch"),
    page.getByRole("link", { name: "Google Play" }),
    page.getByRole("link", { name: "App Store" }),
  ]) {
    const box = await control.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(48);
    expect(box?.width).toBeGreaterThanOrEqual(48);
  }
});

test("renders untrusted values as text", async ({ page }) => {
  const marker = "<img src=x onerror=window.__fixtureInjected=true>";
  await page.goto(
    `/tessa/share?card=${encodeFixture({ ...compactHealthCard, n: marker })}`,
  );
  await expect(page.getByText(marker).first()).toBeVisible();
  expect(await page.locator('img[src="x"]').count()).toBe(0);
  expect(
    await page.evaluate(() =>
      Boolean((window as Window & { __fixtureInjected?: boolean }).__fixtureInjected),
    ),
  ).toBe(false);
});

test("has no detectable accessibility violations for valid and error states", async ({
  page,
}) => {
  for (const route of [
    `/tessa/share?card=${healthCardPayload}`,
    "/tessa/en/share?card=invalid!",
  ]) {
    await page.goto(route);
    await expect(page.locator('[data-share-status]')).toBeVisible();
    for (const theme of ["light", "dark"] as const) {
      await setTheme(page, theme);
      await page.waitForTimeout(250);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `${route} in ${theme}`).toEqual([]);
    }
  }
});
