"use client";

import { useSyncExternalStore } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/site";
import { routePath } from "@/lib/site";
import { decodeSharedCard } from "./decoder";
import { SharedCardContent } from "./SharedCardContent";
import type { ShareDecodeResult } from "./types";

const subscribeToLocation = () => () => undefined;
const readSearch = () => window.location.search;
const readServerSearch = () => null;

function resultFromSearch(search: string): ShareDecodeResult {
  const query = new URLSearchParams(search);
  return decodeSharedCard(query.get("card"));
}

type ShareClientProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function ShareClient({ dictionary, locale }: ShareClientProps) {
  const search = useSyncExternalStore(
    subscribeToLocation,
    readSearch,
    readServerSearch,
  );

  if (search === null) {
    return (
      <div
        aria-live="polite"
        className="mx-auto mt-10 max-w-utility rounded-container bg-surface p-8 text-center text-on-surface-muted"
        data-testid="share-loading"
      >
        {dictionary.share.loading}
      </div>
    );
  }

  const result = resultFromSearch(search);

  return (
    <div aria-live="polite" data-share-status={result.status}>
      {result.status === "valid" ? (
        <SharedCardContent
          card={result.card}
          dictionary={dictionary}
          locale={locale}
        />
      ) : (
        <ShareErrorState
          dictionary={dictionary}
          locale={locale}
          result={result}
        />
      )}
    </div>
  );
}

type ShareErrorStateProps = ShareClientProps & {
  result: Exclude<ShareDecodeResult, { status: "valid" }>;
};

function ShareErrorState({ dictionary, locale, result }: ShareErrorStateProps) {
  const copy = dictionary.share.states;
  const stateCopy =
    result.status === "missing"
      ? [copy.missingTitle, copy.missingDescription]
      : result.status === "too-large"
        ? [copy.tooLargeTitle, copy.tooLargeDescription]
        : result.status === "unsupported" && result.legacy
          ? [copy.legacyTitle, copy.legacyDescription]
          : result.status === "unsupported"
            ? [copy.unsupportedTitle, copy.unsupportedDescription]
            : [copy.malformedTitle, copy.malformedDescription];

  return (
    <section
      className="share-error"
      data-testid="share-error"
    >
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-surface-container-high text-primary">
        <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 24 24">
          <path
            d="M8 7.5h8M8 11h5m-1 9a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm5.5-1.5L20 22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.8"
          />
        </svg>
      </div>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight">
        {stateCopy[0]}
      </h1>
      <p className="mx-auto mt-3 max-w-lg leading-7 text-on-surface-muted">
        {stateCopy[1]}
      </p>
      <a
        className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 font-semibold text-on-primary"
        href={routePath(locale, "home")}
      >
        {copy.backHome}
      </a>
    </section>
  );
}
