import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ErrorLogger, logError, handleApiError, ErrorSeverity } from './errorHandler';

describe('ErrorLogger', () => {
    let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should log error with context', () => {
        const error = new Error('Test error');
        const context = { component: 'TestComponent' };

        ErrorLogger.log(error, context);

        expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should handle string errors', () => {
        ErrorLogger.log('String error', { source: 'test' });
        expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should include severity in log', () => {
        const error = new Error('Critical error');

        ErrorLogger.log(error, {}, ErrorSeverity.CRITICAL);

        expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should capture error stack trace', () => {
        const error = new Error('Error with stack');

        ErrorLogger.log(error);

        const calls = consoleErrorSpy.mock.calls[0];
        expect(calls[0]).toContain('Error with stack');
    });
});

describe('logError', () => {
    let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
    let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
        consoleWarnSpy.mockRestore();
    });

    it('should log error with default severity', () => {
        logError(new Error('Test'));
        expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should log error with custom severity', () => {
        logError(new Error('Warning'), {}, ErrorSeverity.WARNING);
        expect(consoleWarnSpy).toHaveBeenCalled();
    });
});

describe('handleApiError', () => {
    it('should return user-friendly message for network errors', () => {
        const error = new Error('Network request failed');
        const message = handleApiError(error);

        expect(message.toLowerCase()).toContain('network');
    });

    it('should return user-friendly message for 404 errors', () => {
        const error = { response: { status: 404 } };
        const message = handleApiError(error);

        expect(message.toLowerCase()).toContain('not found');
    });

    it('should return user-friendly message for 500 errors', () => {
        const error = { response: { status: 500 } };
        const message = handleApiError(error);

        expect(message.toLowerCase()).toContain('server');
    });

    it('should return user-friendly message for 401 errors', () => {
        const error = { response: { status: 401 } };
        const message = handleApiError(error);

        expect(message).toContain('authorized');
    });

    it('should return generic message for unknown errors', () => {
        const error = new Error('Unknown error');
        const message = handleApiError(error);

        expect(message).toBeTruthy();
        expect(typeof message).toBe('string');
    });

    it('should handle errors with custom messages', () => {
        const error = { response: { status: 400, data: { message: 'Custom error' } } };
        const message = handleApiError(error);

        expect(message).toContain('Custom error');
    });
});

