/** Interface representing a product in the marketplace */
export interface Product {
  /** Unique identifier for the product */
  id: string;
  /** Name of the product */
  name: string;
  /** Price of the product */
  price: number;
  /** Description of the product */
  description: string;
  /** Category the product belongs to */
  category: string;
  /** Image URL of the product */
  image: string;
  /** Available stock quantity */
  stock: number;
}

/** Interface representing a product category */
export interface Category {
  /** Unique identifier for the category */
  id: string;
  /** Name of the category */
  name: string;
  /** Description of the category */
  description: string;
}

/** Array of available product categories */
export const categories: Category[] = [
  {
    id: '1',
    name: 'T-Shirts',
    description: 'Comfortable and stylish t-shirts for everyday wear',
  },
  {
    id: '2',
    name: 'Hoodies',
    description: 'Warm and cozy hoodies for cold days',
  },
  {
    id: '3',
    name: 'Accessories',
    description: 'Complete your look with our accessories',
  },
  {
    id: '4',
    name: 'Pants',
    description: 'Stylish and comfortable pants for any occasion',
  },
];

/** Array of available products */
export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Cat T-Shirt',
    price: 29.99,
    description: 'A comfortable cotton t-shirt featuring a cute cat design',
    category: 'T-Shirts',
    image: 'https://picsum.photos/seed/shirt-1/300/300.jpg',
    stock: 50,
  },
  {
    id: '2',
    name: 'Meow Hoodie',
    price: 59.99,
    description: 'Stay warm with this cozy hoodie featuring cat ears',
    category: 'Hoodies',
    image: 'https://picsum.photos/seed/hoodie-1/300/300.jpg',
    stock: 30,
  },
  {
    id: '3',
    name: 'Cat Ear Beanie',
    price: 19.99,
    description: 'Adorable beanie with cat ears for a playful look',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/beanie-1/300/300.jpg',
    stock: 100,
  },
  {
    id: '4',
    name: 'Paw Print Pants',
    price: 49.99,
    description: 'Comfortable pants with subtle paw print pattern',
    category: 'Pants',
    image: 'https://picsum.photos/seed/pants-1/300/300.jpg',
    stock: 25,
  },
  {
    id: '5',
    name: 'Kitten T-Shirt',
    price: 24.99,
    description: 'Soft t-shirt with adorable kitten graphics',
    category: 'T-Shirts',
    image: 'https://picsum.photos/seed/tshirt-1/300/300.jpg',
    stock: 40,
  },
  {
    id: '6',
    name: 'Cat Face Hoodie',
    price: 64.99,
    description: 'Premium hoodie with embroidered cat face design',
    category: 'Hoodies',
    image: 'https://picsum.photos/seed/hoodie-2/300/300.jpg',
    stock: 20,
  },
  {
    id: '7',
    name: 'Cat Collar Choker',
    price: 14.99,
    description: 'Fashionable choker inspired by cat collars',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/choker-1/300/300.jpg',
    stock: 75,
  },
  {
    id: '8',
    name: 'Cat Tail Leggings',
    price: 39.99,
    description: 'Fun leggings with attached cat tail detail',
    category: 'Pants',
    image: 'https://picsum.photos/seed/leggings-1/300/300.jpg',
    stock: 35,
  },
];

/**
 * Filters products by category
 * @param category - Category to filter by, or 'all' to return all products
 * @returns Array of products in the specified category
 */
export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter((product) => product.category === category);
};

/**
 * Retrieves a product by its unique identifier
 * @param id - Unique identifier of the product
 * @returns Product object if found, undefined otherwise
 */
export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};
