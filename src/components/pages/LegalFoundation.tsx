import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getDictionary } from "@/content/dictionaries";
import { legalDocuments, type LegalBlock } from "@/content/legal";
import type { Locale, RouteKey } from "@/lib/site";

type LegalFoundationProps = {
  locale: Locale;
  route: Extract<RouteKey, "terms" | "privacy">;
};

function renderBlock(block: LegalBlock, key: number): ReactNode {
  if (block.type === "paragraph") return <p key={key}>{block.text}</p>;

  if (block.type === "list") {
    return (
      <ul key={key}>
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }

  if (block.type === "links") {
    return (
      <ul key={key}>
        {block.items.map((item) => (
          <li key={item.url}>
            <a href={item.url} rel="noopener noreferrer" target="_blank">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p key={key}>
      {block.before}
      <a href={block.links[0].url} rel="noopener noreferrer" target="_blank">
        {block.links[0].label}
      </a>
      {block.links[1] ? (
        <>
          {block.between}
          <a href={block.links[1].url} rel="noopener noreferrer" target="_blank">
            {block.links[1].label}
          </a>
        </>
      ) : null}
    </p>
  );
}

export function LegalFoundation({ locale, route }: LegalFoundationProps) {
  const dictionary = getDictionary(locale);
  const document = legalDocuments[route];
  const title = route === "terms"
    ? dictionary.legal.termsTitle
    : dictionary.legal.privacyTitle;
  const effectiveDate = locale === "it" ? "30 settembre 2020" : "30 September 2020";

  return (
    <>
      <SiteHeader dictionary={dictionary} locale={locale} route={route} />
      <main
        aria-labelledby="legal-page-title"
        className="legal-page"
        id="main-content"
        tabIndex={-1}
      >
        <header className="legal-page__hero">
          <p className="eyebrow">{dictionary.legal.eyebrow}</p>
          <h1 id="legal-page-title">{title}</h1>
          <p className="legal-page__source-title">
            {dictionary.legal.preservedLabel}: <span lang="en">{document.sourceTitle}</span>
          </p>
          <dl className="legal-page__meta">
            <div>
              <dt>{dictionary.legal.effectiveDateLabel}</dt>
              <dd><time dateTime={document.effectiveDate}>{effectiveDate}</time></dd>
            </div>
            <div>
              <dt>{dictionary.legal.updatedDateLabel}</dt>
              <dd>{dictionary.legal.updatedDateUnavailable}</dd>
            </div>
            <div>
              <dt>{dictionary.legal.providerLabel}</dt>
              <dd>Baleen Developers</dd>
            </div>
            <div>
              <dt>{dictionary.legal.reviewStatusLabel}</dt>
              <dd>{dictionary.legal.reviewStatus}</dd>
            </div>
          </dl>
          <aside className="legal-review-note" aria-label={dictionary.legal.reviewStatusLabel}>
            <strong>{dictionary.legal.reviewStatusLabel}</strong>
            <p>{dictionary.legal.pendingReview}</p>
          </aside>
        </header>

        <div className="legal-page__layout">
          <nav className="legal-toc" aria-labelledby="legal-toc-title">
            <p className="legal-toc__title" id="legal-toc-title">
              {dictionary.legal.contentsLabel}
            </p>
            <ol>
              {document.sections.map((section) => (
                <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>
              ))}
            </ol>
          </nav>
          <article className="legal-copy" lang="en">
            <p
              className="legal-copy__language-note"
              lang={locale === "it" ? "it" : "en-GB"}
            >
              {dictionary.legal.sourceLanguageNote}
            </p>
            {document.sections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.blocks.map(renderBlock)}
              </section>
            ))}
          </article>
        </div>
      </main>
      <SiteFooter currentRoute={route} dictionary={dictionary} locale={locale} />
    </>
  );
}
