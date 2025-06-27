import { collection, addDoc, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

// Collection name
const ROUTES_COLLECTION = "routes";

// Fetch all routes with real-time updates
export function subscribeRoutes(callback) {
  return onSnapshot(collection(db, ROUTES_COLLECTION), (snapshot) => {
    const routes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(routes);
  });
}

// Add a new route
export async function addRoute(source, destination, available = true) {
  await addDoc(collection(db, ROUTES_COLLECTION), {
    source,
    destination,
    available,
  });
}

// Update route availability
export async function updateRouteAvailability(routeId, available) {
  const routeRef = doc(db, ROUTES_COLLECTION, routeId);
  await updateDoc(routeRef, { available });
}