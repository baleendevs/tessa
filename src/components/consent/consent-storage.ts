export type ConsentStatus = "granted" | "denied";

export interface ConsentRecord {
  status: ConsentStatus;
  timestamp: number;
  version: number;
}

export const CONSENT_STORAGE_KEY = "tessa-cookie-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_DAYS = 180;
export const CONSENT_MAX_AGE_MS = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const OPEN_COOKIE_PREFERENCES_EVENT = "tessa:open-cookie-preferences";

type Listener = () => void;
const consentListeners = new Set<Listener>();
const preferencesListeners = new Set<Listener>();
let isPreferencesModalOpen = false;

function notifyConsentListeners(): void {
  consentListeners.forEach((l) => l());
}

function notifyPreferencesListeners(): void {
  preferencesListeners.forEach((l) => l());
}

/**
 * Subscribes to storage changes (for useSyncExternalStore).
 */
export function subscribeToConsent(listener: Listener): () => void {
  consentListeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) {
      listener();
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }
  return () => {
    consentListeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

export function getConsentSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Subscribes to cookie preferences modal visibility changes.
 */
export function subscribePreferences(listener: Listener): () => void {
  preferencesListeners.add(listener);
  return () => {
    preferencesListeners.delete(listener);
  };
}

export function getPreferencesSnapshot(): boolean {
  return isPreferencesModalOpen;
}

/**
 * Reads and validates stored cookie consent preference from localStorage.
 * Returns null if SSR, uninitialized, corrupt, wrong version, or expired (> 180 days).
 */
export function getStoredConsent(): ConsentRecord | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (
      !parsed ||
      typeof parsed !== "object" ||
      (parsed.status !== "granted" && parsed.status !== "denied") ||
      typeof parsed.timestamp !== "number" ||
      typeof parsed.version !== "number"
    ) {
      return null;
    }

    if (parsed.version !== CONSENT_VERSION) {
      return null;
    }

    const now = Date.now();
    // Expiration check: older than 180 days or clock-skewed into the future
    if (now - parsed.timestamp > CONSENT_MAX_AGE_MS || parsed.timestamp > now) {
      return null;
    }

    return {
      status: parsed.status,
      timestamp: parsed.timestamp,
      version: parsed.version,
    };
  } catch {
    return null;
  }
}

/**
 * Persists cookie consent choice to localStorage.
 */
export function setStoredConsent(status: ConsentStatus): ConsentRecord {
  const record: ConsentRecord = {
    status,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Ignore quota / private-browsing errors silently
    }
  }

  notifyConsentListeners();
  return record;
}

/**
 * Returns true if a valid, non-expired consent record exists.
 */
export function hasUserResponded(): boolean {
  return getStoredConsent() !== null;
}

/**
 * Clears stored consent record from localStorage.
 */
export function resetStoredConsent(): void {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
  notifyConsentListeners();
}

/**
 * Opens the cookie preferences UI.
 */
export function openCookiePreferences(): void {
  isPreferencesModalOpen = true;
  notifyPreferencesListeners();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_COOKIE_PREFERENCES_EVENT));
  }
}

/**
 * Closes the cookie preferences UI.
 */
export function closeCookiePreferences(): void {
  isPreferencesModalOpen = false;
  notifyPreferencesListeners();
}

/**
 * Updates Google Analytics Consent Mode v2 via window.gtag.
 */
export function updateGtagConsent(status: ConsentStatus): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: status,
    });
  }
}

/**
 * Removes Google Analytics cookies (_ga, _ga_*) when consent is denied or revoked.
 */
export function removeGoogleAnalyticsCookies(): void {
  if (typeof document === "undefined") return;

  const cookies = document.cookie.split(";");
  const hostname = window.location.hostname;
  const domainParts = hostname.split(".");

  for (const rawCookie of cookies) {
    const name = rawCookie.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_")) {
      // Clear for current path
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      // Clear for root domain if applicable
      document.cookie = `${name}=; path=/; domain=${hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      if (domainParts.length > 1) {
        const rootDomain = "." + domainParts.slice(-2).join(".");
        document.cookie = `${name}=; path=/; domain=${rootDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    }
  }
}
