'use client';

import { useState, useEffect } from 'react';
import { Link } from '@vercel/microfrontends/next/client';
import { CartLink } from '@meow-clothing-studio/checkout-lib';

/**
 * Header component that displays the store name, navigation links, and cart icon
 * Shared between marketplace and checkout applications
 * Features sticky pill behavior with full-width background at top
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Full-width background element - only visible when not scrolled */}
      <div
        className={`fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300 z-40 ${
          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Sticky pill header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-0'
        }`}
      >
        <div
          className={`mx-auto transition-all duration-300 ${
            isScrolled
              ? 'max-w-6xl mx-auto bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-gray-100 px-6 py-2'
              : 'max-w-7xl px-4 sm:px-6 lg:px-8 py-2'
          }`}
        >
          <div
            className={`flex justify-between items-center transition-all duration-300 ${
              isScrolled ? 'h-12' : 'h-16'
            }`}
          >
            <Link
              href="/"
              className={`flex items-center transition-all duration-300 ${
                isScrolled
                  ? 'text-lg font-bold text-gray-900 hover:text-gray-700'
                  : 'text-2xl font-bold text-gray-900 hover:text-gray-700'
              }`}
            >
              <span
                className={`transition-all duration-300 ${
                  isScrolled ? 'mr-1.5' : 'mr-2'
                }`}
              >
                🐱
              </span>
              <span className={`${isScrolled ? 'hidden sm:inline' : ''}`}>
                Meow Clothing Studio
              </span>
            </Link>

            <div className="flex items-center">
              <CartLink />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
