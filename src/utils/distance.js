// Haversine distance between two lat/lon points (in kilometers)
export function calculateDistance(cityA, cityB) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // Radius of Earth in km
  const dLat = toRad(cityB.lat - cityA.lat);
  const dLon = toRad(cityB.lon - cityA.lon);
  const lat1 = toRad(cityA.lat);
  const lat2 = toRad(cityB.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}