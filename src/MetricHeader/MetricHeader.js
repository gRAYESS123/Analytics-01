import React from 'react';

const MetricHeader = ({ stats = {} }) => {
  const { total = 0, avgResponseTime = 0, median = 0 } = stats;
  
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Emails</h3>
        <p className="mt-1 text-2xl font-semibold">{total}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm font-medium text-gray-500">Average Response Time</h3>
        <p className="mt-1 text-2xl font-semibold">{avgResponseTime}m</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm font-medium text-gray-500">Median Response Time</h3>
        <p className="mt-1 text-2xl font-semibold">{median}m</p>
      </div>
    </div>
  );
};

export default MetricHeader;