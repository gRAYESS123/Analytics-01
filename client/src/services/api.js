import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api'
});

export const getTicketAnalytics = async (startDate, endDate) => {
  const response = await api.get('/analytics/tickets', {
    params: { startDate, endDate }
  });
  return response.data;
};

export const getAgentPerformance = async (startDate, endDate) => {
  const response = await api.get('/analytics/agent-performance', {
    params: { startDate, endDate }
  });
  return response.data;
};

export const getEmailAnalytics = async (startDate, endDate) => {
  const response = await api.get('/analytics/email', {
    params: { startDate, endDate }
  });
  return response.data;
};