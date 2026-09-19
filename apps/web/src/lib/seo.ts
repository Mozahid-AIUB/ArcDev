import { SITE } from "./site";

export interface Crumb {
  name: string;
  href: string;
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    logo: absoluteUrl("/images/brand/logo-mark.png"),
    telephone: SITE.phone,
    email: SITE.email,
    address: [
      { "@type": "PostalAddress", streetAddress: SITE.address, addressLocality: "Dhaka", addressCountry: "BD" },
      { "@type": "PostalAddress", streetAddress: SITE.addressSylhet, addressLocality: "Sylhet", addressCountry: "BD" },
    ],
  };
}

export function breadcrumbJsonLd(crumbs: readonly Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  };
}
