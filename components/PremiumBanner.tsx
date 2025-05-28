import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Crown } from 'lucide-react-native';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';

export default function PremiumBanner() {
  const router = useRouter();
  
  const handlePress = () => {
    router.push('/premium');
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.iconContainer}>
        <Crown size={20} color="white" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Upgrade to Premium</Text>
        <Text style={styles.description}>
          Unlock all restaurants and dietary filters
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Upgrade</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.premium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  buttonContainer: {
    backgroundColor: colors.premium,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});