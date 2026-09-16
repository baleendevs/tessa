import { defineConfig, devices } from "@playwright/test";
import { SITE_BASE_PATH } from "./src/lib/site";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
  },
  webServer: {
    command: "node scripts/serve-static.mjs",
    url: `http://127.0.0.1:4173${SITE_BASE_PATH}/`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "mobile-webkit",
      testMatch: "**/mobile-browser.spec.ts",
      use: { ...devices["iPhone 13"] },
    },
  ],
});
