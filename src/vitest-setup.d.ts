/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    interface Assertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> { }
    /* eslint-enable @typescript-eslint/no-explicit-any */
}

