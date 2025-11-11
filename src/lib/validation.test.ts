import { describe, it, expect } from 'vitest';
import { sanitizeInput, stripHtml } from './validation';

describe('sanitizeInput', () => {
    it('should remove dangerous script tags', () => {
        const input = 'Hello <script>alert("XSS")</script>World';
        expect(sanitizeInput(input)).toBe('Hello World');
    });

    it('should remove event handlers', () => {
        const input = '<div onclick="alert(\'XSS\')">Click me</div>';
        expect(sanitizeInput(input)).toBe('Click me');
    });

    it('should trim whitespace', () => {
        const input = '  Hello World  ';
        expect(sanitizeInput(input)).toBe('Hello World');
    });

    it('should handle empty strings', () => {
        expect(sanitizeInput('')).toBe('');
    });

    it('should handle null and undefined', () => {
        expect(sanitizeInput(null as any)).toBe('');
        expect(sanitizeInput(undefined as any)).toBe('');
    });

    it('should preserve normal text', () => {
        const input = 'This is normal text with 123 numbers!';
        expect(sanitizeInput(input)).toBe('This is normal text with 123 numbers!');
    });

    it('should remove multiple script tags', () => {
        const input = '<script>bad1</script>Good<script>bad2</script>';
        expect(sanitizeInput(input)).toBe('Good');
    });
});

describe('stripHtml', () => {
    it('should remove all HTML tags', () => {
        const input = '<div>Hello <strong>World</strong></div>';
        expect(stripHtml(input)).toBe('Hello World');
    });

    it('should handle self-closing tags', () => {
        const input = 'Hello<br/>World';
        expect(stripHtml(input)).toBe('HelloWorld');
    });

    it('should preserve text between tags', () => {
        const input = '<p>Paragraph 1</p><p>Paragraph 2</p>';
        expect(stripHtml(input)).toBe('Paragraph 1Paragraph 2');
    });
});

// Note: Email, phone, and URL validator tests removed.
// These validators were removed from validation.ts as they're not currently used.
// Add them back when you implement forms that need validation.

