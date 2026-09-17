"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@arcdev/shared";
import { buttonStyles } from "@/components/ui/button";
import { ChevronDownIcon, CloseIcon, MenuIcon, ServiceIcon } from "./icons";
import { SiteLogo } from "./site-logo";

const NAV = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);

  const closeAll = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  return (
    <header
      className={`sticky top-0 z-40 bg-navy text-white transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-navy-deep/30" : ""}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-20">
        <Link href="/" onClick={closeAll} className="-ml-1 flex h-11 items-center px-1">
          <SiteLogo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li ref={servicesRef} className="relative">
              <button
                type="button"
                onClick={() => setServicesOpen((open) => !open)}
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                className={`flex h-11 items-center gap-1.5 rounded-md px-3 text-[15px] font-medium hover:text-white ${isActive("/services") ? "text-gold-bright" : "text-white/85"}`}
              >
                Services
                <ChevronDownIcon className={`size-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div
                  id="services-menu"
                  className="absolute left-0 top-full mt-2 w-[36rem] rounded-lg bg-panel p-3 text-ink shadow-2xl ring-1 ring-navy/10"
                >
                  <ul className="grid grid-cols-2 gap-1">
                    {SERVICES.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={closeAll}
                          className="flex gap-3 rounded-md p-3 hover:bg-ground"
                        >
                          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-navy text-gold-bright">
                            <ServiceIcon slug={service.slug} className="size-5" />
                          </span>
                          <span>
                            <span className="block font-semibold text-navy">{service.name}</span>
                            <span className="block text-sm leading-snug text-ink-soft">{service.title}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex h-11 items-center rounded-md px-3 text-[15px] font-medium hover:text-white ${isActive(item.href) ? "text-gold-bright" : "text-white/85"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/enquiry" onClick={closeAll} className={`${buttonStyles.primary} hidden sm:inline-flex`}>
            Enquire
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="-mr-2 grid size-11 place-items-center rounded-md hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 lg:hidden"
        >
          <div className="mx-auto max-w-7xl px-4 pb-6 pt-2 sm:px-6">
            <p className="pt-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-bright">Services</p>
            <ul className="mt-1 grid gap-x-4 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    onClick={closeAll}
                    className="flex h-12 items-center gap-3 text-base font-medium"
                  >
                    <ServiceIcon slug={service.slug} className="size-5 text-gold-bright" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-2 border-t border-white/10 pt-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={closeAll} className="flex h-12 items-center text-base font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/enquiry" onClick={closeAll} className={`${buttonStyles.primary} mt-4 w-full`}>
              Send an enquiry
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
