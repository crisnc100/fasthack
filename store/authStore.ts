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
          // Add timeout to prevent hanging
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Auth initialization timeout')), 10000)
          );
          
          const authPromise = supabase.auth.getSession();
          
          const { data: { session }, error } = await Promise.race([
            authPromise,
            timeoutPromise
          ]) as any;
          
          if (error) {
            console.error('Session error:', error);
            // Don't throw here, just log and continue
          }
          
          if (session) {
            const { user } = session;
            
            // Fetch user profile with timeout
            const profilePromise = supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();
            
            const profileTimeoutPromise = new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Profile fetch timeout')), 5000)
            );
            
            try {
              const { data: profile, error: profileError } = await Promise.race([
                profilePromise,
                profileTimeoutPromise
              ]) as any;
              
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
            } catch (profileError) {
              console.error('Profile fetch failed:', profileError);
              set({ 
                session, 
                user, 
                profile: { 
                  id: user.id, 
                  email: user.email || '',
                  has_completed_setup: false
                },
                isInitialized: true
              });
            }
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
              
              // Fetch user profile with timeout
              try {
                const profilePromise = supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', user.id)
                  .single();
                
                const profileTimeoutPromise = new Promise((_, reject) => 
                  setTimeout(() => reject(new Error('Profile fetch timeout')), 5000)
                );
                
                const { data: profile, error: profileError } = await Promise.race([
                  profilePromise,
                  profileTimeoutPromise
                ]) as any;
                
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
              } catch (error) {
                console.error('Profile fetch failed in auth listener:', error);
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
            } else if (event === 'SIGNED_OUT') {
              set({ session: null, user: null, profile: null });
            }
          });
        } catch (error: any) {
          console.error('Auth initialization error:', error);
          set({ 
            error: 'Failed to initialize authentication. Please try again.',
            isInitialized: true 
          });
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
          try {
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
          } catch (profileError) {
            console.error('Profile fetch failed:', profileError);
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
            try {
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
            } catch (profileError) {
              console.error('Profile creation failed:', profileError);
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