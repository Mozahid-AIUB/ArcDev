import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { SiteLogo } from "@/components/website/site-logo";

export default function NotFound() {
  return (
    <main className="grid flex-1 place-items-center px-4 py-24 text-center">
      <div className="flex flex-col items-center">
        <SiteLogo className="text-navy" />
        <p className="mt-10 text-sm font-semibold uppercase tracking-wider text-gold-deep">Page not found</p>
        <h1 className="mt-2 text-3xl font-bold text-navy">This page doesn&apos;t exist</h1>
        <p className="mt-2 text-ink-soft">The link may be old, or the page may have moved.</p>
        <Link href="/" className={`${buttonStyles.primary} mt-8`}>
          Go to the home page
        </Link>
      </div>
    </main>
  );
}
