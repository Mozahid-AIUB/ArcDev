import type { Metadata } from "next";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { GalleryBrowser } from "@/components/gallery/gallery-browser";
import { ArrowRightIcon } from "@/components/website/icons";
import { PageHeader } from "@/components/website/page-header";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of construction sites, finished buildings, interiors and planning work from Arc Development Pvt. Ltd. in Dhaka.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" },
        ]}
        title="Sites, buildings and interiors"
        intro="From piling rigs and concrete frames to finished towers and fitted-out flats: a look at the work behind every building."
        image="/images/projects/appropriate-apparels/construction-01.webp"
      />

      <section aria-labelledby="gallery-heading" className="bg-ground py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="gallery-heading"
            eyebrow="Photo library"
            title="Browse by category"
            intro="Pick a category, then open any photo to see it full size."
          />
          <div className="mt-10">
            <GalleryBrowser />
          </div>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span data-reveal="fade" aria-hidden="true" className="block h-0.5 w-10 bg-gold" />
            <h2 data-reveal="" className="mt-5 text-3xl font-bold leading-[1.1] sm:text-4xl">
              See the projects behind the photos
            </h2>
          </div>
          <div data-reveal="" className="flex flex-wrap gap-3">
            <Link href="/projects" className={buttonStyles.primary}>
              View projects
              <ArrowRightIcon />
            </Link>
            <Link href="/enquiry" className={buttonStyles.outlineOnDark}>
              Make an enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
