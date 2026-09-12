import type { Metadata } from "next";
import { ShareFoundation } from "@/components/pages/ShareFoundation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "it",
  route: "share",
  title: "Tessera condivisa — TesSa",
  description: "Anteprima di una tessera condivisa tramite TesSa.",
  privateUtility: true,
});

export default function ItalianSharePage() {
  return <ShareFoundation locale="it" />;
}
