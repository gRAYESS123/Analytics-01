import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = {
  'Technical': '#3b82f6',
  'Billing': '#ef4444',
  'Account': '#10b981',
  'Usage Query': '#8b5cf6',
  'Call SMS': '#f59e0b',
  'Number Issues': '#06b6d4',
  'App Technical': '#ec4899',
  'General': '#6b7280'
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Only show label if percentage is greater than 3%
  if (percent < 0.03) return null;

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CategoryBreakdown = ({ data }) => {
  const chartData = Object.entries(data || {})
    .map(([name, value]) => ({
      name: name.replace(/_/g, ' '),
      value: value
    }))
    .sort((a, b) => b.value - a.value);

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-6">Category Distribution</h3>
      <div className="h-[500px]"> {/* Increased height */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="45%"
              cy="45%"
              labelLine={false}
              outerRadius={180} // Increased size
              fill="#8884d8"
              dataKey="value"
              label={renderCustomizedLabel}
              paddingAngle={2} // Added space between sectors
            >
              {chartData.map((entry) => (
                <Cell 
                  key={entry.name} 
                  fill={COLORS[entry.name] || '#6b7280'} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [
                `${value} (${((value/total)*100).toFixed(1)}%)`,
                name
              ]}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '6px',
                padding: '10px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <Legend 
              layout="vertical" 
              align="right"
              verticalAlign="middle"
              wrapperStyle={{
                paddingLeft: '40px',
                fontSize: '14px',
                lineHeight: '24px'
              }}
              formatter={(value, entry) => (
                <span style={{ color: '#374151' }}>
                  {value} ({chartData.find(item => item.name === value)?.value || 0})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryBreakdown;