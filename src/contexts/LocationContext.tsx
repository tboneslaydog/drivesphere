import React, { createContext, useContext, useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  timestamp: number;
  speed?: number;
  heading?: number;
}

interface Route {
  id: string;
  name: string;
  locations: Location[];
  startTime: number;
  endTime: number;
  totalDistance: number;
  averageSpeed: number;
  maxSpeed: number;
  isPublic: boolean;
  userId: string;
  username: string;
  likes: number;
  comments: number;
}

interface LocationContextType {
  currentLocation: Location | null;
  isTracking: boolean;
  currentRoute: Location[];
  routes: Route[];
  startTracking: () => void;
  stopTracking: () => void;
  saveRoute: (name: string, isPublic: boolean) => void;
  getLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<Location[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: Date.now(),
            speed: position.coords.speed || undefined,
            heading: position.coords.heading || undefined
          };
          setCurrentLocation(location);
          
          if (isTracking) {
            setCurrentRoute(prev => [...prev, location]);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
    const interval = setInterval(getLocation, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, [isTracking]);

  const startTracking = () => {
    setIsTracking(true);
    setCurrentRoute([]);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  const saveRoute = (name: string, isPublic: boolean) => {
    if (currentRoute.length === 0) return;

    const startTime = currentRoute[0].timestamp;
    const endTime = currentRoute[currentRoute.length - 1].timestamp;
    const totalDistance = calculateTotalDistance(currentRoute);
    const averageSpeed = calculateAverageSpeed(currentRoute);
    const maxSpeed = Math.max(...currentRoute.map(loc => loc.speed || 0));

    const newRoute: Route = {
      id: Date.now().toString(),
      name,
      locations: [...currentRoute],
      startTime,
      endTime,
      totalDistance,
      averageSpeed,
      maxSpeed,
      isPublic,
      userId: '1',
      username: 'DriverUser',
      likes: 0,
      comments: 0
    };

    setRoutes(prev => [newRoute, ...prev]);
    setCurrentRoute([]);
  };

  const calculateTotalDistance = (locations: Location[]): number => {
    let total = 0;
    for (let i = 1; i < locations.length; i++) {
      const prev = locations[i - 1];
      const curr = locations[i];
      total += getDistanceFromLatLonInKm(
        prev.latitude, prev.longitude,
        curr.latitude, curr.longitude
      );
    }
    return total;
  };

  const calculateAverageSpeed = (locations: Location[]): number => {
    const speeds = locations.map(loc => loc.speed || 0).filter(speed => speed > 0);
    return speeds.length > 0 ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;
  };

  const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };

  const value = {
    currentLocation,
    isTracking,
    currentRoute,
    routes,
    startTracking,
    stopTracking,
    saveRoute,
    getLocation
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
