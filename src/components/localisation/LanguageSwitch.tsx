"use client";

import { useEffect, useRef } from "react";
import type { Locale, RouteKey } from "@/lib/site";
import { routePath } from "@/lib/site";

type LanguageSwitchProps = {
  locale: Locale;
  route: RouteKey;
  label: string;
};

export function LanguageSwitch({
  locale,
  route,
  label,
}: LanguageSwitchProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const targetLocale: Locale = locale === "it" ? "en" : "it";
  const targetPath = routePath(targetLocale, route);

  useEffect(() => {
    const preserveFragment = () => {
      if (linkRef.current) {
        linkRef.current.href = `${targetPath}${window.location.hash}`;
      }
    };
    preserveFragment();
    window.addEventListener("hashchange", preserveFragment);
    return () => window.removeEventListener("hashchange", preserveFragment);
  }, [targetPath]);

  return (
    <a
      className="inline-flex min-h-12 items-center rounded-full border border-outline px-4 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
      href={targetPath}
      hrefLang={targetLocale === "it" ? "it" : "en-GB"}
      ref={linkRef}
    >
      <span aria-hidden="true">{targetLocale.toUpperCase()}</span>
      <span className="sr-only">{label}</span>
    </a>
  );
}
