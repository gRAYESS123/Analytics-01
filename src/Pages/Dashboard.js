// src/Pages/Dashboard.js
import React from 'react';
import CategoryBreakdown from '../components/Filters/CategoryFilter';
import Controls from '../components/dashboard/Controls';
import UrgencyDistribution from '../components/dashboard/UrgencyDistribution';
import TimeDistribution from '../components/dashboard/TimeDistribution';
import ResponseTimeAnalysis from '../components/dashboard/ResponseTimeAnalysis';
import UserSatisfaction from '../components/dashboard/UserSatisfaction';
import ResolutionRate from '../components/dashboard/ResolutionRate';


const Dashboard = ({ 
  data,
  filteredData,
  metrics,
  selectedCategory,
  setSelectedCategory,
  setDateRange
}) => {
  return (
    <div className="space-y-6">
      <Controls 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={Object.keys(metrics.categoryDistribution)}
        onDateRangeChange={setDateRange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CategoryBreakdown 
          data={metrics.categoryDistribution} 
          totalCount={filteredData.length}
        />
        <UrgencyDistribution 
          data={metrics.urgencyDistribution}
          totalCount={filteredData.length}
        />
        <TimeDistribution 
          data={metrics.timeDistribution}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ResponseTimeAnalysis data={filteredData} />
        <UserSatisfaction data={filteredData} />
        <ResolutionRate data={filteredData} />
      </div>
    </div>
  );
};

export default Dashboard;