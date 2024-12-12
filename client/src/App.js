import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Support Analytics Dashboard</h1>
          <Routes>
            <Route path="/" element={<div>Dashboard Home</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;