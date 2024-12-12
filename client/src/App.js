import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import EmailAnalytics from './Pages/EmailAnlaytics';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-full">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/email-analytics" element={<EmailAnalytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;