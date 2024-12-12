import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DateRangePicker from '../components/DateRangePicker/DateRangePicker';

const EmailAnalytics = ({ 
  filteredData,
  metrics,
  selectedCategory,
  setSelectedCategory,
  setDateRange
}) => {
  // Format data for time series
  const timeSeriesData = Object.entries(metrics.timeDistribution)
    .map(([date, count]) => ({
      date,
      count
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-900">Email Analytics</h2>
          <p className="text-sm text-gray-500">Time-based analysis of support emails</p>
        </div>
        <DateRangePicker onChange={setDateRange} />
      </div>

      {/* Time Series Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Email Volume Over Time</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Selector */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Filter by Category</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="all">All Categories</option>
          {Object.keys(metrics.categoryDistribution).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Data Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Total Emails</h3>
          <p className="text-2xl font-bold">{filteredData.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Average Sentiment</h3>
          <p className="text-2xl font-bold">{metrics.averageSentiment.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Most Common Category</h3>
          <p className="text-2xl font-bold">
            {Object.entries(metrics.categoryDistribution)
              .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailAnalytics;