import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import Papa from 'papaparse';
import _ from 'lodash';

// Define colors outside the component
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Utility functions defined outside the component
const categorizeIssues = (content, subject = '') => {
  const text = `${content} ${subject}`.toLowerCase();
  const categories = {
    'WhatsApp Issues': ['whatsapp', 'what\'s app', 'whatapp', 'wa', 'otp'],
    'Refund Request': ['refund', 'money back', 'devuelv', 'reembolso', 'return', 'reimburse'],
    'Cancellation': ['cancel', 'unsubscribe', 'stop', 'remove', 'delete'],
    'Payment Issues': ['payment', 'charge', 'paid', 'billing', 'subscription', 'card'],
    'Technical Issues': ['technical', 'not working', 'error', 'issue', 'problem', 'help', 'fix'],
    'Account Access': ['login', 'password', 'access', 'cant log', 'reset', 'recover'],
    'Validation Issues': ['valid', 'invalid', 'activate', 'verification']
  };

  const scores = Object.entries(categories).map(([category, keywords]) => ({
    category,
    score: keywords.reduce((score, keyword) => 
      score + (text.includes(keyword) ? 1 : 0), 0)
  }));

  const bestMatch = _.maxBy(scores, 'score');
  return bestMatch.score > 0 ? bestMatch.category : 'Other';
};

const analyzeSentiment = (content = '') => {
  const positive = ['thank', 'good', 'great', 'excellent', 'appreciate', 'helpful'];
  const negative = ['bad', 'poor', 'terrible', 'unhappy', 'disappointed', 'awful'];
  
  const text = content.toLowerCase();
  const positiveScore = positive.reduce((score, word) => 
    score + (text.includes(word) ? 1 : 0), 0);
  const negativeScore = negative.reduce((score, word) => 
    score + (text.includes(word) ? 1 : 0), 0);
  
  return positiveScore > negativeScore ? 'Positive' : 
         negativeScore > positiveScore ? 'Negative' : 'Neutral';
};

const calculateResponseTimes = (emails) => {
  const threads = _.groupBy(emails, 'subject');
  const responseTimes = [];
  
  Object.values(threads).forEach(thread => {
    const sortedEmails = _.sortBy(thread, 'date');
    for(let i = 1; i < sortedEmails.length; i++) {
      const timeDiff = new Date(sortedEmails[i].date) - new Date(sortedEmails[i-1].date);
      responseTimes.push(timeDiff / (1000 * 60 * 60));
    }
  });
  
  return {
    avg: _.mean(responseTimes) || 0,
    min: _.min(responseTimes) || 0,
    max: _.max(responseTimes) || 0,
    median: responseTimes.length ? 
      _.sortBy(responseTimes)[Math.floor(responseTimes.length / 2)] : 0
  };
};

const SupportAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [analysisResults, setAnalysisResults] = useState({
    issueCategories: [],
    timeDistribution: [],
    responseStats: {},
    rawData: null,
    responseTimeTrend: [],
    priorityDistribution: [],
    languageAnalysis: [],
    interactionHistory: [],
    weekdayDistribution: [],
    sentimentAnalysis: [],
    threadLengthAnalysis: []
  });
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        transform: (value) => value.trim()
      });

      if (parsed.errors.length > 0) {
        throw new Error('CSV parsing failed: ' + parsed.errors[0].message);
      }

      const validEmails = parsed.data.filter(row => 
        row.sender && row.date && new Date(row.date).toString() !== 'Invalid Date'
      );

      if (validEmails.length === 0) {
        throw new Error('No valid data found in CSV');
      }

      setData(validEmails);
    } catch (err) {
      setError('Error processing file: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to filter data based on date range and category
  const filterData = (emails, startDate, endDate, category) => {
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
      analyzeData(filtered);
    }
  }, [data, dateRange, selectedCategory]);

  const analyzeData = (emails) => {
    try {
      const categories = emails.map(email => 
        categorizeIssues(email.body, email.subject));
      const categoryCounts = _.countBy(categories);
      const categoryData = Object.entries(categoryCounts)
        .map(([name, value]) => ({ 
          name, 
          value,
          percentage: ((value / emails.length) * 100).toFixed(1)
        }))
        .sort((a, b) => b.value - a.value);

      const hourCounts = _.countBy(emails, email => 
        new Date(email.date).getHours());
      const timeDistribution = Array.from({ length: 24 }, (_, hour) => ({
        hour,
        count: hourCounts[hour] || 0,
        percentage: (((hourCounts[hour] || 0) / emails.length) * 100).toFixed(1)
      }));

      const weekdayCounts = _.countBy(emails, email => 
        new Date(email.date).getDay());
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const weekdayDistribution = weekdays.map((day, index) => ({
        day,
        count: weekdayCounts[index] || 0,
        percentage: (((weekdayCounts[index] || 0) / emails.length) * 100).toFixed(1)
      }));

      const threads = _.groupBy(emails, 'subject');
      const threadLengths = Object.values(threads).map(thread => thread.length);
      const threadLengthData = _.countBy(threadLengths);
      const threadLengthAnalysis = Object.entries(threadLengthData)
        .map(([length, count]) => ({
          length: parseInt(length),
          count,
          percentage: ((count / Object.keys(threads).length) * 100).toFixed(1)
        }))
        .sort((a, b) => a.length - b.length);

      const sentiments = emails.map(email => analyzeSentiment(email.body));
      const sentimentCounts = _.countBy(sentiments);
      const sentimentAnalysis = Object.entries(sentimentCounts)
        .map(([sentiment, count]) => ({
          sentiment,
          count,
          percentage: ((count / emails.length) * 100).toFixed(1)
        }));

      setAnalysisResults({
        issueCategories: categoryData,
        timeDistribution,
        weekdayDistribution,
        threadLengthAnalysis,
        sentimentAnalysis,
        rawData: emails,
        responseStats: {
          totalEmails: emails.length,
          uniqueSenders: new Set(emails.map(e => e.sender)).size,
          avgThreadLength: _.mean(threadLengths).toFixed(1),
          responseTimes: calculateResponseTimes(emails)
        }
      });
    } catch (err) {
      setError('Error analyzing data: ' + err.message);
    }
  };

  const handleDateRangeChange = (type, value) => {
    setDateRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Sort the filtered data based on current sort configuration
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Support Email Analytics</h2>
        
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mb-4 block w-full text-sm text-gray-500 
            file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
            file:text-sm file:font-semibold file:bg-blue-50 
            file:text-blue-700 hover:file:bg-blue-100"
        />

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Filter</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {_.uniqBy(data.map(email => ({
                name: categorizeIssues(email.body, email.subject)
              })), 'name').map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input 
              type="date" 
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
              value={dateRange.start || ''}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input 
              type="date" 
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
              value={dateRange.end || ''}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
            />
          </div>
        </div>

        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-4">
            {error}
          </div>
        )}

        {filteredData.length > 0 && !loading && (
          <>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-700">Filtered Emails</h3>
                <p className="text-2xl">{analysisResults.responseStats.totalEmails}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-700">Unique Senders</h3>
                <p className="text-2xl">{analysisResults.responseStats.uniqueSenders}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-bold text-yellow-700">Avg Thread Length</h3>
                <p className="text-2xl">{analysisResults.responseStats.avgThreadLength}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-700">Median Response Time</h3>
                <p className="text-2xl">
                  {analysisResults.responseStats.responseTimes.median.toFixed(1)}h
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Issue Categories</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analysisResults.issueCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                      >
                        {analysisResults.issueCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">24-Hour Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analysisResults.timeDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Weekday Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analysisResults.weekdayDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Sentiment Analysis</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analysisResults.sentimentAnalysis}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ sentiment, percentage }) => `${sentiment} ${percentage}%`}
                      >
                        {analysisResults.sentimentAnalysis.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.sentiment === 'Positive' ? '#00C49F' : 
                                  entry.sentiment === 'Negative' ? '#FF8042' : '#FFBB28'} 
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-4">Thread Length Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analysisResults.threadLengthAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="length" 
                        label={{ value: 'Emails in Thread', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        label={{ value: 'Number of Threads', angle: -90, position: 'insideLeft', offset: -5 }} 
                      />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow col-span-2">
                <h3 className="font-bold mb-4">Email Data Explorer</h3>

                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-600">
                    Showing {filteredData.length} emails
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className={`px-3 py-1 rounded ${
                        sortConfig.direction === 'asc' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-700'
                      } hover:bg-gray-200`}
                      onClick={() => setSortConfig({ key: 'date', direction: 'asc' })}
                    >
                      Oldest First
                    </button>
                    <button 
                      className={`px-3 py-1 rounded ${
                        sortConfig.direction === 'desc' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-700'
                      } hover:bg-gray-200`}
                      onClick={() => setSortConfig({ key: 'date', direction: 'desc' })}
                    >
                      Newest First
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto max-h-96">
                  <table className="min-w-full table-auto">
                    <thead className="sticky top-0 bg-white">
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Sender</th>
                        <th className="px-4 py-2 text-left">Subject</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Sentiment</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Content</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData.map((email, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50`}>
                          <td className="px-4 py-2">{email.sender}</td>
                          <td className="px-4 py-2">{email.subject}</td>
                          <td className="px-4 py-2">
                            <span className="px-2 py-1 rounded-full text-xs font-medium" style={{
                              backgroundColor: COLORS[analysisResults.issueCategories.findIndex(
                                cat => cat.name === categorizeIssues(email.body, email.subject)
                              ) % COLORS.length] + '20',
                              color: COLORS[analysisResults.issueCategories.findIndex(
                                cat => cat.name === categorizeIssues(email.body, email.subject)
                              ) % COLORS.length]
                            }}>
                              {categorizeIssues(email.body, email.subject)}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              analyzeSentiment(email.body) === 'Positive' 
                                ? 'bg-green-100 text-green-800'
                                : analyzeSentiment(email.body) === 'Negative'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {analyzeSentiment(email.body)}
                            </span>
                          </td>
                          <td className="px-4 py-2">{new Date(email.date).toLocaleString()}</td>
                          <td className="px-4 py-2">
                            <div className="max-w-md">
                              <div className="text-sm text-gray-600 whitespace-pre-wrap break-words max-h-32 overflow-y-auto">
                                {email.body}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SupportAnalytics;