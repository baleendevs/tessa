import type { Locale } from "@/lib/site";
import { getDictionary } from "@/content/dictionaries";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ShareClient } from "@/features/share/ShareClient";

type ShareFoundationProps = {
  locale: Locale;
};

export function ShareFoundation({ locale }: ShareFoundationProps) {
  const dictionary = getDictionary(locale);

  return (
    <>
      <SiteHeader
        dictionary={dictionary}
        locale={locale}
        route="share"
      />
      <main
        className="site-content-page share-page"
        id="main-content"
        tabIndex={-1}
      >
        <ShareClient dictionary={dictionary} locale={locale} />
      </main>
      <SiteFooter
        currentRoute="share"
        dictionary={dictionary}
        locale={locale}
      />
    </>
  );
}
