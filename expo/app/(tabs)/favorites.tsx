import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMealStore } from '@/store/mealStore';
import { useUserStore } from '@/store/userStore';
import MealCard from '@/components/MealCard';
import EmptyState from '@/components/EmptyState';
import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorDisplay from '@/components/ErrorDisplay';
import colors from '@/constants/colors';

export default function FavoritesScreen() {
  const { getMealById, getRestaurantById, isLoading, error, fetchData } = useMealStore();
  const { favorites } = useUserStore();
  
  useEffect(() => {
    // Ensure data is loaded
    if (!isLoading && !error && getMealById(favorites[0]) === undefined) {
      fetchData();
    }
  }, []);
  
  if (isLoading) {
    return <LoadingIndicator message="Loading your favorites..." />;
  }
  
  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchData} />;
  }
  
  const favoriteMeals = favorites.map(id => {
    const meal = getMealById(id);
    if (!meal) return null;
    
    const restaurant = getRestaurantById(meal.restaurantId);
    if (!restaurant) return null;
    
    return { meal, restaurant };
  }).filter(Boolean);
  
  const renderMealItem = ({ item }: { item: any }) => {
    return (
      <MealCard meal={item.meal} restaurant={item.restaurant} />
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>Your saved meal hacks</Text>
      </View>
      
      <FlatList
        data={favoriteMeals}
        keyExtractor={(item) => item.meal.id}
        renderItem={renderMealItem}
        contentContainerStyle={styles.mealsList}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No favorites yet"
            message="Save your favorite meal hacks to access them quickly later."
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
    paddingBottom: 16,
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
});