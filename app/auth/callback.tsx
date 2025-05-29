import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import colors from '@/constants/colors';

export default function AuthCallbackScreen() {
  const router = useRouter();
  
  useEffect(() => {
    // This screen is no longer needed with our simplified auth
    // Redirect back to login
    const timer = setTimeout(() => {
      router.replace('/auth/login');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Redirecting...</Text>
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