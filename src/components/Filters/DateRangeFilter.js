// src/components/DateRangeFilter/DateRangeFilter.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateRangeFilter = ({ onChange }) => {
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null
  });

  const handleStartDateChange = (date) => {
    const newRange = { ...dateRange, start: date };
    setDateRange(newRange);
    onChange(newRange);
  };

  const handleEndDateChange = (date) => {
    const newRange = { ...dateRange, end: date };
    setDateRange(newRange);
    onChange(newRange);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Date Range
      </label>
      <div className="flex gap-4">
        <div>
          <DatePicker
            selected={dateRange.start}
            onChange={handleStartDateChange}
            selectsStart
            startDate={dateRange.start}
            endDate={dateRange.end}
            placeholderText="Start Date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <DatePicker
            selected={dateRange.end}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={dateRange.start}
            endDate={dateRange.end}
            minDate={dateRange.start}
            placeholderText="End Date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;