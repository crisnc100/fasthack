import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Lock } from 'lucide-react-native';
import colors from '@/constants/colors';
import { dietaryTags, getFreeTags, getPremiumTags } from '@/constants/tags';
import { useUserStore } from '@/store/userStore';

interface TagFilterProps {
  onTagsChange: (tags: string[]) => void;
}

export default function TagFilter({ onTagsChange }: TagFilterProps) {
  const { preferences, setSelectedTags } = useUserStore();
  const { selectedTags, isPremium } = preferences;
  
  const freeTags = getFreeTags();
  const premiumTags = getPremiumTags();
  
  const handleTagPress = (tagName: string) => {
    const newSelectedTags = selectedTags.includes(tagName)
      ? selectedTags.filter(tag => tag !== tagName)
      : [...selectedTags, tagName];
    
    setSelectedTags(newSelectedTags);
    onTagsChange(newSelectedTags);
  };
  
  const renderTag = (tagName: string, isPremiumTag: boolean) => {
    const isSelected = selectedTags.includes(tagName);
    const isDisabled = isPremiumTag && !isPremium;
    
    return (
      <TouchableOpacity
        key={tagName}
        style={[
          styles.tag,
          isSelected && styles.selectedTag,
          isDisabled && styles.disabledTag
        ]}
        onPress={() => !isDisabled && handleTagPress(tagName)}
        disabled={isDisabled}
      >
        <Text
          style={[
            styles.tagText,
            isSelected && styles.selectedTagText,
            isDisabled && styles.disabledTagText
          ]}
        >
          {tagName}
        </Text>
        
        {isDisabled && (
          <Lock size={14} color={colors.textLight} style={styles.lockIcon} />
        )}
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dietary Preferences</Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsContainer}
      >
        {freeTags.map(tag => renderTag(tag.name, false))}
        {premiumTags.map(tag => renderTag(tag.name, true))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 16,
    color: colors.text,
  },
  tagsContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.tagBackground,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTag: {
    backgroundColor: colors.primary,
  },
  disabledTag: {
    opacity: 0.7,
  },
  tagText: {
    color: colors.tagText,
    fontWeight: '500',
    fontSize: 14,
  },
  selectedTagText: {
    color: 'white',
  },
  disabledTagText: {
    color: colors.textLight,
  },
  lockIcon: {
    marginLeft: 4,
  },
});