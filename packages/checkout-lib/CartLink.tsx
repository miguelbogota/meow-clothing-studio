'use client';

import { useState, useEffect } from 'react';
import { Link } from '@vercel/microfrontends/next/client';
import { ShoppingCart } from 'lucide-react';
import { getCartItemCount } from './index';

/**
 * CartLink component that displays a shopping cart icon with item count badge
 * Links to the checkout page when clicked
 */
export function CartLink() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      setItemCount(getCartItemCount());
    };

    updateCartCount();

    window.addEventListener('cart-updated', updateCartCount);
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return (
    <Link
      href="/checkout"
      className="relative box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm p-3 focus:outline-none"
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute flex items-center justify-center size-5 text-xs font-bold text-white bg-red-500 rounded-full top-1 -right-2">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}
