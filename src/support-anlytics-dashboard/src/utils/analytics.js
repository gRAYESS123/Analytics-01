import _ from 'lodash';

export const categorizeIssues = (content, subject = '') => {
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

export const analyzeSentiment = (content = '') => {
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

export const calculateResponseTimes = (emails) => {
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

export const analyzeEmailData = (emails) => {
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

  return {
    issueCategories: categoryData,
    timeDistribution,
    weekdayDistribution,
    threadLengthAnalysis,
    sentimentAnalysis,
    responseStats: {
      totalEmails: emails.length,
      uniqueSenders: new Set(emails.map(e => e.sender)).size,
      avgThreadLength: _.mean(threadLengths).toFixed(1),
      responseTimes: calculateResponseTimes(emails)
    }
  };
};