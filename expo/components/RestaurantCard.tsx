import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Lock } from 'lucide-react-native';
import colors from '@/constants/colors';
import { Restaurant } from '@/types';
import { useUserStore } from '@/store/userStore';
import { getRestaurantDistance } from '@/utils/location';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const router = useRouter();
  const { location, preferences } = useUserStore();
  const { isPremium } = preferences;
  
  const isLocked = restaurant.isPremium && !isPremium;
  const distance = getRestaurantDistance(location, restaurant);
  
  const handlePress = () => {
    if (isLocked) {
      router.push('/premium');
    } else {
      router.push(`/restaurant/${restaurant.id}`);
    }
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: restaurant.logo }}
          style={styles.logo}
          contentFit="cover"
        />
        {isLocked && (
          <View style={styles.lockOverlay}>
            <Lock size={20} color="white" />
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
        <Text style={styles.distance}>{distance}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: 'center',
    marginRight: 16,
  },
  logoContainer: {
    position: 'relative',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.card,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: 8,
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  distance: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
});