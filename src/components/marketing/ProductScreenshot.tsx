import { assetPath } from "@/lib/site";
import {
  productScreenshotPairs,
  type ProductScreenshotName,
} from "@/lib/productScreenshots";

type ProductScreenshotProps = {
  alt: string;
  className?: string;
  name: ProductScreenshotName;
  priority?: boolean;
};

export function ProductScreenshot({
  alt,
  className = "",
  name,
  priority = false,
}: ProductScreenshotProps) {
  const pair = productScreenshotPairs[name];

  return (
    <picture data-theme-screenshot={name}>
      <source
        data-theme-dark
        media="(prefers-color-scheme: dark)"
        srcSet={assetPath(pair.dark)}
      />
      <img
        alt={alt}
        className={className}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        height={1785}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 767px) 88vw, (max-width: 1199px) 48vw, 440px"
        src={assetPath(pair.light)}
        width={800}
      />
    </picture>
  );
}
