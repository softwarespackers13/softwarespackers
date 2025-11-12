import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('utils - cn function', () => {
  it('merges class names correctly', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    const isTrue = true;
    const isFalse = false;
    const result = cn('base', isTrue && 'conditional', isFalse && 'excluded');
    expect(result).toBe('base conditional');
  });

  it('handles undefined and null values', () => {
    const result = cn('class1', undefined, null, 'class2');
    expect(result).toBe('class1 class2');
  });

  it('merges Tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toBe('py-1 px-4');
  });

  it('handles array of class names', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('handles object with boolean values', () => {
    const result = cn({
      base: true,
      active: true,
      inactive: false,
    });
    expect(result).toContain('base');
    expect(result).toContain('active');
    expect(result).not.toContain('inactive');
  });

  it('returns empty string for no arguments', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles complex Tailwind utility conflicts', () => {
    const result = cn('text-red-500', 'text-blue-500');
    expect(result).toBe('text-blue-500');
  });

  it('preserves non-conflicting Tailwind classes', () => {
    const result = cn('text-red-500 p-4', 'bg-blue-500');
    expect(result).toContain('text-red-500');
    expect(result).toContain('p-4');
    expect(result).toContain('bg-blue-500');
  });

  it('handles empty strings', () => {
    const result = cn('class1', '', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('handles nested arrays', () => {
    const result = cn(['class1', ['class2', 'class3']], 'class4');
    expect(result).toBe('class1 class2 class3 class4');
  });

  it('handles mixed types of inputs', () => {
    const result = cn(
      'base',
      { active: true, disabled: false },
      ['extra1', 'extra2'],
      undefined,
      'final'
    );
    expect(result).toContain('base');
    expect(result).toContain('active');
    expect(result).not.toContain('disabled');
    expect(result).toContain('extra1');
    expect(result).toContain('extra2');
    expect(result).toContain('final');
  });
});

