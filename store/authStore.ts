import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

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
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  
  // Actions
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  resetError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      profile: null,
      isLoading: false,
      error: null,
      isInitialized: false,
      
      initialize: async () => {
        if (get().isInitialized) return;
        
        set({ isLoading: true, error: null });
        
        try {
          // Get current session
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Session error:', error);
            // Don't throw here, just log and continue
          }
          
          if (session) {
            const { user } = session;
            
            // Fetch user profile
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();
            
            if (profileError && profileError.code !== 'PGRST116') {
              console.error('Profile error:', profileError);
              // Don't throw here either, create a basic profile
            }
            
            set({ 
              session, 
              user, 
              profile: profile || { 
                id: user.id, 
                email: user.email || '',
                has_completed_setup: false
              },
              isInitialized: true
            });
          } else {
            set({ 
              session: null, 
              user: null, 
              profile: null,
              isInitialized: true
            });
          }
          
          // Set up auth state listener
          supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.email);
            
            if (event === 'SIGNED_IN' && session) {
              const { user } = session;
              
              // Fetch user profile
              const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
              
              if (profileError && profileError.code !== 'PGRST116') {
                console.error('Profile fetch error:', profileError);
              }
              
              set({ 
                session, 
                user, 
                profile: profile || { 
                  id: user.id, 
                  email: user.email || '',
                  has_completed_setup: false
                } 
              });
            } else if (event === 'SIGNED_OUT') {
              set({ session: null, user: null, profile: null });
            }
          });
        } catch (error: any) {
          console.error('Auth initialization error:', error);
          set({ error: error.message, isInitialized: true });
        } finally {
          set({ isLoading: false });
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
          
          const { session, user } = data;
          
          // Fetch user profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Profile fetch error:', profileError);
          }
          
          set({ 
            session, 
            user, 
            profile: profile || { 
              id: user.id, 
              email: user.email || '',
              has_completed_setup: false
            } 
          });
        } catch (error: any) {
          console.error('Sign in error:', error);
          set({ error: error.message });
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
          
          // Note: The actual session will be handled by the auth listener
          // after the OAuth redirect completes
        } catch (error: any) {
          console.error('Google sign in error:', error);
          set({ error: error.message });
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
          
          const { session, user } = data;
          
          if (user) {
            // Create initial profile
            const { error: profileError } = await supabase
              .from('profiles')
              .insert([
                { 
                  id: user.id, 
                  email: user.email,
                  has_completed_setup: false
                }
              ]);
            
            if (profileError) {
              console.error('Profile creation error:', profileError);
              // Don't throw, just log
            }
            
            set({ 
              session, 
              user, 
              profile: { 
                id: user.id, 
                email: user.email || '',
                has_completed_setup: false
              } 
            });
          }
        } catch (error: any) {
          console.error('Sign up error:', error);
          set({ error: error.message });
        } finally {
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
          
          set({ session: null, user: null, profile: null });
        } catch (error: any) {
          console.error('Sign out error:', error);
          set({ error: error.message });
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateProfile: async (updates) => {
        set({ isLoading: true, error: null });
        
        try {
          const user = get().user;
          
          if (!user) {
            throw new Error('User not authenticated');
          }
          
          const { error } = await supabase
            .from('profiles')
            .upsert({ 
              id: user.id, 
              ...updates 
            });
          
          if (error) {
            throw error;
          }
          
          set(state => ({ 
            profile: { 
              ...state.profile as UserProfile, 
              ...updates 
            } 
          }));
        } catch (error: any) {
          console.error('Profile update error:', error);
          set({ error: error.message });
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
        user: state.user,
        profile: state.profile,
        isInitialized: state.isInitialized,
      }),
    }
  )
);