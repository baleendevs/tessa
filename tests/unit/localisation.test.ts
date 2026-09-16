import { describe, expect, it } from "vitest";
import { dictionaries } from "../../src/content/dictionaries";
import { routePath } from "../../src/lib/site";

describe("localisation foundation", () => {
  it("keeps both dictionaries structurally aligned", () => {
    expect(Object.keys(dictionaries.it)).toEqual(Object.keys(dictionaries.en));
    expect(Object.keys(dictionaries.it.navigation)).toEqual(
      Object.keys(dictionaries.en.navigation),
    );
    expect(Object.keys(dictionaries.it.theme)).toEqual(
      Object.keys(dictionaries.en.theme),
    );
    expect(Object.keys(dictionaries.it.share.actionTitles)).toEqual(
      Object.keys(dictionaries.en.share.actionTitles),
    );
    expect(Object.keys(dictionaries.it.share.actionDescriptions)).toEqual(
      Object.keys(dictionaries.en.share.actionDescriptions),
    );
    expect(Object.keys(dictionaries.it.share.actionDescriptionsWithoutName)).toEqual(
      Object.keys(dictionaries.en.share.actionDescriptionsWithoutName),
    );
    expect(Object.keys(dictionaries.it.share.states)).toEqual(
      Object.keys(dictionaries.en.share.states),
    );
    expect(Object.keys(dictionaries.it.share.fieldLabels)).toEqual(
      Object.keys(dictionaries.en.share.fieldLabels),
    );
    expect(Object.keys(dictionaries.it.home)).toEqual(
      Object.keys(dictionaries.en.home),
    );
    expect(dictionaries.it.home.faq.items).toHaveLength(
      dictionaries.en.home.faq.items.length,
    );
  });

  it("uses British English terminology", () => {
    expect(dictionaries.en.home.hero.description).toContain("driving licence");
    expect(dictionaries.en.home.hero.description).not.toContain("driver's license");
    expect(dictionaries.en.share.documentTypes.P).toBe("Driving licence");
    expect(JSON.stringify(dictionaries.en.home)).not.toMatch(/driver's license/i);
  });

  it("keeps legacy Green Pass out of homepage marketing", () => {
    expect(JSON.stringify(dictionaries.it.home)).not.toMatch(/green pass/i);
    expect(JSON.stringify(dictionaries.en.home)).not.toMatch(/green pass/i);
  });

  it("builds locale routes under the GitHub Pages base path", () => {
    expect(routePath("it", "home")).toBe("/tessa/");
    expect(routePath("en", "home")).toBe("/tessa/en/");
    expect(routePath("it", "share")).toBe("/tessa/share");
    expect(routePath("en", "share")).toBe("/tessa/en/share");
  });
});
