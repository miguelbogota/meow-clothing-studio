'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@meow-clothing-studio/components';
import { getProductById, type Product } from '@/lib/data';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from '@meow-clothing-studio/checkout-lib';
import { getProductQuantity } from '@/lib/cart-utils';
import QuantitySelector from '@/components/QuantitySelector';
import Link from 'next/link';

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const foundProduct = getProductById(productId);
    setProduct(foundProduct || null);
    setCartQuantity(getProductQuantity(productId));
    setLoading(false);
  }, [productId]);

  useEffect(() => {
    // Listen for cart updates
    const handleCartUpdate = () => {
      setCartQuantity(getProductQuantity(productId));
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, [productId]);

  const handleIncrease = () => {
    if (cartQuantity === 0) {
      // Add to cart
      addToCart({
        id: product!.id,
        name: product!.name,
        price: product!.price,
        image: product!.image,
      });
    } else {
      // Update quantity
      updateQuantity(product!.id, cartQuantity + 1);
    }

    // Trigger cart update event
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleDecrease = () => {
    if (cartQuantity > 1) {
      // Update quantity
      updateQuantity(product!.id, cartQuantity - 1);
    } else if (cartQuantity === 1) {
      // Remove from cart
      removeFromCart(product!.id);
    }

    // Trigger cart update event
    window.dispatchEvent(new Event('cart-updated'));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-12 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The product you're looking for doesn't exist.
            </p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Back to Marketplace
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            ← Back to Marketplace
          </Link>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = product.image;
              }}
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900">
              ${product.price}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.stock > 0 ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">
                    In Stock ({product.stock} available)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div>
                {cartQuantity > 0 ? (
                  <QuantitySelector
                    quantity={cartQuantity}
                    maxQuantity={product.stock}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    size="lg"
                  />
                ) : (
                  <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full"
                    onClick={handleIncrease}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            )}

            {/* Cart Status */}
            <div className="space-y-3">
              {product.stock < 10 && product.stock > 0 && (
                <p className="text-sm text-orange-600 text-center">
                  Only {product.stock} left in stock!
                </p>
              )}
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Product Details
              </h3>
              <dl className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Product ID:</dt>
                  <dd className="text-gray-900">{product.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Category:</dt>
                  <dd className="text-gray-900">{product.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Stock:</dt>
                  <dd className="text-gray-900">{product.stock} units</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
