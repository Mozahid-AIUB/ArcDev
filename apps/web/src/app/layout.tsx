import type { Metadata } from "next";
import { Archivo, Hind_Siliguri } from "next/font/google";
import { isProductionSite, SITE } from "@/lib/site";
import "./globals.css";

const hind = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// Runs before first paint. Marks the page as animatable (see globals.css), unless the
// visitor prefers reduced motion. If the animation code hasn't started within 5 seconds
// (slow network, script error) the mark is removed so nothing stays hidden.
const MOTION_SCRIPT = `(function(){try{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;var d=document.documentElement;d.setAttribute("data-motion","pending");setTimeout(function(){if(d.getAttribute("data-motion")==="pending")d.removeAttribute("data-motion")},5000)}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Architects, Engineers & Construction Management`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  openGraph: {
    siteName: SITE.name,
    type: "website",
    locale: "en_BD",
  },
  // Staging, local builds and the pre-launch site must never end up in search results.
  robots: isProductionSite ? undefined : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hind.variable} ${archivo.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
