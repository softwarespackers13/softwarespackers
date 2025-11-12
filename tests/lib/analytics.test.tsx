import { describe, it, expect, beforeEach } from 'vitest';
import { analytics } from '@/lib/analytics';

describe('Analytics Service', () => {
  beforeEach(() => {
    // Reset analytics state before each test
    analytics.disable();
  });

  it('should initialize analytics', () => {
    analytics.init('test', { testConfig: true });
    expect(analytics.isEnabled()).toBe(true);
  });

  it('should track events', () => {
    analytics.init('test');
    
    // Should not throw
    expect(() => {
      analytics.track({
        name: 'test_event',
        properties: { test: 'value' }
      });
    }).not.toThrow();
  });

  it('should track page views', () => {
    analytics.init('test');
    
    expect(() => {
      analytics.pageView({ path: '/test', title: 'Test Page' });
    }).not.toThrow();
  });

  it('should disable analytics', () => {
    analytics.init('test');
    analytics.disable();
    
    expect(analytics.isEnabled()).toBe(false);
  });
});

