import { describe, it, expect } from 'vitest';
import { 
  categories, 
  products, 
  getProductsByCategory, 
  getProductById,
  type Product,
  type Category 
} from '../data';

describe('Data constants and functions', () => {
  describe('categories', () => {
    it('should have the correct number of categories', () => {
      expect(categories).toHaveLength(4);
    });

    it('should have required category properties', () => {
      categories.forEach((category: Category) => {
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('description');
        expect(typeof category.id).toBe('string');
        expect(typeof category.name).toBe('string');
        expect(typeof category.description).toBe('string');
      });
    });

    it('should contain expected category names', () => {
      const categoryNames = categories.map(cat => cat.name);
      expect(categoryNames).toContain('T-Shirts');
      expect(categoryNames).toContain('Hoodies');
      expect(categoryNames).toContain('Accessories');
      expect(categoryNames).toContain('Pants');
    });
  });

  describe('products', () => {
    it('should have the correct number of products', () => {
      expect(products).toHaveLength(8);
    });

    it('should have required product properties', () => {
      products.forEach((product: Product) => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('category');
        expect(product).toHaveProperty('image');
        expect(product).toHaveProperty('stock');
        expect(typeof product.id).toBe('string');
        expect(typeof product.name).toBe('string');
        expect(typeof product.price).toBe('number');
        expect(typeof product.description).toBe('string');
        expect(typeof product.category).toBe('string');
        expect(typeof product.image).toBe('string');
        expect(typeof product.stock).toBe('number');
      });
    });

    it('should have valid price values', () => {
      products.forEach((product: Product) => {
        expect(product.price).toBeGreaterThan(0);
      });
    });

    it('should have valid stock values', () => {
      products.forEach((product: Product) => {
        expect(product.stock).toBeGreaterThanOrEqual(0);
        expect(Number.isInteger(product.stock)).toBe(true);
      });
    });

    it('should belong to valid categories', () => {
      const validCategories = categories.map(cat => cat.name);
      products.forEach((product: Product) => {
        expect(validCategories).toContain(product.category);
      });
    });
  });

  describe('getProductsByCategory', () => {
    it('should return all products when category is "all"', () => {
      const result = getProductsByCategory('all');
      expect(result).toEqual(products);
      expect(result).toHaveLength(8);
    });

    it('should return filtered products for specific category', () => {
      const tShirts = getProductsByCategory('T-Shirts');
      expect(tShirts).toHaveLength(2);
      tShirts.forEach((product: Product) => {
        expect(product.category).toBe('T-Shirts');
      });
    });

    it('should return empty array for non-existent category', () => {
      const result = getProductsByCategory('NonExistent');
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle case-sensitive category matching', () => {
      const result = getProductsByCategory('t-shirts');
      expect(result).toEqual([]);
    });

    it('should return correct counts for each category', () => {
      expect(getProductsByCategory('T-Shirts')).toHaveLength(2);
      expect(getProductsByCategory('Hoodies')).toHaveLength(2);
      expect(getProductsByCategory('Accessories')).toHaveLength(2);
      expect(getProductsByCategory('Pants')).toHaveLength(2);
    });
  });

  describe('getProductById', () => {
    it('should return correct product for valid ID', () => {
      const product = getProductById('1');
      expect(product).toBeDefined();
      expect(product!.id).toBe('1');
      expect(product!.name).toBe('Classic Cat T-Shirt');
    });

    it('should return undefined for non-existent ID', () => {
      const result = getProductById('999');
      expect(result).toBeUndefined();
    });

    it('should handle empty string ID', () => {
      const result = getProductById('');
      expect(result).toBeUndefined();
    });

    it('should return product with all required properties', () => {
      const product = getProductById('1');
      expect(product).toBeDefined();
      const requiredProps = ['id', 'name', 'price', 'description', 'category', 'image', 'stock'];
      requiredProps.forEach(prop => {
        expect(product).toHaveProperty(prop);
      });
    });

    it('should find all existing products by their IDs', () => {
      products.forEach((product: Product) => {
        const found = getProductById(product.id);
        expect(found).toBeDefined();
        expect(found!.id).toBe(product.id);
        expect(found!.name).toBe(product.name);
      });
    });
  });
});
