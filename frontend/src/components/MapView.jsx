import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = () => {
  const mapInstance = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapInstance.current && mapContainerRef.current) {
      mapInstance.current = L.map(mapContainerRef.current).setView([45.0, 135.0], 6);

      // 🗺️ Tile Layer with dark mode support
      const isDark = document.documentElement.classList.contains("dark");

      L.tileLayer(
        isDark
          ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors',
        }
      ).addTo(mapInstance.current);

      const marker = L.marker([45.0, 135.0]).addTo(mapInstance.current);
      marker.bindPopup('<b>Wildlife Detected</b><br>Amur Tiger at Zone A').openPopup();
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-[500px] rounded-md overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700">
      <div
        id="map"
        ref={mapContainerRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default MapView;
