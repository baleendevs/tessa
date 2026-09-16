import type { Metadata } from "next";
import {
  absoluteRoute,
  type Locale,
  type RouteKey,
  SITE_ORIGIN,
  SITE_BASE_PATH,
} from "@/lib/site";

type MetadataOptions = {
  locale: Locale;
  route: RouteKey;
  title: string;
  description: string;
  privateUtility?: boolean;
  socialImageAlt?: string;
};

export const metadataBase = new URL(SITE_ORIGIN);

export function createPageMetadata({
  locale,
  route,
  title,
  description,
  privateUtility = false,
  socialImageAlt,
}: MetadataOptions): Metadata {
  const canonical = absoluteRoute(locale, route);
  const imageAlt = socialImageAlt ?? (locale === "it"
    ? "TesSa, portafoglio per documenti personali"
    : "TesSa personal document wallet");

  const socialImagePath = locale === "it"
    ? `${SITE_BASE_PATH}/img/tessa-social.jpg`
    : `${SITE_BASE_PATH}/img/tessa-social-en.jpg`;

  return {
    metadataBase,
    title,
    description,
    applicationName: "TesSa",
    manifest: privateUtility ? undefined : `${SITE_BASE_PATH}/icons/site.webmanifest`,
    alternates: privateUtility
      ? { canonical }
      : {
          canonical,
          languages: {
            it: absoluteRoute("it", route),
            "en-GB": absoluteRoute("en", route),
            "x-default": absoluteRoute("it", route),
          },
        },
    robots: privateUtility
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
    referrer: privateUtility ? "no-referrer" : "strict-origin-when-cross-origin",
    openGraph: privateUtility
      ? {
          type: "website",
          siteName: "TesSa",
          title: "TesSa",
          description,
          url: canonical,
          images: [socialImagePath],
        }
      : {
          type: "website",
          siteName: "TesSa",
          locale: locale === "it" ? "it_IT" : "en_GB",
          alternateLocale: locale === "it" ? ["en_GB"] : ["it_IT"],
          title,
          description,
          url: canonical,
          images: [
            {
              url: socialImagePath,
              width: 1200,
              height: 630,
              alt: imageAlt,
            },
          ],
        },
    twitter: privateUtility
      ? undefined
      : {
          card: "summary_large_image",
          title,
          description,
          images: [socialImagePath],
        },
    icons: {
      icon: [
        { url: `${SITE_BASE_PATH}/icons/favicon.ico` },
        { url: `${SITE_BASE_PATH}/icons/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
        { url: `${SITE_BASE_PATH}/icons/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
      ],
      shortcut: `${SITE_BASE_PATH}/icons/favicon.ico`,
      apple: [{ url: `${SITE_BASE_PATH}/icons/apple-touch-icon.png`, sizes: "180x180", type: "image/png" }],
    },
  };
}
