import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ChartBarIcon } from '@heroicons/react/24/outline';

function Sidebar() {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Email Analytics', href: '/email-analytics', icon: ChartBarIcon },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Support Analytics</h1>
      </div>
      <nav>
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center p-2 rounded-lg mb-2 ${location.pathname === item.href ? 'bg-gray-900' : 'hover:bg-gray-700'}`}
            >
              <Icon className="h-6 w-6 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;