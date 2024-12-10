import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { differenceInHours } from 'date-fns';

const ResponseTimeAnalysis = ({ data }) => {
  const responseTimeData = useMemo(() => {
    const categoryTimes = {};
    
    data.forEach(item => {
      if (item.response_time && item.mainCategory) {
        const responseTime = differenceInHours(
          new Date(item.response_time), 
          new Date(item.date)
        );
        
        if (!categoryTimes[item.mainCategory]) {
          categoryTimes[item.mainCategory] = {
            times: [],
            total: 0,
            count: 0
          };
        }
        
        categoryTimes[item.mainCategory].times.push(responseTime);
        categoryTimes[item.mainCategory].total += responseTime;
        categoryTimes[item.mainCategory].count++;
      }
    });

    return Object.entries(categoryTimes).map(([category, data]) => ({
      category,
      averageResponseTime: Math.round(data.total / data.count * 10) / 10
    }));
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Average Response Time by Category</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={responseTimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="averageResponseTime" 
              fill="#8884d8" 
              name="Average Response Time (hours)" 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResponseTimeAnalysis;