import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryWizard } from "@/components/enquiry/enquiry-wizard";
import { SectionHeading } from "@/components/ui/section-heading";
import { ChatIcon, ChevronRightIcon, MailIcon, PhoneIcon } from "@/components/website/icons";
import { PageHeader } from "@/components/website/page-header";
import { SITE, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Send an enquiry",
  description:
    "Tell ArcDev what you need — construction funding, joint land development, interior or engineering design, project management or investment — and we'll call you back.",
  alternates: { canonical: "/enquiry" },
};

const NEXT_STEPS = [
  { title: "We read your enquiry", text: "Your answers go to the ArcDev team for the service you chose." },
  { title: "We call you", text: "An engineer or adviser calls to understand your plot, project or plans." },
  { title: "You get a proposal", text: "Where it's relevant, we follow up with a written proposal for you to consider." },
];

export default function EnquiryPage() {
  const contactRows = [
    { href: `tel:${SITE.phone}`, label: "Call us", value: SITE.phoneDisplay, icon: <PhoneIcon />, external: false },
    { href: whatsappUrl, label: "WhatsApp", value: "Chat with us", icon: <ChatIcon />, external: true },
    { href: `mailto:${SITE.email}`, label: "Email", value: SITE.email, icon: <MailIcon />, external: false },
  ];

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Send an enquiry", href: "/enquiry" },
        ]}
        title="Tell us what you need"
        intro="Three short steps: choose a service, add a few details, and leave a number we can call."
        image="/images/projects/anlima-purbachal/entrance-night-01.webp"
      />

      <section aria-label="Enquiry form" className="bg-ground py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="min-w-0">
            <Suspense fallback={<WizardFallback />}>
              <EnquiryWizard />
            </Suspense>
          </div>

          <aside className="flex flex-col gap-14">
            <div>
              <SectionHeading id="next-title" title="What happens next" />
              <ol className="mt-8 flex flex-col gap-6">
                {NEXT_STEPS.map((item, index) => (
                  <li key={item.title} data-reveal="" className="flex gap-4 border-t border-line pt-6">
                    <span className="font-display text-2xl font-bold tabular-nums text-gold-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div data-reveal="">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">Prefer to talk?</h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {contactRows.map((row) => (
                  <li key={row.label}>
                    <a
                      href={row.href}
                      {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex min-h-16 items-center gap-4 py-3 text-navy"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-gold-bright">
                        {row.icon}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-sm text-ink-soft">{row.label}</span>
                        <span className="truncate font-semibold tabular-nums group-hover:text-gold-deep">{row.value}</span>
                      </span>
                      <ChevronRightIcon className="size-5 shrink-0 text-ink-soft transition-transform group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

/** Shown until the form loads in the browser; still gives a way to get in touch. */
function WizardFallback() {
  return (
    <div className="rounded-lg border border-line border-t-4 border-t-gold bg-panel p-6 sm:p-8">
      <p className="font-display text-2xl font-bold text-navy">Loading the enquiry form…</p>
      <p className="mt-3 text-[17px] text-ink-soft">
        If it doesn&apos;t appear, call us on{" "}
        <a href={`tel:${SITE.phone}`} className="font-semibold text-navy underline tabular-nums">
          {SITE.phoneDisplay}
        </a>
        .
      </p>
    </div>
  );
}
