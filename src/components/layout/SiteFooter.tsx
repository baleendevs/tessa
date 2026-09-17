import type { Dictionary } from "@/content/dictionaries";
import { CookiePreferencesButton } from "@/components/consent/CookiePreferencesButton";
import { HOME_SECTION_IDS } from "@/lib/home-navigation";
import { routePath, type Locale, type RouteKey } from "@/lib/site";
import { SiteBrand } from "./SiteBrand";

type SiteFooterProps = {
  currentRoute: Extract<RouteKey, "home" | "share" | "terms" | "privacy">;
  dictionary: Dictionary;
  locale: Locale;
};

export function SiteFooter({ currentRoute, dictionary, locale }: SiteFooterProps) {
  const home = dictionary.home;
  const homePath = routePath(locale, "home");
  const productLinks = [
    [HOME_SECTION_IDS.documents, home.navigation.documents],
    [HOME_SECTION_IDS.sharing, home.navigation.sharing],
    [HOME_SECTION_IDS.faq, home.navigation.faq],
  ] as const;

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <SiteBrand className="site-footer__brand-link" locale={locale} />
          <p>{home.footer.description}</p>
        </div>
        <div className="site-footer__links">
          <nav aria-label={home.footer.product}>
            <strong>{home.footer.product}</strong>
            {productLinks.map(([id, label]) => (
              <a href={`${homePath}#${id}`} key={id}>{label}</a>
            ))}
          </nav>
          <nav aria-label={home.footer.legal}>
            <strong>{home.footer.legal}</strong>
            <a
              aria-current={currentRoute === "terms" ? "page" : undefined}
              href={routePath(locale, "terms")}
            >
              {dictionary.navigation.terms}
            </a>
            <a
              aria-current={currentRoute === "privacy" ? "page" : undefined}
              href={routePath(locale, "privacy")}
            >
              {dictionary.navigation.privacy}
            </a>
            {currentRoute !== "share" && (
              <CookiePreferencesButton label={dictionary.consent.footerPreferences} />
            )}
          </nav>
        </div>
      </div>
      <p className="site-footer__copyright" suppressHydrationWarning>
        © {new Date().getFullYear()} {home.footer.copyright}
      </p>
    </footer>
  );
}
