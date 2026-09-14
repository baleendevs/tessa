import Image from "next/image";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/site";
import { assetPath, routePath } from "@/lib/site";
import { HOME_SECTION_IDS } from "@/lib/home-navigation";

export function MarketingFooter({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const home = dictionary.home;
  return (
    <footer className="marketing-footer">
      <div className="marketing-footer__inner">
        <div className="marketing-footer__brand">
          <Image alt="" height={422} src={assetPath("/media/brand/tessa-wallet-mark.png")} unoptimized width={488} />
          <div><strong>TesSa</strong><p>{home.footer.description}</p></div>
        </div>
        <div className="marketing-footer__links">
          <div>
            <strong>{home.footer.product}</strong>
            <a href={`#${HOME_SECTION_IDS.documents}`}>{home.navigation.documents}</a>
            <a href={`#${HOME_SECTION_IDS.sharing}`}>{home.navigation.sharing}</a>
            <a href={`#${HOME_SECTION_IDS.faq}`}>{home.navigation.faq}</a>
          </div>
          <div><strong>{home.footer.legal}</strong><a href={routePath(locale, "terms")}>{dictionary.navigation.terms}</a><a href={routePath(locale, "privacy")}>{dictionary.navigation.privacy}</a></div>
        </div>
      </div>
      <p className="marketing-footer__copyright">© {new Date().getFullYear()} {home.footer.copyright}</p>
    </footer>
  );
}
