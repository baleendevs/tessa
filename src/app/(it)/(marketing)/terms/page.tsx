import type { Metadata } from "next";
import { LegalFoundation } from "@/components/pages/LegalFoundation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "it",
  route: "terms",
  title: "Condizioni d'uso — TesSa",
  description: "Condizioni d'uso di TesSa.",
});

export default function ItalianTermsPage() {
  return <LegalFoundation locale="it" route="terms" />;
}
