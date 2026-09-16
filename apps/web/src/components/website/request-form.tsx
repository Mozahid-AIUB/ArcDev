"use client";

import { useActionState, type ReactNode } from "react";
import type { Service } from "@arcdev/shared";
import { buttonStyles } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { submitRequest, type SubmitState } from "@/lib/submit-request";

const INITIAL: SubmitState = { status: "idle" };

const inputClass =
  "h-12 w-full rounded-md border border-line bg-panel px-3 text-base text-ink placeholder:text-ink-soft/60 focus:border-navy aria-[invalid=true]:border-stop";

export function RequestForm({ service }: { service: Service }) {
  const [state, formAction, pending] = useActionState(submitRequest, INITIAL);

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-lg border border-ok/30 bg-ok/5 p-5">
        <p className="text-lg font-semibold text-ok">Request received</p>
        <p className="mt-1 text-ink-soft">
          Thank you{state.name && `, ${state.name}`}. Someone from ArcDev will call you
          {state.phone && (
            <>
              {" "}
              on <span className="font-medium tabular-nums text-ink">{state.phone}</span>
            </>
          )}
          .
        </p>
      </div>
    );
  }

  const values = state.status === "idle" ? {} : state.values;
  const errors = state.status === "invalid" ? state.errors : {};

  // Links an input to its error message for screen readers.
  const describe = (key: string, id: string) =>
    errors[key] ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {};

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="service" value={service.slug} />

      {/* Spam trap: hidden from people, filled in by bots. */}
      <div hidden>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field id="request-name" label="Your name" error={errors.name}>
        <input
          id="request-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={values.name}
          className={inputClass}
          {...describe("name", "request-name")}
        />
      </Field>

      <Field id="request-phone" label="Mobile number" error={errors.phone}>
        <input
          id="request-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="01XXXXXXXXX"
          required
          defaultValue={values.phone}
          className={`${inputClass} tabular-nums`}
          {...describe("phone", "request-phone")}
        />
      </Field>

      <Field id="request-email" label="Email" optional error={errors.email}>
        <input
          id="request-email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={values.email}
          className={inputClass}
          {...describe("email", "request-email")}
        />
      </Field>

      {service.fields.map((field) => {
        const key = `details.${field.name}`;
        const id = `request-${field.name}`;
        return (
          <Field key={field.name} id={id} label={field.label} optional error={errors[key]}>
            <input
              id={id}
              name={key}
              type="text"
              inputMode={field.inputMode}
              placeholder={field.placeholder}
              defaultValue={values[key]}
              className={inputClass}
              {...describe(key, id)}
            />
          </Field>
        );
      })}

      <Field id="request-message" label="Anything else we should know?" optional error={errors.message}>
        <textarea
          id="request-message"
          name="message"
          rows={3}
          defaultValue={values.message}
          className={`${inputClass} h-auto py-3`}
          {...describe("message", "request-message")}
        />
      </Field>

      {state.status === "failed" && (
        <p role="alert" className="rounded-md bg-stop/10 p-3 text-[15px] text-stop">
          Your request couldn&apos;t be sent. Please try again, or call us on{" "}
          <a href={`tel:${SITE.phone}`} className="font-semibold underline tabular-nums">
            {SITE.phoneDisplay}
          </a>
          .
        </p>
      )}

      <button type="submit" disabled={pending} className={`${buttonStyles.primary} w-full`}>
        {pending ? "Sending…" : service.cta}
      </button>
    </form>
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
