import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DateRangePicker from '../components/DateRangePicker/DateRangePicker';

const Dashboard = ({ 
  data,
  metrics,
  selectedCategory,
  setSelectedCategory,
  setDateRange
}) => {
  // Format data for charts
  const categoryData = Object.entries(metrics.categoryDistribution).map(([name, value]) => ({
    name,
    value
  }));

  const urgencyData = Object.entries(metrics.urgencyDistribution).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-900">Dashboard Overview</h2>
          <p className="text-sm text-gray-500">Analysis of support tickets</p>
        </div>
        <DateRangePicker onChange={setDateRange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Urgency Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Urgency Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={urgencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sentiment Overview */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Sentiment Overview</h3>
        <div className="text-2xl font-bold">
          {metrics.averageSentiment.toFixed(2)}
        </div>
        <p className="text-sm text-gray-500">Average Sentiment Score</p>
      </div>
    </div>
  );
};

export default Dashboard;