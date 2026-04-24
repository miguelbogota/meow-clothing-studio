import { getCart } from '@meow-clothing-studio/checkout-lib';

/**
 * Gets the quantity of a specific product in the cart
 * @param productId - ID of the product to check
 * @returns Quantity of the product in cart (0 if not found)
 */
export const getProductQuantity = (productId: string): number => {
  const cart = getCart();
  const item = cart.items.find(item => item.id === productId);
  return item ? item.quantity : 0;
};

/**
 * Checks if a product is in the cart
 * @param productId - ID of the product to check
 * @returns True if product is in cart, false otherwise
 */
export const isProductInCart = (productId: string): boolean => {
  return getProductQuantity(productId) > 0;
};
