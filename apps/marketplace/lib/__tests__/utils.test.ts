import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('should handle conditional classes', () => {
    expect(cn('base-class', true && 'conditional-class', false && 'hidden-class')).toBe('base-class conditional-class');
  });

  it('should resolve Tailwind class conflicts', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
  });

  it('should handle empty inputs', () => {
    expect(cn()).toBe('');
  });

  it('should handle arrays and objects', () => {
    expect(cn(['class1', 'class2'], { class3: true, class4: false })).toBe('class1 class2 class3');
  });

  it('should handle mixed input types', () => {
    expect(cn('base', ['flex', 'items-center'], { 'bg-blue-500': true, 'bg-red-500': false })).toBe('base flex items-center bg-blue-500');
  });
});
