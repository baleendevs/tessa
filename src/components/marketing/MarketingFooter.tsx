import Image from "next/image";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/site";
import { assetPath, routePath } from "@/lib/site";

export function MarketingFooter({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const home = dictionary.home;
  return (
    <footer className="marketing-footer">
      <div className="marketing-footer__inner">
        <div className="marketing-footer__brand">
          <Image alt="" height={422} src={assetPath("/media/brand/tessa-wallet-mark.png")} unoptimized width={488} />
          <div><strong>Tes<span>S</span>a</strong><p>{home.footer.description}</p></div>
        </div>
        <div className="marketing-footer__links">
          <div><strong>{home.footer.product}</strong><a href="#documents">{home.navigation.documents}</a><a href="#sharing">{home.navigation.sharing}</a><a href="#faq">{home.navigation.faq}</a></div>
          <div><strong>{home.footer.legal}</strong><a href={routePath(locale, "terms")}>{dictionary.navigation.terms}</a><a href={routePath(locale, "privacy")}>{dictionary.navigation.privacy}</a></div>
        </div>
      </div>
      <p className="marketing-footer__copyright">© {new Date().getFullYear()} {home.footer.copyright}</p>
    </footer>
  );
}
