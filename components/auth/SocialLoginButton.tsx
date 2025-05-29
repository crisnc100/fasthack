import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import colors from '@/constants/colors';

interface SocialLoginButtonProps {
  provider: 'google' | 'apple';
  onPress: () => void;
  isLoading?: boolean;
}

export default function SocialLoginButton({ 
  provider, 
  onPress, 
  isLoading = false 
}: SocialLoginButtonProps) {
  const iconUrl = provider === 'google' 
    ? 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    : 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg';
  
  const label = provider === 'google' 
    ? 'Continue with Google (Coming Soon)' 
    : 'Continue with Apple (Coming Soon)';
  
  return (
    <TouchableOpacity
      style={[styles.button, styles.buttonDisabled]}
      onPress={() => {}}
      disabled={true}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: iconUrl }}
          style={styles.icon}
          contentFit="contain"
        />
      </View>
      <Text style={[styles.label, styles.labelDisabled]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  labelDisabled: {
    color: colors.textLight,
  },
});