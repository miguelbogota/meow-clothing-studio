'use client';

import { categories } from '@/lib/data';

/** Interface for CategoryFilter component props */
interface CategoryFilterProps {
  /** Currently selected category */
  selectedCategory: string;
  /** Callback function called when category selection changes */
  onCategoryChange: (category: string) => void;
}

/**
 * CategoryFilter component that displays category selection buttons
 * Allows users to filter products by category
 */
export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-6 py-2.5 rounded-full text-sm font-light transition-all duration-300 border ${
          selectedCategory === 'all'
            ? 'bg-gray-900 text-white border-gray-900 shadow-md'
            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm'
        }`}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.name)}
          className={`px-6 py-2.5 rounded-full text-sm font-light transition-all duration-300 border ${
            selectedCategory === category.name
              ? 'bg-gray-900 text-white border-gray-900 shadow-md'
              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
