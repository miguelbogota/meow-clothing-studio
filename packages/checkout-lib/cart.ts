/** Interface representing an item in the shopping cart */
export interface CartItem {
  /** Unique identifier for the cart item */
  id: string;
  /** Name of the product */
  name: string;
  /** Price of the product */
  price: number;
  /** Quantity of the product in cart */
  quantity: number;
  /** Image URL of the product */
  image: string;
}

/** Interface representing the complete shopping cart */
export interface Cart {
  /** Array of cart items */
  items: CartItem[];
  /** Total price of all items in cart */
  total: number;
}

/** Storage key for cart data in localStorage */
const CART_STORAGE_KEY = 'meow-clothing-cart';

/**
 * Retrieves the current cart from localStorage
 * @returns Current cart state or empty cart if none exists
 */
export const getCart = (): Cart => {
  if (typeof window === 'undefined') {
    return { items: [], total: 0 };
  }

  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (cartData) {
      return JSON.parse(cartData);
    }
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
  }

  return { items: [], total: 0 };
};

/**
 * Saves the cart state to localStorage
 * @param cart Cart state to save
 */
export const saveCart = (cart: Cart): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

/**
 * Adds a product to the shopping cart
 * @param product Product to add to cart
 * @param quantity Quantity to add (default: 1)
 * @returns Updated cart state
 */
export const addToCart = (
  product: { id: string; name: string; price: number; image: string },
  quantity: number = 1,
): Cart => {
  const cart = getCart();
  const existingItemIndex = cart.items.findIndex(
    (item) => item.id === product.id,
  );

  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex]!.quantity += quantity;
  } else {
    cart.items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
  }

  cart.total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  saveCart(cart);
  return cart;
};

/**
 * Removes an item from the shopping cart
 * @param productId ID of the product to remove
 * @returns Updated cart state
 */
export const removeFromCart = (productId: string): Cart => {
  const cart = getCart();
  cart.items = cart.items.filter((item) => item.id !== productId);
  cart.total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  saveCart(cart);
  return cart;
};

/**
 * Updates the quantity of a specific item in the cart
 * @param productId ID of the product to update
 * @param quantity New quantity (0 removes the item)
 * @returns Updated cart state
 */
export const updateQuantity = (productId: string, quantity: number): Cart => {
  const cart = getCart();
  const itemIndex = cart.items.findIndex((item) => item.id === productId);

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex]!.quantity = quantity;
    }
  }

  cart.total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  saveCart(cart);
  return cart;
};

/**
 * Clears all items from the shopping cart
 * @returns Empty cart state
 */
export const clearCart = (): Cart => {
  const cart = { items: [], total: 0 };
  saveCart(cart);
  return cart;
};

/**
 * Gets the total number of items in the cart
 * @returns Total count of all items in cart
 */
export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.items.length;
};
