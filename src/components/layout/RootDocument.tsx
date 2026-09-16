import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";
import { ThemeBootstrap } from "@/components/theme/ThemeBootstrap";

type RootDocumentProps = {
  children: ReactNode;
  locale: Locale;
};

export function RootDocument({ children, locale }: RootDocumentProps) {
  return (
    <html
      lang={locale === "it" ? "it" : "en-GB"}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-on-surface antialiased">
        <ThemeBootstrap />
        {children}
      </body>
    </html>
  );
}
