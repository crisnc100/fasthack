import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Check } from 'lucide-react-native';
import colors from '@/constants/colors';
import { validateName } from '@/utils/validation';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { dietaryTags } from '@/constants/tags';
import restaurants from '@/mocks/restaurants';

export default function ProfileSetupForm() {
  const router = useRouter();
  const { user, updateProfile, isLoading, error } = useAuthStore();
  
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [selectedRestaurants, setSelectedRestaurants] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [nameError, setNameError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const handleNameChange = (text: string) => {
    setName(text);
    setNameError(null);
  };
  
  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setUploadingImage(true);
        
        const file = {
          uri: result.assets[0].uri,
          name: `avatar-${user?.id}-${Date.now()}.jpg`,
          type: 'image/jpeg',
        };
        
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('avatars')
          .upload(file.name, file as any, {
            contentType: 'image/jpeg',
            upsert: true,
          });
        
        if (error) {
          throw error;
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(data.path);
        
        // Fix: Properly handle the publicUrl which can be string or null
        if (publicUrl) {
          setAvatarUrl(publicUrl);
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploadingImage(false);
    }
  };
  
  const toggleRestaurant = (id: string) => {
    setSelectedRestaurants(prev => 
      prev.includes(id) 
        ? prev.filter(r => r !== id) 
        : [...prev, id]
    );
  };
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  const handleSubmit = async () => {
    // Validate name
    const nameValidationError = validateName(name);
    setNameError(nameValidationError);
    
    if (nameValidationError) {
      return;
    }
    
    // Submit profile
    await updateProfile({
      full_name: name,
      avatar_url: avatarUrl,
      favorite_restaurants: selectedRestaurants,
      dietary_preferences: selectedTags,
      has_completed_setup: true,
    });
    
    // Navigate to main app
    router.replace('/');
  };
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Picture</Text>
        <TouchableOpacity 
          style={styles.avatarContainer}
          onPress={handlePickImage}
          disabled={uploadingImage}
        >
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              style={styles.avatar}
              contentFit="cover"
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              {uploadingImage ? (
                <ActivityIndicator color={colors.primary} />
              ) : (
                <Camera size={32} color={colors.textLight} />
              )}
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Name</Text>
        <TextInput
          style={[styles.input, nameError && styles.inputError]}
          placeholder="Enter your name"
          value={name}
          onChangeText={handleNameChange}
          autoCapitalize="words"
        />
        {nameError && <Text style={styles.errorText}>{nameError}</Text>}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorite Restaurants</Text>
        <Text style={styles.sectionSubtitle}>Select your favorite fast food restaurants</Text>
        
        <View style={styles.restaurantsGrid}>
          {restaurants.map(restaurant => (
            <TouchableOpacity
              key={restaurant.id}
              style={[
                styles.restaurantItem,
                selectedRestaurants.includes(restaurant.id) && styles.selectedRestaurantItem
              ]}
              onPress={() => toggleRestaurant(restaurant.id)}
            >
              <View style={styles.restaurantLogoContainer}>
                <Image
                  source={{ uri: restaurant.logo }}
                  style={styles.restaurantLogo}
                  contentFit="cover"
                />
                {selectedRestaurants.includes(restaurant.id) && (
                  <View style={styles.checkmarkContainer}>
                    <Check size={12} color="white" />
                  </View>
                )}
              </View>
              <Text style={styles.restaurantName} numberOfLines={1}>
                {restaurant.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dietary Preferences</Text>
        <Text style={styles.sectionSubtitle}>Select your dietary preferences</Text>
        
        <View style={styles.tagsContainer}>
          {dietaryTags.map(tag => (
            <TouchableOpacity
              key={tag.id}
              style={[
                styles.tagItem,
                selectedTags.includes(tag.name) && styles.selectedTagItem
              ]}
              onPress={() => toggleTag(tag.name)}
            >
              <Text 
                style={[
                  styles.tagText,
                  selectedTags.includes(tag.name) && styles.selectedTagText
                ]}
              >
                {tag.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={styles.submitButtonText}>Complete Setup</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    overflow: 'hidden',
    marginBottom: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },
  restaurantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  restaurantItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedRestaurantItem: {
    opacity: 1,
  },
  restaurantLogoContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.card,
    overflow: 'hidden',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  restaurantLogo: {
    width: '100%',
    height: '100%',
  },
  checkmarkContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagItem: {
    backgroundColor: colors.tagBackground,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  selectedTagItem: {
    backgroundColor: colors.primary,
  },
  tagText: {
    fontSize: 14,
    color: colors.tagText,
    fontWeight: '500',
  },
  selectedTagText: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});