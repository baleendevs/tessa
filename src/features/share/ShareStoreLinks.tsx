import type { Dictionary } from "@/content/dictionaries";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.baleendevs.tessa";
const APP_STORE_URL =
  "https://apps.apple.com/it/app/tessa-tessere-e-documenti/id1564434795";

export function ShareStoreLinks({ dictionary }: { dictionary: Dictionary }) {
  return (
    <aside className="mt-8 flex flex-col items-center justify-between gap-4 rounded-container bg-surface-container p-5 text-center sm:flex-row sm:text-left">
      <p className="font-medium">{dictionary.share.appPrompt}</p>
      <div className="flex flex-wrap justify-center gap-2">
        <a
          className="inline-flex min-h-12 items-center rounded-full border border-outline bg-surface px-4 text-sm font-semibold"
          href={GOOGLE_PLAY_URL}
          rel="noreferrer"
        >
          {dictionary.share.android}
        </a>
        <a
          className="inline-flex min-h-12 items-center rounded-full border border-outline bg-surface px-4 text-sm font-semibold"
          href={APP_STORE_URL}
          rel="noreferrer"
        >
          {dictionary.share.ios}
        </a>
      </div>
    </aside>
  );
}
