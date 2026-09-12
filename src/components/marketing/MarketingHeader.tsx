import Image from "next/image";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/site";
import { assetPath, routePath } from "@/lib/site";
import { MarketingLanguageSwitch } from "./MarketingLanguageSwitch";
import { ArrowIcon } from "./MarketingIcons";
import { MobileNavigation } from "./MobileNavigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

type MarketingHeaderProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function MarketingHeader({ dictionary, locale }: MarketingHeaderProps) {
  const home = dictionary.home;
  const links: Array<[href: string, label: string]> = [
    ["#documents", home.navigation.documents],
    ["#how-it-works", home.navigation.howItWorks],
    ["#sharing", home.navigation.sharing],
    ["#privacy", home.navigation.privacy],
    ["#faq", home.navigation.faq],
  ];

  return (
    <header className="marketing-header">
      <div className="marketing-header__inner">
        <a className="brand-link" href={routePath(locale, "home")} aria-label="TesSa">
          <Image
            alt=""
            aria-hidden="true"
            height={422}
            src={assetPath("/media/brand/tessa-wallet-mark.png")}
            unoptimized
            width={488}
          />
          <span>Tes<span>S</span>a</span>
        </a>

        <nav className="marketing-nav" aria-label={home.navigation.menu}>
          {links.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
        </nav>

        <div className="marketing-header__actions">
          <ThemeToggle labels={dictionary.theme} />
          <MarketingLanguageSwitch locale={locale} label={dictionary.languageSwitchLabel} />
          <a className="header-download" href="#download"><span>{home.navigation.download}</span><ArrowIcon /></a>
          <MobileNavigation label={home.navigation.menu} links={links} />
        </div>
      </div>
    </header>
  );
}
