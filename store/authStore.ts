import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

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
  session: Session | null;
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
          // Get initial session
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.warn('Error getting session:', error);
            set({ session: null, profile: null });
          } else if (session) {
            console.log('Found existing session for:', session.user.email);
            set({ session });
            
            // Fetch user profile
            await get().fetchProfile(session.user.id);
          } else {
            console.log('No existing session found');
            set({ session: null, profile: null });
          }
          
          // Listen for auth changes
          supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.email);
            
            if (session) {
              set({ session });
              await get().fetchProfile(session.user.id);
            } else {
              set({ session: null, profile: null });
            }
          });
          
          console.log('Auth initialization completed successfully');
        } catch (error: any) {
          console.warn('Auth initialization failed:', error);
          set({ session: null, profile: null, error: error.message });
        } finally {
          set({ isLoading: false, isInitialized: true });
        }
      },
      
      fetchProfile: async (userId: string) => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
          
          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching profile:', error);
            return;
          }
          
          if (data) {
            set({ profile: data });
          } else {
            // Create default profile if none exists
            const session = get().session;
            if (session) {
              const defaultProfile: UserProfile = {
                id: userId,
                email: session.user.email || '',
                has_completed_setup: false,
              };
              
              const { error: insertError } = await supabase
                .from('profiles')
                .insert([defaultProfile]);
              
              if (!insertError) {
                set({ profile: defaultProfile });
              }
            }
          }
        } catch (error: any) {
          console.error('Error in fetchProfile:', error);
        }
      },
      
      signIn: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) {
            throw error;
          }
          
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
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });
          
          if (error) {
            throw error;
          }
          
          console.log('Sign up successful for:', email);
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
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: 'fasthack://auth/callback',
            },
          });
          
          if (error) {
            throw error;
          }
          
          console.log('Google sign in initiated');
        } catch (error: any) {
          console.error('Google sign in error:', error);
          set({ error: error.message || 'Failed to sign in with Google' });
          set({ isLoading: false });
        }
      },
      
      signOut: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const { error } = await supabase.auth.signOut();
          
          if (error) {
            throw error;
          }
          
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
          const currentState = get();
          if (!currentState.session) {
            throw new Error('User not authenticated');
          }
          
          const updatedProfile = { 
            ...currentState.profile as UserProfile, 
            ...updates 
          };
          
          const { error } = await supabase
            .from('profiles')
            .upsert([updatedProfile]);
          
          if (error) {
            throw error;
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
        // Don't persist session - let Supabase handle it
        // Only persist profile for faster loading
        profile: state.profile,
      }),
    }
  )
);