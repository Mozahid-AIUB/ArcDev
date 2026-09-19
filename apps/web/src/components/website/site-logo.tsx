import Image from "next/image";

export function SiteLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/images/brand/logo-mark.png"
        alt=""
        width={44}
        height={44}
        className="size-9 shrink-0 sm:size-10"
        priority
      />
      <span className="flex flex-col leading-tight">
        <span className="text-lg font-bold tracking-tight sm:text-xl">Arc Development</span>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold-bright">Pvt. Ltd.</span>
      </span>
    </span>
  );
}
