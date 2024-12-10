import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = [
  '#0088FE', // Blue
  '#00C49F', // Green
  '#FFBB28', // Yellow
  '#FF8042', // Orange
  '#8884d8', // Purple
  '#82ca9d', // Light Green
  '#ff6b6b', // Red
  '#4ecdc4', // Teal
  '#45b7d1', // Sky Blue
  '#96ceb4'  // Sage Green
];

const CategoryBreakdown = ({ data = {}, totalCount = 0 }) => {
  // Transform and sort data
  const chartData = Object.entries(data)
    .map(([category, count]) => ({
      name: category,
      value: count,
      percentage: ((count / totalCount) * 100).toFixed(1)
    }))
    .sort((a, b) => b.value - a.value); // Sort by count in descending order

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Category Distribution</h3>
        <p className="text-sm text-gray-500 mt-1">
          Breakdown of support tickets by category
        </p>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                innerRadius={75} // Add this for a donut chart
                label={({ name, percentage }) => `${percentage}%`}
                labelLine={true}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [
                  `${props.payload.percentage}% (${value} tickets)`,
                  name
                ]}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  padding: '8px 12px'
                }}
              />
              <Legend 
                layout="vertical" 
                align="right"
                verticalAlign="middle"
                iconType="circle"
                wrapperStyle={{
                  paddingLeft: '20px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Stats Table */}
        <div className="overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tickets
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {chartData.map((item, index) => (
                  <tr key={item.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="truncate">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.percentage}%
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-gray-50 font-medium">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Total
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {totalCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    100%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Additional Stats or Info */}
          <div className="mt-4 grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-md">
            <div>
              <p className="text-sm text-gray-500">Total Categories</p>
              <p className="text-lg font-semibold text-gray-900">
                {chartData.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Most Common</p>
              <p className="text-lg font-semibold text-gray-900 truncate">
                {chartData[0]?.name || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBreakdown;