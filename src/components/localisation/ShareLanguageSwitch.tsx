"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/site";
import { routePath } from "@/lib/site";

type ShareLanguageSwitchProps = {
  locale: Locale;
  label: string;
};

export function ShareLanguageSwitch({
  locale,
  label,
}: ShareLanguageSwitchProps) {
  const targetLocale: Locale = locale === "it" ? "en" : "it";
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    linkRef.current?.setAttribute(
      "href",
      `${routePath(targetLocale, "share")}${window.location.search}${window.location.hash}`,
    );
    linkRef.current?.removeAttribute("aria-disabled");
  }, [targetLocale]);

  return (
    <a
      aria-disabled="true"
      className="inline-flex min-h-12 items-center rounded-full border border-outline px-4 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-high aria-disabled:pointer-events-none aria-disabled:opacity-60"
      data-testid="share-language-switch"
      hrefLang={targetLocale === "it" ? "it" : "en-GB"}
      ref={linkRef}
    >
      <span aria-hidden="true">{targetLocale.toUpperCase()}</span>
      <span className="sr-only">{label}</span>
    </a>
  );
}
