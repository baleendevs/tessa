import Image from "next/image";
import type { Locale } from "@/lib/site";
import { assetPath, routePath } from "@/lib/site";

type SiteBrandProps = {
  className: string;
  locale: Locale;
};

export function SiteBrand({ className, locale }: SiteBrandProps) {
  return (
    <a className={className} href={routePath(locale, "home")} aria-label="TesSa">
      <Image
        alt=""
        aria-hidden="true"
        height={422}
        src={assetPath("/media/brand/tessa-wallet-mark.png")}
        unoptimized
        width={488}
      />
      <span>TesSa</span>
    </a>
  );
}
