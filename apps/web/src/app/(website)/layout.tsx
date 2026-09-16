import type { ReactNode } from "react";
import { ContactButtons } from "@/components/website/contact-buttons";
import { Footer } from "@/components/website/footer";
import { Header } from "@/components/website/header";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-panel focus:px-4 focus:py-3 focus:text-navy"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <ContactButtons />
    </>
  );
}
