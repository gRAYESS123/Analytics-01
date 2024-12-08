import React from 'react';

const Controls = ({ 
  selectedCategory, 
  setSelectedCategory, 
  categories,
  onDateRangeChange 
}) => {
  // Handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    console.log('Selected category:', category); // For debugging
    setSelectedCategory(category);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Filter
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Categories</option>
            {categories && categories.map(category => (
              <option key={category} value={category}>
                {category.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Controls */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            onChange={(e) => onDateRangeChange({ 
              start: e.target.value ? new Date(e.target.value) : null,
              end: null 
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            onChange={(e) => onDateRangeChange(prev => ({ 
              ...prev,
              end: e.target.value ? new Date(e.target.value) : null 
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;