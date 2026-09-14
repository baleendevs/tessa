import Image from "next/image";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/site";
import { assetPath, routePath } from "@/lib/site";
import { MarketingLanguageSwitch } from "./MarketingLanguageSwitch";
import { ArrowIcon } from "./MarketingIcons";
import { MobileNavigation } from "./MobileNavigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { HOME_NAVBAR_SECTIONS, HOME_SECTION_IDS, HOME_SECTION_ORDER } from "@/lib/home-navigation";
import { SectionNavigationButton } from "./SectionNavigationButton";

type MarketingHeaderProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function MarketingHeader({ dictionary, locale }: MarketingHeaderProps) {
  const home = dictionary.home;
  const links: Array<[href: string, label: string]> = HOME_NAVBAR_SECTIONS.map(
    ({ id, navigationKey }) => [`#${id}`, home.navigation[navigationKey]],
  );

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
          <span>TesSa</span>
        </a>

        <nav className="marketing-nav" aria-label={home.navigation.menu}>
          {links.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
        </nav>

        <div className="marketing-header__actions">
          <ThemeToggle labels={dictionary.theme} />
          <MarketingLanguageSwitch locale={locale} label={dictionary.languageSwitchLabel} />
          <a className="header-download" href={`#${HOME_SECTION_IDS.download}`}><span>{home.navigation.download}</span><ArrowIcon /></a>
          <SectionNavigationButton
            backToTopLabel={home.navigation.backToTop}
            nextSectionLabel={home.navigation.nextSection}
            sectionIds={HOME_SECTION_ORDER.map(({ id }) => id)}
          />
          <MobileNavigation label={home.navigation.menu} links={[...links, [`#${HOME_SECTION_IDS.download}`, home.navigation.download]]} />
        </div>
      </div>
    </header>
  );
}
