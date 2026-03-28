import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { MapPin } from 'lucide-react-native';
import { useMealStore } from '@/store/mealStore';
import { useUserStore } from '@/store/userStore';
import MealCard from '@/components/MealCard';
import EmptyState from '@/components/EmptyState';
import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorDisplay from '@/components/ErrorDisplay';
import colors from '@/constants/colors';
import { getRestaurantDistance } from '@/utils/location';

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getRestaurantById, getMealsByRestaurant, isLoading, error, fetchData } = useMealStore();
  const { location } = useUserStore();
  
  useEffect(() => {
    // Ensure data is loaded
    if (!isLoading && !error && getRestaurantById(id) === undefined) {
      fetchData();
    }
  }, [id]);
  
  if (isLoading) {
    return <LoadingIndicator message="Loading restaurant details..." />;
  }
  
  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchData} />;
  }
  
  const restaurant = getRestaurantById(id);
  const meals = restaurant ? getMealsByRestaurant(restaurant.id) : [];
  
  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Restaurant not found</Text>
      </View>
    );
  }
  
  const distance = getRestaurantDistance(location, restaurant);
  
  const renderMealItem = ({ item }: { item: any }) => {
    return (
      <MealCard meal={item} restaurant={restaurant} />
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.restaurantInfo}>
          <Image
            source={{ uri: restaurant.logo }}
            style={styles.logo}
            contentFit="cover"
          />
          <View style={styles.infoContent}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <View style={styles.addressContainer}>
              <MapPin size={14} color={colors.textLight} />
              <Text style={styles.address} numberOfLines={1}>
                {restaurant.location.address || 'No address available'} • {distance}
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
        contentContainerStyle={styles.mealsList}
        ListHeaderComponent={() => (
          <Text style={styles.sectionTitle}>Available Meal Hacks</Text>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No meals available"
            message="We couldn't find any meal hacks for this restaurant."
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    marginTop: 16,
  },
  mealsList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginTop: 24,
  },
});