import React from 'react';
import Navbar from './components/Navbar';
import MapView from './components/MapView';
import DetectionCard from './components/DetectionCard';
import StatsSummary from './components/StatsSummary';
import Sidebar from './components/Sidebar';
import ImageUpload from "./components/ImageUpload";
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 h-[500px]">
            <MapView />
          </div>
          <div className="flex flex-col space-y-4">
            <StatsSummary />
            <DetectionCard /> 
          </div>
          <div className="mt-4">
            <ImageUpload />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
