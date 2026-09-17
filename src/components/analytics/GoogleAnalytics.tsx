"use client";

import Script from "next/script";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  CONSENT_MAX_AGE_MS,
} from "@/components/consent/consent-storage";

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-BY8BZDL4R8";

type GoogleAnalyticsProps = {
  measurementId?: string;
};

export function GoogleAnalytics({
  measurementId = GA_MEASUREMENT_ID,
}: GoogleAnalyticsProps) {
  if (!measurementId) {
    return null;
  }

  const consentModeScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    var storedConsent = 'denied';
    try {
      var raw = window.localStorage.getItem('${CONSENT_STORAGE_KEY}');
      if (raw) {
        var parsed = JSON.parse(raw);
        var now = Date.now();
        if (
          parsed &&
          parsed.status === 'granted' &&
          parsed.version === ${CONSENT_VERSION} &&
          (now - parsed.timestamp) <= ${CONSENT_MAX_AGE_MS} &&
          parsed.timestamp <= now
        ) {
          storedConsent = 'granted';
        }
      }
    } catch (e) {}

    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': storedConsent
    });
  `;

  const configScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      send_page_view: true,
      cookie_expires: 5184000
    });
  `;

  return (
    <>
      <Script
        id="google-consent-mode-default"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: consentModeScript }}
      />
      <Script
        data-marketing-analytics="ga4"
        id="tessa-google-analytics"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: configScript }}
      />
    </>
  );
}
