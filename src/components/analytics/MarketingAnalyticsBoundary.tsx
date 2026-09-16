"use client";

import Script from "next/script";
import { useEffect } from "react";
import type { Locale } from "@/lib/site";

/** ShinyStat is intentionally opt-in through marketing layouts only. */
export function MarketingAnalyticsBoundary({ locale }: { locale: Locale }) {
  useEffect(() => {
    const hideInjectedBadge = () => {
      document
        .querySelectorAll<HTMLElement>(
          'a[href*="shinystat"], img[src*="shinystat"]',
        )
        .forEach((element) => {
          element.hidden = true;
          element.setAttribute("aria-hidden", "true");
          if (element instanceof HTMLAnchorElement) element.tabIndex = -1;
          if (element instanceof HTMLImageElement) element.alt = "";
        });
    };

    const observer = new MutationObserver(hideInjectedBadge);
    observer.observe(document.body, { childList: true, subtree: true });
    hideInjectedBadge();
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Script
        data-marketing-analytics="shinystat"
        id="tessa-shinystat"
        src="https://codice.shinystat.com/cgi-bin/getcod.cgi?USER=TesSa"
        strategy="afterInteractive"
      />
      <noscript>
        <span className="sr-only">
          {locale === "it"
            ? "Statistiche JavaScript non disponibili."
            : "JavaScript analytics unavailable."}
        </span>
      </noscript>
    </>
  );
}
