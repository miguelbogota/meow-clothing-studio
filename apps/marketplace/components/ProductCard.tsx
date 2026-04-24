'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/data';
import Link from 'next/link';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from '@meow-clothing-studio/checkout-lib';
import { getProductQuantity } from '@/lib/cart-utils';
import QuantitySelector from './QuantitySelector';

/** Interface for ProductCard component props */
interface ProductCardProps {
  /** Product data to display */
  product: Product;
}

/**
 * ProductCard component that displays product information with quantity selector
 * Shows product image, name, description, price, and stock status
 */
export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(getProductQuantity(product.id));

    // Listen for cart updates
    const handleCartUpdate = () => {
      setQuantity(getProductQuantity(product.id));
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, [product.id]);

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (quantity === 0) {
      // Add to cart
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    } else {
      // Update quantity
      updateQuantity(product.id, quantity + 1);
    }

    // Trigger cart update event
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (quantity > 1) {
      // Update quantity
      updateQuantity(product.id, quantity - 1);
    } else if (quantity === 1) {
      // Remove from cart
      removeFromCart(product.id);
    }

    // Trigger cart update event
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-square bg-gray-200 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = product.image;
            }}
          />
          {product.stock < 10 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
              Only {product.stock} left
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-800 mb-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <div className="flex items-center space-x-2">
              {quantity > 0 ? (
                <QuantitySelector
                  quantity={quantity}
                  maxQuantity={product.stock}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  size="sm"
                  showQuantity={quantity > 0}
                />
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleIncrease(e);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors duration-200 text-sm font-medium"
                  disabled={product.stock === 0}
                >
                  Add
                </button>
              )}
            </div>
          </div>

          <div className="mt-2">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
