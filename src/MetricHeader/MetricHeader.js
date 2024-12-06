import React from 'react';

const MetricCard = ({ title, value, className, textColor }) => (
  <div className={`${className} p-4 rounded-lg`}>
    <h3 className={`font-bold ${textColor}`}>{title}</h3>
    <p className="text-2xl">{value}</p>
  </div>
);

const MetricsHeader = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <MetricCard
        title="Filtered Emails"
        value={stats.totalEmails}
        className="bg-blue-50"
        textColor="text-blue-700"
      />
      <MetricCard
        title="Unique Senders"
        value={stats.uniqueSenders}
        className="bg-green-50"
        textColor="text-green-700"
      />
      <MetricCard
        title="Avg Thread Length"
        value={stats.avgThreadLength}
        className="bg-yellow-50"
        textColor="text-yellow-700"
      />
      <MetricCard
        title="Median Response Time"
        value={`${stats.responseTimes.median.toFixed(1)}h`}
        className="bg-purple-50"
        textColor="text-purple-700"
      />
    </div>
  );
};

export default MetricsHeader;