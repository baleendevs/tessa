import type { Locale } from "@/lib/site";
import { getDictionary } from "@/content/dictionaries";
import { SiteHeader } from "@/components/layout/SiteHeader";
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
        preserveShareQuery
      />
      <main
        className="mx-auto w-full max-w-content px-page py-10 sm:py-14 lg:py-16"
        id="main-content"
        tabIndex={-1}
      >
        <header className="mx-auto max-w-utility text-center">
          <p className="text-sm font-bold uppercase tracking-label text-primary">
            {dictionary.share.eyebrow}
          </p>
          <h1
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            id="share-title"
          >
            {dictionary.share.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-on-surface-muted sm:text-lg">
            {dictionary.share.description}
          </p>
        </header>

        <aside className="mx-auto mt-7 flex max-w-utility items-start gap-3 rounded-container bg-surface-container px-5 py-4 text-left text-sm leading-6 text-on-surface-muted sm:px-6">
          <svg
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-primary"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 8.5v4m0 3.5h.01M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
          </svg>
          <p>{dictionary.share.notice}</p>
        </aside>

        <ShareClient dictionary={dictionary} locale={locale} />
      </main>
    </>
  );
}
