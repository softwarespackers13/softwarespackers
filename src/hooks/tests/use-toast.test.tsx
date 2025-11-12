import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast, toast, reducer } from '../use-toast';

describe('useToast hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('initializes with empty toasts array', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toEqual([]);
  });

  it('adds a toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'Test description',
      });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Test Toast');
    expect(result.current.toasts[0].description).toBe('Test description');
  });

  it('limits toasts to TOAST_LIMIT', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Toast 1' });
      result.current.toast({ title: 'Toast 2' });
    });

    // TOAST_LIMIT is 1 in the source
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Toast 2');
  });

  it('dismisses a specific toast', () => {
    const { result } = renderHook(() => useToast());

    let toastId: string;
    act(() => {
      const toastResult = result.current.toast({ title: 'Test Toast' });
      toastId = toastResult.id;
    });

    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it('returns toast with id, dismiss, and update functions', () => {
    const { result } = renderHook(() => useToast());

    let toastResult: ReturnType<typeof result.current.toast>;
    act(() => {
      toastResult = result.current.toast({ title: 'Test Toast' });
    });

    expect(toastResult).toHaveProperty('id');
    expect(toastResult).toHaveProperty('dismiss');
    expect(toastResult).toHaveProperty('update');
    expect(typeof toastResult.dismiss).toBe('function');
    expect(typeof toastResult.update).toBe('function');
  });

  it('updates toast via returned update function', () => {
    const { result } = renderHook(() => useToast());

    let toastResult: ReturnType<typeof result.current.toast>;
    act(() => {
      toastResult = result.current.toast({ title: 'Original Title' });
    });

    act(() => {
      toastResult.update({ title: 'Updated Title' });
    });

    expect(result.current.toasts[0].title).toBe('Updated Title');
  });

  it('dismisses toast via returned dismiss function', () => {
    const { result } = renderHook(() => useToast());

    let toastResult: ReturnType<typeof result.current.toast>;
    act(() => {
      toastResult = result.current.toast({ title: 'Test Toast' });
    });

    act(() => {
      toastResult.dismiss();
    });

    expect(result.current.toasts[0].open).toBe(false);
  });
});

describe('toast reducer', () => {
  it('handles ADD_TOAST action', () => {
    const initialState = { toasts: [] };
    const toast = {
      id: '1',
      title: 'Test',
      open: true,
    };

    const newState = reducer(initialState, {
      type: 'ADD_TOAST',
      toast,
    });

    expect(newState.toasts).toHaveLength(1);
    expect(newState.toasts[0]).toEqual(toast);
  });

  it('handles UPDATE_TOAST action', () => {
    const initialState = {
      toasts: [
        { id: '1', title: 'Original', open: true },
      ],
    };

    const newState = reducer(initialState, {
      type: 'UPDATE_TOAST',
      toast: { id: '1', title: 'Updated' },
    });

    expect(newState.toasts[0].title).toBe('Updated');
    expect(newState.toasts[0].id).toBe('1');
  });

  it('handles DISMISS_TOAST action for specific toast', () => {
    const initialState = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true },
      ],
    };

    const newState = reducer(initialState, {
      type: 'DISMISS_TOAST',
      toastId: '1',
    });

    expect(newState.toasts[0].open).toBe(false);
    expect(newState.toasts[1].open).toBe(true);
  });

  it('handles DISMISS_TOAST action for all toasts', () => {
    const initialState = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true },
      ],
    };

    const newState = reducer(initialState, {
      type: 'DISMISS_TOAST',
    });

    expect(newState.toasts[0].open).toBe(false);
    expect(newState.toasts[1].open).toBe(false);
  });

  it('handles REMOVE_TOAST action for specific toast', () => {
    const initialState = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true },
      ],
    };

    const newState = reducer(initialState, {
      type: 'REMOVE_TOAST',
      toastId: '1',
    });

    expect(newState.toasts).toHaveLength(1);
    expect(newState.toasts[0].id).toBe('2');
  });

  it('handles REMOVE_TOAST action for all toasts', () => {
    const initialState = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true },
      ],
    };

    const newState = reducer(initialState, {
      type: 'REMOVE_TOAST',
    });

    expect(newState.toasts).toHaveLength(0);
  });
});

describe('toast function', () => {
  it('can be called directly without hook', () => {
    const result = toast({ title: 'Direct Toast' });
    
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('dismiss');
    expect(result).toHaveProperty('update');
  });

  it('sets open to true by default', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Test' });
    });

    expect(result.current.toasts[0].open).toBe(true);
  });
});

