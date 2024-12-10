// src/components/dashboard/ResolutionRate.js
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ResolutionRate = ({ data }) => {
  const resolutionData = useMemo(() => {
    const totals = data.reduce((acc, item) => {
      const status = item.status ? item.status.toLowerCase() : 'pending';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(totals).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count
    }));
  }, [data]);

  const COLORS = ['#82ca9d', '#8884d8', '#ffc658'];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Ticket Resolution Status</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={resolutionData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {resolutionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Resolution Rate</p>
          <p className="text-2xl font-bold">
            {Math.round((resolutionData.find(d => d.name === 'Resolved')?.value || 0) / data.length * 100)}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Total Tickets</p>
          <p className="text-2xl font-bold">{data.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ResolutionRate;