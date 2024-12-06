import { useState, useEffect, useMemo } from 'react';
import { analyzeEmailData, categorizeIssues } from '../utils/analytics';

export const useEmailAnalytics = (data, dateRange, selectedCategory) => {
  const [filteredData, setFilteredData] = useState([]);
  const [analysisResults, setAnalysisResults] = useState({
    issueCategories: [],
    timeDistribution: [],
    weekdayDistribution: [],
    threadLengthAnalysis: [],
    sentimentAnalysis: [],
    responseStats: {}
  });

  // Memoized filter function to prevent unnecessary recalculations
  const filterData = useMemo(() => {
    return (emails, startDate, endDate, category) => {
      let filtered = emails;

      if (startDate) {
        filtered = filtered.filter(email => new Date(email.date) >= startDate);
      }
      
      if (endDate) {
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        filtered = filtered.filter(email => new Date(email.date) <= endOfDay);
      }

      if (category && category !== 'All') {
        filtered = filtered.filter(email => 
          categorizeIssues(email.body, email.subject) === category);
      }

      return filtered;
    };
  }, []);

  // Update analysis when filters change
  useEffect(() => {
    if (data.length > 0) {
      const filtered = filterData(
        data, 
        dateRange.start ? new Date(dateRange.start) : null,
        dateRange.end ? new Date(dateRange.end) : null,
        selectedCategory
      );
      setFilteredData(filtered);
      
      const results = analyzeEmailData(filtered);
      setAnalysisResults(results);
    }
  }, [data, dateRange, selectedCategory, filterData]);

  return { filteredData, analysisResults };
};

export default useEmailAnalytics;