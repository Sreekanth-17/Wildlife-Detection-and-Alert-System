import React from 'react';
import {
  ChartBarIcon,
  GlobeAltIcon,
  HomeIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

const StatsSummary = () => {
  const stats = {
    total: 1234,
    wild: 1134,
    domestic: 100,
    species: 17,
  };

  const statCards = [
    {
      label: 'Total Detections',
      value: stats.total,
      icon: <ChartBarIcon className="w-6 h-6 text-blue-500" />,
    },
    {
      label: 'Wild Animals',
      value: stats.wild,
      icon: <GlobeAltIcon className="w-6 h-6 text-green-500" />,
    },
    {
      label: 'Domestic Animals',
      value: stats.domestic,
      icon: <HomeIcon className="w-6 h-6 text-orange-500" />,
    },
    {
      label: 'Species Detected',
      value: stats.species,
      icon: <Squares2X2Icon className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">📊 Detection Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm transition hover:scale-[1.02] hover:shadow-md"
          >
            <div>{stat.icon}</div>
            <div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSummary;
