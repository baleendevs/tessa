export const THEME_STORAGE_KEY = "tessa-theme";

export const themePreferences = ["light", "dark"] as const;
export type ThemePreference = (typeof themePreferences)[number];
export type ResolvedTheme = ThemePreference;

export function isThemePreference(value: unknown): value is ThemePreference {
  return (
    typeof value === "string" &&
    themePreferences.includes(value as ThemePreference)
  );
}

export function normaliseThemePreference(
  value: unknown,
): ThemePreference | null {
  return isThemePreference(value) ? value : null;
}

export function resolveTheme(
  preference: ThemePreference | null,
  systemPrefersDark: boolean,
): ResolvedTheme {
  return preference ?? (systemPrefersDark ? "dark" : "light");
}

export const themeColours: Record<ResolvedTheme, string> = {
  light: "#f7f9fb",
  dark: "#151515",
};
