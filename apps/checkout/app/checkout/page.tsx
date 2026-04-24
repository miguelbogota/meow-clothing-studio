'use client';

import { useState, useEffect } from 'react';
import { Header } from '@meow-clothing-studio/components';
import CartItem from '@/components/CartItem';
import CheckoutForm from '@/components/CheckoutForm';
import { getCart, Cart } from '@meow-clothing-studio/checkout-lib';

export default function CheckoutPage() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [orderComplete, setOrderComplete] = useState(false);

  const updateCart = () => {
    setCart(getCart());
  };

  useEffect(() => {
    updateCart();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      updateCart();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cart-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cart-updated', handleStorageChange);
    };
  }, []);

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Order Complete!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for your purchase. Your order has been successfully
                processed.
              </p>
              <p className="text-gray-600 mb-8">
                You will receive a confirmation email shortly with your order
                details.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <a
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            Review your items and complete your purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} onUpdate={updateCart} />
              ))}
            </div>

            {cart.items.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-6">
                  Add some items to your cart to checkout
                </p>
                <a
                  href="/"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue Shopping
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <CheckoutForm
              cart={cart}
              onOrderComplete={() => setOrderComplete(true)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
