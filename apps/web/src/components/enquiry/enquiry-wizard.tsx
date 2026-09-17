"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { getService, SERVICES, type ServiceSlug } from "@arcdev/shared";
import { buttonStyles } from "@/components/ui/button";
import { FactList } from "@/components/ui/fact-list";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, ServiceIcon } from "@/components/website/icons";
import { SITE } from "@/lib/site";
import { submitRequest, type SubmitState } from "@/lib/submit-request";

const INITIAL: SubmitState = { status: "idle" };

const STEPS = [
  { label: "Service", title: "Which service do you need?" },
  { label: "Details", title: "Tell us a little more" },
  { label: "Contact", title: "How can we reach you?" },
] as const;

const inputClass =
  "h-12 w-full rounded-md border border-line bg-panel px-3 text-base text-ink placeholder:text-ink-soft/60 focus:border-navy aria-[invalid=true]:border-stop";

/** Which step holds the field a server error is about. */
function stepOfField(key: string): number {
  if (key === "service") return 0;
  if (key === "message" || key.startsWith("details")) return 1;
  return 2;
}

export function EnquiryWizard() {
  const searchParams = useSearchParams();
  const [state, formAction, pending] = useActionState(submitRequest, INITIAL);

  const [step, setStep] = useState(0);
  const [serviceSlug, setServiceSlug] = useState<ServiceSlug | null>(
    () => getService(searchParams.get("service") ?? "")?.slug ?? null,
  );
  const [details, setDetails] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", phone: "", email: "", message: "" });

  // When the server finds a problem, open the step that holds the first one.
  const [handledState, setHandledState] = useState(state);
  if (state !== handledState) {
    setHandledState(state);
    if (state.status === "invalid") {
      const keys = Object.keys(state.errors);
      if (keys.length > 0) setStep(Math.min(...keys.map(stepOfField)));
    }
  }

  const formRef = useRef<HTMLFormElement>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const successRef = useRef<HTMLHeadingElement>(null);
  const hasMounted = useRef(false);

  // Move focus to the new step's heading so keyboard and screen reader users follow along.
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    headingRefs.current[step]?.focus();
  }, [step]);

  // After a rejected submit, put focus on the first field with an error.
  useEffect(() => {
    if (state.status === "invalid") {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
    } else if (state.status === "sent") {
      successRef.current?.focus();
    }
  }, [state]);

  const service = serviceSlug ? getService(serviceSlug) : undefined;
  const errors = state.status === "invalid" ? state.errors : {};
  const detailKey = (name: string) => `${serviceSlug}.${name}`;

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-lg border border-line border-t-4 border-t-ok bg-panel p-6 sm:p-10">
        <span className="grid size-14 place-items-center rounded-full bg-ok/10 text-ok">
          <CheckIcon className="size-7" />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="mt-6 font-display text-2xl font-bold text-navy outline-none sm:text-3xl">
          Enquiry received
        </h2>
        <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-soft">
          Thank you{state.name && `, ${state.name}`}. Someone from ArcDev will call you
          {state.phone && (
            <>
              {" "}
              on <span className="font-semibold tabular-nums text-ink">{state.phone}</span>
            </>
          )}
          .
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {service && (
            <Link href={`/services/${service.slug}`} className={buttonStyles.outline}>
              Read about {service.name}
            </Link>
          )}
          <Link href="/" className={buttonStyles.outline}>
            Back to the home page
          </Link>
        </div>
      </div>
    );
  }

  const describe = (key: string, id: string) =>
    errors[key] ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {};

  const canVisit = (index: number) => index === 0 || serviceSlug !== null;
  const goTo = (index: number) => {
    if (canVisit(index)) setStep(index);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  // Enter in a text box moves on to the next step instead of doing nothing.
  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    const target = event.target as HTMLElement;
    if (event.key === "Enter" && step < 2 && target instanceof HTMLInputElement && target.type !== "radio") {
      event.preventDefault();
      goTo(step + 1);
    }
  };

  const reviewFacts = [
    { label: "Service", value: service?.name ?? "Not chosen" },
    ...(service?.fields ?? []).map((field) => ({
      label: field.label,
      value: details[detailKey(field.name)]?.trim() || "Not given",
    })),
  ];

  return (
    <div className="rounded-lg border border-line border-t-4 border-t-gold bg-panel shadow-xl shadow-navy/5">
      {/* Stepper */}
      <div className="border-b border-line px-5 pt-5 sm:px-8 sm:pt-7">
        <ol className="grid grid-cols-3 gap-2">
          {STEPS.map((item, index) => {
            const active = index === step;
            const done = index < step;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  disabled={!canVisit(index)}
                  aria-current={active ? "step" : undefined}
                  className="flex min-h-11 w-full flex-col items-start gap-1 rounded-md text-left disabled:cursor-not-allowed sm:flex-row sm:items-center sm:gap-3"
                >
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full font-display text-sm font-bold tabular-nums transition-colors ${
                      active ? "bg-navy text-gold-bright" : done ? "bg-gold-bright text-navy" : "bg-sand text-ink-soft"
                    }`}
                  >
                    {done ? <CheckIcon className="size-4" /> : index + 1}
                  </span>
                  <span
                    className={`text-sm font-semibold sm:text-base ${active ? "text-navy" : "text-ink-soft"}`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <div
          role="progressbar"
          aria-label="Enquiry progress"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
          aria-valuetext={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step].label}`}
          className="mt-5 h-1 overflow-hidden bg-line"
        >
          <div
            className="h-full bg-gold transition-[width] duration-500 ease-out"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <form ref={formRef} action={formAction} onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="p-5 sm:p-8">
        {/* Spam trap: hidden from people, filled in by bots. */}
        <div hidden>
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {/* Step 1: service */}
        <section hidden={step !== 0} aria-labelledby="enquiry-step-1">
          <StepHeading id="enquiry-step-1" index={0} headingRef={(el) => {
              headingRefs.current[0] = el;
            }} />
          <fieldset className="mt-6" aria-labelledby="enquiry-step-1">
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICES.map((option) => (
                <label
                  key={option.slug}
                  className="group relative flex min-h-24 cursor-pointer gap-4 rounded-lg border border-line bg-panel p-4 transition-colors hover:border-navy/40 has-checked:border-navy has-checked:bg-sand/60 has-checked:ring-1 has-checked:ring-navy has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-navy"
                >
                  <input
                    type="radio"
                    name="service"
                    value={option.slug}
                    required
                    checked={serviceSlug === option.slug}
                    onChange={() => setServiceSlug(option.slug)}
                    className="sr-only"
                  />
                  <span className="grid size-12 shrink-0 place-items-center rounded-md bg-navy text-gold-bright">
                    <ServiceIcon slug={option.slug} />
                  </span>
                  <span className="flex flex-col pr-6">
                    <span className="font-display text-lg font-bold text-navy">{option.name}</span>
                    <span className="mt-0.5 text-[15px] leading-snug text-ink-soft">{option.title}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 grid size-6 place-items-center rounded-full border border-line text-transparent group-has-checked:border-navy group-has-checked:bg-navy group-has-checked:text-gold-bright"
                  >
                    <CheckIcon className="size-4" />
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          {errors.service && <p className="mt-3 text-sm text-stop">{errors.service}</p>}
        </section>

        {/* Step 2: details for the chosen service */}
        <section hidden={step !== 1} aria-labelledby="enquiry-step-2">
          <StepHeading id="enquiry-step-2" index={1} headingRef={(el) => {
              headingRefs.current[1] = el;
            }} />
          <p className="mt-2 text-[17px] text-ink-soft">
            {service ? `A few questions about ${service.name.toLowerCase()}. Answer what you can.` : "Choose a service first."}
          </p>
          <div className="mt-6 flex flex-col gap-4">
            {service?.fields.map((field) => {
              const key = `details.${field.name}`;
              const id = `enquiry-${service.slug}-${field.name}`;
              return (
                <Field key={id} id={id} label={field.label} optional error={errors[key]}>
                  <input
                    id={id}
                    name={key}
                    type="text"
                    inputMode={field.inputMode}
                    placeholder={field.placeholder}
                    maxLength={200}
                    value={details[detailKey(field.name)] ?? ""}
                    onChange={(event) =>
                      setDetails((current) => ({ ...current, [detailKey(field.name)]: event.target.value }))
                    }
                    className={inputClass}
                    {...describe(key, id)}
                  />
                </Field>
              );
            })}
            <Field id="enquiry-message" label="Anything else we should know?" optional error={errors.message}>
              <textarea
                id="enquiry-message"
                name="message"
                rows={4}
                maxLength={1000}
                value={contact.message}
                onChange={(event) => setContact((current) => ({ ...current, message: event.target.value }))}
                className={`${inputClass} h-auto py-3`}
                {...describe("message", "enquiry-message")}
              />
            </Field>
          </div>
        </section>

        {/* Step 3: contact and review */}
        <section hidden={step !== 2} aria-labelledby="enquiry-step-3">
          <StepHeading id="enquiry-step-3" index={2} headingRef={(el) => {
              headingRefs.current[2] = el;
            }} />
          <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)]">
            <div className="flex flex-col gap-4">
              <Field id="enquiry-name" label="Your name" error={errors.name}>
                <input
                  id="enquiry-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={contact.name}
                  onChange={(event) => setContact((current) => ({ ...current, name: event.target.value }))}
                  className={inputClass}
                  {...describe("name", "enquiry-name")}
                />
              </Field>
              <Field id="enquiry-phone" label="Mobile number" error={errors.phone}>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="01XXXXXXXXX"
                  required
                  value={contact.phone}
                  onChange={(event) => setContact((current) => ({ ...current, phone: event.target.value }))}
                  className={`${inputClass} tabular-nums`}
                  {...describe("phone", "enquiry-phone")}
                />
              </Field>
              <Field id="enquiry-email" label="Email" optional error={errors.email}>
                <input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={contact.email}
                  onChange={(event) => setContact((current) => ({ ...current, email: event.target.value }))}
                  className={inputClass}
                  {...describe("email", "enquiry-email")}
                />
              </Field>
            </div>

            <div className="self-start rounded-lg bg-sand/60 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">Your enquiry</h3>
              <FactList facts={reviewFacts} className="mt-2 text-[15px]" />
              <button
                type="button"
                onClick={() => goTo(1)}
                className="mt-2 inline-flex min-h-11 items-center text-[15px] font-semibold text-navy underline underline-offset-4 hover:text-gold-deep"
              >
                Change details
              </button>
            </div>
          </div>
        </section>

        {state.status === "failed" && (
          <p role="alert" className="mt-6 rounded-md bg-stop/10 p-4 text-[15px] text-stop">
            Your enquiry couldn&apos;t be sent. Please try again, or call us on{" "}
            <a href={`tel:${SITE.phone}`} className="font-semibold underline tabular-nums">
              {SITE.phoneDisplay}
            </a>
            .
          </p>
        )}

        {/* Navigation */}
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className={buttonStyles.outline}>
              <ChevronLeftIcon className="size-5" />
              Back
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}

          {step < 2 ? (
            <button
              type="button"
              onClick={() => goTo(step + 1)}
              disabled={serviceSlug === null}
              className={buttonStyles.primary}
            >
              Next: {STEPS[step + 1].label}
              <ChevronRightIcon className="size-5" />
            </button>
          ) : (
            <button type="submit" disabled={pending} className={buttonStyles.primary}>
              {pending ? "Sending…" : (service?.cta ?? "Send enquiry")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function StepHeading({
  id,
  index,
  headingRef,
}: {
  id: string;
  index: number;
  headingRef: (element: HTMLHeadingElement | null) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">
        Step {index + 1} of {STEPS.length}
      </p>
      <h2 id={id} ref={headingRef} tabIndex={-1} className="mt-2 font-display text-2xl font-bold text-navy outline-none">
        {STEPS[index].title}
      </h2>
    </div>
  );
}

function Field({
  id,
  label,
  optional = false,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[15px] font-medium text-ink">
        {label}
        {optional && <span className="font-normal text-ink-soft"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-stop">
          {error}
        </p>
      )}
    </div>
  );
}
