import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";
import { SiteBrand } from "./SiteBrand";
import { SkipLink } from "./SkipLink";

type SiteHeaderShellProps = {
  actions: ReactNode;
  locale: Locale;
  navigation?: ReactNode;
  skipLinkLabel: string;
};

export function SiteHeaderShell({
  actions,
  locale,
  navigation,
  skipLinkLabel,
}: SiteHeaderShellProps) {
  return (
    <>
      <SkipLink label={skipLinkLabel} />
      <header className="marketing-header">
        <div className="marketing-header__inner">
          <SiteBrand className="brand-link" locale={locale} />
          {navigation}
          <div className="marketing-header__actions">{actions}</div>
        </div>
      </header>
    </>
  );
}
