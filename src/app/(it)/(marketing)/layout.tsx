import type { ReactNode } from "react";
import { MarketingAnalyticsBoundary } from "@/components/analytics/MarketingAnalyticsBoundary";

export default function ItalianMarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <MarketingAnalyticsBoundary locale="it" />
    </>
  );
}
