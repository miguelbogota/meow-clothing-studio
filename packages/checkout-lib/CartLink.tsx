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
      className="relative p-3 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:shadow-sm group"
    >
      <ShoppingCart
        size={20}
        className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300"
      />
      {itemCount > 0 && (
        <span className="absolute flex items-center justify-center size-5 text-xs font-light text-white bg-gray-900 rounded-full top-1 -right-1 shadow-sm">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}
