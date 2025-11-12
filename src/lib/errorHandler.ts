/**
 * Error severity levels
 */
export enum ErrorSeverity {
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
    CRITICAL = 'critical',
}

/**
 * Error context interface
 */
export interface ErrorContext {
    component?: string;
    action?: string;
    userId?: string;
    [key: string]: string | number | boolean | undefined;
}

/**
 * Error log entry interface
 */
export interface ErrorLogEntry {
    timestamp: Date;
    severity: ErrorSeverity;
    message: string;
    stack?: string;
    context: ErrorContext;
}

/**
 * Central error logger
 */
export class ErrorLogger {
    private static logs: ErrorLogEntry[] = [];
    private static maxLogs = 100;

    /**
     * Log an error with context
     */
    static log(
        error: Error | string,
        context: ErrorContext = {},
        severity: ErrorSeverity = ErrorSeverity.ERROR
    ): void {
        const errorMessage = error instanceof Error ? error.message : error;
        const errorStack = error instanceof Error ? error.stack : undefined;

        const logEntry: ErrorLogEntry = {
            timestamp: new Date(),
            severity,
            message: errorMessage,
            stack: errorStack,
            context,
        };

        // Add to in-memory logs
        this.logs.push(logEntry);

        // Keep only last maxLogs entries
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // Log to console based on severity
        const consoleMethod = this.getConsoleMethod(severity);
        consoleMethod(`[${severity.toUpperCase()}] ${errorMessage}`, {
            ...context,
            stack: errorStack,
        });

        // In production, you could send to a logging service here
        // Example: sendToLogService(logEntry);
    }

    /**
     * Get recent error logs
     */
    static getLogs(): ErrorLogEntry[] {
        return [...this.logs];
    }

    /**
     * Clear all logs
     */
    static clearLogs(): void {
        this.logs = [];
    }

    /**
     * Get appropriate console method for severity
     */
    private static getConsoleMethod(severity: ErrorSeverity): typeof console.log {
        switch (severity) {
            case ErrorSeverity.INFO:
                return console.info;
            case ErrorSeverity.WARNING:
                return console.warn;
            case ErrorSeverity.ERROR:
            case ErrorSeverity.CRITICAL:
                return console.error;
            default:
                return console.log;
        }
    }
}

/**
 * Convenience function to log errors
 */
export function logError(
    error: Error | string,
    context?: ErrorContext,
    severity?: ErrorSeverity
): void {
    ErrorLogger.log(error, context, severity);
}

/**
 * API Error interface
 */
interface ApiError {
    response?: {
        status?: number;
        data?: {
            message?: string;
        };
    };
    message?: string;
}

/**
 * Handle API errors and return user-friendly messages
 */
export function handleApiError(error: ApiError | Error | unknown): string {
    // Log the error
    logError(error as Error, { source: 'API' });

    // Type guard for API error
    const apiError = error as ApiError;

    // Network error
    if (!apiError.response) {
        return 'Network error. Please check your internet connection and try again.';
    }

    const status = apiError.response?.status;
    const customMessage = apiError.response?.data?.message;

    // Return custom message if available
    if (customMessage) {
        return customMessage;
    }

    // Handle common HTTP status codes
    switch (status) {
        case 400:
            return 'Invalid request. Please check your input and try again.';
        case 401:
            return 'Not authorized. Please log in and try again.';
        case 403:
            return 'Access forbidden. You don\'t have permission to perform this action.';
        case 404:
            return 'Resource not found. The requested item may have been removed.';
        case 429:
            return 'Too many requests. Please wait a moment and try again.';
        case 500:
            return 'Server error. Our team has been notified. Please try again later.';
        case 503:
            return 'Service temporarily unavailable. Please try again in a few moments.';
        default:
            return 'An unexpected error occurred. Please try again.';
    }
}

/**
 * Async error wrapper for handling promises
 */
export async function handleAsync<T>(
    promise: Promise<T>,
    context?: ErrorContext
): Promise<[Error | null, T | null]> {
    try {
        const data = await promise;
        return [null, data];
    } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        logError(err, context);
        return [err, null];
    }
}

