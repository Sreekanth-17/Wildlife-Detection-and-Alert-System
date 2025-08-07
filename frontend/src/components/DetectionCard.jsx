import React from "react";

const DetectionCard = () => {
  const data = [
    { id: 1, species: "Tiger", location: "Zone A", time: "10:32 AM" },
    { id: 2, species: "Leopard Cat", location: "Zone B", time: "11:15 AM" },
  ];

  const sendAlert = async (species, location, time) => {
    const payload = { species, location, time };

    try {
      const response = await fetch("http://localhost:5000/send-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        alert("Alert sent successfully!");
      } else {
        alert("Failed to send alert.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending alert");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg p-6 h-full overflow-y-auto transition duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center"> Recent Detections</h2>

      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <p className="text-lg font-semibold">{item.species}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                 {item.location} • {item.time}
              </p>
            </div>
            <button
              onClick={() => sendAlert(item.species, item.location, item.time)}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded shadow-md transition"
            >
              Send Alert
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetectionCard;
