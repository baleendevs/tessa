import type { ReactNode } from "react";
import { MarketingAnalyticsBoundary } from "@/components/analytics/MarketingAnalyticsBoundary";

export default function EnglishMarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <MarketingAnalyticsBoundary locale="en" />
    </>
  );
}
