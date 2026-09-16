// Placeholder mark from the client's sketch (a triangle). Swap for the real logo when it arrives.
export function SiteLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true">
        <path
          d="M12 3 22 20H2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M12 11l4 6.5H8Z" className="fill-gold-bright" />
      </svg>
      <span className="text-xl font-bold tracking-tight">ArcDev</span>
    </span>
  );
}
