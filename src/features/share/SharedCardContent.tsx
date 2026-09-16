import type { Dictionary } from "@/content/dictionaries";
import { StoreBadges } from "@/components/marketing/StoreBadges";
import type { Locale } from "@/lib/site";
import { SharedDocumentPreview } from "./SharedDocumentPreview";
import type { SharedCard } from "./types";

type SharedCardContentProps = {
  card: SharedCard;
  dictionary: Dictionary;
  locale: Locale;
};

function ownerName(card: SharedCard): string {
  return [card.givenName, card.surname]
    .filter((value) => value !== "")
    .join(" ");
}

export function SharedCardContent({
  card,
  dictionary,
  locale,
}: SharedCardContentProps) {
  const name = ownerName(card);
  const description = name
    ? dictionary.share.actionDescriptions[card.kind].replace("{name}", name)
    : dictionary.share.actionDescriptionsWithoutName[card.kind];

  return (
    <section data-card-kind={card.kind} data-testid="shared-card-content">
      <div className="share-primary">
        <header className="share-primary__copy">
          <p className="eyebrow">{dictionary.share.eyebrow}</p>
          <h1>{dictionary.share.actionTitles[card.kind]}</h1>
          <p>{description}</p>
        </header>
        <div className="share-primary__preview">
          <SharedDocumentPreview card={card} dictionary={dictionary} />
        </div>
        <div className="share-primary__download">
          <StoreBadges locale={locale} labels={dictionary.home.stores} />
        </div>
      </div>

      <aside className="share-notice">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path d="M12 8.5v4m0 3.5h.01M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
        <p>{dictionary.share.notice}</p>
      </aside>
    </section>
  );
}
