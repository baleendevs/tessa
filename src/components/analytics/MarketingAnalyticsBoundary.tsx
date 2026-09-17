"use client";

import type { Locale } from "@/lib/site";
import { GoogleAnalytics } from "./GoogleAnalytics";
import { CookieConsentBanner } from "@/components/consent/CookieConsentBanner";

/**
 * MarketingAnalyticsBoundary coordinates Google Analytics 4 and the custom
 * Cookie Consent Banner strictly within marketing and informational layouts.
 * Utility layouts (/share) and 404 remain completely isolated and analytics-free.
 */
export function MarketingAnalyticsBoundary({ locale }: { locale: Locale }) {
  return (
    <>
      <GoogleAnalytics />
      <CookieConsentBanner locale={locale} />
    </>
  );
}
