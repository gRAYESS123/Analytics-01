import React from 'react';

const Controls = ({ selectedCategory, setSelectedCategory, categories }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="max-w-xs">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Filter
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Controls;