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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
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
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                Order Complete!
              </h2>
              <p className="text-xl text-gray-600 font-light mb-6 leading-relaxed">
                Thank you for your purchase. Your order has been successfully
                processed.
              </p>
              <p className="text-gray-600 font-light leading-relaxed">
                You will receive a confirmation email shortly with your order
                details.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <a
                href="/"
                className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full transition-all duration-300 font-light hover:shadow-md"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Shopping Cart
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Review your items and complete your purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} onUpdate={updateCart} />
              ))}
            </div>

            {cart.items.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                <h2 className="text-3xl font-light text-gray-900 mb-6">
                  Your cart is empty
                </h2>
                <p className="text-xl text-gray-600 font-light mb-8">
                  Add some items to your cart to checkout
                </p>
                <a
                  href="/"
                  className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full transition-all duration-300 font-light hover:shadow-md"
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
