"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { getService, requestFormSchema, type RequestForm, type Service } from "@arcdev/shared";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// One container serves the site, so an in-memory count per visitor is enough to stop form floods.
const recentByIp = new Map<string, number[]>();

async function clientIp() {
  const list = await headers();
  return (
    list.get("cf-connecting-ip") ??
    list.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    list.get("x-real-ip") ??
    "unknown"
  );
}

function overLimit(ip: string) {
  const now = Date.now();
  const recent = (recentByIp.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    recentByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  recentByIp.set(ip, recent);
  if (recentByIp.size > 5000) {
    for (const [key, times] of recentByIp) {
      if (times.every((time) => now - time >= WINDOW_MS)) recentByIp.delete(key);
    }
  }
  return false;
}

export type SubmitState =
  | { status: "idle" }
  | { status: "invalid"; errors: Record<string, string>; values: Record<string, string> }
  | { status: "failed"; values: Record<string, string> }
  | { status: "sent"; name: string; phone: string };

/**
 * Handles a request form on a service page.
 * Phase 1: emails the office. Phase 2: posts to the API, which stores a lead and sends the email.
 */
export async function submitRequest(_previous: SubmitState, formData: FormData): Promise<SubmitState> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData) {
    if (typeof value === "string" && !key.startsWith("$ACTION")) values[key] = value;
  }

  // People never see this field; bots fill it in. Pretend it worked.
  if (values.company) return { status: "sent", name: "", phone: "" };

  const service = getService(values.service ?? "");
  if (!service) return { status: "failed", values };

  const details: Record<string, string> = {};
  for (const field of service.fields) {
    const answer = values[`details.${field.name}`];
    if (answer) details[field.name] = answer;
  }

  const parsed = requestFormSchema.safeParse({
    service: service.slug,
    name: values.name ?? "",
    phone: values.phone ?? "",
    email: values.email ?? "",
    message: values.message ?? "",
    details,
  });

  if (parsed.success && overLimit(await clientIp())) {
    return { status: "failed", values };
  }

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path.join(".")] ??= issue.message;
    }
    return { status: "invalid", errors, values };
  }

  try {
    await emailOffice(service, parsed.data);
  } catch (error) {
    console.error("Could not email the request to the office", error);
    return { status: "failed", values };
  }

  return { status: "sent", name: parsed.data.name, phone: parsed.data.phone };
}

async function emailOffice(service: Service, request: RequestForm) {
  const lines = [
    `Service: ${service.name}`,
    `Name: ${request.name}`,
    `Phone: ${request.phone}`,
    request.email && `Email: ${request.email}`,
    ...service.fields.map((field) => {
      const answer = request.details[field.name];
      return answer && `${field.label}: ${answer}`;
    }),
    request.message && `\n${request.message}`,
  ].filter(Boolean);
  const text = lines.join("\n");

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, REQUEST_EMAIL_TO, REQUEST_EMAIL_FROM } = process.env;

  if (!SMTP_HOST || !REQUEST_EMAIL_TO) {
    // A live site must never quietly drop a customer's request.
    if (process.env.NODE_ENV === "production") {
      throw new Error("SMTP_HOST and REQUEST_EMAIL_TO must be set to send requests");
    }
    console.info(`[request not emailed: SMTP is not configured]\n${text}`);
    return;
  }

  const port = Number(SMTP_PORT ?? 587);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  await transport.sendMail({
    from: REQUEST_EMAIL_FROM ?? SMTP_USER,
    to: REQUEST_EMAIL_TO,
    replyTo: request.email || undefined,
    subject: `New ${service.name} request from ${request.name}`,
    text,
  });
}
