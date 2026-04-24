import { Link } from '@vercel/microfrontends/next/client';
import { CartLink } from '@meow-clothing-studio/checkout-lib';

/**
 * Header component that displays the store name, navigation links, and cart icon
 * Shared between marketplace and checkout applications
 */
export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200 flex items-center"
          >
            <span className="mr-2">🐱</span>
            <span>Meow Clothing Studio</span>
          </Link>

          <div className="flex items-center">
            <CartLink />
          </div>
        </div>
      </div>
    </header>
  );
}
