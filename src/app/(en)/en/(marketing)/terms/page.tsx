import type { Metadata } from "next";
import { LegalFoundation } from "@/components/pages/LegalFoundation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  route: "terms",
  title: "Terms of Use — TesSa",
  description: "Terms of Use for TesSa.",
});

export default function EnglishTermsPage() {
  return <LegalFoundation locale="en" route="terms" />;
}
