import React from "react";
import {
  MapIcon,
  Cog8ToothIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="bg-white dark:bg-gray-900 w-64 h-screen p-6 shadow-lg transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">📍 Dashboard</h2>
      <ul className="space-y-4">
        <li className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 cursor-pointer transition">
          <MapIcon className="w-5 h-5" />
          <span>Map</span>
        </li>
        <li className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 cursor-pointer transition">
          <ExclamationTriangleIcon className="w-5 h-5" />
          <span>Detections</span>
        </li>
        <li className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 cursor-pointer transition">
          <Cog8ToothIcon className="w-5 h-5" />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
