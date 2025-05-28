import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { MapPin } from 'lucide-react-native';
import colors from '@/constants/colors';
import { useUserStore } from '@/store/userStore';
import { getLocation } from '@/utils/location';

export default function LocationBar() {
  const { location, setLocation, isLocationPermissionGranted, setLocationPermission } = useUserStore();
  const [loading, setLoading] = useState(false);
  
  const fetchLocation = async () => {
    setLoading(true);
    try {
      const userLocation = await getLocation();
      if (userLocation) {
        setLocation(userLocation);
        setLocationPermission(true);
      }
    } catch (error) {
      console.log('Error fetching location:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (!location) {
      fetchLocation();
    }
  }, []);
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={fetchLocation}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.primary} />
      ) : (
        <>
          <MapPin size={18} color={colors.primary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {location?.address || 'Set your location'}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
});