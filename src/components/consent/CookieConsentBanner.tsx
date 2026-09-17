"use client";

import { useEffect, useCallback, useSyncExternalStore } from "react";
import { dictionaries } from "@/content/dictionaries";
import type { Locale } from "@/lib/site";
import { routePath } from "@/lib/site";
import {
  getStoredConsent,
  setStoredConsent,
  updateGtagConsent,
  removeGoogleAnalyticsCookies,
  openCookiePreferences,
  closeCookiePreferences,
  subscribeToConsent,
  getConsentSnapshot,
  subscribePreferences,
  getPreferencesSnapshot,
  OPEN_COOKIE_PREFERENCES_EVENT,
} from "./consent-storage";

type CookieConsentBannerProps = {
  locale: Locale;
};

function subscribeMount() {
  return () => {};
}

export function CookieConsentBanner({ locale }: CookieConsentBannerProps) {
  const isMounted = useSyncExternalStore(subscribeMount, () => true, () => false);

  useSyncExternalStore(subscribeToConsent, getConsentSnapshot, () => null);
  const isPreferencesOpen = useSyncExternalStore(
    subscribePreferences,
    getPreferencesSnapshot,
    () => false,
  );

  const consentRecord = isMounted ? getStoredConsent() : null;
  const isBannerOpen = isMounted && consentRecord === null && !isPreferencesOpen;

  const dictionary = dictionaries[locale].consent;
  const privacyPath = routePath(locale, "privacy");

  useEffect(() => {
    const handleOpen = () => {
      openCookiePreferences();
    };

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpen);

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-open-cookie-preferences]")) {
        event.preventDefault();
        openCookiePreferences();
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpen);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleAccept = useCallback(() => {
    setStoredConsent("granted");
    updateGtagConsent("granted");
    closeCookiePreferences();
  }, []);

  const handleReject = useCallback(() => {
    setStoredConsent("denied");
    updateGtagConsent("denied");
    removeGoogleAnalyticsCookies();
    closeCookiePreferences();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isPreferencesOpen) {
          closeCookiePreferences();
        } else if (isBannerOpen) {
          handleReject();
        }
      }
    };

    if (isBannerOpen || isPreferencesOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBannerOpen, isPreferencesOpen, handleReject]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* First-visit Cookie Consent Banner */}
      {isBannerOpen && (
        <aside
          aria-label={dictionary.title}
          className="fixed inset-x-0 bottom-0 z-[100] p-4 pb-[max(1rem,env(safe-area-inset-bottom,1rem))] sm:p-6 pointer-events-none"
          data-testid="cookie-consent-banner"
          role="region"
        >
          <div className="pointer-events-auto max-w-4xl mx-auto rounded-2xl bg-surface text-on-surface p-5 sm:p-6 shadow-2xl border border-outline/40">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-bold text-on-surface">
                  {dictionary.title}
                </h2>
                <p className="text-sm text-on-surface-muted leading-relaxed">
                  {dictionary.description}{" "}
                  <a
                    className="text-primary underline font-medium hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-xs"
                    href={privacyPath}
                  >
                    {dictionary.privacyPolicy}
                  </a>
                  .
                </p>
              </div>
              <button
                aria-label={dictionary.close}
                className="p-2 text-on-surface-muted hover:text-on-surface hover:bg-surface-container-high rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer shrink-0"
                onClick={handleReject}
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Equal prominence buttons */}
            <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-full font-semibold text-sm text-center border border-outline bg-surface-container-high text-on-surface hover:bg-surface-container active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer min-h-[44px]"
                onClick={handleReject}
                type="button"
              >
                {dictionary.reject}
              </button>
              <button
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-full font-semibold text-sm text-center bg-primary text-on-primary hover:opacity-95 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer min-h-[44px]"
                onClick={handleAccept}
                type="button"
              >
                {dictionary.accept}
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Preferences / Revocation Modal */}
      {isPreferencesOpen && (
        <div
          aria-label={dictionary.preferencesTitle}
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          data-testid="cookie-preferences-modal"
          role="dialog"
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-surface text-on-surface p-6 sm:p-7 shadow-2xl border border-outline/40">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-on-surface">
                {dictionary.preferencesTitle}
              </h2>
              <button
                aria-label={dictionary.close}
                className="p-2 text-on-surface-muted hover:text-on-surface hover:bg-surface-container-high rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                onClick={() => closeCookiePreferences()}
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="mt-3 text-sm text-on-surface-muted leading-relaxed">
              {dictionary.preferencesDescription}
            </p>

            {/* Current status display */}
            <div className="mt-4 p-3.5 rounded-xl bg-surface-container border border-outline/30 text-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-on-surface-muted">
                Stato attuale / Current status
              </div>
              <div className="mt-1 font-medium text-on-surface">
                {consentRecord?.status === "granted"
                  ? dictionary.statusGranted
                  : consentRecord?.status === "denied"
                    ? dictionary.statusDenied
                    : dictionary.statusUnset}
              </div>
            </div>

            <p className="mt-3 text-xs text-on-surface-muted">
              <a
                className="text-primary underline font-medium hover:opacity-80"
                href={privacyPath}
              >
                {dictionary.privacyPolicy}
              </a>
            </p>

            {/* Actions with equal prominence */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-full font-semibold text-sm text-center border border-outline bg-surface-container-high text-on-surface hover:bg-surface-container active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer min-h-[44px]"
                onClick={handleReject}
                type="button"
              >
                {dictionary.reject}
              </button>
              <button
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-full font-semibold text-sm text-center bg-primary text-on-primary hover:opacity-95 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer min-h-[44px]"
                onClick={handleAccept}
                type="button"
              >
                {dictionary.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
