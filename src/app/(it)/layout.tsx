import type { ReactNode } from "react";
import type { Viewport } from "next";
import "../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#f7f9fb",
  width: "device-width",
  initialScale: 1,
};

export default function ItalianRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <RootDocument locale="it">{children}</RootDocument>;
}
