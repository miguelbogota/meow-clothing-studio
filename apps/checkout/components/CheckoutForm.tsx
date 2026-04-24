'use client';

import { useState } from 'react';
import { Cart } from '@meow-clothing-studio/checkout-lib';

/** Interface for CheckoutForm component props */
interface CheckoutFormProps {
  /** Current cart state containing items and total */
  cart: Cart;
  /** Callback function called when order is successfully completed */
  onOrderComplete: () => void;
}

/**
 * CheckoutForm component that handles the checkout process
 * Displays order summary and collects customer shipping information
 */
export default function CheckoutForm({
  cart,
  onOrderComplete,
}: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear cart after successful order
    const { clearCart } = await import('@meow-clothing-studio/checkout-lib');
    clearCart();

    setIsSubmitting(false);
    onOrderComplete();
  };

  if (cart.items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100">
        <h2 className="text-2xl font-light text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 font-light mb-6">
          Add some items to your cart to checkout
        </p>
        <a
          href="/"
          className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full transition-all duration-300 font-light hover:shadow-md"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
      <h2 className="text-2xl font-light text-gray-900 mb-8">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-light text-gray-700 mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-light text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-light text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-light text-gray-700 mb-2"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-light text-gray-700 mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-light text-gray-700 mb-2"
            >
              ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              required
              value={formData.zipCode}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-light text-gray-700 mb-2"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-light text-gray-900">Total:</span>
            <span className="text-3xl font-light text-gray-900">
              ${cart.total.toFixed(2)}
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed font-light hover:shadow-md"
          >
            {isSubmitting ? 'Processing Order...' : 'Complete Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
