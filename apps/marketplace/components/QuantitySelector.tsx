'use client';

import { Minus, Plus } from 'lucide-react';

/** Interface for QuantitySelector component props */
interface QuantitySelectorProps {
  /** Current quantity */
  quantity: number;
  /** Maximum quantity allowed */
  maxQuantity?: number;
  /** Function to handle quantity increase */
  onIncrease: (e: React.MouseEvent) => void;
  /** Function to handle quantity decrease */
  onDecrease: (e: React.MouseEvent) => void;
  /** Size variant for the selector */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the quantity as text or just buttons */
  showQuantity?: boolean;
}

/**
 * QuantitySelector component that displays plus/minus buttons to adjust quantity
 * Used in product cards and product details for cart management
 */
export default function QuantitySelector({
  quantity,
  maxQuantity = 99,
  onIncrease,
  onDecrease,
  size = 'md',
  showQuantity = true,
}: QuantitySelectorProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const buttonSizeClasses = {
    sm: 'p-1',
    md: 'p-1.5',
    lg: 'p-2',
  };

  const isDisabledDecrease = quantity <= 0;
  const isDisabledIncrease = quantity >= maxQuantity;

  return (
    <div
      className={`flex items-center ${showQuantity ? 'space-x-3' : 'space-x-2'}`}
    >
      <button
        onClick={onDecrease}
        disabled={isDisabledDecrease}
        className={`rounded-full border-0 flex items-center justify-center transition-all duration-300 ${
          isDisabledDecrease
            ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
            : 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-sm'
        } ${sizeClasses[size]} ${buttonSizeClasses[size]}`}
        aria-label="Decrease quantity"
      >
        <Minus size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} />
      </button>

      {showQuantity && (
        <span
          className={`font-light text-gray-900 min-w-[2rem] text-center ${
            size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'
          }`}
        >
          {quantity}
        </span>
      )}

      <button
        onClick={onIncrease}
        disabled={isDisabledIncrease}
        className={`rounded-full border-0 flex items-center justify-center transition-all duration-300 ${
          isDisabledIncrease
            ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
            : 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-sm'
        } ${sizeClasses[size]} ${buttonSizeClasses[size]}`}
        aria-label="Increase quantity"
      >
        <Plus size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} />
      </button>
    </div>
  );
}
