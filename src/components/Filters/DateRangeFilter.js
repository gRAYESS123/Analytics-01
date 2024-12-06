import React from 'react';

const DateRangeFilter = ({ dateRange, onDateChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <input 
          type="date" 
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          value={dateRange.start || ''}
          onChange={(e) => onDateChange('start', e.target.value)}
          aria-label="Start date filter"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <input 
          type="date" 
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          value={dateRange.end || ''}
          onChange={(e) => onDateChange('end', e.target.value)}
          aria-label="End date filter"
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;