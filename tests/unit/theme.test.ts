import { describe, expect, it } from "vitest";
import {
  isThemePreference,
  normaliseThemePreference,
  resolveTheme,
} from "../../src/lib/theme";

describe("theme preference", () => {
  it("accepts only explicit Light and Dark preferences", () => {
    expect(isThemePreference("light")).toBe(true);
    expect(isThemePreference("dark")).toBe(true);
    expect(isThemePreference("system")).toBe(false);
  });

  it("represents missing, legacy System, and invalid values as unsaved", () => {
    expect(normaliseThemePreference(undefined)).toBeNull();
    expect(normaliseThemePreference("system")).toBeNull();
    expect(normaliseThemePreference("sepia")).toBeNull();
  });

  it("resolves an unsaved preference from the operating-system preference", () => {
    expect(resolveTheme(null, false)).toBe("light");
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });
});
