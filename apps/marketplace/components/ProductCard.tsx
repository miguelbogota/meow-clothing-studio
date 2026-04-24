'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/data';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
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
    <div className="transition-all duration-300 overflow-hidden group">
      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-square bg-gray-50 relative overflow-hidden rounded-2xl">
          <div className="w-full h-full overflow-hidden rounded-2xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = product.image;
              }}
            />
          </div>

          {/* Add to Cart Button / Quantity Selector - Positioned inside image */}
          <div className="absolute bottom-3 right-3">
            {quantity > 0 ? (
              <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg p-1 flex items-center space-x-1">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDecrease(e);
                  }}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center text-sm font-medium text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleIncrease(e);
                  }}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                  disabled={quantity >= product.stock}
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleIncrease(e);
                }}
                className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 group"
                disabled={product.stock === 0}
              >
                <Plus
                  size={20}
                  className="text-gray-900 group-hover:scale-110 transition-transform duration-200"
                />
              </button>
            )}
          </div>

          {product.stock < 10 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
              Only {product.stock} left
            </div>
          )}
        </div>

        <div className="px-2 py-3">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-md font-medium text-gray-900 hover:text-gray-700 transition-colors duration-300 flex-1">
              {product.name}
            </h3>
            <span className="text-md font-semibold text-orange-600 ml-3">
              ${product.price}
            </span>
          </div>

          <div className="mb-2">
            <span className="text-sm text-gray-500">{product.category}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
