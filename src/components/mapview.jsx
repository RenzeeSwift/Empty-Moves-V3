import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ cities, sourceCity, destCity, routes = [] }) {
  useEffect(() => {
    if (window.map) {
      window.map.remove();
      window.map = null;
    }
    const center = sourceCity
      ? [sourceCity.lat, sourceCity.lon]
      : [cities[0].lat, cities[0].lon];

    const map = L.map("map", {
      center,
      zoom: 4,
      attributionControl: false,
    });

    window.map = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);

    cities.forEach((city) => {
      const isSource = sourceCity && city.name === sourceCity.name;
      const isDest = destCity && city.name === destCity.name;
      const marker = L.circleMarker([city.lat, city.lon], {
        radius: isSource || isDest ? 10 : 6,
        color: isSource ? "green" : isDest ? "red" : "#0055cc",
        fillColor: isSource ? "green" : isDest ? "red" : "#3399ff",
        fillOpacity: 0.8,
      }).addTo(map);
      marker.bindTooltip(city.name);
    });

    // Draw all available routes as lines
    routes
      .filter((r) => r.available)
      .forEach((r) => {
        const from = cities.find((c) => c.name === r.source);
        const to = cities.find((c) => c.name === r.destination);
        if (from && to) {
          L.polyline(
            [
              [from.lat, from.lon],
              [to.lat, to.lon],
            ],
            {
              color:
                sourceCity &&
                destCity &&
                r.source === sourceCity.name &&
                r.destination === destCity.name
                  ? "orange"
                  : "#00bb77",
              weight:
                sourceCity &&
                destCity &&
                r.source === sourceCity.name &&
                r.destination === destCity.name
                  ? 5
                  : 3,
              opacity: 0.7,
            }
          ).addTo(map);
        }
      });

    return () => {
      map.remove();
      window.map = null;
    };
  }, [cities, sourceCity, destCity, routes]);

  return <div id="map" style={{ height: "400px", width: "100%" }} />;
}
