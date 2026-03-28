import { trpcClient } from '@/lib/trpc';
import { Meal, Restaurant } from '@/types';
import meals from '@/mocks/meals';
import restaurants from '@/mocks/restaurants';

// Function to fetch all meals from backend
export const fetchMeals = async (): Promise<Meal[]> => {
  try {
    // Try to fetch from backend first
    const data = await trpcClient.meals.getAll.query();
    return data;
  } catch (error) {
    console.log('Error fetching meals from backend, using mock data:', error);
    // Fallback to mock data if backend fails
    return meals;
  }
};

// Function to fetch restaurants from backend
export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  try {
    // Try to fetch from backend first
    const data = await trpcClient.restaurants.getAll.query();
    return data;
  } catch (error) {
    console.log('Error fetching restaurants from backend, using mock data:', error);
    // Fallback to mock data if backend fails
    return restaurants;
  }
};