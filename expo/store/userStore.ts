import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserLocation, UserPreferences } from '@/types';

interface UserState {
  location: UserLocation | null;
  favorites: string[];
  preferences: UserPreferences;
  isLocationPermissionGranted: boolean;
  
  // Actions
  setLocation: (location: UserLocation | null) => void;
  toggleFavorite: (mealId: string) => void;
  isFavorite: (mealId: string) => boolean;
  setSelectedTags: (tags: string[]) => void;
  setPremiumStatus: (isPremium: boolean) => void;
  setLocationPermission: (granted: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      location: null,
      favorites: [],
      preferences: {
        selectedTags: [],
        isPremium: false,
      },
      isLocationPermissionGranted: false,
      
      setLocation: (location) => set({ location }),
      
      toggleFavorite: (mealId) => set((state) => {
        const isFavorite = state.favorites.includes(mealId);
        return {
          favorites: isFavorite
            ? state.favorites.filter(id => id !== mealId)
            : [...state.favorites, mealId]
        };
      }),
      
      isFavorite: (mealId) => get().favorites.includes(mealId),
      
      setSelectedTags: (tags) => set((state) => ({
        preferences: {
          ...state.preferences,
          selectedTags: tags
        }
      })),
      
      setPremiumStatus: (isPremium) => set((state) => ({
        preferences: {
          ...state.preferences,
          isPremium
        }
      })),
      
      setLocationPermission: (granted) => set({
        isLocationPermissionGranted: granted
      }),
    }),
    {
      name: 'fasthack-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);