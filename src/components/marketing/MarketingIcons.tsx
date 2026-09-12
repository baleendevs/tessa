type IconProps = {
  className?: string;
};

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.8,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export function WalletIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v12H6.5A2.5 2.5 0 0 1 4 16.5z" />
      <path d="M4 8h14.5A1.5 1.5 0 0 1 20 9.5V12h-4a2 2 0 0 0 0 4h4M16 14h.01" />
    </svg>
  );
}

export function QrIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM15 14h2v2h-2zM19 14h1v3M14 19h3M20 20h-2" />
    </svg>
  );
}

export function LinkIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="m9.5 14.5 5-5M7.2 16.8l-1 1a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5 0M16.8 7.2l1-1a3.5 3.5 0 0 1 5 5l-3 3a3.5 3.5 0 0 1-5 0" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="4" y="10" width="16" height="11" rx="3" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
    </svg>
  );
}

export function FingerprintIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M12 11a3 3 0 0 1 3 3c0 3-1 5-2 7M8 14a4 4 0 0 1 8 0c0 2-.3 4-1 6M5 15a7 7 0 0 1 14-1c0 2-.2 4-.7 6M4.5 10A8 8 0 0 1 18 7.5M8.5 19c.5-1.2.5-2.8.5-5a3 3 0 0 1 .4-1.5" />
    </svg>
  );
}

export function DeviceIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M10 5h4M11 18h2" />
    </svg>
  );
}

export function BackupIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M12 3v12M7.5 7.5 12 3l4.5 4.5" />
      <path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M5 7h14M8 12h11M11 17h8" />
    </svg>
  );
}
