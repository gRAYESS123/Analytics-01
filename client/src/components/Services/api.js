import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const getTicketAnalytics = async (startDate, endDate) => {
  const response = await axios.get(`${API_URL}/api/analytics/tickets`, {
    params: { startDate, endDate }
  });
  return response.data;
};

export const getAgentPerformance = async (startDate, endDate) => {
  const response = await axios.get(`${API_URL}/api/analytics/agent-performance`, {
    params: { startDate, endDate }
  });
  return response.data;
};

export const getEmailAnalytics = async (startDate, endDate) => {
  const response = await axios.get(`${API_URL}/api/analytics/email`, {
    params: { startDate, endDate }
  });
  return response.data;
};