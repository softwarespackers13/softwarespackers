/**
 * Analytics and monitoring utilities
 * 
 * This module provides a simple abstraction for analytics tracking.
 * It's designed to work with multiple analytics providers like Google Analytics, Plausible, etc.
 */

export interface AnalyticsEvent {
    name: string;
    properties?: Record<string, any>;
}

export interface PageViewData {
    path: string;
    title?: string;
    referrer?: string;
}

/**
 * Analytics manager class
 */
class Analytics {
    private enabled: boolean = false;
    private provider: string = 'none';

    /**
     * Initialize analytics
     * @param provider - Analytics provider name (e.g., 'google', 'plausible', 'mixpanel')
     * @param config - Provider-specific configuration
     */
    init(provider: string, config?: Record<string, any>): void {
        this.provider = provider;
        this.enabled = true;

        // Initialize provider-specific code here
        if (provider === 'google' && config?.measurementId) {
            this.initGoogleAnalytics(config.measurementId);
        } else if (provider === 'plausible' && config?.domain) {
            this.initPlausible(config.domain);
        }

        console.log(`Analytics initialized with ${provider}`);
    }

    /**
     * Initialize Google Analytics
     */
    private initGoogleAnalytics(measurementId: string): void {
        // Load GA4 script
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        script.async = true;
        document.head.appendChild(script);

        // Initialize gtag
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]) {
            (window as any).dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', measurementId);
    }

    /**
     * Initialize Plausible Analytics
     */
    private initPlausible(domain: string): void {
        const script = document.createElement('script');
        script.defer = true;
        script.setAttribute('data-domain', domain);
        script.src = 'https://plausible.io/js/script.js';
        document.head.appendChild(script);
    }

    /**
     * Track a page view
     * @param data - Page view data
     */
    pageView(data: PageViewData): void {
        if (!this.enabled) return;

        // Implementation varies by provider
        if (this.provider === 'google' && (window as any).gtag) {
            (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
                page_path: data.path,
                page_title: data.title,
            });
        } else if (this.provider === 'plausible' && (window as any).plausible) {
            (window as any).plausible('pageview');
        }

        console.log('Page view tracked:', data.path);
    }

    /**
     * Track a custom event
     * @param event - Event data
     */
    track(event: AnalyticsEvent): void {
        if (!this.enabled) return;

        if (this.provider === 'google' && (window as any).gtag) {
            (window as any).gtag('event', event.name, event.properties);
        } else if (this.provider === 'plausible' && (window as any).plausible) {
            (window as any).plausible(event.name, { props: event.properties });
        }

        console.log('Event tracked:', event.name, event.properties);
    }

    /**
     * Track an error
     * @param error - Error object or message
     * @param context - Additional context
     */
    trackError(error: Error | string, context?: Record<string, any>): void {
        const errorMessage = error instanceof Error ? error.message : error;
        const errorStack = error instanceof Error ? error.stack : undefined;

        this.track({
            name: 'error',
            properties: {
                message: errorMessage,
                stack: errorStack,
                ...context,
            },
        });
    }

    /**
     * Track user interactions
     * @param action - Action type (e.g., 'click', 'submit', 'download')
     * @param label - Action label
     * @param value - Optional numeric value
     */
    trackInteraction(action: string, label: string, value?: number): void {
        this.track({
            name: 'interaction',
            properties: {
                action,
                label,
                value,
            },
        });
    }

    /**
     * Disable analytics
     */
    disable(): void {
        this.enabled = false;
        console.log('Analytics disabled');
    }

    /**
     * Check if analytics is enabled
     */
    isEnabled(): boolean {
        return this.enabled;
    }
}

// Export singleton instance
export const analytics = new Analytics();

/**
 * React hook for tracking page views
 * Usage: usePageTracking() in your route component
 */
export function usePageTracking() {
    if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        const title = document.title;

        analytics.pageView({ path, title });
    }
}

/**
 * HOC to track page views automatically
 */
export function withPageTracking<P extends object>(
    Component: React.ComponentType<P>
): React.ComponentType<P> {
    return (props: P) => {
        usePageTracking();
        return <Component { ...props } />;
    };
}

// Example usage in your App.tsx or main.tsx:
// 
// Import and initialize:
// import { analytics } from './lib/analytics';
// 
// // For Google Analytics
// analytics.init('google', { measurementId: 'G-XXXXXXXXXX' });
// 
// // For Plausible (privacy-friendly alternative)
// analytics.init('plausible', { domain: 'yourdomain.com' });
// 
// Track events:
// analytics.track({ name: 'button_click', properties: { button_id: 'cta' } });
// analytics.trackInteraction('click', 'Add to Cart', product.id);

