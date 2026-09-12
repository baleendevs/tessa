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
    [compactIdentityCard, "CIE", "Carta d'Identità Elettronica"],
    [legacyAliasIdentityCard, "CIE", "Luogo Storico"],
    [drivingLicence, "P", "Categorie della patente"],
    [releasedFullKeyHealthCard, "TS", "12345"],
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
  await expect(page.getByText(compactIdentityCard.iR)).toBeVisible();
  await expect(page.getByText(compactIdentityCard.cAN).first()).toBeVisible();
  await expect(page.getByText(compactIdentityCard.m)).toBeVisible();

  await page.goto(`/tessa/share?card=${encodeFixture(drivingLicence)}`);
  await expect(page.getByText(drivingLicence.rD)).toBeVisible();
  await expect(page.getByText("B", { exact: true })).toBeVisible();
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
  await expect(page.getByText("Shared details")).toBeVisible();
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
    await expect(page).toHaveURL(new RegExp(route.split("?")[0].replace(".", "\\.")));
  }
});

test("preserves the exact raw query and fragment on language switching", async ({
  page,
}) => {
  const rawQuery = `?card=${healthCardPayload}&source=a+b%2Bc#details`;
  await page.goto(`/tessa/share${rawQuery}`);
  await expect(page.getByTestId("share-language-switch")).toHaveAttribute(
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
    await expect(page.getByTestId("share-language-switch")).toHaveAttribute(
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

  await expect(page).toHaveTitle("Tessera condivisa — TesSa");
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
    page.getByTestId("share-language-switch"),
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
