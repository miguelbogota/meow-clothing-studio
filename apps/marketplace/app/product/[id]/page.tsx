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
import { Minus, Plus } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-3xl font-light text-gray-900 mb-6">
              Product Not Found
            </h1>
            <p className="text-xl text-gray-600 font-light mb-8">
              The product you're looking for doesn't exist.
            </p>
            <Link
              href="/"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full transition-all duration-300 font-light hover:shadow-md"
            >
              Back to Marketplace
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Breadcrumb */}
        <nav className="mb-12">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light"
          >
            ← Back to Marketplace
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = product.image;
                }}
              />
            </div>
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border border-gray-200 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Category and Brand */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full font-light border border-gray-100">
                {product.category}
              </span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600 ml-2 font-light">
                  (128)
                </span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-5xl font-light text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <div className="text-5xl font-light text-gray-900">
                ${product.price}
              </div>
              <div className="text-xl text-gray-400 line-through font-light">
                ${(product.price * 1.3).toFixed(2)}
              </div>
              <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-light">
                30% OFF
              </span>
            </div>

            {/* Stock Status and Shipping */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                {product.stock > 0 ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-light">
                      In Stock ({product.stock} available)
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-light">
                      Out of Stock
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-light">
                  Free shipping on orders over $50
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-light text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div>
              <h3 className="text-lg font-light text-gray-900 mb-4">
                Select Size
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    className="py-3 px-4 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 font-light"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Options */}
            <div>
              <h3 className="text-lg font-light text-gray-900 mb-4">Color</h3>
              <div className="flex space-x-3">
                {[
                  'bg-black',
                  'bg-gray-300',
                  'bg-blue-600',
                  'bg-red-600',
                  'bg-green-600',
                ].map((color, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 ${color} rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform duration-300`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-light text-gray-900">
                  Quantity:
                </span>
                {cartQuantity > 0 ? (
                  <QuantitySelector
                    quantity={cartQuantity}
                    maxQuantity={product.stock}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    size="lg"
                  />
                ) : (
                  <div className="flex items-center space-x-3">
                    <button
                      className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-all duration-300"
                      onClick={handleDecrease}
                      disabled
                    >
                      <Minus size={20} />
                    </button>
                    <span className="w-12 text-center text-lg font-light text-gray-900">
                      1
                    </span>
                    <button
                      className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-all duration-300"
                      onClick={handleIncrease}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                )}
              </div>

              <button
                className="w-full bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-light hover:shadow-xl transition-all duration-300 text-lg disabled:bg-gray-400"
                onClick={handleIncrease}
                disabled={product.stock === 0}
              >
                {product.stock === 0
                  ? 'Out of Stock'
                  : cartQuantity > 0
                    ? 'Update Cart'
                    : 'Add to Cart'}
              </button>

              <button className="w-full border border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-light hover:bg-gray-50 transition-all duration-300 text-lg">
                ♡ Add to Wishlist
              </button>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-100 pt-8">
              <h3 className="text-xl font-light text-gray-900 mb-6">
                Why You'll Love It
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-green-600 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 font-light">
                    Premium quality fabric
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-green-600 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 font-light">
                    Ethically sourced
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-green-600 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 font-light">
                    Machine washable
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-green-600 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 font-light">
                    30-day return policy
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-100 pt-8">
              <h3 className="text-xl font-light text-gray-900 mb-6">
                Product Details
              </h3>
              <dl className="grid grid-cols-1 gap-4">
                <div className="flex justify-between py-3 border-b border-gray-50">
                  <dt className="text-gray-600 font-light">Product ID:</dt>
                  <dd className="text-gray-900 font-light">{product.id}</dd>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-50">
                  <dt className="text-gray-600 font-light">Category:</dt>
                  <dd className="text-gray-900 font-light">
                    {product.category}
                  </dd>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-50">
                  <dt className="text-gray-600 font-light">Material:</dt>
                  <dd className="text-gray-900 font-light">
                    100% Premium Cotton
                  </dd>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-50">
                  <dt className="text-gray-600 font-light">Care:</dt>
                  <dd className="text-gray-900 font-light">
                    Machine wash cold
                  </dd>
                </div>
                <div className="flex justify-between py-3">
                  <dt className="text-gray-600 font-light">Stock:</dt>
                  <dd className="text-gray-900 font-light">
                    {product.stock} units
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
