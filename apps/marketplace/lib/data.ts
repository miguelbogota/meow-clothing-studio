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
  {
    id: '5',
    name: 'Dresses',
    description: 'Elegant dresses for special occasions',
  },
  {
    id: '6',
    name: 'Outerwear',
    description: 'Jackets and coats for all seasons',
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
  {
    id: '9',
    name: 'Elegant Cat Dress',
    price: 79.99,
    description: 'Beautiful floral dress with subtle cat pattern',
    category: 'Dresses',
    image: 'https://picsum.photos/seed/dress-1/300/300.jpg',
    stock: 15,
  },
  {
    id: '10',
    name: 'Midnight Cat Dress',
    price: 89.99,
    description: 'Elegant evening dress with cat silhouette',
    category: 'Dresses',
    image: 'https://picsum.photos/seed/dress-2/300/300.jpg',
    stock: 12,
  },
  {
    id: '11',
    name: 'Summer Cat Dress',
    price: 69.99,
    description: 'Light and breezy dress perfect for summer',
    category: 'Dresses',
    image: 'https://picsum.photos/seed/dress-3/300/300.jpg',
    stock: 20,
  },
  {
    id: '12',
    name: 'Vintage Cat T-Shirt',
    price: 34.99,
    description: 'Retro-style t-shirt with vintage cat illustration',
    category: 'T-Shirts',
    image: 'https://picsum.photos/seed/tshirt-2/300/300.jpg',
    stock: 28,
  },
  {
    id: '13',
    name: 'Graphic Cat Tee',
    price: 27.99,
    description: 'Modern graphic tee with bold cat artwork',
    category: 'T-Shirts',
    image: 'https://picsum.photos/seed/tshirt-3/300/300.jpg',
    stock: 45,
  },
  {
    id: '14',
    name: 'Minimalist Cat Shirt',
    price: 42.99,
    description: 'Clean design with subtle cat logo',
    category: 'T-Shirts',
    image: 'https://picsum.photos/seed/tshirt-4/300/300.jpg',
    stock: 33,
  },
  {
    id: '15',
    name: 'Oversized Cat Hoodie',
    price: 74.99,
    description: 'Comfortable oversized hoodie with cat paw print',
    category: 'Hoodies',
    image: 'https://picsum.photos/seed/hoodie-3/300/300.jpg',
    stock: 18,
  },
  {
    id: '16',
    name: 'Zip-Up Cat Hoodie',
    price: 84.99,
    description: 'Stylish zip-up hoodie with embroidered cat details',
    category: 'Hoodies',
    image: 'https://picsum.photos/seed/hoodie-4/300/300.jpg',
    stock: 22,
  },
  {
    id: '17',
    name: 'Cat Paw Necklace',
    price: 24.99,
    description: 'Delicate necklace with cat paw charm',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/necklace-1/300/300.jpg',
    stock: 60,
  },
  {
    id: '18',
    name: 'Cat Ear Rings',
    price: 19.99,
    description: 'Set of adjustable rings with cat ear design',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/rings-1/300/300.jpg',
    stock: 85,
  },
  {
    id: '19',
    name: 'Cat Tail Bracelet',
    price: 29.99,
    description: 'Charm bracelet with dangling cat tail',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/bracelet-1/300/300.jpg',
    stock: 40,
  },
  {
    id: '20',
    name: 'Slim Fit Cat Pants',
    price: 54.99,
    description: 'Modern slim-fit pants with subtle cat pattern',
    category: 'Pants',
    image: 'https://picsum.photos/seed/pants-2/300/300.jpg',
    stock: 30,
  },
  {
    id: '21',
    name: 'Cargo Cat Pants',
    price: 64.99,
    description: 'Functional cargo pants with cat-themed details',
    category: 'Pants',
    image: 'https://picsum.photos/seed/pants-3/300/300.jpg',
    stock: 25,
  },
  {
    id: '22',
    name: 'Cat Bell Denim',
    price: 74.99,
    description: 'Stylish denim jeans with embroidered cat bell',
    category: 'Pants',
    image: 'https://picsum.photos/seed/pants-4/300/300.jpg',
    stock: 18,
  },
  {
    id: '23',
    name: 'Formal Cat Dress',
    price: 119.99,
    description: 'Elegant formal dress with subtle cat motifs',
    category: 'Dresses',
    image: 'https://picsum.photos/seed/dress-4/300/300.jpg',
    stock: 8,
  },
  {
    id: '24',
    name: 'Casual Cat Dress',
    price: 54.99,
    description: 'Comfortable casual dress for everyday wear',
    category: 'Dresses',
    image: 'https://picsum.photos/seed/dress-5/300/300.jpg',
    stock: 35,
  },
  {
    id: '25',
    name: 'Cat Denim Jacket',
    price: 94.99,
    description: 'Classic denim jacket with cat patch details',
    category: 'Outerwear',
    image: 'https://picsum.photos/seed/jacket-1/300/300.jpg',
    stock: 15,
  },
  {
    id: '26',
    name: 'Bomber Cat Jacket',
    price: 129.99,
    description: 'Modern bomber jacket with embroidered cat design',
    category: 'Outerwear',
    image: 'https://picsum.photos/seed/jacket-2/300/300.jpg',
    stock: 12,
  },
  {
    id: '27',
    name: 'Cat Coat',
    price: 159.99,
    description: 'Warm winter coat with cat ear hood details',
    category: 'Outerwear',
    image: 'https://picsum.photos/seed/coat-1/300/300.jpg',
    stock: 10,
  },
  {
    id: '28',
    name: 'Windbreaker Cat Jacket',
    price: 84.99,
    description: 'Lightweight windbreaker with cat silhouette print',
    category: 'Outerwear',
    image: 'https://picsum.photos/seed/jacket-3/300/300.jpg',
    stock: 28,
  },
  {
    id: '29',
    name: 'Cat Paw Backpack',
    price: 64.99,
    description: 'Stylish backpack with cat paw compartments',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/backpack-1/300/300.jpg',
    stock: 20,
  },
  {
    id: '30',
    name: 'Cat Sunglasses',
    price: 39.99,
    description: 'Trendy sunglasses with cat ear frame design',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/sunglasses-1/300/300.jpg',
    stock: 50,
  },
  {
    id: '31',
    name: 'Cat Watch',
    price: 149.99,
    description: 'Elegant watch with cat face dial design',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/watch-1/300/300.jpg',
    stock: 25,
  },
  {
    id: '32',
    name: 'Cat Scarf',
    price: 34.99,
    description: 'Cozy scarf with subtle cat pattern',
    category: 'Outerwear',
    image: 'https://picsum.photos/seed/scarf-1/300/300.jpg',
    stock: 40,
  },
  {
    id: '33',
    name: 'Cat Mittens',
    price: 24.99,
    description: 'Warm mittens with cat paw grips',
    category: 'Outerwear',
    image: 'https://picsum.photos/seed/mittens-1/300/300.jpg',
    stock: 60,
  },
  {
    id: '34',
    name: 'Cat Tote Bag',
    price: 44.99,
    description: 'Spacious tote bag with cat graphic print',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/tote-1/300/300.jpg',
    stock: 80,
  },
  {
    id: '35',
    name: 'Cat Crossbody',
    price: 54.99,
    description: 'Compact crossbody bag with cat charm',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/crossbody-1/300/300.jpg',
    stock: 35,
  },
  {
    id: '36',
    name: 'Cat Wallet',
    price: 39.99,
    description: 'Slim wallet with cat embossing',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/wallet-1/300/300.jpg',
    stock: 45,
  },
  {
    id: '37',
    name: 'Cat Cap',
    price: 29.99,
    description: 'Classic baseball cap with cat logo',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/cap-1/300/300.jpg',
    stock: 55,
  },
  {
    id: '38',
    name: 'Cat Socks Set',
    price: 19.99,
    description: 'Comfortable socks set with cat paw patterns',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/socks-1/300/300.jpg',
    stock: 100,
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
