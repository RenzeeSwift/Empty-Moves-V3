import React from "react";
import { exportToCSV } from "../utils/csvExport";

export default function ExportButton({
  sourceCity,
  destCity,
  distance,
  isAvailable,
}) {
  const handleExport = () => {
    if (sourceCity && destCity && distance !== null) {
      exportToCSV([
        {
          Source: sourceCity.name,
          Destination: destCity.name,
          "Source Lat": sourceCity.lat,
          "Source Lon": sourceCity.lon,
          "Dest Lat": destCity.lat,
          "Dest Lon": destCity.lon,
          Distance: distance,
          Available: isAvailable ? "Yes" : "No",
        },
      ]);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={!(sourceCity && destCity && distance !== null)}
      className="export-btn"
    >
      Export as CSV
    </button>
  );
}