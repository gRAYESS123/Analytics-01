import React from 'react';
import { BarChart } from '../../components/Charts';

function AgentPerformance({ data }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Agent Performance</h2>
      <BarChart
        data={data}
        dataKey="resolved_tickets"
        xAxisKey="agent_name"
        name="Resolved Tickets"
      />
    </div>
  );
}

export default AgentPerformance;