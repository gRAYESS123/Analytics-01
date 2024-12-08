import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

const TimeDistribution = ({ data }) => {
  const chartData = useMemo(() => {
    try {
      // Convert data object to array of entries with proper date parsing
      const entries = Object.entries(data)
        .map(([dateStr, count]) => {
          try {
            // Ensure we have a valid date string
            const date = dateStr.includes('T') ? parseISO(dateStr) : parseISO(dateStr + 'T00:00:00');
            return {
              date,
              count,
              formattedDate: format(date, 'MMM dd')
            };
          } catch (err) {
            console.warn('Invalid date:', dateStr);
            return null;
          }
        })
        .filter(item => item !== null) // Remove any failed date parsing
        .sort((a, b) => a.date - b.date); // Sort by date

      return entries;
    } catch (err) {
      console.error('Error processing time distribution data:', err);
      return [];
    }
  }, [data]);

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-6">Time Distribution</h3>
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          No time distribution data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-6">Time Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="formattedDate"
              angle={-45}
              textAnchor="end"
              height={70}
              tick={{
                fontSize: 12
              }}
            />
            <YAxis 
              tick={{
                fontSize: 12
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '6px',
                padding: '10px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              formatter={(value) => [`${value} tickets`, 'Count']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Bar 
              dataKey="count" 
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeDistribution;