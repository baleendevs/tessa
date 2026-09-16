import type { Dictionary } from "@/content/dictionaries";
import type { Locale, RouteKey } from "@/lib/site";
import { LanguageSwitch } from "@/components/localisation/LanguageSwitch";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SiteHeaderShell } from "./SiteHeaderShell";

type SiteHeaderProps = {
  dictionary: Dictionary;
  locale: Locale;
  route: RouteKey;
};

export function SiteHeader({
  dictionary,
  locale,
  route,
}: SiteHeaderProps) {
  return (
    <SiteHeaderShell
      locale={locale}
      skipLinkLabel={dictionary.home.skipLink}
      actions={
        <>
          <ThemeToggle labels={dictionary.theme} />
          <LanguageSwitch
            label={dictionary.languageSwitchLabel}
            locale={locale}
            preserveSearch={route === "share"}
            route={route}
          />
        </>
      }
    />
  );
}
