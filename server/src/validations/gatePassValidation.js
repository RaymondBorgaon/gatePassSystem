import { z } from "zod";

/* =========================================
   CREATE GATE PASS VALIDATION
========================================= */

export const createGatePassSchema = z.object({
  body: z.object({

    visitorName: z
      .string({
        required_error: "Visitor name is required.",
      })
      .trim()
      .min(2, "Visitor name must be at least 2 characters."),

    visitorPhone: z
      .string({
        required_error: "Visitor phone is required.",
      })
      .trim()
      .min(10, "Please enter a valid phone number.")
      .max(15, "Phone number is too long."),

    visitorCompany: z
      .string()
      .trim()
      .optional()
      .nullable(),

    purpose: z
      .string({
        required_error: "Purpose of visit is required.",
      })
      .trim()
      .min(2, "Purpose is required."),

    personToMeet: z
      .string()
      .trim()
      .optional()
      .nullable(),

    department: z
      .string()
      .trim()
      .optional()
      .nullable(),

    validFrom: z
      .string({
        required_error: "Valid from date is required.",
      })
      .trim()
      .min(1, "Valid from date is required."),

    validUntil: z
      .string()
      .trim()
      .optional()
      .nullable(),

    remarks: z
      .string()
      .trim()
      .optional()
      .nullable(),

  }),
});


/* =========================================
   UPDATE GATE PASS VALIDATION
========================================= */

export const updateGatePassSchema = z.object({
  body: z.object({
    visitorName: z
      .string()
      .trim()
      .min(2)
      .optional(),

    visitorPhone: z
      .string()
      .trim()
      .min(10)
      .max(15)
      .optional(),

    visitorCompany: z
      .string()
      .trim()
      .optional()
      .nullable(),

    purpose: z
      .string()
      .trim()
      .min(2)
      .optional(),

    personToMeet: z
      .string()
      .trim()
      .optional()
      .nullable(),

    department: z
      .string()
      .trim()
      .optional()
      .nullable(),

    validFrom: z
      .string()
      .trim()
      .min(1)
      .optional(),

    validUntil: z
      .string()
      .trim()
      .optional()
      .nullable(),

    remarks: z
      .string()
      .trim()
      .optional()
      .nullable(),
  }).partial(),

  params: z.object({
    id: z.string().uuid().optional(),
  }).optional(),

  query: z.object({}).optional(),
});


/* =========================================
   UPDATE STATUS VALIDATION
========================================= */

export const updateGatePassStatusSchema = z.object({
  body: z.object({
    status: z.enum([
      "ACTIVE",
      "EXPIRED",
      "COMPLETED",
      "CANCELLED",
    ]),
  }),

  params: z.object({
    id: z.string().uuid().optional(),
  }).optional(),

  query: z.object({}).optional(),
});