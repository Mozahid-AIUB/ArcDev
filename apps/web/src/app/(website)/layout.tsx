import type { ReactNode } from "react";
import { MotionRoot } from "@/components/motion/motion-root";
import { ContactButtons } from "@/components/website/contact-buttons";
import { Footer } from "@/components/website/footer";
import { Header } from "@/components/website/header";
import { isProductionSite } from "@/lib/site";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <MotionRoot>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-panel focus:px-4 focus:py-3 focus:text-navy"
      >
        Skip to content
      </a>
      {!isProductionSite && (
        <p className="bg-gold-bright px-4 py-1.5 text-center text-[13px] font-medium text-navy">
          Preview site — photos, projects and figures are samples until ArcDev supplies its own.
        </p>
      )}
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <ContactButtons />
    </MotionRoot>
  );
}
