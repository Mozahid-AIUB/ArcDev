"use client";

import { useActionState, type ReactNode } from "react";
import { ArrowRightIcon, CheckIcon, PhoneIcon } from "@/components/website/icons";
import { SITE } from "@/lib/site";
import { submitRequest, type SubmitState } from "@/lib/submit-request";

const INITIAL: SubmitState = { status: "idle" };

const inputClass =
  "peer h-14 w-full rounded-lg border border-white/15 bg-white/[0.06] px-4 pt-5 text-base text-white outline-none transition-colors placeholder:text-transparent focus:border-gold-bright focus:bg-white/[0.09] aria-[invalid=true]:border-red-400";
const labelClass =
  "pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[15px] text-white/55 transition-all duration-200 peer-focus:top-3.5 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:tracking-[0.14em] peer-focus:text-gold-bright peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:tracking-[0.14em] peer-[:not(:placeholder-shown)]:uppercase";

/**
 * The landowner lead: three fields for a free land assessment. Goes to the office as a Fund
 * request tagged "free land assessment", through the same checks as the service forms.
 */
export function LandAssessmentForm() {
  const [state, formAction, pending] = useActionState(submitRequest, INITIAL);

  if (state.status === "sent") {
    return (
      <div role="status" className="flex h-full flex-col items-center justify-center p-8 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-gold-bright text-navy-deep">
          <CheckIcon className="size-8" />
        </span>
        <p className="mt-5 font-display text-2xl font-bold text-white">Request received</p>
        <p className="mt-2 max-w-sm text-white/75">
          Thank you{state.name && `, ${state.name}`}. An ArcDev engineer will call you
          {state.phone && <span className="font-semibold text-white tabular-nums"> on {state.phone}</span>} to arrange the
          visit.
        </p>
      </div>
    );
  }

  const values = state.status === "idle" ? {} : state.values;
  const errors = state.status === "invalid" ? state.errors : {};

  return (
    <form action={formAction} className="flex h-full flex-col p-5 sm:p-7" noValidate>
      <p className="text-xs font-semibold tracking-[0.18em] text-gold-bright uppercase">For landowners</p>
      <h3 className="mt-2 font-display text-2xl leading-tight font-bold text-white sm:text-[1.7rem]">
        Book a free land assessment
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-white/70">
        We visit your plot, check the papers and tell you what can be built on it. No cost, no obligation.
      </p>

      <input type="hidden" name="service" value="fund" />
      <input type="hidden" name="topic" value="land-assessment" />
      <div hidden>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-5 space-y-3">
        <Field id="la-name" label="Your name" error={errors.name}>
          <input
            id="la-name"
            name="name"
            autoComplete="name"
            required
            placeholder="Your name"
            defaultValue={values.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "la-name-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="la-phone" label="Mobile number" error={errors.phone}>
          <input
            id="la-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="01XXXXXXXXX"
            defaultValue={values.phone}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "la-phone-error" : undefined}
            className={`${inputClass} tabular-nums`}
          />
        </Field>
        <Field id="la-area" label="Where is the land?">
          <input
            id="la-area"
            name="details.landLocation"
            autoComplete="address-level2"
            placeholder="Area, city"
            defaultValue={values["details.landLocation"]}
            className={inputClass}
          />
        </Field>
      </div>

      {state.status === "failed" && (
        <p role="alert" className="mt-4 rounded-lg bg-red-500/15 p-3 text-sm text-red-200">
          Your request couldn&apos;t be sent. Please call us on{" "}
          <a href={`tel:${SITE.phone}`} className="font-semibold underline tabular-nums">
            {SITE.phoneDisplay}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-gold-bright px-6 text-base font-semibold text-navy-deep transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Sending…" : "Book my free assessment"}
        {!pending && <ArrowRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1" />}
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/50">
        <PhoneIcon className="size-3.5" />
        Your number is used only to arrange the visit.
      </p>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <div className="relative">
        {children}
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
