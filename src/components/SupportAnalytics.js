import React, { useState } from 'react';
import IssueCategories from '../charts/IssueCategories';
import TimeDistribution from '../charts/TimeDistribution';
import MetricsHeader from '../MetricsHeader/MetricsHeader';
import EmailTable from '../EmailTable/EmailTable';
import FileUpload from '../FileUpload/FileUpload';
import DateRangeFilter from '../Filters/DateRangeFilter';
import CategoryFilter from '../Filters/CategoryFilter';
import { useEmailAnalytics } from '../../hooks/useEmailAnalytics';

const SupportAnalytics = () => {
  // State management
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  
  // Use custom hook for data analysis
  const { filteredData, analysisResults } = useEmailAnalytics(
    data, 
    dateRange, 
    selectedCategory
  );

  // File upload handler
  const handleFileUpload = (parsedData, errorMessage) => {
    setLoading(true);
    setError(null);
    
    try {
      if (errorMessage) {
        throw new Error(errorMessage);
      }
      setData(parsedData);
    } catch (err) {
      setError('Error processing file: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Date range handler
  const handleDateRangeChange = (type, value) => {
    setDateRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Export data as CSV
  const handleExportCSV = () => {
    if (!filteredData.length) return;

    const headers = ['sender', 'subject', 'date', 'category', 'sentiment', 'body'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => 
        headers.map(header => 
          JSON.stringify(row[header] || '')
        ).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'support_analytics_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Support Email Analytics</h2>
          {filteredData.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100"
            >
              Export Data
            </button>
          )}
        </div>

        <FileUpload
          onFileUpload={handleFileUpload}
          loading={loading}
          error={error}
        />

        {filteredData.length > 0 && !loading && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <CategoryFilter
                data={data}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <DateRangeFilter
                dateRange={dateRange}
                onDateChange={handleDateRangeChange}
              />
            </div>

            <MetricsHeader stats={analysisResults.responseStats} />

            <div className="grid grid-cols-2 gap-6 mb-6">
              <IssueCategories data={analysisResults.issueCategories} />
              <TimeDistribution data={analysisResults.timeDistribution} />
              
              {/* Additional charts can be added here */}
              {/* <WeekdayDistribution data={analysisResults.weekdayDistribution} /> */}
              {/* <SentimentAnalysis data={analysisResults.sentimentAnalysis} /> */}
            </div>

            <EmailTable
              data={filteredData}
              sortConfig={sortConfig}
              onSortChange={setSortConfig}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SupportAnalytics;