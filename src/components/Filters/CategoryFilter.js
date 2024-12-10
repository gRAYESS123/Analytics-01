// src/components/CategoryFilter/CategoryFilter.js
import React from 'react';

const CategoryFilter = ({ categories = [], selectedCategory, onCategoryChange }) => {
  const categoryArray = Array.isArray(categories) ? categories : 
    (categories ? Object.keys(categories) : []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Category
      </label>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="all">All Categories</option>
        {categoryArray.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;