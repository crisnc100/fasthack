export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  isPremium?: boolean;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  restaurantId: string;
  image?: string;
  ingredients: string[];
  macros: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  tags: string[];
  isPremium?: boolean;
  orderingInstructions?: string;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface UserPreferences {
  selectedTags: string[];
  isPremium: boolean;
}