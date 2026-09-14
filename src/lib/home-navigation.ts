export const HOME_SECTION_IDS = {
  documents: "documents",
  howItWorks: "how-it-works",
  sharing: "sharing",
  privacy: "privacy",
  faq: "faq",
  download: "download",
} as const;

export const HOME_SECTION_ORDER = [
  { id: HOME_SECTION_IDS.documents, navigationKey: "documents" },
  { id: HOME_SECTION_IDS.howItWorks, navigationKey: "howItWorks" },
  { id: HOME_SECTION_IDS.sharing, navigationKey: "sharing" },
  { id: HOME_SECTION_IDS.privacy, navigationKey: "privacy" },
  { id: HOME_SECTION_IDS.faq, navigationKey: "faq" },
  { id: HOME_SECTION_IDS.download, navigationKey: "download" },
] as const;

export const HOME_NAVBAR_SECTIONS = HOME_SECTION_ORDER.slice(0, -1);
