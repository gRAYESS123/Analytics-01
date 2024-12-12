import React, { useState, useEffect } from 'react';
import { getTicketAnalytics, getAgentPerformance } from '../../services/api';
import TicketMetrics from './TicketMetrics';
import AgentPerformance from './AgentPerformance';
import DateRangeFilter from '../../components/DateRangeFilter';

function Dashboard() {
  const [data, setData] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tickets, agents] = await Promise.all([
          getTicketAnalytics(dateRange.startDate, dateRange.endDate),
          getAgentPerformance(dateRange.startDate, dateRange.endDate)
        ]);
        setData({ tickets, agents });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [dateRange]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <DateRangeFilter
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onStartDateChange={(date) => setDateRange(prev => ({ ...prev, startDate: date }))}
        onEndDateChange={(date) => setDateRange(prev => ({ ...prev, endDate: date }))}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TicketMetrics data={data.tickets} />
        <AgentPerformance data={data.agents} />
      </div>
    </div>
  );
}

export default Dashboard;