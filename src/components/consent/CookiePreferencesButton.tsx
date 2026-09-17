"use client";

import { openCookiePreferences } from "./consent-storage";

type CookiePreferencesButtonProps = {
  label: string;
};

export function CookiePreferencesButton({ label }: CookiePreferencesButtonProps) {
  return (
    <button
      className="site-footer__link-button"
      data-open-cookie-preferences
      data-testid="cookie-preferences-button"
      onClick={() => openCookiePreferences()}
      type="button"
    >
      {label}
    </button>
  );
}
