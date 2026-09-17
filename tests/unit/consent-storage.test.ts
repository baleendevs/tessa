import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  CONSENT_MAX_AGE_MS,
  getStoredConsent,
  hasUserResponded,
  openCookiePreferences,
  removeGoogleAnalyticsCookies,
  resetStoredConsent,
  setStoredConsent,
  updateGtagConsent,
  OPEN_COOKIE_PREFERENCES_EVENT,
} from "../../src/components/consent/consent-storage";

class LocalStorageMock {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] ?? null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

const mockLocalStorage = new LocalStorageMock();
let eventListeners: Record<string, EventListener[]> = {};
let cookieJar = "";

// Set up browser-like globals for unit testing in Node environment
const originalWindow = globalThis.window;
const originalDocument = globalThis.document;

describe("consent-storage", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    eventListeners = {};
    cookieJar = "";
    vi.restoreAllMocks();

    globalThis.window = {
      localStorage: mockLocalStorage,
      addEventListener(event: string, cb: EventListener) {
        eventListeners[event] = eventListeners[event] || [];
        eventListeners[event].push(cb);
      },
      removeEventListener(event: string, cb: EventListener) {
        if (eventListeners[event]) {
          eventListeners[event] = eventListeners[event].filter((l) => l !== cb);
        }
      },
      dispatchEvent(event: Event) {
        (eventListeners[event.type] || []).forEach((cb) => cb(event));
        return true;
      },
      location: { hostname: "baleendevs.github.io" },
    } as unknown as Window & typeof globalThis;

    globalThis.document = {
      get cookie() {
        return cookieJar;
      },
      set cookie(val: string) {
        const [pair] = val.split(";");
        const [k] = pair.split("=");
        if (val.includes("expires=Thu, 01 Jan 1970")) {
          cookieJar = cookieJar
            .split("; ")
            .filter((c) => !c.startsWith(`${k.trim()}=`))
            .join("; ");
        } else {
          cookieJar = cookieJar ? `${cookieJar}; ${pair.trim()}` : pair.trim();
        }
      },
    } as unknown as Document;
  });

  it("returns null when no consent has been stored", () => {
    expect(getStoredConsent()).toBeNull();
    expect(hasUserResponded()).toBe(false);
  });

  it("stores and retrieves granted consent choice", () => {
    const record = setStoredConsent("granted");
    expect(record.status).toBe("granted");
    expect(record.version).toBe(CONSENT_VERSION);
    expect(typeof record.timestamp).toBe("number");

    const retrieved = getStoredConsent();
    expect(retrieved).toEqual(record);
    expect(hasUserResponded()).toBe(true);
  });

  it("stores and retrieves denied consent choice", () => {
    const record = setStoredConsent("denied");
    expect(record.status).toBe("denied");

    const retrieved = getStoredConsent();
    expect(retrieved?.status).toBe("denied");
    expect(hasUserResponded()).toBe(true);
  });

  it("resets stored consent when requested", () => {
    setStoredConsent("granted");
    expect(hasUserResponded()).toBe(true);

    resetStoredConsent();
    expect(getStoredConsent()).toBeNull();
    expect(hasUserResponded()).toBe(false);
  });

  it("expires consent when older than 180 days", () => {
    const now = Date.now();
    const expiredTimestamp = now - (CONSENT_MAX_AGE_MS + 10_000);

    mockLocalStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        status: "granted",
        timestamp: expiredTimestamp,
        version: CONSENT_VERSION,
      }),
    );

    expect(getStoredConsent()).toBeNull();
    expect(hasUserResponded()).toBe(false);
  });

  it("rejects records with future timestamps", () => {
    const now = Date.now();
    const futureTimestamp = now + 100_000;

    mockLocalStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        status: "granted",
        timestamp: futureTimestamp,
        version: CONSENT_VERSION,
      }),
    );

    expect(getStoredConsent()).toBeNull();
    expect(hasUserResponded()).toBe(false);
  });

  it("rejects records with mismatched version", () => {
    mockLocalStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        status: "granted",
        timestamp: Date.now(),
        version: 999,
      }),
    );

    expect(getStoredConsent()).toBeNull();
  });

  it("gracefully handles corrupt or non-object localStorage values", () => {
    mockLocalStorage.setItem(CONSENT_STORAGE_KEY, "invalid-json{");
    expect(getStoredConsent()).toBeNull();

    mockLocalStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify("not-an-object"));
    expect(getStoredConsent()).toBeNull();

    mockLocalStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ status: "unknown" }));
    expect(getStoredConsent()).toBeNull();
  });

  it("dispatches open-cookie-preferences event on window", () => {
    const handler = vi.fn();
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handler);

    openCookiePreferences();
    expect(handler).toHaveBeenCalledTimes(1);

    window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handler);
  });

  it("updates gtag consent mode when window.gtag is available", () => {
    const mockGtag = vi.fn();
    window.gtag = mockGtag;

    updateGtagConsent("granted");
    expect(mockGtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "granted",
    });

    updateGtagConsent("denied");
    expect(mockGtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "denied",
    });

    delete (window as Partial<Window>).gtag;
  });

  it("removes Google Analytics cookies when denied or revoked", () => {
    document.cookie = "_ga=GA1.2.12345678.12345678; path=/";
    document.cookie = "_ga_TEST123=GS1.1.12345678; path=/";
    document.cookie = "other_cookie=preserve_me; path=/";

    removeGoogleAnalyticsCookies();

    expect(document.cookie).not.toContain("_ga=");
    expect(document.cookie).not.toContain("_ga_TEST123=");
  });

  it("handles SSR safety when window is undefined", () => {
    delete (globalThis as Partial<typeof globalThis>).window;

    expect(getStoredConsent()).toBeNull();
    expect(hasUserResponded()).toBe(false);
    expect(() => resetStoredConsent()).not.toThrow();
    expect(() => openCookiePreferences()).not.toThrow();
    expect(() => updateGtagConsent("granted")).not.toThrow();

    // Restore
    globalThis.window = originalWindow;
    globalThis.document = originalDocument;
  });
});
