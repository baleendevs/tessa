import { describe, expect, it } from "vitest";
import { legalDocuments } from "../../src/content/legal";

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

describe("preserved legal source", () => {
  it("keeps the existing effective date and source titles", () => {
    expect(legalDocuments.terms).toMatchObject({
      sourceTitle: "Terms & Conditions",
      effectiveDate: "2020-09-30",
    });
    expect(legalDocuments.privacy).toMatchObject({
      sourceTitle: "Privacy Policy",
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
});
