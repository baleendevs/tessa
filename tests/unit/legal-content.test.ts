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
        expect(italianBlock.items).toEqual(englishBlock.items);
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

describe("preserved legal source", () => {
  it("keeps the existing effective dates", () => {
    expect(legalDocuments.terms).toMatchObject({
      effectiveDate: "2020-09-30",
    });
    expect(legalDocuments.privacy).toMatchObject({
      effectiveDate: "2020-09-30",
    });
  });

  it("preserves the material legacy Terms content and providers", () => {
    const text = allText("terms");
    expect(text).toContain("By downloading or using the app, these terms will automatically apply to you");
    expect(text).toContain("Baleen Developers accepts no liability for any loss, direct or indirect");
    expect(text).toContain("These terms and conditions are effective as of 2020-09-30");
    expect(text).toContain("baleendevs@gmail.com");
    expect(text).toContain("Google Analytics for Firebase");
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

  it("faithfully preserves dates, providers, contacts, and named services in Italian", () => {
    const terms = documentText(italianTermsDocument);
    const privacy = documentText(italianPrivacyDocument);

    expect(terms).toContain("Scaricando o utilizzando l'app");
    expect(terms).toContain("perdite, dirette o indirette");
    expect(terms).toContain("I presenti termini e condizioni sono in vigore dal 2020-09-30");
    expect(privacy).toContain("app supportata dalla pubblicità");
    expect(privacy).toContain("saranno conservate sul tuo dispositivo e non saranno raccolte da me");
    expect(privacy).toContain("La presente informativa è in vigore dal 2020-09-30");

    for (const text of [terms, privacy]) {
      expect(text).toContain("Baleen Developers");
      expect(text).toContain("baleendevs@gmail.com");
      expect(text).toContain("Google Play Services");
      expect(text).toContain("AdMob");
      expect(text).toContain("Google Analytics for Firebase");
    }
  });
});
