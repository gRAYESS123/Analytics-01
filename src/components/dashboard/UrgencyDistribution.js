// src/components/dashboard/UrgencyDistribution.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UrgencyDistribution = ({ data, totalCount }) => {
  const chartData = Object.entries(data).map(([urgency, count]) => ({
    name: urgency,
    count: count
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Urgency Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Tickets" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UrgencyDistribution;