export const SITE_ORIGIN = "https://baleendevs.github.io";
export const SITE_BASE_PATH = "/tessa";
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE_PATH}`;
export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.baleendevs.tessa";
export const APP_STORE_URL =
  "https://apps.apple.com/it/app/tessa-tessere-e-documenti/id1564434795";

export type Locale = "it" | "en";
export type RouteKey = "home" | "share" | "terms" | "privacy";

const routePaths: Record<Locale, Record<RouteKey, string>> = {
  it: {
    home: "/",
    share: "/share",
    terms: "/terms",
    privacy: "/privacy",
  },
  en: {
    home: "/en/",
    share: "/en/share",
    terms: "/en/terms",
    privacy: "/en/privacy",
  },
};

export function routePath(locale: Locale, route: RouteKey): string {
  const path = routePaths[locale][route];
  return path === "/" ? `${SITE_BASE_PATH}/` : `${SITE_BASE_PATH}${path}`;
}

export function absoluteRoute(locale: Locale, route: RouteKey): string {
  return `${SITE_ORIGIN}${routePath(locale, route)}`;
}

export function assetPath(path: string): string {
  return `${SITE_BASE_PATH}/${path.replace(/^\//, "")}`;
}
