import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Heart, MapPin } from 'lucide-react-native';
import { useMealStore } from '@/store/mealStore';
import { useUserStore } from '@/store/userStore';
import colors from '@/constants/colors';
import { getRestaurantDistance } from '@/utils/location';
import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorDisplay from '@/components/ErrorDisplay';

export default function MealDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getMealById, getRestaurantById, isLoading, error, fetchData } = useMealStore();
  const { isFavorite, toggleFavorite, location } = useUserStore();
  
  useEffect(() => {
    // Ensure data is loaded
    if (!isLoading && !error && getMealById(id) === undefined) {
      fetchData();
    }
  }, [id]);
  
  if (isLoading) {
    return <LoadingIndicator message="Loading meal details..." />;
  }
  
  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchData} />;
  }
  
  const meal = getMealById(id);
  const restaurant = meal ? getRestaurantById(meal.restaurantId) : null;
  
  if (!meal || !restaurant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Meal not found</Text>
      </View>
    );
  }
  
  const isFav = isFavorite(meal.id);
  const distance = getRestaurantDistance(location, restaurant);
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: meal.image }}
          style={styles.image}
          contentFit="cover"
        />
      </View>
      
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{meal.name}</Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(meal.id)}
          >
            <Heart
              size={24}
              color={isFav ? colors.error : colors.textLight}
              fill={isFav ? colors.error : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.description}>{meal.description}</Text>
        
        <View style={styles.restaurantContainer}>
          <Image
            source={{ uri: restaurant.logo }}
            style={styles.restaurantLogo}
            contentFit="cover"
          />
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.distanceContainer}>
            <MapPin size={14} color={colors.textLight} />
            <Text style={styles.distance}>{distance}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.macrosContainer}>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{meal.macros.calories}</Text>
          <Text style={styles.macroLabel}>Calories</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{meal.macros.protein}g</Text>
          <Text style={styles.macroLabel}>Protein</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{meal.macros.carbs}g</Text>
          <Text style={styles.macroLabel}>Carbs</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{meal.macros.fat}g</Text>
          <Text style={styles.macroLabel}>Fat</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How to Order</Text>
        <Text style={styles.orderInstructions}>{meal.orderingInstructions || meal.description}</Text>
      </View>
      
      {meal.ingredients.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsList}>
            {meal.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dietary Tags</Text>
        <View style={styles.tagsList}>
          {meal.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 32,
  },
  imageContainer: {
    height: 250,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  header: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    marginRight: 16,
  },
  favoriteButton: {
    padding: 4,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 16,
  },
  restaurantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  restaurantLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  distance: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 4,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.card,
    paddingVertical: 16,
    marginBottom: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  macroLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  orderInstructions: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  ingredientsList: {
    gap: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: colors.text,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.tagBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: colors.tagText,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginTop: 24,
  },
});