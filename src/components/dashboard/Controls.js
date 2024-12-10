// src/components/Controls/Controls.js
import React from 'react';
import CategoryFilter from '../Filters/CategoryFilter';
import DateRangeFilter from '../Filters/DateRangeFilter';

const Controls = ({ 
  selectedCategory, 
  setSelectedCategory, 
  categories = {}, 
  onDateRangeChange 
}) => {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <DateRangeFilter onChange={onDateRangeChange} />
    </div>
  );
};

export default Controls;