import Link from "next/link";
import { SERVICES } from "@arcdev/shared";
import { SITE } from "@/lib/site";
import { SiteLogo } from "./site-logo";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <SiteLogo className="text-white" />
          <p className="max-w-xs text-[15px] leading-relaxed">{SITE.description}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-bright">Services</h2>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 md:grid-cols-1">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="flex h-11 items-center hover:text-white">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-bright">Contact</h2>
          <ul className="mt-2 flex flex-col">
            <li>
              <a href={`tel:${SITE.phone}`} className="flex h-11 items-center tabular-nums hover:text-white">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex h-11 items-center hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li className="py-2.5">{SITE.address}</li>
          </ul>
        </div>
      </div>

      {/* Extra bottom padding on phones keeps the floating contact buttons off this line. */}
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 pb-24 pt-5 text-sm text-white/60 sm:px-6 md:pb-5">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
