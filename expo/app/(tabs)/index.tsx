import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMealStore } from '@/store/mealStore';
import { useUserStore } from '@/store/userStore';
import LocationBar from '@/components/LocationBar';
import TagFilter from '@/components/TagFilter';
import MealCard from '@/components/MealCard';
import RestaurantCard from '@/components/RestaurantCard';
import PremiumBanner from '@/components/PremiumBanner';
import EmptyState from '@/components/EmptyState';
import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorDisplay from '@/components/ErrorDisplay';
import colors from '@/constants/colors';

export default function DiscoverScreen() {
  const { 
    meals, 
    restaurants, 
    filteredMeals, 
    nearbyRestaurants, 
    isLoading, 
    error,
    fetchData,
    filterMealsByTags, 
    updateNearbyRestaurants, 
    getRestaurantById 
  } = useMealStore();
  
  const { location, preferences } = useUserStore();
  const { selectedTags, isPremium } = preferences;
  
  useEffect(() => {
    // Fetch data on component mount
    fetchData();
  }, []);
  
  useEffect(() => {
    if (location && restaurants.length > 0) {
      updateNearbyRestaurants(location);
    }
  }, [location, restaurants]);
  
  useEffect(() => {
    if (meals.length > 0) {
      filterMealsByTags(selectedTags, isPremium);
    }
  }, [selectedTags, isPremium, meals]);
  
  const handleTagsChange = (tags: string[]) => {
    filterMealsByTags(tags, isPremium);
  };
  
  const renderMealItem = ({ item }: { item: any }) => {
    const restaurant = getRestaurantById(item.restaurantId);
    if (!restaurant) return null;
    
    return (
      <MealCard meal={item} restaurant={restaurant} />
    );
  };
  
  if (isLoading) {
    return <LoadingIndicator message="Finding healthy meal options..." />;
  }
  
  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchData} />;
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>FastHack</Text>
        <Text style={styles.subtitle}>Healthier fast food near you</Text>
      </View>
      
      <LocationBar />
      
      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
        contentContainerStyle={styles.mealsList}
        ListHeaderComponent={() => (
          <>
            <TagFilter onTagsChange={handleTagsChange} />
            
            {!isPremium && (
              <PremiumBanner />
            )}
            
            <View style={styles.restaurantsSection}>
              <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.restaurantsList}
              >
                {nearbyRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </ScrollView>
            </View>
            
            <Text style={styles.sectionTitle}>Recommended Meals</Text>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No meals found"
            message={
              selectedTags.length > 0
                ? "Try adjusting your filters to find more options."
                : "We couldn't find any meals near you. Try changing your location."
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  mealsList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  restaurantsSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginLeft: 16,
  },
  restaurantsList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
});