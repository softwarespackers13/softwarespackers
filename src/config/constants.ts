/**
 * Application constants and configuration
 * Values can be overridden via environment variables
 */

export const COMPANY_PHONE = import.meta.env.VITE_COMPANY_PHONE || "919814082012";
export const COMPANY_PHONE_SECONDARY = import.meta.env.VITE_COMPANY_PHONE_SECONDARY || "918872832012";
export const COMPANY_WHATSAPP = import.meta.env.VITE_COMPANY_WHATSAPP || "918872832012";
export const COMPANY_EMAIL = import.meta.env.VITE_COMPANY_EMAIL || "Softwarespackers12@gmail.com";
export const COMPANY_ADDRESS = import.meta.env.VITE_COMPANY_ADDRESS || "PLOT NO.7A, Lane no 1, Kadian road, Ludhiana (Punjab)";
export const COMPANY_WEBSITE = import.meta.env.VITE_COMPANY_WEBSITE || "www.softwarespackers.com";

/**
 * EmailJS Configuration for contact form
 * Get these values from https://www.emailjs.com/
 * 1. Create an account at emailjs.com
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create an email template
 * 4. Get your Public Key from Account > API Keys
 */
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
export const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

/**
 * Check if we're in development mode
 */
export const IS_DEV = import.meta.env.DEV;

/**
 * Check if we're in production mode
 */
export const IS_PROD = import.meta.env.PROD;

