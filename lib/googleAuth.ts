import { Platform } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from './supabase';

// Complete the auth session for web
WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'fasthack',
  path: 'auth/callback',
});

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUri,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      throw error;
    }

    // For web OAuth, this returns a URL for redirection
    // The actual session will be handled by the auth state listener
    return { data, error: null };
  } catch (error: any) {
    console.error('Google sign in error:', error);
    return { data: null, error: error.message };
  }
};

// For mobile-specific Google auth using AuthSession
export const signInWithGoogleMobile = async () => {
  try {
    const discovery = {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    };

    const clientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '209139657307-inmk9n77std92ceo573g59bpqv2brfjr.apps.googleusercontent.com';

    const request = new AuthSession.AuthRequest({
      clientId,
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      state: 'random-state-string',
      codeChallenge: 'challenge',
      codeChallengeMethod: AuthSession.CodeChallengeMethod.Plain,
    });

    const result = await request.promptAsync(discovery);

    if (result.type === 'success') {
      const { code } = result.params;
      
      // Exchange the code for tokens using Supabase
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        throw error;
      }

      return { data, error: null };
    } else {
      throw new Error('Authentication was cancelled or failed');
    }
  } catch (error: any) {
    console.error('Google mobile sign in error:', error);
    return { data: null, error: error.message };
  }
};

export const getGoogleAuthFunction = () => {
  return Platform.OS === 'web' ? signInWithGoogle : signInWithGoogleMobile;
};