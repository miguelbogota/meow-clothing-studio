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
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border">
      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
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
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </button>

        <span className="w-8 text-center font-medium">{item.quantity}</span>

        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="text-right">
        <p className="font-semibold text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <button
        onClick={handleRemove}
        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
