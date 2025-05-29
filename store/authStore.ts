import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
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
        
        console.log('Starting auth initialization...');
        set({ isLoading: true, error: null });
        
        try {
          // Get initial session with timeout
          const { data: { session }, error: sessionError } = await Promise.race([
            supabase.auth.getSession(),
            new Promise<any>((_, reject) => 
              setTimeout(() => reject(new Error('Session timeout')), 8000)
            )
          ]);
          
          if (sessionError) {
            console.warn('Session error (continuing anyway):', sessionError);
          }
          
          if (session?.user) {
            console.log('Found existing session for:', session.user.email);
            
            // Try to fetch profile with timeout
            try {
              const { data: profile, error: profileError } = await Promise.race([
                supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single(),
                new Promise<any>((_, reject) => 
                  setTimeout(() => reject(new Error('Profile timeout')), 5000)
                )
              ]);
              
              if (profileError && profileError.code !== 'PGRST116') {
                console.warn('Profile error (using fallback):', profileError);
              }
              
              set({ 
                session, 
                user: session.user, 
                profile: profile || { 
                  id: session.user.id, 
                  email: session.user.email || '',
                  has_completed_setup: false
                }
              });
            } catch (profileError) {
              console.warn('Profile fetch failed, using fallback:', profileError);
              set({ 
                session, 
                user: session.user, 
                profile: { 
                  id: session.user.id, 
                  email: session.user.email || '',
                  has_completed_setup: false
                }
              });
            }
          } else {
            console.log('No existing session found');
            set({ session: null, user: null, profile: null });
          }
          
          // Set up auth state listener (but don't wait for it)
          supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.email);
            
            if (event === 'SIGNED_IN' && session?.user) {
              // Fetch profile in background
              try {
                const { data: profile } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();
                
                set({ 
                  session, 
                  user: session.user, 
                  profile: profile || { 
                    id: session.user.id, 
                    email: session.user.email || '',
                    has_completed_setup: false
                  } 
                });
              } catch (error) {
                console.warn('Profile fetch failed in listener:', error);
                set({ 
                  session, 
                  user: session.user, 
                  profile: { 
                    id: session.user.id, 
                    email: session.user.email || '',
                    has_completed_setup: false
                  } 
                });
              }
            } else if (event === 'SIGNED_OUT') {
              set({ session: null, user: null, profile: null });
            }
          });
          
          console.log('Auth initialization completed successfully');
        } catch (error: any) {
          console.warn('Auth initialization failed (continuing anyway):', error);
          // Don't set error state, just continue with no session
          set({ session: null, user: null, profile: null });
        } finally {
          set({ isLoading: false, isInitialized: true });
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
          
          // Session will be handled by the auth listener
          console.log('Sign in successful for:', email);
        } catch (error: any) {
          console.error('Sign in error:', error);
          set({ error: error.message || 'Failed to sign in' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      signInWithGoogle: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const redirectUrl = Platform.select({
            ios: 'fasthack://auth/callback',
            android: 'fasthack://auth/callback',
            web: `${window.location.origin}/auth/callback`,
            default: 'fasthack://auth/callback'
          });

          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: redirectUrl,
            },
          });
          
          if (error) {
            throw error;
          }
          
          console.log('Google OAuth initiated');
        } catch (error: any) {
          console.error('Google sign in error:', error);
          set({ error: error.message || 'Failed to sign in with Google' });
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
          
          if (data.user && !data.session) {
            // Email confirmation required
            set({ error: 'Please check your email to confirm your account' });
            return;
          }
          
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
        user: state.user,
        profile: state.profile,
      }),
    }
  )
);