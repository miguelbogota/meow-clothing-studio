import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../CartItem';

// Mock shared package
vi.mock('@meow-clothing-studio/shared', () => ({
  updateQuantity: vi.fn(),
  removeFromCart: vi.fn(),
}));

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

describe('CartItem', () => {
  const mockItem = {
    id: '1',
    name: 'Test Product',
    price: 29.99,
    quantity: 2,
    image: '/test-image.jpg',
  };

  const mockOnUpdate = vi.fn();

  it('renders item information', () => {
    render(<CartItem item={mockItem} onUpdate={mockOnUpdate} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('$59.98')).toBeInTheDocument();
  });

  it('calls updateQuantity when plus button is clicked', () => {
    render(<CartItem item={mockItem} onUpdate={mockOnUpdate} />);

    const plusButtons = screen.getAllByRole('button');
    fireEvent.click(plusButtons[1]!); // Plus button is the second button

    expect(mockOnUpdate).toHaveBeenCalled();
  });
});
