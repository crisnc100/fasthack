import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import colors from '@/constants/colors';

interface SocialLoginButtonProps {
  provider: 'google' | 'apple';
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function SocialLoginButton({ 
  provider, 
  onPress, 
  isLoading = false,
  disabled = false
}: SocialLoginButtonProps) {
  const iconUrl = provider === 'google' 
    ? 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    : 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg';
  
  const label = provider === 'google' 
    ? 'Continue with Google' 
    : 'Continue with Apple';
  
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        disabled && styles.buttonDisabled,
        isLoading && styles.buttonLoading
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Image
            source={{ uri: iconUrl }}
            style={styles.icon}
            contentFit="contain"
          />
        )}
      </View>
      <Text style={[
        styles.label, 
        disabled && styles.labelDisabled,
        isLoading && styles.labelLoading
      ]}>
        {isLoading ? 'Signing in...' : label}
      </Text>
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
  buttonLoading: {
    opacity: 0.8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
  labelLoading: {
    color: colors.textSecondary,
  },
});