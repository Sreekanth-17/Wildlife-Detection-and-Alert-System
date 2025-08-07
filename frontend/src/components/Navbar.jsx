import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem('theme');
    if (storedMode === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <nav className="bg-green-900 text-white dark:bg-gray-900 dark:text-gray-100 p-4 shadow-md flex justify-between items-center transition-all duration-300">
      <div className="text-2xl font-bold">Wildlife Detector</div>
      <div className="space-x-4 flex items-center">
        <a href="#" className="hover:text-yellow-400 transition-colors">Home</a>
        <a href="#" className="hover:text-yellow-400 transition-colors">Map</a>
        <a href="#" className="hover:text-yellow-400 transition-colors">Alerts</a>
        <a href="#" className="hover:text-yellow-400 transition-colors">About</a>
        <button
          onClick={toggleDarkMode}
          className="ml-2 p-2 rounded bg-blue-600 hover:bg-blue-700 transition"
          title="Toggle Dark Mode"
        >
          {isDark ? (
            <SunIcon className="h-5 w-5 text-white" />
          ) : (
            <MoonIcon className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
