import { describe, expect, it } from "vitest";
import {
  italianPrivacyDocument,
  italianTermsDocument,
  legalDocuments,
  type LegalDocument,
} from "../../src/content/legal";

function allText(route: keyof typeof legalDocuments): string {
  return legalDocuments[route].sections
    .flatMap((section) => section.blocks)
    .flatMap((block) => {
      if (block.type === "paragraph") return [block.text];
      if (block.type === "list") return block.items;
      if (block.type === "links") return block.items.map((item) => item.label);
      return [block.before, block.between ?? "", ...block.links.map((item) => item.label)];
    })
    .join(" ");
}

function documentText(document: LegalDocument): string {
  return document.sections
    .flatMap((section) => section.blocks)
    .flatMap((block) => {
      if (block.type === "paragraph") return [block.text];
      if (block.type === "list") return block.items;
      if (block.type === "links") return block.items.map((item) => item.label);
      return [block.before, block.between ?? "", ...block.links.map((item) => item.label)];
    })
    .join(" ");
}

function expectStructurallyAligned(
  english: LegalDocument,
  italian: LegalDocument,
) {
  expect(italian.effectiveDate).toBe(english.effectiveDate);
  expect(italian.sections.map((section) => section.id)).toEqual(
    english.sections.map((section) => section.id),
  );

  english.sections.forEach((englishSection, sectionIndex) => {
    const italianSection = italian.sections[sectionIndex];
    expect(italianSection.blocks.map((block) => block.type)).toEqual(
      englishSection.blocks.map((block) => block.type),
    );

    englishSection.blocks.forEach((englishBlock, blockIndex) => {
      const italianBlock = italianSection.blocks[blockIndex];
      if (englishBlock.type === "list" && italianBlock.type === "list") {
        expect(italianBlock.items).toHaveLength(englishBlock.items.length);
      }
      if (englishBlock.type === "links" && italianBlock.type === "links") {
        expect(italianBlock.items).toHaveLength(englishBlock.items.length);
      }
      if (
        englishBlock.type === "attribution" &&
        italianBlock.type === "attribution"
      ) {
        expect(italianBlock.links).toEqual(englishBlock.links);
      }
    });
  });
}

describe("legal content", () => {
  it("uses the publication date for the revised Terms and preserves the Privacy date", () => {
    expect(legalDocuments.terms).toMatchObject({
      effectiveDate: "2026-09-16",
    });
    expect(legalDocuments.privacy).toMatchObject({
      effectiveDate: "2020-09-30",
    });
  });

  it("describes the material TesSa features and safeguards in the revised Terms", () => {
    const text = allText("terms");
    expect(text).toContain("operating under the name Baleen Developers");
    expect(text).toContain("primarily stored locally on your device");
    expect(text).toContain("it is not encrypted");
    expect(text).toContain("one-time, non-consumable PRO in-app purchase");
    expect(text).toContain("do not provide an account, cloud storage or cloud backup service");
    expect(text).toContain("mandatory consumer law");
    expect(text).toContain("provided on an “as is” and “as available” basis");
    expect(text).toContain("death or personal injury caused by our act or omission");
    expect(text).toContain("baleen.devs@gmail.com");
    expect(text).toContain("Apple Standard End User License Agreement");
    expect(text).toContain("Google Analytics for Firebase");
    expect(
      legalDocuments.terms.sections
        .find((section) => section.id === "privacy")
        ?.blocks.find((block) => block.type === "links"),
    ).toMatchObject({
      items: [{ url: "https://baleendevs.github.io/tessa/en/privacy" }],
    });
  });

  it("preserves the material legacy Privacy content and disclosures", () => {
    const text = allText("privacy");
    expect(text).toContain("Baleen Developers built the TesSa app as an Ad Supported app");
    expect(text).toContain("The information that I request will be retained on your device and is not collected by me in any way");
    expect(text).toContain("no method of transmission over the internet, or method of electronic storage is 100% secure");
    expect(text).toContain("This policy is effective as of 2020-09-30");
    expect(text).toContain("baleendevs@gmail.com");
  });

  it("provides complete structurally aligned Italian translations", () => {
    expectStructurallyAligned(legalDocuments.terms, italianTermsDocument);
    expectStructurallyAligned(legalDocuments.privacy, italianPrivacyDocument);
  });

  it("provides the revised safeguards in Italian and preserves the Privacy disclosures", () => {
    const terms = documentText(italianTermsDocument);
    const privacy = documentText(italianPrivacyDocument);

    expect(terms).toContain("operante con il nome Baleen Developers");
    expect(terms).toContain("conservate principalmente in locale sul tuo dispositivo");
    expect(terms).toContain("non sono cifrati");
    expect(terms).toContain("acquisto in-app PRO opzionale, una tantum e non consumabile");
    expect(terms).toContain("normativa inderogabile a tutela dei consumatori");
    expect(terms).toContain("forniti “così come sono” e “secondo disponibilità”");
    expect(terms).toContain("morte o danni alla persona");
    expect(terms).toContain("baleen.devs@gmail.com");
    expect(privacy).toContain("app supportata dalla pubblicità");
    expect(privacy).toContain("saranno conservate sul tuo dispositivo e non saranno raccolte da me");
    expect(privacy).toContain("La presente informativa è in vigore dal 2020-09-30");

    for (const text of [terms, privacy]) {
      expect(text).toContain("Baleen Developers");
      expect(text).toContain("Google Play Services");
      expect(text).toContain("AdMob");
      expect(text).toContain("Google Analytics for Firebase");
    }

    expect(privacy).toContain("baleendevs@gmail.com");
  });
});
