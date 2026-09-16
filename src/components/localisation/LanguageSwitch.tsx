"use client";

import { useEffect, useRef } from "react";
import type { Locale, RouteKey } from "@/lib/site";
import { routePath } from "@/lib/site";

type LanguageSwitchProps = {
  locale: Locale;
  route: RouteKey;
  label: string;
  preserveSearch?: boolean;
};

export function LanguageSwitch({
  locale,
  route,
  label,
  preserveSearch = false,
}: LanguageSwitchProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const targetLocale: Locale = locale === "it" ? "en" : "it";
  const targetPath = routePath(targetLocale, route);

  useEffect(() => {
    const updateTarget = () => {
      if (linkRef.current) {
        const search = preserveSearch ? window.location.search : "";
        linkRef.current.href = `${targetPath}${search}${window.location.hash}`;
      }
    };
    updateTarget();
    window.addEventListener("hashchange", updateTarget);
    return () => window.removeEventListener("hashchange", updateTarget);
  }, [preserveSearch, targetPath]);

  return (
    <a
      className="marketing-language-switch"
      data-testid="language-switch"
      href={targetPath}
      hrefLang={targetLocale === "it" ? "it" : "en-GB"}
      ref={linkRef}
    >
      <span aria-hidden="true">{targetLocale.toUpperCase()}</span>
      <span className="sr-only">{label}</span>
    </a>
  );
}
