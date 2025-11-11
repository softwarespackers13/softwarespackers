/**
 * Input sanitization utilities
 * Simplified version - only what's actually needed for the current project
 */

/**
 * Sanitizes user input by removing potentially dangerous content
 * Used for search inputs and any user-provided text
 * @param input - The string to sanitize
 * @returns Sanitized string safe for display
 */
export function sanitizeInput(input: string | null | undefined): string {
    if (!input) return '';

    let sanitized = String(input);

    // Remove script tags and their content
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Remove event handlers (onclick, onerror, etc.)
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'].*?["']/gi, '');
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');

    // Remove other potentially dangerous tags
    sanitized = sanitized.replace(/<iframe[^>]*>.*?<\/iframe>/gi, '');
    sanitized = sanitized.replace(/<object[^>]*>.*?<\/object>/gi, '');
    sanitized = sanitized.replace(/<embed[^>]*>/gi, '');

    // Remove all remaining HTML tags
    sanitized = sanitized.replace(/<[^>]*>/g, '');

    // Trim whitespace
    return sanitized.trim();
}

/**
 * Strips all HTML tags from a string
 * @param input - The string to strip HTML from
 * @returns String without HTML tags
 */
export function stripHtml(input: string): string {
    if (!input) return '';
    return input.replace(/<[^>]*>/g, '').trim();
}

// Note: Email, phone, and URL validators removed as they're not currently used.
// Add them back when you implement contact forms or user input features.
// See git history or IMPROVEMENTS.md for the full implementation.
