import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  id: string;
  email: string;
  avatar_url?: string;
  full_name?: string;
  favorite_restaurants?: string[];
  dietary_preferences?: string[];
  has_completed_setup?: boolean;
}

export interface Session {
  user: {
    id: string;
    email: string;
  };
  access_token: string;
}

interface AuthState {
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  
  // Actions
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  resetError: () => void;
}

// Mock user database
const mockUsers = new Map<string, { email: string; password: string; profile?: UserProfile }>();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      profile: null,
      isLoading: false,
      error: null,
      isInitialized: false,
      
      initialize: async () => {
        if (get().isInitialized) return;
        
        console.log('Starting auth initialization...');
        set({ isLoading: true, error: null });
        
        try {
          // Simulate initialization delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Check if we have a stored session
          const currentState = get();
          if (currentState.session) {
            console.log('Found existing session for:', currentState.session.user.email);
            // Session is already loaded from persistence
          } else {
            console.log('No existing session found');
          }
          
          console.log('Auth initialization completed successfully');
        } catch (error: any) {
          console.warn('Auth initialization failed:', error);
          set({ session: null, profile: null });
        } finally {
          set({ isLoading: false, isInitialized: true });
        }
      },
      
      signIn: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check mock users
          const user = mockUsers.get(email);
          if (!user || user.password !== password) {
            throw new Error('Invalid email or password');
          }
          
          const session: Session = {
            user: {
              id: `user_${Date.now()}`,
              email: email,
            },
            access_token: `token_${Date.now()}`,
          };
          
          const profile: UserProfile = user.profile || {
            id: session.user.id,
            email: email,
            has_completed_setup: false,
          };
          
          set({ session, profile });
          console.log('Sign in successful for:', email);
        } catch (error: any) {
          console.error('Sign in error:', error);
          set({ error: error.message || 'Failed to sign in' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      signUp: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check if user already exists
          if (mockUsers.has(email)) {
            throw new Error('User already exists with this email');
          }
          
          // Create new user
          const session: Session = {
            user: {
              id: `user_${Date.now()}`,
              email: email,
            },
            access_token: `token_${Date.now()}`,
          };
          
          const profile: UserProfile = {
            id: session.user.id,
            email: email,
            has_completed_setup: false,
          };
          
          // Store in mock database
          mockUsers.set(email, { email, password, profile });
          
          set({ session, profile });
          console.log('Sign up successful for:', email);
        } catch (error: any) {
          console.error('Sign up error:', error);
          set({ error: error.message || 'Failed to create account' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      signOut: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ session: null, profile: null });
          console.log('Sign out successful');
        } catch (error: any) {
          console.error('Sign out error:', error);
          set({ error: error.message || 'Failed to sign out' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateProfile: async (updates) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const currentState = get();
          if (!currentState.session) {
            throw new Error('User not authenticated');
          }
          
          const updatedProfile = { 
            ...currentState.profile as UserProfile, 
            ...updates 
          };
          
          // Update mock database
          const user = mockUsers.get(currentState.session.user.email);
          if (user) {
            user.profile = updatedProfile;
          }
          
          set({ profile: updatedProfile });
          console.log('Profile updated successfully');
        } catch (error: any) {
          console.error('Profile update error:', error);
          set({ error: error.message || 'Failed to update profile' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      resetError: () => set({ error: null }),
    }),
    {
      name: 'fasthack-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist essential data, not loading states
        session: state.session,
        profile: state.profile,
      }),
    }
  )
);