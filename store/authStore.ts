import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export interface UserProfile {
  id: string;
  email: string;
  avatar_url?: string;
  full_name?: string;
  favorite_restaurants?: string[];
  dietary_preferences?: string[];
  has_completed_setup?: boolean;
}

interface AuthState {
  session: { user: { email: string; id: string } } | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  
  // Actions
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  resetError: () => void;
}

// Mock user database for demo purposes
const mockUsers = [
  {
    email: 'demo@example.com',
    password: 'password123',
    profile: {
      id: 'demo_user_1',
      email: 'demo@example.com',
      full_name: 'Demo User',
      has_completed_setup: true,
    }
  }
];

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
          // Check if we have a stored session
          const storedSession = get().session;
          const storedProfile = get().profile;
          
          if (storedSession && storedProfile) {
            console.log('Found existing session for:', storedSession.user.email);
            set({ session: storedSession, profile: storedProfile });
          } else {
            console.log('No existing session found');
            set({ session: null, profile: null });
          }
          
          console.log('Auth initialization completed successfully');
        } catch (error: any) {
          console.warn('Auth initialization failed:', error);
          set({ session: null, profile: null, error: error.message });
        } finally {
          set({ isLoading: false, isInitialized: true });
        }
      },
      
      signIn: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check mock users first
          const mockUser = mockUsers.find(u => u.email === email && u.password === password);
          
          if (mockUser) {
            const session = {
              user: {
                id: mockUser.profile.id,
                email: mockUser.profile.email,
              }
            };
            
            set({ session, profile: mockUser.profile });
            console.log('Sign in successful for:', email);
            return;
          }
          
          // For any other email/password combination, create a new user
          if (email && password.length >= 6) {
            const session = {
              user: {
                id: `user_${Date.now()}`,
                email: email,
              }
            };
            
            const profile: UserProfile = {
              id: session.user.id,
              email: email,
              full_name: email.split('@')[0],
              has_completed_setup: true,
            };
            
            set({ session, profile });
            console.log('Sign in successful for:', email);
          } else {
            throw new Error('Invalid email or password');
          }
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
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (email && password.length >= 6) {
            const session = {
              user: {
                id: `user_${Date.now()}`,
                email: email,
              }
            };
            
            const profile: UserProfile = {
              id: session.user.id,
              email: email,
              full_name: email.split('@')[0],
              has_completed_setup: false, // New users need to complete setup
            };
            
            set({ session, profile });
            console.log('Sign up successful for:', email);
          } else {
            throw new Error('Invalid email or password');
          }
        } catch (error: any) {
          console.error('Sign up error:', error);
          set({ error: error.message || 'Failed to create account' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      signInWithGoogle: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Mock Google authentication
          const session = {
            user: {
              id: `google_user_${Date.now()}`,
              email: 'user@gmail.com',
            }
          };
          
          const profile: UserProfile = {
            id: session.user.id,
            email: 'user@gmail.com',
            full_name: 'Google User',
            avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
            has_completed_setup: false,
          };
          
          set({ session, profile });
          console.log('Google sign in successful');
        } catch (error: any) {
          console.error('Google sign in error:', error);
          set({ error: error.message || 'Failed to sign in with Google' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      signOut: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate network delay
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
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 800));
          
          const currentState = get();
          if (!currentState.session) {
            throw new Error('User not authenticated');
          }
          
          const updatedProfile = { 
            ...currentState.profile as UserProfile, 
            ...updates 
          };
          
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
        session: state.session,
        profile: state.profile,
      }),
    }
  )
);