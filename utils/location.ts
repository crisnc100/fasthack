import { Platform } from 'react-native';
import * as Location from 'expo-location';
import { Restaurant, UserLocation } from '@/types';

export const getCurrentLocation = async (): Promise<UserLocation | null> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Get address from coordinates
    let address;
    try {
      const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (geocode && geocode.length > 0) {
        const { city, region, street, streetNumber } = geocode[0];
        address = `${streetNumber ? streetNumber + ' ' : ''}${street ? street + ', ' : ''}${city ? city + ', ' : ''}${region || ''}`;
      }
    } catch (error) {
      console.log('Error getting address:', error);
    }

    return { latitude, longitude, address };
  } catch (error) {
    console.log('Error getting location:', error);
    return null;
  }
};

export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};

export const getRestaurantsNearby = (
  userLocation: UserLocation,
  restaurants: Restaurant[],
  maxDistance: number = 10 // km
): Restaurant[] => {
  if (!userLocation) return [];
  
  return restaurants.filter(restaurant => {
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      restaurant.location.latitude,
      restaurant.location.longitude
    );
    return distance <= maxDistance;
  }).sort((a, b) => {
    const distanceA = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      a.location.latitude,
      a.location.longitude
    );
    const distanceB = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      b.location.latitude,
      b.location.longitude
    );
    return distanceA - distanceB;
  });
};

export const getRestaurantDistance = (
  userLocation: UserLocation | null,
  restaurant: Restaurant
): string => {
  if (!userLocation) return 'Unknown';
  
  const distance = calculateDistance(
    userLocation.latitude,
    userLocation.longitude,
    restaurant.location.latitude,
    restaurant.location.longitude
  );
  
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)}m`;
  }
  
  return `${distance.toFixed(1)}km`;
};

// Mock location for web platform
export const getMockLocation = (): UserLocation => {
  return {
    latitude: 37.7749,
    longitude: -122.4194,
    address: 'San Francisco, CA'
  };
};

// Get location based on platform
export const getLocation = async (): Promise<UserLocation | null> => {
  if (Platform.OS === 'web') {
    return getMockLocation();
  }
  
  return getCurrentLocation();
};