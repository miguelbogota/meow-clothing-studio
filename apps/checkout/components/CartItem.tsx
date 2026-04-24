'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import {
  updateQuantity,
  removeFromCart,
  type CartItem as CartItemType,
} from '@meow-clothing-studio/checkout-lib';

/** Interface for CartItem component props */
interface CartItemProps {
  /** Cart item data to display */
  item: CartItemType;
  /** Callback function called when cart item is updated */
  onUpdate: () => void;
}

/**
 * CartItem component that displays a single item in the shopping cart
 * Provides controls for quantity adjustment and item removal
 */
export default function CartItemComponent({ item, onUpdate }: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
    onUpdate();
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    onUpdate();
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = item.image;
          }}
        />
      </div>

      <div className="flex-1">
        <h3 className="font-light text-xl text-gray-900 mb-2">{item.name}</h3>
        <p className="text-gray-600 font-light">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </button>

        <span className="w-8 text-center font-light text-gray-900">
          {item.quantity}
        </span>

        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="text-right">
        <p className="font-light text-xl text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <button
        onClick={handleRemove}
        className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
