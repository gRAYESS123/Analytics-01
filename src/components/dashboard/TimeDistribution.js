// src/components/dashboard/TimeDistribution.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TimeDistribution = ({ data }) => {
  const chartData = Object.entries(data)
    .map(([date, count]) => ({
      date,
      count
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Tickets Over Time</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#82ca9d" 
              name="Tickets" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeDistribution;