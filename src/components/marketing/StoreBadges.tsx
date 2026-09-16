import Image from "next/image";
import type { HomeContent } from "@/content/dictionaries";
import { APP_STORE_URL, assetPath, GOOGLE_PLAY_URL } from "@/lib/site";
import type { Locale } from "@/lib/site";

type StoreBadgesProps = {
  locale: Locale;
  labels: HomeContent["stores"];
};

export function StoreBadges({ locale, labels }: StoreBadgesProps) {
  const suffix = locale === "en" ? "-en" : "";

  return (
    <div className="store-badges">
      <a href={`${GOOGLE_PLAY_URL}&hl=${locale}`} rel="noreferrer" target="_blank">
        <Image
          alt={labels.googleAlt}
          height={50}
          src={assetPath(`/img/google-play-badge${suffix}.svg`)}
          unoptimized
          width={168}
        />
      </a>
      <a href={APP_STORE_URL} rel="noreferrer" target="_blank">
        <Image
          alt={labels.appleAlt}
          height={50}
          src={assetPath(`/img/app-store-badge${suffix}.svg`)}
          unoptimized
          width={150}
        />
      </a>
    </div>
  );
}
