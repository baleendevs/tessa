import type { Metadata } from "next";
import { LegalFoundation } from "@/components/pages/LegalFoundation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  route: "privacy",
  title: "Privacy Policy — TesSa",
  description: "Privacy Policy for TesSa.",
});

export default function EnglishPrivacyPage() {
  return <LegalFoundation locale="en" route="privacy" />;
}
