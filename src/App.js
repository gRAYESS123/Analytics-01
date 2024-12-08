import React from 'react';
import './App.css';

import SupportAnalytics from './components/SupportAnalytics';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Support Analytics Dashboard</h1>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-6">  
        <div className="bg-white rounded-lg shadow p-6">
          <SupportAnalytics />
        </div>
      </main>
    </div>
  );
}

export default App;