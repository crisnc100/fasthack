import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

// Complete the auth session for web
WebBrowser.maybeCompleteAuthSession();

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

// Google OAuth configuration
const googleClientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || 'your-google-client-id';

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
          // Mock authentication - in a real app, this would call your backend
          if (email && password.length >= 6) {
            const mockSession = {
              user: {
                id: `user_${Date.now()}`,
                email: email,
              }
            };
            
            const mockProfile: UserProfile = {
              id: mockSession.user.id,
              email: email,
              full_name: email.split('@')[0],
              has_completed_setup: true,
            };
            
            set({ session: mockSession, profile: mockProfile });
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
          // Mock sign up - in a real app, this would call your backend
          if (email && password.length >= 6) {
            const mockSession = {
              user: {
                id: `user_${Date.now()}`,
                email: email,
              }
            };
            
            const mockProfile: UserProfile = {
              id: mockSession.user.id,
              email: email,
              full_name: email.split('@')[0],
              has_completed_setup: false, // New users need to complete setup
            };
            
            set({ session: mockSession, profile: mockProfile });
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
          if (Platform.OS === 'web') {
            // For web, use a simple redirect flow
            const redirectUri = `${window.location.origin}/auth/callback`;
            const authUrl = `https://accounts.google.com/oauth/authorize?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
            
            window.location.href = authUrl;
            return;
          }
          
          // For mobile, use expo-auth-session
          const redirectUri = AuthSession.makeRedirectUri({
            scheme: 'fasthack',
            path: 'auth/callback',
          });
          
          const request = new AuthSession.AuthRequest({
            clientId: googleClientId,
            scopes: ['openid', 'profile', 'email'],
            redirectUri,
            responseType: AuthSession.ResponseType.Code,
          });
          
          const result = await request.promptAsync({
            authorizationEndpoint: 'https://accounts.google.com/oauth/authorize',
          });
          
          if (result.type === 'success') {
            // Mock Google user data - in a real app, you'd exchange the code for user info
            const mockSession = {
              user: {
                id: `google_user_${Date.now()}`,
                email: 'user@gmail.com',
              }
            };
            
            const mockProfile: UserProfile = {
              id: mockSession.user.id,
              email: 'user@gmail.com',
              full_name: 'Google User',
              avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
              has_completed_setup: false,
            };
            
            set({ session: mockSession, profile: mockProfile });
            console.log('Google sign in successful');
          } else {
            throw new Error('Google sign in was cancelled');
          }
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