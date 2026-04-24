import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

// Mocks link to avoid issues with microfrontends
vi.mock('@vercel/microfrontends/next/client', () => ({
  Link: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

// Mock CartLink component
vi.mock('@meow-clothing-studio/checkout-lib', () => ({
  CartLink: () => <div data-testid="cart-link">Cart Link</div>,
}));

// Import testing utilities
import '@testing-library/jest-dom';

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

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('renders the store name', () => {
    render(<Header />);

    expect(screen.getByText('🐱')).toBeInTheDocument();
    expect(screen.getByText('Meow Clothing Studio')).toBeInTheDocument();
  });

  it('renders the header with correct semantic element', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe('HEADER');
  });

  it('renders the store name as a link', () => {
    render(<Header />);

    const storeLink = screen.getByRole('link', {
      name: '🐱Meow Clothing Studio',
    });
    expect(storeLink).toBeInTheDocument();
    expect(storeLink).toHaveAttribute('href', '/');
  });

  it('renders the cart link component', () => {
    render(<Header />);

    const cartLink = screen.getByTestId('cart-link');
    expect(cartLink).toBeInTheDocument();
  });

  it('has correct container styling', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    const container = header.querySelector('.max-w-7xl');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(
      'max-w-7xl',
      'mx-auto',
      'px-4',
      'sm:px-6',
      'lg:px-8',
    );
  });

  it('has correct flex layout styling', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    const flexContainer = header.querySelector('.flex');
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveClass(
      'flex',
      'justify-between',
      'items-center',
      'h-16',
    );
  });

  it('has correct styling for cart container', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    const flexContainer = header.querySelector('.flex');
    const cartContainer = flexContainer?.querySelector('.items-center');
    expect(cartContainer).toBeInTheDocument();
    expect(cartContainer).toHaveClass('flex', 'items-center');
  });
});
