import React, { useState, useMemo } from 'react';
import FileUpload from './FileUpload/FileUpload';
import EmailTable from './EmailTable/EmailTable';
import CategoryBreakdown from './dashboard/CategoryBreakdown';
import Controls from './dashboard/Controls';
import UrgencyDistribution from './dashboard/UrgencyDistribution';
import TimeDistribution from './dashboard/TimeDistribution';
import { startOfDay, endOfDay, isWithinInterval } from 'date-fns';

const SupportAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [metrics, setMetrics] = useState({
    categoryDistribution: {},
    timeDistribution: {},
    urgencyDistribution: {},
    averageSentiment: 0
  });

  // Process the initial data
  const processData = (csvData) => {
    return csvData.map(row => {
      // Extract category information
      let mainCategory = 'Other';
      let subCategory = 'General';
      
      if (row.category) {
        const categoryStr = row.category.replace(/[()]/g, '');
        const parts = categoryStr.split(',').map(part => part.trim().replace(/'/g, ''));
        if (parts.length === 2) {
          [mainCategory, subCategory] = parts;
        }
      }

      return {
        ...row,
        date: new Date(row.date),
        mainCategory,
        subCategory,
        urgency: row.urgency_level || 'Medium',
        sentiment: parseFloat(row.sentiment_score) || 0,
        body: row.body || row.content || ''  // Ensure we capture the email content
      };
    });
  };

  // Filter data based on selected category and date range
  const filteredData = useMemo(() => {
    console.log('Filtering with category:', selectedCategory); // Debug log
    return data.filter(item => {
      // Category filtering
      const categoryMatch = selectedCategory === 'all' || 
                          item.mainCategory.toLowerCase() === selectedCategory.toLowerCase();
      
      // Date filtering
      let dateMatch = true;
      if (dateRange.start && dateRange.end) {
        const itemDate = new Date(item.date);
        dateMatch = isWithinInterval(itemDate, {
          start: startOfDay(dateRange.start),
          end: endOfDay(dateRange.end)
        });
      }

      return categoryMatch && dateMatch;
    });
  }, [data, selectedCategory, dateRange]);

  // Calculate metrics based on filtered data
  const calculateMetrics = (data) => {
    const metrics = {
      categoryDistribution: {},
      timeDistribution: {},
      urgencyDistribution: {},
      averageSentiment: 0
    };

    let totalSentiment = 0;

    data.forEach(item => {
      // Category distribution
      const category = item.mainCategory || 'Other';
      metrics.categoryDistribution[category] = 
        (metrics.categoryDistribution[category] || 0) + 1;

      // Time distribution
      const dateKey = item.date.toISOString().split('T')[0];
      metrics.timeDistribution[dateKey] = 
        (metrics.timeDistribution[dateKey] || 0) + 1;

      // Urgency distribution
      const urgency = item.urgency || 'Medium';
      metrics.urgencyDistribution[urgency] = 
        (metrics.urgencyDistribution[urgency] || 0) + 1;

      // Sentiment
      totalSentiment += item.sentiment || 0;
    });

    metrics.averageSentiment = data.length ? totalSentiment / data.length : 0;
    
    return metrics;
  };

  // Update metrics when filtered data changes
  useMemo(() => {
    const newMetrics = calculateMetrics(filteredData);
    setMetrics(newMetrics);
  }, [filteredData]);

  // Handle file upload
  const handleFileUpload = (csvData, errorMessage) => {
    setLoading(true);
    setError(null);

    try {
      if (errorMessage) throw new Error(errorMessage);

      const processedData = processData(csvData);
      setData(processedData);
      
      // Reset filters when loading new data
      setSelectedCategory('all');
      setDateRange({ start: null, end: null });
      
      // Calculate initial metrics
      const initialMetrics = calculateMetrics(processedData);
      setMetrics(initialMetrics);
    } catch (err) {
      console.error('Error processing data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Debug log for categories
  console.log('Available categories:', Object.keys(metrics.categoryDistribution));
  console.log('Selected category:', selectedCategory);

  return (
    <div className="space-y-6 p-6">
      <FileUpload 
        onFileUpload={handleFileUpload}
        loading={loading}
        error={error}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {data.length > 0 && (
        <>
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

          <div className="bg-white rounded-lg shadow">
            <EmailTable data={filteredData} /> 
          </div>
        </>
      )}
    </div>
  );
};

export default SupportAnalytics;