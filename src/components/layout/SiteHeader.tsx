import type { Dictionary } from "@/content/dictionaries";
import type { Locale, RouteKey } from "@/lib/site";
import { LanguageSwitch } from "@/components/localisation/LanguageSwitch";
import { ShareLanguageSwitch } from "@/components/localisation/ShareLanguageSwitch";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SiteHeaderShell } from "./SiteHeaderShell";
import { SkipLink } from "./SkipLink";

type SiteHeaderProps = {
  dictionary: Dictionary;
  locale: Locale;
  route: RouteKey;
  preserveShareQuery?: boolean;
};

export function SiteHeader({
  dictionary,
  locale,
  route,
  preserveShareQuery = false,
}: SiteHeaderProps) {
  return (
    <>
      <SkipLink label={dictionary.home.skipLink} />
      <SiteHeaderShell
        locale={locale}
        actions={
          <>
            <ThemeToggle labels={dictionary.theme} />
            {preserveShareQuery ? (
              <ShareLanguageSwitch
                locale={locale}
                label={dictionary.languageSwitchLabel}
              />
            ) : (
              <LanguageSwitch
                locale={locale}
                route={route}
                label={dictionary.languageSwitchLabel}
              />
            )}
          </>
        }
      />
    </>
  );
}
