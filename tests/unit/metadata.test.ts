import { describe, expect, it } from "vitest";
import { createPageMetadata } from "../../src/lib/metadata";
import { APP_STORE_URL, GOOGLE_PLAY_URL, SITE_BASE_PATH, SITE_URL } from "../../src/lib/site";

describe("public metadata", () => {
  it("creates canonical and reciprocal locale metadata", () => {
    const metadata = createPageMetadata({
      locale: "en",
      route: "privacy",
      title: "Privacy Policy — TesSa",
      description: "Privacy Policy for TesSa.",
    });

    expect(metadata.alternates).toEqual({
      canonical: `${SITE_URL}/en/privacy`,
      languages: {
        it: `${SITE_URL}/privacy`,
        "en-GB": `${SITE_URL}/en/privacy`,
        "x-default": `${SITE_URL}/privacy`,
      },
    });
    expect(metadata.manifest).toBe(`${SITE_BASE_PATH}/icons/site.webmanifest`);
  });

  it("keeps share metadata private, generic and manifest-free", () => {
    const metadata = createPageMetadata({
      locale: "it",
      route: "share",
      title: "Tessera condivisa — TesSa",
      description: "Anteprima di una tessera condivisa tramite TesSa.",
      privateUtility: true,
    });

    expect(metadata.robots).toMatchObject({ index: false, follow: false, nocache: true });
    expect(metadata.referrer).toBe("no-referrer");
    expect(metadata.manifest).toBeUndefined();
    expect(JSON.stringify(metadata)).not.toContain("card=");
  });

  it("uses the verified store identifiers", () => {
    expect(GOOGLE_PLAY_URL).toBe("https://play.google.com/store/apps/details?id=com.baleendevs.tessa");
    expect(APP_STORE_URL).toBe("https://apps.apple.com/it/app/tessa-tessere-e-documenti/id1564434795");
  });
});
