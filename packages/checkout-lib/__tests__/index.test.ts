import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  saveCart,
  getCartItemCount,
  CartLink,
  type Cart,
  type CartItem,
} from '../index';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('checkout-lib index exports', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  describe('function exports', () => {
    it('should export all cart functions', () => {
      expect(typeof getCart).toBe('function');
      expect(typeof addToCart).toBe('function');
      expect(typeof removeFromCart).toBe('function');
      expect(typeof updateQuantity).toBe('function');
      expect(typeof clearCart).toBe('function');
      expect(typeof saveCart).toBe('function');
      expect(typeof getCartItemCount).toBe('function');
    });

    it('should export CartLink component', () => {
      expect(CartLink).toBeDefined();
      expect(typeof CartLink).toBe('function');
    });
  });

  describe('type exports', () => {
    it('should export Cart and CartItem types', () => {
      // Test that types are available by creating objects with them
      const cartItem: CartItem = {
        id: 'test',
        name: 'Test Product',
        price: 29.99,
        quantity: 1,
        image: '/test.jpg',
      };
      expect(cartItem).toBeDefined();

      const cart: Cart = {
        items: [cartItem],
        total: 29.99,
      };
      expect(cart).toBeDefined();
    });
  });

  describe('integration with cart functions', () => {
    it('should work with imported cart functions', () => {
      const product = {
        id: 'test-1',
        name: 'Test Product',
        price: 19.99,
        image: '/test.jpg',
      };

      const cart = addToCart(product);
      expect(cart.items).toHaveLength(1);
      expect(cart.total).toBe(19.99);

      const itemCount = getCartItemCount();
      expect(itemCount).toBe(1);

      const clearedCart = clearCart();
      expect(clearedCart.items).toHaveLength(0);
      expect(clearedCart.total).toBe(0);
    });
  });
});
