// src/components/dashboard/UserSatisfaction.js
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { startOfWeek, format } from 'date-fns';

const UserSatisfaction = ({ data }) => {
  const satisfactionData = useMemo(() => {
    const weeklyScores = {};
    
    data.forEach(item => {
      if (item.sentiment && item.date) {
        const weekStart = startOfWeek(new Date(item.date));
        const weekKey = format(weekStart, 'yyyy-MM-dd');
        
        if (!weeklyScores[weekKey]) {
          weeklyScores[weekKey] = {
            total: 0,
            count: 0
          };
        }
        
        weeklyScores[weekKey].total += item.sentiment;
        weeklyScores[weekKey].count++;
      }
    });

    return Object.entries(weeklyScores)
      .map(([week, data]) => ({
        week: format(new Date(week), 'MMM d'),
        averageSentiment: Math.round(data.total / data.count * 100) / 100
      }))
      .sort((a, b) => new Date(a.week) - new Date(b.week));
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">User Satisfaction Trends</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={satisfactionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis 
              domain={[-1, 1]} 
              label={{ value: 'Sentiment Score', angle: -90, position: 'insideLeft' }} 
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="averageSentiment" 
              stroke="#82ca9d" 
              name="Average Sentiment" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserSatisfaction;