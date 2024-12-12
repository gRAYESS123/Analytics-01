import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmailAnalytics from './pages/EmailAnalytics';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/email-analytics" element={<EmailAnalytics />} />
      </Routes>
    </Layout>
  );
}

export default App;