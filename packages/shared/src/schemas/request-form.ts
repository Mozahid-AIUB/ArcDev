import { z } from "zod";
import { SERVICE_SLUGS } from "../constants/services";

/** Bangladeshi mobile number, with or without the 88 / +88 prefix. */
export const BD_MOBILE = /^(?:\+?88)?01[3-9]\d{8}$/;

/**
 * A request sent from one of the six service pages.
 * The website validates with this before sending, and the API will validate
 * with the same schema, so both reject exactly the same input.
 */
export const requestFormSchema = z.object({
  service: z.enum(SERVICE_SLUGS),
  name: z.string().trim().min(2, "Enter your name").max(100, "Name is too long"),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s-]/g, ""))
    .pipe(z.string().regex(BD_MOBILE, "Enter a Bangladeshi mobile number, e.g. 01712345678")),
  email: z.union([z.literal(""), z.email("Enter a valid email address")]),
  message: z.string().trim().max(1000, "Keep the message under 1000 characters"),
  /** Answers to the service's own extra questions, keyed by field name. */
  details: z.record(z.string(), z.string().trim().max(200)),
});

export type RequestFormInput = z.input<typeof requestFormSchema>;
export type RequestForm = z.output<typeof requestFormSchema>;
