import type { Metadata } from "next";
import { HomeFoundation } from "@/components/pages/HomeFoundation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  route: "home",
  title: "TesSa — Your documents, ready when you need them",
  description:
    "TesSa is the mobile app for organising your Italian health card, CIE and driving licence on your device.",
});

export default function EnglishHomePage() {
  return <HomeFoundation locale="en" />;
}
