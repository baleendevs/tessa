"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/content/dictionaries";
import {
  normaliseThemePreference,
  resolveTheme,
  themeColours,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemePreference,
} from "@/lib/theme";

function updateThemeScreenshots(theme: ResolvedTheme) {
  document
    .querySelectorAll<HTMLSourceElement>(
      "[data-theme-screenshot] source[data-theme-dark]",
    )
    .forEach((source) => {
      source.media = theme === "dark" ? "all" : "not all";
    });
}

function applyTheme(preference: ThemePreference | null) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const resolved = resolveTheme(preference, media.matches);
  const root = document.documentElement;

  root.dataset.theme = resolved;
  if (preference) {
    root.dataset.themePreference = preference;
  } else {
    delete root.dataset.themePreference;
  }
  root.style.colorScheme = resolved;

  const themeColour = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  themeColour?.setAttribute("content", themeColours[resolved]);
  updateThemeScreenshots(resolved);
}

type ThemeToggleProps = {
  labels: Dictionary["theme"];
};

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="theme-toggle__to-dark"
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        d="M20.4 15.6A8.5 8.5 0 0 1 8.4 3.6 8.5 8.5 0 1 0 20.4 15.6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="theme-toggle__to-light"
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="3.75" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5V5m0 14v2.5M2.5 12H5m14 0h2.5M5.3 5.3l1.8 1.8m9.8 9.8 1.8 1.8m0-13.4-1.8 1.8m-9.8 9.8-1.8 1.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function ThemeToggle({ labels }: ThemeToggleProps) {
  const preferenceRef = useRef<ThemePreference | null>(null);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      // The theme remains usable for this page when storage is unavailable.
    }

    preferenceRef.current = normaliseThemePreference(stored);
    if (stored !== null && preferenceRef.current === null) {
      try {
        window.localStorage.removeItem(THEME_STORAGE_KEY);
      } catch {
        // Ignore unavailable storage and keep the system-derived appearance.
      }
    }
    applyTheme(preferenceRef.current);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (preferenceRef.current === null) {
        applyTheme(null);
      }
    };

    media.addEventListener("change", handleSystemThemeChange);
    return () => media.removeEventListener("change", handleSystemThemeChange);
  }, []);

  function handleToggle() {
    const current = document.documentElement.dataset.theme === "dark"
      ? "dark"
      : "light";
    const next: ThemePreference = current === "dark" ? "light" : "dark";
    preferenceRef.current = next;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // The explicit choice still applies for the rest of this page visit.
    }
    applyTheme(next);
  }

  return (
    <button
      className="theme-toggle"
      data-testid="theme-toggle"
      onClick={handleToggle}
      type="button"
    >
      <MoonIcon />
      <SunIcon />
      <span className="theme-toggle__to-dark sr-only">
        {labels.switchToDark}
      </span>
      <span className="theme-toggle__to-light sr-only">
        {labels.switchToLight}
      </span>
    </button>
  );
}
