import React from 'react';
import { LineChart } from '../../components/Charts';

function TicketMetrics({ data }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Ticket Metrics</h2>
      <LineChart
        data={data}
        dataKey="total_tickets"
        xAxisKey="date"
        name="Total Tickets"
      />
    </div>
  );
}

export default TicketMetrics;