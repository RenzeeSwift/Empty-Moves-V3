import React, { useState, useEffect } from "react";
import CitySelector from "./components/CitySelector";
import MapView from "./components/MapView";
import ExportButton from "./components/ExportButton";
import cities from "./data/cities";
import { calculateDistance } from "./utils/distance";
import {
  subscribeRoutes,
  addRoute,
  updateRouteAvailability,
} from "./utils/firestore";

export default function App() {
  const [sourceCity, setSourceCity] = useState(null);
  const [destCity, setDestCity] = useState(null);
  const [routes, setRoutes] = useState([]);

  // Subscribe to Firestore routes
  useEffect(() => {
    const unsubscribe = subscribeRoutes(setRoutes);
    return unsubscribe;
  }, []);

  const handleSourceChange = (cityName) => {
    setSourceCity(cities.find((c) => c.name === cityName));
    setDestCity(null);
  };

  const handleDestChange = (cityName) => {
    setDestCity(cities.find((c) => c.name === cityName));
  };

  const handleSetAvailable = async () => {
    if (sourceCity && destCity) {
      // Check if route exists
      const existing = routes.find(
        (r) =>
          r.source === sourceCity.name && r.destination === destCity.name
      );
      if (existing) {
        await updateRouteAvailability(existing.id, true);
      } else {
        await addRoute(sourceCity.name, destCity.name, true);
      }
    }
  };

  const handleSetUnavailable = async () => {
    if (sourceCity && destCity) {
      const existing = routes.find(
        (r) =>
          r.source === sourceCity.name && r.destination === destCity.name
      );
      if (existing) {
        await updateRouteAvailability(existing.id, false);
      }
    }
  };

  const isAvailable =
    sourceCity &&
    destCity &&
    routes.some(
      (r) =>
        r.source === sourceCity.name &&
        r.destination === destCity.name &&
        r.available
    );

  const distance =
    sourceCity && destCity
      ? calculateDistance(sourceCity, destCity).toFixed(2)
      : null;

  return (
    <div className="container">
      <h1>City Route Mapper</h1>
      <div className="selectors">
        <CitySelector
          cities={cities}
          selectedCity={sourceCity?.name}
          onChange={handleSourceChange}
          label="Select Source City"
        />
        <CitySelector
          cities={cities.filter((c) => c.name !== sourceCity?.name)}
          selectedCity={destCity?.name}
          onChange={handleDestChange}
          label="Select Destination City"
          disabled={!sourceCity}
        />
      </div>
      <div className="map-section">
        <MapView
          cities={cities}
          sourceCity={sourceCity}
          destCity={destCity}
          routes={routes}
        />
      </div>
      {distance && (
        <div className="distance-info">
          <p>
            Distance from <b>{sourceCity.name}</b> to <b>{destCity.name}</b>:{" "}
            <b>{distance} km</b>
          </p>
          <p>
            Availability:{" "}
            <b style={{ color: isAvailable ? "green" : "red" }}>
              {isAvailable ? "Available" : "Unavailable"}
            </b>
          </p>
          <button onClick={handleSetAvailable} disabled={isAvailable}>
            Set Available
          </button>
          <button
            onClick={handleSetUnavailable}
            disabled={!isAvailable}
            style={{ marginLeft: 8 }}
          >
            Set Unavailable
          </button>
        </div>
      )}
      <ExportButton
        sourceCity={sourceCity}
        destCity={destCity}
        distance={distance}
        isAvailable={isAvailable}
      />
    </div>
  );
}