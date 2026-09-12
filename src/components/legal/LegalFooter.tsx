import Image from "next/image";
import type { Dictionary } from "@/content/dictionaries";
import { assetPath, routePath, type Locale } from "@/lib/site";

export function LegalFooter({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <footer className="legal-footer">
      <div className="legal-footer__inner">
        <a
          aria-label="TesSa"
          className="legal-footer__brand"
          href={routePath(locale, "home")}
        >
          <Image
            alt=""
            aria-hidden="true"
            height={422}
            src={assetPath("/media/brand/tessa-wallet-mark.png")}
            unoptimized
            width={488}
          />
          <span>Te<strong>SS</strong>a</span>
        </a>
        <nav aria-label={dictionary.home.footer.legal}>
          <a href={routePath(locale, "terms")}>{dictionary.navigation.terms}</a>
          <a href={routePath(locale, "privacy")}>{dictionary.navigation.privacy}</a>
        </nav>
        <p>© {new Date().getFullYear()} {dictionary.home.footer.copyright}</p>
      </div>
    </footer>
  );
}
