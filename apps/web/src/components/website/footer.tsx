import Link from "next/link";
import { SERVICES } from "@arcdev/shared";
import { SITE } from "@/lib/site";
import { SiteLogo } from "./site-logo";

const COMPANY_LINKS = [
  { href: "/about", label: "About ArcDev" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/enquiry", label: "Send an enquiry" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <SiteLogo className="text-white" />
          <p className="max-w-xs text-[15px] leading-relaxed">{SITE.description}</p>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright font-stretch-100%">
            Services
          </h2>
          <ul className="mt-2">
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
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright font-stretch-100%">
            Company
          </h2>
          <ul className="mt-2">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="flex h-11 items-center hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright font-stretch-100%">
            Contact
          </h2>
          <ul className="mt-2">
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
            <li className="py-2.5 leading-relaxed">
              <span className="block font-semibold text-white/90">Dhaka</span>
              {SITE.address}
            </li>
            <li className="py-2.5 leading-relaxed">
              <span className="block font-semibold text-white/90">Sylhet</span>
              {SITE.addressSylhet}
            </li>
          </ul>
        </div>
      </div>

      {/* Extra bottom padding on phones keeps the floating contact buttons off this line. */}
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 pb-24 pt-5 text-sm text-white/60 sm:px-6 md:pb-5">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
