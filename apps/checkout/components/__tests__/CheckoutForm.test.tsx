import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CheckoutForm from '../CheckoutForm';

// Mock shared package
vi.mock('@meow-clothing-studio/shared', () => ({
  clearCart: vi.fn(),
}));

describe('CheckoutForm', () => {
  const mockCart = {
    items: [
      {
        id: '1',
        name: 'Test Product',
        price: 29.99,
        quantity: 2,
        image: '/test.jpg',
      }
    ],
    total: 59.98,
  };

  const mockOnOrderComplete = vi.fn();

  it('renders checkout form', () => {
    render(
      <CheckoutForm 
        cart={mockCart} 
        onOrderComplete={mockOnOrderComplete}
      />
    );
    
    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Total:')).toBeInTheDocument();
    expect(screen.getByText('$59.98')).toBeInTheDocument();
  });

  it('shows empty cart message when cart is empty', () => {
    render(
      <CheckoutForm 
        cart={{ items: [], total: 0 }} 
        onOrderComplete={mockOnOrderComplete}
      />
    );
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });
});
