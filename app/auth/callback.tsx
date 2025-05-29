import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import colors from '@/constants/colors';

export default function AuthCallbackScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { updateProfile } = useAuthStore();
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle Google OAuth callback
        if (params.code) {
          console.log('OAuth callback with code:', params.code);
          
          // In a real app, you would exchange the code for user info
          // For now, we'll create a mock Google user
          const mockSession = {
            user: {
              id: `google_user_${Date.now()}`,
              email: 'user@gmail.com',
            }
          };
          
          const mockProfile = {
            id: mockSession.user.id,
            email: 'user@gmail.com',
            full_name: 'Google User',
            avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
            has_completed_setup: false,
          };
          
          // Update the auth store
          await updateProfile(mockProfile);
          
          console.log('OAuth callback successful, redirecting to profile setup');
          router.replace('/auth/profile-setup');
        } else {
          console.log('No code found in callback, redirecting to login');
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
  }, [router, params]);
  
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