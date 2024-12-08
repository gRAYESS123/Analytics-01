import { useMemo } from 'react';

const useEmailAnalytics = (data, dateRange, selectedCategory) => {
  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.filter(email => {
      const categoryMatch = selectedCategory === 'All' || email.category === selectedCategory;
      const emailDate = new Date(email.date);
      const dateMatch = (!dateRange.start || emailDate >= new Date(dateRange.start)) &&
                       (!dateRange.end || emailDate <= new Date(dateRange.end));
      return categoryMatch && dateMatch;
    });
  }, [data, dateRange, selectedCategory]);

  const analysisResults = useMemo(() => {
    const responseStats = {
      total: filteredData.length,
      avgResponseTime: 0,
      median: 0
    };

    const issueCategories = filteredData.reduce((acc, email) => {
      acc[email.category] = (acc[email.category] || 0) + 1;
      return acc;
    }, {});

    const timeDistribution = filteredData.reduce((acc, email) => {
      const hour = new Date(email.date).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});

    return {
      responseStats,
      issueCategories,
      timeDistribution
    };
  }, [filteredData]);

  return { filteredData, analysisResults };
};

export default useEmailAnalytics;