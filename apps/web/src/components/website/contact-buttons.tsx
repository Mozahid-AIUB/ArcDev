import { SITE, whatsappUrl } from "@/lib/site";
import { ChatIcon, PhoneIcon } from "./icons";

/** Floating WhatsApp and Call buttons, on every public page. */
export function ContactButtons() {
  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-4 z-30 flex flex-col gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-navy/25 transition hover:brightness-110"
      >
        <ChatIcon className="size-6" />
      </a>
      <a
        href={`tel:${SITE.phone}`}
        aria-label={`Call ${SITE.phoneDisplay}`}
        className="grid size-14 place-items-center rounded-full bg-gold-bright text-navy shadow-lg shadow-navy/25 transition hover:brightness-105"
      >
        <PhoneIcon className="size-6" />
      </a>
    </div>
  );
}
