import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SentimentAnalysis = ({ averageSentiment }) => {
  const getSentimentColor = (score) => {
    if (score >= 0.5) return 'text-green-500';
    if (score >= 0) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getSentimentLabel = (score) => {
    if (score >= 0.5) return 'Positive';
    if (score >= 0) return 'Neutral';
    return 'Negative';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Sentiment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className={`text-4xl font-bold ${getSentimentColor(averageSentiment)}`}>
            {averageSentiment.toFixed(2)}
          </div>
          <div className="mt-2 text-lg text-gray-600">
            {getSentimentLabel(averageSentiment)}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Score range: -1 (Very Negative) to +1 (Very Positive)
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysis;