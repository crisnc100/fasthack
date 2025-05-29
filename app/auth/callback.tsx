import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import colors from '@/constants/colors';

export default function AuthCallbackScreen() {
  const router = useRouter();
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current session after OAuth callback
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.replace('/auth/login');
          return;
        }
        
        if (session) {
          console.log('OAuth callback successful, redirecting to app');
          // The auth state change will be handled by the auth store
          // Just redirect to the main app
          router.replace('/');
        } else {
          console.log('No session found in callback, redirecting to login');
          router.replace('/auth/login');
        }
      } catch (error) {
        console.error('Error handling auth callback:', error);
        router.replace('/auth/login');
      }
    };
    
    // Small delay to ensure the URL parameters are processed
    const timer = setTimeout(handleAuthCallback, 1000);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Completing sign in...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },
});