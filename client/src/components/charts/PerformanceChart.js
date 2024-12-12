import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PerformanceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="agent_name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="resolved_tickets" name="Resolved Tickets" fill="#82ca9d" />
        <Bar dataKey="total_tickets" name="Total Tickets" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}