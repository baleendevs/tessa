"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/site";
import { routePath } from "@/lib/site";

type MarketingLanguageSwitchProps = {
  locale: Locale;
  label: string;
};

export function MarketingLanguageSwitch({ locale, label }: MarketingLanguageSwitchProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const targetLocale: Locale = locale === "it" ? "en" : "it";
  const targetPath = routePath(targetLocale, "home");

  useEffect(() => {
    const updateFragment = () => {
      if (linkRef.current) linkRef.current.href = `${targetPath}${window.location.hash}`;
    };
    updateFragment();
    window.addEventListener("hashchange", updateFragment);
    return () => window.removeEventListener("hashchange", updateFragment);
  }, [targetPath]);

  return (
    <a
      className="marketing-language-switch"
      href={targetPath}
      hrefLang={targetLocale === "it" ? "it" : "en-GB"}
      ref={linkRef}
    >
      <span aria-hidden="true">{targetLocale.toUpperCase()}</span>
      <span className="sr-only">{label}</span>
    </a>
  );
}
