/**
 * Zod validation schemas for forms
 */
import { z } from 'zod';

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be less than 100 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .trim()
        .toLowerCase()
        .email("Invalid email address")
        .max(255, "Email must be less than 255 characters"),
    phone: z
        .string()
        .optional()
        .refine(
            (val) => !val || val === "" || /^\+?[\d\s\-()]+$/.test(val),
            { message: "Invalid phone number format" }
        )
        .transform((val) => val || ""),
    company: z
        .string()
        .max(200, "Company name must be less than 200 characters")
        .optional()
        .transform((val) => val || ""),
    message: z
        .string()
        .min(1, "Message is required")
        .trim()
        .min(10, "Message must be at least 10 characters")
        .max(2000, "Message must be less than 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Quote form validation schema
 */
export const quoteFormSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be less than 100 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .trim()
        .toLowerCase()
        .email("Invalid email address")
        .max(255, "Email must be less than 255 characters"),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .refine(
            (val) => {
                const digitsOnly = val.replace(/\D/g, '');
                return digitsOnly.length >= 10;
            },
            { message: "Phone number must contain at least 10 digits" }
        )
        .refine(
            (val) => /^\+?[\d\s\-()]+$/.test(val),
            { message: "Invalid phone number format" }
        ),
    company: z
        .string()
        .max(200, "Company name must be less than 200 characters")
        .optional()
        .transform((val) => val || ""),
    productType: z
        .string()
        .min(1, "Please select a product type")
        .refine(
            (val) => val.trim().length > 0,
            { message: "Please select a product type" }
        ),
    quantity: z
        .string()
        .min(1, "Please select a quantity range")
        .refine(
            (val) => val.trim().length > 0,
            { message: "Please select a quantity range" }
        ),
    material: z
        .string()
        .optional()
        .transform((val) => val || ""),
    customRequirements: z
        .string()
        .max(2000, "Custom requirements must be less than 2000 characters")
        .optional()
        .transform((val) => val || ""),
    message: z
        .string()
        .max(2000, "Message must be less than 2000 characters")
        .optional()
        .transform((val) => val || ""),
    urgent: z
        .boolean()
        .default(false),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

