// src/components/dashboard/ServiceMetrics.js
import React from 'react';

const ServiceMetrics = ({ metrics }) => {
  const formatPercentage = (value) => `${(value || 0).toFixed(1)}%`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        title="WhatsApp Activation"
        value={formatPercentage(metrics.activation_success?.whatsapp)}
        description="Success Rate"
      />
      <MetricCard
        title="PayPal Activation"
        value={formatPercentage(metrics.activation_success?.paypal)}
        description="Success Rate"
      />
      <MetricCard
        title="SMS Delivery"
        value={metrics.service_quality?.sms_delivery_issues}
        description="Issues Reported"
      />
      <MetricCard
        title="Call Quality"
        value={metrics.service_quality?.call_quality_issues}
        description="Issues Reported"
      />
    </div>
  );
};

const MetricCard = ({ title, value, description }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
    <p className="mt-1 text-sm text-gray-500">{description}</p>
  </div>
);

export default ServiceMetrics;