/**
 * Application constants and configuration
 * Values can be overridden via environment variables
 */

export const COMPANY_PHONE = import.meta.env.VITE_COMPANY_PHONE || "918872832012";
export const COMPANY_WHATSAPP = import.meta.env.VITE_COMPANY_WHATSAPP || "918872832012";
export const COMPANY_EMAIL = import.meta.env.VITE_COMPANY_EMAIL || "softwarespackers@gmail.com";
export const COMPANY_ADDRESS = import.meta.env.VITE_COMPANY_ADDRESS || "Industrial Area, North India";

/**
 * Check if we're in development mode
 */
export const IS_DEV = import.meta.env.DEV;

/**
 * Check if we're in production mode
 */
export const IS_PROD = import.meta.env.PROD;

