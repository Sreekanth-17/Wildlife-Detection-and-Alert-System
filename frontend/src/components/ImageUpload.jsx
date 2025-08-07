// components/ImageUploader.jsx
import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [detections, setDetections] = useState([]);

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/detect", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setDetections(data.detections);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg w-full max-w-md mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Upload Image for Detection</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Upload & Detect
      </button>

      {detections.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">Detections:</h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            {detections.map((d, idx) => (
              <li key={idx}>
                {d.class} – Confidence: {d.confidence}, Box: [{d.bbox.join(", ")}]
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
