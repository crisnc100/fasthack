import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import colors from '@/constants/colors';
import { Meal, Restaurant } from '@/types';
import { useUserStore } from '@/store/userStore';
import { getRestaurantDistance } from '@/utils/location';

interface MealCardProps {
  meal: Meal;
  restaurant: Restaurant;
}

export default function MealCard({ meal, restaurant }: MealCardProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite, location } = useUserStore();
  const isFav = isFavorite(meal.id);
  
  const handlePress = () => {
    router.push(`/meal/${meal.id}`);
  };
  
  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(meal.id);
  };
  
  const distance = getRestaurantDistance(location, restaurant);
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: meal.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <Pressable 
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          hitSlop={10}
        >
          <Heart
            size={22}
            color={isFav ? colors.error : 'white'}
            fill={isFav ? colors.error : 'transparent'}
          />
        </Pressable>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{meal.name}</Text>
          <View style={styles.restaurantContainer}>
            <Image
              source={{ uri: restaurant.logo }}
              style={styles.restaurantLogo}
              contentFit="cover"
            />
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.distance}>{distance}</Text>
          </View>
        </View>
        
        <View style={styles.macros}>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{meal.macros.calories}</Text>
            <Text style={styles.macroLabel}>Cal</Text>
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
        
        <View style={styles.tags}>
          {meal.tags.slice(0, 2).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
          {meal.tags.length > 2 && (
            <Text style={styles.moreTags}>+{meal.tags.length - 2}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  restaurantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  restaurantName: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  distance: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 'auto',
  },
  macros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  macroLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.tagBackground,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: colors.tagText,
    fontWeight: '500',
  },
  moreTags: {
    fontSize: 12,
    color: colors.textLight,
    alignSelf: 'center',
  },
});