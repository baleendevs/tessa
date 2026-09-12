"use client";

import { useRef, type KeyboardEvent } from "react";
import { MenuIcon } from "./MarketingIcons";

type MobileNavigationProps = {
  label: string;
  links: Array<[href: string, label: string]>;
};

export function MobileNavigation({ label, links }: MobileNavigationProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    detailsRef.current?.removeAttribute("open");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key !== "Escape") return;
    event.preventDefault();
    closeMenu();
    detailsRef.current?.querySelector("summary")?.focus();
  }

  return (
    <details
      className="mobile-menu"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}
      onKeyDown={handleKeyDown}
      ref={detailsRef}
    >
      <summary aria-label={label}><MenuIcon /></summary>
      <nav aria-label={label}>
        {links.map(([href, linkLabel]) => (
          <a href={href} key={href} onClick={closeMenu}>{linkLabel}</a>
        ))}
      </nav>
    </details>
  );
}
