import Image from "next/image";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale, RouteKey } from "@/lib/site";
import { assetPath, routePath } from "@/lib/site";
import { LanguageSwitch } from "@/components/localisation/LanguageSwitch";
import { ShareLanguageSwitch } from "@/components/localisation/ShareLanguageSwitch";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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
      <a className="skip-link" href="#main-content">
        {dictionary.home.skipLink}
      </a>
      <header className="border-b border-outline/60 bg-surface">
        <div className="mx-auto flex w-full max-w-content flex-wrap items-center justify-between gap-3 px-page py-4">
          <a
            aria-label="TesSa"
            className="inline-flex min-h-12 items-center gap-2 rounded-control text-xl font-semibold tracking-tight text-on-surface focus-visible:ring-3 focus-visible:ring-focus-ring/40"
            href={routePath(locale, "home")}
          >
            <Image
              alt=""
              aria-hidden="true"
              className="h-9 w-[2.6rem] object-contain"
              height={422}
              src={assetPath("/media/brand/tessa-wallet-mark.png")}
              unoptimized
              width={488}
            />
            <span>
              Tes<span className="text-primary">S</span>a
            </span>
          </a>
          <div className="flex flex-wrap items-center justify-end gap-3">
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
          </div>
        </div>
      </header>
    </>
  );
}
