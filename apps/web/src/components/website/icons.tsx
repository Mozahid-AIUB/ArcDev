import type { ServiceSlug } from "@arcdev/shared";

interface IconProps {
  className?: string;
}

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function MenuIcon({ className = "size-6" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className = "size-6" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PhoneIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}

export function ChatIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 21l1.9-5.4A8.5 8.5 0 1 1 21 11.5Z" />
    </svg>
  );
}

export function MailIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function PinIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function BuildingIcon({ className = "size-6" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M4 21h16" />
      <path d="M6 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16" />
      <path d="M15 9h3a1 1 0 0 1 1 1v11" />
      <path d="M9 8h2M9 12h2M9 16h2" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "size-4" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = "size-6" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "size-6" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function PlusIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function CheckIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function PauseIcon({ className = "size-4" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M9 5v14M15 5v14" />
    </svg>
  );
}

export function PlayIcon({ className = "size-4" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M7 5v14l12-7Z" />
    </svg>
  );
}

export function ExpandIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}

export function ServiceIcon({ slug, className = "size-6" }: IconProps & { slug: ServiceSlug }) {
  switch (slug) {
    case "fund":
      return (
        <svg {...stroke} className={className}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M6.5 9.5v5M17.5 9.5v5" />
        </svg>
      );
    case "landshare":
      return (
        <svg {...stroke} className={className}>
          <path d="M3 20h18" />
          <path d="M5 20v-9l4-3 4 3v9" />
          <path d="M13 20v-6l3-2.5 3 2.5v6" />
        </svg>
      );
    case "interior":
      return (
        <svg {...stroke} className={className}>
          <path d="M6 11V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" />
          <path d="M4 18v-5a2 2 0 0 1 4 0v1h8v-1a2 2 0 0 1 4 0v5Z" />
          <path d="M6 18v2M18 18v2" />
        </svg>
      );
    case "engineering":
      return (
        <svg {...stroke} className={className}>
          <path d="M4 20 20 4v16Z" />
          <path d="M14 20v-6h6" />
        </svg>
      );
    case "management":
      return (
        <svg {...stroke} className={className}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4V3h6v1" />
          <path d="m9 13 2 2 4-4" />
        </svg>
      );
    case "investment":
      return (
        <svg {...stroke} className={className}>
          <path d="m3 17 6-6 4 4 8-8" />
          <path d="M15 7h6v6" />
        </svg>
      );
  }
}
