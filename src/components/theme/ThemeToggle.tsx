import type { Dictionary } from "@/content/dictionaries";

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
        d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
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
  return (
    <button
      className="theme-toggle"
      data-theme-toggle
      data-testid="theme-toggle"
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
