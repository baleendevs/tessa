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
  it("uses the publication date for the revised legal documents", () => {
    expect(legalDocuments.terms).toMatchObject({
      effectiveDate: "2026-09-16",
    });
    expect(legalDocuments.privacy).toMatchObject({
      effectiveDate: "2026-09-16",
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

  it("describes TesSa's actual privacy model and third-party processing", () => {
    const text = allText("privacy");
    expect(text).toContain("stored locally in an encrypted database on the user’s device");
    expect(text).toContain("does not provide user accounts");
    expect(text).toContain("Google Analytics for Firebase is currently included on Android");
    expect(text).toContain("ShinyStat is used only to measure aggregate visits");
    expect(text).toContain("encoded, including through Base64 encoding, but is not encrypted");
    expect(text).toContain("do not sell or rent personal data");
    expect(text).toContain("baleen.devs@gmail.com");
  });

  it("provides complete structurally aligned Italian translations", () => {
    expectStructurallyAligned(legalDocuments.terms, italianTermsDocument);
    expectStructurallyAligned(legalDocuments.privacy, italianPrivacyDocument);
  });

  it("provides the revised safeguards and privacy disclosures in Italian", () => {
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
    expect(privacy).toContain("conservati localmente in un database cifrato sul dispositivo dell’utente");
    expect(privacy).toContain("non fornisce account utente");
    expect(privacy).toContain("Google Analytics for Firebase è attualmente incluso su Android");
    expect(privacy).toContain("ShinyStat è utilizzato esclusivamente per misurare gli accessi in forma aggregata");
    expect(privacy).toContain("codifica Base64, ma non sono cifrati");
    expect(privacy).toContain("non vendiamo né concediamo in locazione dati personali");

    for (const text of [terms, privacy]) {
      expect(text).toContain("Baleen Developers");
      expect(text).toContain("AdMob");
      expect(text).toContain("Google Analytics for Firebase");
    }

    expect(privacy).toContain("GitHub");
    expect(privacy).toContain("ShinyStat");
    expect(privacy).toContain("baleen.devs@gmail.com");
  });
});
