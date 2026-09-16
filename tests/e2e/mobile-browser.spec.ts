import { expect, test } from "@playwright/test";
import type { Page, TestInfo } from "@playwright/test";

async function activateThemeToggle(page: Page, testInfo: TestInfo) {
  const toggle = page.getByTestId("theme-toggle");
  if (testInfo.project.name.startsWith("mobile-")) {
    await toggle.tap();
  } else {
    await toggle.click();
  }
}

test("switches from system Dark to explicit Light before hydration", async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.route("**/*.js", (route) => route.abort());
  await page.goto("/tessa/", { waitUntil: "domcontentloaded" });

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await activateThemeToggle(page, testInfo);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#f7f9fb");
  await expect(page.locator('[data-theme-screenshot] source[data-theme-dark]').first()).toHaveAttribute("media", "not all");
  await expect
    .poll(() => page.locator("body").evaluate((body) => getComputedStyle(body).backgroundColor))
    .toBe("rgb(247, 249, 251)");
  expect(await page.evaluate(() => localStorage.getItem("tessa-theme"))).toBe("light");
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("switches from system Light to explicit Dark before hydration", async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.route("**/*.js", (route) => route.abort());
  await page.goto("/tessa/en/", { waitUntil: "domcontentloaded" });

  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await activateThemeToggle(page, testInfo);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#151515");
  await expect(page.locator('[data-theme-screenshot] source[data-theme-dark]').first()).toHaveAttribute("media", "all");
  await expect
    .poll(() => page.locator("body").evaluate((body) => getComputedStyle(body).backgroundColor))
    .toBe("rgb(21, 21, 21)");
  expect(await page.evaluate(() => localStorage.getItem("tessa-theme"))).toBe("dark");
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("follows system changes only until a touch user chooses a theme", async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/tessa/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => localStorage.getItem("tessa-theme"))).toBeNull();

  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await activateThemeToggle(page, testInfo);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => localStorage.getItem("tessa-theme"))).toBe("dark");

  await page.emulateMedia({ colorScheme: "dark" });
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("supports the legacy mobile MediaQueryList listener API", async ({ page }, testInfo) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => {
    const nativeMatchMedia = window.matchMedia.bind(window);
    (window as Window & { legacyThemeSubscriptions?: number }).legacyThemeSubscriptions = 0;
    window.matchMedia = (query: string) => {
      const media = nativeMatchMedia(query);
      return {
        get matches() { return media.matches; },
        media: media.media,
        onchange: null,
        addListener(listener) {
          const state = window as Window & { legacyThemeSubscriptions?: number };
          state.legacyThemeSubscriptions = (state.legacyThemeSubscriptions ?? 0) + 1;
          media.addListener(listener);
        },
        removeListener(listener) { media.removeListener(listener); },
        dispatchEvent(event) { return media.dispatchEvent(event); },
      } as MediaQueryList;
    };
  });
  await page.goto("/tessa/");

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => (window as Window & { legacyThemeSubscriptions?: number }).legacyThemeSubscriptions)).toBeGreaterThan(0);
  await activateThemeToggle(page, testInfo);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(pageErrors).toEqual([]);
});

test("advances the section navigator before React hydration", async ({ page }, testInfo) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.setViewportSize({ width: 390, height: 900 });
  await page.route("**/*.js", (route) => route.abort());
  await page.goto("/tessa/", { waitUntil: "domcontentloaded" });

  const button = page.getByRole("button", { name: "Vai alla sezione successiva" });
  await expect(button).toBeVisible();
  await expect(button).toHaveAttribute("data-section-navigation-ready", "true");

  if (testInfo.project.name.startsWith("mobile-")) {
    await button.tap();
  } else {
    await button.click();
  }
  await expect
    .poll(() =>
      page.evaluate(() => {
        const header = document.querySelector(".marketing-header")?.getBoundingClientRect();
        const section = document.querySelector("#documents")?.getBoundingClientRect();
        return Boolean(header && section && section.top >= header.bottom && section.top <= header.bottom + 16);
      }),
    )
    .toBe(true);

  expect(pageErrors).toEqual([]);
});
