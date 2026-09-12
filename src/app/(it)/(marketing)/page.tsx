import type { Metadata } from "next";
import { HomeFoundation } from "@/components/pages/HomeFoundation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "it",
  route: "home",
  title: "TesSa — I tuoi documenti, sempre a portata di mano",
  description:
    "TesSa è l'app mobile per organizzare Tessera Sanitaria, CIE e patente di guida sul tuo dispositivo.",
});

export default function ItalianHomePage() {
  return <HomeFoundation locale="it" />;
}
