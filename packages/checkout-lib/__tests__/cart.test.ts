import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartItemCount,
} from '../cart';

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

describe('Cart functionality', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should return empty cart when localStorage is empty', () => {
    const cart = getCart();
    expect(cart.items).toEqual([]);
    expect(cart.total).toBe(0);
  });

  it('should add item to cart', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
      image: '/test.jpg',
    };

    const cart = addToCart(product);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0]).toEqual({
      id: '1',
      name: 'Test Product',
      price: 29.99,
      quantity: 1,
      image: '/test.jpg',
    });
    expect(cart.total).toBe(29.99);
  });

  it('should increase quantity when adding same item twice', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
      image: '/test.jpg',
    };

    addToCart(product);
    const cart = addToCart(product);

    expect(cart.items).toHaveLength(1);
    expect(cart.items[0]!.quantity).toBe(2);
    expect(cart.total).toBe(59.98);
  });

  it('should remove item from cart', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
      image: '/test.jpg',
    };

    addToCart(product);
    const cart = removeFromCart('1');

    expect(cart.items).toHaveLength(0);
    expect(cart.total).toBe(0);
  });

  it('should update item quantity', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
      image: '/test.jpg',
    };

    addToCart(product);
    const cart = updateQuantity('1', 3);

    expect(cart.items[0]!.quantity).toBe(3);
    expect(cart.total).toBe(89.97);
  });

  it('should remove item when quantity is set to 0', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
      image: '/test.jpg',
    };

    addToCart(product);
    const cart = updateQuantity('1', 0);

    expect(cart.items).toHaveLength(0);
    expect(cart.total).toBe(0);
  });

  it('should clear cart', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
      image: '/test.jpg',
    };

    addToCart(product);
    const cart = clearCart();

    expect(cart.items).toHaveLength(0);
    expect(cart.total).toBe(0);
  });

  it('should get correct cart item count', () => {
    const product1 = {
      id: '1',
      name: 'Product 1',
      price: 29.99,
      image: '/test1.jpg',
    };

    const product2 = {
      id: '2',
      name: 'Product 2',
      price: 19.99,
      image: '/test2.jpg',
    };

    addToCart(product1);
    addToCart(product2);
    addToCart(product1); // Add first product again

    const count = getCartItemCount();
    expect(count).toBe(2); // Now counts unique items, not total quantity
  });
});
