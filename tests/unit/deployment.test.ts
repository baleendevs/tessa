import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("production deployment contract", () => {
  it("publishes the verified Next.js static export rather than legacy dist", () => {
    const packageJson = JSON.parse(
      readFileSync(resolve(process.cwd(), "package.json"), "utf8"),
    ) as { scripts?: Record<string, string> };

    expect(packageJson.scripts?.verify).toContain("npm run build");
    expect(packageJson.scripts?.verify).toContain("npm run test:e2e");
    expect(packageJson.scripts?.deploy).toContain("npm run verify");
    expect(packageJson.scripts?.deploy).toContain("gh-pages -d out");
    expect(packageJson.scripts?.deploy).toContain("--nojekyll");
    expect(packageJson.scripts?.deploy).not.toContain("gh-pages -d dist");
  });
});
