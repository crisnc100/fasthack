import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Crown, Check, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import colors from '@/constants/colors';
import { useUserStore } from '@/store/userStore';

export default function PremiumScreen() {
  const router = useRouter();
  const { setPremiumStatus } = useUserStore();
  
  const handleUpgrade = () => {
    // In a real app, this would trigger the in-app purchase flow
    setPremiumStatus(true);
    router.back();
  };
  
  const handleClose = () => {
    router.back();
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={handleClose}
        >
          <X size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
          <Crown size={48} color={colors.premium} />
        </View>
        
        <Text style={styles.title}>Upgrade to Premium</Text>
        <Text style={styles.subtitle}>
          Unlock all features and get the most out of FastHack
        </Text>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Check size={20} color={colors.success} style={styles.featureIcon} />
            <Text style={styles.featureText}>Access to all dietary filters</Text>
          </View>
          <View style={styles.featureItem}>
            <Check size={20} color={colors.success} style={styles.featureIcon} />
            <Text style={styles.featureText}>Unlock all premium restaurants</Text>
          </View>
          <View style={styles.featureItem}>
            <Check size={20} color={colors.success} style={styles.featureIcon} />
            <Text style={styles.featureText}>Unlimited meal suggestions</Text>
          </View>
          <View style={styles.featureItem}>
            <Check size={20} color={colors.success} style={styles.featureIcon} />
            <Text style={styles.featureText}>No ads or restrictions</Text>
          </View>
        </View>
        
        <View style={styles.pricingContainer}>
          <View style={styles.pricingCard}>
            <Text style={styles.pricingTitle}>Monthly</Text>
            <Text style={styles.pricingPrice}>$4.99</Text>
            <Text style={styles.pricingPeriod}>per month</Text>
            <TouchableOpacity 
              style={styles.pricingButton}
              onPress={handleUpgrade}
            >
              <Text style={styles.pricingButtonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.pricingCard, styles.pricingCardHighlighted]}>
            <View style={styles.bestValueBadge}>
              <Text style={styles.bestValueText}>Best Value</Text>
            </View>
            <Text style={[styles.pricingTitle, styles.pricingTitleHighlighted]}>Yearly</Text>
            <Text style={[styles.pricingPrice, styles.pricingPriceHighlighted]}>$39.99</Text>
            <Text style={[styles.pricingPeriod, styles.pricingPeriodHighlighted]}>per year</Text>
            <Text style={styles.savingsText}>Save 33%</Text>
            <TouchableOpacity 
              style={[styles.pricingButton, styles.pricingButtonHighlighted]}
              onPress={handleUpgrade}
            >
              <Text style={styles.pricingButtonTextHighlighted}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.disclaimer}>
          Payment will be charged to your Apple ID account at the confirmation of purchase. 
          Subscription automatically renews unless it is canceled at least 24 hours before the end of the current period.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.tagBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: '80%',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: colors.text,
  },
  pricingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  pricingCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pricingCardHighlighted: {
    backgroundColor: colors.primary,
    position: 'relative',
  },
  bestValueBadge: {
    position: 'absolute',
    top: -12,
    backgroundColor: colors.premium,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bestValueText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  pricingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 8,
  },
  pricingTitleHighlighted: {
    color: 'white',
  },
  pricingPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  pricingPriceHighlighted: {
    color: 'white',
  },
  pricingPeriod: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  pricingPeriodHighlighted: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  savingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 16,
  },
  pricingButton: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    width: '100%',
    alignItems: 'center',
  },
  pricingButtonHighlighted: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  pricingButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  pricingButtonTextHighlighted: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  disclaimer: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
  },
});