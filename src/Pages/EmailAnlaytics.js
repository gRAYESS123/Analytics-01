// src/pages/EmailAnalytics.js
import React from 'react';
import EmailTable from '../components/EmailTable/EmailTable';
import Controls from '../components/dashboard/Controls';

const EmailAnalytics = ({ 
  filteredData,
  metrics,
  selectedCategory,
  setSelectedCategory,
  setDateRange
}) => {
  return (
    <div className="space-y-6">
      <Controls 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={Object.keys(metrics.categoryDistribution)}
        onDateRangeChange={setDateRange}
      />

      <div className="bg-white rounded-lg shadow">
        <EmailTable data={filteredData} /> 
      </div>
    </div>
  );
};

export default EmailAnalytics;