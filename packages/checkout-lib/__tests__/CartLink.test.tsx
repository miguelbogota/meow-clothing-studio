import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CartLink } from '../CartLink';
import { getCartItemCount } from '../index';

// Mock the Link component to avoid microfrontend issues
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

// Mock the getCartItemCount function
vi.mock('../index', () => ({
  getCartItemCount: vi.fn(),
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

describe('CartLink', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('should render shopping cart icon', () => {
    vi.mocked(getCartItemCount).mockReturnValue(0);

    render(<CartLink />);

    const cartIcon = document.querySelector('svg');
    expect(cartIcon).toBeInTheDocument();
  });

  it('should display item count when cart has items', () => {
    vi.mocked(getCartItemCount).mockReturnValue(5);

    render(<CartLink />);

    const itemCount = screen.getByText('5');
    expect(itemCount).toBeInTheDocument();
    expect(itemCount).toHaveClass(
      'bg-red-500',
      'text-white',
      'text-xs',
      'rounded-full',
    );
  });

  it('should display 99+ when item count exceeds 99', () => {
    vi.mocked(getCartItemCount).mockReturnValue(150);

    render(<CartLink />);

    const itemCount = screen.getByText('99+');
    expect(itemCount).toBeInTheDocument();
  });

  it('should not display count when cart is empty', () => {
    vi.mocked(getCartItemCount).mockReturnValue(0);

    render(<CartLink />);

    expect(screen.queryByText('0')).not.toBeInTheDocument();
    expect(screen.queryByText('99+')).not.toBeInTheDocument();
  });

  it('should link to checkout page', () => {
    vi.mocked(getCartItemCount).mockReturnValue(0);

    render(<CartLink />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/checkout');
  });

  it('should listen for cart-updated events', () => {
    vi.mocked(getCartItemCount).mockReturnValue(0);

    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    render(<CartLink />);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'cart-updated',
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'storage',
      expect.any(Function),
    );

    addEventListenerSpy.mockRestore();
  });

  it('should clean up event listeners on unmount', () => {
    vi.mocked(getCartItemCount).mockReturnValue(0);

    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<CartLink />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'cart-updated',
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'storage',
      expect.any(Function),
    );

    removeEventListenerSpy.mockRestore();
  });
});
