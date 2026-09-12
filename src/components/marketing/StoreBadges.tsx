import Image from "next/image";
import type { HomeContent } from "@/content/dictionaries";
import { APP_STORE_URL, assetPath, GOOGLE_PLAY_URL } from "@/lib/site";
import type { Locale } from "@/lib/site";

type StoreBadgesProps = {
  locale: Locale;
  labels: HomeContent["stores"];
  compact?: boolean;
};

export function StoreBadges({ locale, labels, compact = false }: StoreBadgesProps) {
  const suffix = locale === "en" ? "-en" : "";

  return (
    <div className={`store-badges${compact ? " store-badges--compact" : ""}`}>
      <a href={`${GOOGLE_PLAY_URL}&hl=${locale}`} rel="noreferrer" target="_blank">
        <Image
          alt={labels.googleAlt}
          height={250}
          src={assetPath(`/img/google-play-badge${suffix}.png`)}
          unoptimized
          width={646}
        />
      </a>
      <a href={APP_STORE_URL} rel="noreferrer" target="_blank">
        <Image
          alt={labels.appleAlt}
          height={50}
          src={assetPath(`/img/app-store-badge${suffix}.svg`)}
          unoptimized
          width={168}
        />
      </a>
    </div>
  );
}
