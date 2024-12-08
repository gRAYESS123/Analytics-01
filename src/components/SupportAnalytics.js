import React, { useState } from 'react';
import FileUpload from './FileUpload/FileUpload';
import EmailTable from './EmailTable/EmailTable';
import CategoryBreakdown from './dashboard/CategoryBreakdown';
import Controls from './dashboard/Controls';

const SupportAnalytics = () => {
  // Define all state variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [metrics, setMetrics] = useState({
    categoryDistribution: {},
    timeDistribution: {}
  });

  const handleFileUpload = (csvData, errorMessage) => {
    setLoading(true);
    setError(null);

    try {
      if (errorMessage) throw new Error(errorMessage);

      const processedData = csvData.map(row => {
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
          sentiment: parseFloat(row.sentiment_score) || 0
        };
      });

      const categoryCount = processedData.reduce((acc, row) => {
        acc[row.mainCategory] = (acc[row.mainCategory] || 0) + 1;
        return acc;
      }, {});

      setData(processedData);
      setMetrics({
        categoryDistribution: categoryCount
      });
    } catch (err) {
      console.error('Error processing data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <FileUpload 
        onFileUpload={handleFileUpload}
        loading={loading}
        error={error}
      />

      {data.length > 0 && (
        <>
          <Controls 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={Object.keys(metrics.categoryDistribution)}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryBreakdown data={metrics.categoryDistribution} />
          </div>

          <div className="bg-white rounded-lg shadow">
            <EmailTable 
              data={data.filter(item => 
                selectedCategory === 'all' || item.mainCategory === selectedCategory
              )} 
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SupportAnalytics;