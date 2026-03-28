import { create } from 'zustand';
import { Meal, Restaurant, UserLocation } from '@/types';
import { getRestaurantsNearby } from '@/utils/location';
import { useUserStore } from './userStore';
import { fetchMeals, fetchRestaurants } from '@/services/mealService';

interface MealState {
  meals: Meal[];
  restaurants: Restaurant[];
  filteredMeals: Meal[];
  nearbyRestaurants: Restaurant[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchData: () => Promise<void>;
  filterMealsByTags: (tags: string[], isPremium: boolean) => void;
  updateNearbyRestaurants: (location: UserLocation) => void;
  getMealById: (id: string) => Meal | undefined;
  getRestaurantById: (id: string) => Restaurant | undefined;
  getMealsByRestaurant: (restaurantId: string) => Meal[];
}

export const useMealStore = create<MealState>()((set, get) => ({
  meals: [],
  restaurants: [],
  filteredMeals: [],
  nearbyRestaurants: [],
  isLoading: false,
  error: null,
  
  fetchData: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Fetch meals and restaurants from backend or fallback to mocks
      const [mealsData, restaurantsData] = await Promise.all([
        fetchMeals(),
        fetchRestaurants()
      ]);
      
      // Update state with fetched data
      set({ 
        meals: mealsData, 
        restaurants: restaurantsData, 
        filteredMeals: mealsData,
        isLoading: false 
      });
      
      // Update nearby restaurants if location is available
      const location = useUserStore.getState().location;
      if (location) {
        get().updateNearbyRestaurants(location);
      }
      
      // Apply any existing filters
      const { selectedTags, isPremium } = useUserStore.getState().preferences;
      if (selectedTags.length > 0) {
        get().filterMealsByTags(selectedTags, isPremium);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      set({ 
        isLoading: false, 
        error: 'Failed to load meal data. Please try again.' 
      });
    }
  },
  
  filterMealsByTags: (tags, isPremium) => {
    const allMeals = get().meals;
    
    // If no tags selected, show all meals (respecting premium status)
    if (tags.length === 0) {
      const filtered = isPremium 
        ? allMeals 
        : allMeals.filter(meal => !meal.isPremium);
      
      set({ filteredMeals: filtered });
      return;
    }
    
    // Filter meals by selected tags
    const filtered = allMeals.filter(meal => {
      // Skip premium meals for non-premium users
      if (!isPremium && meal.isPremium) return false;
      
      // Check if meal has at least one of the selected tags
      return tags.some(tag => meal.tags.includes(tag));
    });
    
    set({ filteredMeals: filtered });
  },
  
  updateNearbyRestaurants: (location) => {
    const isPremium = useUserStore.getState().preferences.isPremium;
    const allRestaurants = get().restaurants;
    
    // Get nearby restaurants
    const nearby = getRestaurantsNearby(location, allRestaurants);
    
    // Filter out premium restaurants for non-premium users
    const filtered = isPremium 
      ? nearby 
      : nearby.filter(restaurant => !restaurant.isPremium);
    
    set({ nearbyRestaurants: filtered });
  },
  
  getMealById: (id) => {
    return get().meals.find(meal => meal.id === id);
  },
  
  getRestaurantById: (id) => {
    return get().restaurants.find(restaurant => restaurant.id === id);
  },
  
  getMealsByRestaurant: (restaurantId) => {
    const isPremium = useUserStore.getState().preferences.isPremium;
    const allMeals = get().meals;
    
    return allMeals.filter(meal => {
      if (!isPremium && meal.isPremium) return false;
      return meal.restaurantId === restaurantId;
    });
  },
}));