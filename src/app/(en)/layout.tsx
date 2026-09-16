import type { ReactNode } from "react";
import type { Viewport } from "next";
import "../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { themeColours } from "@/lib/theme";

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: themeColours.light,
  width: "device-width",
  initialScale: 1,
};

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
