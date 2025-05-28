import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import colors from '@/constants/colors';

export default function AuthCallbackScreen() {
  const router = useRouter();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        // The session should be automatically handled by the auth state listener
        // Just redirect to the main app
        setTimeout(() => {
          router.replace('/');
        }, 2000);
      } catch (error) {
        console.error('Auth callback error:', error);
        router.replace('/auth/login');
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: colors.background 
    }}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={{ 
        marginTop: 16, 
        fontSize: 16, 
        color: colors.text 
      }}>
        Completing sign in...
      </Text>
    </View>
  );
}