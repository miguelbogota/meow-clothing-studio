import { describe, it, expect } from 'vitest';
import { Header } from '../index';

describe('components index exports', () => {
  describe('component exports', () => {
    it('should export Header component', () => {
      expect(Header).toBeDefined();
      expect(typeof Header).toBe('function');
    });

    it('should have correct component name', () => {
      expect(Header.name).toBe('Header');
    });
  });

  describe('module structure', () => {
    it('should have default export for Header', () => {
      expect(Header).toBeDefined();
    });

    it('should be a React component function', () => {
      expect(typeof Header).toBe('function');
      expect(Header.length).toBe(0); // No required props
    });
  });
});
