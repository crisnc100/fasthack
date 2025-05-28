import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchX } from 'lucide-react-native';
import colors from '@/constants/colors';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({ 
  title = 'No meals found', 
  message = 'Try adjusting your filters or location to find more options.' 
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <SearchX size={64} color={colors.textLight} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: '80%',
  },
});