import type { Metadata } from "next";
import { LegalFoundation } from "@/components/pages/LegalFoundation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "it",
  route: "privacy",
  title: "Informativa sulla privacy — TesSa",
  description: "Informativa sulla privacy di TesSa.",
});

export default function ItalianPrivacyPage() {
  return <LegalFoundation locale="it" route="privacy" />;
}
