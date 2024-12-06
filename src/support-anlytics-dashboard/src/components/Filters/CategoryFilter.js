import React from 'react';
import _ from 'lodash';
import { categorizeIssues } from '../../utils/analytics';

const CategoryFilter = ({ data, selectedCategory, onCategoryChange }) => {
  // Get unique categories from the data
  const categories = _.uniqBy(
    data.map(email => ({
      name: categorizeIssues(email.body, email.subject)
    })), 
    'name'
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Category Filter
      </label>
      <select 
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter by category"
      >
        <option value="All">All Categories</option>
        {categories.map(cat => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;