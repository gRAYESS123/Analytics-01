import { startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import React, { useState, useMemo } from 'react';
import './App.css';

import Dashboard from './Pages/Dashboard';
import EmailAnalytics from './Pages/EmailAnlaytics';
import FileUpload from './components/FileUpload/FileUpload';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' or 'emails'
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState({
    categoryDistribution: {},    // Initialize as empty object
    timeDistribution: {},       // Initialize as empty object
    urgencyDistribution: {},    // Initialize as empty object
    averageSentiment: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  // Process the initial data
  const processData = (csvData) => {
    return csvData.map(row => {
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
        body: row.body || row.content || ''
      };
    });
  };

  // Filter data based on selected category and date range
  const filteredData = useMemo(() => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Support Analytics Dashboard
            </h1>
            <div className="space-x-4">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'dashboard' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('emails')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'emails' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Email Analysis
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-6">  
        <div className="bg-white rounded-lg shadow p-6">
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
              {activeTab === 'dashboard' ? (
                <Dashboard 
                  data={data}
                  filteredData={filteredData}
                  metrics={metrics}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  setDateRange={setDateRange}
                />
              ) : (
                <EmailAnalytics 
                  filteredData={filteredData}
                  metrics={metrics}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  setDateRange={setDateRange}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;