import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";
import { SiteBrand } from "./SiteBrand";

type SiteHeaderShellProps = {
  actions: ReactNode;
  locale: Locale;
  navigation?: ReactNode;
};

export function SiteHeaderShell({
  actions,
  locale,
  navigation,
}: SiteHeaderShellProps) {
  return (
    <header className="marketing-header">
      <div className="marketing-header__inner">
        <SiteBrand className="brand-link" locale={locale} />
        {navigation}
        <div className="marketing-header__actions">{actions}</div>
      </div>
    </header>
  );
}
