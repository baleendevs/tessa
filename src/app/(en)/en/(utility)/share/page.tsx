import type { Metadata } from "next";
import { ShareFoundation } from "@/components/pages/ShareFoundation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  route: "share",
  title: "Shared card — TesSa",
  description: "Preview a card shared using TesSa.",
  privateUtility: true,
});

export default function EnglishSharePage() {
  return <ShareFoundation locale="en" />;
}
